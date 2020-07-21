import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    TextField,
    Button,
    Grid,
    Box,
    CircularProgress,
} from '@material-ui/core'
import {
    CustomSnackBar
} from './../components'
import axios from './../plugins/axios'

const styles = theme => ({
    marginLeft: {
        margin: '0 10px 0 0'
    },
    marginBottom: {
        margin: '0 0 20px 0'
    },
    marginVerticalSmall: {
        margin: '10px 0 10px 0'
    },
})

class ChannelCategoryForm extends Component {

    static defaultProps = {
        name: '',
    }

    constructor(props) {
        super(props)

        const {
            name,
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            name,
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
        } = this.state

        try {
            await axios[method](path, {
                name,
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
            this.setState({
                disabled: false
            })
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
            isSnackOpen,
            errors,
            disabled
        } = this.state

        const {
            message
        } = this.props
        return (
            <div>
                <form
                    onSubmit={this.storeOrUpdate}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                error={!!errors.name}
                                helperText={errors.name}
                                label="Name"
                                value={name}
                                onChange={this.handleChange('name')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
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
                        </Grid>
                    </Grid>
                    <CustomSnackBar
                        message={message}
                        open={isSnackOpen}
                        snackClose={this.snackClose}
                    />
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(ChannelCategoryForm)
