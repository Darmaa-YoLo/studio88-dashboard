import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { ContentForm } from '../forms'
import { Dashboard } from '../layouts'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class ContentNew extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: 'Контент',
            key: shortid.generate(),
            content_categories: []
        }
    }

    componentDidMount = () => {
        this.fetchContentCategories()
    }

    fetchContentCategories = async () => {
        try {
            const { data } = await axios.get('/content_categories', {
                progress: true,
                params: {
                    rowsPerPage: -1,
                    sortBy: 'name',
                    sortOrder: 'asc'
                }
            })

            this.setState({
                key: shortid.generate(),
                content_categories: data
            })
        } catch (e) {
            //
        }
    }

    render() {
        const {
            key,
            title,
            content_categories
        } = this.state

        return (
            <Dashboard title={title}>
                <ContentForm 
                    key={key}
                    content_categories={content_categories}
                    path="contents"
                    method="post"
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(ContentNew)
