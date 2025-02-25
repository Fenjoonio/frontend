"use client";

import {
  useMemo,
  useState,
  useContext,
  createContext,
  type Dispatch,
  type SetStateAction,
  type PropsWithChildren,
} from "react";

type AuthContextTypes = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext is used outside of its provider");
  }

  return context;
}

type AuthProviderProps = {
  initialAccessToken?: string;
};

export default function AuthProvider({
  children,
  initialAccessToken,
}: PropsWithChildren<AuthProviderProps>) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialAccessToken);

  const values = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
