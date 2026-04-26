import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("wf_token");
    const name = localStorage.getItem("wf_name");
    const email = localStorage.getItem("wf_email");
    if (token && name && email) {
      setUser({ token, name, email });
    }
  }, []);

  const login = (token, name, email) => {
    localStorage.setItem("wf_token", token);
    localStorage.setItem("wf_name", name);
    localStorage.setItem("wf_email", email);
    setUser({ token, name, email });
  };

  const logout = () => {
    localStorage.removeItem("wf_token");
    localStorage.removeItem("wf_name");
    localStorage.removeItem("wf_email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
