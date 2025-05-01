"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { formatDistance } from "date-fns"; // ✅ fallback

interface PresenceIndicatorProps {
  userId: string;
}

export default function PresenceIndicator({ userId }: { userId: string }) {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [lastSeen, setLastSeen] = useState<Date | null>(null);

  useEffect(() => {
    const statusRef = doc(db, "status", userId);
    const unsubscribe = onSnapshot(statusRef, (snapshot) => {
      const data = snapshot.data();
      if (data) {
        setIsOnline(data.online);
        setLastSeen(data.lastSeen?.toDate?.() || null);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  if (isOnline === null) return null;

  return (
    <div className="text-xs text-gray-600">
      {isOnline ? (
        <span className="text-green-500">🔵 Online</span>
      ) : lastSeen ? (
        <span>
          🕓 Last seen{" "}
          {formatDistance(lastSeen ?? new Date(), new Date(), { addSuffix: true })}
        </span>
      ) : (
        <span className="text-gray-400">Offline</span>
      )}
    </div>
  );
}
