"use client"


import React, { createContext, useState, useContext, ReactNode } from "react";



interface PayloadContextProps {
  scriptPayload: any;
  setScriptPayload: React.Dispatch<React.SetStateAction<any>>;
  resultPayload: any;
  setResultPayload: React.Dispatch<React.SetStateAction<any>>;
  payloadReady: boolean;
  setPayloadReady: React.Dispatch<React.SetStateAction<boolean>>;
  score: any;
  setScore: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PayloadProviderProps {
  children: ReactNode;
}

// Create Context
const PayloadContext = createContext<PayloadContextProps | undefined>(undefined);

// Create Provider Component
export const PayloadProvider: React.FC<PayloadProviderProps> = ({ children }) => {
  const [scriptPayload, setScriptPayload] = useState<any>(null);
  const [payloadReady, setPayloadReady] = useState<boolean>(false);
  const [resultPayload, setResultPayload] = useState<any>(null);
  const [score, setScore] = useState<any>(null);

  

  return (
    <PayloadContext.Provider
      value={{
        scriptPayload,
        setScriptPayload,
        payloadReady,
        setPayloadReady,
        resultPayload,
        setResultPayload,
        score,
        setScore
      }}
    >
      {children}
    </PayloadContext.Provider>
  );
};

// Custom Hook to Use Navigation Context
export const usePayloadContext = (): PayloadContextProps => {
  const context = useContext(PayloadContext);
  if (!context) {
    throw new Error("usePayloadContextContext must be used within a PayloadProvider");
  }
  return context;
};
