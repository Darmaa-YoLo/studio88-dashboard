import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { FaqCategoryForm } from '../forms'
import { Dashboard } from '../layouts'
import axios from '../plugins/axios'

const styles = theme => ({
    //
})

class FaqCategoryUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Тусламж төрөл',
            key: shortid.generate(),
            name: '',
            description: '',
        }
    }

    componentWillMount = () => {
        this.fetchData()
    }

    fetchData = async () => {
        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/faq_categories/${id}`, { progress: true})

            this.setState({
                key: shortid.generate(),
                name: data.name,
                description: data.description,
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
            description
        } = this.state
        const { match } = this.props
        const { id } = match.params
        return (
            <Dashboard title={title}>
                <FaqCategoryForm
                    key={key}
                    path={`faq_categories/${id}`}
                    method="put"
                    name={name}
                    description={description}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(FaqCategoryUpdate)
