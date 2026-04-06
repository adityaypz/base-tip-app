'use client';

import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';

export function ConnectWallet() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

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
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              disabled={isConnecting}
              className="btn btn-connect"
            >
              {isConnecting ? 'Connecting...' : `${connector.name}`}
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
          <span className="wallet-label">Connected</span>
          <span className="wallet-address">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
      </div>
      <button onClick={() => disconnect()} className="btn btn-disconnect">
        Disconnect
      </button>
    </div>
  );
}
