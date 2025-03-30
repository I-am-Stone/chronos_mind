// context/authContext.js
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);
  
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => useContext(AuthContext);
