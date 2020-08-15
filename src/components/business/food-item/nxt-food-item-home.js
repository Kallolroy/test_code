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
import UpdateStockForm from './food-item-form/update-stock-form';
import FoodItemForm from './food-item-form/nxt-food-item-form';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import columns from './columns';
import _ from 'lodash';
import { IxDialogue } from '../../basic/ix-dialogue';
import { CATEGORIES, FOODITEMS } from '../../../constants/left-menu';

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

export default function NxtFoodItemHome({
  dispatch,
  company,
  handleFoodItemAdd,
  handleFoodItemUpdate,
  handleFoodItemReOrder,
  handleChangeFoodItemStatus,
  handleFoodItemDelete,
  handleFetchCompanyById,
  handleFetchCompanyBranches,
  handleFetchCompanyFoodItems,
  handleFetchBranchFoodItems,
  handleFetchCategoryFoodItems,
  handleUpdateFoodItemStock,
  destroyFoodItemForm
}) {
  const classes = useStyles();
  const [appContext, setAppContext] = React.useState(localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true });
  const [fooditemModalOpen, setFoodItemModalOpen] = React.useState(false);
  const [updateStockModalOpen, setUpdateStockModalOpen] = React.useState(false);
  const [tab, setTab] = useState(0);
  const [fooditemUpdateData, setFoodItemUpdateData] = React.useState({});
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [rowIdToBeDeleted, setRowIdToBeDeleted] = React.useState();
  const [openDeleteConfirmDialogue, setOpenDeleteConfirmDialogue] = React.useState(false);
  const IxModal = React.lazy(() => import('../../composite/ix-modal')); // Lazy-loaded
  const IxTable = React.lazy(() => import('../../composite/table/ix-table')); // Lazy-loaded
  const { t, i18n } = useTranslation();
  const { catId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const fooditemOptions = [
    { displayName: t('MenuActionLabel.Edit')},
    { displayName: t('MenuActionLabel.MakeInactive'), displayLogic: { property: 'isActive', value: true } },
    { displayName: t('MenuActionLabel.MakeActive'), displayLogic: { property: 'isActive', value: false } },
    { displayName: t('MenuActionLabel.Delete')},
  ];

  const handleFoodItemModalOpen = () => {
    setFoodItemUpdateData(
      {
        "isVeg": false,
        "isHalal": false,
        "isAlcoholAdded": false,
        "isKidItem": false,
        "isDailyOpeningEnabled": true,
        "dailyOpeningCount": 0,
        "isActive": true
      }
    );
    setFoodItemModalOpen(true);
  }
  const handleFoodItemModalClose = () => {
    destroyFoodItemForm();
    setFoodItemModalOpen(false);
  }

  const handleUpdateStockModalClose = () => {
    setUpdateStockModalOpen(false);
  }

  const handleUpdateStockFormSubmit = async (values) => {
    const payLoad = {
      currentStock: Number(values.currentStock)
    }
    handleUpdateFoodItemStock(payLoad, values.id, appContext.id)
    setUpdateStockModalOpen(false)
  }

  const handleFoodItemSubmit = async (values) => {
    let foodItemSaveData = {};
    if (values.branchId || appContext.id) {
      values.branchId = values.branchId ? Number(values.branchId) : appContext.id
    }

    let nameObj = {}
    values.name_en && values.name_en !== "" && (nameObj['en-US'] = values.name_en)
    delete values.name_en
    values.name_ja && values.name_ja !== "" && (nameObj['ja-JP'] = values.name_ja)
    delete values.name_ja
    values.name_ko && values.name_ko !== "" && (nameObj['ko-KR'] = values.name_ko)
    delete values.name_ko
    values.name_zh && values.name_zh !== "" && (nameObj['zh-CN'] = values.name_zh)
    delete values.name_zh
    delete values.name

    foodItemSaveData.name = nameObj;
    foodItemSaveData.name = JSON.stringify(foodItemSaveData.name)
    foodItemSaveData.name = `\"${foodItemSaveData.name.split('"').join('\\\"')}\"`

    let descriptionObj = {}
    values.description_en && values.description_en !== "" && (descriptionObj['en-US'] = values.description_en)
    delete values.description_en
    values.description_ja && values.description_ja !== "" && (descriptionObj['ja-JP'] = values.description_ja)
    delete values.description_ja
    values.description_ko && values.description_ko !== "" && (descriptionObj['ko-KR'] = values.description_ko)
    delete values.description_ko
    values.description_zh && values.description_zh !== "" && (descriptionObj['zh-CN'] = values.description_zh)
    delete values.description_zh
    delete values.description

    foodItemSaveData.description = descriptionObj;
    foodItemSaveData.description = JSON.stringify(foodItemSaveData.description)
    foodItemSaveData.description = `\"${foodItemSaveData.description.split('"').join('\\\"')}\"`

    let ingredientsObj = {}
    values.ingredients_en && values.ingredients_en !== "" && (ingredientsObj['en-US'] = values.ingredients_en)
    delete values.ingredients_en
    values.ingredients_ja && values.ingredients_ja !== "" && (ingredientsObj['ja-JP'] = values.ingredients_ja)
    delete values.ingredients_ja
    values.ingredients_ko && values.ingredients_ko !== "" && (ingredientsObj['ko-KR'] = values.ingredients_ko)
    delete values.ingredients_ko
    values.ingredients_zh && values.ingredients_zh !== "" && (ingredientsObj['zh-CN'] = values.ingredients_zh)
    delete values.ingredients_zh
    delete values.ingredients

    foodItemSaveData.ingredients = ingredientsObj;
    foodItemSaveData.ingredients = JSON.stringify(foodItemSaveData.ingredients)
    foodItemSaveData.ingredients = `\"${foodItemSaveData.ingredients.split('"').join('\\\"')}\"`

    let allergyInfoObj = {}
    values.allergyInfo_en && values.allergyInfo_en !== "" && (allergyInfoObj['en-US'] = values.allergyInfo_en)
    delete values.allergyInfo_en
    values.allergyInfo_ja && values.allergyInfo_ja !== "" && (allergyInfoObj['ja-JP'] = values.allergyInfo_ja)
    delete values.allergyInfo_ja
    values.allergyInfo_ko && values.allergyInfo_ko !== "" && (allergyInfoObj['ko-KR'] = values.allergyInfo_ko)
    delete values.allergyInfo_ko
    values.allergyInfo_zh && values.allergyInfo_zh !== "" && (allergyInfoObj['zh-CN'] = values.allergyInfo_zh)
    delete values.allergyInfo_zh
    delete values.allergyInfo

    foodItemSaveData.allergyInfo = allergyInfoObj;
    foodItemSaveData.allergyInfo = JSON.stringify(foodItemSaveData.allergyInfo)
    foodItemSaveData.allergyInfo = `\"${foodItemSaveData.allergyInfo.split('"').join('\\\"')}\"`

    let propertiesObj = {}
    values.properties_en && values.properties_en !== "" && (propertiesObj['en-US'] = values.properties_en)
    delete values.properties_en
    values.properties_ja && values.properties_ja !== "" && (propertiesObj['ja-JP'] = values.properties_ja)
    delete values.properties_ja
    values.properties_ko && values.properties_ko !== "" && (propertiesObj['ko-KR'] = values.properties_ko)
    delete values.properties_ko
    values.properties_zh && values.properties_zh !== "" && (propertiesObj['zh-CN'] = values.properties_zh)
    delete values.properties_zh
    delete values.properties

    foodItemSaveData.properties = propertiesObj;
    foodItemSaveData.properties = JSON.stringify(foodItemSaveData.properties)
    foodItemSaveData.properties = `\"${foodItemSaveData.properties.split('"').join('\\\"')}\"`

    let nutritionInfoObj = {}
    values.nutritionInfo_en && values.nutritionInfo_en !== "" && (nutritionInfoObj['en-US'] = values.nutritionInfo_en)
    delete values.nutritionInfo_en
    values.nutritionInfo_ja && values.nutritionInfo_ja !== "" && (nutritionInfoObj['ja-JP'] = values.nutritionInfo_ja)
    delete values.nutritionInfo_ja
    values.nutritionInfo_ko && values.nutritionInfo_ko !== "" && (nutritionInfoObj['ko-KR'] = values.nutritionInfo_ko)
    delete values.nutritionInfo_ko
    values.nutritionInfo_zh && values.nutritionInfo_zh !== "" && (nutritionInfoObj['zh-CN'] = values.nutritionInfo_zh)
    delete values.nutritionInfo_zh
    delete values.nutritionInfo

    foodItemSaveData.nutritionInfo = nutritionInfoObj;
    foodItemSaveData.nutritionInfo = JSON.stringify(foodItemSaveData.nutritionInfo)
    foodItemSaveData.nutritionInfo = `\"${foodItemSaveData.nutritionInfo.split('"').join('\\\"')}\"`


    let printableNameObj = {}
    values.printableName_en && values.printableName_en !== "" && (printableNameObj['en-US'] = values.printableName_en)
    delete values.printableName_en
    values.printableName_ja && values.printableName_ja !== "" && (printableNameObj['ja-JP'] = values.printableName_ja)
    delete values.printableName_ja
    values.printableName_ko && values.printableName_ko !== "" && (printableNameObj['ko-KR'] = values.printableName_ko)
    delete values.printableName_ko
    values.printableName_zh && values.printableName_zh !== "" && (printableNameObj['zh-CN'] = values.printableName_zh)
    delete values.printableName_zh
    delete values.printableName

    foodItemSaveData.printableName = printableNameObj;
    foodItemSaveData.printableName = JSON.stringify(foodItemSaveData.printableName)
    foodItemSaveData.printableName = `\"${foodItemSaveData.printableName.split('"').join('\\\"')}\"`

    values.price = values.price ? Number(values.price) : 0
    values.calorie = values.calorie ? Number(values.calorie) : 0
    values.prepareDuration = values.prepareDuration ? Number(values.prepareDuration) : 0

    if (values.isDailyOpeningEnabled) {
      values.dailyOpeningCount = values.dailyOpeningCount ? Number(values.dailyOpeningCount) : 0
    }
    else {
      values.dailyOpeningCount = 0
    }


    !values.photo && delete values.photo
    !values.isVeg && (values.isVeg = false)
    !values.isHalal && (values.isHalal = false)
    !values.isAlcoholAdded && (values.isAlcoholAdded = false)
    !values.isActive && (values.isActive = false)
    !values.displayOrder && delete values.displayOrder
    delete values.foodItemPhoto
    delete values.foodCategories
    delete values.timeSlots
    delete values.menus
    delete values.originalFilename
    delete values.tableData
    !values.itemCode && delete values.itemCode
    !values.imageFile && delete values.imageFile
    !values.currentStock && delete values.currentStock

    Object.assign(foodItemSaveData, values);
    // window.alert(`You submitted:\n\n${JSON.stringify(foodItemSaveData, null, 2)}`);

    foodItemSaveData.companyId = user.company.id

    let payload = new FormData()
    Object.keys(foodItemSaveData).forEach(key => payload.append(key, foodItemSaveData[key]));

    values.id ? await handleFoodItemUpdate(payload, values.id) : await handleFoodItemAdd(payload)
    // appContext.isCompany ? await handleFetchCompanyFoodItems(user.company.id) : await handleFetchBranchFoodItems(appContext.id)
    handleFoodItemModalClose();
  }

  const handleDeleteConfirmed = async () => {
    await handleFoodItemDelete(rowIdToBeDeleted)
    setOpenDeleteConfirmDialogue(false);
  };

  const handleFoodItemActionClick = async (action, rowdata) => {
    let updateData = {}
    rowdata.name['en-US'] && rowdata.name['en-US'] !== "" && (updateData.name_en = rowdata.name['en-US'])
    rowdata.name['ja-JP'] && rowdata.name['ja-JP'] !== "" && (updateData.name_ja = rowdata.name['ja-JP'])
    rowdata.name['ko-KR'] && rowdata.name['ko-KR'] !== "" && (updateData.name_ko = rowdata.name['ko-KR'])
    rowdata.name['zh-CN'] && rowdata.name['zh-CN'] !== "" && (updateData.name_zh = rowdata.name['zh-CN'])

    rowdata.description && rowdata.description['en-US'] && rowdata.description['en-US'] !== "" && (updateData.description_en = rowdata.description['en-US'])
    rowdata.description && rowdata.description['ja-JP'] && rowdata.description['ja-JP'] !== "" && (updateData.description_ja = rowdata.description['ja-JP'])
    rowdata.description && ['ko-KR'] && rowdata.description['ko-KR'] !== "" && (updateData.description_ko = rowdata.description['ko-KR'])
    rowdata.description && rowdata.description['zh-CN'] && rowdata.description['zh-CN'] !== "" && (updateData.description_zh = rowdata.description['zh-CN'])

    rowdata.ingredients && rowdata.ingredients['en-US'] && rowdata.ingredients['en-US'] !== "" && (updateData.ingredients_en = rowdata.ingredients['en-US'])
    rowdata.ingredients && rowdata.ingredients['ja-JP'] && rowdata.ingredients['ja-JP'] !== "" && (updateData.ingredients_ja = rowdata.ingredients['ja-JP'])
    rowdata.ingredients && rowdata.ingredients['ko-KR'] && rowdata.ingredients['ko-KR'] !== "" && (updateData.ingredients_ko = rowdata.ingredients['ko-KR'])
    rowdata.ingredients && rowdata.ingredients['zh-CN'] && rowdata.ingredients['zh-CN'] !== "" && (updateData.ingredients_zh = rowdata.ingredients['zh-CN'])

    rowdata.allergyInfo && rowdata.allergyInfo['en-US'] && rowdata.allergyInfo['en-US'] !== "" && (updateData.allergyInfo_en = rowdata.allergyInfo['en-US'])
    rowdata.allergyInfo && rowdata.allergyInfo['ja-JP'] && rowdata.allergyInfo['ja-JP'] !== "" && (updateData.allergyInfo_ja = rowdata.allergyInfo['ja-JP'])
    rowdata.allergyInfo && rowdata.allergyInfo['ko-KR'] && rowdata.allergyInfo['ko-KR'] !== "" && (updateData.allergyInfo_ko = rowdata.allergyInfo['ko-KR'])
    rowdata.allergyInfo && rowdata.allergyInfo['zh-CN'] && rowdata.allergyInfo['zh-CN'] !== "" && (updateData.allergyInfo_zh = rowdata.allergyInfo['zh-CN'])

    rowdata.properties && rowdata.properties['en-US'] && rowdata.properties['en-US'] !== "" && (updateData.properties_en = rowdata.properties['en-US'])
    rowdata.properties && rowdata.properties['ja-JP'] && rowdata.properties['ja-JP'] !== "" && (updateData.properties_ja = rowdata.properties['ja-JP'])
    rowdata.properties && rowdata.properties['ko-KR'] && rowdata.properties['ko-KR'] !== "" && (updateData.properties_ko = rowdata.properties['ko-KR'])
    rowdata.properties && rowdata.properties['zh-CN'] && rowdata.properties['zh-CN'] !== "" && (updateData.properties_zh = rowdata.properties['zh-CN'])

    rowdata.nutritionInfo && rowdata.nutritionInfo['en-US'] && rowdata.nutritionInfo['en-US'] !== "" && (updateData.nutritionInfo_en = rowdata.nutritionInfo['en-US'])
    rowdata.nutritionInfo && rowdata.nutritionInfo['ja-JP'] && rowdata.nutritionInfo['ja-JP'] !== "" && (updateData.nutritionInfo_ja = rowdata.nutritionInfo['ja-JP'])
    rowdata.nutritionInfo && rowdata.nutritionInfo['ko-KR'] && rowdata.nutritionInfo['ko-KR'] !== "" && (updateData.nutritionInfo_ko = rowdata.nutritionInfo['ko-KR'])
    rowdata.nutritionInfo && rowdata.nutritionInfo['zh-CN'] && rowdata.nutritionInfo['zh-CN'] !== "" && (updateData.nutritionInfo_zh = rowdata.nutritionInfo['zh-CN'])

    rowdata.printableName && rowdata.printableName['en-US'] && rowdata.printableName['en-US'] !== "" && (updateData.printableName_en = rowdata.printableName['en-US'])
    rowdata.printableName && rowdata.printableName['ja-JP'] && rowdata.printableName['ja-JP'] !== "" && (updateData.printableName_ja = rowdata.printableName['ja-JP'])
    rowdata.printableName && rowdata.printableName['ko-KR'] && rowdata.printableName['ko-KR'] !== "" && (updateData.printableName_ko = rowdata.printableName['ko-KR'])
    rowdata.printableName && rowdata.printableName['zh-CN'] && rowdata.printableName['zh-CN'] !== "" && (updateData.printableName_zh = rowdata.printableName['zh-CN'])

    Object.assign(updateData, rowdata);

    if (action === fooditemOptions[0].displayName) {
      setFoodItemUpdateData(updateData);
      setFoodItemModalOpen(true);
    } else if (action === 'Make InActive') {
      await handleChangeFoodItemStatus(updateData.id, false);
    } else if (action === 'Make Active') {
      await handleChangeFoodItemStatus(updateData.id, true);
    } else if (action === fooditemOptions[2].displayName) {
      setRowIdToBeDeleted(updateData.id);
      setOpenDeleteConfirmDialogue(true);
    } else if (action === 'Update Stock') {
      setFoodItemUpdateData(updateData);
      setUpdateStockModalOpen(true);
    }
  }

  const handleCompanyMenuChange = async (appContext) => {
    setAppContext(appContext)
    appContext.isCompany ? await handleFetchCompanyFoodItems(user.company.id) : await handleFetchBranchFoodItems(appContext.id)
  };

  const handleOrderUpClick = async (rowdata) => {

    const foodItems = _.orderBy(company.fooditems.data, ['displayOrder'], ['asc']);
    // const foodItems = company.fooditems.data

    let index = foodItems.findIndex(function (f) {
      return f.id === rowdata.id;
    })

    let nextItem = foodItems[index - 1]
    if (nextItem) {
      // await Promise.all([handleFoodItemUpdate({ "id": nextItem.id, "displayOrder": rowdata.displayOrder }), handleFoodItemUpdate({ "id": rowdata.id, "displayOrder": nextItem.displayOrder })]);
      // appContext.isCompany ? await handleFetchCompanyFoodItems(user.company.id) : await handleFetchBranchFoodItems(appContext.id)
      await handleFoodItemReOrder(rowdata.id, nextItem.id)
    }
  }

  const handleOrderDownClick = async (rowdata) => {
    const foodItems = _.orderBy(company.fooditems.data, ['displayOrder'], ['asc']);
    // const foodItems = company.fooditems.data

    let index = foodItems.findIndex(function (f) {
      return f.id === rowdata.id;
    })

    let nextItem = foodItems[index + 1]
    if (nextItem) {
      // await Promise.all([handleFoodItemUpdate({ "id": nextItem.id, "displayOrder": rowdata.displayOrder }), handleFoodItemUpdate({ "id": rowdata.id, "displayOrder": nextItem.displayOrder })]);
      // appContext.isCompany ? await handleFetchCompanyFoodItems(user.company.id) : await handleFetchBranchFoodItems(appContext.id)
      await handleFoodItemReOrder(rowdata.id, nextItem.id)
    }
  }

  useEffect(() => {
    appContext.isCompany ? handleFetchCompanyFoodItems(user.company.id) : handleFetchBranchFoodItems(appContext.id)
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
          selectedMenu={catId ? CATEGORIES : FOODITEMS}>
        </IxAppBar>
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
                        {!fooditemModalOpen ? t('NxtFoodItemHome.title') : t('FoodItemForm.title')}
                      </Typography></Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      {!fooditemModalOpen && <Button variant="contained" disabled={!appContext.isCompany} startIcon={<AddIcon />} color="secondary" onClick={handleFoodItemModalOpen}>
                        {t('NxtFoodItemHome.New_FoodItem')}
                      </Button>}
                    </Box>
                  </Box>
                </Grid>
                <Grid className={classes.tableWrapper} item xs={12} md={12} lg={12}>
                  <Box>
                    <Suspense fallback={<div>{t('common.loading')}</div>}>
                      {!fooditemModalOpen && company.fooditems && company.fooditems.data ?
                        <IxTable
                          columns={columns(handleOrderUpClick, handleOrderDownClick)}
                          showActionMenu={true}
                          menuOptions={fooditemOptions}
                          pageName="food-items"
                          data={company.fooditems.data}
                          handleActionClick={handleFoodItemActionClick}>
                        </IxTable> : !fooditemModalOpen && <div>{t('common.loading')}</div>}
                    </Suspense>
                    {fooditemModalOpen &&
                      <FoodItemForm onSubmit={handleFoodItemSubmit}
                        loading={company.isLoading}
                        initialValues={fooditemUpdateData}
                        handleClose={handleFoodItemModalClose}>
                      </FoodItemForm>}

                    <IxModal
                      isSmall={true}
                      modaltitle={"Update Stock"}
                      open={updateStockModalOpen}
                      handleClose={handleUpdateStockModalClose}
                    >
                      <UpdateStockForm
                        onSubmit={handleUpdateStockFormSubmit}
                        initialValues={fooditemUpdateData}
                        handleClose={handleUpdateStockModalClose}
                      ></UpdateStockForm>
                    </IxModal>
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