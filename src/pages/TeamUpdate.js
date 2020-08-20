import React, { Component } from "react";
import shortid from "shortid";
import { withStyles } from "@material-ui/styles";
import { TeamForm } from "./../forms";
import { Dashboard } from "./../layouts";
import axios from "./../plugins/axios";

const styles = (theme) => ({
  //
});

class TeamUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Манай баг",
      key: shortid.generate(),
      name: "",
      image:"",
      role:""
    };
  }

  componentWillMount = () => {
    this.fetchData();
  };

  fetchData = async () => {
    const { match } = this.props;
    const { id } = match.params;

    try {
      const { data } = await axios.get(`/team/${id}`, { progress: true });

      this.setState({
        key: shortid.generate(),
        name: data.name,
        image:data.image,
      });
    } catch (e) {
      //
    }
  };

  render() {
    const { title, key, name, image,role } = this.state;
    const { match } = this.props;
    const { id } = match.params;
    return (
      <Dashboard title={title}>
        <TeamForm
          key={key}
          path={`team/${id}`}
          method="put"
          name={name}
          image={image}
          role={role}
          message="Амжилттай шинэчлэгдлээ"
        />
      </Dashboard>
    );
  }
}

export default withStyles(styles)(TeamUpdate);
