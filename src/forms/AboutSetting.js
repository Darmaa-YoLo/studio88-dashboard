import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Dashboard } from './../layouts'
import {
    TextField,
    Grid,
    Box,
    Button,
    CircularProgress,
} from '@material-ui/core'
import {
    CustomSnackBar,
} from './../components'
import shortid from 'shortid'
import axios from './../plugins/axios'

const styles = theme => ({
    //
})

class AboutSetting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Бидний тухай - Тохиргоо',
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            about_title: '',
            about_description: '',
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
            about_title,
            about_description,
        } = this.state

        try {
            await axios.put('/option', {
                about_title,
                about_description,
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

    render() {
        const {
            title,
            key,
            disabled,
            isSnackOpen,
            about_title,
            about_description,
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
                                    label="Бидний тухай гарчиг"
                                    value={about_title}
                                    onChange={this.handleChange('about_title')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    label="Бидний тухай тайлбар"
                                    value={about_description}
                                    onChange={this.handleChange('about_description')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    rows={7}
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

export default withStyles(styles)(AboutSetting)
