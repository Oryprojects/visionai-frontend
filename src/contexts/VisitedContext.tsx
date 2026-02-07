import React, { createContext, useContext, useState, ReactNode } from "react";

type VisitedContextType = {
  visitedPages: string[];
  setVisitedPages: React.Dispatch<React.SetStateAction<string[]>>;
};

const VisitedContext = createContext<VisitedContextType | undefined>(undefined);

type VisitedProviderProps = {
  children: ReactNode;
};

export const VisitedProvider = ({ children }: VisitedProviderProps) => {
  const [visitedPages, setVisitedPages] = useState<string[]>([]);
  return (
    <VisitedContext.Provider value={{ visitedPages, setVisitedPages }}>
      {children}
    </VisitedContext.Provider>
  );
};

export const useVisited = () => {
  const context = useContext(VisitedContext);
  if (context === undefined) {
    throw new Error('useVisited must be used within a VisitedProvider');
  }
  return context;
};
