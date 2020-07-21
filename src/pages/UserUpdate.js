import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { UserForm } from './../forms'
import { Dashboard } from './../layouts'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class UserUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Админ',
            key: shortid.generate(),
            name: '',
            email: '',
            isAdmin: false
        }
    }

    componentWillMount = () => {
        this.fetchData()
    }

    fetchData = async () => {
        const { match } = this.props
        const { id } = match.params

        try {
            const { data } = await axios.get(`/users/${id}`, { progress: true})

            this.setState({
                key: shortid.generate(),
                name: data.name,
                email: data.email,
                isAdmin: data.isAdmin
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
            email,
            isAdmin
        } = this.state
        const { match } = this.props
        const { id } = match.params
        return (
            <Dashboard title={title}>
                <UserForm
                    key={key}
                    path={`users/${id}`}
                    method="put"
                    name={name}
                    email={email}
                    isAdmin={isAdmin}
                    message="Амжилттай шинэчлэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(UserUpdate)
