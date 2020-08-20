import React, { Component } from "react";
import shortid from "shortid";
import { withStyles } from "@material-ui/styles";
import { WorksForm } from "./../forms";
import { Dashboard } from "./../layouts";
import axios from "./../plugins/axios";

const styles = (theme) => ({
  //
});

class WorksUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Ажил",
      key: shortid.generate(),
      name: "",
      type: ["Сурталчигаа", "Кино", "Найруулга", "Клип"],
      videos: "",
    };
  }

  componentWillMount = () => {
    this.fetchData();
    // this.fetchCategories();
  };

//   fetchCategories = async () => {
//     try {
//       const { data } = await axios.get("/channel_categories", {
//         progress: true,
//         params: {
//           rowsPerPage: -1,
//           sortBy: "name",
//           sortOrder: "asc",
//         },
//       });

//       this.setState({
//         key: shortid.generate(),
//         channel_categories: data,
//       });
//     } catch (err) {
//       //
//     }
//   };

  fetchData = async () => {
    const { match } = this.props;
    const { id } = match.params;

    try {
      const { data } = await axios.get(`/works/${id}`, { progress: true });

      this.setState({
        key: shortid.generate(),
        name: data.name,
        videos: data.videos,
        type: data.type,
      });
    } catch (e) {
      //
    }
  };

  render() {
    const { title, key, name, type, videos } = this.state;
    const { match } = this.props;
    const { id } = match.params;
    return (
      <Dashboard title={title}>
        <WorksForm
          key={key}
          path={`works/${id}`}
          method="put"
          name={name}
          type={type}
          videos={videos}
          message="Амжилттай шинэчлэгдлээ"
        />
      </Dashboard>
    );
  }
}

export default withStyles(styles)(WorksUpdate);
