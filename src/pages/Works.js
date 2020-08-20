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
    name: "name",
    title: "Гарчиг",
  },
  {
      name:"type",
      title:"Төрөл"
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
      <ActionUpdateButton path={pathJoin("works", id)} />
    ),
  },
];

const dateColumns = ["created", "updated"];

export default class Works extends Component {
  constructor(props) {
    super(props);
    this.table = React.createRef();
  }

  fetchData = () => {
    return this.table.current.fetchData();
  };

  render() {
    return (
      <Dashboard title="Хийсэн ажлууд">
        <BaseTableActions>
          <Grid item>
            <ActionNewButton path="/works/new" />
          </Grid>
          <Grid item>
            <ActionDelete
              path="/works/mass/destroy"
              onDelete={this.fetchData}
            />
          </Grid>
        </BaseTableActions>
        <BaseTable
          path="works"
          columns={columns}
          dateColumns={dateColumns}
          innerRef={this.table}
        />
      </Dashboard>
    );
  }
}
