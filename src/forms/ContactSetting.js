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
} from './../components'
import shortid from 'shortid'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class ContactSetting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Холбоо барих  - Тохиргоо',
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            address: '',
            email: '',
            phone: '',
            fax: '',
            map: '',
            facebook: '',
            youtube: '',
            twitter: ''
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
            address,
            email,
            phone,
            fax,
            map,
            facebook,
            youtube,
            twitter
        } = this.state

        try {
            await axios.put('/option', {
                address,
                email,
                phone,
                fax,
                map,
                facebook,
                youtube,
                twitter
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
            address,
            email,
            phone,
            fax,
            map,
            facebook,
            youtube,
            twitter
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
                                    label="Хаяг"
                                    value={address}
                                    onChange={this.handleChange('address')}
                                    variant="outlined"
                                    margin="normal"
                                    multiline
                                    fullWidth
                                />
                                <TextField
                                    label="И-мэйл хаяг"
                                    value={email}
                                    onChange={this.handleChange('email')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    label="Дугаар"
                                    value={phone}
                                    onChange={this.handleChange('phone')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    label="Дугаар"
                                    value={fax}
                                    onChange={this.handleChange('fax')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                            </Box>
                            <Box my={3}>
                                <TextField
                                    label="Газрын зураг"
                                    value={map}
                                    onChange={this.handleChange('map')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    rows={3}
                                />
                            </Box>
                            <Box my={3}>
                                <TextField
                                    label="Facebook"
                                    value={facebook}
                                    onChange={this.handleChange('facebook')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    label="Youtube"
                                    value={youtube}
                                    onChange={this.handleChange('youtube')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    label="Twitter"
                                    value={twitter}
                                    onChange={this.handleChange('twitter')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
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

export default withStyles(styles)(ContactSetting)
