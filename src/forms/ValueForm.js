import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    TextField,
    Button,
    Grid,
    Box,
    CircularProgress,
} from '@material-ui/core'
import {
    Plus,
    Minus
} from 'mdi-material-ui'
import {
    CustomSnackBar,
} from './../components'
import axios from './../plugins/axios'

const styles = theme => ({
    marginBottom: {
        margin: '0 0 20px 0'
    },
})
class ValueForm extends Component {

    static defaultProps = {
        title: '',
        values: ['']
    }

    constructor(props) {
        super(props)

        const {
            title,
            values
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            title,
            values
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
            title: '',
            values: ['']
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
            title,
            values
        } = this.state

        try {
            await axios[method](path, {
                title,
                values
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

    handleAddField = (name) => {
        this.setState(prevState => ({
            [name]: [
                ...prevState[name], ''
            ]
        }))
    }

    handleRemoveField = (name, index) => {
        let copyState = this
            .state[name]
            .filter((element, i) => index !== i)

        this.setState({
            [name]: copyState
        })
    }

    handleFieldChange = (index) => e => {
        const { name, value } = e.target

        let items = [...this.state[name]]
        items[index] = value

        this.setState({
            [name]: items
        })
    }

    render() {
        const {
            title,
            values,
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
                                required
                                error={!!errors.title}
                                helperText={errors.title}
                                label="Нэр"
                                value={title}
                                onChange={this.handleChange('title')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <Box my={3}>
                                {values.map((value, index) =>
                                    <Grid container spacing={3}>
                                        <Grid item xs={10}>
                                            <TextField
                                                label="Утга"
                                                value={value}
                                                name="values"
                                                onChange={this
                                                    .handleFieldChange(index)
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button
                                                variant="outlined"
                                                style={{
                                                    height: '100%',
                                                }}
                                                onClick={() => this
                                                    .handleRemoveField(
                                                        'values',
                                                        index
                                                    )
                                                }
                                                disabled={
                                                    values.length <= 1 && true
                                                }
                                            >
                                                <Minus />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                )}
                                <Box my={2}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => this
                                            .handleAddField('values')
                                        }
                                    >
                                        <Plus />
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box my={3}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={disabled}
                        >
                            {disabled
                                ? <CircularProgress
                                    size={25}
                                    color="primary"
                                />
                                : "Хадгалах"
                            }
                        </Button>
                    </Box>
                    <CustomSnackBar
                        message={message}
                        open={isSnackOpen}
                        snackClose={this.snackClose}
                    />
                </form>
            </div >
        )
    }
}

export default withStyles(styles)(ValueForm)
