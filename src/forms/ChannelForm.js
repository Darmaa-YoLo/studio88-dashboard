import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    TextField,
    Button,
    Grid,
    CircularProgress,
    FormControlLabel,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    OutlinedInput
} from '@material-ui/core'
import {
    DropZone,
    DropZoneMultiple
} from '../components'
import {
    CustomSnackBar
} from '../components'
import axios from '../plugins/axios'

const styles = theme => ({
    marginBottom: {
        margin: '0 0 20px 0'
    }
})
class ChannelForm extends Component {

    static defaultProps = {
        index: '',
        channel_name: '',
        description: '',
        pricing: '',
        image: '',
        logos: [],
        is_hd: false,
        is_replayable: false,
        category: '',
        channel_category_ids: [],
        channel_categories: [],
        is_featured: false
    }

    constructor(props) {
        super(props)

        const {
            index,
            channel_name,
            description,
            pricing,
            image,
            logos,
            is_hd,
            is_replayable,
            category,
            channel_category_ids,
            channel_categories,
            is_featured
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            index,
            channel_name,
            description,
            pricing,
            image,
            logos,
            is_hd,
            is_replayable,
            category,
            channel_category_ids,
            channel_categories,
            is_featured
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
            index: '',
            channel_name: '',
            description: '',
            pricing: '',
            image: '',
            logos: [],
            is_hd: null,
            is_replayable: null,
            category: '',
            channel_category_ids: [],
            is_featured: false
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
            index,
            channel_name,
            description,
            pricing,
            logos,
            image,
            is_hd,
            is_replayable,
            category,
            channel_category_ids,
            is_featured
        } = this.state

        try {
            await axios[method](path, {
                index,
                channel_name,
                description,
                pricing,
                image,
                logos,
                is_hd,
                is_replayable,
                category,
                channel_category_ids,
                is_featured
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

    onImageChange = (path, bool) => {
        let copyImages = []
        if (bool === undefined) {
            this.setState(prevState => ({
                logos: [...prevState.logos, path]
            }))
        } else {
            copyImages = this.state.logos.filter(val =>
                val !== path
            )
            this.setState({
                logos: copyImages
            })
        }
    }

    onPictureChange = (path = '') => {
        this.setState({
            image: path
        })
    }

    selectChanged = e => {
        const { value } = e.target

        this.setState({ channel_category_ids: value })
    }

    render() {
        const {
            index,
            channel_name,
            description,
            pricing,
            image,
            logos,
            is_hd,
            is_replayable,
            category,
            channel_category_ids,
            channel_categories,
            is_featured,
            isSnackOpen,
            errors,
            disabled
        } = this.state

        const { marginBottom } = this.props.classes

        const { message } = this.props

        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <form
                            onSubmit={this.storeOrUpdate}
                        >
                            <TextField
                                error={!!errors.index}
                                helperText={errors.index}
                                label="Сувгийн дугаарлалт"
                                value={index}
                                onChange={this.handleChange('index')}
                                variant="outlined"
                                margin="normal"
                                type="number"
                                fullWidth
                            />
                            <TextField
                                error={!!errors.channel_name}
                                helperText={errors.channel_name}
                                label="Багцын нэр"
                                value={channel_name}
                                onChange={this.handleChange('channel_name')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                error={!!errors.description}
                                helperText={errors.description}
                                label="Тайлбар"
                                value={description}
                                onChange={this.handleChange('description')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                multiline
                                rows={7}
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
                            <div className={marginBottom}>
                                <DropZone
                                    label="Зураг"
                                    uploadPath="upload/image"
                                    onChange={this.onPictureChange}
                                    file={image}
                                    error={!!errors.image}
                                />
                            </div>
                            <div className={marginBottom}>
                                <DropZoneMultiple
                                    required
                                    label="Лого"
                                    uploadPath="upload/image"
                                    onChange={this.onImageChange}
                                    files={logos}
                                    error={!!errors.logos}
                                />
                            </div>
                            <FormControlLabel
                                label="HD"
                                control={
                                    <Checkbox
                                        checked={is_hd}
                                        onChange={this.onCheckChange('is_hd')}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={is_replayable}
                                        onChange={this.onCheckChange('is_replayable')}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Нөхөж үзэх"
                            />
                            <Box my={3}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    <InputLabel id="category-select-label">Ангилал</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        value={category}
                                        onChange={this.handleChange('category')}
                                        input={
                                            <OutlinedInput />
                                        }
                                    >
                                        <MenuItem value="Үндсэн">Үндсэн</MenuItem>
                                        <MenuItem value="Нэмэлт">Нэмэлт</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box my={3}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                >
                                    <InputLabel htmlFor="channel_categories-simple">Төрөл</InputLabel>
                                    <Select
                                        multiple
                                        error={!!errors.channel_categories}
                                        helperText={errors.channel_categories}
                                        labelId="channel_categories-simple"
                                        value={channel_category_ids}
                                        onChange={this.selectChanged}
                                        input={
                                            <OutlinedInput />
                                        }
                                    >
                                        {
                                            channel_categories.map(val =>
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
                                <FormControlLabel
                                    label="Нүүр хуудаст харуулах"
                                    control={
                                        <Checkbox
                                            checked={is_featured}
                                            onChange={this.onCheckChange('is_featured')}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                />
                            </Box>
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

export default withStyles(styles)(ChannelForm)
