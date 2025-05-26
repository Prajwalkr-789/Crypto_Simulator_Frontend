"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  username: string | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logoutController: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fix: Apply AuthProviderProps to the component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:8080/auth/check", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setIsAuthenticated(true);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth(); // initial check

    // On tab focus
    const handleFocus = () => {
      checkAuth();
    };
    window.addEventListener("focus", handleFocus);

    // Periodic recheck every 5 mins
    const interval = setInterval(checkAuth, 5 * 60 * 1000);

    return () => {
      window.removeEventListener("focus", handleFocus);
      clearInterval(interval);
    };
  }, []);

  const login = (username : string) => {setIsAuthenticated(true); setUsername(username)}; ;

  const logoutController = async () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{isAuthenticated , login , logoutController , username}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};