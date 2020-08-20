import React, { Component } from "react";
import shortid from "shortid";
import { withStyles } from "@material-ui/styles";
import { ClientForm } from "./../forms";
import { Dashboard } from "./../layouts";
import axios from "./../plugins/axios";

const styles = (theme) => ({
  //
});

class ClientsUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Үйлчлүүлэгчид",
      key: shortid.generate(),
      name: "",
      logo:""
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
      const { data } = await axios.get(`/clients/${id}`, { progress: true });

      this.setState({
        key: shortid.generate(),
        name: data.name,
        logo:data.logo,
      });
    } catch (e) {
      //
    }
  };

  render() {
    const { title, key, name, logo } = this.state;
    const { match } = this.props;
    const { id } = match.params;
    return (
      <Dashboard title={title}>
        <ClientForm
          key={key}
          path={`clients/${id}`}
          method="put"
          name={name}
          logo={logo}
          message="Амжилттай шинэчлэгдлээ"
        />
      </Dashboard>
    );
  }
}

export default withStyles(styles)(ClientsUpdate);
