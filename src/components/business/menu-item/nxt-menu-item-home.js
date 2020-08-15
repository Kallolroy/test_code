import React, { useEffect, Suspense } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next'
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { useParams, Route } from 'react-router-dom';
import MenuItemForm from './../menu-item/form/nxt-menu-item-form';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import columns from './columns';
import { STORE, MENUS, KITCHEN } from '../../../constants/left-menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    backgroundColor:'#ffffff'
  },
  container: {
    padding: theme.spacing(5.25),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 640,
  },
  appBarSpacer: {
    minHeight: 116
  },
  pageTitleWrapper:{
    display: 'flex',
    alignItems: 'center',
  },
  pageTitle:{
    fontSize: '24px',
    fontWeight: 500,
    color: 'rgba(0,0,0,0.87)',
    marginTop:'5px',
    marginBottom:'5px',
  },
  tableWrapper:{
    paddingTop: '24px !important'
  }
}));

export default function NxtMenuItemHome({
  dispatch,
  match,
  company,
  handleMenuItemAdd,
  handleMenuItemUpdate,
  handleFetchCompanyById,
  handleFetchCompanyBranches,
  handleFetchMenuMenuItems,
  destroyMenuItemForm
}) {
  const classes = useStyles();
  const [MenuItemModalOpen, setMenuItemModalOpen] = React.useState(false);
  const [MenuItemData, setMenuItemData] = React.useState({});
  const [appContext, setAppContext] = React.useState(localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true });
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  // const IxAppBar = React.lazy(() => import('../../composite/app-bar/ix-app-bar'));
  const IxModal = React.lazy(() => import('../../composite/ix-modal')); // Lazy-loaded
  const IxTable = React.lazy(() => import('../../composite/table/ix-table')); // Lazy-loaded
  const { menuId } = useParams();
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const menuOptions = [
    {displayName: 'Edit'},
    {displayName: 'Delete'},
  ];

  const handleMenuItemModalOpen = () => {
    setMenuItemData({});
    setMenuItemModalOpen(true);
  }
  const handleMenuItemModalClose = () => {
    destroyMenuItemForm();
    setMenuItemModalOpen(false);
  }

  const handleMenuItemSubmit = async (values) => {
    values.companyId = user.company.id;
    values.branchId = appContext.id;
    values.id ? await handleMenuItemUpdate(values) : await handleMenuItemAdd(values)
    // appContext.isCompany ? await handleFetchCompanyMenuItems(user.company.id) : await handleFetchBranchMenuItems(appContext.id)
    handleMenuItemModalClose();
  }

  const handleMenuActionClick = (action, rowdata) => {
    setMenuItemData(rowdata);
    setMenuItemModalOpen(true);
  }

  const handleCompanyMenuChange = (appContext) => {
    setAppContext(appContext);
    // appContext.isCompany ? handleFetchCompanyMenuItems(user.company.id) : handleFetchBranchMenuItems(appContext.id)
  };

  useEffect(() => {
    handleFetchMenuMenuItems(menuId)
    if (!company.userCompany.data) {
      handleFetchCompanyById()
      handleFetchCompanyBranches();
    }
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxAppBar companydata={company}
          handleCompanyMenuChange={handleCompanyMenuChange}
          selectedMenu={MENUS}>
        </IxAppBar>
      </Suspense>
      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxModal modaltitle={t('MenuItemForm.title')} open={MenuItemModalOpen} handleClose={handleMenuItemModalClose}>
          {MenuItemModalOpen &&
            <MenuItemForm onSubmit={handleMenuItemSubmit} loading={company.isLoading} initialValues={MenuItemData} handleClose={handleMenuItemModalClose}></MenuItemForm>}
        </IxModal>
      </Suspense>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              {/* <Paper className={fixedHeightPaper}> */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Box className={classes.pageTitleWrapper}>
                      <Box width="50%">
                        <Typography className={classes.pageTitle} variant="h6" gutterBottom>
                          {t('NxtMenuItemHome.Title')}
                        </Typography></Box>
                      <Box width="50%" display="flex" justifyContent="flex-end">
                        <Button variant="contained" startIcon={<AddIcon />} color="secondary" onClick={handleMenuItemModalOpen}>
                          {t('NxtMenuItemHome.New_MenuItem')}
                        </Button>
                      </Box>
                    </Box>

                  </Grid>
                  <Grid className={classes.tableWrapper} item xs={12} md={12} lg={12}>
                    <Box>
                      <Suspense fallback={<div>{t('common.loading')}</div>}>
                        <IxTable
                          columns={columns}
                          showActionMenu={true}
                          menuOptions={menuOptions}
                          data={company.MenuItems.data}
                          handleActionClick={handleMenuActionClick}>
                        </IxTable>
                      </Suspense>
                    </Box>
                  </Grid>
                </Grid>
              {/* </Paper> */}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div >
  );
}