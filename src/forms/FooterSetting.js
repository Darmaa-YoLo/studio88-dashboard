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
import { CustomSnackBar } from "../components";
import shortid from "shortid";
import axios from "../plugins/axios";

const styles = (theme) => ({
  //
});

class FooterSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Доод тал - Тохиргоо",
      fetching: false,
      disabled: false,
      isSnackOpen: false,
      footer: ""
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
      footer
    } = this.state;

    try {
      await axios.put("/option", {
        footer
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

  onPictureChange = (name) => (path = "") => {
    this.setState({
      [name]: path,
    });
  };

  render() {
    const {
      title,
      key,
      disabled,
      isSnackOpen,
      footer,
    } = this.state;

    return (
      <Dashboard title={title}>
        <form key={key} onSubmit={this.update}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box my={3}>
                <TextField
                  label="Төгсгөл хэсгийн мэдээлэл"
                  value={footer}
                  onChange={this.handleChange("footer")}
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

export default withStyles(styles)(FooterSetting);
