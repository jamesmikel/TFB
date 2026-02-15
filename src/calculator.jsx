import React, { useState, useEffect, createContext, useContext } from "react";
import users from "./Users";
const userContext = createContext();
const Arr1 = { ProposedPercent: 0.04, ProposedTime: 3600 * 1000 };
const Arr2 = { ProposedPercent: 0.1, ProposedTime: 3600 * 6000 };
const Arr3 = { ProposedPercent: 0.2, ProposedTime: 3600 * 12000 };
const Arr4 = { ProposedPercent: 0.2, ProposedTime: 3600 * 18000 };
const Arr5 = { ProposedPercent: 0.4, ProposedTime: 3600 * 24000 };
const Arr6 = { ProposedPercent: 0.2, ProposedTime: 3600 * 1000 };

const planArray = [Arr6, Arr3];
const planArray1 = [Arr2, Arr1];
const planArray2 = [Arr3, Arr2, Arr1];
const planArray4 = [Arr5, Arr4, Arr3, Arr2, Arr1];
const planArray5 = [Arr6, Arr5, Arr4, Arr3, Arr2, Arr1];

// Create

// Helper function to generate random price in a given range
const getRandomPriceInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to pick a random plan from planArray
const getRandomPlan1 = () => {
  return planArray[Math.floor(Math.random() * planArray.length)];
};
const getRandomPlan2 = () => {
  return planArray1[Math.floor(Math.random() * planArray1.length)];
};
const getRandomPlan3 = () => {
  return planArray2[Math.floor(Math.random() * planArray2.length)];
};
const getRandomPlan5 = () => {
  return planArray4[Math.floor(Math.random() * planArray4.length)];
};
const getRandomPlan6 = () => {
  return planArray5[Math.floor(Math.random() * planArray5.length)];
};
// Provider component

export class CryptoMiner {
  constructor(user) {
    if (typeof user !== "object" || !user.current_price) {
      throw new Error("Invalid user object or missing current_price");
    }

    this.userId = user.id; // Link back to user
    this.depositAmount = user.current_price;
    this.startTime = Date.now();
    this.durationMs = user.miningPlan?.ProposedTime || 3600 * 1000; // Fallback to 1h

    this.targetprofit =
      this.depositAmount * (user.miningPlan?.ProposedPercent || 0.04);
    this.currentProfit = 0;
    this.totalBalance = this.depositAmount;
    this.profitComplete = false;
    this.withdrawn = false;
  }

  updateProfit() {
    if (this.profitComplete) return;

    const elapsedMs = Date.now() - this.startTime;
    if (elapsedMs >= this.durationMs) {
      this.currentProfit = this.targetProfit;
      this.finalProfit = this.targetProfit;
      this.totalBalance += this.currentProfit;
      this.profitComplete = true;
    } else {
      const progress = elapsedMs / this.durationMs;
      const baseprofit = progress * this.targetprofit;
      const volatility = (Math.random() - 0.5) * 2; // -1 to +1
      const flunctuation = baseprofit * volatility * 0.2; // ±20% swing

      // Clamp to prevent negative or exceeding target
      this.currentProfit = Math.max(
        0,
        Math.min(this.targetProfit, this.currentProfit)
      );
      this.currentProfit = baseprofit + flunctuation;
      this.totalBalance = this.depositAmount + this.currentProfit;
    }
  }

  withdraw() {
    if (this.withdrawn) {
      console.log(`User ${this.userId} - Already withdrawn.`);
      return 0;
    }

    this.updateProfit();

    if (!this.profitComplete) {
      console.log(`User ${this.userId} - Cannot withdraw yet.`);
      return 0;
    }

    const amount = this.totalBalance;
    this.withdrawn = true;
    console.log(
      `User ${this.userId} - Withdrawal successful! $${amount?.toFixed(2)}`
    );
    return amount;
  }

  getStatus() {
    this.updateProfit();
    const elapsedMs = Date.now() - this.startTime;
    const remainingMs = Math.max(0, this.durationMs - elapsedMs);
    const displayProfit = this.profitComplete
      ? this.finalProfit
      : this.currentProfit;

    const displayBalance = this.depositAmount + displayProfit;
    return {
      userId: this.userId,
      deposit: this.depositAmount?.toFixed(2),
      currentProfit: this.currentProfit?.toFixed(6),
      totalBalance: displayBalance.toFixed(6),
      profitPercentage:
        this.depositAmount > 0
          ? ((displayProfit / this.depositAmount) * 100).toFixed(2)
          : "0.00",
      profitComplete: this.profitComplete,
      withdrawn: this.withdrawn,
      remainingMinutes: Math.ceil(remainingMs / 60000),
      canWithdraw: this.profitComplete && !this.withdrawn,
    };
  }
}

export const Calculator = ({ children }) => {
  const [processedUsers, setProcessedUsers] = useState([]); // Store users with assigned plans & prices
  const [minedPlans, setMinedPlans] = useState([]);
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    // Function to assign mining plan and fix random current_price if out of range or missing
    const assignPlansAndFixPrices = (userList) => {
      return userList.map((user) => {
        let currentPrice = user.current_price ?? 0; // Use 0 if missing

        let assignedPlan;

        // Check existing price ranges
        if (currentPrice >= 30 && currentPrice <= 100) {
          assignedPlan = Arr1;
        } else if (currentPrice > 100 && currentPrice <= 1000) {
          assignedPlan = getRandomPlan2();
        } else if (currentPrice > 1000 && currentPrice <= 10000) {
          assignedPlan = getRandomPlan1() || getRandomPlan3(); // Random from planArray
        } else if (currentPrice > 10000 && currentPrice <= 100000) {
          assignedPlan = getRandomPlan5();
        } else if (currentPrice > 50000 && currentPrice <= 100000) {
          assignedPlan = getRandomPlan6();
        } else {
          // Out of range or missing → assign random price in a valid range
          const ranges = [
            { min: 30, max: 100, plan: Arr1 },
            { min: 101, max: 1000, plan: getRandomPlan2() },
            {
              min: 1001,
              max: 10000,
              plan: getRandomPlan1() || getRandomPlan3(),
            },
            { min: 10001, max: 100000, plan: getRandomPlan5() },
            { min: 50001, max: 100000, plan: getRandomPlan6() },
          ];

          // Pick a random range
          const randomRange = ranges[Math.floor(Math.random() * ranges.length)];
          currentPrice = getRandomPriceInRange(
            randomRange.min,
            randomRange.max
          );
          assignedPlan = randomRange.plan;
        }

        return {
          ...user, // Keep original fields
          current_price: currentPrice, // Add/update price if needed
          miningPlan: assignedPlan, // Add new field
        };
      });
    };

    const updatedUsers = assignPlansAndFixPrices(users);
    setProcessedUsers(updatedUsers);

    console.log("Processed users with plans & fixed prices:", updatedUsers);
    const plans = updatedUsers
      .map((user) => {
        if (user.miningPlan) {
          return new CryptoMiner(user); // Pass the full user object
        }
        return null; // Or skip users without plans
      })
      .filter(Boolean); // Remove nulls

    setMinedPlans(plans);

    console.log("Processed users:", updatedUsers);
    console.log("Mined plans:", plans);

    const merged = updatedUsers.map((user) => {
      const plan = plans.find((p) => p.userId === user.id);
      if (plan) {
        const status = plan.getStatus();
        return {
          ...user,
          miningStatus: status, // Add full status object
        };
      }
      return user;
    });

    setMergedData(merged);

    console.log("Merged data (users + mined plans status):", merged);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMinedPlans((prevPlans) => {
        const updatedPlans = prevPlans.map((plan) => {
          plan.updateProfit(); // Mutate in place (class instance)
          return plan;
        });
        return [...updatedPlans]; // New array reference to trigger re-render
      });

      // Re-merge using current minedPlans (state is async, so use functional update)
      setMergedData((prevMerged) => {
        return prevMerged.map((user) => {
          const plan = minedPlans.find((p) => p.userId === user.id);

          return {
            ...user,
            miningStatus: plan ? plan.getStatus() : null,
          };
        });
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [minedPlans]);

  // Run once on mount

  // Optional: Update all plans every second (for live simulation)

  return (
    <userContext.Provider value={{ processedUsers, mergedData }}>
      {children}
    </userContext.Provider>
  );
};

// Custom hook with safety check
export const usePrices = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("usePrices must be used within a Calculator Provider");
  }
  return context;
};
