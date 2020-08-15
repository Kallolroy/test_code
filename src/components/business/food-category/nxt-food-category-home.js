import React, { useEffect, Suspense, useState } from 'react';
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
import FoodCategoryForm from './food-category-form/nxt-food-category-form';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import columns from './columns';
import { IxDialogue } from '../../basic/ix-dialogue';
import { CATEGORIES } from '../../../constants/left-menu';

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

export default function NxtFoodCategoryHome({
  dispatch,
  company,
  handleFoodCategoryAdd,
  handleFoodCategoryUpdate,
  handleChangeFoodCategoryStatus,
  handleFoodCategoryDelete,
  handleFetchCompanyById,
  handleFetchCompanyBranches,
  handleFetchBranchFoodCategories,
  handleFetchCompanyFoodCategories,
  handleFetchCompanyOptSlots,
  destroyFoodCategoryForm
}) {
  const classes = useStyles();
  const [FoodCategoryModalOpen, setFoodCategoryModalOpen] = React.useState(false);
  const [tab, setTab] = useState(0);
  const [rowIdToBeDeleted, setRowIdToBeDeleted] = React.useState();
  const [openDeleteConfirmDialogue, setOpenDeleteConfirmDialogue] = React.useState(false);
  const [FoodCategoryUpdateData, setFoodCategoryUpdateData] = React.useState({});
  const [appContext, setAppContext] = React.useState(localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true });
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  // const IxAppBar = React.lazy(() => import('../../composite/app-bar/ix-app-bar'));
  const IxModal = React.lazy(() => import('../../composite/ix-modal')); // Lazy-loaded
  const IxTable = React.lazy(() => import('../../composite/table/ix-table')); // Lazy-loaded
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const FoodCategoryOptions = [
    { displayName: t('MenuActionLabel.Edit')},
    { displayName: t('MenuActionLabel.Copy_Edit')},
    { displayName: t('MenuActionLabel.MakeInactive'), displayLogic: { property: 'isActive', value: true } },
    { displayName: t('MenuActionLabel.MakeActive'), displayLogic: { property: 'isActive', value: false } },
    { displayName: t('MenuActionLabel.Delete')},
  ];

  const handleFoodCategoryModalOpen = () => {
    setFoodCategoryUpdateData(
      {
        "FoodCategorieType": "Regular",
        "pricingOption": "priceOnFoodCategorie",
        "timeLimit": "noTimeLimit",
        "isActive": true,
        "optSlots": [],

      }
    );
    setFoodCategoryModalOpen(true);
  }
  const handleFoodCategoryModalClose = () => {
    destroyFoodCategoryForm();
    setFoodCategoryModalOpen(false);
  }

  const handleFoodCategorieSubmit = async (values) => {
    let FoodCategorySaveData = {};
    FoodCategorySaveData.companyId = user.company.id;
    appContext.id && (FoodCategorySaveData.branchId = appContext.id)
    values.parentId && values.parentId > 0 && (FoodCategorySaveData.parentId = values.parentId)

    let nameObj = {}
    values.name_en && values.name_en !== "" && (nameObj['en-US'] = values.name_en)
    values.name_ja && values.name_ja !== "" && (nameObj['ja-JP'] = values.name_ja)
    values.name_ko && values.name_ko !== "" && (nameObj['ko-KR'] = values.name_ko)
    values.name_zh && values.name_zh !== "" && (nameObj['zh-CN'] = values.name_zh)
    FoodCategorySaveData.name = nameObj;

    FoodCategorySaveData.name = JSON.stringify(FoodCategorySaveData.name)
    FoodCategorySaveData.name = `\"${FoodCategorySaveData.name.split('"').join('\\\"')}\"`

    let descriptionObj = {}
    values.description_en && values.description_en !== "" && (descriptionObj['en-US'] = values.description_en)
    values.description_ja && values.description_ja !== "" && (descriptionObj['ja-JP'] = values.description_ja)
    values.description_ko && values.description_ko !== "" && (descriptionObj['ko-KR'] = values.description_ko)
    values.description_zh && values.description_zh !== "" && (descriptionObj['zh-CN'] = values.description_zh)
    FoodCategorySaveData.description = descriptionObj;

    FoodCategorySaveData.description = JSON.stringify(FoodCategorySaveData.description)
    FoodCategorySaveData.description = `\"${FoodCategorySaveData.description.split('"').join('\\\"')}\"`

    values.id && (FoodCategorySaveData.id = values.id)
    FoodCategorySaveData.photo && (FoodCategorySaveData.photo = null)
    FoodCategorySaveData.isActive = values.isActive
    values.imageFile && (FoodCategorySaveData.imageFile = values.imageFile)

    let payload = new FormData()
    Object.keys(FoodCategorySaveData).forEach(key => payload.append(key, FoodCategorySaveData[key]));

    values.id ? await handleFoodCategoryUpdate(payload, values.id) : await handleFoodCategoryAdd(payload)
    // appContext.isCompany ? await handleFetchCompanyFoodCategories(user.company.id) : await handleFetchBranchFoodCategories(appContext.id)
    handleFoodCategoryModalClose();
  }

  const handleFoodCategoryActionClick = async (action, rowdata) => {
    let FoodCategorySaveData = {};
    FoodCategorySaveData.id = rowdata.id;
    FoodCategorySaveData.companyId = rowdata.companyId;
    FoodCategorySaveData.branchId = rowdata.branchId;

    rowdata.name['en-US'] && rowdata.name['en-US'] !== "" && (FoodCategorySaveData.name_en = rowdata.name['en-US'])
    rowdata.name['ja-JP'] && rowdata.name['ja-JP'] !== "" && (FoodCategorySaveData.name_ja = rowdata.name['ja-JP'])
    rowdata.name['ko-KR'] && rowdata.name['ko-KR'] !== "" && (FoodCategorySaveData.name_ko = rowdata.name['ko-KR'])
    rowdata.name['zh-CN'] && rowdata.name['zh-CN'] !== "" && (FoodCategorySaveData.name_zh = rowdata.name['zh-CN'])

    rowdata.description['en-US'] && rowdata.description['en-US'] !== "" && (FoodCategorySaveData.description_en = rowdata.description['en-US'])
    rowdata.description['ja-JP'] && rowdata.description['ja-JP'] !== "" && (FoodCategorySaveData.description_ja = rowdata.description['ja-JP'])
    rowdata.description['ko-KR'] && rowdata.description['ko-KR'] !== "" && (FoodCategorySaveData.description_ko = rowdata.description['ko-KR'])
    rowdata.description['zh-CN'] && rowdata.description['zh-CN'] !== "" && (FoodCategorySaveData.description_zh = rowdata.description['zh-CN'])


    FoodCategorySaveData.isActive = rowdata.isActive;
    FoodCategorySaveData.photo = rowdata.photo;

    if (action === FoodCategoryOptions[0].displayName) {
      setFoodCategoryUpdateData(FoodCategorySaveData);
      setFoodCategoryModalOpen(true);
    }
    else if (action === FoodCategoryOptions[1].displayName) {
      FoodCategorySaveData.id = null;
      setFoodCategoryUpdateData(FoodCategorySaveData);
      setFoodCategoryModalOpen(true);
    }
    else if (action === FoodCategoryOptions[2].displayName) {
      await handleChangeFoodCategoryStatus(FoodCategorySaveData.id, false);
    }
    else if (action === FoodCategoryOptions[3].displayName) {
      await handleChangeFoodCategoryStatus(FoodCategorySaveData.id, true);
    }
    else if (action === FoodCategoryOptions[4].displayName) {
      setRowIdToBeDeleted(FoodCategorySaveData.id);
      setOpenDeleteConfirmDialogue(true);
      // await handleFoodCategoryDelete(FoodCategorySaveData.id);
    }
  }

  const handleCompanyMenuChange = (appContext) => {
    setAppContext(appContext);
    handleFetchCompanyFoodCategories(user.company.id)
  };

  const handleOrderUpClick = (rowdata) => {
    alert(rowdata.id)
  }
  const handleOrderDownClick = (rowdata) => {
    alert(rowdata.id)
  }

  const handleDeleteConfirmed = async () => {
    await handleFoodCategoryDelete(rowIdToBeDeleted)
    setOpenDeleteConfirmDialogue(false);
  };

  useEffect(() => {
    !company.foodcategories && handleFetchCompanyFoodCategories(user.company.id)
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
          selectedMenu={CATEGORIES}>
        </IxAppBar>
      </Suspense>
      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxModal modaltitle={t('FoodCategoryForm.title')} open={FoodCategoryModalOpen} handleClose={handleFoodCategoryModalClose}>
          {FoodCategoryModalOpen && company.foodcategories && company.foodcategories.data
            && <FoodCategoryForm onSubmit={handleFoodCategorieSubmit}
              loading={company.isLoading}
              initialValues={FoodCategoryUpdateData}
              parentCatData={company.foodcategories.data}
              handleClose={handleFoodCategoryModalClose}>
            </FoodCategoryForm>}
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
                        {t('NxtFoodCategoryHome.title')}
                      </Typography></Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      <Button variant="contained" disabled={!appContext.isCompany} startIcon={<AddIcon />} color="secondary" onClick={handleFoodCategoryModalOpen}>
                        {t('NxtFoodCategoryHome.New_FoodCategory')}
                      </Button>
                    </Box>
                  </Box>

                </Grid>
                <Grid className={classes.tableWrapper} item xs={12} md={12} lg={12}>
                  <Box>
                    <Suspense fallback={<div>{t('common.loading')}</div>}>
                      {company.foodcategories && company.foodcategories.data &&
                        <IxTable
                          columns={columns(handleOrderUpClick, handleOrderDownClick)}
                          showActionMenu={appContext.isCompany}
                          menuOptions={FoodCategoryOptions}
                          data={company.foodcategories.data}
                          isTree={true}
                          handleActionClick={handleFoodCategoryActionClick}>
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