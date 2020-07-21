import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Editor } from '@tinymce/tinymce-react'
import {
    Typography
} from '@material-ui/core'

const styles = theme => ({
    errorCard: {
        border: '1px solid #f44336'
    },
    labelStyle: {
        margin: '25px 0 10px 0',
        fontSize: '18px'
    }
})

class BaseEditor extends Component {
    render() {
        const {
            label,
            value,
            onChange,
            error,
            classes,
            required
        } = this.props
        const {
            errorCard,
            labelStyle
        } = classes
        const {
            REACT_APP_TINY_MCE_API_KEY
        } = process.env

        return (
            <div className={error && errorCard}>
                <Typography className={labelStyle}>
                    {label}
                    {required && ' *'}
                </Typography>
                <Editor
                    error={true}
                    initialValue={value}
                    onChange={onChange}
                    apiKey={REACT_APP_TINY_MCE_API_KEY}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'link', 'lists', 'fullscreen', 'paste'
                        ],
                        toolbar: [
                            'undo redo | link | bold | fullscreen',
                            'numlist bullist | alignleft aligncenter alignright alignjustify',
                            'h1 h2 h3 h4 h5 h6 | fontsizeselect | underline',
                            'blockquote | forecolor | backcolor'
                        ]
                    }}
                />
            </div>
        )
    }
}

export default withStyles(styles)(BaseEditor)