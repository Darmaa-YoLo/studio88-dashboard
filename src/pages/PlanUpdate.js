import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { PlanForm } from './../forms'
import { Dashboard } from './../layouts'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class PlanUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Багц',
            key: shortid.generate(),
            name: '',
            pricing: '',
            features: [],
            features_fields: []
        }
    }

    componentDidMount = () => {
        this.fetchData()
        this.fetchFeatures()
    }

    fetchFeatures = async () => {
        try {
            const { data } = await axios.get('/features', {
                progress: true,
                params: {
                    rowsPerPage: -1,
                    sortBy: 'created',
                    sortOrder: 'asc'
                }
            })

            this.setState({
                key: shortid.generate(),
                features: data
            })
        } catch (e) {
            // 
        }
    }

    fetchData = async () => {
        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/plans/${id}`)

            this.setState({
                key: shortid.generate(),
                name: data.name,
                pricing: data.pricing,
                features_fields: data.features.map(feature => ({
                    feature_id: feature.id,
                    value: feature.pivot.value
                }))
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
            features,
            features_fields
        } = this.state
        const { match } = this.props
        const { id } = match.params
        return (
            <Dashboard title={title}>
                <PlanForm
                    key={key}
                    path={`plans/${id}`}
                    method="put"
                    name={name}
                    pricing={pricing}
                    features={features}
                    features_fields={features_fields}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(PlanUpdate)
