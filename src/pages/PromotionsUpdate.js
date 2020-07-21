import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { PromotionForm } from './../forms'
import { Dashboard } from './../layouts'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class PromotionsUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Урамшуулал',
            key: shortid.generate(),
            name: '',
            summary: '',
            body: '',
            image: '',
        }
    }

    componentWillMount = () => {
        this.fetchData()
    }

    fetchData = async () => {
        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/promotions/${id}`, { progress: true})

            this.setState({
                key: shortid.generate(),
                name: data.name,
                summary: data.summary,
                body: data.body,
                image: data.image
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
            summary,
            body,
            image
        } = this.state
        const { match } = this.props
        const { id } = match.params
        return (
            <Dashboard title={title}>
                <PromotionForm
                    key={key}
                    path={`promotions/${id}`}
                    method="put"
                    name={name}
                    summary={summary}
                    body={body}
                    image={image}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(PromotionsUpdate)
