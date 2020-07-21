import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { PromotionForm } from '../forms'
import { Dashboard } from '../layouts'

const styles = theme => ({
    //
})

class PromotionsNew extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: 'Урамшуулал'
        }
    }

    render() {
        const { title } = this.state
        return (
            <Dashboard title={title}>
                <PromotionForm 
                    path="promotions"
                    method="post"
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(PromotionsNew)
