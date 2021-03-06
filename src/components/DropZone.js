import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
  Avatar,
  Fade,
} from "@material-ui/core";
import { PopUp } from "./";
import { Fullscreen, Close } from "mdi-material-ui";

import mime from "mime";
import axios from "./../plugins/axios";

const styles = (theme) => ({
  input: {
    display: "none",
  },
  uploader: {
    position: "relative",
    display: "block",
    textAlign: "center",
    border: "2px dashed rgba(0, 0, 0, 0.12)",
    backgroundColor: "#fff",
    color: "#43425d",
  },
  hasError: {
    borderColor: "rgba(245, 0, 81, 0.2)",
    color: "#f50057",
  },
  inner: {
    padding: theme.spacing(4, 2),
  },
  uploaderImage: {
    display: "inline-block",
    width: "auto",
    height: 80,
  },
  typography: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    fontWeight: 300,
  },
  button: {
    padding: "6px 24px",
  },
  circularProgress: {
    position: "absolute",
    top: theme.spacing(2),
    bottom: "auto",
    right: theme.spacing(2),
    left: "auto",
  },
  avatar: {
    borderRadius: 0,
  },
  labelStyle: {
    margin: "25px 0 10px 0",
    fontSize: "18px",
  },
});

const extensions = [
  "csv",
  "jpeg",
  "jpg",
  "mp4",
  "pdf",
  "png",
  "ppt",
  "rar",
  "svg",
  "xls",
  "zip",
];

class DropZone extends Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();

    this.state = {
      errors: {},
      progress: 0,
      uploading: false,
      isModal: false,
    };
  }

  uploadFile = async (e) => {
    try {
      this.setState({
        errors: {},
        progress: 0,
        uploading: true,
      });

      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          const { total, loaded } = event;
          const progress = Math.round((loaded / total) * 100);

          this.setState({ progress });
        },
      };

      const { uploadPath } = this.props;
      const { path } = await axios.post(uploadPath, formData, config);

      this.setState({
        uploading: false,
      });

      const { onChange } = this.props;
      onChange(path);
    } catch (err) {
      if (err.response.status === 422) {
        const { errors } = err.response.data;
        this.setState({
          errors,
          uploading: false,
        });
      }
    }
  };

  removeFile = () => {
    const { onChange } = this.props;
    onChange();
  };

  filePath = () => {
    const { file } = this.props;
    const type = mime.getType(file);
    const value = mime.getExtension(type);
    var imgPath = "";
    if (
      value === "mp4" ||
      value === "avi" ||
      value === "mov" ||
      value === "mkv"
    ) {
      imgPath = `${process.env.REACT_APP_API_URL}/video/${file}`;
    } else {
      imgPath = `${process.env.REACT_APP_API_URL}/img/${file}`;
    }
    return imgPath;
  };

  fileExtension = () => {
    const { file } = this.props;
    const type = mime.getType(file);
    const value = mime.getExtension(type);

    return value;
  };

  avatarSrc = () => {
    const ext = this.fileExtension();
    const file = extensions.includes(ext) ? ext : "default";

    return `/static/images/files/${file}.png`;
  };

  toggleModal = () => {
    this.setState({
      isModal: !this.state.isModal
    })
  }

  render() {
    const { errors, progress, uploading,isModal } = this.state;
    const { classes, file, error, required, label } = this.props;
    const {
      input,
      uploader,
      uploaderImage,
      hasError,
      inner,
      typography,
      button,
      circularProgress,
      avatar,
      labelStyle,
    } = classes;

    const empty = (
      <div>
        {uploading && (
          <div>
            <CircularProgress
              className={circularProgress}
              variant="static"
              color="inherit"
              value={100}
              style={{
                opacity: 0.2,
              }}
            />
            <CircularProgress
              className={circularProgress}
              variant="static"
              value={progress}
            />
          </div>
        )}
        <div className={inner}>
          <img
            className={uploaderImage}
            src="/static/images/box.png"
            alt="box"
          />
          {errors.file ? (
            errors.file.map((err) => (
              <Typography
                variant="subtitle1"
                className={typography}
                align="center"
                children={err}
              />
            ))
          ) : (
            <Typography
              variant="subtitle1"
              className={typography}
              align="center"
              children="Файл хуулахын тулд доорх товч дээр дарна уу"
            />
          )}
          <label>
            <input
              ref={this.input}
              className={input}
              onChange={this.uploadFile}
              disabled={uploading}
              type="file"
            />
            <Button
              className={button}
              disabled={uploading}
              component="span"
              variant="contained"
              color="primary"
            >
              Файл хуулах
            </Button>
          </label>
        </div>
      </div>
    );

    const fileManager = (
      <div>
        <Fade in>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={this.avatarSrc()} className={avatar} />
              </ListItemAvatar>
              <ListItemText secondary="173 KB" />
              <ListItemSecondaryAction>
                <IconButton
                  edge="start"
                  color="default"
                  onClick={this.toggleModal}
                  //href={this.filePath()}
                  target="_blank"
                >
                  <Fullscreen />
                </IconButton>
                <IconButton
                  edge="end"
                  color="secondary"
                  onClick={this.removeFile}
                >
                  <Close />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Fade>
        <PopUp 
          onClose={this.toggleModal}
          url={this.filePath}
          open={isModal}
        />
      </div>
    );

    return (
      <div>
        <Typography className={labelStyle}>
          {label}
          {required && " *"}
        </Typography>
        <div
          className={classNames(uploader, {
            [hasError]: !!errors.file || error,
          })}
        >
          {file ? fileManager : empty}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DropZone);
