import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    Snackbar,
    IconButton
} from '@material-ui/core'
import { Close } from 'mdi-material-ui'

const styles = theme => ({
    //
})

class CustomSnackBar extends Component {
    close = () => {
        const { snackClose } = this.props
        snackClose()
    }

    render() {
        const {
            message,
            open
        } = this.props
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    onClose={ this.close }
                    open={ open }
                    message={
                        <span>
                            { message }
                        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.close}
                        >
                            <Close />
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }
}

export default withStyles(styles)(CustomSnackBar)