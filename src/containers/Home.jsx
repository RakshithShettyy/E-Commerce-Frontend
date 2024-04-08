import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { auth } from "../firebase-config";

const Home = () => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Logged in user:", user);
        // You can access more user information if needed
        // e.g., user.email
      } else {
        console.log("No user is logged in");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  return (
    <>
      <Navbar />
    </>
  );
};

export default Home;
