import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
    TextField,
    Button,
    Grid,
    Box,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    CircularProgress
} from '@material-ui/core'
import {
    BaseEditor,
    CustomSnackBar
} from '../components'
import axios from '../plugins/axios'

const styles = theme => ({
    marginBottom: {
        margin: '0 0 20px 0'
    }
})
class FaqForm extends Component {

    static defaultProps = {
        question: '',
        answer: '',
        faq_category_id: '',
        faq_categories: []
    }

    constructor(props) {
        super(props)

        const {
            question,
            answer,
            faq_category_id,
            faq_categories
        } = props

        this.state = {
            fetching: false,
            disabled: false,
            isSnackOpen: false,
            errors: {},
            question,
            answer,
            faq_category_id,
            faq_categories
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
            question: '',
            answer: '',
            faq_category_id: ''
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
            question,
            answer,
            faq_category_id
        } = this.state

        try {
            await axios[method](path, {
                question,
                answer,
                faq_category_id
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

        this.setState({ faq_category_id: value })
    }

    editorChange = name => e => {
        this.setState({
            [name]: e.target.getContent()
        })
    }

    render() {
        const {
            question,
            answer,
            faq_categories,
            faq_category_id,
            isSnackOpen,
            errors,
            disabled
        } = this.state

        const { 
            message,
            classes
        } = this.props
        const { marginBottom } = classes
        return (
            <div>
                <form
                    onSubmit={this.storeOrUpdate}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                error={!!errors.question}
                                helperText={errors.question}
                                label="Асуулт"
                                value={question}
                                onChange={this.handleChange('question')}
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={5}
                                fullWidth
                            />
                            <div className={marginBottom}>
                                <BaseEditor
                                    required
                                    label="Хариулт"
                                    error={!!errors.answer}
                                    value={answer}
                                    onChange={this.editorChange('answer')}
                                />
                            </div>
                            <Box my={3}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="faq_category_id-simple">Ангилал</InputLabel>
                                    <Select
                                        error={!!errors.faq_category_id}
                                        helperText={errors.faq_category_id}
                                        value={faq_category_id}
                                        onChange={this.selectChanged}
                                        input={
                                            <OutlinedInput title="faq_category_id" id="faq_category_id-simple" />
                                        }
                                    >
                                        {
                                            faq_categories.map(val =>
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
                            <div className={marginBottom}></div>
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
                        </Grid>
                        <CustomSnackBar
                            message={message}
                            open={isSnackOpen}
                            snackClose={this.snackClose}
                        />
                    </Grid>
                </form>
            </div >
        )
    }
}

export default withStyles(styles)(FaqForm)
