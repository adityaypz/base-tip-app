'use client';

import { ConnectWallet } from '@/components/ConnectWallet';
import { TipForm } from '@/components/TipForm';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      {/* Ambient Background */}
      <div className="bg-ambient" />

      <div className="app-container">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="white" fillOpacity="0.9"/>
              </svg>
            </div>
            <span className="logo-text">BaseTip</span>
          </div>
          <div className="header-right">
            <div className="network-pill">
              <span className="network-dot" />
              Base
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {/* Hero */}
          <section className="hero">
            <h1>
              Send Tips on{' '}
              <span className="highlight">Base</span>
            </h1>
            <p>
              Instant ETH tips with near-zero fees. Fast, simple, onchain.
            </p>
          </section>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value">~$0.001</div>
              <div className="stat-label">Gas Fee</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">&lt;1s</div>
              <div className="stat-label">Speed</div>
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
              <div className="card" style={{ maxWidth: '440px' }}>
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
          </a>
          {' · '}
          <a href="https://basescan.org" target="_blank" rel="noopener noreferrer">
            Explorer
          </a>
        </footer>
      </div>
    </>
  );
}
