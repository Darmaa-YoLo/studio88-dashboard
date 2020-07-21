import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { ValueForm } from './../forms'
import { Dashboard } from './../layouts'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class ValueUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Үнэт зүйл',
            key: shortid.generate(),
            name: '',
            values: [],
        }
    }

    componentDidMount = () => {
        this.fetchData()
    }

    fetchData = async () => {
        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/values/${id}`)

            this.setState({
                key: shortid.generate(),
                name: data.title,
                values: data.values,
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
            values,
        } = this.state
        const { match } = this.props
        const { id } = match.params
        return (
            <Dashboard title={title}>
                <ValueForm
                    key={key}
                    path={`values/${id}`}
                    method="put"
                    title={name}
                    values={values}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(ValueUpdate)
