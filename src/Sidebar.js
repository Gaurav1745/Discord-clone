import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import "./Sidebar.css";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import SidebarChannel from "./SidebarChannel";
import CallIcon from "@material-ui/icons/Call";
import MicIcon from "@material-ui/icons/Mic";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/counter/userSlice";
import db from "./firebase";
import { setChanneInfo } from "./features/counter/appSlice";

function Sidebar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {
    if (channels.length !== 0) {
      dispatch(
        setChanneInfo({
          channelId: channels[0]?.id,
          channelName: channels[0]?.channel?.channelName,
        })
      );
    }
  }, [dispatch, channels]);

  const addChannel = () => {
    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Gauravs Chat Room</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon onClick={addChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel key={id} _id={id} channel={channel.channelName} />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <HelpOutlineIcon />
          <CallIcon />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar src={user?.photo} />
        <div className="sidebar__profileInfo">
          <h3>@{user?.displayName} </h3>
          <p>#{user?.uid.substring(0, 5)} </p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
