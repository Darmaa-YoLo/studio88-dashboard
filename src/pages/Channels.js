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
        name: 'index',
        title: 'Сувгийн тоо'
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
        getCellValue: ({ id }) => <ActionUpdateButton path={pathJoin('channels', id)} />
    }
]

const dateColumns = [
    'created', 'updated'
]

export default class Channels extends Component {
    constructor(props) {
        super(props)
        this.table = React.createRef()
    }

    fetchData = () => {
        return this.table.current.fetchData()
    }

    render() {
        return (
            <Dashboard title="Суваг">
                <BaseTableActions>
                    <Grid item>
                        <ActionNewButton path="/channels/new" />
                    </Grid>
                    <Grid item>
                        <ActionDelete
                            path="/channels/mass/destroy"
                            onDelete={this.fetchData}
                        />
                    </Grid>
                </BaseTableActions>
                <BaseTable
                    path="channels"
                    columns={columns}
                    dateColumns={dateColumns}
                    innerRef={this.table}
                />
            </Dashboard>
        )
    }
}
