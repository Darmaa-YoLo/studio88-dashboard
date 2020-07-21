import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { ContentForm } from '../forms'
import { Dashboard } from '../layouts'
import axios from '../plugins/axios'

const styles = theme => ({
    //
})

class ContentUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Контент',
            key: shortid.generate(),
            name: '',
            image: '',
            cover: '',
            description: '',
            trailer: '',
            age_group: '',
            duration: '',
            director: '',
            authors: '',
            content_categories: [],
            content_categories_ids: []
        }
    }

    componentDidMount = () => {
        this.fetchData()
        this.fetchContentTypes()
    }

    fetchData = async () => {
        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/contents/${id}`)

            this.setState({
                key: shortid.generate(),
                name: data.name,
                image: data.image,
                cover: data.cover,
                trailer: data.trailer,
                description: data.description,
                age_group: data.age_group,
                duration: data.duration,
                director: data.director,
                authors: data.authors,
                content_categories_ids: data.content_categories_ids
            })
        } catch (e) {
            //
        }
    }

    fetchContentTypes = async () => {
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
            title,
            key,
            name,
            image,
            cover,
            trailer,
            description,
            age_group,
            duration,
            director,
            authors,
            content_categories,
            content_categories_ids
        } = this.state
        const { match } = this.props
        const { id } = match.params
        return (
            <Dashboard title={title}>
                <ContentForm
                    key={key}
                    path={`contents/${id}`}
                    method="put"
                    name={name}
                    image={image}
                    cover={cover}
                    trailer={trailer}
                    age_group={age_group}
                    duration={duration}
                    director={director}
                    authors={authors}
                    description={description}
                    content_categories={content_categories}
                    content_categories_ids={content_categories_ids}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(ContentUpdate)
