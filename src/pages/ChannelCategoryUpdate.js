import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { ChannelCategoryForm } from '../forms'
import { Dashboard } from '../layouts'
import axios from '../plugins/axios'

const styles = theme => ({
    //
})

class ChannelCategoryUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Суваг төрөл',
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
            const { data } = await axios.get(`/channel_categories/${id}`)

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
                <ChannelCategoryForm
                    key={key}
                    path={`channel_categories/${id}`}
                    method="put"
                    name={name}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(ChannelCategoryUpdate)
