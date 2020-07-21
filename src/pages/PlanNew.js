import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { PlanForm } from './../forms'
import { Dashboard } from './../layouts'
import axios from './../plugins/axios'
import shortid from 'shortid'

const styles = theme => ({
    //
})

class PlanNew extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: 'Багц',
            key: shortid.generate(),
            features: []
        }
    }

    componentDidMount = () => {
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

    render() {
        const { 
            key,
            title,
            features 
        } = this.state

        return (
            <Dashboard title={title}>
                <PlanForm 
                    key={key}
                    path="plans"
                    method="post"
                    features={features}
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(PlanNew)
