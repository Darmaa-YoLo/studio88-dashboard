import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { UserForm } from './../forms'
import { Dashboard } from './../layouts'

const styles = theme => ({
    //
})

class UserNew extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: 'Админ'
        }
    }

    render() {
        const { title } = this.state
        return (
            <Dashboard title={title}>
                <UserForm 
                    path="users"
                    method="post"
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(UserNew)
