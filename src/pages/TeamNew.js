import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { TeamForm } from './../forms'
import { Dashboard } from './../layouts'

const styles = theme => ({
    //
})

class TeamNew extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: 'Манай баг'
        }
    }

    render() {
        const { title } = this.state
        return (
            <Dashboard title={title}>
                <TeamForm 
                    path="team"
                    method="post"
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(TeamNew)
