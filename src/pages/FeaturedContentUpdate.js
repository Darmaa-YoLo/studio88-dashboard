import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { FeaturedContentForm } from '../forms'
import { Dashboard } from '../layouts'
import axios from '../plugins/axios'

const styles = theme => ({
    //
})

class FeaturedContentUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Сонирхолтой контент',
            key: shortid.generate(),
            content_id: '',
            contents: [],
            start: null,
            end: null,
            order: ''
        }
    }

    componentDidMount = () => {
        this.fetchData()
        this.fetchContents()
    }

    fetchContents = async () => {
        try {
            const { data } = await axios.get('/contents', {
                progress: true,
                params: {
                    rowsPerPage: -1,
                    sortBy: 'name',
                    sortOrder: 'asc'
                }
            })

            this.setState({
                key: shortid.generate(),
                contents: data,
            })
        } catch (e) {
            //
        }
    }

    fetchData = async () => {
        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/featured_contents/${id}`)

            this.setState({
                key: shortid.generate(),
                content_id: data.content_id,
                start: data.start,
                end: data.end,
                order: data.order
            })
        } catch (e) {
            //
        }
    }

    render() {
        const {
            title,
            key,
            content_id,
            contents,
            start,
            end,
            order
        } = this.state

        const { match } = this.props
        const { id } = match.params

        return (
            <Dashboard title={title}>
                <FeaturedContentForm
                    key={key}
                    path={`featured_contents/${id}`}
                    method="put"
                    content_id={content_id}
                    contents={contents}
                    start={start}
                    end={end}
                    order={order}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(FeaturedContentUpdate)
