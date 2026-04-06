'use client';

import { useState } from 'react';
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from 'wagmi';
import { base } from 'wagmi/chains';
import { parseEther, isAddress } from 'viem';
import { Attribution } from 'ox/erc8021';

const DATA_SUFFIX = Attribution.toDataSuffix({ codes: ['bc_qbyukwvj'] });

const PRESET_AMOUNTS = ['0.0001', '0.0005', '0.001', '0.005', '0.01'];

const EMOJI_REACTIONS = ['☕', '🍕', '🎉', '💎', '🚀'];

export function TipForm() {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('0.0001');
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('☕');
  const [txSuccess, setTxSuccess] = useState(false);
  
  const isWrongNetwork = chainId !== base.id;

  const {
    data: hash,
    isPending,
    sendTransaction,
    error: sendError,
    reset,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const effectiveAmount = customAmount || amount;
  const isValidAddress = recipient && isAddress(recipient);
  const isValidAmount = effectiveAmount && parseFloat(effectiveAmount) > 0;

  const handleSendTip = () => {
    if (!isValidAddress || !isValidAmount) return;

    if (isWrongNetwork && switchChain) {
      switchChain({ chainId: base.id });
      return;
    }

    setTxSuccess(false);
    sendTransaction({
      to: recipient as `0x${string}`,
      value: parseEther(effectiveAmount),
      data: DATA_SUFFIX as `0x${string}`,
    });
  };

  const handleNewTip = () => {
    reset();
    setRecipient('');
    setAmount('0.0001');
    setCustomAmount('');
    setMessage('');
    setTxSuccess(false);
  };

  if (!isConnected) {
    return null;
  }

  if (isSuccess && !txSuccess) {
    setTxSuccess(true);
  }

  if (txSuccess && hash) {
    return (
      <div className="tip-success">
        <div className="success-animation">
          <span className="success-emoji">{selectedEmoji}</span>
          <h3>Tip Sent!</h3>
          <p className="success-amount">{effectiveAmount} ETH</p>
          <a
            href={`https://basescan.org/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tx-link"
          >
            View on Basescan ↗
          </a>
          <button onClick={handleNewTip} className="btn btn-primary">
            Send Another Tip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tip-form">
      <div className="form-header">
        <h2>Send a Tip</h2>
        <p>Support someone on Base with ETH</p>
      </div>

      {/* Recipient */}
      <div className="form-group">
        <label>Recipient Address</label>
        <input
          type="text"
          placeholder="0x..."
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className={`form-input ${recipient && !isValidAddress ? 'input-error' : ''}`}
        />
        {recipient && !isValidAddress && (
          <span className="error-text">Invalid Ethereum address</span>
        )}
      </div>

      {/* Emoji Reaction */}
      <div className="form-group">
        <label>Reaction</label>
        <div className="emoji-grid">
          {EMOJI_REACTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setSelectedEmoji(emoji)}
              className={`emoji-btn ${selectedEmoji === emoji ? 'emoji-selected' : ''}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Amount Selection */}
      <div className="form-group">
        <label>Amount (ETH)</label>
        <div className="amount-grid">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setAmount(preset);
                setCustomAmount('');
              }}
              className={`amount-btn ${amount === preset && !customAmount ? 'amount-selected' : ''}`}
            >
              {preset}
            </button>
          ))}
        </div>
        <div className="custom-amount">
          <input
            type="number"
            step="0.0001"
            min="0"
            placeholder="Custom amount..."
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount('');
            }}
            className="form-input"
          />
        </div>
      </div>

      {/* Message (optional, not onchain for simplicity) */}
      <div className="form-group">
        <label>Message (optional)</label>
        <textarea
          placeholder="Great work! Keep building..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          className="form-input form-textarea"
        />
      </div>

      {/* Send Button */}
      <button
        onClick={handleSendTip}
        disabled={!isValidAddress || !isValidAmount || isPending || isConfirming}
        className="btn btn-primary btn-send"
      >
        {isWrongNetwork
          ? 'Switch to Base Network'
          : isPending
            ? '⏳ Confirm in Wallet...'
            : isConfirming
              ? '⏳ Confirming...'
              : `Send ${effectiveAmount} ETH ${selectedEmoji}`}
      </button>

      {sendError && (
        <div className="error-banner">
          <span>❌ {sendError.message.split('\n')[0]}</span>
        </div>
      )}
    </div>
  );
}
