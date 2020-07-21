import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { FeatureForm } from './../forms'
import { Dashboard } from './../layouts'

const styles = theme => ({
    //
})

class FeatureNew extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: 'Багц боломж'
        }
    }

    render() {
        const { title } = this.state
        return (
            <Dashboard title={title}>
                <FeatureForm 
                    path="features"
                    method="post"
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(FeatureNew)
