import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  TrendingUp, 
  Clock, 
  FlaskConical, 
  ArrowDownUp, 
  ShieldCheck,
  Flame,
  Waves
} from 'lucide-react';
import { 
  getContract, 
  prepareContractCall,
  sendTransaction,
  readContract,
  toEther,
  toWei
} from "thirdweb";
import { 
  useActiveAccount,
  useReadContract,
  useSendTransaction
} from "thirdweb/react";
import { client } from "../App"; // Assuming client is exported from App or similar

// Note: Contract address would be provided here in a real deployment
const VAULT_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; 
const chainId = 1; // Example: Ethereum Mainnet

export function AetherVault() {
  const account = useActiveAccount();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [activeTab, setActiveTab] = useState<'manifest' | 'dissolve'>('manifest');

  // Contract instance
  const contract = getContract({
    client,
    chain: {
      id: chainId,
      rpc: "https://ethereum.rpc.thirdweb.com", // Example RPC
    },
    address: VAULT_CONTRACT_ADDRESS,
  });

  // Mock data for UI if contract isn't live/ready
  const mockEssence = "12.5";
  const mockVirtualEssence = "14.2";
  const mockTributeRate = "1.5";
  const mockBonus = "13.6";

  const isConnected = !!account;

  return (
    <div className="w-full mt-16 p-8 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 text-center mb-12 flex flex-col items-center">
        <img 
          src="/src/assets/images/AetherVault.jpg" 
          alt="Aether Vaultz" 
          className="w-full max-w-4xl mb-12 rounded-[3rem] border border-[#4ee44c]/20 shadow-[0_30px_100px_rgba(0,0,0,0.8)] transition-transform hover:scale-[1.01] duration-700"
          referrerPolicy="no-referrer"
        />
        <h2 className="font-magic text-5xl md:text-6xl text-[#5ef13a] tracking-widest uppercase mb-4 drop-shadow-[0_0_15px_rgba(94,241,58,0.3)]">
          The Aether Vaultz
        </h2>
        <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#4ee44c]/30 to-transparent mb-6" />
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/60 max-w-2xl mx-auto leading-relaxed">
          Resonate. Transmute. Ascend. <br />
          <span className="text-white/40 italic">Harness the power of time-weighted liquidity.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* Left Stats Section */}
        <div className="space-y-6">
          <div className="bg-glass backdrop-blur-2xl border border-glass-border rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp size={64} />
            </div>
            <div className="relative z-10">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 font-mono">Current Essence</h3>
              <div className="font-magic text-4xl text-white mb-1">{isConnected ? mockEssence : "0.0"}</div>
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Pure Manifested Power</p>
            </div>
          </div>

          <div className="bg-glass backdrop-blur-2xl border border-glass-border rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={64} />
            </div>
            <div className="relative z-10">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 font-mono">Virtual Resonance</h3>
              <div className="font-magic text-4xl text-[#5ef13a] mb-1">{isConnected ? mockVirtualEssence : "0.0"}</div>
              <div className="flex items-center gap-2">
                <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isConnected ? "70%" : "0%" }}
                    className="h-full bg-[#5ef13a]"
                  />
                </div>
                <span className="text-[10px] font-mono text-[#5ef13a]">+{mockBonus}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Interaction Section */}
        <div className="bg-glass backdrop-blur-3xl border-2 border-[#4ee44c] rounded-[3rem] p-10 shadow-[0_0_50px_rgba(78,228,76,0.1)] relative" style={{ borderStyle: 'groove' }}>
          <div className="flex border-b border-white/5 mb-8">
            <button 
              onClick={() => setActiveTab('manifest')}
              className={`flex-1 pb-4 text-[10px] uppercase tracking-[0.4em] font-bold transition-all ${activeTab === 'manifest' ? 'text-[#5ef13a] border-b-2 border-[#5ef13a]' : 'text-white/30 hover:text-white/60'}`}
            >
              Manifest
            </button>
            <button 
              onClick={() => setActiveTab('dissolve')}
              className={`flex-1 pb-4 text-[10px] uppercase tracking-[0.4em] font-bold transition-all ${activeTab === 'dissolve' ? 'text-red-400 border-b-2 border-red-400' : 'text-white/30 hover:text-white/60'}`}
            >
              Dissolve
            </button>
          </div>

          <div className="space-y-8">
            <div>
              <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 block mb-4 font-mono">
                {activeTab === 'manifest' ? 'Input Aether (ETH)' : 'Burn Essence'}
              </label>
              <div className="relative">
                <input 
                  type="number"
                  value={activeTab === 'manifest' ? depositAmount : withdrawAmount}
                  onChange={(e) => activeTab === 'manifest' ? setDepositAmount(e.target.value) : setWithdrawAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 font-magic text-3xl focus:outline-none focus:border-[#5ef13a]/50 transition-colors"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 px-4 rounded-xl bg-white/10 text-[10px] uppercase tracking-widest font-mono hover:bg-white/20">
                  Max
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-3 font-mono">
              <div className="flex justify-between text-[10px] uppercase tracking-widest">
                <span className="text-white/40">Expected Yield</span>
                <span className="text-white">--</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest">
                <span className="text-white/40">Tribute Rate</span>
                <span className={activeTab === 'manifest' ? "text-[#5ef13a]" : "text-red-400"}>
                  {mockTributeRate}%
                </span>
              </div>
            </div>

            <button className={`w-full py-6 rounded-2xl font-magic text-xl uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-lg ${
              activeTab === 'manifest' 
                ? 'bg-[#5ef13a] text-black hover:bg-[#4dd32f] shadow-[#5ef13a]/20' 
                : 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/20'
            }`}>
              {activeTab === 'manifest' ? 'Begin Transmutation' : 'Dissolve Bonds'}
            </button>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="space-y-6">
          <div className="bg-glass backdrop-blur-2xl border border-glass-border rounded-[2rem] p-8 shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <Clock className="text-purple-400" size={32} />
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-1 font-mono">Time Weighted</h4>
              <p className="text-[11px] text-white/30 font-mono">Resonance increases by 10% every 30 solar cycles. Loyalty is rewarded in the void.</p>
            </div>
          </div>
          
          <div className="bg-glass backdrop-blur-2xl border border-glass-border rounded-[2rem] p-8 shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <ShieldCheck className="text-blue-400" size={32} />
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-1 font-mono">Relational Guard</h4>
              <p className="text-[11px] text-white/30 font-mono">Weighted averages protect your standing when adding new aether to existing pools.</p>
            </div>
          </div>

          <div className="bg-[#5ef13a]/5 border border-[#5ef13a]/20 rounded-[2rem] p-6 text-center font-mono">
            <div className="text-[9px] uppercase tracking-[0.3em] text-[#5ef13a] mb-2 flex items-center justify-center gap-2">
              <Flame size={12} /> Live Resonance
            </div>
            <p className="text-[10px] text-white/40 italic leading-relaxed">
              "The longer your essence remains in the crucible, the greater its weight in the celestial hierarchy."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
