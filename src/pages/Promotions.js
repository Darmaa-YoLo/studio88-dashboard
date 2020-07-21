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
        getCellValue: ({ id }) => <ActionUpdateButton path={pathJoin('promotions', id)} />
    }
]

const dateColumns = [
    'created', 'updated'
]

export default class Promotions extends Component {
    constructor(props) {
        super(props)
        this.table = React.createRef()
    }

    fetchData = () => {
        return this.table.current.fetchData()
    }

    render() {
        return (
            <Dashboard title="Урамшуулал">
                <BaseTableActions>
                    <Grid item>
                        <ActionNewButton path="/promotions/new" />
                    </Grid>
                    <Grid item>
                        <ActionDelete
                            path="/promotions/mass/destroy"
                            onDelete={this.fetchData}
                        />
                    </Grid>
                </BaseTableActions>
                <BaseTable
                    path="promotions"
                    columns={columns}
                    dateColumns={dateColumns}
                    innerRef={this.table}
                />
            </Dashboard>
        )
    }
}
