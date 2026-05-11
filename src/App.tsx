/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Terminal, Activity, FlaskConical, Beaker, BookOpen, Search, Zap, Wallet } from 'lucide-react';
import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider, useConnectModal, useActiveAccount } from "thirdweb/react";
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const client = createThirdwebClient({
  clientId: "bc9658e39250af7a8f3346d7904a43b2", // Using a placeholder client ID for demo purposes
});

function PotionApp() {
  const { connect, isConnecting } = useConnectModal();
  const address = useActiveAccount()?.address;

  return (
    <div className="relative min-h-screen w-full bg-dark-void text-white font-sans overflow-hidden flex flex-col p-8">
      {/* Immersive Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[30%] w-[400px] h-[400px] bg-emerald-950/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Header Section */}
      <header className="relative z-10 flex justify-between items-center mb-12">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-full border border-purple-500/30 flex items-center justify-center bg-purple-950/20 backdrop-blur-sm shadow-[0_0_20px_rgba(139,92,246,0.1)]">
            <div className="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(167,139,250,0.6)] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-serif text-3xl font-semibold tracking-wider uppercase text-white/95">Magik Market</h1>
            <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.3em]">Phase: Celestial Bridge & Essence Vaults</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* Magik Mascot Image Replacement for Nav */}
          <div className="h-56 w-56 rounded-3xl border border-glass-border overflow-hidden bg-glass backdrop-blur-xl shadow-2xl relative group">
            <img 
              src="/src/assets/images/regenerated_image_1778495707740.png" 
              alt="Magik Market Mascot" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Inline fallback if image not found to keep layout stable
                e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Overlay if image fails or for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-void/40 to-transparent pointer-events-none" />
          </div>

          <button 
            onClick={async () => {
              const wallet = await connect({ client });
              console.log("connected", wallet);
            }}
            className="flex items-center gap-3 px-6 py-3 bg-glass backdrop-blur-2xl border border-glass-border rounded-2xl hover:bg-white/5 transition-all group"
          >
            <div className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${address ? 'text-emerald-400' : 'text-purple-400 group-hover:text-purple-300'}`}>
              {isConnecting ? "Establishing..." : address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect"}
            </div>
            <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.3)] transition-all ${address ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-purple-500 animate-pulse'}`} />
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="relative z-10 flex-1 flex flex-col items-center">
        {/* Center Panel: Swap Engine */}
        <div 
          className="w-full bg-glass backdrop-blur-2xl border relative flex flex-col items-center justify-start p-12 overflow-visible shadow-2xl font-magic text-center text-[#5ef13a] border-[#4ee44c] min-h-[900px]"
          style={{ borderStyle: 'groove', borderRadius: '4px' }}
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_60%)]" />
          
          <div className="relative z-20 w-full flex flex-col items-center mb-10">
            <h2 className="text-4xl tracking-[0.1em] uppercase mb-6 leading-tight">Multi-Chain Transmutation Bridge</h2>
            <div className="space-y-4 max-w-xl mx-auto">
              <p className="text-sm opacity-90 leading-relaxed">
                You can now bridge your essence across the celestial realms—from the bustling streets of Ethereum to the lightning-fast currents of Polygon and beyond.
              </p>
              <p className="text-[10px] opacity-60 uppercase tracking-[0.25em] font-mono">
                Cross-Chain Alchemy. Simply select your "Source Realm" and your "Destination Plane" within the interface to begin the ritual.
              </p>
            </div>
          </div>

          <div className="relative z-20 w-full flex flex-col items-center justify-center scale-95 md:scale-100">
            <iframe
              src="https://swap.dodoex.io/magikmarket?full-screen=true&theme=dark&backgroundColor=050308&primaryColor=8b5cf6&textColor=ffffff&hideLogo=true&feeRate=0.003"
              width="375px"
              height="494px"
              className="max-w-full border-0 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
              style={{ borderRadius: '16px' }}
            />
          </div>
        </div>

      </main>

      {/* Footer Section */}
      <footer className="relative z-10 mt-12 flex justify-between items-end px-2">
        <div className="flex flex-col gap-1.5">
          <div className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-medium font-mono">Current Epoch</div>
          <div className="font-mono text-[11px] text-white/50">9.442.0.18.RESONANT</div>
        </div>
        
        <div className="flex gap-16 text-right">
          <div className="flex flex-col gap-1.5">
            <div className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-medium font-mono">Latitude</div>
            <div className="font-mono text-[11px] text-white/50">51.5074° N</div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-medium font-mono">Longitude</div>
            <div className="font-mono text-[11px] text-white/50">0.1278° W</div>
          </div>
        </div>
      </footer>

      {/* Floating Sparkles Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-[1px] h-[1px] bg-white/40 rounded-full animate-pulse"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${3 + Math.random() * 7}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return <PotionApp />;
}
