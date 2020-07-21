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
class CoverForm extends Component {

    static defaultProps = {
        url: '',
        image: '',
    }

    constructor(props) {
        super(props)

        const {
            url,
            image,
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            url,
            image,
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
            url: '',
            image: '',
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
            url,
            image,
        } = this.state

        try {
            await axios[method](path, {
                url,
                image,
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

    onChange = (path = '') => {
        this.setState({
            image: path
        })
    }

    render() {
        const {
            url,
            image,
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
                                error={!!errors.url}
                                helperText={errors.url}
                                label="Холбоос"
                                value={url}
                                onChange={this.handleChange('url')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <div className={marginBottom}>
                                <DropZone
                                    required
                                    label="Арын зураг"
                                    uploadPath="upload/image"
                                    onChange={this.onChange}
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

export default withStyles(styles)(CoverForm)
