// 'use client';

// interface ChatPageProps {
//   params: { sellerId: string };
//   searchParams: { [key: string]: string | undefined };
// }

// export default function ChatPage({ params, searchParams }: ChatPageProps) {

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold">Chat with Seller</h1>
//       <p>Seller ID: {searchParams.seller}</p>
//       {searchParams.item && (
//         <p>Item ID: <strong>{searchParams.item}</strong></p>
//       )}
//     </div>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { db } from "@/firebaseConfig";;
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
//   serverTimestamp
// } from 'firebase/firestore';

// interface ChatPageProps {
//   params: { sellerId: string };
//   searchParams: { [key: string]: string | undefined };
// }

// interface Message {
//   senderId: string;
//   receiverId: string;
//   content: string;
//   timestamp: any;
//   itemId: string;
// }

// export default function ChatPage({ params, searchParams }: ChatPageProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMsg, setNewMsg] = useState('');
//   const senderId = 'currentUser123'; // 🔁 Replace with real auth ID
//   const receiverId = params.sellerId;
//   const itemId = searchParams.item ?? '';

//   useEffect(() => {
//     if (!receiverId || !itemId) return;

//     const msgQuery = query(
//       collection(db, 'messages'),
//       where('itemId', '==', itemId),
//       where('senderId', 'in', [senderId, receiverId]),
//       where('receiverId', 'in', [senderId, receiverId]),
//       orderBy('timestamp', 'asc')
//     );

//     const unsubscribe = onSnapshot(msgQuery, (snapshot) => {
//       const msgs = snapshot.docs.map((doc) => doc.data() as Message);
//       setMessages(msgs);
//     });

//     return () => unsubscribe();
//   }, [receiverId, itemId]);

// //   const sendMessage = async () => {
// //     if (!newMsg.trim()) return;

// //     await addDoc(collection(db, 'messages'), {
// //       senderId,
// //       receiverId,
// //       content: newMsg,
// //       itemId,
// //       timestamp: serverTimestamp(),
// //     });

// //     setNewMsg('');
// //   };
// const sendMessage = async () => {
//     if (!newMsg.trim() || !receiverId || !itemId) {
//       console.warn("Missing required fields for message:", { receiverId, itemId });
//       return;
//     }
  
//     await addDoc(collection(db, 'messages'), {
//       senderId,
//       receiverId,
//       content: newMsg,
//       itemId,
//       timestamp: serverTimestamp(),
//     });
  
//     setNewMsg('');
//   };
  
//   return (
//     <div className="p-8 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Chat</h1>

//       <div className="bg-gray-100 h-64 p-4 overflow-y-scroll rounded shadow">
//         {messages.map((msg, idx) => (
//           <div key={idx} className="mb-2">
//             <strong>{msg.senderId === senderId ? 'You' : 'Seller'}:</strong> {msg.content}
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-2 mt-4">
//         <input
//           className="flex-1 border p-2 rounded"
//           value={newMsg}
//           onChange={(e) => setNewMsg(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white rounded">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
// ----------------------------------------

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

interface ChatPageProps {
  params: { sellerId: string };
}

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: any;
  itemId: string;
}

export default function ChatPage({ params }: ChatPageProps) {
  const searchParams = useSearchParams();
  const itemId = searchParams.get('item');
  const receiverId = params.sellerId;
  const senderId = 'currentUser123'; // TODO: Replace with real auth user ID

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState('');

  // ✅ Load chat messages in real-time
  useEffect(() => {
    if (!receiverId || !itemId) return;

    const q = query(
      collection(db, 'messages'),
      where('itemId', '==', itemId),
      where('senderId', 'in', [senderId, receiverId]),
      where('receiverId', 'in', [senderId, receiverId]),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loaded = snapshot.docs.map((doc) => doc.data() as Message);
      setMessages(loaded);
    });

    return () => unsubscribe();
  }, [receiverId, itemId]);

  // ✅ Send message to Firestore
  const sendMessage = async () => {
    if (!newMsg.trim() || !receiverId || !itemId) return;

    await addDoc(collection(db, 'messages'), {
      senderId,
      receiverId,
      content: newMsg,
      itemId,
      timestamp: serverTimestamp(),
    });

    setNewMsg('');
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chat with Seller</h1>
      <p className="text-gray-600 mb-2">Seller ID: {receiverId}</p>
      {itemId && <p className="text-gray-600 mb-4">Item ID: {itemId}</p>}

      <div className="bg-gray-100 h-64 p-4 overflow-y-auto rounded shadow-sm mb-4">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <strong>{msg.senderId === senderId ? 'You' : 'Seller'}:</strong>{' '}
              {msg.content}
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
