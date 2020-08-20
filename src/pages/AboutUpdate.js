import React, { Component } from "react";
import shortid from "shortid";
import { withStyles } from "@material-ui/styles";
import { AboutForm } from "./../forms";
import { Dashboard } from "./../layouts";
import axios from "./../plugins/axios";

const styles = (theme) => ({
  //
});

class AboutUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Манай баг",
      key: shortid.generate(),
      image:"",
    };
  }

  componentWillMount = () => {
    this.fetchData();
  };

  fetchData = async () => {
    const { match } = this.props;
    const { id } = match.params;

    try {
      const { data } = await axios.get(`/about/${id}`, { progress: true });

      this.setState({
        key: shortid.generate(),
        image:data.image,
      });
    } catch (e) {
      //
    }
  };

  render() {
    const { title, key,  image } = this.state;
    const { match } = this.props;
    const { id } = match.params;
    return (
      <Dashboard title={title}>
        <AboutForm
          key={key}
          path={`about/${id}`}
          method="put"
          image={image}
          message="Амжилттай шинэчлэгдлээ"
        />
      </Dashboard>
    );
  }
}

export default withStyles(styles)(AboutUpdate);
