import React, { Suspense, useEffect } from 'react';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import {
  CssBaseline,
  makeStyles,
  Container,
  Grid,
  Box,
  Typography,
  Button,
} from '@material-ui/core';

import { STAFFS } from '../../../constants/left-menu';
import { useTranslation } from 'react-i18next';
import AddIcon from '@material-ui/icons/Add';
import columns from './columns';
import IxModal from '../../composite/ix-modal';
import { IxDialogue } from '../../basic/ix-dialogue';
import StaffChangePasswordForm from './staffs-form/staff-change-password-form'
import { PLATFORM_ADMIN, COMPANY_ADMIN, BRANCH_ADMIN } from '../../../constants/ix-user-roles'

const StaffForm = React.lazy(() => import('./staffs-form/staff-form'));
// const IxModal = React.lazy(() => import('../../composite/ix-modal')); // Lazy-loaded
const IxTable = React.lazy(() => import('../../composite/table/ix-table')); // Lazy-loaded

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

const NxtStaffs = ({
  company,
  staff,
  handleFetchCompanyStaffs,
  handleFetchBranchStaffs,
  handleFetchKitchenStaffs,
  handleFetchCompanyKitchens,
  handleStaffAdd,
  handleFetchCompanyById,
  handleStaffUpdate,
  handleDeleteStaff,
  handleFetchRoles,
  handleFetchCompanyBranches,
  handleSetFormInitialValues,
  destroyStaffsForm,
}) => {
  const [appContext, setAppContext] = React.useState(
    localStorage.getItem('appContext')
      ? JSON.parse(localStorage.getItem('appContext'))
      : { isCompany: true }
  );
  const loggedInUser = JSON.parse(localStorage.getItem('user'))

  const [isModalEdit, setIsModalEdit] = React.useState(false);
  const [staffsModalOpen, setStaffsModalOpen] = React.useState(false);
  const [staffsChangePasswordModalOpen, setStaffsChangePasswordModalOpen] = React.useState(false);
  const [
    openDeleteConfirmDialogue,
    setOpenDeleteConfirmDialogue,
  ] = React.useState(false);
  const [rowIdToBeDeleted, setRowIdToBeDeleted] = React.useState();

  const classes = useStyles();
  const { t } = useTranslation();
  const branches = company.branches.data;
  const kitchens = company.kitchens.data;

  const staffs = staff.staffs.data;

  const roles = staff.roles.data
  const menuOptions = [
    // {displayName: i18n.t('Edit')},
    { displayName: t('MenuActionLabel.Edit') },
    {
      displayName: t('MenuActionLabel.MakeInactive'),
      displayLogic: { property: 'user', subProperty: 'isActive', value: true },
    },
    {
      displayName: t('MenuActionLabel.MakeActive'),
      displayLogic: { property: 'user', subProperty: 'isActive', value: false },
    },
    { displayName: t('MenuActionLabel.Delete') },
    {
      displayName: t('MenuActionLabel.ChangePassword')
    },
  ];

  useEffect(() => {
    if (!staffs || !staffs.length) {
      appContext.isCompany
        ? handleFetchCompanyStaffs(loggedInUser.company.id)
        : handleFetchBranchStaffs(appContext.id, loggedInUser.company.id);
    }
    if (!roles || !roles.length) {
      handleFetchRoles();
    }

    if (!company.userCompany.data) {
      handleFetchCompanyById();
      handleFetchCompanyBranches();

    }
    handleFetchCompanyKitchens(loggedInUser.company.id)

  }, []);

  const handleAppContextChange = (newAppContext) => {
    newAppContext.isCompany
      ? handleFetchCompanyStaffs(loggedInUser.company.id)
      : handleFetchBranchStaffs(loggedInUser.company.id, newAppContext.id);
    setAppContext(newAppContext);
  };

  const handleOrderUpClick = (rowdata) => {
    // alert(rowdata.id)
  };
  const handleOrderDownClick = (rowdata) => {
    // alert(rowdata.id)
  };

  const handleStaffsFormModalOpen = () => {
    setStaffsModalOpen(true);
  };

  const handleStaffsChangePasswordModalOpen = () => {
    setStaffsChangePasswordModalOpen(true);
  };

  const handleStaffsChangePasswordModalClose = () => {
    setStaffsChangePasswordModalOpen(false);
  };

  const handleStaffsFormModalClose = () => {
    handleSetFormInitialValues(null);
    destroyStaffsForm();
    setStaffsModalOpen(false);
  };

  const handleCreateStaffs = () => {
    setIsModalEdit(false);
    handleSetFormInitialValues({
      isActive: true,
      roles: [],
      branch: null,
      companyId: loggedInUser.company.id,
      companyName: loggedInUser.companyName,
    });
    handleStaffsFormModalOpen();
  };

  const handleDeleteConfirmed = async () => {
    await handleDeleteStaff(rowIdToBeDeleted);
    appContext.isCompany
      ? handleFetchCompanyStaffs(loggedInUser.company.id)
      : handleFetchBranchStaffs(loggedInUser.branchId);
    handleCloseDeleteDialogue();
  };

  const handleCloseDeleteDialogue = () => {
    setOpenDeleteConfirmDialogue(false);
    setRowIdToBeDeleted(null);
  };

  const handleStaffsFormSubmit = async (values) => {
    const {
      id,
      userName,
      userId,
      password,
      firstName,
      lastName,
      address,
      email,
      phone,
      isActive,
      companyId,
      companyName,
      dob,
      fcmToken,
      roles,
      branch,
      kitchenId,
      kitchen,
    } = values;

    let payload;

    payload = {
      id: id ? id : 0,
      user: {
        id: userId ? userId : 0,
        password,
        userName,
        firstName,
        lastName,
        address,
        email,
        phone,
        isActive: isActive,
        company: {
          id: id ? companyId : loggedInUser.company.id,
          name: id ? companyName : loggedInUser.companyName,
        },
        roles,
      },
      address,
      dob,
      fcmToken: fcmToken ? fcmToken : '',
      branchId: branch ? branch.id : null,
      // branch:{id: branch ? branch.id : null,},
      // section:{id:sectionId},
      kitchenId: kitchenId ? Number(kitchenId) : null,
      isActive: isActive
      // kitchen:{id: kitchen ? kitchen.id : null}
    };

    if (id) {
      await handleStaffUpdate(payload);
    } else {
      await handleStaffAdd(payload);
    }
    handleStaffsFormModalClose();
    appContext.isCompany
      ? handleFetchCompanyStaffs(loggedInUser.company.id)
      : handleFetchBranchStaffs(loggedInUser.branchId);
  };

  const handleStaffsChangePasswordFormSubmit = async (values) => {

  };

  const handleMenuActionClick = async (action, rowdata) => {
    if (action === menuOptions[0].displayName) {
      // edit
      setIsModalEdit(true);
      const { id, dob, fcmToken, branch, kitchen, address, sectionId } = rowdata;
      let {
        id: userId,
        userName,
        password,
        firstName,
        lastName,
        // address,
        email,
        phone,
        isActive,
        roles,
      } = rowdata.user;
      const { id: companyId, name: companyName } = rowdata.user.company;
      //const branch = branches.find((branch) => +branch.id === +branchId);
      //let kitchen;
      // if (branch && kitchenId) {
      //   kitchen = kitchens.find((kitchen) => +kitchen.id === +kitchenId);
      // }
      let kitchenId = kitchen ? kitchen.id : null
      isActive = isActive ? true : false
      handleSetFormInitialValues({
        id,
        userName,
        userId,
        password,
        confirmPassword: password,
        firstName,
        lastName,
        address,
        email,
        phone,
        isActive,
        companyId,
        companyName,
        roles,
        dob,
        fcmToken,
        branch,
        sectionId,
        kitchen,
        kitchenId
      });
      handleStaffsFormModalOpen();
    } else if (action === menuOptions[1].displayName) {
      // make inactive
      let { user } = rowdata;
      user = { ...user, isActive: false };
      const payload = { ...rowdata, user };
      await handleStaffUpdate(payload);
      handleStaffsFormModalClose();
      appContext.isCompany
        ? handleFetchCompanyStaffs(loggedInUser.company.id)
        : handleFetchBranchStaffs(loggedInUser.branchId);
    } else if (action === menuOptions[2].displayName) {
      // make active
      let { user } = rowdata;
      user = { ...user, isActive: true };
      const payload = { ...rowdata, user };
      await handleStaffUpdate(payload);
      handleStaffsFormModalClose();
      appContext.isCompany
        ? handleFetchCompanyStaffs(loggedInUser.company.id)
        : handleFetchBranchStaffs(loggedInUser.branchId);
    } else if (action === menuOptions[3].displayName) {
      // delete
      setRowIdToBeDeleted(rowdata.id);
      setOpenDeleteConfirmDialogue(true);
    }
    else if (action === menuOptions[4].displayName) {
      // change password

      handleStaffsChangePasswordModalOpen();
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxAppBar
          companydata={company}
          handleCompanyMenuChange={handleAppContextChange}
          selectedMenu={STAFFS}
        ></IxAppBar>
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
                      <Typography
                        className={classes.pageTitle}
                        variant="h6"
                        gutterBottom
                      >
                        {t('NxtStaffs.PageTitle')}
                      </Typography>
                    </Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      < Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        color="secondary"
                        onClick={handleCreateStaffs}
                        disabled={!appContext.isCompany}
                      >
                        {t('NxtStaffs.Add_New_Btn_Label')}
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
                        columns={columns(
                          handleOrderUpClick,
                          handleOrderDownClick
                        )}
                        data={staffs}
                        showActionMenu={true}
                        menuOptions={menuOptions}
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

      <IxModal
        modaltitle={
          isModalEdit ? t('NxtStaffForm.Title_Edit') : t('NxtStaffForm.Title')
        }
        open={staffsModalOpen}
        handleClose={handleStaffsFormModalClose}
      >
        <Suspense fallback={<div>{t('common.loading')}</div>}>
          {
            (
              <StaffForm
                onSubmit={handleStaffsFormSubmit}
                roleList={roles}
                branchList={branches}
                // kitchenData={company.kitchens.data}
                loading={company.isLoading}
                handleClose={handleStaffsFormModalClose}
              ></StaffForm>
            )}
        </Suspense>
      </IxModal>

      <IxModal style={{ "width": "30%" }}
        modaltitle={"Change password"}
        open={staffsChangePasswordModalOpen}
        handleClose={handleStaffsChangePasswordModalClose}
      >
        <Suspense fallback={<div>{t('common.loading')}</div>}>
          {
            <StaffChangePasswordForm
              onSubmit={handleStaffsChangePasswordFormSubmit}
              handleClose={handleStaffsChangePasswordModalClose}
            ></StaffChangePasswordForm>
          }
        </Suspense>
      </IxModal>



      <IxDialogue
        open={openDeleteConfirmDialogue}
        handleOpen={() => setOpenDeleteConfirmDialogue(true)}
        handleClose={() => handleCloseDeleteDialogue()}
        handleAgree={() => handleDeleteConfirmed()}
        handleDisagree={() => handleCloseDeleteDialogue()}
        title={t('common.delete_confirmation')}
      />
    </div >
  );
};

export default NxtStaffs;
