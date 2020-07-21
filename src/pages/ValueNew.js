import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { ValueForm } from './../forms'
import { Dashboard } from './../layouts'

const styles = theme => ({
    //
})

class ValueNew extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Үнэт зүйл',
        }
    }

    render() {
        const {
            title,
        } = this.state

        return (
            <Dashboard title={title}>
                <ValueForm
                    path="values"
                    method="post"
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(ValueNew)
