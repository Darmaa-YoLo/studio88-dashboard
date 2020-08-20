import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { AboutForm } from './../forms'
import { Dashboard } from './../layouts'

const styles = theme => ({
    //
})

class AboutNew extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: 'Бидний тухай зургууд'
        }
    }

    render() {
        const { title } = this.state
        return (
            <Dashboard title={title}>
                <AboutForm 
                    path="about"
                    method="post"
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(AboutNew)
