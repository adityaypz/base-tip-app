'use client';

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';

export function ConnectWallet() {
  const { address, isConnected, isConnecting, isReconnecting, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  
  const isWrongNetwork = isConnected && chainId !== base.id;

  if (isReconnecting) {
    return (
      <div className="wallet-status">
        <div className="spinner" />
        <span>Reconnecting...</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="connect-section">
        <div className="connect-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <h2>Connect Your Wallet</h2>
        <p>Connect to start tipping on Base</p>
        <div className="connector-buttons">
          {connectors
            .filter((c, index, self) => {
              // Deduplicate by name
              const isDuplicate = self.findIndex(x => x.name === c.name) !== index;
              if (isDuplicate) return false;
              // Hide generic 'Injected' if we have better EIP-6963 wallets
              if (c.id === 'injected' && self.length > 2) return false;
              return true;
            })
            .sort((a, b) => (a.id === 'baseAccount' ? -1 : b.id === 'baseAccount' ? 1 : 0))
            .slice(0, 4) // Show max 4 wallets to avoid UI spam
            .map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              disabled={isConnecting}
              className="btn btn-connect"
            >
              {isConnecting ? 'Connecting...' : (connector.id === 'baseAccount' ? 'Base / Smart Wallet' : connector.name)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-connected">
      <div className="wallet-badge">
        <div className="wallet-avatar">
          {address?.slice(2, 4).toUpperCase()}
        </div>
        <div className="wallet-info">
          {isWrongNetwork ? (
            <span className="wallet-label" style={{ color: 'var(--error)' }}>Wrong Network</span>
          ) : (
            <span className="wallet-label">Connected to Base</span>
          )}
          <span className="wallet-address">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
      </div>
      {isWrongNetwork ? (
        <button onClick={() => switchChain?.({ chainId: base.id })} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
          Switch to Base
        </button>
      ) : (
        <button onClick={() => disconnect()} className="btn btn-disconnect">
          Disconnect
        </button>
      )}
    </div>
  );
}
