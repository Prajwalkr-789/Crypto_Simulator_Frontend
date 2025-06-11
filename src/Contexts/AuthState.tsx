"use client";
import axios from "axios";
// import axios from "axios";
import { createContext, useContext,  useState, ReactNode, useEffect } from "react";
// import axios from "axios";

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
      const token = localStorage.getItem("jwt");
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        console.log("User is authenticated" , res);
       await setIsAuthenticated(true);
       await setUsername(res.data.username); 
      }
      else{
        setIsAuthenticated(false);
        setUsername(null);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth(); 

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

  const login = async (username : string) => { await setIsAuthenticated(true); await setUsername(username)}; ;

  const logoutController = async () => {
    setIsAuthenticated(false);
    setUsername(null);
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