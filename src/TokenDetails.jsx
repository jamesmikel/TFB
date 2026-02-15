import React, { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [chosenWallet, setChosenWallet] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <TokenContext.Provider
      value={{
        chosenWallet,
        setChosenWallet,
        selectedWallet,
        setSelectedWallet,
        selectedToken,
        setSelectedToken,
        selectedPlan,
        setSelectedPlan,
        amount,
        setAmount,
        confirmed,
        setConfirmed,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
