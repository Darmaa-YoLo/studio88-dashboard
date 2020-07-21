import React, { Component } from 'react'
import {
    Grid,
    Paper,
    Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Dashboard } from './../layouts'
import axios from './../plugins/axios'
import {
    Chart,
    PieSeries,
    Legend
} from '@devexpress/dx-react-chart-material-ui'
import {
    BaseTable
} from './../components'

const styles = theme => ({
    paper: {
        padding: '20px'
    }
})

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Нүүр',
            totalAccess: 0,
            dayAccess: 0,
            weekAccess: 0,
            monthAccess: 0,
            deviceChart: [],
            countryChart: [],
            columns: [
                {
                    name: 'country_code',
                    title: 'Улсын код'
                },
                {
                    name: 'country_name',
                    title: 'Улсын нэр'
                },
                {
                    name: 'browser',
                    title: 'Хөтөч'
                },
                {
                    name: 'device_type',
                    title: 'Төхөөрөмжийн төрөл'
                },
                {
                    name: 'platform',
                    title: 'Үйлдлийн систем'
                },
                {
                    name: 'created',
                    title: 'Үүсгэсэн'
                }
            ]
        }
    }

    componentWillMount = () => {
        this.fetchData()
    }

    fetchData = async () => {
        try {
            const {
                totalAccess,
                dayAccess,
                weekAccess,
                monthAccess,
                deviceChart,
                countryChart
            } = await axios.get(`/trackers/show`, { progress: true })

            this.setState({
                totalAccess,
                dayAccess,
                weekAccess,
                monthAccess,
                deviceChart,
                countryChart
            })
        } catch (e) {
            //
        }
    }

    changeTargetItem = targetItem => this.setState({ targetItem });

    render() {
        const {
            title,
            totalAccess,
            dayAccess,
            weekAccess,
            monthAccess,
            deviceChart,
            countryChart,
            columns
        } = this.state

        const {
            paper
        } = this.props.classes
        return (
            <Dashboard
                title={title}
            >
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper
                            className={paper}
                            align="center"
                        >
                            <Typography variant="h5">
                                {dayAccess}
                            </Typography>
                            <Typography variant="body2">
                                Өнөөдрийн хандалт
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper
                            className={paper}
                            align="center"
                        >
                            <Typography variant="h5">
                                {weekAccess}
                            </Typography>
                            <Typography variant="body2">
                                Долоо хоногийн хандалт
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper
                            className={paper}
                            align="center"
                        >
                            <Typography variant="h5">
                                {monthAccess}
                            </Typography>
                            <Typography variant="body2">
                                Сарын хандалт
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper
                            className={paper}
                            align="center"
                        >
                            <Typography variant="h5">
                                {totalAccess}
                            </Typography>
                            <Typography variant="body2">
                                Нийт хандалт
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper
                            className={paper}
                        >
                            <Typography variant="subtitle1">
                                Төхөөрөмжийн төрөл
                            </Typography>
                            <Chart
                                height="200"
                                data={deviceChart}
                            >
                                <PieSeries
                                    valueField="value"
                                    argumentField="category"
                                />
                                <Legend
                                    position="left"
                                />
                            </Chart>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper
                            className={paper}
                        >
                            <Typography variant="subtitle1">
                                Улсын нэр
                            </Typography>
                            <Chart
                                className="pie-chart"
                                height="200"
                                data={countryChart}
                            >
                                <PieSeries
                                    valueField="total"
                                    argumentField="countryName"
                                />
                                <Legend
                                    position="right"
                                />
                            </Chart>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <BaseTable
                            path="trackers"
                            columns={columns}
                        />
                    </Grid>
                </Grid>
            </Dashboard >
        )
    }
}

export default withStyles(styles)(Home)
