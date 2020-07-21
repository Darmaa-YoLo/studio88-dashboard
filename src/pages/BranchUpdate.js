import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { BranchForm } from './../forms'
import { Dashboard } from './../layouts'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class BranchUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Салбарууд',
            key: shortid.generate(),
            adress: '',
            image: '',
            phone: '',
            schedule: ''
        }
    }

    componentDidMount = () => {
        this.fetchData()
    }

    fetchData = async () => {
        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/branches/${id}`)

            this.setState({
                key: shortid.generate(),
                address: data.address,
                image: data.image,
                phone: data.phone,
                schedule: data.schedule
            })
        } catch (e) {
            //
        }
    }

    render() {
        const {
            title,
            key,
            address,
            image,
            phone,
            schedule
        } = this.state
        const { match } = this.props
        const { id } = match.params
        return (
            <Dashboard title={title}>
                <BranchForm
                    key={key}
                    path={`branches/${id}`}
                    method="put"
                    address={address}
                    image={image}
                    phone={phone}
                    schedule={schedule}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(BranchUpdate)
