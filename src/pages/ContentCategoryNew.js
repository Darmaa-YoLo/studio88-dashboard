import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { ContentCategoryForm } from '../forms'
import { Dashboard } from '../layouts'

const styles = theme => ({
    //
})

class ContentCategoryNew extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Контент төрөл',
        }
    }

    render() {
        const { title } = this.state
        return (
            <Dashboard title={title}>
                <ContentCategoryForm
                    path="content_categories"
                    method="post"
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(ContentCategoryNew)
