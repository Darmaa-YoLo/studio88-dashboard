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
        getCellValue: ({ id }) => <ActionUpdateButton path={pathJoin('categories', id)} />
    }
]

const dateColumns = [
    'created', 'updated'
]

export default class ChannelCategories extends Component {
    constructor(props) {
        super(props)
        this.table = React.createRef()
    }

    fetchData = () => {
        return this.table.current.fetchData()
    }

    render() {
        return (
            <Dashboard title="Суваг ангилал">
                <BaseTableActions>
                    <Grid item>
                        <ActionNewButton path="/channel/categories/new" />
                    </Grid>
                    <Grid item>
                        <ActionDelete
                            path="/channel_categories/mass/destroy"
                            onDelete={this.fetchData}
                        />
                    </Grid>
                </BaseTableActions>
                <BaseTable
                    path="channel_categories"
                    columns={columns}
                    dateColumns={dateColumns}
                    innerRef={this.table}
                />
            </Dashboard>
        )
    }
}
