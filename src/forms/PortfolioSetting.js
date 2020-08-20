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

class PortfolioSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Хийсэн ажлууд - Тохиргоо",
      fetching: false,
      disabled: false,
      isSnackOpen: false,
      portfolio_cover: "",
      portfolio_desc:"",
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

    const { portfolio_cover ,portfolio_desc} = this.state;

    try {
      await axios.put("/option", {
        portfolio_cover,
        portfolio_desc,
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
      portfolio_cover: path,
    });
  };

  render() {
    const {
      title,
      key,
      disabled,
      isSnackOpen,
      portfolio_cover,
      portfolio_desc,
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
                    label="Зураг"
                    uploadPath="upload/image"
                    onChange={this.onPictureChange}
                    file={portfolio_cover}
                    error={!!errors.portfolio_cover}
                  />
                </div>
              </Box>
              <Box my={3}>
                <TextField
                  label="Бидний хийсэн ажлууд"
                  value={portfolio_desc}
                  onChange={this.handleChange("portfolio_desc")}
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

export default withStyles(styles)(PortfolioSetting);
