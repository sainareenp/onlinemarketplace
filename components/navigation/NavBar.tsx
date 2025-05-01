"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Adjust the path as needed
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Adjust the path as needed
import { ModeToggle } from "@/components/ui/mode-toggle";
import NavBarDropDown from "@/components/ui/navBarDropDown";
import { FaBell } from "react-icons/fa";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig"; 

const NavBar: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      where("read", "==", false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHasUnread(!snapshot.empty);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <nav className="bg-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <span
          onClick={() => router.push("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          SecureMarket
        </span>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-lg">Welcome, {user.name}</span>
            <button
              onClick={() => router.push("/notifications")}
              className="relative p-2 rounded-md border border-border bg-background hover:bg-muted transition-colors"
              aria-label="Notifications"
            >
              <FaBell className="text-foreground" />
              {hasUnread && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            <ModeToggle />
            <NavBarDropDown />

            <Button
 				 variant="outline"
  					onClick={() => router.push("/RatePage")} // Change this to "/rate" if you're routing directly
  				className="ml-4"
			>
  				Rate Us
			</Button>


          </div>
        ) : (
          <div className="flex space-x-4">
            <Button
              className="bg-secondary-foreground"
              onClick={() => router.push("/auth")}
            >
              Login/Register
            </Button>
            <ModeToggle />
            <NavBarDropDown />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
