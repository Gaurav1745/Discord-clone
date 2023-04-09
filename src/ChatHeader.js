import React from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SearchIcon from "@material-ui/icons/Search";
import HelpIcon from "@material-ui/icons/Help";
import SendIcon from "@material-ui/icons/Send";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { IconButton } from "@material-ui/core";
import { auth } from "./firebase";

function ChatHeader({ ChannelName }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader_hash">#</span> {ChannelName}
        </h3>
      </div>
      <div className="chatHeader__right">
        <NotificationsIcon />
        <EditLocationIcon />
        <PeopleAltIcon />
        <div className="chatHeader__search">
          <input placeholder="Search" />
          <SearchIcon />
        </div>
        <SendIcon />
        <HelpIcon />
        <IconButton style={{ color: "#808080" }} onClick={() => auth.signOut()}>
          <ExitToAppIcon className="chatHeader__ExitAppIcon" />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatHeader;
