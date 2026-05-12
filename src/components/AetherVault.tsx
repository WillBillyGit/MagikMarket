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
  Waves,
  Sparkles,
  Trophy,
  Crown,
  Network
} from 'lucide-react';
import { 
  getContract, 
  prepareContractCall,
  readContract,
  toEther,
  toWei
} from "thirdweb";
import { 
  useActiveAccount,
  useReadContract,
  useSendTransaction,
  useActiveWalletChain,
  useSwitchActiveWalletChain
} from "thirdweb/react";
import { polygon, base, bsc, optimism, avalanche, arbitrum } from "thirdweb/chains";
import { client } from "../App"; 

const VAULT_ADDRESSES: Record<number, string> = {
  137: "0xB961BC2BB845821993E7A243E2Ef46aF491F2754", // Polygon
  8453: "0x7012707D4c71b15D952f4c7fDE1D68d57cd76E33", // Base
  56: "0xB961BC2BB845821993E7A243E2Ef46aF491F2754",  // BSC
  10: "0xB961BC2BB845821993E7A243E2Ef46aF491F2754",   // Optimism
  43114: "0x86B89ecCE514895BB33C52e77726Ea15cEf6be7f", // Avalanche
  42161: "0x43cE86aD54fb9c154752a4a4aFb94AfFCFa46BF0", // Arbitrum
};

const SUPPORTED_CHAINS = [polygon, base, bsc, optimism, avalanche, arbitrum];

export function AetherVault() {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [activeTab, setActiveTab] = useState<'manifest' | 'dissolve'>('manifest');

  const currentChainId = activeChain?.id;
  const vaultAddress = currentChainId ? VAULT_ADDRESSES[currentChainId] : null;

  const contract = vaultAddress ? getContract({
    client,
    chain: activeChain!,
    address: vaultAddress,
  }) : null;

  // Contract Reads
  const { data: essenceBalance, isLoading: isLoadingEssence } = useReadContract({
    contract: contract!,
    method: "function essenceBalance(address) view returns (uint256)",
    params: [account?.address || ""],
    queryOptions: { enabled: !!contract && !!account },
  });

  const { data: virtualEssence, isLoading: isLoadingVirtual } = useReadContract({
    contract: contract!,
    method: "function getVirtualEssence(address) view returns (uint256)",
    params: [account?.address || ""],
    queryOptions: { enabled: !!contract && !!account },
  });

  const { data: tributeRate, isLoading: isLoadingTribute } = useReadContract({
    contract: contract!,
    method: "function getTributeRate(address) view returns (uint256)",
    params: [account?.address || ""],
    queryOptions: { enabled: !!contract && !!account },
  });

  // Transactions
  const { mutate: sendTx, isPending: isTxPending } = useSendTransaction();

  const handleManifest = async () => {
    if (!contract || !depositAmount) return;
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function manifest() payable",
        value: toWei(depositAmount),
      });
      sendTx(transaction);
    } catch (error) {
      console.error("Transmutation failed:", error);
    }
  };

  const handleDissolve = async () => {
    if (!contract || !withdrawAmount) return;
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function dissolve(uint256)",
        params: [toWei(withdrawAmount)],
      });
      sendTx(transaction);
    } catch (error) {
      console.error("Dissolution failed:", error);
    }
  };

  const isConnected = !!account;
  const isSupported = !!vaultAddress;

  const displayEssence = essenceBalance ? Number(toEther(essenceBalance)).toLocaleString(undefined, { maximumFractionDigits: 4 }) : "0.0";
  const displayVirtual = virtualEssence ? Number(toEther(virtualEssence)).toLocaleString(undefined, { maximumFractionDigits: 4 }) : "0.0";
  const displayTribute = tributeRate ? (Number(tributeRate) / 100).toFixed(1) : "2.0";
  
  // Calculate bonus: (Virtual / Actual - 1) * 100
  const bonusValue = (essenceBalance && virtualEssence && Number(essenceBalance) > 0) 
    ? ((Number(virtualEssence) / Number(essenceBalance)) - 1) * 100 
    : 0;
  const displayBonus = bonusValue.toFixed(1);

  return (
    <div className="w-full mt-24 p-8 relative overflow-hidden">
      {/* Immersive Cosmic Background for Section */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-aether-purple/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-aether-gold/5 blur-[120px] rounded-full" />
        
        {/* Floating Energy Swirls */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-200px] left-[-200px] w-[800px] h-[800px] border border-aether-gold/10 rounded-full border-dashed"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] border border-aether-purple/10 rounded-full border-dashed"
        />
      </div>
      
      <div className="relative z-10 text-center mb-16 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <img 
            src="/src/assets/images/AetherVault.jpg" 
            alt="Aether Vaultz" 
            className="w-full max-w-4xl mb-12 rounded-[4rem] border-2 border-aether-purple/30 shadow-[0_40px_120px_rgba(0,0,0,0.9)] transition-all hover:border-aether-gold/40 duration-1000"
            referrerPolicy="no-referrer"
          />
          
          <div className="relative inline-block mb-4">
             <h2 className="font-magic text-6xl md:text-8xl text-aether-green tracking-[0.2em] uppercase drop-shadow-[0_0_30px_rgba(94,241,58,0.4)]">
              The Aether Vaultz
            </h2>
            <div className="absolute -top-8 -right-12 text-aether-gold animate-pulse">
              <Crown size={48} className="rotate-12" />
            </div>
          </div>

          <div className="flex items-center gap-8 mb-8">
            <div className="h-[2px] w-32 bg-gradient-to-r from-transparent to-aether-purple/40" />
            <div className="w-3 h-3 rounded-full bg-aether-gold glow-pulse" />
            <div className="h-[2px] w-32 bg-gradient-to-l from-transparent to-aether-purple/40" />
          </div>

          <p className="font-mono text-sm uppercase tracking-[0.5em] text-white/70 max-w-3xl mx-auto leading-loose italic">
            "Resonate. Transmute. Ascend." <br />
            <span className="text-aether-purple font-bold glow-text">Harness the power of time-weighted liquidity in the cosmic crucible.</span>
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto relative z-10">
        
        {/* Left Side: Celestial Ranks & Stats */}
        <div className="space-y-8">
          {/* Chain Selector if not supported */}
          {!isSupported && isConnected && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-500/10 backdrop-blur-3xl border border-red-500/30 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <Network className="text-red-400 animate-pulse" size={48} />
                <h3 className="text-sm uppercase tracking-widest text-red-200 font-magic">Realm Not Recognized</h3>
                <p className="text-[10px] text-red-200/60 font-mono italic">The Aether Vaults have not yet manifested on this plane.</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {SUPPORTED_CHAINS.map((c) => (
                    <button 
                      key={c.id}
                      onClick={() => switchChain(c)}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] uppercase tracking-widest font-mono hover:bg-white/10 transition-all font-bold"
                    >
                      Bridge to {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-glass backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group border-l-4 border-l-aether-purple/50"
          >
            <div className="absolute -right-4 -top-4 p-8 opacity-20 group-hover:opacity-40 transition-opacity text-aether-purple bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3),transparent)] rounded-full">
              <Trophy size={80} />
            </div>
            <div className="relative z-10">
              <h3 className="text-[11px] uppercase tracking-[0.4em] text-white/40 mb-4 font-mono font-bold">Current Essence</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-magic text-5xl text-white glow-text">{isConnected && isSupported ? displayEssence : "0.000"}</span>
                <span className="text-[10px] uppercase font-mono text-white/30">{activeChain?.nativeCurrency?.symbol || 'ETH'}</span>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-aether-purple animate-ping" />
                <p className="text-[10px] text-aether-purple/60 uppercase tracking-[0.2em] font-mono">Pure Manifested Power</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-glass backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group border-l-4 border-l-aether-gold/50"
          >
            <div className="absolute -right-4 -top-4 p-8 opacity-20 group-hover:opacity-40 transition-opacity text-aether-gold bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.2),transparent)] rounded-full">
              <Zap size={80} />
            </div>
            <div className="relative z-10">
              <h3 className="text-[11px] uppercase tracking-[0.4em] text-white/40 mb-4 font-mono font-bold">Virtual Resonance</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-magic text-5xl text-aether-gold glow-text">{isConnected && isSupported ? displayVirtual : "0.000"}</span>
                <span className="text-[10px] uppercase font-mono text-aether-gold/40">power</span>
              </div>
              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-[9px] uppercase font-mono tracking-widest text-aether-gold/60">
                  <span>Resonance Multiplier</span>
                  <span>+{displayBonus}% Bonus</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isConnected && isSupported ? `${Math.min(bonusValue, 100)}%` : "0%" }}
                    className="h-full bg-gradient-to-r from-aether-purple to-aether-gold shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center: The Crucible UI */}
        <div className="bg-glass backdrop-blur-3xl border-2 border-aether-purple/20 rounded-[4rem] p-12 shadow-[0_0_100px_rgba(139,92,246,0.15)] relative overflow-hidden" style={{ borderStyle: 'groove' }}>
          {/* Internal Energy Effects */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.2),transparent_70%)]" />
          
          <div className="flex bg-white/5 rounded-2xl p-1 mb-10 border border-white/5 relative z-10">
            <button 
              onClick={() => setActiveTab('manifest')}
              className={`flex-1 py-4 rounded-xl text-[11px] uppercase tracking-[0.4em] font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'manifest' ? 'bg-aether-purple text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
            >
              <FlaskConical size={14} className={activeTab === 'manifest' ? "animate-bounce" : ""} />
              Manifest
            </button>
            <button 
              onClick={() => setActiveTab('dissolve')}
              className={`flex-1 py-4 rounded-xl text-[11px] uppercase tracking-[0.4em] font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'dissolve' ? 'bg-red-900/40 text-red-100 border border-red-500/30' : 'text-white/40 hover:text-white/60'}`}
            >
              <Flame size={14} className={activeTab === 'dissolve' ? "animate-pulse text-red-500" : ""} />
              Dissolve
            </button>
          </div>

          <div className="space-y-10 relative z-10">
            <div className="group">
              <div className="flex justify-between items-end mb-4 px-2">
                <label className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-mono font-bold">
                  {activeTab === 'manifest' ? `Aether Offering (${activeChain?.nativeCurrency?.symbol || 'ETH'})` : 'Essence to Sacrifice'}
                </label>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                  Live on {activeChain?.name || 'Void'}
                </span>
              </div>
              <div className="relative group/input">
                <input 
                  type="number"
                  value={activeTab === 'manifest' ? depositAmount : withdrawAmount}
                  onChange={(e) => activeTab === 'manifest' ? setDepositAmount(e.target.value) : setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  disabled={!isSupported || isTxPending}
                  className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-8 font-magic text-4xl text-center text-white focus:outline-none focus:border-aether-purple/50 focus:bg-white/[0.07] transition-all disabled:opacity-30"
                />
                <button 
                  onClick={() => {
                    if (activeTab === 'manifest') setDepositAmount("0.1"); // Simple max mock or real balance integration needed
                    else setWithdrawAmount(displayEssence.replace(/,/g, ''));
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 px-6 rounded-xl bg-white/10 text-[9px] uppercase tracking-[0.3em] font-mono font-bold hover:bg-aether-gold hover:text-black transition-all"
                >
                  MAX
                </button>
              </div>
            </div>

            <div className="bg-white/[0.03] rounded-[2.5rem] p-8 border border-white/5 space-y-4 font-mono shadow-inner group">
              <div className="flex justify-between text-[10px] uppercase tracking-[0.3em]">
                <span className="text-white/40 group-hover:text-white/60 transition-colors">Projected Energy Gained</span>
                <span className="text-aether-gold glow-text">≈ {activeTab === 'manifest' ? (Number(depositAmount) * (1 - Number(displayTribute)/100)).toFixed(4) : "0.00"}</span>
              </div>
              <div className="h-px w-full bg-white/5" />
              <div className="flex justify-between text-[10px] uppercase tracking-[0.3em]">
                <span className="text-white/40 group-hover:text-white/60 transition-colors">Tribute to Owner</span>
                <span className={activeTab === 'manifest' ? "text-aether-gold" : "text-red-400"}>
                  {displayTribute}% <span className="opacity-40 text-[8px] tracking-normal font-sans">(Royal Tribute)</span>
                </span>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: isSupported ? 1.02 : 1 }}
              whileTap={{ scale: isSupported ? 0.98 : 1 }}
              onClick={activeTab === 'manifest' ? handleManifest : handleDissolve}
              disabled={!isSupported || isTxPending || !isConnected}
              className={`w-full py-8 rounded-[2.5rem] font-magic text-2xl uppercase tracking-[0.3em] transition-all relative overflow-hidden group shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed ${
              activeTab === 'manifest' 
                ? 'bg-aether-purple text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]' 
                : 'bg-gradient-to-r from-red-600 to-red-900 text-white'
            }`}>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center justify-center gap-4">
                {isTxPending ? (
                  <>Ritual Underway <Waves size={24} className="animate-pulse" /></>
                ) : activeTab === 'manifest' ? (
                  <>Begin Transmutation <Sparkles size={24} className="animate-pulse" /></>
                ) : (
                  <>Sever Connections <Flame size={24} /></>
                )}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Right Side: Ancient Wisdom & Mechanics */}
        <div className="space-y-8">
          <div className="bg-glass backdrop-blur-2xl border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group text-center flex flex-col items-center">
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="w-24 h-24 rounded-full bg-aether-purple/10 flex items-center justify-center border-2 border-aether-purple/20 mb-6 drop-shadow-[0_0_15px_rgba(139,92,246,0.2)]"
            >
              <Clock className="text-aether-purple" size={48} />
            </motion.div>
            <h4 className="text-[12px] uppercase tracking-[0.5em] text-white/80 mb-4 font-magic font-bold">Resonant Aging</h4>
            <p className="text-[11px] text-white/40 font-mono leading-relaxed px-4">
              "The void remembers the faithful. Your Virtual Power manifests at +10% every 30 celestial cycles, until you reach 200% efficacy."
            </p>
          </div>
          
          <div className="bg-glass backdrop-blur-2xl border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group text-center flex flex-col items-center">
             <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="w-24 h-24 rounded-full bg-aether-gold/10 flex items-center justify-center border-2 border-aether-gold/20 mb-6 drop-shadow-[0_0_15px_rgba(251,191,36,0.2)]"
            >
              <ShieldCheck className="text-aether-gold" size={48} />
            </motion.div>
            <h4 className="text-[12px] uppercase tracking-[0.5em] text-white/80 mb-4 font-magic font-bold">Relational Sync</h4>
            <p className="text-[11px] text-white/40 font-mono leading-relaxed px-4">
              Weighted Resonance math ensures that adding new aether never dilutes your established legacy. Your standing is immutable.
            </p>
          </div>

          <div className="bg-gradient-to-br from-aether-purple/10 to-transparent border border-aether-purple/20 rounded-[3rem] p-8 text-center font-mono relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Sparkles size={80} />
            </div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-aether-green mb-4 flex items-center justify-center gap-3 font-bold">
              <Waves size={16} className="animate-pulse" /> Active Pulse
            </div>
            <p className="text-[11px] text-white/50 leading-relaxed italic relative z-10 px-4">
              "When truth is weighted by time, the alchemist who waits becomes the god who rules."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
