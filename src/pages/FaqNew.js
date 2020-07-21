import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { FaqForm } from '../forms'
import { Dashboard } from '../layouts'
import axios from '../plugins/axios'
import shortid from 'shortid'

const styles = theme => ({
    //
})

class FaqNew extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: 'Тусламж',
            key: shortid.generate(),
            faq_categories: []
        }
    }

    componentDidMount = () => {
        this.fetchDestinations()
    }

    fetchDestinations = async () => {
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

    render() {
        const { 
            title,
            key,
            faq_categories
        } = this.state
        return (
            <Dashboard title={title}>
                <FaqForm 
                    key={key}
                    path="faqs"
                    method="post"
                    faq_categories={faq_categories}
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(FaqNew)
