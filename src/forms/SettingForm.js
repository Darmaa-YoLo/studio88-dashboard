import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Dashboard } from './../layouts'
import {
    TextField,
    Grid,
    Typography,
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

class SettingForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Settings',
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            cover_image: '',
            cover_title: '',
            receiver: '',
            about: '',
            email: '',
            number: '',
            address: '',
            facebook: '',
            instagram: '',
            pinterest: '',
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

            const { data } = await axios.get(`/option`, { progress: true })

            data.map(item =>
                this.setState({ [item.name]: item.value })
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
            cover_image,
            cover_title,
            receiver,
            about,
            email,
            number,
            address,
            facebook,
            instagram,
            pinterest,
        } = this.state

        try {
            await axios.put('/option', {
                cover_image,
                cover_title,
                receiver,
                about,
                email,
                number,
                address,
                facebook,
                instagram,
                pinterest,
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

    onChange = (path = '') => {
        this.setState({
            cover_image: path
        })
    }

    render() {
        const {
            title,
            key,
            isSnackOpen,
            cover_image,
            cover_title,
            receiver,
            about,
            email,
            number,
            address,
            facebook,
            instagram,
            pinterest,
            disabled
        } = this.state
        return (
            <Dashboard title={title}>
                <form
                    key={key}
                    onSubmit={this.update}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">
                                Нүүр хуудас
                            </Typography>
                            <DropZone
                                uploadPath="img/upload"
                                onChange={this.onChange}
                                file={cover_image}
                            />
                            <TextField
                                label="Home title"
                                value={cover_title}
                                onChange={this.handleChange('cover_title')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Бидний тухай"
                                value={about}
                                onChange={this.handleChange('about')}
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={5}
                                fullWidth
                            />
                            <Typography variant="subtitle1">
                                Хүлээн авах и-мейлүүд
                            </Typography>
                            <TextField
                                label="И-мэйлүүд (mail1@example.com, mail2@example.com)"
                                value={receiver}
                                onChange={this.handleChange('receiver')}
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={2}
                                fullWidth
                            />
                            <Typography variant="subtitle1">
                                Холбоо барих
                            </Typography>
                            <TextField
                                label="И-мэйл"
                                value={email}
                                onChange={this.handleChange('email')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Утасны дугаар"
                                value={number}
                                onChange={this.handleChange('number')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Хаяг"
                                value={address}
                                onChange={this.handleChange('address')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <Typography variant="subtitle1">
                                Цахим хаягууд
                            </Typography>
                            <TextField
                                label="Facebook"
                                value={facebook}
                                onChange={this.handleChange('facebook')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Instagram"
                                value={instagram}
                                onChange={this.handleChange('instagram')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Pinterest"
                                value={pinterest}
                                onChange={this.handleChange('pinterest')}
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
                                    disabled ? <CircularProgress size={25} color="primary" /> : "Шинэчлэх"
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

export default withStyles(styles)(SettingForm)
