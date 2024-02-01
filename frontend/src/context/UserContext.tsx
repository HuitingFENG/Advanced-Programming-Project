// src/context/UserContext.js
import React, { createContext, useState, useContext, useEffect, ReactNode  } from 'react';

interface UserProviderProps {
    children: ReactNode;
}


interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  // password: string;
  type: string;
  telephone: string;
  // oldPassword: string;
  promotion: number;
  year: string;
  company: {
      name: string;
      address: string;
      city: string;
      zipCode: string;
  };
};

interface UserContextType {
    // id(id: any): unknown;
    user: User | null;
    login: (User: User) => void;
    logout: () => void;
}


const UserContext = createContext<UserContextType | null>(null);


export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
 
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKENDNODE_URL}/api/user`);
        const userData: User = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const login = (User: User) => {
    console.log("Logging in user:", User);
    localStorage.setItem('user', JSON.stringify(User));
    setUser(User); 
  };

  const logout = () => {
    console.log("Logging out user");
    localStorage.removeItem('user'); 
    setUser(null); 
  };

  const contextValue: UserContextType = {
    user,
    login,
    logout
  };


  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

