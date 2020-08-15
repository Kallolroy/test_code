import React, { useEffect, Suspense, useState } from 'react';
import clsx from 'clsx';
import { fetchFoodItemOptSlotById } from '../../../actions/company/food-item-opt-slots-actions';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next'
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import Typography from '@material-ui/core/Typography';
import { useParams, Route } from 'react-router-dom';
import MenuItemForm from './menu-item-form/nxt-menu-item-form';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import IxNavLink from '../../composite/ix-nav-link';
import columns from './columns';
import { CATEGORIES, FOODITEMS, MENUS } from '../../../constants/left-menu';
import useStyles from './styles'
import OptSelectForm from './menu-item-form/opt-select-form';

export default function NxtFoodItemRefHome({
  dispatch,
  company,
  handleFoodItemOptSlotAdd,
  handleFoodItemOptSlotUpdate,
  handleChangeFoodItemOptSlotStatus,
  handleFoodItemOptSlotDelete,
  handleFetchCompanyById,
  handleFetchCompanyBranches,
  handleFetchFoodItemMenuItems,
  handleFetchMenuFoodItems,
  handlePublishMenu,
  handleFetchBranchMenus,
  handleFetchCompanyMenus,
  handleFetchCompanyFoodItems,
  handleFetchCategoryFoodItems,
  handleFetchBranchFoodCategories,
  handleFetchCompanyFoodCategories,
  handleFetchCompanyChoicesGroups,
  handleFetchCompanyOptSlots,
  handleFetchFoodItemOptSlotById,
  destroyMenuItemForm
}) {
  const classes = useStyles();
  const [appContext, setAppContext] = React.useState(localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true });
  const [fooditemModalOpen, setFoodItemModalOpen] = React.useState(false);
  const [selectOptModalOpen, setSelectOptModalOpen] = React.useState(false);
  const [fooditemUpdateData, setFoodItemUpdateData] = React.useState({});
  const [menuItemUpdateData, setMenuItemUpdateData] = React.useState(null);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const IxModal = React.lazy(() => import('../../composite/ix-modal')); // Lazy-loaded
  const IxTable = React.lazy(() => import('../../composite/table/ix-table')); // Lazy-loaded
  const { t, i18n } = useTranslation();
  const { itemId, refType } = useParams();
  const [rowIdToBeDeleted, setRowIdToBeDeleted] = React.useState();
  const user = JSON.parse(localStorage.getItem('user'));
  const fooditemOptions = [
    { displayName: t('MenuActionLabel.Edit')},
    { displayName: t('MenuActionLabel.MakeInactive'), displayLogic: { property: 'isActive', value: true } },
    { displayName: t('MenuActionLabel.MakeActive'), displayLogic: { property: 'isActive', value: false } },
    { displayName: t('MenuActionLabel.Delete')},
  ];

  const handleFoodItemModalOpen = () => {
    let menuId = null;
    let foodItemId = null;
    refType === "menus" ? (menuId = itemId) : menuId = company.menus.data[0].id
    refType === "foodItems" || refType === "foodCategories" ? (foodItemId = itemId) : foodItemId = company.fooditems.data[0].id

    setFoodItemUpdateData(
      {
        "foodItemId": foodItemId,
        "menuId": menuId,
        "isSeperateOption": false,
        "isActive": true,
        "choicesCategories": [],
        "timeSlots": []
      }
    );
    setFoodItemModalOpen(true);
  }

  const handleFoodItemModalClose = () => {
    destroyMenuItemForm();
    setFoodItemModalOpen(false);
  }

  const handleSelectOptModalClose = () => {
    setSelectOptModalOpen(false);
  };

  const handleStatusChangeFormSubmit = async (values) => {
    if (values.optsSate && values.optsSate.length > 0) {
      let optSlots = {
        optSlotIds: values.optsSate
      }
      handleChangeFoodItemOptSlotStatus(menuItemUpdateData.menuId, menuItemUpdateData.foodItemId, optSlots, false)
      refType === "foodItems" && handleFetchFoodItemMenuItems(itemId)
      refType === "menus" && handleFetchMenuFoodItems(itemId)
    }

    setSelectOptModalOpen(false)
  }

  const handleMenuItemFormSubmit = async (values) => {
    let menuItemOptslot = {
      menuId: Number(values.menuId),
      foodItemId: Number(values.foodItemId),
      operationSlots: []
    }

    // if (!values.isSeperateOption) {
    values.optsSate.filter((O) => O.checked === true)
      .map((optState, index) => {
        const tabIndex = !values.isSeperateOption ? 0 : index
        //prepare operationSlots
        let operationSlot = {
          optSlotId: 0,
          price: 0,
          isActive: true,
          foodCategoryIds: [],
          choicesItemOptSlots: []
        }
        operationSlot.optSlotId = optState.optSlotId
        operationSlot.price = values[`price_${tabIndex}`] ? Number(values[`price_${tabIndex}`]) : 0
        operationSlot.maxDiscountPercentage = 0
        operationSlot.isActive = true
        let categories = values.Categories
          && values.Categories.find((cat) => cat.tabIndex === tabIndex)
          && values.Categories.find((cat) => cat.tabIndex === tabIndex).categories
        categories && categories.map((cat, index) => {
          operationSlot.foodCategoryIds.push(cat.id)
        })

        // prepare "choicesItemOptSlots"
        let choicesCategories = values.choiceCategories
          && values.choiceCategories.find((cat) => cat.tabIndex === tabIndex)
          && values.choiceCategories.find((cat) => cat.tabIndex === tabIndex).choicesCategories
        choicesCategories && choicesCategories.map((cCat, index) => {
          cCat.choicesItems.map((cItem, index) => {
            let choicesItemOptSlot = {
              foodItemId: 0,
              menuId: values.menuId,
              optSlotId: 0,
              choicesCategoryId: 0,
              choicesItemId: 0,
              price: 0,
              isActive: true,
            }
            choicesItemOptSlot.foodItemId = Number(values.foodItemId)
            choicesItemOptSlot.menuId = Number(values.menuId)
            choicesItemOptSlot.optSlotId = optState.optSlotId
            choicesItemOptSlot.choicesCategoryId = cCat.id
            choicesItemOptSlot.choicesItemId = cItem.id
            choicesItemOptSlot.price = cItem.price
            choicesItemOptSlot.isActive = true
            operationSlot.choicesItemOptSlots.push(choicesItemOptSlot)
          })
        })

        menuItemOptslot.operationSlots.push(operationSlot)

      })

    values.id && (menuItemOptslot.id = values.id)
    console.log("menuItemOptslots----->", menuItemOptslot)

    // window.alert(`You submitted:\n\n${JSON.stringify(menuItemOptslot, null, 2)}`);
    let menuItemOptslots = []
    menuItemOptslots.push(menuItemOptslot)

    let response = []
    values.isEdit ? (response = await handleFoodItemOptSlotUpdate(menuItemOptslots)) : (response = await handleFoodItemOptSlotAdd(menuItemOptslots))
    //appContext.isCompany ? await handleFetchCompanyFoodItems(user.company.id) : await handleFetchBranchFoodItems(appContext.id)
    refType === "foodItems" && handleFetchFoodItemMenuItems(itemId)
    refType === "menus" && handleFetchMenuFoodItems(itemId)

    handleFoodItemModalClose();
  }

  const handleFoodItemActionClick = async (action, rowData) => {
    let foodItemId = null
    let menuId = null
    refType === "foodItems" ? foodItemId = Number(itemId) : foodItemId = rowData.id
    refType === "foodItems" ? menuId = Number(rowData.id) : menuId = Number(itemId)

    const optData = await fetchFoodItemOptSlotById(menuId, foodItemId)
    let updateData = optData.data;
    updateData.isSeperateOption = true;

    if (action === fooditemOptions[0].displayName) {
      updateData.isEdit = true
      await setFoodItemUpdateData(updateData);

      refType === "foodItems" && handleFetchFoodItemMenuItems(itemId)
      refType === "menus" && handleFetchMenuFoodItems(itemId)
      setFoodItemModalOpen(true);
    } else if (action === fooditemOptions[1].displayName) {
      updateData.isActive = false
      setMenuItemUpdateData(updateData)
      setSelectOptModalOpen(true)
    } else if (action === fooditemOptions[2].displayName) {
      updateData.isActive = true
      setMenuItemUpdateData(updateData)
      setSelectOptModalOpen(true)
    } else if (action === fooditemOptions[3].displayName) {
      await handleFoodItemOptSlotDelete(menuId, foodItemId)

      refType === "foodItems" && handleFetchFoodItemMenuItems(itemId)
      refType === "menus" && handleFetchMenuFoodItems(itemId)
    }
  }

  const handleMenuPublish = async () => {
    await handlePublishMenu(user.company.id, itemId)
  }

  const handleCompanyMenuChange = (appContext) => {
    setAppContext(appContext)
    // appContext.isCompany ? await handleFetchCompanyFoodItems(user.company.id) : await handleFetchBranchFoodItems(appContext.id)
  };

  const handleOrderUpClick = (rowdata) => {
    alert(rowdata.id)
  }
  const handleOrderDownClick = (rowdata) => {
    alert(rowdata.id)
  }

  useEffect(() => {
    refType === "foodItems" && handleFetchFoodItemMenuItems(itemId)
    refType === "menus" && handleFetchMenuFoodItems(itemId)
    refType === "foodCategories" && handleFetchCategoryFoodItems(itemId)
    handleFetchCompanyChoicesGroups(user.company.id)
    // handleFetchCompanyMenus(user.company.id)
    appContext.isCompany ? handleFetchCompanyMenus(user.company.id) : handleFetchBranchMenus(appContext.id)
    // appContext.isCompany ? handleFetchCompanyFoodCategories(user.company.id) : handleFetchBranchFoodCategories(appContext.id)
    handleFetchCompanyFoodCategories(user.company.id)
    handleFetchCompanyOptSlots(user.company.id);
    handleFetchCompanyFoodItems(user.company.id);

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
          selectedMenu={refType === "menus" ? MENUS :
            refType === "foodCategories" ?
              CATEGORIES : FOODITEMS}>
        </IxAppBar>
      </Suspense>
      <IxModal style={{ "width": "10%" }}
        isSmall={true}
        modaltitle={"Select Opt slot"}
        open={selectOptModalOpen}
        handleClose={handleSelectOptModalClose}
      >
        <OptSelectForm
          onSubmit={handleStatusChangeFormSubmit}
          menuItemUpdateData={menuItemUpdateData}
          handleClose={handleSelectOptModalClose}
        >

        </OptSelectForm>
      </IxModal>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              {/* <Paper className={fixedHeightPaper}> */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Box display="flex">
                    <Box width="50%">
                      <Typography variant="h6" gutterBottom>
                        {refType === "menus" && !fooditemModalOpen && company.menus.data &&
                          <IxNavLink path="/menus"
                            name={company.menus.data.find((m) => m.id === Number(itemId)).name['en-US']}>
                          </IxNavLink>
                        }
                        {
                          refType === "foodItems" && !fooditemModalOpen && company.fooditem &&
                          <IxNavLink path="/food-items"
                            name={company.fooditem.data.name['en-US']}>
                          </IxNavLink>
                        }
                        {
                          refType === "foodCategories" && !fooditemModalOpen &&
                          company.foodcategories && company.foodcategories.data &&
                          <IxNavLink path="/food-categories"
                            name={company.foodcategories.data.find((fc) => fc.id === Number(itemId)).name['en-US']}>
                          </IxNavLink>
                        }
                      </Typography></Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      {
                        refType === "menus" && !fooditemModalOpen && appContext.isCompany &&
                        <Button variant="contained" disabled={company.isPublishing} style={{ 'margin-right': '10px' }}
                          startIcon={<PublishIcon />} color="secondary" onClick={handleMenuPublish}>
                          {company.isPublishing ? 'Publishing..' : t('NxtFoodItemHome.Publish')}
                        </Button>
                      }
                      {
                        refType === "menus" && !fooditemModalOpen && !appContext.isCompany
                        && company.menus.data &&
                        company.menus.data.find((m) => m.id === Number(itemId)).branchId &&
                        <Button variant="contained" disabled={company.isPublishing} style={{ 'margin-right': '10px' }}
                          startIcon={<PublishIcon />} color="secondary" onClick={handleMenuPublish}>
                          {company.isPublishing ? 'Publishing..' : t('NxtFoodItemHome.Publish')}
                        </Button>
                      }
                      {!fooditemModalOpen && (refType === "menus" || refType === "foodItems") &&
                        <Button variant="contained" disabled={refType === "menus" && !appContext.isCompany
                          && company.menus.data && !company.menus.data.find((m) => m.id === Number(itemId)).branchId}
                          startIcon={<AddIcon />} color="secondary" onClick={handleFoodItemModalOpen}>
                          {t('NxtFoodItemHome.New_MenuItem')}
                        </Button>}

                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Box style={{ backgroundColor: "#fff" }}>
                    <Suspense fallback={<div>{t('common.loading')}</div>}>
                      {!fooditemModalOpen && company.fooditems &&
                        company.fooditems.data &&
                        <IxTable
                          columns={columns(handleOrderUpClick, handleOrderDownClick)}
                          showActionMenu={true}
                          menuOptions={fooditemOptions}
                          data={refType === "menus" ? company.menufooditems &&
                            company.menufooditems.data ? company.menufooditems.data : [] :
                            company.fooditem && company.fooditem.data && company.fooditem.data.menus &&
                            company.fooditem.data.menus.map((m, i) => {
                              m.prepareDuration = company.fooditem.data.prepareDuration;
                              m.calorie = company.fooditem.data.calorie;
                              m.price = company.fooditem.data.defaultPrice;
                              return m;
                            })}
                          handleActionClick={handleFoodItemActionClick}>
                        </IxTable>}
                      {fooditemModalOpen && company.fooditems.data &&
                        company.foodcategories && company.foodcategories.data &&
                        company.ChoicesGroups && company.optSlots && company.optSlots.data &&
                        <MenuItemForm onSubmit={handleMenuItemFormSubmit}
                          loading={company.isLoading}
                          initialValues={fooditemUpdateData}
                          foodItems={company.fooditems.data}
                          foodCategories={company.foodcategories.data.map((fCat, index) => {
                            fCat.name = fCat.name['en-US'] ? fCat.name['en-US'] : fCat.name
                            return fCat;
                          })}
                          choicesGroups={company.ChoicesGroups.data}
                          menus={company.menus.data}
                          optSlots={company.optSlots.data}
                          handleClose={handleFoodItemModalClose}>
                        </MenuItemForm>}
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