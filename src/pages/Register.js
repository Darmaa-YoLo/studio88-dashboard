import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import {
    Grid,
    Snackbar,
    Typography,
    TextField,
    Fab
} from '@material-ui/core'
import { ArrowRight } from 'mdi-material-ui'
import axios from './../plugins/axios'
import { App } from './../layouts'

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    typography: {
        marginTop: 30,
        marginBottom: 30,
        fontWeight: 300,
        color: grey[600]
    },
    logo: {
        display: 'block',
        margin: '50px auto 30px'
    },
    button: {
        display: 'flex',
        margin: '50px auto',
        minWidth: 230
    },
    extendedIcon: {
        marginLeft: 10,
        color: grey[400]
    },
    br: {
        '@media (max-width: 767px)': {
            display: 'none'
        }
    }
})

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            open: false,
            errors: {},
            disabled: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.register = this.register.bind(this)
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value
        })
    }

    register = async e => {
        e.preventDefault()

        this.setState({
            errors: {},
            disabled: true
        })

        const {
            email,
            password,
            passwordConfirm
        } = this.state

        try {
            await axios.post('register/email', {
                email,
                password,
                passwordConfirm
            })

            this.setState({
                email: '',
                password: '',
                passwordConfirm: '',
                open: true,
                disabled: false
            })
        } catch (err) {
            if (err.response.status === 422) {
                const { errors } = err.response.data
                this.setState({
                    errors,
                    disabled: false
                })
            }
        }
    }

    render() {
        const { classes } = this.props
        const {
            email,
            password,
            passwordConfirm,
            errors,
            disabled,
            open
        } = this.state
        const {
            root,
            typography,
            logo,
            button,
            extendedIcon,
            br
        } = classes

        return (
            <App>
                <Grid
                    className={root}
                    justify="center"
                    alignItems="center"
                    spacing={2}
                    container
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={5}
                        xl={4}
                    >
                        <img
                            height="50"
                            className={logo}
                            src="/static/images/logo-small.png"
                            alt="Logo"
                        />
                        <Typography
                            variant="h6"
                            className={typography}
                            align="center"
                        >
                            Hello there! Sign in and start managing <br className={br} /> your app
                        </Typography>
                        <form
                            onSubmit={this.register}
                            autoComplete="off"
                            noValidate
                        >
                            <TextField
                                label="И-мэйл хаяг"
                                value={email}
                                error={!!errors.email}
                                onChange={this.handleChange('email')}
                                type="email"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                autoFocus
                            />
                            <TextField
                                label="Нууц үг"
                                value={password}
                                error={!!errors.password}
                                onChange={this.handleChange('password')}
                                variant="outlined"
                                margin="normal"
                                type="password"
                                fullWidth
                            />
                            <TextField
                                label="Нууц үг дахин оруулна уу"
                                value={passwordConfirm}
                                onChange={this.handleChange('passwordConfirm')}
                                variant="outlined"
                                margin="normal"
                                type="password"
                                fullWidth
                            />
                            <Fab
                                className={button}
                                disabled={disabled}
                                color="primary"
                                variant="extended"
                                type="submit"
                            >
                                Бүртгүүлэх
                                <ArrowRight className={extendedIcon} />
                            </Fab>
                        </form>
                    </Grid>
                </Grid>
                <Snackbar
                    open={open}
                    onClose={this.handleClose}
                    message="Таны и-мэйл хаяг руу баталгаажуулах холбоос илгээлээ"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                />
            </App>
        )
    }
}

export default withStyles(styles)(Register)
