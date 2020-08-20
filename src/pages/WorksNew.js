import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { WorksForm } from './../forms'
import { Dashboard } from './../layouts'

const styles = theme => ({
    //
})

class WorksNew extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: 'Хийсэн ажлууд'
        }
    }

    render() {
        const { title } = this.state
        return (
            <Dashboard title={title}>
                <WorksForm 
                    path="works"
                    method="post"
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(WorksNew)
