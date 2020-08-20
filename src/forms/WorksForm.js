import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import {
  TextField,
  Button,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  OutlinedInput,
} from "@material-ui/core";
import { DropZone } from "../components";
import { CustomSnackBar } from "../components";
import axios from "../plugins/axios";
import shortid from "shortid";

const styles = (theme) => ({
  marginBottom: {
    margin: "0 0 20px 0",
  },
});
class WorksForm extends Component {
  static defaultProps = {
    name: "",
    types: [],
    video: "",
    type:""
  };

  constructor(props) {
    super(props);

    const { name, types,type, video } = props;

    this.state = {
      fetching: false,
      disabled: false,
      isSnackOpen: false,
      errors: {},
      name,
      types,
      type,
      video,
    };
  }
  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = async () => {
    try {
      const { data } = await axios.get(`/filter`, { progress: true });

      this.setState({
        types: data,
        key: shortid.generate(),
      });
    } catch (e) {
      //
    }
  };

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };


  reset = () => {
    this.setState({
      errors: {},
      name: "",
      type:"",
      video: "",
    });
  };

  storeOrUpdate = async (e) => {
    e.preventDefault();
    this.setState({
      disabled: true,
      errors: {},
    });

    const { path, method } = this.props;

    const { name, type, video } = this.state;

    try {
      await axios[method](path, {
        name,
        video,
        type
      });

      this.setState({
        isSnackOpen: true,
      });

      if (method === "post") {
        this.reset();
      }

      this.setState({
        disabled: false,
      });
    } catch (err) {
      this.setState({
        disabled: false,
      });
      if (err.response.status === 422) {
        const { errors } = err.response.data;
        this.setState({ errors });
      }
    }
  };

  snackClose = () => {
    this.setState({
      isSnackOpen: false,
    });
  };

  onImageChange = (path, bool) => {
    let copyImages = [];
    if (bool === undefined) {
      this.setState((prevState) => ({
        logos: [...prevState.logos, path],
      }));
    } else {
      copyImages = this.state.logos.filter((val) => val !== path);
      this.setState({
        logos: copyImages,
      });
    }
  };

  onPictureChange = (path = "") => {
    this.setState({
      video: path,
    });
  };

  selectChanged = (e) => {
    const { value } = e.target;

    this.setState({ type: value });
  };

  render() {
    const { name, video, types,type, isSnackOpen, errors, disabled } = this.state;

    const { marginBottom } = this.props.classes;

    const { message } = this.props;

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <form onSubmit={this.storeOrUpdate}>
              <TextField
                error={!!errors.name}
                helperText={errors.name}
                label="Гарчиг"
                value={name}
                onChange={this.handleChange("name")}
                variant="outlined"
                margin="normal"
                fullWidth
              />

              <div className={marginBottom}>
                <DropZone
                  label="Бичлэг"
                  uploadPath="upload/video"
                  onChange={this.onPictureChange}
                  file={video}
                  error={!!errors.video}
                />
              </div>

              <Box my={3}>
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel id="category-select-label">Төрөл</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={type}
                    onChange={this.selectChanged}
                    input={<OutlinedInput />}
                  >
                    {types.map((val) => (
                      <MenuItem value={val.name}>{val.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                  "Хадгалах"
                )}
              </Button>
              <CustomSnackBar
                message={message}
                open={isSnackOpen}
                snackClose={this.snackClose}
              />
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(WorksForm);
