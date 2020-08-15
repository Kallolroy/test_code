import React, { useEffect, Suspense } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { useParams, Route } from 'react-router-dom';
import KitchenForm from './kitchen-form/nxt-kitchen-form';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import columns from './columns';
import { STORE, TABLE, KITCHEN } from '../../../constants/left-menu';
import { IxDialogue } from '../../basic/ix-dialogue';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
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

export default function NxtKitchenHome({
  dispatch,
  company,
  handleKitchenAdd,
  handleKitchenUpdate,
  handleKitchenDelete,
  handleFetchCompanyById,
  handleFetchCompanyBranches,
  handleFetchBranchKitchens,
  handleFetchCompanyKitchens,
  destroyKitchenForm,
}) {
  const classes = useStyles();
  const [appContext, setAppContext] = React.useState(
    localStorage.getItem('appContext')
      ? JSON.parse(localStorage.getItem('appContext'))
      : { isCompany: true }
  );
  const [kitchenModalOpen, setKitchenModalOpen] = React.useState(false);
  const [kitchenData, setKitchenData] = React.useState({});
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  // const IxAppBar = React.lazy(() => import('../../composite/app-bar/ix-app-bar'));
  const IxModal = React.lazy(() => import('../../composite/ix-modal')); // Lazy-loaded
  const IxTable = React.lazy(() => import('../../composite/table/ix-table')); // Lazy-loaded
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const menuOptions = [{ displayName: t('MenuActionLabel.Edit') }, { displayName: t('MenuActionLabel.Delete') }];
  const [
    openDeleteConfirmDialogue,
    setOpenDeleteConfirmDialogue,
  ] = React.useState(false);
  const [rowIdToBeDeleted, setRowIdToBeDeleted] = React.useState();

  const handleKitchenModalOpen = () => {
    appContext.isCompany
      ? setKitchenData({ branchId: company.branches.data[0].id })
      : setKitchenData({});
    setKitchenModalOpen(true);
  };
  const handleKitchenModalClose = () => {
    destroyKitchenForm();
    setKitchenModalOpen(false);
  };

  const handleKitchenSubmit = async (values) => {
    values.companyId = user.company.id;
    values.branchId = values.branchId ? Number(values.branchId) : appContext.id;
    // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    values.id
      ? await handleKitchenUpdate(values)
      : await handleKitchenAdd(values);
    // appContext.isCompany ? await handleFetchCompanyKitchens(user.company.id) : await handleFetchBranchKitchens(appContext.id)
    handleKitchenModalClose();
  };

  const handleDeleteConfirmed = async () => {
    await handleKitchenDelete(rowIdToBeDeleted);
    setOpenDeleteConfirmDialogue(false);
  };

  const handleMenuActionClick = async (action, rowdata) => {
    if (action === menuOptions[0].displayName) {
      setKitchenData(rowdata);
      setKitchenModalOpen(true);
    } else if (action === menuOptions[1].displayName) {
      setRowIdToBeDeleted(rowdata.id);
      setOpenDeleteConfirmDialogue(true);
      // appContext.isCompany ? await handleFetchCompanyKitchens(user.company.id) : await handleFetchBranchKitchens(appContext.id)
    }
  };

  const handleCompanyMenuChange = (appContext) => {
    setAppContext(appContext);
    appContext.isCompany
      ? handleFetchCompanyKitchens(user.company.id)
      : handleFetchBranchKitchens(appContext.id);
  };

  useEffect(() => {
    appContext.isCompany
      ? handleFetchCompanyKitchens(user.company.id)
      : handleFetchBranchKitchens(appContext.id);
    if (!company.userCompany.data) {
      handleFetchCompanyById();
      handleFetchCompanyBranches();
    }
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IxDialogue
        open={openDeleteConfirmDialogue}
        handleOpen={() => setOpenDeleteConfirmDialogue(true)}
        handleClose={() => setOpenDeleteConfirmDialogue(false)}
        handleAgree={() => handleDeleteConfirmed()}
        handleDisagree={() => setOpenDeleteConfirmDialogue(false)}
        title={t('common.delete_confirmation')}
      />
      <IxAppBar
        companydata={company}
        handleCompanyMenuChange={handleCompanyMenuChange}
        selectedMenu={KITCHEN}
      ></IxAppBar>
      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxModal
          modaltitle={t('KitchenForm.title')}
          open={kitchenModalOpen}
          handleClose={handleKitchenModalClose}
        >
          {kitchenModalOpen && (
            <KitchenForm
              onSubmit={handleKitchenSubmit}
              loading={company.isLoading}
              initialValues={kitchenData}
              branches={appContext.isCompany ? company.branches.data : null}
              handleClose={handleKitchenModalClose}
            ></KitchenForm>
          )}
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
                      <Typography
                        className={classes.pageTitle}
                        variant="h6"
                        gutterBottom
                      >
                        {t('NxtKitchenHome.title')}
                      </Typography>
                    </Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        color="secondary"
                        onClick={handleKitchenModalOpen}
                      >
                        {t('NxtKitchenHome.New_Kitchen')}
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
                      <IxTable
                        columns={columns(appContext.isCompany)}
                        showActionMenu={true}
                        menuOptions={menuOptions}
                        data={company.kitchens.data}
                        handleActionClick={handleMenuActionClick}
                      ></IxTable>
                    </Suspense>
                  </Box>
                </Grid>
              </Grid>
              {/* </Paper> */}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
