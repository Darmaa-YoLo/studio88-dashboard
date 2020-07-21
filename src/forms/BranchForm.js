import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    TextField,
    Button,
    Grid,
    CircularProgress
} from '@material-ui/core'
import DropZone from './../components/DropZone'
import {
    CustomSnackBar,
} from './../components'
import axios from './../plugins/axios'

const styles = theme => ({
    marginBottom: {
        margin: '0 0 20px 0'
    }
})
class BranchForm extends Component {

    static defaultProps = {
        address: '',
        image: '',
        phone: '',
        schedule: ''
    }

    constructor(props) {
        super(props)

        const {
            address,
            image,
            phone,
            schedule
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            address,
            image,
            phone,
            schedule
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
            address: '',
            image: '',
            phone: '',
            schedule: ''
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
            address,
            image,
            phone,
            schedule
        } = this.state

        try {
            await axios[method](path, {
                address,
                image,
                phone,
                schedule
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

    onImageChange = (path = '') => {
        this.setState({
            image: path
        })
    }

    render() {
        const {
            address,
            image,
            phone,
            schedule,
            isSnackOpen,
            errors,
            disabled
        } = this.state

        const { marginBottom } = this.props.classes

        const { message } = this.props
        return (
            <div>

                <form
                    onSubmit={this.storeOrUpdate}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                error={!!errors.address}
                                helperText={errors.address}
                                label="Хаяг"
                                value={address}
                                onChange={this.handleChange('address')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                error={!!errors.phone}
                                helperText={errors.phone}
                                label="Утас"
                                value={phone}
                                onChange={this.handleChange('phone')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                error={!!errors.schedule}
                                helperText={errors.schedule}
                                label="Цагын хууваарь"
                                value={schedule}
                                onChange={this.handleChange('schedule')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <div className={marginBottom}>
                                <DropZone
                                    uploadPath="upload/image"
                                    onChange={this.onImageChange}
                                    file={image}
                                    error={!!errors.image}
                                />
                            </div>
                        </Grid>
                    </Grid>
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
            </div >
        )
    }
}

export default withStyles(styles)(BranchForm)
