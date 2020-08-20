import React, { Component } from 'react'
import {
    TextField,
    Button,
    Grid,
    CircularProgress,
} from '@material-ui/core'
import {
    CustomSnackBar
} from '../components'
import axios from '../plugins/axios'

class FilterForm extends Component {

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

    onCheckChange = name => e => {
        this.setState({
            [name]: e.target.checked
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



    selectChanged = e => {
        const { value } = e.target

        this.setState({ type: value })
    }

    render() {
        const {
            name,
            isSnackOpen,
            errors,
            disabled
        } = this.state


        const { message } = this.props

        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <form
                            onSubmit={this.storeOrUpdate}
                        >
                            <TextField
                                error={!!errors.name}
                                helperText={errors.name}
                                label="Шүүлтүүр төрөл"
                                value={name}
                                onChange={this.handleChange('name')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
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

export default (FilterForm)
