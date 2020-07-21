import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { ContentCategoryForm } from '../forms'
import { Dashboard } from '../layouts'
import axios from '../plugins/axios'

const styles = theme => ({
    //
})

class ContentCategoryUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Контент төрөл',
            key: shortid.generate(),
            name: '',
        }
    }

    componentDidMount = () => {
        this.fetchData()
    }

    fetchData = async () => {
        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/content_categories/${id}`)

            this.setState({
                key: shortid.generate(),
                name: data.name,
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
        } = this.state

        const { match } = this.props
        const { id } = match.params

        return (
            <Dashboard title={title}>
                <ContentCategoryForm
                    key={key}
                    path={`content_categories/${id}`}
                    method="put"
                    name={name}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(ContentCategoryUpdate)
