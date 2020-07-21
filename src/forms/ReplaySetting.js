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

class ReplaySetting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Нөхөж үзэх - Тохиргоо',
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            replay_text_first: '',
            replay_text_second: '',
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
            replay_text_first,
            replay_text_second,
        } = this.state

        try {
            await axios.put('/option', {
                replay_text_first,
                replay_text_second,
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
            replay_text_first,
            replay_text_second,
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
                                    value={replay_text_first}
                                    onChange={this.handleChange('replay_text_first')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    rows={10}
                                />
                                <TextField
                                    label="Бидний тухай тайлбар"
                                    value={replay_text_second}
                                    onChange={this.handleChange('replay_text_second')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    rows={10}
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

export default withStyles(styles)(ReplaySetting)
