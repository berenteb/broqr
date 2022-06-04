import React, { createContext, useEffect, useState } from "react";
import { User } from "../types/user";
import axios from "axios";
import { API_BASE_URL } from "./configurations";
import { GetAuthHeader } from "./getAuthHeader";
import { useServiceContext } from "./useServiceContext";
import { useNavigate } from "react-router-dom";
import { AbsolutePaths } from "./paths";
import { LoadingPage } from "../components/pages/LoadingPage";
import { ChildProp } from "../types/childProp";

const StorageKeys = {
  TOKEN: "token",
};

export type AuthContextType = {
  token: string | null;
  user: User | undefined;
  login: (token: string) => void;
  logout: () => void;
  updateUser: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: localStorage.getItem(StorageKeys.TOKEN),
  user: undefined,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export const AuthProvider: React.FC<ChildProp> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(StorageKeys.TOKEN)
  );
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const { displayMessage } = useServiceContext();
  const navigate = useNavigate();
  const login = (token: string) => {
    setToken(token);
    localStorage.setItem(StorageKeys.TOKEN, token);
  };
  const logout = () => {
    setToken(null);
    setUser(undefined);
    localStorage.removeItem(StorageKeys.TOKEN);
    navigate(AbsolutePaths.MAIN);
  };
  const updateUser = () => {
    if (token) {
      setLoading(true);
      axios
        .get<User>(`${API_BASE_URL}/user`, GetAuthHeader(token))
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          logout();
          displayMessage("Újboli bejelentkezés szükséges!", {
            toast: true,
            toastStatus: "warning",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  useEffect(updateUser, [token]);
  if (loading) return <LoadingPage />;
  return (
    <AuthContext.Provider value={{ token, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
