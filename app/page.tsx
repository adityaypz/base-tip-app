'use client';

import { ConnectWallet } from '@/components/ConnectWallet';
import { TipForm } from '@/components/TipForm';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      {/* Background Effects */}
      <div className="bg-pattern">
        <div className="bg-gradient-orb" />
        <div className="bg-gradient-orb" />
      </div>

      <div className="app-container">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <span className="logo-text">BaseTip</span>
            <span className="logo-badge">Base</span>
          </div>
          <div className="header-right">
            <div className="chain-badge">
              <span className="chain-dot" />
              Base Mainnet
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {/* Hero */}
          <section className="hero">
            <h1>
              Tip Anyone on{' '}
              <span className="highlight">Base</span>
            </h1>
            <p>
              Send ETH tips instantly on Base L2. Low fees, fast transactions, onchain proof.
            </p>
          </section>

          {/* Stats */}
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-value">~$0.001</div>
              <div className="stat-label">Gas Fee</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">&lt;1s</div>
              <div className="stat-label">Confirmation</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">Onchain</div>
            </div>
          </div>

          {/* Wallet Card */}
          {!isConnected && (
            <div className="card">
              <ConnectWallet />
            </div>
          )}

          {/* Connected State */}
          {isConnected && (
            <>
              <div className="card" style={{ maxWidth: '480px' }}>
                <ConnectWallet />
              </div>
              <div className="card">
                <TipForm />
              </div>
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="footer">
          Built on{' '}
          <a href="https://base.org" target="_blank" rel="noopener noreferrer">
            Base
          </a>{' '}
          · Powered by{' '}
          <a href="https://wagmi.sh" target="_blank" rel="noopener noreferrer">
            wagmi
          </a>
        </footer>
      </div>
    </>
  );
}
