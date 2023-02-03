import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { storeData } from "../firebase";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("No auth provider");
  return context;
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(auth.currentUser);

  const signup = async (email, password) => {
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser = {
      code: userData.user.uid,
      name: email,
      pw: password,
      role: 1,
    };
    await storeData("users", newUser);
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <authContext.Provider value={{ signup, login, user, logout }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
