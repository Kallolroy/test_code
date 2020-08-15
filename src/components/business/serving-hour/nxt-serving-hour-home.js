import React, { Suspense, useEffect } from 'react';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import { CssBaseline, makeStyles, Container, Grid, Box, Typography, Button } from '@material-ui/core';

import { SERVING_HOURS } from '../../../constants/left-menu';
import { useTranslation } from 'react-i18next';
import AddIcon from '@material-ui/icons/Add';
import columns from './columns';
import ServingHoursForm from './serving-hours-form/nxt-serving-hour-form';
import { IxDialogue } from '../../basic/ix-dialogue';
import { PLATFORM_ADMIN, COMPANY_ADMIN, BRANCH_ADMIN } from '../../../constants/ix-user-roles'


const IxModal = React.lazy(() => import('../../composite/ix-modal')); // Lazy-loaded
const IxTable = React.lazy(() => import('../../composite/table/ix-table')); // Lazy-loaded

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    backgroundColor: '#ffffff'
  },
  container: {
    padding: theme.spacing(5.25),
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



const NxtServingHour = ({ company,
  handleFetchCompanyServingHours,
  handleFetchBranchServingHours,
  handleServingHourAdd, handleServingHourUpdate,
  handleDeleteServingHour, destroyServingHoursForm,
  handleFetchCompanyById, handleFetchCompanyBranches }) => {
  const [user] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [appContext, setAppContext] = React.useState(localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true });
  const [isModalEdit, setIsModalEdit] = React.useState(false);
  const [hasEditAccess, setHasEditAccess] = React.useState(true);
  const [servingHoursModalOpen, setServingHoursModalOpen] = React.useState(false);
  const [servingHoursFormData, setServingHoursFormData] = React.useState({});
  const [openDeleteConfirmDialogue, setOpenDeleteConfirmDialogue] = React.useState(false);
  const [rowIdToBeDeleted, setRowIdToBeDeleted] = React.useState();
  const classes = useStyles();
  const { t } = useTranslation();
  const ServingHours = company.ServingHours.data;
  const menuOptions = [
    // {displayName: i18n.t('Edit')},
    { displayName: t('MenuActionLabel.Edit')},
    { displayName: t('MenuActionLabel.Delete')}
  ];
  const loadServingHours = async () => {
    /*let response = null
    if (user.role === BRANCH_ADMIN) {
      response = await handleFetchBranchServingHours(user.company.id, appContext.id)
      !response && await handleFetchCompanyServingHours(user.company.id)
      response ? setHasEditAccess(true) : setHasEditAccess(false)
    } else {
      appContext.isCompany ? handleFetchCompanyServingHours(user.company.id)
        : handleFetchBranchServingHours(user.company.id, appContext.id)
    }*/

    appContext.isCompany ? handleFetchCompanyServingHours(user.company.id)
      : handleFetchBranchServingHours(user.company.id, appContext.id)
  }

  useEffect(() => {
    loadServingHours()

    if (!company.userCompany.data) {
      handleFetchCompanyById()
      handleFetchCompanyBranches();
    }
  }, []);

  const handleOrderUpClick = (rowdata) => {
    // alert(rowdata.id)
  }
  const handleOrderDownClick = (rowdata) => {
    // alert(rowdata.id)
  }


  const handleServingHoursFormModalOpen = () => {
    setServingHoursModalOpen(true);
  }

  const handleServingHoursFormModalClose = () => {
    setServingHoursFormData({});
    destroyServingHoursForm();
    setServingHoursModalOpen(false);
  }

  const handleCreateServingHours = () => {
    setIsModalEdit(false);
    handleServingHoursFormModalOpen();
  }

  const handleDeleteConfirmed = async () => {
    await handleDeleteServingHour(rowIdToBeDeleted);
    //handleFetchCompanyServingHours(user.company.id);
    handleCloseDeleteDialogue();
  }

  const handleCloseDeleteDialogue = () => {
    setOpenDeleteConfirmDialogue(false);
    setRowIdToBeDeleted(null);
  }

  const handleServingHoursFormSubmit = async (values) => {
    const { id } = values;
    values.startTime = `${new Date().getFullYear()}-${new Date().getMonth() < 10 ? `0${new Date().getMonth()}` : `${new Date().getMonth()}`}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : `${new Date().getDate()}`}T${values.startTime < 10 ? `0${values.startTime}` : `${values.startTime}`}+06:00`
    values.endTime = `${new Date().getFullYear()}-${new Date().getMonth() < 10 ? `0${new Date().getMonth()}` : `${new Date().getMonth()}`}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : `${new Date().getDate()}`}T${values.endTime < 10 ? `0${values.endTime}` : `${values.endTime}`}+06:00`

    if (id) {
      await handleServingHourUpdate(values)
    } else {
      values.companyId = user.company.id;
      values.branchId = !appContext.isCompany ? appContext.id : null;
      await handleServingHourAdd(values);
    }
    handleServingHoursFormModalClose();
    //handleFetchCompanyServingHours(user.company.id);
  }

  const handleMenuActionClick = async (action, rowdata) => {
    if (action === menuOptions[0].displayName) { // edit
      rowdata.startTime && (rowdata.startTime = rowdata.startTime.split('T')[1].substring(0, 5))
      rowdata.endTime && (rowdata.endTime = rowdata.endTime.split('T')[1].substring(0, 5))
      setIsModalEdit(true);
      setServingHoursFormData(rowdata);
      handleServingHoursFormModalOpen();

    } else if (action === menuOptions[1].displayName) { // delete
      setRowIdToBeDeleted(rowdata.id);
      setOpenDeleteConfirmDialogue(true)
    }
  }

  const handleCompanyMenuChange = (appContext) => {
    setAppContext(appContext)
    appContext.isCompany ? handleFetchCompanyServingHours(user.company.id)
      : handleFetchBranchServingHours(user.company.id, appContext.id)
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxAppBar companydata={company}
          handleCompanyMenuChange={handleCompanyMenuChange}
          selectedMenu={SERVING_HOURS}
        >
        </IxAppBar>
      </Suspense>

      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxModal modaltitle={isModalEdit ? t('NxtServingHourForm.Title_Edit') : t('NxtServingHourForm.Title')} open={servingHoursModalOpen} handleClose={handleServingHoursFormModalClose}>
          {servingHoursModalOpen &&
            <ServingHoursForm onSubmit={handleServingHoursFormSubmit}
              loading={company.isLoading}
              initialValues={servingHoursFormData}
              handleClose={handleServingHoursFormModalClose}>
            </ServingHoursForm>}
        </IxModal>
      </Suspense>

      <IxDialogue
        open={openDeleteConfirmDialogue}
        handleOpen={() => setOpenDeleteConfirmDialogue(true)}
        handleClose={() => handleCloseDeleteDialogue()}
        handleAgree={() => handleDeleteConfirmed()}
        handleDisagree={() => handleCloseDeleteDialogue()}
        title={t('common.delete_confirmation')}
      />

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
                        {t('IxLeftBarMenu.ServingHours')}
                      </Typography></Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      <Button variant="contained" startIcon={<AddIcon />} color="secondary"
                        onClick={handleCreateServingHours}
                      // disabled={!appContext.isCompany}
                      >
                        {t('NxtServingHour.Add_New_Btn_Label')}
                      </Button>
                    </Box>
                  </Box>
                </Grid>

                <Grid className={classes.tableWrapper} item xs={12} md={12} lg={12}>
                  <Box>
                    <Suspense fallback={<div>{t('common.loading')}</div>}>
                      <IxTable
                        columns={columns(handleOrderUpClick, handleOrderDownClick)}
                        data={ServingHours}
                        showActionMenu={hasEditAccess}
                        menuOptions={menuOptions}
                        pageName={"serving-hours"}
                        handleActionClick={handleMenuActionClick}
                      >
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
};

export default NxtServingHour;
