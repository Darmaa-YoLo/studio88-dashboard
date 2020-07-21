import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Dashboard } from './../layouts'
import {
    TextField,
    Grid,
    Box,
    Button,
    CircularProgress
} from '@material-ui/core'
import {
    CustomSnackBar,
    DropZone,
    DropZoneMultiple
} from './../components'
import shortid from 'shortid'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class HomeSetting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Нүүр - Тохиргоо',
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            interesting_content: '',
            net_title: '',
            net_description: '',
            net_image: '',
            device_title: '',
            device_description: '',
            device_images: [],
            app_title: '',
            app_description: '',
            app_image: '',
            app_appstore: '',
            app_googleplay: '',
            quote_text: '',
            quote_image: ''
        }
    }

    componentWillMount = () => {
        this.fetchData()
    }

    fetchData = async () => {
        try {
            this.setState({
                key: shortid.generate()
            })

            const {
                data
            } = await axios.get(
                `/option`,
                { progress: true }
            )

            data.map(item =>
                this.setState({
                    [item.name]: item.value
                        ? item.value
                        : item.images
                })
            )
        } catch (e) {
            //
        }
    }

    update = async e => {
        e.preventDefault()
        this.setState({
            disabled: true
        })

        const {
            interesting_content,
            net_title,
            net_description,
            net_image,
            device_title,
            device_description,
            device_images,
            app_title,
            app_description,
            app_image,
            app_appstore,
            app_googleplay,
            quote_text,
            quote_image
        } = this.state

        try {
            await axios.put('/option', {
                interesting_content,
                net_title,
                net_description,
                net_image,
                device_title,
                device_description,
                device_images,
                app_title,
                app_description,
                app_image,
                app_appstore,
                app_googleplay,
                quote_text,
                quote_image
            })

            this.setState({
                isSnackOpen: true,
                disabled: false
            })
        } catch (err) {
            //
        }
    }

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value
        })
    }

    snackClose = () => {
        this.setState({
            isSnackOpen: false
        })
    }

    onImageChange = name => (path, bool) => {
        let copyImages = []
        if (bool === undefined) {
            this.setState(prevState => ({
                [name]: [...prevState[name], path]
            }))
        } else {
            copyImages = this.state[name].filter(val =>
                val !== path
            )
            this.setState({
                [name]: copyImages
            })
        }
    }

    onPictureChange = name => (path = '') => {
        this.setState({
            [name]: path
        })
    }

    render() {
        const {
            title,
            key,
            disabled,
            isSnackOpen,
            interesting_content,
            net_title,
            net_description,
            net_image,
            device_title,
            device_description,
            device_images,
            app_title,
            app_description,
            app_image,
            app_appstore,
            app_googleplay,
            quote_text,
            quote_image
        } = this.state

        return (
            <Dashboard title={title}>
                <form
                    key={key}
                    onSubmit={this.update}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Box my={3}>
                                <TextField
                                    label="Сонирхолтой контент"
                                    value={interesting_content}
                                    onChange={this.handleChange('interesting_content')}
                                    variant="outlined"
                                    margin="normal"
                                    multiline
                                    rows={7}
                                    fullWidth
                                />
                            </Box>
                            <Box my={3}>
                                <TextField
                                    label="Интернет гарчиг"
                                    value={net_title}
                                    onChange={this.handleChange('net_title')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    label="Интернет тайлбар"
                                    value={net_description}
                                    onChange={this.handleChange('net_description')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    rows={7}
                                />
                                <Box my={1}>
                                    <DropZone
                                        label="Интернет зураг"
                                        uploadPath="upload/image"
                                        onChange={this.onPictureChange('net_image')}
                                        file={net_image}
                                    />
                                </Box>
                            </Box>
                            <Box my={3}>
                                <TextField
                                    label="Төхөөрөмжийн гарчиг"
                                    value={device_title}
                                    onChange={this.handleChange('device_title')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    label="Төхөөрөмжийн тайлбар"
                                    value={device_description}
                                    onChange={this.handleChange('device_description')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    rows={7}
                                />
                                <Box my={1}>
                                    <DropZoneMultiple
                                        label="Төхөөрөмжийн зураг"
                                        uploadPath="upload/image"
                                        onChange={this.onImageChange('device_images')}
                                        files={device_images}
                                    />
                                </Box>
                            </Box>
                            <Box my={3}>
                                <TextField
                                    label="Апп гарчиг"
                                    value={app_title}
                                    onChange={this.handleChange('app_title')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    label="Апп тайлбар"
                                    value={app_description}
                                    onChange={this.handleChange('app_description')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    rows={7}
                                />
                                <TextField
                                    label="Апп (App Store)"
                                    value={app_appstore}
                                    onChange={this.handleChange('app_appstore')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    label="Апп (Google Play)"
                                    value={app_googleplay}
                                    onChange={this.handleChange('app_googleplay')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <Box my={1}>
                                    <DropZone
                                        label="Апп зураг"
                                        uploadPath="upload/image"
                                        onChange={this.onPictureChange('app_image')}
                                        file={app_image}
                                    />
                                </Box>
                            </Box>
                            <Box my={3}>
                                <TextField
                                    label="Ишлэл"
                                    value={quote_text}
                                    onChange={this.handleChange('quote_text')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    rows={7}
                                />
                                <DropZone
                                    label="Ишлэл зураг"
                                    uploadPath="upload/image"
                                    onChange={this.onPictureChange('quote_image')}
                                    file={quote_image}
                                />
                            </Box>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={disabled}
                            >
                                {disabled
                                    ? <CircularProgress
                                        size={25}
                                        color="primary" />
                                    : "Шинэчлэх"
                                }
                            </Button>
                        </Grid>
                    </Grid>
                    <CustomSnackBar
                        message="Амжилттай шинэчлэгдлээ"
                        open={isSnackOpen}
                        snackClose={this.snackClose}
                    />
                </form>
            </Dashboard>
        )
    }
}

export default withStyles(styles)(HomeSetting)
