import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import IxLeftBarMenu from './left-bar-menu';
import IxLeftBarMenuSuperAdmin from './left-bar-menu-super-admin';
import { PLATFORM_ADMIN, COMPANY_ADMIN, BRANCH_ADMIN } from '../../../constants/ix-user-roles'
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        // overflow: 'hidden',
        backgroundColor: '#eeeeee',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        minHeight: 150,
        //...theme.mixins.toolbar,
    },
}));

export const IxDrawer = ({ open, closeEvent, selectedMenu }) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('user'));

    return <Drawer
        variant="permanent"
        classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
    >
        <div className={classes.toolbarIcon}>
            <IconButton onClick={closeEvent}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
        {
            user.role === PLATFORM_ADMIN ?
                <IxLeftBarMenuSuperAdmin selectedId={selectedMenu}></IxLeftBarMenuSuperAdmin> :
                <IxLeftBarMenu selectedId={selectedMenu}></IxLeftBarMenu>
        }
    </Drawer>
}