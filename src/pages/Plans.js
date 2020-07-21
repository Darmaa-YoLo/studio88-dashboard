import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { Dashboard } from './../layouts'
import {
    ActionDelete,
    ActionNewButton,
    ActionUpdateButton,
    BaseTable,
    BaseTableActions
} from './../components'
import { pathJoin } from './../utils/helpers'

const columns = [
    {
        name: 'name',
        title: 'Нэр'
    },
    {
        name: 'created',
        title: 'Бүртгүүлсэн'
    },
    {
        name: 'updated',
        title: 'Шинэчлэгдсэн'
    },
    {
        getCellValue: ({ id }) => <ActionUpdateButton path={pathJoin('plans', id)} />
    }
]

const dateColumns = [
    'created', 'updated'
]

export default class Plans extends Component {
    constructor(props) {
        super(props)
        this.table = React.createRef()
    }

    fetchData = () => {
        return this.table.current.fetchData()
    }

    render() {
        return (
            <Dashboard title="Багц">
                <BaseTableActions>
                    <Grid item>
                        <ActionNewButton path="/plans/new" />
                    </Grid>
                    <Grid item>
                        <ActionDelete
                            path="/plans/mass/destroy"
                            onDelete={this.fetchData}
                        />
                    </Grid>
                </BaseTableActions>
                <BaseTable
                    path="plans"
                    columns={columns}
                    dateColumns={dateColumns}
                    innerRef={this.table}
                />
            </Dashboard>
        )
    }
}
