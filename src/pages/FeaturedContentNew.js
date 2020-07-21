import React, { Component } from 'react'
import shortid from 'shortid'
import { withStyles } from '@material-ui/styles'
import { FeaturedContentForm } from '../forms'
import { Dashboard } from '../layouts'
import axios from '../plugins/axios'

const styles = theme => ({
    //
})

class FeaturedContentNew extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: 'Сонирхолтой контент',
            key: shortid.generate(),
            contents: []
        }
    }

    componentDidMount = () => {
        this.fetchContents()
    }

    fetchContents = async () => {
        try {
            const { data } = await axios.get('/contents', {
                progress: true,
                params: {
                    rowsPerPage: -1,
                    sortBy: 'name',
                    sortOrder: 'asc'
                }
            })

            this.setState({
                key: shortid.generate(),
                contents: data
            })
        } catch (e) {
            //
        }
    }

    render() {
        const {
            key,
            title,
            contents
        } = this.state
        return (
            <Dashboard title={title}>
                <FeaturedContentForm 
                    key={key}
                    path="featured_contents"
                    method="post"
                    contents={contents}
                    message="Амжилттай нэмэгдлээ"
                />
            </Dashboard>
        )
    }
}

export default withStyles(styles)(FeaturedContentNew)
