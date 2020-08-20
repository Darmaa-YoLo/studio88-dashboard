import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { Dashboard } from "./../layouts";
import {
  ActionDelete,
  ActionNewButton,
  ActionUpdateButton,
  BaseTable,
  BaseTableActions,
} from "./../components";
import { pathJoin } from "./../utils/helpers";

const columns = [
  {
    name: "image",
    title: "Зураг",
  },
  {
    name: "created",
    title: "Бүртгүүлсэн",
  },
  {
    name: "updated",
    title: "Шинэчлэгдсэн",
  },
  {
    getCellValue: ({ id }) => (
      <ActionUpdateButton path={pathJoin("about", id)} />
    ),
  },
];

const dateColumns = ["created", "updated"];

export default class About extends Component {
  constructor(props) {
    super(props);
    this.table = React.createRef();
  }

  fetchData = () => {
    return this.table.current.fetchData();
  };

  render() {
    return (
      <Dashboard title="Бидний тухай зургууд">
        <BaseTableActions>
          <Grid item>
            <ActionNewButton path="/about/new" />
          </Grid>
          <Grid item>
            <ActionDelete
              path="/about/mass/destroy"
              onDelete={this.fetchData}
            />
          </Grid>
        </BaseTableActions>
        <BaseTable
          path="about"
          columns={columns}
          dateColumns={dateColumns}
          innerRef={this.table}
        />
      </Dashboard>
    );
  }
}
