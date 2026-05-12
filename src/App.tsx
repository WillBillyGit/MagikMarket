/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Terminal, Activity, FlaskConical, Beaker, BookOpen, Search, Zap, Wallet } from 'lucide-react';
import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider, useConnectModal, useActiveAccount } from "thirdweb/react";
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export const client = createThirdwebClient({
  clientId: "bc9658e39250af7a8f3346d7904a43b2", // Using a placeholder client ID for demo purposes
});

import { AetherVault } from './components/AetherVault';

function PotionApp() {
  const { connect, isConnecting } = useConnectModal();
  const address = useActiveAccount()?.address;

  return (
    <div className="relative min-h-screen w-full bg-dark-void text-white font-sans overflow-hidden flex flex-col p-8 lg:p-12">
      {/* Immersive Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Nebular Auras */}
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-aether-purple/15 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-aether-gold/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-aether-green/5 rounded-full blur-[100px]" />
        
        {/* Geometric Ritual Overlays */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.03)_0%,transparent_70%)]" />
      </div>

      {/* Header Section */}
      <header className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 mb-20">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-aether-purple to-aether-gold rounded-full opacity-20 group-hover:opacity-40 blur-lg transition-opacity animate-pulse" />
            <div className="relative w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden">
               <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-aether-gold opacity-60"
              >
                <Sparkles size={24} />
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-magic text-4xl font-bold tracking-[0.2em] uppercase text-white glow-text">Magik Market</h1>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-aether-purple" />
              <span className="font-mono text-[9px] text-aether-purple uppercase tracking-[0.4em] font-bold">Resonance Level: Celestial Bridge</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-aether-purple/30 to-aether-gold/30 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-[2.2rem] border-2 border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden flex items-center justify-center">
              <img 
                src="/src/assets/images/regenerated_image_1778495707740.png" 
                alt="Magik Market Mascot" 
                className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2"
                style={{
                  borderRadius: '32px',
                  borderStyle: 'double',
                  borderWidth: '4px',
                  height: '240px',
                  width: '280px',
                  padding: '8px',
                  borderColor: 'rgba(139, 92, 246, 0.3)'
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={async () => {
              const wallet = await connect({ client });
              console.log("connected", wallet);
            }}
            className="flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all group shadow-xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-aether-purple/10 to-aether-gold/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <span className={`text-[11px] uppercase tracking-[0.3em] font-bold transition-colors relative z-10 ${address ? 'text-aether-green' : 'text-white/80 group-hover:text-white'}`}>
              {isConnecting ? "Ritual in Progress..." : address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
            </span>
            <div className={`relative z-10 w-2.5 h-2.5 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.5)] transition-all ${address ? 'bg-aether-green shadow-aether-green/50' : 'bg-aether-purple animate-pulse'}`} />
          </motion.button>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="relative z-10 flex-1 flex flex-col items-center gap-32 pb-32">
        {/* Center Panel: Swap Engine */}
        <div 
          className="w-full bg-black/30 backdrop-blur-3xl border relative flex flex-col items-center justify-start p-16 overflow-visible shadow-[0_50px_150px_rgba(0,0,0,0.8)] font-magic text-center text-aether-green border-aether-purple/30 min-h-[900px]"
          style={{ borderStyle: 'groove', borderRadius: '48px' }}
        >
          {/* Energy Core Background */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06)_0%,transparent_70%)]" />
          
          <div className="relative z-20 w-full flex flex-col items-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-5xl md:text-6xl tracking-[0.15em] uppercase mb-8 leading-tight glow-text text-white font-bold">
                Transmutation <span className="text-aether-purple">Bridge</span>
              </h2>
            </motion.div>
            <div className="space-y-6 max-w-2xl mx-auto">
              <p className="text-lg opacity-80 leading-relaxed font-sans font-light">
                Channel your essence across the celestial realms. Our alchemical bridge connects the primary planes of liquidity with unyielding precision.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-aether-gold/40" />
                <p className="text-[11px] text-aether-gold uppercase tracking-[0.3em] font-mono font-bold">
                  Immutable Rituals. Instant Resolution.
                </p>
                <div className="h-px w-12 bg-aether-gold/40" />
              </div>
            </div>
          </div>

          <div className="relative z-20 w-full flex flex-col items-center justify-center scale-100 group">
             <div className="absolute -inset-4 bg-aether-purple/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <iframe
              src="https://swap.dodoex.io/magikmarket?full-screen=true&theme=dark&backgroundColor=050308&primaryColor=8b5cf6&textColor=ffffff&hideLogo=true&feeRate=0.003"
              width="400px"
              height="550px"
              className="max-w-full border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative z-10 transition-transform duration-1000 group-hover:scale-[1.02]"
              style={{ borderRadius: '32px' }}
            />
          </div>
        </div>

        {/* Aether Vault Section */}
        <section className="w-full relative">
           <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-aether-purple/30 to-transparent" />
           <AetherVault />
        </section>
      </main>

      {/* Footer Section */}
      <footer className="relative z-10 mt-12 flex justify-between items-end px-2">
        <div className="flex flex-col gap-1.5">
          <div className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-medium font-mono">Current Epoch</div>
          <span className="font-mono text-[11px] text-white/50">{address ? "42.0.18.RESONANT" : "9.442.0.18.DEMO"}</span>
        </div>
        
        <div className="flex gap-16 text-right">
          <div className="flex flex-col gap-1.5">
            <div className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-medium font-mono">Latitude</div>
            <span className="font-mono text-[11px] text-white/50">51.5074° N</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-medium font-mono">Longitude</div>
            <span className="font-mono text-[11px] text-white/50">0.1278° W</span>
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
  return (
    <ThirdwebProvider>
      <PotionApp />
    </ThirdwebProvider>
  );
}
