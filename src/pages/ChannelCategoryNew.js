import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { ChannelCategoryForm } from '../forms'
import { Dashboard } from '../layouts'

const styles = theme => ({
    //
})

class ChannelCategoryNew extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Суваг төрөл',
        }
    }

    render() {
        const { title } = this.state
        return (
            <Dashboard title={title}>
                <ChannelCategoryForm
                    path="channel_categories"
                    method="post"
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(ChannelCategoryNew)
