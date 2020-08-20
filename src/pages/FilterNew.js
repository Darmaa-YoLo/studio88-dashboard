import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { FilterForm } from './../forms'
import { Dashboard } from './../layouts'

const styles = theme => ({
    //
})

class FilterNew extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: 'Шүүлтүүрүүд'
        }
    }

    render() {
        const { title } = this.state
        return (
            <Dashboard title={title}>
                <FilterForm 
                    path="filter"
                    method="post"
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(FilterNew)
