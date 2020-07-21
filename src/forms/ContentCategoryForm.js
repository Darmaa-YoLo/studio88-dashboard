import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    TextField,
    Button,
    Grid,
    Box,
    CircularProgress,
    FormControl,
    InputLabel,
    OutlinedInput,
    MenuItem,
    Select
} from '@material-ui/core'
import {
    CustomSnackBar
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

class ContentCategoryForm extends Component {

    static defaultProps = {
        name: '',
        order: 'A'
    }

    constructor(props) {
        super(props)

        const {
            name,
            order
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            name,
            order
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
            order: 'A'
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
            order
        } = this.state

        try {
            await axios[method](path, {
                name,
                order
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

    render() {
        const {
            name,
            order,
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
                            <TextField
                                error={!!errors.name}
                                helperText={errors.name}
                                label="Name"
                                value={name}
                                onChange={this.handleChange('name')}
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

export default withStyles(styles)(ContentCategoryForm)
