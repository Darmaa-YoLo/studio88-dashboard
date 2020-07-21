import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    Box,
    Button,
    TextField,
    Grid,
    CircularProgress
} from '@material-ui/core'
import {
    CustomSnackBar,
    BaseEditor,
    DropZone
} from '../components'
import axios from '../plugins/axios'

const styles = theme => ({
    marginBottom: {
        margin: '0 0 20px 0'
    }
})

class CategoryForm extends Component {

    static defaultProps = {
        name: '',
        summary: '',
        body: '',
        image: ''
    }

    constructor(props) {
        super(props)

        const {
            name,
            summary,
            body,
            image
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            name,
            summary,
            body,
            image
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
            summary: '',
            body: '',
            image: ''
        })
    }

    storeOrUpdate = async e => {
        e.preventDefault()
        this.setState({
            errors: {},
            disabled: true
        })

        const {
            path,
            method
        } = this.props

        const {
            name,
            summary,
            body,
            image
        } = this.state

        try {
            await axios[method](path, {
                name,
                summary,
                body,
                image
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

    editorChange = name => e => {
        this.setState({
            [name]: e.target.getContent()
        })
    }

    onImageChange = (path = '') => {
        this.setState({
            image: path
        })
    }

    render() {
        const {
            name,
            summary,
            body,
            image,
            errors,
            isSnackOpen,
            disabled
        } = this.state
        const { message } = this.props
        const {
            marginBottom
        } = this.props.classes

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
                                label="Нэр"
                                value={name}
                                onChange={this.handleChange('name')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />
                            <div className={marginBottom}>
                                <BaseEditor
                                    label="Товч тайлбар"
                                    error={!!errors.summary}
                                    value={summary}
                                    onChange={this.editorChange('summary')}
                                />
                            </div>
                            <div className={marginBottom}>
                                <BaseEditor
                                    required
                                    label="Мэдээлэл"
                                    error={!!errors.body}
                                    value={body}
                                    onChange={this.editorChange('body')}
                                />
                            </div>
                            <div className={marginBottom}>
                                <DropZone
                                    required
                                    label="Зураг"
                                    uploadPath="upload/image"
                                    onChange={this.onImageChange}
                                    file={image}
                                    error={!!errors.image}
                                />
                            </div>
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

export default withStyles(styles)(CategoryForm)
