import React, { Component } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    DatePicker
} from '@material-ui/pickers'

export default class BaseDatePicker extends Component {
    render() {
        const {
            value,
            onChange,
            label,
            format,
            required
        } = this.props
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    required={required}
                    value={value}
                    onChange={onChange}
                    label={label}
                    format={format}
                    inputVariant="outlined"
                    margin="none"
                    fullWidth
                    clearable
                />
            </MuiPickersUtilsProvider>
        )
    }
}
