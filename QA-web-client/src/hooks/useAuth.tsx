import React, { useState, useContext, createContext } from "react";
import fetch from "isomorphic-fetch";
import { useEffect } from "react";

// Add your Auth credentials
// AUTH_CREDENTIALS = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   appID: "",
// };

type UserState = {
  id?: Number;
  email: string;
  password: string;
  isAuthenticated: boolean;
};

type UseProvideAuthType = {
  user: UserState | null;
  signin: (email: string, password: string) => Promise<UserState>;
  signup: (email: string, password: string) => Promise<UserState>;
  signout: () => UserState;
};

const defaultUser: UserState = {
  email: "Guest",
  password: "",
  isAuthenticated: false,
};

const authContext = createContext<null | UseProvideAuthType>(null);

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext);

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState<UserState>(defaultUser);

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    try {
      if (storedUserString) {
        const storedUser = JSON.parse(storedUserString);
        setUser(storedUser);
      }
    } catch (error) {
      setUser(defaultUser);
    }
  }, []);

  // Wrap any Auth methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (
    email: string,
    password: string
  ): Promise<UserState> => {
    console.log("Signing...");

    try {
      const response = await fetch("http://localhost:5000/api/user/signin", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        const user = await data.user;
        const newUser = {
          id: await user.id,
          email: await user.username,
          password: await user.password,
          isAuthenticated: true,
        };

        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        return newUser;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error.message);
      setUser(defaultUser);
      return defaultUser;
    }

    setUser(defaultUser);
    return defaultUser;
  };

  const signup = async (
    email: string,
    password: string
  ): Promise<UserState> => {
    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        const user = await data.user;
        const newUser: UserState = {
          id: await user.id,
          email: await user.username,
          password: await user.password,
          isAuthenticated: true,
        };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        return newUser;
      }
    } catch (error) {
      console.log(error.message);
      setUser(defaultUser);
      return defaultUser;
    }
    setUser(defaultUser);
    return defaultUser;
  };

  const signout = (): UserState => {
    localStorage.removeItem("user");
    setUser(defaultUser);
    return defaultUser;
  };

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
  };
}

/*
Provider component that wraps your app and makes 
auth object available to any child component that calls useAuth().
*/
type ProvideAuthProps = {
  children: React.ReactNode;
};

export const ProvideAuth = ({ children }: ProvideAuthProps) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
