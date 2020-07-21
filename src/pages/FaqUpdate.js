import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { FaqForm } from '../forms'
import { Dashboard } from '../layouts'
import axios from '../plugins/axios'

const styles = theme => ({
    //
})

class FaqUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Тусламж',
            key: shortid.generate(),
            question: '',
            answer: '',
            faq_category_id: '',
            faq_categories: []
        }
    }

    componentWillMount = () => {
        this.fetchData()
        this.fetchFaqCategories()
    }

    fetchFaqCategories = async () => {
        try {
            const { data } = await axios.get('/faq_categories', {
                progress: true,
                params: {
                    rowsPerPage: -1,
                    sortBy: 'name',
                    sortOrder: 'asc'
                }
            })

            this.setState({
                key: shortid.generate(),
                faq_categories: data,
            })
        } catch (e) {
            //
        }
    }

    fetchData = async () => {
        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/faqs/${id}`)

            this.setState({
                key: shortid.generate(),
                question: data.question,
                answer: data.answer,
                faq_category_id: data.faq_category_id
            })
        } catch (e) {
            //
        }
    }

    render() {
        const {
            title,
            key,
            question,
            answer,
            faq_categories,
            faq_category_id
        } = this.state
        const { match } = this.props
        const { id } = match.params

        return (
            <Dashboard title={title}>
                <FaqForm
                    key={key}
                    path={`faqs/${id}`}
                    method="put"
                    question={question}
                    answer={answer}
                    faq_categories={faq_categories}
                    faq_category_id={faq_category_id}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(FaqUpdate)
