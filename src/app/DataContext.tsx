"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface DataContextType {
  search: string;
  setSearch: (arg: string) => void;
}
export const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState<string>("");

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
