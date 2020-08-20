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
    title: "Нэр",
  },
  {
    name: "role",
    title: "Мэргэжил",
  },
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
      <ActionUpdateButton path={pathJoin("team", id)} />
    ),
  },
];

const dateColumns = ["created", "updated"];

export default class Team extends Component {
  constructor(props) {
    super(props);
    this.table = React.createRef();
  }

  fetchData = () => {
    return this.table.current.fetchData();
  };

  render() {
    return (
      <Dashboard title="Манай баг">
        <BaseTableActions>
          <Grid item>
            <ActionNewButton path="/team/new" />
          </Grid>
          <Grid item>
            <ActionDelete
              path="/team/mass/destroy"
              onDelete={this.fetchData}
            />
          </Grid>
        </BaseTableActions>
        <BaseTable
          path="team"
          columns={columns}
          dateColumns={dateColumns}
          innerRef={this.table}
        />
      </Dashboard>
    );
  }
}
