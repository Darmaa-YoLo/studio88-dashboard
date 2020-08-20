import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Dashboard } from "./../layouts";
import {
  TextField,
  Grid,
  Box,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { CustomSnackBar, DropZone } from "./../components";
import shortid from "shortid";
import axios from "./../plugins/axios";

const styles = (theme) => ({
  //
});

class HomeSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Нүүр - Тохиргоо",
      fetching: false,
      disabled: false,
      isSnackOpen: false,
      index_slogan: "",
      index_cover: "",
      feature1: "",
      feature1_desc: "",
      feature2: "",
      feature2_desc: "",
      feature3: "",
      feature3_desc: "",
      errors: {},
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
      index_slogan,
      index_cover,
      feature1,
      feature1_desc,
      feature2,
      feature2_desc,
      feature3,
      feature3_desc,
    } = this.state;

    try {
      await axios.put("/option", {
        index_slogan,
        index_cover,
        feature1,
        feature1_desc,
        feature2,
        feature2_desc,
        feature3,
        feature3_desc,
      });
      console.log("gg");
      this.setState({
        isSnackOpen: true,
        disabled: false,
      });
    } catch (err) {
      this.setState({
        disabled: false,
      });
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
      index_cover: path,
    });
  };

  render() {
    const {
      title,
      key,
      disabled,
      isSnackOpen,
      index_slogan,
      index_cover,
      feature1,
      feature1_desc,
      feature2,
      feature2_desc,
      feature3,
      feature3_desc,
      errors,
    } = this.state;

    return (
      <Dashboard title={title}>
        <form key={key} onSubmit={this.update}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box my={3}>

                <div className={styles.marginBottom}>
                  <DropZone
                    label="Арын бичлэг"
                    uploadPath="upload/video"
                    onChange={() => this.onPictureChange()}
                    file={index_cover}
                    error={!!errors.index_cover}
                  />
                </div>
              </Box>
              <Box my={3}>
                <TextField
                  label="Уриа"
                  value={index_slogan}
                  onChange={this.handleChange("index_slogan")}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={7}
                  fullWidth
                />
              </Box>

              <Box my={3}>
                <TextField
                  label="Давуу тал 1"
                  value={feature1_desc}
                  onChange={this.handleChange("feature1_desc")}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box my={3}>
                <TextField
                  label="Давуу тал 1 тайлбар"
                  value={feature1}
                  onChange={this.handleChange("feature1")}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box my={3}>
                <TextField
                  label="Давуу тал 2"
                  value={feature2_desc}
                  onChange={this.handleChange("feature2_desc")}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box my={3}>
                <TextField
                  label="Давуу тал 2 тайлбар"
                  value={feature2}
                  onChange={this.handleChange("feature2")}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box my={3}>
                <TextField
                  label="Давуу тал 3"
                  value={feature3_desc}
                  onChange={this.handleChange("feature3_desc")}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box my={3}>
                <TextField
                  label="Давуу тал 3 тайлбар"
                  value={feature3}
                  onChange={this.handleChange("feature3")}
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

export default withStyles(styles)(HomeSetting);
