import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Dashboard } from "../layouts";
import {
  TextField,
  Grid,
  Box,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { CustomSnackBar, DropZone } from "../components";
import shortid from "shortid";
import axios from "../plugins/axios";

const styles = (theme) => ({
  marginBottom: {
    margin: "0 0 20px 0",
  },
});

class ContactSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Холбоо барих - Тохиргоо",
      fetching: false,
      disabled: false,
      isSnackOpen: false,
      errors:{},
      contact_mail: "",
      contact_phone: "",
      contact_address: "",
      contact_map: "",
      contatct_cover: "",
      facebook: "",
      instagram: "",
      youtube: "",
    };
  }

  componentWillMount = () => {
    this.fetchData();
  };

  fetchData = async () => {
    try {
      this.setState({
        key: shortid.generate(),
      });

      const { data } = await axios.get(`/option`, { progress: true });

      data.map((item) =>
        this.setState({
          [item.name]: item.value ? item.value : item.images,
        })
      );
    } catch (e) {
      //
    }
  };

  update = async (e) => {
    e.preventDefault();
    this.setState({
      disabled: true,
    });

    const {
      contact_mail,
      contact_phone,
      contact_address,
      contact_map,
      facebook,
      contact_cover,
      instagram,
      errors,
      youtube,
    } = this.state;

    try {
      await axios.put("/option", {
        contact_mail,
        contact_phone,
        contact_address,
        contact_map,
        contact_cover,
        facebook,
        errors,
        instagram,
        youtube,
      });

      this.setState({
        isSnackOpen: true,
        disabled: false,
      });
    } catch (err) {
      //
    }
  };

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  snackClose = () => {
    this.setState({
      isSnackOpen: false,
    });
  };

  onImageChange = (name) => (path, bool) => {
    let copyImages = [];
    if (bool === undefined) {
      this.setState((prevState) => ({
        [name]: [...prevState[name], path],
      }));
    } else {
      copyImages = this.state[name].filter((val) => val !== path);
      this.setState({
        [name]: copyImages,
      });
    }
  };

  onPictureChange = (path = "") => {
    this.setState({
      contact_cover: path,
    });
  };

  render() {
    const {
      title,
      key,
      disabled,
      isSnackOpen,
      contact_mail,
      contact_phone,
      contact_address,
      contact_map,
      errors,
      facebook,
      instagram,
      contact_cover,
      youtube,
    } = this.state;

    return (
      <Dashboard title={title}>
        <form key={key} onSubmit={this.update}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box my={3}>
                <div className={styles.marginBottom}>
                  <DropZone
                    label="Зураг"
                    uploadPath="upload/image"
                    onChange={this.onPictureChange}
                    file={contact_cover}
                    error={!!errors.contact_cover}
                  />
                </div>
              </Box>
              <Box my={3}>
                <TextField
                  label="И-мэйл"
                  value={contact_mail}
                  onChange={this.handleChange("contact_mail")}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box my={3}>
                <TextField
                  label="Утас"
                  value={contact_phone}
                  onChange={this.handleChange("contact_phone")}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box my={3}>
                <TextField
                  label="Хаяг"
                  value={contact_address}
                  onChange={this.handleChange("contact_address")}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box my={3}>
                <TextField
                  label="Байршил"
                  value={contact_map}
                  onChange={this.handleChange("contact_map")}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box my={3}>
                <TextField
                  label="Facebook"
                  value={facebook}
                  onChange={this.handleChange("facebook")}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box my={3}>
                <TextField
                  label="Instagram"
                  value={instagram}
                  onChange={this.handleChange("instagram")}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box my={3}>
                <TextField
                  label="Youtube"
                  value={youtube}
                  onChange={this.handleChange("youtube")}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={disabled}
              >
                {disabled ? (
                  <CircularProgress size={25} color="primary" />
                ) : (
                  "Шинэчлэх"
                )}
              </Button>
            </Grid>
          </Grid>
          <CustomSnackBar
            message="Амжилттай шинэчлэгдлээ"
            open={isSnackOpen}
            snackClose={this.snackClose}
          />
        </form>
      </Dashboard>
    );
  }
}

export default withStyles(styles)(ContactSetting);
