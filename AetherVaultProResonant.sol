// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "@openzeppelin/contracts@5.0.2/access/Ownable2Step.sol";
import "@openzeppelin/contracts@5.0.2/utils/ReentrancyGuard.sol";

/**
 * @title AetherVaultPro: The Resonant Crucible
 * @notice An elastic-liquidity vault that rewards loyalty with "Virtual Essence."
 * @dev Features Weighted Resonance to prevent fee-gaming and ensure owner profitability.
 */
contract AetherVaultPro is Ownable2Step, ReentrancyGuard {
    
    mapping(address => uint256) public essenceBalance;
    mapping(address => uint256) public resonanceStart;

    uint256 public constant BPS_DENOMINATOR = 10000;
    uint256 public accumulatedTribute;

    event Transmuted(address indexed alchemist, uint256 ethProvided, uint256 essenceGained, uint256 tributePaid);
    event Dissolved(address indexed alchemist, uint256 essenceBurned, uint256 ethReturned, uint256 tributePaid);

    constructor() Ownable(msg.sender) {}

    // --- Resonance Engine ---

    /**
     * @dev Calculates "Virtual Essence." Users gain 10% power per 30 days (max +100%).
     * Virtual Power = Actual Essence * (1 + (days_held * 0.1 / 30))
     */
    function getVirtualEssence(address _user) public view returns (uint256) {
        uint256 actual = essenceBalance[_user];
        if (actual == 0 || resonanceStart[_user] == 0) return 0;

        uint256 timeHeld = block.timestamp - resonanceStart[_user];
        uint256 bonusBps = (timeHeld / 30 days) * 1000; 
        if (bonusBps > 10000) bonusBps = 10000; // Cap at 2x power

        return (actual * (BPS_DENOMINATOR + bonusBps)) / BPS_DENOMINATOR;
    }

    /**
     * @dev Maps Virtual Essence to fee tiers. 
     * Even the highest rank pays a 1% tribute to ensure owner profit.
     */
    function getTributeRate(address _user) public view returns (uint256) {
        uint256 power = getVirtualEssence(_user);
        
        if (power >= 50 ether) return 100; // Grand Master: 1.0%
        if (power >= 10 ether) return 150; // Alchemist: 1.5%
        return 200;                       // Apprentice: 2.0%
    }

    // --- Core Mutations ---

    /**
     * @notice Deposit ETH to manifest Essence.
     * @dev Uses a weighted average to adjust resonance if user adds more ETH.
     */
    function manifest() external payable nonReentrant {
        require(msg.value > 0, "Provide Aether to transmute");

        uint256 currentRate = getTributeRate(msg.sender);
        uint256 tribute = (msg.value * currentRate) / BPS_DENOMINATOR;
        uint256 pureEssence = msg.value - tribute;

        // Weighted Resonance Logic: Prevents "fee-dodging" by aging the balance
        if (essenceBalance[msg.sender] > 0) {
            uint256 oldBalance = essenceBalance[msg.sender];
            uint256 newBalance = oldBalance + pureEssence;
            
            // New Start Time = ((OldStart * OldBal) + (Now * AddedBal)) / TotalBal
            resonanceStart[msg.sender] = (
                (resonanceStart[msg.sender] * oldBalance) + (block.timestamp * pureEssence)
            ) / newBalance;
        } else {
            resonanceStart[msg.sender] = block.timestamp;
        }

        accumulatedTribute += tribute;
        essenceBalance[msg.sender] += pureEssence;

        emit Transmuted(msg.sender, msg.value, pureEssence, tribute);
    }

    /**
     * @notice Burn Essence to reclaim ETH.
     */
    function dissolve(uint256 _amount) external nonReentrant {
        require(essenceBalance[msg.sender] >= _amount, "Insufficient Essence");

        uint256 currentRate = getTributeRate(msg.sender);
        uint256 tribute = (_amount * currentRate) / BPS_DENOMINATOR;
        uint256 ethToReturn = _amount - tribute;

        essenceBalance[msg.sender] -= _amount;
        accumulatedTribute += tribute;

        if (essenceBalance[msg.sender] == 0) {
            resonanceStart[msg.sender] = 0;
        }

        (bool success, ) = payable(msg.sender).call{value: ethToReturn}("");
        require(success, "Reclamation failed");

        emit Dissolved(msg.sender, _amount, ethToReturn, tribute);
    }

    // --- Administrative ---

    function claimTributes() external onlyOwner {
        uint256 amount = accumulatedTribute;
        accumulatedTribute = 0;
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Tribute collection failed");
    }

    receive() external payable {}
}