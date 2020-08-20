import React from "react";
import Modal from "@material-ui/core/Modal";
import { Close } from "mdi-material-ui";
import { IconButton } from "@material-ui/core";
export default function SimpleModal(props) {
  const link = `${props.url()}`;

  console.log(link);
  const image = (
    <div style={{ outline: 0 }}>
      <img
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "70%",
          marginTop: "10%",
        }}
        src={link}
        alt=""
      />
      <IconButton
        color="secondary"
        style={{ right: "10%", top: "10%", position: "absolute" }}
        edge="end"
        onClick={props.onClose}
      >
        <Close fontSize="large" />
      </IconButton>
    </div>
  );

  const video = (
    <div style={{ outline: 0 }}>
      <video
        style={{
          display: "block",
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10%",
          border: "2px solid black",
        }}
        controls
        src={link}
      />
      <IconButton
        color="secondary"
        style={{ right: "10%", top: "10%", position: "absolute" }}
        edge="end"
        onClick={props.onClose}
      >
        <Close fontSize="large" />
      </IconButton>
    </div>
  );

  function body() {
    if (link.includes("img")) {
      return image;
    }
    if (link.includes("video")) {
      return video;
    }
  }
  return (
    <div>
      <Modal open={props.open} disableEnforceFocus onClose={props.onClose}>
        {body()}
      </Modal>
    </div>
  );
}
