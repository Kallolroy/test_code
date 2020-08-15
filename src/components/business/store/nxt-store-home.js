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
// import IxModal from './../../composite/ix-modal';
import BranchForm from './branch/nxt-branch';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import columns from './columns';
import { STORE } from './../../../constants/left-menu';
import { IxDialogue } from '../../basic/ix-dialogue';

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

export default function NxtStoreHome({
  dispatch,
  company,
  handleBranchAdd,
  handleBranchUpdate,
  handleBranchDelete,
  handleFetchCompanyById,
  handleFetchCompanyBranches,
  destroyBranchForm,
}) {
  const classes = useStyles();
  const [branchModalOpen, setBranchModalOpen] = React.useState(false);
  const [branchData, setBranchData] = React.useState({});
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  // const IxAppBar = React.lazy(() => import('../../composite/app-bar/ix-app-bar'));
  const IxModal = React.lazy(() => import('./../../composite/ix-modal')); // Lazy-loaded
  const IxTable = React.lazy(() => import('../../composite/table/ix-table')); // Lazy-loaded
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const menuOptions = [{ displayName: t('MenuActionLabel.Edit') }, { displayName: t('MenuActionLabel.Delete') }];
  const handleBranchModalOpen = () => {
    setBranchData({});
    setBranchModalOpen(true);
  };
  const handleBranchModalClose = () => {
    destroyBranchForm();
    setBranchModalOpen(false);
  };
  const [rowIdToBeDeleted, setRowIdToBeDeleted] = React.useState();
  const [
    openDeleteConfirmDialogue,
    setOpenDeleteConfirmDialogue,
  ] = React.useState(false);

  const handleBranchSubmit = async (values) => {
    values.companyId = user.company.id;
    values.id
      ? await handleBranchUpdate(values)
      : await handleBranchAdd(values);
    await handleFetchCompanyBranches();
    handleBranchModalClose();
  };

  const handleDeleteConfirmed = async () => {
    await handleBranchDelete(rowIdToBeDeleted);
    setOpenDeleteConfirmDialogue(false);
  };

  const handleMenuActionClick = async (action, rowdata) => {
    if (action === menuOptions[0].displayName) {
      setBranchData(rowdata);
      setBranchModalOpen(true);
    } else if (action === menuOptions[1].displayName) {
      //await handleBranchDelete(rowdata.id);
      // await handleFetchCompanyBranches()
      setRowIdToBeDeleted(rowdata.id);
      setOpenDeleteConfirmDialogue(true);
    }
  };

  const handleCompanyMenuChange = (appContext) => {
    //to do
  };

  useEffect(() => {
    if (!company.userCompany.data) {
      handleFetchCompanyById();
      handleFetchCompanyBranches();
    }
  }, []);

  return (
    <div className={classes.root}>
      <IxDialogue
        open={openDeleteConfirmDialogue}
        handleOpen={() => setOpenDeleteConfirmDialogue(true)}
        handleClose={() => setOpenDeleteConfirmDialogue(false)}
        handleAgree={() => handleDeleteConfirmed()}
        handleDisagree={() => setOpenDeleteConfirmDialogue(false)}
        title={t('common.delete_confirmation')}
      />

      <CssBaseline />
      <IxAppBar
        companydata={company}
        selectedMenu={STORE}
        handleCompanyMenuChange={handleCompanyMenuChange}
      ></IxAppBar>

      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxModal
          modaltitle={branchData.id ? t('BranchForm.EditTitle') : t('BranchForm.title')}
          open={branchModalOpen}
          handleClose={handleBranchModalClose}
        >
          {branchModalOpen && (
            <BranchForm
              onSubmit={handleBranchSubmit}
              loading={company.isLoading}
              initialValues={branchData}
              handleClose={handleBranchModalClose}
            ></BranchForm>
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
                        {t('NxtStoreHome.Stores')}
                      </Typography>
                    </Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        color="secondary"
                        onClick={handleBranchModalOpen}
                      >
                        {t('NxtStoreHome.NEW_STORE')}
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
                      {company.branches && company.branches.data &&
                        <IxTable
                          columns={columns()}
                          showActionMenu={true}
                          menuOptions={menuOptions}
                          data={company.branches.data}
                          handleActionClick={handleMenuActionClick}
                        ></IxTable>
                      }
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
