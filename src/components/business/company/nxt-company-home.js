import React, { useEffect, Suspense } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import NotificationForm from '../notifications/form/nxt-notification-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import CompanyForm from './form/nxt-company-form';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import columns from './columns';
import { IxDialogue } from '../../basic/ix-dialogue';
import { SUPER_ADMIN_COMPANIES } from '../../../constants/left-menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    // overflow: 'hidden',
    backgroundColor: '#ffffff',
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
    minHeight: 116,
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
    paddingTop: '24px !important',
  },
}));

export default function NxtCompanyHome({
  dispatch,
  company,
  handleCompanyAdd,
  handleCompanyUpdate,
  handleCompanyDelete,
  handleFetchCompanyById,
  handleFetchCompanies,
  handleNotificationAdd,
  destroyNotificationForm,
  destroyCompanyForm,
}) {
  const classes = useStyles();
  const [companyModalOpen, setCompanyModalOpen] = React.useState(false);
  const [companyData, setCompanyData] = React.useState({});
  const [notificationModalOpen, setNotificationModalOpen] = React.useState(
    false
  );
  const [openDeleteConfirmDialogue, setOpenDeleteConfirmDialogue] = React.useState(false);
  const [rowIdToBeDeleted, setRowIdToBeDeleted] = React.useState();

  const [notificationData, setNotificationData] = React.useState({});
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const IxModal = React.lazy(() => import('../../composite/ix-modal')); // Lazy-loaded
  const IxTable = React.lazy(() => import('../../composite/table/ix-table')); // Lazy-loaded
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const menuOptions = [
    { displayName: t('MenuActionLabel.Edit') },
    { displayName: t('MenuActionLabel.SendMessage') },
    { displayName: t('MenuActionLabel.MakeInactive') },
    { displayName: t('MenuActionLabel.Delete') },
  ];
  const handleCompanyModalOpen = () => {
    setCompanyData({ isActive: true });
    setCompanyModalOpen(true);
  };
  const handleCompanyModalClose = () => {
    destroyCompanyForm();
    setCompanyModalOpen(false);
  };

  const handleCompanySubmit = (values) => {
    let companySaveData = {
      user: {},
    };

    companySaveData.name = values.name;
    companySaveData.address = values.address;
    companySaveData.email = values.email;
    companySaveData.phone = values.phone;
    companySaveData.isActive = values.isActive;
    companySaveData.allowableBranches = Number(values.allowableBranches);
    companySaveData.allowableUsers = Number(values.allowableUsers);

    let userData = {
      userName: values.userName,
      email: values.userEmail,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    };
    companySaveData.user = userData;

    values.id && (companySaveData.id = values.id);
    values.userId && (userData.id = values.userId);

    let payload = new FormData();

    for (let key in companySaveData) {
      if (key !== 'imageFile' && typeof (companySaveData[key]) === 'object') {
        for (let subKey in companySaveData[key]) {
          payload.append(`${key}.${subKey}`, companySaveData[key][subKey]);
          // payload.append(`${key}[${subKey}].optSlotId`, menuSaveData[key][subKey].optSlotId);
          //payload.append(`${key}`, menuSaveData[key][subKey]);
        }
      }
      else {
        payload.append(key, companySaveData[key]);
      }
    }

    values.id
      ? handleCompanyUpdate(payload, values.id)
      : handleCompanyAdd(payload);
    // handleFetchCompanies()
    handleCompanyModalClose();
  };

  const handleNotificationModalOpen = (companyId) => {
    setNotificationData({
      companyId: companyId,
      sendTo: 'ALL_COMPANIES',
      sentDate: new Date(),
    });
    setNotificationModalOpen(true);
  };

  const handleCompanyActionClick = async (action, rowdata) => {
    let companyEditData = {};
    companyEditData.id = rowdata.id;
    companyEditData.name = rowdata.name;
    companyEditData.address = rowdata.address;
    companyEditData.email = rowdata.email;
    companyEditData.phone = rowdata.phone;
    companyEditData.isActive = rowdata.isActive;
    companyEditData.allowableBranches = Number(rowdata.allowableBranches);
    companyEditData.allowableUsers = Number(rowdata.allowableUsers);
    companyEditData.isActive = rowdata.isActive;

    if (rowdata.user) {
      companyEditData.userId = rowdata.user.id;
      companyEditData.userName = rowdata.user.userName;
      companyEditData.userEmail = rowdata.user.email;
      companyEditData.firstName = rowdata.user.firstName;
      companyEditData.lastName = rowdata.user.lastName;
      companyEditData.password = rowdata.user.password;
      companyEditData.confirmPassword = rowdata.user.password;
    }

    if (action === menuOptions[0].displayName) {
      setCompanyData(companyEditData);
      setCompanyModalOpen(true);
    } else if (action === menuOptions[1].displayName) {
      handleNotificationModalOpen(companyEditData.id);
    } else if (action === menuOptions[2].displayName) {

      let payload = new FormData()
      const statusData = {
        id: companyEditData.id,
        name: rowdata.name,
        email: rowdata.email,
        isActive: !rowdata.isActive,
      }

      Object.keys(statusData).forEach(key => payload.append(key, statusData[key]));

      await handleCompanyUpdate(payload, companyEditData.id);
      // await handleFetchCompanies()
      handleCompanyModalClose();
    } else if (action === menuOptions[3].displayName) {
      setRowIdToBeDeleted(companyEditData.id);
      setOpenDeleteConfirmDialogue(true);
    }
  };

  const handleCompanyMenuChange = (appContext) => {
    //to do
  };

  const handleNotificationModalClose = () => {
    destroyNotificationForm();
    setNotificationModalOpen(false);
  };

  const handleNotificationSubmit = async (values) => {
    await handleNotificationAdd(values);

    handleNotificationModalClose();
  };

  const handleDeleteConfirmed = async () => {
    await handleCompanyDelete(rowIdToBeDeleted);
    setOpenDeleteConfirmDialogue(false);
  };

  useEffect(() => {
    handleFetchCompanies();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IxAppBar
        companydata={company}
        selectedMenu={SUPER_ADMIN_COMPANIES}
        handleCompanyMenuChange={handleCompanyMenuChange}
      ></IxAppBar>

      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxModal
          modaltitle={t('CompanyForm.AddNew')}
          open={companyModalOpen}
          handleClose={handleCompanyModalClose}
        >
          {companyModalOpen && (
            <CompanyForm
              onSubmit={handleCompanySubmit}
              loading={company.isLoading}
              initialValues={companyData}
              handleClose={handleCompanyModalClose}
            ></CompanyForm>
          )}
        </IxModal>
      </Suspense>

      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxModal
          modaltitle={t('NotificationForm.AddNew')}
          open={notificationModalOpen}
          handleClose={handleNotificationModalClose}
        >
          {notificationModalOpen && (
            <NotificationForm
              onSubmit={handleNotificationSubmit}
              loading={company.isLoading}
              initialValues={notificationData}
              companies={company.companyList.data}
              handleClose={handleNotificationModalClose}
            ></NotificationForm>
          )}
        </IxModal>
      </Suspense>
      <IxDialogue
        open={openDeleteConfirmDialogue}
        handleOpen={() => setOpenDeleteConfirmDialogue(true)}
        handleClose={() => setOpenDeleteConfirmDialogue(false)}
        handleAgree={() => handleDeleteConfirmed()}
        handleDisagree={() => setOpenDeleteConfirmDialogue(false)}
        title={t('common.delete_confirmation')}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Box className={classes.pageTitleWrapper}>
                    <Box width="50%">
                      <Typography
                        className={classes.pageTitle}
                        variant="h6"
                        gutterBottom
                      >
                        {t('NxtCompanyHome.companies')}
                      </Typography>
                    </Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        color="secondary"
                        onClick={handleCompanyModalOpen}
                      >
                        {t('NxtCompanyHome.NEW_COMPANY')}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  className={classes.tableWrapper}
                  item
                  xs={12}
                  md={12}
                  lg={12}
                >
                  <Box>
                    <Suspense fallback={<div>{t('common.loading')}</div>}>
                      {company.companyList && company.companyList.data && (
                        <IxTable
                          columns={columns()}
                          showActionMenu={true}
                          menuOptions={menuOptions}
                          data={company.companyList.data}
                          handleActionClick={handleCompanyActionClick}
                        ></IxTable>
                      )}
                    </Suspense>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
