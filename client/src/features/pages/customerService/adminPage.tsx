// sesi Admin
import { useAppSelector } from '@/app/stores/stores';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@radix-ui/react-separator';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { NavIcons } from '../dashboard/page';

// Define the type for a message
type Message = {
  senderId: number;
  message: string;
};

export default function ComplaisnPage() {
  const avatar = useAppSelector((state) => state.profile.profile.avatar);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const adminId = '1'; // Admin's ID
  const clientUserId = '2'; // Client's user ID for the room (this would ideally be dynamic)

  useEffect(() => {
    // Connect to the Socket.IO server
    const socketConnection = io('http://localhost:3000', {
      query: { userId: adminId },
    });
    setSocket(socketConnection);

    socketConnection.on('connected', ({ rooms }) => {
      console.log('Rooms available:', rooms);
    });

    socketConnection.on('switchedRoom', ({ roomId }) => {
      console.log('Switched to room:', roomId);
    });

    socketConnection.on('previousMessages', (prevMessages: Message[]) => {
      setMessages(prevMessages);
    });

    socketConnection.on('receiveChats', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  // const handleSwitchRoom = (targetUserId: string) => {
  //   if (socket) {
  //     socket.emit('switchRoom', targetUserId);
  //   }
  // };

  const handleSendMessage = () => {
    if (socket && input.trim()) {
      const messageData = {
        roomId: `${clientUserId}${adminId}`,
        message: input,
        userId: parseInt(adminId),
      };
      socket.emit('sendChat', messageData);
      setMessages((prev) => [
        ...prev,
        { senderId: parseInt(adminId), message: input },
      ]);
      setInput('');
    }
  };
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar
        icons={NavIcons}
        avatarSrc={avatar!}
      />
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <Navbar />
        <div className="bg-black min-h-screen p-8 overflow-hidden">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <Separator
              orientation="horizontal"
              className="bg-[#6A6A6A]/30 h-1"
            />

            <div className="flex">
              {/* Left Side: Chat List */}
              <div className="w-1/4 min-h-[500px] p-4 border-e-2 border-[#6A6A6A]/30">
                <div className="flex items-center gap-4 p-2">
                  <Avatar>
                    <AvatarImage
                      src={avatar}
                      alt="Admin avatar"
                      className="object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white text-lg font-bold">Admin</h3>
                    <p className="text-gray-400">How can I assist you today?</p>
                  </div>
                </div>
                {/* Additional users could be mapped here */}
              </div>

              {/* Right Side: Chat Box */}
              <div className="w-3/4 bg-black p-4">
                <div className="flex flex-col h-full">
                  {/* Messages */}
                  <div className="flex flex-col gap-4 h-[420px] overflow-y-auto">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.senderId === parseInt(adminId)
                            ? 'justify-end'
                            : 'justify-start'
                        } gap-2`}
                      >
                        {msg.senderId !== parseInt(adminId) && (
                          <Avatar>
                            <AvatarImage
                              src={avatar}
                              alt="User avatar"
                              className="object-cover"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`p-3 rounded-lg max-w-[75%] ${
                            msg.senderId === parseInt(adminId)
                              ? 'bg-[#212121] text-white'
                              : 'bg-gray-800 text-white'
                          }`}
                        >
                          {msg.message}
                        </div>
                        {msg.senderId === parseInt(adminId) && (
                          <Avatar>
                            <AvatarImage
                              src={avatar}
                              alt="Admin avatar"
                              className="object-cover"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="mt-auto p-4">
                    <div className="flex items-center bg-[#212121] rounded-lg">
                      <input
                        type="text"
                        placeholder="Send Message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full bg-transparent p-3 text-white outline-none"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="p-3 text-white"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
