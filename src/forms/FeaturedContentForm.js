import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    Button,
    Grid,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    CircularProgress,
} from '@material-ui/core'
import {
    CustomSnackBar,
    BaseDatePicker
} from './../components'
import axios from './../plugins/axios'

const styles = theme => ({
    marginLeft: {
        margin: '0 10px 0 0'
    },
    marginBottom: {
        margin: '0 0 20px 0'
    },
    marginVerticalSmall: {
        margin: '10px 0 10px 0'
    },
})

class FeaturedContentForm extends Component {

    static defaultProps = {
        start: null,
        end: null,
        order: 'A',
        content_id: '',
        contents: []
    }

    constructor(props) {
        super(props)

        const {
            start,
            end,
            order,
            content_id,
            contents,
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            start,
            end,
            order,
            content_id,
            contents
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
            start: null,
            end: null,
            order: 'A',
            content_id: ''
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
            start,
            end,
            order,
            content_id
        } = this.state

        try {
            await axios[method](path, {
                start,
                end,
                order,
                content_id
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

    selectChanged = e => {
        const { value } = e.target

        this.setState({ content_id: value })
    }

    handleDateChange = name => value => {
        this.setState({ [name]: value })
    }

    render() {
        const {
            start,
            end,
            order,
            content_id,
            contents,
            isSnackOpen,
            errors,
            disabled
        } = this.state

        const {
            message
        } = this.props
        return (
            <div>
                <form
                    onSubmit={this.storeOrUpdate}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Box my={3}>
                                <BaseDatePicker
                                    required
                                    label="Эхлэх"
                                    value={start}
                                    onChange={this.handleDateChange('start')}
                                    animateYearScrolling
                                />
                            </Box>
                            <Box my={3}>
                                <BaseDatePicker
                                    required
                                    label="Дуусах"
                                    value={end}
                                    onChange={this.handleDateChange('end')}
                                    animateYearScrolling
                                />
                            </Box>
                            <Box my={3}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    <InputLabel id="order-select-label">Дараалал</InputLabel>
                                    <Select
                                        labelId="order-select-label"
                                        id="order-select"
                                        value={order}
                                        onChange={this.handleChange('order')}
                                        input={
                                            <OutlinedInput />
                                        }
                                    >
                                        <MenuItem value="A">A</MenuItem>
                                        <MenuItem value="B">B</MenuItem>
                                        <MenuItem value="C">C</MenuItem>
                                        <MenuItem value="D">D</MenuItem>
                                        <MenuItem value="E">E</MenuItem>
                                        <MenuItem value="F">F</MenuItem>
                                        <MenuItem value="G">G</MenuItem>
                                        <MenuItem value="H">H</MenuItem>
                                        <MenuItem value="I">I</MenuItem>
                                        <MenuItem value="J">J</MenuItem>
                                        <MenuItem value="K">K</MenuItem>
                                        <MenuItem value="L">L</MenuItem>
                                        <MenuItem value="M">M</MenuItem>
                                        <MenuItem value="N">N</MenuItem>
                                        <MenuItem value="O">O</MenuItem>
                                        <MenuItem value="P">P</MenuItem>
                                        <MenuItem value="Q">Q</MenuItem>
                                        <MenuItem value="R">R</MenuItem>
                                        <MenuItem value="S">S</MenuItem>
                                        <MenuItem value="T">T</MenuItem>
                                        <MenuItem value="U">U</MenuItem>
                                        <MenuItem value="V">V</MenuItem>
                                        <MenuItem value="W">W</MenuItem>
                                        <MenuItem value="X">X</MenuItem>
                                        <MenuItem value="Y">Y</MenuItem>
                                        <MenuItem value="Z">Z</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box my={3}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    <InputLabel htmlFor="content_id-simple">Контент</InputLabel>
                                    <Select
                                        error={!!errors.content_id}
                                        helperText={errors.content_id}
                                        value={content_id}
                                        onChange={this.selectChanged}
                                        input={
                                            <OutlinedInput title="content_id" id="content_id-simple" />
                                        }
                                    >
                                        {
                                            contents.map(val =>
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

export default withStyles(styles)(FeaturedContentForm)
