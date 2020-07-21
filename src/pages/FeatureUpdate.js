import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { FeatureForm } from './../forms'
import { Dashboard } from './../layouts'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class FeatureUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Багц боломж',
            key: shortid.generate(),
            name: '',
            pricing: '',
        }
    }

    componentDidMount = () => {
        this.fetchData()
    }

    fetchData = async () => {
        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/features/${id}`)

            this.setState({
                key: shortid.generate(),
                name: data.name,
                pricing: data.pricing,
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
            pricing,
        } = this.state
        const { match } = this.props
        const { id } = match.params
        return (
            <Dashboard title={title}>
                <FeatureForm
                    key={key}
                    path={`features/${id}`}
                    method="put"
                    name={name}
                    pricing={pricing}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(FeatureUpdate)
