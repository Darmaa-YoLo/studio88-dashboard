import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    TextField,
    Button,
    Grid,
    CircularProgress
} from '@material-ui/core'
import { CustomSnackBar } from './../components'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class UserForm extends Component {

    static defaultProps = {
        name: '',
        email: '',
        password: '',
    }

    constructor(props) {
        super(props)

        const {
            name,
            email,
            password,
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            name,
            email,
            password,
        }
    }

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value
        })
    }

    reset = () => {
        this.setState({
            name: '',
            email: '',
            password: '',
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
            email,
            password,
        } = this.state

        try {
            await axios[method](path, {
                name,
                email,
                password,
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
            email,
            password,
            isSnackOpen,
            errors,
            disabled
        } = this.state

        const {
            message
        } = this.props
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <form
                            onSubmit={this.storeOrUpdate}
                            noValidate
                        >
                            <TextField
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
                                error={!!errors.email}
                                helperText={errors.email}
                                label="И-мэйл хаяг"
                                value={email}
                                onChange={this.handleChange('email')}
                                type="email"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />
                            <TextField
                                error={!!errors.password}
                                helperText={errors.password}
                                label="Нууц үг"
                                value={password}
                                onChange={this.handleChange('password')}
                                type="password"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />
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
                            <CustomSnackBar
                                message={message}
                                open={isSnackOpen}
                                snackClose={this.snackClose}
                            />
                        </form>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(UserForm)
