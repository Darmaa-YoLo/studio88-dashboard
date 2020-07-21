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
        title: 'Үүсгэсэн'
    },
    {
        name: 'updated',
        title: 'Шинэчилсэн'
    },
    {
        getCellValue: ({ id }) => <ActionUpdateButton path={pathJoin('faq_categories', id)} />
    }
]

const dateColumns = [
    'created', 'updated'
]

export default class FaqCategories extends Component {
    constructor(props) {
        super(props)
        this.table = React.createRef()
    }

    fetchData = () => {
        return this.table.current.fetchData()
    }

    render() {
        return (
            <Dashboard title="Тусламж төрөл">
                <BaseTableActions>
                    <Grid item>
                        <ActionNewButton path="/faq_categories/new" />
                    </Grid>
                    <Grid item>
                        <ActionDelete
                            path="/faq_categories/mass/destroy"
                            onDelete={this.fetchData}
                        />
                    </Grid>
                </BaseTableActions>
                <BaseTable
                    path="faq_categories"
                    columns={columns}
                    dateColumns={dateColumns}
                    innerRef={this.table}
                />
            </Dashboard>
        )
    }
}