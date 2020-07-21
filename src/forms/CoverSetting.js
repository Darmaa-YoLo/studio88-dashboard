import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Dashboard } from './../layouts'
import {
    Grid,
    Box,
    Button,
    CircularProgress
} from '@material-ui/core'
import {
    CustomSnackBar,
    DropZone
} from './../components'
import shortid from 'shortid'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class CoverSetting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Арын зураг  - Тохиргоо',
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            product_cover: '',
            content_cover: '',
            channel_cover: '',
            promotion_cover: '',
            help_cover: '',
            about_cover: '',
            branch_cover: '',
            contact_cover: ''
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
            product_cover,
            content_cover,
            channel_cover,
            promotion_cover,
            help_cover,
            about_cover,
            branch_cover,
            contact_cover
        } = this.state

        try {
            await axios.put('/option', {
                product_cover,
                content_cover,
                channel_cover,
                promotion_cover,
                help_cover,
                about_cover,
                branch_cover,
                contact_cover
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

    onImageChange = name => (path = '') => {
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
            product_cover,
            content_cover,
            channel_cover,
            promotion_cover,
            help_cover,
            about_cover,
            branch_cover,
            contact_cover
        } = this.state

        return (
            <Dashboard title={title}>
                <form
                    key={key}
                    onSubmit={this.update}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Box my={2}>
                                <DropZone
                                    label="Бүтээгдэхүүн"
                                    uploadPath="upload/image"
                                    onChange={this.onImageChange('product_cover')}
                                    file={product_cover}
                                />
                            </Box>
                            <Box my={2}>
                                <DropZone
                                    label="Контент"
                                    uploadPath="upload/image"
                                    onChange={this.onImageChange('content_cover')}
                                    file={content_cover}
                                />
                            </Box>
                            <Box my={2}>
                                <DropZone
                                    label="Суваг"
                                    uploadPath="upload/image"
                                    onChange={this.onImageChange('channel_cover')}
                                    file={channel_cover}
                                />
                            </Box>
                            <Box my={2}>
                                <DropZone
                                    label="Урамшуулал"
                                    uploadPath="upload/image"
                                    onChange={this.onImageChange('promotion_cover')}
                                    file={promotion_cover}
                                />
                            </Box>
                            <Box my={2}>
                                <DropZone
                                    label="Тусламж"
                                    uploadPath="upload/image"
                                    onChange={this.onImageChange('help_cover')}
                                    file={help_cover}
                                />
                            </Box>
                            <Box my={2}>
                                <DropZone
                                    label="Бидний тухай"
                                    uploadPath="upload/image"
                                    onChange={this.onImageChange('about_cover')}
                                    file={about_cover}
                                />
                            </Box>
                            <Box my={2}>
                                <DropZone
                                    label="Салбарууд"
                                    uploadPath="upload/image"
                                    onChange={this.onImageChange('branch_cover')}
                                    file={branch_cover}
                                />
                            </Box>
                            <Box my={2}>
                                <DropZone
                                    label="Холбоо барих"
                                    uploadPath="upload/image"
                                    onChange={this.onImageChange('contact_cover')}
                                    file={contact_cover}
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

export default withStyles(styles)(CoverSetting)
