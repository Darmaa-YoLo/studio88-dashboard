import React, { Component } from "react";
import shortid from "shortid";
import { withStyles } from "@material-ui/styles";
import { FilterForm } from "./../forms";
import { Dashboard } from "./../layouts";
import axios from "./../plugins/axios";

const styles = (theme) => ({
  //
});

class FilterUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Үйлчлүүлэгчид",
      key: shortid.generate(),
      name: "",
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
      const { data } = await axios.get(`/filter/${id}`, { progress: true });

      this.setState({
        key: shortid.generate(),
        name: data.name,
      });
    } catch (e) {
      //
    }
  };

  render() {
    const { title, key, name } = this.state;
    const { match } = this.props;
    const { id } = match.params;
    return (
      <Dashboard title={title}>
        <FilterForm
          key={key}
          path={`filter/${id}`}
          method="put"
          name={name}
          message="Амжилттай шинэчлэгдлээ"
        />
      </Dashboard>
    );
  }
}

export default withStyles(styles)(FilterUpdate);
