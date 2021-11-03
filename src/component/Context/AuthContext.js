import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../config-firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "@firebase/firestore";
const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState([]);
  const [name, setName] = useState("");
  const [todo, setTodo] = useState("");
  let [newTask, setNewTask] = useState("");
  let [mesg, setMesg] = useState("");
  let address = collection(db, "task");

  function signup(email, password, name) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (user) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        return setName(user);
      }
    );
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return auth.signOut();
  }

  //database stuffs

  //add task to the database.
  const sendData = (task) => {
    // console.log("current user", currentUser);
    return addDoc(address, { task, userId: currentUser.uid });
  };

  const deleteData = async (id) => {
    let newAddress = doc(db, "task", id);
    await deleteDoc(newAddress);
  };

  const updateForm = async (id) => {
    let newAddress = doc(db, "task", id);
    await updateDoc(newAddress, { task: newTask });
    setNewTask("");
  };

  let storedUser;

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   storedUser = async () => {
  //     let task = await getDocs(address);
  //     let taskArray = task.docs.map((doc) => {
  //       return { ...doc.data(), id: doc.id };
  //     });

  //     setTodo(taskArray);
  //   };

  //   storedUser();
  // }, []);

  useEffect(() => {
    const q = query(collection(db, "task"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setTodo(
        querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
    console.log("aaa", todo);
  }, []);
  //set user when we create account
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, [setCurrentUser]);

  //retreive data

  useEffect(() => {});

  const value = {
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout,
    sendData,
    todo,
    deleteData,
    newTask,
    setNewTask,
    updateForm,
    mesg,
    setMesg,
    name,
    setName,
    updateProfile,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  return useContext(AuthContext);
}
