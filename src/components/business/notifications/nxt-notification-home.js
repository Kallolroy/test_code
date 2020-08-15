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
// import IxModal from './../../composite/ix-modal';
import NotificationForm from './form/nxt-notification-form';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import columns from './columns';
import { SUPER_ADMIN_NOTIFICATIONS } from '../../../constants/left-menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    // overflow: 'hidden',
    backgroundColor: '#ffffff'
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
  pageTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: 'rgba(0,0,0,0.87)',
    marginTop: '5px',
    marginBottom: '5px',
  },
  tableWrapper: {
    paddingTop: '24px !important'
  }
}));

export default function NxtNotificationHome({
  dispatch,
  company,
  handleNotificationUpdate,
  handleNotificationAdd,
  handleNotificationDelete,
  handleFetchNotifications,
  destroyNotificationForm,

}) {
  const classes = useStyles();
  const [notificationModalOpen, setNotificationModalOpen] = React.useState(false);
  const [notificationData, setNotificationData] = React.useState({});
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const IxModal = React.lazy(() => import('../../composite/ix-modal')); // Lazy-loaded
  const IxTable = React.lazy(() => import('../../composite/table/ix-table')); // Lazy-loaded
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const menuOptions = [
    { displayName: t('MenuActionLabel.ReSend') },
    { displayName: t('MenuActionLabel.Delete') }
  ];
  const handleNotificationModalOpen = () => {
    setNotificationData(
      {
        sendTo: "ALL_COMPANIES",
        companyId: null,
        sentDate: new Date()
      }
    );
    setNotificationModalOpen(true);
  }
  const handleNotificationModalClose = () => {
    destroyNotificationForm();
    setNotificationModalOpen(false);
  }

  const handleNotificationSubmit = async (values) => {
    values.id ? await handleNotificationUpdate(values) : await handleNotificationAdd(values)
    await handleFetchNotifications()
    handleNotificationModalClose();
  }

  const handleMenuActionClick = async (action, rowdata) => {

    if (action === menuOptions[0].displayName) {
      setNotificationData(rowdata);
      setNotificationModalOpen(true);
    }
    else if (action === menuOptions[1].displayName) {
      // await handleNotificationUpdate({ "id": rowdata.id, "isDeleted": true });
      handleNotificationDelete(rowdata.id)
      // await handleFetchNotifications()
    }
  }

  const handleNotificationMenuChange = (appContext) => {
    //to do
  };

  useEffect(() => {
    handleFetchNotifications()
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IxAppBar notificationdata={company}
        selectedMenu={SUPER_ADMIN_NOTIFICATIONS}
        handleNotificationMenuChange={handleNotificationMenuChange}>
      </IxAppBar>

      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxModal modaltitle={t('NotificationForm.AddNew')} open={notificationModalOpen} handleClose={handleNotificationModalClose}>
          {notificationModalOpen &&
            <NotificationForm onSubmit={handleNotificationSubmit} loading={company.isLoading} initialValues={notificationData} handleClose={handleNotificationModalClose}></NotificationForm>}
        </IxModal>
      </Suspense>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Box className={classes.pageTitleWrapper}>
                    <Box width="50%">
                      <Typography className={classes.pageTitle} variant="h6" gutterBottom>
                        {t('IxLeftBarMenu.notifications')}
                      </Typography></Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      <Button variant="contained" startIcon={<AddIcon />} color="secondary" onClick={handleNotificationModalOpen}>
                        {t('NxtNotificationHome.NEW_NOTIFICATION')}
                      </Button>
                    </Box>
                  </Box>

                </Grid>
                <Grid className={classes.tableWrapper} item xs={12} md={12} lg={12}>
                  <Box>
                    <Suspense fallback={<div>{t('common.loading')}</div>}>
                      {company.notifications &&
                        < IxTable
                          columns={columns()}
                          showActionMenu={true}
                          menuOptions={menuOptions}
                          data={company.notifications.data}
                          handleActionClick={handleMenuActionClick}>
                        </IxTable>
                      }
                    </Suspense>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div >
  );
}