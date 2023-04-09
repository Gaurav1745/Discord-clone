import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { selectUser } from "./features/counter/userSlice";
import {
  selectChannelId,
  selectChannelName,
} from "./features/counter/appSlice";
import db from "./firebase";
import firebase from "firebase";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, messages: doc.data() }))
          )
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader ChannelName={channelName} />
      <div className="chat__messages">
        {messages.map(({ id, messages }) => (
          <Messages
            key={id}
            message={messages.message}
            timestamp={messages.timestamp}
            user={messages.user}
          />
        ))}
      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Type in your ${channelName}`}
          />
          <button type="submit" onClick={sendMessage}>
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
