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
        getCellValue: ({ id }) => <ActionUpdateButton path={pathJoin('contents', id)} />
    }
]

const dateColumns = [
    'created', 'updated'
]

export default class Contents extends Component {
    constructor(props) {
        super(props)
        this.table = React.createRef()
    }

    fetchData = () => {
        return this.table.current.fetchData()
    }

    render() {
        return (
            <Dashboard title="Контент">
                <BaseTableActions>
                    <Grid item>
                        <ActionNewButton path="/contents/new" />
                    </Grid>
                    <Grid item>
                        <ActionDelete
                            path="/contents/mass/destroy"
                            onDelete={this.fetchData}
                        />
                    </Grid>
                </BaseTableActions>
                <BaseTable
                    path="contents"
                    columns={columns}
                    dateColumns={dateColumns}
                    innerRef={this.table}
                />
            </Dashboard>
        )
    }
}
