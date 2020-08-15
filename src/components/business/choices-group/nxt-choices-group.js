import React, { Suspense, useEffect } from 'react';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import { CssBaseline, makeStyles, Container, Grid, Box, Typography, Button } from '@material-ui/core';

import { CHOICE_GROUPS } from '../../../constants/left-menu';
import { useTranslation } from 'react-i18next';
import AddIcon from '@material-ui/icons/Add';
import columns from './columns';
import ChoiceGroupForm from './choices-group-form/nxt-choice-group-form';
import { IxDialogue } from '../../basic/ix-dialogue';

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

const ChoiceGroupRadioValues = {
  optional: 'optional',
  required: 'required',
  single: 'single',
  multiple: 'multiple'
}

const NxtChoicesGroup = ({ company, handlefetchChoiceGroup,
  handleFetchCompanyChoicesGroups, handleChoicesGroupAdd,
  handleChoicesGroupUpdate, handleChangeChoicesGroupStatus, handleDeleteChoiceGroup,
  destroyChoiceGroupForm, handleFetchCompanyById, handleFetchCompanyBranches }) => {
  const [appContext, setAppContext] = React.useState(localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true });
  const [user] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [isModalEdit, setIsModalEdit] = React.useState(false);
  const [choiceGroupModalOpen, setChoiceGroupModalOpen] = React.useState(false);
  const [choicesGroupFormData, setChoicesGroupFormData] = React.useState({});
  const [openDeleteConfirmDialogue, setOpenDeleteConfirmDialogue] = React.useState(false);
  const [rowIdToBeDeleted, setRowIdToBeDeleted] = React.useState();
  const classes = useStyles();
  const { t } = useTranslation();
  const ChoicesGroups = company.ChoicesGroups.data;
  const menuOptions = [
    // {displayName: i18n.t('MenuActionLabel.Edit')},
    { displayName: t('MenuActionLabel.Edit') },
    { displayName: t('MenuActionLabel.MakeInactive'), displayLogic: { property: 'isActive', value: true } },
    { displayName: t('MenuActionLabel.MakeActive'), displayLogic: { property: 'isActive', value: false } },
    { displayName: t('MenuActionLabel.Delete') }
  ];
  
  useEffect(() => {
    if (!ChoicesGroups || !ChoicesGroups.length) {
      handleFetchCompanyChoicesGroups(user.company.id);
    }
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


  const handleChoiceGroupModalOpen = () => {
    setChoiceGroupModalOpen(true);
  }

  const handleChoiceGroupModalClose = () => {
    destroyChoiceGroupForm();
    setChoiceGroupModalOpen(false);
  }

  const handleCreateChoiceGroup = () => {
    setIsModalEdit(false);
    setChoicesGroupFormData(
      {
        companyId: user.company.id,
        isActive: true,
        isRequired: false,
        isMultivalued: false,
        choicesItems: [{}]
      }
    );
    handleChoiceGroupModalOpen();
  }

  const handleDeleteConfirmed = async () => {
    await handleDeleteChoiceGroup(rowIdToBeDeleted);
    handleFetchCompanyChoicesGroups(user.company.id);
    handleCloseDeleteDialogue();
  }

  const handleCloseDeleteDialogue = () => {
    setOpenDeleteConfirmDialogue(false);
    setRowIdToBeDeleted(null);
  }

  const handleChoiceGroupSubmit = async (values) => {
    const { id, name_en, name_ja, name_ko, name_zh, isMultivalued, isRequired, isActive, subChoicesCategories, choicesItems } = values;
    let payload = {};
    if (id) {
      payload.id = id;
    }

    let nameObj = {}
    name_en && name_en !== "" && (nameObj['en-US'] = name_en)
    name_ja && name_ja !== "" && (nameObj['ja-JP'] = name_ja)
    name_ko && name_ko !== "" && (nameObj['ko-KR'] = name_ko)
    name_zh && name_zh !== "" && (nameObj['zh-CN'] = name_zh)

    payload.name = nameObj;
    payload.name = JSON.stringify(payload.name)
    payload.name = `\"${payload.name.split('"').join('\\\"')}\"`

    payload.companyId = user.company.id;
    payload.parentId = 0;
    isMultivalued === ChoiceGroupRadioValues.multiple ? payload.isMultivalued = true : payload.isMultivalued = false;
    isRequired === ChoiceGroupRadioValues.required ? payload.isRequired = true : payload.isRequired = false;
    payload.isActive = isActive;
    payload.subChoicesCategories = subChoicesCategories;

    payload.choicesItems = [];
    choicesItems.map(item => {
      let modifiedItem = {};
      if (item) {
        modifiedItem.id = item.id;
        let nameObj = {};
        item.name_en && item.name_en !== "" && (nameObj['en-US'] = item.name_en)
        item.name_ja && item.name_ja !== "" && (nameObj['ja-JP'] = item.name_ja)
        item.name_ko && item.name_ko !== "" && (nameObj['ko-KR'] = item.name_ko)
        item.name_zh && item.name_zh !== "" && (nameObj['zh-CN'] = item.name_zh)
        modifiedItem.name = nameObj;

        modifiedItem.name = JSON.stringify(modifiedItem.name)
        modifiedItem.name = `\"${modifiedItem.name.split('"').join('\\\"')}\"`

        modifiedItem.price = item.price;
        modifiedItem.choicesCategoryId = id ? id : item.choicesCategoryId;
        modifiedItem.isActive = id ? item.isActive : true;
        modifiedItem.name && payload.choicesItems.push(modifiedItem);
      }
      return modifiedItem;
    });

    id ? await handleChoicesGroupUpdate(payload) : await handleChoicesGroupAdd(payload);
    handleChoiceGroupModalClose();
    // handleFetchCompanyChoicesGroups(user.company.id);
  }

  const handleMenuActionClick = async (action, rowdata) => {
    if (action === menuOptions[0].displayName) { // edit
      setIsModalEdit(true);
      let payload = {};
      const { id, name, isMultivalued, isRequired, isActive, subChoicesCategories, choicesItems } = rowdata;

      payload.id = id;
      name['en-US'] && name['en-US'] !== "" && (payload.name_en = name['en-US'])
      name['ja-JP'] && name['ja-JP'] !== "" && (payload.name_ja = name['ja-JP'])
      name['ko-KA'] && name['ko-KA'] !== "" && (payload.name_ko = name['ko-KA'])
      name['zh-CN'] && name['zh-CN'] !== "" && (payload.name_zh = name['zh-CN'])

      payload.isMultivalued = isMultivalued;
      payload.isRequired = isRequired;
      payload.isActive = isActive;
      payload.subChoicesCategories = subChoicesCategories;
      payload.choicesItems = [];
      choicesItems.map(item => {
        let modifiedItem = item;
        item.name && item.name['en-US'] && (item.name['en-US'] !== "") && (modifiedItem.name_en = item.name['en-US'])
        item.name && item.name['ja-JP'] && (item.name['ja-JP'] !== "") && (modifiedItem.name_ja = item.name['ja-JP'])
        item.name && item.name['ko-KA'] && (item.name['ko-KA'] !== "") && (modifiedItem.name_ko = item.name['ko-KA'])
        item.name && item.name['zh-CN'] && (item.name['zh-CN'] !== "") && (modifiedItem.name_zh = item.name['zh-CN'])

        payload.choicesItems.push(modifiedItem);
        return modifiedItem;
      });

      setChoicesGroupFormData(payload);
      handleChoiceGroupModalOpen();

    } else if (action === menuOptions[1].displayName) { // make inactive     
      await handleChangeChoicesGroupStatus(rowdata.id, false);
    } else if (action === menuOptions[2].displayName) { // make active
      await handleChangeChoicesGroupStatus(rowdata.id, true);
    }
    else if (action === menuOptions[3].displayName) { // delete
      setRowIdToBeDeleted(rowdata.id);
      setOpenDeleteConfirmDialogue(true);
    }

  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxAppBar companydata={company}
          handleCompanyMenuChange={(newValue) => setAppContext(newValue)}
          selectedMenu={CHOICE_GROUPS}
        >
        </IxAppBar>
      </Suspense>

      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxModal modaltitle={isModalEdit ? t('NxtChoicesGroupForm.title_edit') : t('NxtChoicesGroupForm.title')} open={choiceGroupModalOpen} handleClose={handleChoiceGroupModalClose}>
          {choiceGroupModalOpen &&
            <ChoiceGroupForm onSubmit={handleChoiceGroupSubmit}
              loading={company.isLoading}
              ChoiceGroupRadioValues={ChoiceGroupRadioValues}
              initialValues={choicesGroupFormData}
              handleClose={handleChoiceGroupModalClose}>
            </ChoiceGroupForm>}
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
                        {t('IxLeftBarMenu.ChoicesGroup')}
                      </Typography></Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      <Button variant="contained" startIcon={<AddIcon />} color="secondary"
                        onClick={handleCreateChoiceGroup}
                        disabled={!appContext.isCompany}
                      >
                        {t('NxtChoicesGroup.New_Group_Btn_Label')}
                      </Button>
                    </Box>
                  </Box>
                </Grid>

                <Grid className={classes.tableWrapper} item xs={12} md={12} lg={12}>
                  <Box>
                    <Suspense fallback={<div>{t('common.loading')}</div>}>
                      <IxTable
                        columns={columns(handleOrderUpClick, handleOrderDownClick)}
                        data={ChoicesGroups}
                        showActionMenu={appContext.isCompany}
                        menuOptions={menuOptions}
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

export default NxtChoicesGroup;
