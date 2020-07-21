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
    DropZoneMultiple
} from './../components'
import shortid from 'shortid'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class ChannelSetting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Суваг - Тохиргоо',
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            channel_title: '',
            channel_description: '',
            channel_images: [],
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
            channel_title,
            channel_description,
            channel_images,
        } = this.state

        try {
            await axios.put('/option', {
                channel_title,
                channel_description,
                channel_images,
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

    render() {
        const {
            title,
            key,
            disabled,
            isSnackOpen,
            channel_title,
            channel_description,
            channel_images,
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
                                    label="Суваг гарчиг"
                                    value={channel_title}
                                    onChange={this.handleChange('channel_title')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    label="Суваг тайлбар"
                                    value={channel_description}
                                    onChange={this.handleChange('channel_description')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    rows={7}
                                />
                            </Box>
                            <Box my={3}>
                                <Box my={1}>
                                    <DropZoneMultiple
                                        uploadPath="upload/image"
                                        onChange={this.onImageChange('channel_images')}
                                        files={channel_images}
                                    />
                                </Box>
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

export default withStyles(styles)(ChannelSetting)
