import React from "react";
import { useDispatch } from "react-redux";
import { setChanneInfo } from "./features/counter/appSlice";

function SidebarChannel({ _id, channel }) {
  const dispatch = useDispatch();

  return (
    <div
      id={_id}
      className="sidebar_channel"
      onClick={() =>
        dispatch(
          setChanneInfo({
            channelId: _id,
            channelName: channel,
          })
        )
      }
    >
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {channel}
      </h4>
    </div>
  );
}

export default SidebarChannel;
