import React, { useEffect, Suspense } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import mainLogo from './../../../assets/images/next-admin-logo.png';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import LangauageMenu from './language-menu';
import { ProfileMenu } from './profile-menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { IxDrawer } from './ix-drawer';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import { PROFILE, MY_ACCOUNT, LOGOUT } from './../../../constants/profile-menu-type';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import IxModal from './../../composite/ix-modal';
import CompanyForm from './company/nxt-company';
import BranchForm from './../../business/store/branch/nxt-branch';
import CompanyMenu from './company-menu';
import BranchMenu from './branch-menu';
import { useDispatch, useSelector } from 'react-redux'
import { editCompany, fetchCompanyById, fetchCompanyBranches } from '../../../actions/company/company-actions';
import { addBranch, editBranch, deleteBranch } from '../../../actions/company/branch-actions';
import { PLATFORM_ADMIN, COMPANY_ADMIN, BRANCH_ADMIN } from '../../../constants/ix-user-roles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    minHeight: 64
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {

  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    fontSize: '14px',
    marginLeft: '5px',
    color: 'rgba(255, 255, 255, 1)'
  },
  button: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px'
  },
  avatar: {
    margin: theme.spacing(1),
    width: '100px',
    height: 'auto'
  }
}));

export default function IxAppBar({
  companydata,
  selectedMenu,
  handleCompanyMenuChange
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [companyModalOpen, setCompanyModalOpen] = React.useState(false);
  const [branchModalOpen, setBranchModalOpen] = React.useState(false);
  const user = JSON.parse(localStorage.getItem('user') && localStorage.getItem('user'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [appContext, setAppContext] = React.useState(
    localStorage.getItem('appContext')
      ? JSON.parse(localStorage.getItem('appContext'))
      : { isCompany: true }
  );

  const handleDrawerOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = (event) => {
    setAnchorEl(null);
    if (event.target.value === LOGOUT) {
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  const handleCompanyModalOpen = () => {
    setCompanyModalOpen(true);
  }
  const handleCompanyModalClose = () => {
    setCompanyModalOpen(false);
  }

  const handleBranchModalOpen = () => {
    setAppContext(
      localStorage.getItem('appContext')
        ? JSON.parse(localStorage.getItem('appContext'))
        : { isCompany: true }
    )
    setBranchModalOpen(true);
  }
  const handleBranchModalClose = () => {
    setBranchModalOpen(false);
  };

  const handleCompanySubmit = (values) => {
    // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    values.allowableBranches = Number(values.allowableBranches)
    values.allowableUsers = Number(values.allowableUsers)
    
    values.companyLogo && delete values.companyLogo
    delete values.user
    
    !values.seqNo && (delete values.seqNo)
    !values.imageFile && (delete values.imageFile)
    !values.originalFilename && (delete values.originalFilename)

    let payload = new FormData()
    Object.keys(values).forEach(key => payload.append(key, values[key]));

    dispatch(editCompany(payload, values.id));
    handleCompanyModalClose();
  }

  const handleBranchSubmit = async (values) => {
    values.companyId = user.company.id;
    dispatch(editBranch(values));
    handleBranchModalClose();
  };


  const menuId = 'profile-menu';

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IxModal modaltitle={t('CompanyForm.title')}
        open={companyModalOpen}
        handleClose={handleCompanyModalClose}>
        <CompanyForm onSubmit={handleCompanySubmit}
          handleClose={handleCompanyModalClose}>
        </CompanyForm>
      </IxModal>
      <IxModal
        modaltitle={t('BranchForm.title')}
        open={branchModalOpen}
        handleClose={handleBranchModalClose}
      >
        {branchModalOpen && (
          <BranchForm
            onSubmit={handleBranchSubmit}
            handleClose={handleBranchModalClose}
            initialValues={companydata.branches.data.find((b) => b.id === appContext.id)}
          ></BranchForm>
        )}
      </IxModal>
      <AppBar position="absolute" className={classes.appBar}>
        {/* Header toolbar */}
        <Toolbar className={classes.toolbar}>
          <Avatar variant="square" className={classes.avatar} src={mainLogo}>
          </Avatar>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {/* {"env var : " + process.env.REACT_APP_BASE_URL} */}
          </Typography>
          {/* lang */}
          <LangauageMenu></LangauageMenu>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon style={{ 'color': 'rgba(255,255,255,0.7)', 'font-size': '24px' }} />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            style={{ 'color': 'rgba(255,255,255,0.54)', 'font-size': '24px' }}
          >
            <AccountCircle />
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {user && user.userName}
            </Typography>
          </IconButton>
        </Toolbar>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {user.role === PLATFORM_ADMIN &&
              <Box style={
                {
                  "color": "#f18e00",
                  'font-size': '20px',
                  'padding': 0
                }
              }>
                {t('common.super_admin')}
              </Box>
            }
            {
              user.role === COMPANY_ADMIN &&
              companydata && companydata.userCompany.data && companydata.branches.data &&
              <CompanyMenu company={companydata.userCompany.data}
                branches={companydata.branches.data}
                handleCompanyMenuChange={handleCompanyMenuChange}>
              </CompanyMenu>
            }
            {
              user.role === BRANCH_ADMIN &&
              companydata && companydata.userCompany.data && companydata.branches.data &&
              <BranchMenu company={companydata.userCompany.data}
                branches={companydata.branches.data}
                handleCompanyMenuChange={handleCompanyMenuChange}>
              </BranchMenu>
            }

          </Typography>
          {
            user.role === COMPANY_ADMIN &&
            <Button className={classes.button} startIcon={<EditIcon />} onClick={handleCompanyModalOpen}>
              {t('IxAppBar.EditCompany')}
            </Button>
          }
          {
            user.role === BRANCH_ADMIN &&
            <Button className={classes.button} startIcon={<EditIcon />} onClick={handleBranchModalOpen}>
              {t('IxAppBar.EditBranch')}
            </Button>
          }
        </Toolbar>
      </AppBar>
      <IxDrawer open={open} closeEvent={handleDrawerClose} selectedMenu={selectedMenu}></IxDrawer>
      <ProfileMenu isMenuOpen={isMenuOpen} anchorEl={anchorEl} menuId={menuId} menuCloseEvent={handleProfileMenuClose}></ProfileMenu>

    </div >
  );
}
