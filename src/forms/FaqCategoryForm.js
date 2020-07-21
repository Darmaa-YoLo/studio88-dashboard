import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    TextField,
    Button,
    Grid,
    CircularProgress
} from '@material-ui/core'
import {
    CustomSnackBar,
} from './../components'
import axios from './../plugins/axios'

const styles = theme => ({
    marginBottom: {
        margin: '0 0 20px 0'
    }
})
class FaqCategoryForm extends Component {

    static defaultProps = {
        name: '',
        description: '',
    }

    constructor(props) {
        super(props)

        const {
            name,
            description
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            name,
            description
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
            description: '',
            errors: {}
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
            description
        } = this.state

        try {
            await axios[method](path, {
                name,
                description
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
            description,
            isSnackOpen,
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
                                label="Нэр"
                                value={name}
                                onChange={this.handleChange('name')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />
                            <TextField
                                label="Тайлбар"
                                value={description}
                                onChange={this.handleChange('description')}
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={5}
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
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(FaqCategoryForm)
