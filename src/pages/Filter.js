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
    title: "Төрөл",
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
      <ActionUpdateButton path={pathJoin("filter", id)} />
    ),
  },
];

const dateColumns = ["created", "updated"];

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.table = React.createRef();
  }

  fetchData = () => {
    return this.table.current.fetchData();
  };

  render() {
    return (
      <Dashboard title="Шүүлтүүрүүд">
        <BaseTableActions>
          <Grid item>
            <ActionNewButton path="/filter/new" />
          </Grid>
          <Grid item>
            <ActionDelete
              path="/filter/mass/destroy"
              onDelete={this.fetchData}
            />
          </Grid>
        </BaseTableActions>
        <BaseTable
          path="filter"
          columns={columns}
          dateColumns={dateColumns}
          innerRef={this.table}
        />
      </Dashboard>
    );
  }
}
