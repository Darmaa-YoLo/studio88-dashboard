import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { Dashboard } from '../layouts'
import {
    ActionDelete,
    ActionNewButton,
    ActionUpdateButton,
    BaseTable,
    BaseTableActions
} from '../components'
import { pathJoin } from '../utils/helpers'

const columns = [
    {
        name: 'question',
        title: 'Гарчиг'
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
        getCellValue: ({ id }) => <ActionUpdateButton path={pathJoin('faqs', id)} />
    }
]

const dateColumns = [
    'created', 'updated'
]

export default class Faqs extends Component {
    constructor(props) {
        super(props)
        this.table = React.createRef()
    }

    fetchData = () => {
        return this.table.current.fetchData()
    }

    render() {
        return (
            <Dashboard title="Тусламж">
                <BaseTableActions>
                    <Grid item>
                        <ActionNewButton path="/faqs/new" />
                    </Grid>
                    <Grid item>
                        <ActionDelete
                            path="/faqs/mass/destroy"
                            onDelete={this.fetchData}
                        />
                    </Grid>
                </BaseTableActions>
                <BaseTable
                    path="faqs"
                    columns={columns}
                    dateColumns={dateColumns}
                    innerRef={this.table}
                />
            </Dashboard>
        )
    }
}
