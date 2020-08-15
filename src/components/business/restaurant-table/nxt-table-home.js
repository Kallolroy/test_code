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
import TableForm from './table-form/nxt-table-form';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import columns from './columns';
import QrCodeForm from './table-form/qr-code-form';
import { IxDialogue } from '../../basic/ix-dialogue';

import { STORE, TABLE, KITCHEN } from '../../../constants/left-menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    // overflow: 'auto',
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

export default function NxtTableHome({
  dispatch,
  company,
  handleTableAdd,
  handleTableUpdate,
  handleTableDelete,
  handleFetchCompanyById,
  handleFetchCompanyBranches,
  handleFetchBranchTables,
  handleFetchCompanyTables,
  destroyTableForm
}) {
  const classes = useStyles();
  const [tableModalOpen, setTableModalOpen] = React.useState(false);
  const [tableData, setTableData] = React.useState({});
  const [appContext, setAppContext] = React.useState(localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true });
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [tableCode, setTableCode] = React.useState();
  const [rowIdToBeDeleted, setRowIdToBeDeleted] = React.useState();
  const [
    openDeleteConfirmDialogue,
    setOpenDeleteConfirmDialogue,
  ] = React.useState(false);
  const [QRModalOpen, setQRModalOpen] = React.useState(false);
  // const IxAppBar = React.lazy(() => import('../../composite/app-bar/ix-app-bar'));
  const IxModal = React.lazy(() => import('../../composite/ix-modal')); // Lazy-loaded
  const IxTable = React.lazy(() => import('../../composite/table/ix-table')); // Lazy-loaded
  // const { branchId } = useParams();
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const menuOptions = [
    { displayName: t('MenuActionLabel.Edit') },
    { displayName: t('MenuActionLabel.Delete') }
  ];

  const handleTableModalOpen = async () => {
    appContext.isCompany ? setTableData({ companyId: user.company.id, branchId: company.branches.data[0].id })
      : setTableData({ companyId: user.company.id, branchId: appContext.id })
    setTableModalOpen(true);
  }
  const handleTableModalClose = () => {
    destroyTableForm();
    setTableModalOpen(false);
  }

  const handleTableSubmit = async (values) => {
    values.companyId = user.company.id;
    values.branchId = values.branchId ? Number(values.branchId) : appContext.id
    values.noOfSeats = Number(values.noOfSeats)

    const payLoad = {
      name: values.name,
      company: { id: Number(values.companyId) },
      branch: { id: Number(values.branchId) },
      section: { id: Number(values.sectionId) },
      tableNo: values.tableNo,
      noOfSeats: values.noOfSeats,
    };

    values.id && (payLoad.id = values.id)
    values.tableCode && (payLoad.tableCode = values.tableCode)

    values.id ? await handleTableUpdate(payLoad) : await handleTableAdd(payLoad)
    appContext.isCompany ? await handleFetchCompanyTables(user.company.id) : await handleFetchBranchTables(appContext.id)
    handleTableModalClose();
  }

  const handleDeleteConfirmed = async () => {
    await handleTableDelete(rowIdToBeDeleted);
    setOpenDeleteConfirmDialogue(false);
  };

  const handleMenuActionClick = (action, rowdata) => {
    if (action === menuOptions[0].displayName) {
      //Edit
      setTableData(rowdata);
      setTableModalOpen(true);
    } else {
      //Delete
      setRowIdToBeDeleted(rowdata.id);
      setOpenDeleteConfirmDialogue(true);
      //await handleTableDelete(rowdata.id);
    }
  }
  const printQRCode = (rowData) => {
    setTableCode(rowData.tableCode)
    setQRModalOpen(true)
  }
  const handleCompanyMenuChange = (appContext) => {
    setAppContext(appContext);
    appContext.isCompany ? handleFetchCompanyTables(user.company.id) : handleFetchBranchTables(appContext.id)
  };

  const handleQRModalClose = () => {
    setQRModalOpen(false);
  };

  useEffect(() => {
    appContext.isCompany ? handleFetchCompanyTables(user.company.id) : handleFetchBranchTables(appContext.id)
    if (!company.userCompany.data) {
      handleFetchCompanyById()
      handleFetchCompanyBranches();
    }
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IxAppBar companydata={company}
        handleCompanyMenuChange={handleCompanyMenuChange}
        selectedMenu={TABLE}>
      </IxAppBar>
      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxModal modaltitle={tableData.id ? t('TableForm.EditTable') : t('TableForm.title')} open={tableModalOpen} handleClose={handleTableModalClose}>
          {tableModalOpen &&
            <TableForm onSubmit={handleTableSubmit}
              loading={company.isLoading}
              initialValues={tableData}
              branches={company.branches.data}
              handleClose={handleTableModalClose}>
            </TableForm>}
        </IxModal>
        <IxModal
          modaltitle={t('QRCodeForm.preview')}
          open={QRModalOpen}
          handleClose={handleQRModalClose}
        >
          <QrCodeForm
            tableCode={tableCode}
            handleQRModalClose={handleQRModalClose}
          >

          </QrCodeForm>
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
              {/* <Paper className={fixedHeightPaper}> */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Box className={classes.pageTitleWrapper}>
                    <Box width="50%">
                      <Typography className={classes.pageTitle} variant="h6" gutterBottom>
                        {t('NxtTableHome.Title')}
                      </Typography></Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      <Button variant="contained" startIcon={<AddIcon />} color="secondary" onClick={handleTableModalOpen}>
                        {t('NxtTableHome.New_Table')}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid className={classes.tableWrapper} item xs={12} md={12} lg={12}>
                  <Box>
                    <Suspense fallback={<div>{t('common.loading')}</div>}>
                      {company.tables &&
                        <IxTable
                          columns={columns(printQRCode)}
                          showActionMenu={true}
                          menuOptions={menuOptions}
                          data={company.tables.data}
                          handleActionClick={handleMenuActionClick}>
                        </IxTable>
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
    </div >
  );
}