import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    TextField,
    Button,
    Grid,
    Box,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    CircularProgress
} from '@material-ui/core'
import {
    BaseEditor,
    DropZone
} from './../components'
import { CustomSnackBar } from './../components'
import axios from './../plugins/axios'

const styles = theme => ({
    marginLeft: {
        margin: '0 10px 0 0'
    },
    marginBottom: {
        margin: '0 0 20px 0'
    }
})

class ContentForm extends Component {

    static defaultProps = {
        name: '',
        image: '',
        cover: '',
        trailer: '',
        description: '',
        age_group: '',
        duration: '',
        director: '',
        authors: '',
        content_categories: [],
        content_categories_ids: []
    }

    constructor(props) {
        super(props)

        const {
            name,
            image,
            cover,
            trailer,
            description,
            age_group,
            duration,
            director,
            authors,
            content_categories,
            content_categories_ids
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            name,
            image,
            cover,
            trailer,
            age_group,
            duration,
            director,
            authors,
            description,
            content_categories,
            content_categories_ids
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
            image: '',
            cover: '',
            trailer: '',
            age_group: '',
            duration: '',
            director: '',
            authors: '',
            description: '',
            content_categories_ids: []
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
            image,
            cover,
            trailer,
            age_group,
            duration,
            director,
            authors,
            description,
            content_categories_ids
        } = this.state

        try {
            await axios[method](path, {
                name,
                image,
                cover,
                trailer,
                age_group,
                duration,
                director,
                authors,
                description,
                content_categories_ids
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

    onImageChange = name => (path = '') => {
        this.setState({
            [name]: path
        })
    }

    editorChange = name => e => {
        this.setState({
            [name]: e.target.getContent()
        })
    }

    selectChanged = e => {
        const { value } = e.target

        this.setState({ content_categories_ids: value })
    }

    render() {
        const {
            name,
            image,
            cover,
            trailer,
            age_group,
            duration,
            director,
            authors,
            description,
            content_categories,
            content_categories_ids,
            isSnackOpen,
            errors,
            disabled
        } = this.state

        const {
            message,
            classes
        } = this.props

        const {
            marginBottom
        } = classes

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
                            <div className={marginBottom}>
                                <BaseEditor
                                    required
                                    label="Тайлбар"
                                    error={!!errors.description}
                                    value={description}
                                    onChange={this.editorChange('description')}
                                />
                            </div>
                            <Box my={3}>
                                <DropZone
                                    label="Арын зураг"
                                    uploadPath="upload/image"
                                    onChange={this.onImageChange('cover')}
                                    file={cover}
                                    error={!!errors.cover}
                                />
                            </Box>
                            <Box my={3}>
                                <DropZone
                                    required
                                    label="Зураг"
                                    uploadPath="upload/image"
                                    onChange={this.onImageChange('image')}
                                    file={image}
                                    error={!!errors.image}
                                />
                            </Box>
                            <Box my={3}>
                                <DropZone
                                    required
                                    label="Трейлер"
                                    uploadPath="upload/video"
                                    onChange={this.onImageChange('trailer')}
                                    file={trailer}
                                    error={!!errors.trailer}
                                />
                            </Box>
                            <TextField
                                error={!!errors.director}
                                helperText={errors.director}
                                label="Найруулагч"
                                value={director}
                                onChange={this.handleChange('director')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                error={!!errors.authors}
                                helperText={errors.authors}
                                label="Жүжигчид"
                                value={authors}
                                onChange={this.handleChange('authors')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                error={!!errors.age_group}
                                helperText={errors.age_group}
                                label="Насны ангилил"
                                value={age_group}
                                onChange={this.handleChange('age_group')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                error={!!errors.duration}
                                helperText={errors.duration}
                                label="Үргэлжлэх хугацаа"
                                value={duration}
                                onChange={this.handleChange('duration')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <Box my={3}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    <InputLabel htmlFor="content_categories_ids-simple">Төрөл</InputLabel>
                                    <Select
                                        error={!!errors.content_categories_ids}
                                        helperText={errors.content_categories_ids}
                                        labelId="content_categories_ids-simple"
                                        value={content_categories_ids}
                                        onChange={this.selectChanged}
                                        multiple
                                        input={
                                            <OutlinedInput />
                                        }
                                    >
                                        {
                                            content_categories.map(val =>
                                                <MenuItem
                                                    key={val.id}
                                                    value={val.id}
                                                >
                                                    {val.name}
                                                </MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
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

export default withStyles(styles)(ContentForm)
