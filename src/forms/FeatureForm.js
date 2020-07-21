import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    TextField,
    Button,
    Grid,
    Box,
    CircularProgress
} from '@material-ui/core'
import {
    CustomSnackBar,
} from './../components'
import axios from './../plugins/axios'

const styles = theme => ({
    // 
})

class FeatureForm extends Component {

    static defaultProps = {
        name: '',
        pricing: '',
    }

    constructor(props) {
        super(props)

        const {
            name,
            pricing,
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            name,
            pricing,
        }
    }

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value
        })
    }

    reset = () => {
        this.setState({
            errors: {},
            name: '',
            pricing: '',
        })
    }

    storeOrUpdate = async e => {
        e.preventDefault()
        this.setState({
            disabled: true,
            errors: {}
        })

        const {
            path,
            method
        } = this.props

        const {
            name,
            pricing,
        } = this.state

        try {
            await axios[method](path, {
                name,
                pricing,
            })

            this.setState({
                isSnackOpen: true
            })

            if (method === 'post') {
                this.reset()
            }

            this.setState({
                disabled: false
            })
        } catch (err) {
            if (err.response.status === 422) {
                const { errors } = err.response.data
                this.setState({ errors })
            }
        }
    }

    snackClose = () => {
        this.setState({
            isSnackOpen: false
        })
    }

    render() {
        const {
            name,
            pricing,
            isSnackOpen,
            errors,
            disabled
        } = this.state

        const { message } = this.props
        
        return (
            <div>
                <form
                    onSubmit={this.storeOrUpdate}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                required
                                error={!!errors.name}
                                helperText={errors.name}
                                label="Нэр"
                                value={name}
                                onChange={this.handleChange('name')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                error={!!errors.pricing}
                                helperText={errors.pricing}
                                label="Үнэ"
                                value={pricing}
                                onChange={this.handleChange('pricing')}
                                variant="outlined"
                                margin="normal"
                                type="number"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Box my={3}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={disabled}
                        >
                            {
                                disabled ? <CircularProgress size={25} color="primary" /> : "Хадгалах"
                            }
                        </Button>
                    </Box>
                    <CustomSnackBar
                        message={message}
                        open={isSnackOpen}
                        snackClose={this.snackClose}
                    />
                </form>
            </div >
        )
    }
}

export default withStyles(styles)(FeatureForm)
