/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Terminal, Activity, FlaskConical, Beaker, BookOpen, Search, Zap, Wallet } from 'lucide-react';
import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider, useConnectModal, useActiveAccount } from "thirdweb/react";

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
            <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.3em]">Phase: Celestial Calibration</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* Magik Mascot Image Replacement for Nav */}
          <div className="h-16 w-32 rounded-2xl border border-glass-border overflow-hidden bg-glass backdrop-blur-xl shadow-2xl relative group">
            <img 
              src="/src/assets/images/regenerated_image_1778459087673.png" 
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
      <main className="relative z-10 flex-1 grid grid-cols-12 gap-8">
        {/* Left Panel: Alchemy Status */}
        <div className="col-span-3 flex flex-col gap-6">
          <div className="bg-glass backdrop-blur-2xl border border-glass-border rounded-[2rem] p-6 flex-1 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-medium">Manifestations</h3>
              <Activity size={14} className="text-purple-400" />
            </div>
            <div className="space-y-8">
              {[
                { name: 'Crystal Resonance', val: 72, col: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]' },
                { name: 'Essence Extraction', val: 45, col: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]' },
                { name: 'Void Synthesis', val: 12, col: 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.4)]' }
              ].map((item, idx) => (
                <div key={idx} className="group cursor-default">
                  <div className="text-[11px] font-medium mb-3 flex justify-between">
                    <span className="text-white/80">{item.name}</span>
                    <span className="font-mono text-[9px] text-white/30">{item.val}%</span>
                  </div>
                  <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.col} transition-all duration-1000`} style={{ width: `${item.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-glass backdrop-blur-2xl border border-glass-border rounded-[2rem] p-6 h-36 flex items-center justify-center shadow-xl">
            <div className="text-center">
              <div className="font-mono text-3xl font-light text-white mb-2 tracking-tighter">1,024.8</div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium font-mono">Mana Flux Intensity</div>
            </div>
          </div>
        </div>

        {/* Center Panel: Swap Engine */}
        <div className="col-span-6 bg-glass backdrop-blur-2xl border border-glass-border rounded-[3rem] relative flex flex-col items-center justify-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_60%)]" />
          
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

        {/* Right Panel: Streams and Actions */}
        <div className="col-span-3 flex flex-col gap-6">
          <div className="bg-glass backdrop-blur-2xl border border-glass-border rounded-[2rem] p-7 flex-1 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-medium">Telemetric Stream</h3>
              <Terminal size={14} className="text-white/40" />
            </div>
            <div className="font-mono text-[10px] leading-relaxed space-y-4 opacity-50">
              <div className="flex gap-3"><span>[10:42]</span> <span className="text-white/80">Crystal resonance stable</span></div>
              <div className="flex gap-3"><span>[10:45]</span> <span className="text-purple-400 font-medium">leyline_37 detected</span></div>
              <div className="flex gap-3"><span>[10:48]</span> <span className="text-white/80">Calibrating optics...</span></div>
              <div className="flex gap-3"><span>[10:52]</span> <span className="text-white/80">Flux variance nominal</span></div>
              <div className="flex gap-3 text-emerald-400 font-medium"><span>[10:54]</span> <span>Manual override engaged</span></div>
              <div className="flex gap-3"><span>[10:57]</span> <span className="text-white/80">Resonator cooldown: 4m</span></div>
            </div>
          </div>

          <button className="h-20 rounded-[1.8rem] bg-white text-black font-bold flex items-center justify-center gap-4 transition-all hover:bg-white/90 hover:scale-[0.98] active:scale-95 group shadow-[0_10px_40px_rgba(255,255,255,0.1)]">
            <FlaskConical size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="text-sm uppercase tracking-[0.25em]">Initiate Pulse</span>
          </button>
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
  return (
    <ThirdwebProvider>
      <PotionApp />
    </ThirdwebProvider>
  );
}
