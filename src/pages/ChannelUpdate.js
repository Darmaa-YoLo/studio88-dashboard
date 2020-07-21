import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { ChannelForm } from './../forms'
import { Dashboard } from './../layouts'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class ChannelUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Суваг',
            key: shortid.generate(),
            index: '',
            logos: [],
            is_hd: false,
            is_replayable: false,
            category: '',
            channel_category_ids: [],
            channel_categories: [],
            is_featured: false
        }
    }

    componentWillMount = () => {
        this.fetchData()
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

    fetchData = async () => {
        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/channels/${id}`, { progress: true })

            this.setState({
                key: shortid.generate(),
                index: data.index,
                logos: data.logos,
                is_hd: data.is_hd,
                is_replayable: data.is_replayable,
                category: data.category,
                is_featured: data.is_featured,
                channel_category_ids: data
                    .channel_categories
                    .map(({ id }) => id),
            })
        } catch (e) {
            //
        }
    }

    render() {
        const {
            title,
            key,
            index,
            logos,
            is_hd,
            is_replayable,
            category,
            channel_category_ids,
            channel_categories,
            is_featured
        } = this.state
        const { match } = this.props
        const { id } = match.params
        return (
            <Dashboard title={title}>
                <ChannelForm
                    key={key}
                    path={`channels/${id}`}
                    method="put"
                    index={index}
                    logos={logos}
                    is_hd={is_hd}
                    is_replayable={is_replayable}
                    category={category}
                    channel_category_ids={channel_category_ids}
                    channel_categories={channel_categories}
                    is_featured={is_featured}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(ChannelUpdate)
