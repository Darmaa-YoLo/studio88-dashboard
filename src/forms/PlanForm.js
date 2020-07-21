import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import shortid from 'shortid'
import {
    TextField,
    Button,
    Grid,
    Box,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem
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
class PlanForm extends Component {

    static defaultProps = {
        name: '',
        features: [],
        features_fields: [{
            feature_id: '',
            value: ''
        }]
    }

    constructor(props) {
        super(props)

        const {
            name,
            features,
            features_fields
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            key: shortid.generate(),
            name,
            features,
            features_fields
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
            features_fields: [{
                feature_id: '',
                value: ''
            }]
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
            features_fields
        } = this.state

        try {
            await axios[method](path, {
                name,
                features_fields
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
                ...prevState[name],
                {
                    feature_id: '',
                    value: ''
                }
            ]
        }))
    }

    handleRemoveField = (name, index) => {
        let copyState = this
            .state[name]
            .filter((element, i) => index !== i)

        this.setState({
            key: shortid.generate(),
            [name]: copyState
        })
    }

    handleFieldChange = (variable, index) => e => {
        const { name, value } = e.target

        let items = [...this.state[name]]
        items[index][variable] = value

        this.setState({
            [name]: items
        })
    }

    isFieldExist = (array, index) => {
        return array.some(
            element => element.feature_id === index
        )
    }

    render() {
        const {
            key,
            name,
            features,
            features_fields,
            isSnackOpen,
            errors,
            disabled
        } = this.state

        const {
            message
        } = this.props

        return (
            <div key={key}>
                <form
                    onSubmit={this.storeOrUpdate}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                required
                                error={!!errors.name}
                                helperText={errors.name}
                                label="Нэр"
                                value={name}
                                onChange={this.handleChange('name')}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <Box my={3}>
                                {features_fields.map(({ feature_id, value }, index) =>
                                    <Grid container spacing={3} key={index}>
                                        <Grid item xs={5}>
                                            <FormControl
                                                variant="outlined"
                                                fullWidth
                                                required
                                            >
                                                <InputLabel htmlFor="features-simple">
                                                    Багц боломжууд
                                                    </InputLabel>
                                                <Select
                                                    labelId="features-simple"
                                                    value={feature_id}
                                                    name="features_fields"
                                                    onChange={this
                                                        .handleFieldChange(
                                                            'feature_id',
                                                            index
                                                        )
                                                    }
                                                    input={<OutlinedInput />}
                                                >
                                                    {features.map(val =>
                                                        <MenuItem
                                                            disabled={this
                                                                .isFieldExist(
                                                                    features_fields,
                                                                    val.id
                                                                )
                                                            }
                                                            key={val.id}
                                                            value={val.id}
                                                        >
                                                            {val.name}
                                                        </MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField
                                                label="Утга"
                                                value={value}
                                                name="features_fields"
                                                onChange={this
                                                    .handleFieldChange(
                                                        'value',
                                                        index
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                                disabled={!feature_id}
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
                                                        'features_fields',
                                                        index
                                                    )
                                                }
                                                disabled={
                                                    features_fields.length <= 1 && true
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
                                            .handleAddField('features_fields')
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

export default withStyles(styles)(PlanForm)
