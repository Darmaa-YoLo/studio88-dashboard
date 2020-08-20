import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { TextField, Button, Grid, CircularProgress } from "@material-ui/core";
import { DropZone } from "../components";
import { CustomSnackBar } from "../components";
import axios from "../plugins/axios";

const styles = (theme) => ({
  marginBottom: {
    margin: "0 0 20px 0",
  },
});
class TeamForm extends Component {
  static defaultProps = {
    name: "",
    role: "",
    image: "",
  };

  constructor(props) {
    super(props);

    const { name, role, image } = props;

    this.state = {
      fetching: false,
      disabled: false,
      isSnackOpen: false,
      errors: {},
      name,
      image,
      role,
    };
  }

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  onCheckChange = (name) => (e) => {
    this.setState({
      [name]: e.target.checked,
    });
  };

  reset = () => {
    this.setState({
      errors: {},
      name: "",
      role: "",
      image: "",
    });
  };

  storeOrUpdate = async (e) => {
    e.preventDefault();
    this.setState({
      disabled: true,
      errors: {},
    });

    const { path, method } = this.props;

    const { name, image, role } = this.state;

    try {
      await axios[method](path, {
        name,
        image,
        role,
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

  onPictureChange = (path = "") => {
    this.setState({
      image: path,
    });
  };

  selectChanged = (e) => {
    const { value } = e.target;

    this.setState({ type: value });
  };

  render() {
    const { name, role, image, isSnackOpen, errors, disabled } = this.state;

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
                label="Нэр"
                value={name}
                onChange={this.handleChange("name")}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                error={!!errors.role}
                helperText={errors.role}
                label="Мэргэжил"
                value={role}
                onChange={this.handleChange("role")}
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <div className={marginBottom}>
                <DropZone
                  label="Зураг"
                  uploadPath="upload/image"
                  onChange={this.onPictureChange}
                  file={image}
                  error={!!errors.image}
                />
              </div>

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

export default withStyles(styles)(TeamForm);
