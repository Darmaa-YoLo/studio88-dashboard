import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { BranchForm } from './../forms'
import { Dashboard } from './../layouts'

const styles = theme => ({
    //
})

class BranchNew extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: 'Салбарууд'
        }
    }

    render() {
        const { title } = this.state
        return (
            <Dashboard title={title}>
                <BranchForm 
                    path="branches"
                    method="post"
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(BranchNew)
