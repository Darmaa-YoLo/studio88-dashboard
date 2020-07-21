import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { ChannelForm } from './../forms'
import { Dashboard } from './../layouts'
import axios from './../plugins/axios'
import shortid from 'shortid'

const styles = theme => ({
    //
})

class ChannelNew extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Суваг',
            key: shortid.generate(),
            channel_categories: [],
        }
    }

    componentWillMount = () => {
        this.fetchCategories()
    }

    fetchCategories = async () => {
        try {
            const { data } = await axios.get('/channel_categories', {
                progress: true,
                params: {
                    rowsPerPage: -1,
                    sortBy: 'name',
                    sortOrder: 'asc'
                }
            })

            this.setState({
                key: shortid.generate(),
                channel_categories: data
            })
        } catch (err) {
            // 
        }
    }

    render() {
        const {
            title,
            key,
            channel_categories
        } = this.state

        return (
            <Dashboard title={title}>
                <ChannelForm
                    key={key}
                    path="channels"
                    method="post"
                    channel_categories={channel_categories}
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(ChannelNew)
