import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import {
    Button,
    Drawer,
    Hidden,
    Avatar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
} from '@material-ui/core'
import {
    Home,
    Account,
    Settings,
    BookVariant,
    ChevronDown,
    ChevronUp,
    AccountBoxMultiple,
    HelpCircle,
    MapMarkerMultiple,
    AccessPoint,
    Animation,
    AnimationPlay,
    ClipboardPlay,
    PackageVariantClosed,
    CardsDiamond
} from 'mdi-material-ui'
import { removeAuth } from './../redux/auth/actions'
import { ThemeContext } from './../theme/context'

const drawerWidth = 260

const styles = theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    avatar: {
        width: 80,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 0
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
        borderColor: 'rgba(255, 255, 255, 0.23)',
        color: '#fff'
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#43425d'
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0
    },
    listItemActive: {
        position: 'relative',
        backgroundColor: theme.palette.action.selected,

        '&:before': {
            content: "''",
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 5,
            backgroundColor: '#a3a0fb'
        },
        '& $listItemIcon': {
            color: '#a3a0fb'
        }
    },
    listItemText: {
        color: '#fff',
        fontSize: 15
    },
    listItemIcon: {
        color: '#a5a4bf'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
})

class MainDrawer extends Component {
    static contextType = ThemeContext

    constructor(props) {
        super(props)

        this.state = {
            items: [
                {
                    to: '/',
                    label: 'Нүүр',
                    icon: <Home />,
                    exact: true
                },
                {
                    to: '/users',
                    label: 'Админ',
                    icon: <Account />,
                    exact: false
                },
                {
                    to: '/covers',
                    label: 'Слайдер',
                    icon: <AccountBoxMultiple />,
                    exact: false
                },
                {
                    to: '/plans',
                    label: 'Багц',
                    icon: <PackageVariantClosed />,
                    exact: false
                },
                {
                    to: '/features',
                    label: 'Багц боломж',
                    icon: <PackageVariantClosed />,
                    exact: false
                },
                {
                    to: '/promotions',
                    label: 'Урамшуулал',
                    icon: <BookVariant />,
                    exact: false
                },
                {
                    to: '/contents',
                    label: 'Контент',
                    icon: <ClipboardPlay />,
                    exact: false
                },
                {
                    to: '/content/categories',
                    label: 'Контент ангилал',
                    icon: <Animation />,
                    exact: false
                },
                {
                    to: '/featured/contents',
                    label: "Сонирхолтой контент",
                    icon: <AnimationPlay />,
                    exact: false
                },
                {
                    to: '/channels',
                    label: 'Суваг',
                    icon: <AccessPoint />,
                    exact: false
                },
                {
                    to: '/channel/categories',
                    label: 'Суваг төрөл',
                    icon: <AccessPoint />,
                    exact: false
                },
                {
                    to: '/values',
                    label: 'Үнэт зүйл',
                    icon: <CardsDiamond />,
                    exact: false
                },
                {
                    to: '/branches',
                    label: 'Салбарууд',
                    icon: <MapMarkerMultiple />,
                    exact: false
                },
                {
                    to: '/faqs',
                    label: 'Тусламж',
                    icon: <HelpCircle />,
                    exact: false
                },
                {
                    to: '/faq_categories',
                    label: 'Тусламж төрөл',
                    icon: <HelpCircle />,
                    exact: false
                },
            ],
            settingsToggle: true
        }
    }

    handleToggle = name => {
        this.setState({
            [name]: !this.state[name]
        })
    }

    render() {
        const {
            drawer,
            mobileDrawer,
            toggleMobileDrawer
        } = this.context
        const {
            classes,
            removeAuth
        } = this.props
        const {
            items,
            settingsToggle
        } = this.state
        const {
            root,
            avatar,
            button,
            drawerPaper,
            list,
            listItem,
            listItemActive,
            listItemText,
            listItemIcon,
            nested,
        } = classes

        const userArea = (
            <div style={{
                padding: 30
            }}>
                <Avatar
                    alt="Avatar"
                    src="/static/images/logo2.png"
                    className={avatar}
                />
                <Button
                    onClick={removeAuth}
                    className={button}
                    variant="outlined"
                    fullWidth
                >
                    LOGOUT
                </Button>
            </div>
        )

        const drawerContent = (
            <div>
                <List
                    className={list}
                    component="nav"
                >
                    {items.map(({ to, label, icon, exact }, index) =>
                        <ListItem
                            to={to}
                            key={index}
                            component={NavLink}
                            className={listItem}
                            activeClassName={listItemActive}
                            exact={exact}
                            button
                        >
                            <ListItemIcon className={listItemIcon}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                classes={{
                                    primary: listItemText,
                                }}
                            />
                        </ListItem>
                    )}
                    <ListItem
                        component={NavLink}
                        className={listItem}
                        exact={false}
                        button
                        onClick={() => this.handleToggle('settingsToggle')}
                    >
                        <ListItemIcon className={listItemIcon}>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText
                            primary="Тохиргоо"
                            classes={{
                                primary: listItemText,
                            }}
                        />
                        <ListItemIcon className={listItemIcon}>
                            {settingsToggle ? <ChevronUp /> : <ChevronDown />}
                        </ListItemIcon>
                    </ListItem>
                    <Collapse in={settingsToggle} timeout="auto" unmountOnExit>
                        <List className={nested} component="div" disablePadding>
                            <ListItem
                                to="/settings/home"
                                component={NavLink}
                                className={listItem}
                                activeClassName={listItemActive}
                                exact={false}
                                button
                            >
                                <ListItemText
                                    primary="Нүүр"
                                    classes={{
                                        primary: listItemText,
                                    }}
                                />
                            </ListItem>
                            <ListItem
                                to="/settings/replay"
                                component={NavLink}
                                className={listItem}
                                activeClassName={listItemActive}
                                exact={false}
                                button
                            >
                                <ListItemText
                                    primary="Нөхөж үзэх"
                                    classes={{
                                        primary: listItemText,
                                    }}
                                />
                            </ListItem>
                            <ListItem
                                to="/settings/about"
                                component={NavLink}
                                className={listItem}
                                activeClassName={listItemActive}
                                exact={false}
                                button
                            >
                                <ListItemText
                                    primary="Бидний тухай"
                                    classes={{
                                        primary: listItemText,
                                    }}
                                />
                            </ListItem>
                            <ListItem
                                to="/settings/channel"
                                component={NavLink}
                                className={listItem}
                                activeClassName={listItemActive}
                                exact={false}
                                button
                            >
                                <ListItemText
                                    primary="Суваг"
                                    classes={{
                                        primary: listItemText,
                                    }}
                                />
                            </ListItem>
                            <ListItem
                                to="/settings/contact"
                                component={NavLink}
                                className={listItem}
                                activeClassName={listItemActive}
                                exact={false}
                                button
                            >
                                <ListItemText
                                    primary="Холбоо барих"
                                    classes={{
                                        primary: listItemText,
                                    }}
                                />
                            </ListItem>
                            <ListItem
                                to="/settings/cover"
                                component={NavLink}
                                className={listItem}
                                activeClassName={listItemActive}
                                exact={false}
                                button
                            >
                                <ListItemText
                                    primary="Арын зураг"
                                    classes={{
                                        primary: listItemText,
                                    }}
                                />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div >
        )

        return (
            <div>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="persistent"
                        anchor="left"
                        className={root}
                        classes={{
                            paper: drawerPaper
                        }}
                        open={drawer}
                    >
                        {userArea}
                        {drawerContent}
                    </Drawer>
                </Hidden>
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={mobileDrawer}
                        onClose={toggleMobileDrawer}
                        classes={{
                            paper: drawerPaper,
                        }}
                    >
                        {userArea}
                        {drawerContent}
                    </Drawer>
                </Hidden>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = {
    removeAuth
}

const component = withStyles(styles)(MainDrawer)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(component)
