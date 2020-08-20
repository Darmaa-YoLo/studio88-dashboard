import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { ClientForm } from './../forms'
import { Dashboard } from './../layouts'

const styles = theme => ({
    //
})

class ClientsNew extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: 'Үйлчлүүлэгчид'
        }
    }

    render() {
        const { title } = this.state
        return (
            <Dashboard title={title}>
                <ClientForm 
                    path="clients"
                    method="post"
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(ClientsNew)
