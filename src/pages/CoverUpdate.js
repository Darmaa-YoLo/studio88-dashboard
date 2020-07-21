import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { CoverForm } from './../forms'
import { Dashboard } from './../layouts'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class CoverUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Слайдер',
            key: shortid.generate(),
            url: '',
            image: '',
        }
    }

    componentDidMount = () => {
        this.fetchData()
    }

    fetchData = async () => {
        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/covers/${id}`)

            this.setState({
                key: shortid.generate(),
                url: data.url,
                image: data.image,
            })
        } catch (e) {
            //
        }
    }

    render() {
        const {
            title,
            key,
            url,
            image,
        } = this.state
        const { match } = this.props
        const { id } = match.params
        return (
            <Dashboard title={title}>
                <CoverForm
                    key={key}
                    path={`covers/${id}`}
                    method="put"
                    url={url}
                    image={image}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(CoverUpdate)
