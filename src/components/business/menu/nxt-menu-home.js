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
import {
  PLATFORM_ADMIN,
  COMPANY_ADMIN,
  BRANCH_ADMIN
} from '../../../constants/ix-user-roles'
import MenuForm from './menu-form/nxt-menu-form';
import MenuCopyForm from './menu-form/nxt-menu-copy'
import MenuOverrideForm from './menu-form/nxt-menu-override'
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import columns from './columns';
import { MENUS } from '../../../constants/left-menu';
import { IxDialogue } from '../../basic/ix-dialogue';
import useStyles from './styles'

export default function NxtMenuHome({
  dispatch,
  company,
  handleMenuAdd,
  handleMenuUpdate,
  handleChangeMenuStatus,
  handleMenuCopy,
  handleMenuOverride,
  handleMenuDelete,
  handleFetchCompanyById,
  handleFetchCompanyBranches,
  handleFetchBranchMenus,
  handleFetchCompanyMenus,
  handleFetchCompanyOptSlots,
  destroyMenuForm
}) {
  const classes = useStyles();
  const [menuModalOpen, setMenuModalOpen] = React.useState(false);
  const [menuCopyModalOpen, setCopyModalOpen] = React.useState(false);
  const [menuOverrideModalOpen, setOverrideModalOpen] = React.useState(false);
  const [menuUpdateData, setMenuUpdateData] = React.useState({});
  const [rowIdToBeDeleted, setRowIdToBeDeleted] = React.useState();
  const [openDeleteConfirmDialogue, setOpenDeleteConfirmDialogue] = React.useState(false);
  const [appContext, setAppContext] = React.useState(localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true });
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const IxModal = React.lazy(() => import('../../composite/ix-modal')); // Lazy-loaded
  const IxTable = React.lazy(() => import('../../composite/table/ix-table')); // Lazy-loaded
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleMenuModalOpen = () => {
    const branchId = !appContext.isCompany ? company.branches.data[0].id : null
    setMenuUpdateData(
      {
        "menuType": "REGULAR",
        "pricingOption": "priceOnMenu",
        "timeLimit": "noTimeLimit",
        "branchId": branchId,
        "optSlots": [],
      }
    );
    setMenuModalOpen(true);
  }
  const handleMenuModalClose = () => {
    destroyMenuForm();
    setMenuModalOpen(false);
  }

  const handleMenuCopyModalOpen = () => {

    setCopyModalOpen(true);
  }
  const handleMenuCopyModalClose = () => {

    setCopyModalOpen(false);
  }
  const handleMenuOverrideModalClose = () => {
    setOverrideModalOpen(false);
  }

  const appendArray = (form_data, values, name) => {
    if (!values && name)
      form_data.append(name, '');
    else {
      if (typeof values == 'object') {
        for (let key in values) {
          if (typeof values[key] == 'object')
            appendArray(form_data, values[key], name + '[' + key + ']');
          else
            form_data.append(name + '[' + key + ']', values[key]);
        }
      } else {
        form_data.append(name, values);
      }
    }

    return form_data;
  }

  const handleMenuCopySubmit = async (values) => {

    let menuSaveData = {};
    menuSaveData.companyId = user.company.id;
    if (values.branchId || appContext.id) {
      values.branchId = values.branchId ? Number(values.branchId) : appContext.id
    }

    !appContext.isCompany && (menuSaveData.branchId = values.branchId)

    menuSaveData.isPublished = false
    // menuSaveData.isPriceOnMenuItems = true
    menuSaveData.isPackage = false
    // menuSaveData.isDiscount = false
    menuSaveData.isTimeBound = false

    let nameObj = {}
    values.name_en && values.name_en !== "" && (nameObj['en-US'] = values.name_en)
    values.name_ja && values.name_ja !== "" && (nameObj['ja-JP'] = values.name_ja)
    values.name_ko && values.name_ko !== "" && (nameObj['ko-KR'] = values.name_ko)
    values.name_zh && values.name_zh !== "" && (nameObj['zh-CN'] = values.name_zh)
    menuSaveData.name = nameObj;

    menuSaveData.menuType = values.menuType;

    if (values.menuType === 'REGULAR') {
      // menuSaveData.isPriceOnMenuItems = true
      menuSaveData.packagePrice = 0
      menuSaveData.packageDiscountPercentage = 0
      menuSaveData.isTimeBound = false
      menuSaveData.timeBoundDuration = 0
      menuSaveData.lastTimeToOrder = 0
      menuSaveData.reminderTime = 0
    }
    if (values.menuType === 'ALL_YOU_CAN_EAT' || values.menuType === 'ALL_YOU_CAN_DRINK') {
      // menuSaveData.isPriceOnMenuItems = false
      menuSaveData.isPackage = true;
      menuSaveData.packageDiscountPercentage = 0
      menuSaveData.packagePrice = Number(values.packagePrice)
      menuSaveData.isTimeBound = true
      menuSaveData.timeBoundDuration = values.timeBoundDuration ? Number(values.timeBoundDuration) : 0
      menuSaveData.lastTimeToOrder = values.lastTimeToOrder ? Number(values.lastTimeToOrder) : 0
      menuSaveData.reminderTime = values.reminderTime ? Number(values.reminderTime) : 0
    }

    if (values.menuType === 'HAPPY_HOUR') {
      // menuSaveData.isPriceOnMenuItems = false
      // menuSaveData.isDiscount = true
      menuSaveData.packagePrice = 0
      menuSaveData.isTimeBound = true
      menuSaveData.timeBoundDuration = 0
      menuSaveData.lastTimeToOrder = 0
      menuSaveData.reminderTime = values.reminderTime ? Number(values.reminderTime) : 0
      menuSaveData.packageDiscountPercentage = values.packageDiscountPercentage ? Number(values.packageDiscountPercentage) : 0
    }

    if (values.menuType === 'CUSTOM') {
      values.timeLimit === 'timeLimit' ? (menuSaveData.isTimeBound = true) : (menuSaveData.isTimeBound = false)
      !values.packagePrice ? (menuSaveData.packagePrice = 0) : (menuSaveData.packagePrice = Number(values.packagePrice))
      !values.packageDiscountPercentage ? (menuSaveData.packageDiscountPercentage = 0) : (menuSaveData.packageDiscountPercentage = Number(values.packageDiscountPercentage))
      !values.lastTimeToOrder ? (menuSaveData.lastTimeToOrder = 0) : (menuSaveData.lastTimeToOrder = Number(values.lastTimeToOrder))
      !values.timeBoundDuration ? (menuSaveData.timeBoundDuration = 0) : (menuSaveData.timeBoundDuration = Number(values.timeBoundDuration))
      !values.reminderTime ? (menuSaveData.reminderTime = 0) : (menuSaveData.reminderTime = Number(values.reminderTime))
      // !values.pricingOption || values.pricingOption === 'priceOnMenu' ? (menuSaveData.isPriceOnMenuItems = true) : (menuSaveData.isPriceOnMenuItems = false)
      values.pricingOption === 'priceOfAllMenu' ? (menuSaveData.isPackage = true) : (menuSaveData.isPackage = false)
      // values.pricingOption === 'discountPrice' ? (menuSaveData.isDiscount = true) : (menuSaveData.isDiscount = false)
    }

    let optSlots = []
    values.optSlots.length > 0 && values.optSlots.map(o => {
      optSlots.push({ "optSlotId": Number(o.optSlotId) })
    })
    menuSaveData.optSlots = optSlots;
    values.id && (menuSaveData.id = Number(values.id))
    menuSaveData.isActive = values.isActive === null ? false : true;
    // window.alert(`You submitted:\n\n${JSON.stringify(menuSaveData, null, 2)}`);
    menuSaveData.name = JSON.stringify(menuSaveData.name)
    menuSaveData.name = `\"${menuSaveData.name.split('"').join('\\\"')}\"`
    //menuSaveData.name =  '\"{\\\"en-US\\\":\\\"Launch_en\\\"}\"'
    menuSaveData.keyName = values.keyName
    // menuSaveData.optSlots = [menuSaveData.optSlots]
    values.imageFile && (menuSaveData.imageFile = values.imageFile)
    let payload = new FormData();

    for (let key in menuSaveData) {
      if (key !== 'imageFile' && typeof (menuSaveData[key]) === 'object') {
        for (let subKey in menuSaveData[key]) {
          //payload.append(`${key}.${subKey}`, menuSaveData[key][subKey]);
          payload.append(`${key}[${subKey}].optSlotId`, menuSaveData[key][subKey].optSlotId);
          //payload.append(`${key}`, menuSaveData[key][subKey]);
        }
      }
      else {
        payload.append(key, menuSaveData[key]);
      }
    }

    values.id && await handleMenuCopy(payload, menuSaveData.branchId, values.id)
    // appContext.isCompany ? await handleFetchCompanyMenus(user.company.id) : await handleFetchBranchMenus(appContext.id)
    handleMenuCopyModalClose();
  }

  const handleMenuOverrideSubmit = async (values) => {
    // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    let menuSaveData = {};
    menuSaveData.companyId = user.company.id;
    if (values.branchId || appContext.id) {
      values.branchId = values.branchId ? Number(values.branchId) : appContext.id
    }
    !appContext.isCompany && (menuSaveData.branchId = values.branchId)
    menuSaveData.isPublished = false
    // menuSaveData.isPriceOnMenuItems = true
    menuSaveData.isPackage = false
    // menuSaveData.isDiscount = false
    menuSaveData.isTimeBound = false

    let nameObj = {}
    values.name_en && values.name_en !== "" && (nameObj['en-US'] = values.name_en)
    values.name_ja && values.name_ja !== "" && (nameObj['ja-JP'] = values.name_ja)
    values.name_ko && values.name_ko !== "" && (nameObj['ko-KR'] = values.name_ko)
    values.name_zh && values.name_zh !== "" && (nameObj['zh-CN'] = values.name_zh)
    menuSaveData.name = nameObj;

    menuSaveData.menuType = values.menuType;

    if (values.menuType === 'REGULAR') {
      // menuSaveData.isPriceOnMenuItems = true
      menuSaveData.packagePrice = 0
      menuSaveData.packageDiscountPercentage = 0
      menuSaveData.isTimeBound = false
      menuSaveData.timeBoundDuration = 0
      menuSaveData.lastTimeToOrder = 0
      menuSaveData.reminderTime = 0
    }
    if (values.menuType === 'ALL_YOU_CAN_EAT' || values.menuType === 'ALL_YOU_CAN_DRINK') {
      // menuSaveData.isPriceOnMenuItems = false
      menuSaveData.isPackage = true;
      menuSaveData.packageDiscountPercentage = 0
      menuSaveData.packagePrice = Number(values.packagePrice)
      menuSaveData.isTimeBound = true
      menuSaveData.timeBoundDuration = values.timeBoundDuration ? Number(values.timeBoundDuration) : 0
      menuSaveData.lastTimeToOrder = values.lastTimeToOrder ? Number(values.lastTimeToOrder) : 0
      menuSaveData.reminderTime = values.reminderTime ? Number(values.reminderTime) : 0
    }

    if (values.menuType === 'HAPPY_HOUR') {
      // menuSaveData.isPriceOnMenuItems = false
      // menuSaveData.isDiscount = true
      menuSaveData.packagePrice = 0
      menuSaveData.isTimeBound = true
      menuSaveData.timeBoundDuration = 0
      menuSaveData.lastTimeToOrder = 0
      menuSaveData.reminderTime = values.reminderTime ? Number(values.reminderTime) : 0
      menuSaveData.packageDiscountPercentage = values.packageDiscountPercentage ? Number(values.packageDiscountPercentage) : 0
    }

    if (values.menuType === 'CUSTOM') {
      values.timeLimit === 'timeLimit' ? (menuSaveData.isTimeBound = true) : (menuSaveData.isTimeBound = false)
      !values.packagePrice ? (menuSaveData.packagePrice = 0) : (menuSaveData.packagePrice = Number(values.packagePrice))
      !values.packageDiscountPercentage ? (menuSaveData.packageDiscountPercentage = 0) : (menuSaveData.packageDiscountPercentage = Number(values.packageDiscountPercentage))
      !values.lastTimeToOrder ? (menuSaveData.lastTimeToOrder = 0) : (menuSaveData.lastTimeToOrder = Number(values.lastTimeToOrder))
      !values.timeBoundDuration ? (menuSaveData.timeBoundDuration = 0) : (menuSaveData.timeBoundDuration = Number(values.timeBoundDuration))
      !values.reminderTime ? (menuSaveData.reminderTime = 0) : (menuSaveData.reminderTime = Number(values.reminderTime))
      // !values.pricingOption || values.pricingOption === 'priceOnMenu' ? (menuSaveData.isPriceOnMenuItems = true) : (menuSaveData.isPriceOnMenuItems = false)
      values.pricingOption === 'priceOfAllMenu' ? (menuSaveData.isPackage = true) : (menuSaveData.isPackage = false)
      // values.pricingOption === 'discountPrice' ? (menuSaveData.isDiscount = true) : (menuSaveData.isDiscount = false)
    }

    let optSlots = []
    values.optSlots.length > 0 && values.optSlots.map(o => {
      optSlots.push({ "optSlotId": Number(o.optSlotId) })
    })
    menuSaveData.optSlots = optSlots;
    values.id && (menuSaveData.id = Number(values.id))
    menuSaveData.isActive = values.isActive === null ? false : true;
    // window.alert(`You submitted:\n\n${JSON.stringify(menuSaveData, null, 2)}`);
    menuSaveData.name = JSON.stringify(menuSaveData.name)
    menuSaveData.name = `\"${menuSaveData.name.split('"').join('\\\"')}\"`
    //menuSaveData.name =  '\"{\\\"en-US\\\":\\\"Launch_en\\\"}\"'
    menuSaveData.keyName = values.keyName
    // menuSaveData.optSlots = [menuSaveData.optSlots]
    values.imageFile && (menuSaveData.imageFile = values.imageFile)
    let payload = new FormData();

    for (let key in menuSaveData) {
      if (key !== 'imageFile' && typeof (menuSaveData[key]) === 'object') {
        for (let subKey in menuSaveData[key]) {
          //payload.append(`${key}.${subKey}`, menuSaveData[key][subKey]);
          payload.append(`${key}[${subKey}].optSlotId`, menuSaveData[key][subKey].optSlotId);
          //payload.append(`${key}`, menuSaveData[key][subKey]);
        }
      }
      else {
        payload.append(key, menuSaveData[key]);
      }
    }

    values.id && await handleMenuOverride(payload, menuSaveData.branchId, values.id)
    // appContext.isCompany ? await handleFetchCompanyMenus(user.company.id) : await handleFetchBranchMenus(appContext.id)
    handleMenuOverrideModalClose();
  }

  const handleMenuSubmit = async (values) => {
    let menuSaveData = {};
    menuSaveData.companyId = user.company.id;
    if (values.branchId || appContext.id) {
      values.branchId = values.branchId ? Number(values.branchId) : appContext.id
    }

    !appContext.isCompany && (menuSaveData.branchId = values.branchId)

    menuSaveData.isPublished = false
    // menuSaveData.isPriceOnMenuItems = true
    menuSaveData.isPackage = false
    // menuSaveData.isDiscount = false
    menuSaveData.isTimeBound = false

    let nameObj = {}
    values.name_en && values.name_en !== "" && (nameObj['en-US'] = values.name_en)
    values.name_ja && values.name_ja !== "" && (nameObj['ja-JP'] = values.name_ja)
    values.name_ko && values.name_ko !== "" && (nameObj['ko-KR'] = values.name_ko)
    values.name_zh && values.name_zh !== "" && (nameObj['zh-CN'] = values.name_zh)
    menuSaveData.name = nameObj;

    menuSaveData.menuType = values.menuType;

    if (values.menuType === 'REGULAR') {
      // menuSaveData.isPriceOnMenuItems = true
      menuSaveData.packagePrice = 0
      menuSaveData.packageDiscountPercentage = 0
      menuSaveData.isTimeBound = false
      menuSaveData.timeBoundDuration = 0
      menuSaveData.lastTimeToOrder = 0
      menuSaveData.reminderTime = 0
    }
    if (values.menuType === 'ALL_YOU_CAN_EAT' || values.menuType === 'ALL_YOU_CAN_DRINK') {
      // menuSaveData.isPriceOnMenuItems = false
      menuSaveData.isPackage = true;
      menuSaveData.packageDiscountPercentage = 0
      menuSaveData.packagePrice = Number(values.packagePrice)
      menuSaveData.isTimeBound = true
      menuSaveData.timeBoundDuration = values.timeBoundDuration ? Number(values.timeBoundDuration) : 0
      menuSaveData.lastTimeToOrder = values.lastTimeToOrder ? Number(values.lastTimeToOrder) : 0
      menuSaveData.reminderTime = values.reminderTime ? Number(values.reminderTime) : 0
    }

    if (values.menuType === 'HAPPY_HOUR') {
      // menuSaveData.isPriceOnMenuItems = false
      // menuSaveData.isDiscount = true
      menuSaveData.packagePrice = 0
      menuSaveData.isTimeBound = true
      menuSaveData.timeBoundDuration = 0
      menuSaveData.lastTimeToOrder = 0
      menuSaveData.reminderTime = values.reminderTime ? Number(values.reminderTime) : 0
      menuSaveData.packageDiscountPercentage = values.packageDiscountPercentage ? Number(values.packageDiscountPercentage) : 0
    }

    if (values.menuType === 'CUSTOM') {
      values.timeLimit === 'timeLimit' ? (menuSaveData.isTimeBound = true) : (menuSaveData.isTimeBound = false)
      !values.packagePrice ? (menuSaveData.packagePrice = 0) : (menuSaveData.packagePrice = Number(values.packagePrice))
      !values.packageDiscountPercentage ? (menuSaveData.packageDiscountPercentage = 0) : (menuSaveData.packageDiscountPercentage = Number(values.packageDiscountPercentage))
      !values.lastTimeToOrder ? (menuSaveData.lastTimeToOrder = 0) : (menuSaveData.lastTimeToOrder = Number(values.lastTimeToOrder))
      !values.timeBoundDuration ? (menuSaveData.timeBoundDuration = 0) : (menuSaveData.timeBoundDuration = Number(values.timeBoundDuration))
      !values.reminderTime ? (menuSaveData.reminderTime = 0) : (menuSaveData.reminderTime = Number(values.reminderTime))
      // !values.pricingOption || values.pricingOption === 'priceOnMenu' ? (menuSaveData.isPriceOnMenuItems = true) : (menuSaveData.isPriceOnMenuItems = false)
      values.pricingOption === 'priceOfAllMenu' ? (menuSaveData.isPackage = true) : (menuSaveData.isPackage = false)
      // values.pricingOption === 'discountPrice' ? (menuSaveData.isDiscount = true) : (menuSaveData.isDiscount = false)
    }

    let optSlots = []
    values.optSlots.length > 0 && values.optSlots.map(o => {
      optSlots.push({ "optSlotId": Number(o.optSlotId) })
    })
    menuSaveData.optSlots = optSlots;
    values.id && (menuSaveData.id = Number(values.id))
    menuSaveData.isActive = values.isActive === null ? false : true;
    // window.alert(`You submitted:\n\n${JSON.stringify(menuSaveData, null, 2)}`);
    menuSaveData.name = JSON.stringify(menuSaveData.name)
    menuSaveData.name = `\"${menuSaveData.name.split('"').join('\\\"')}\"`
    //menuSaveData.name =  '\"{\\\"en-US\\\":\\\"Launch_en\\\"}\"'
    menuSaveData.keyName = values.keyName
    // menuSaveData.optSlots = [menuSaveData.optSlots]
    values.imageFile && (menuSaveData.imageFile = values.imageFile)
    let payload = new FormData();

    for (let key in menuSaveData) {
      if (key !== 'imageFile' && typeof (menuSaveData[key]) === 'object') {
        for (let subKey in menuSaveData[key]) {
          //payload.append(`${key}.${subKey}`, menuSaveData[key][subKey]);
          payload.append(`${key}[${subKey}].optSlotId`, menuSaveData[key][subKey].optSlotId);
          //payload.append(`${key}`, menuSaveData[key][subKey]);
        }
      }
      else {
        payload.append(key, menuSaveData[key]);
      }
    }

    values.id ? await handleMenuUpdate(payload, values.id) : await handleMenuAdd(payload)
    // appContext.isCompany ? await handleFetchCompanyMenus(user.company.id) : await handleFetchBranchMenus(appContext.id)
    handleMenuModalClose();
  }

  const handleMenuActionClick = async (action, rowdata) => {
    let menuSaveData = {};
    menuSaveData.id = rowdata.id;
    menuSaveData.companyId = rowdata.companyId;
    menuSaveData.branchId = rowdata.branchId;
    rowdata.menuType === "REGULAR" && (menuSaveData.pricingOption = "priceOnMenu")
    if (rowdata.menuType === "ALL_YOU_CAN_EAT" || rowdata.menuType === "ALL_YOU_CAN_DRINK") {
      menuSaveData.pricingOption = "priceOfAllMenu"
    }

    rowdata.menuType === "HAPPY_HOUR" && (menuSaveData.pricingOption = "discountPrice")
    rowdata.isTimeBound === false ? (menuSaveData.timeLimit = "noTimeLimit") : (menuSaveData.timeLimit = "timeLimit")

    rowdata.name['en-US'] && rowdata.name['en-US'] !== "" && (menuSaveData.name_en = rowdata.name['en-US'])
    rowdata.name['ja-JP'] && rowdata.name['ja-JP'] !== "" && (menuSaveData.name_ja = rowdata.name['ja-JP'])
    rowdata.name['ko-KR'] && rowdata.name['ko-KR'] !== "" && (menuSaveData.name_ko = rowdata.name['ko-KR'])
    rowdata.name['zh-CN'] && rowdata.name['zh-CN'] !== "" && (menuSaveData.name_zh = rowdata.name['zh-CN'])

    rowdata.packageDiscountPercentage > 0 && (menuSaveData.packageDiscountPercentage = rowdata.packageDiscountPercentage)
    rowdata.packagePrice > 0 && (menuSaveData.packagePrice = rowdata.packagePrice)

    rowdata.timeBoundDuration > 0 && (menuSaveData.timeBoundDuration = rowdata.timeBoundDuration)
    rowdata.lastTimeToOrder > 0 && (menuSaveData.lastTimeToOrder = rowdata.lastTimeToOrder)
    rowdata.reminderTime > 0 && (menuSaveData.reminderTime = rowdata.reminderTime)

    menuSaveData.menuType = rowdata.menuType;
    menuSaveData.optSlots = rowdata.optSlots;
    menuSaveData.isActive = rowdata.isActive;
    menuSaveData.name = JSON.stringify(menuSaveData.name)
    menuSaveData.keyName = rowdata.keyName
    rowdata.photo && (menuSaveData.photo = rowdata.photo)


    if (action === t('MenuActionLabel.Edit')) {
      setMenuUpdateData(menuSaveData);
      setMenuModalOpen(true);
    } else if (action === t('MenuActionLabel.Copy_Edit')) {
      menuSaveData.keyName = ""
      menuSaveData.id = null;
      setMenuUpdateData(menuSaveData);
      setMenuModalOpen(true);
    } else if (action === t('MenuActionLabel.Copy_All')) {
      menuSaveData.id = null;
      menuSaveData.isDeepCopy = true;
      setMenuUpdateData(menuSaveData);
      setMenuModalOpen(true);
    }

    else if (action === t('MenuActionLabel.MakeInactive')) {
      await handleChangeMenuStatus(menuSaveData.id, false)
      handleMenuModalClose();
    }
    else if (action === t('MenuActionLabel.MakeActive')) {
      await handleChangeMenuStatus(menuSaveData.id, true)
      // await handleMenuUpdate({ "id": menuSaveData.id, "isActive": !menuSaveData.isActive });
      // appContext.isCompany ? await handleFetchCompanyMenus(user.company.id) : await handleFetchBranchMenus(appContext.id)
      handleMenuModalClose();
    }
    else if (action === t('MenuActionLabel.Delete')) {
      //Delete
      setRowIdToBeDeleted(menuSaveData.id);
      setOpenDeleteConfirmDialogue(true);
      // appContext.isCompany ? await handleFetchCompanyMenus(user.company.id) : await handleFetchBranchMenus(appContext.id)
      // handleMenuModalClose();
    }
    else if (action === t('MenuActionLabel.Copy_Company_menu')) {
      setMenuUpdateData(menuSaveData);
      setCopyModalOpen(true);

    }
    else if (action === t('MenuActionLabel.Override')) {
      setMenuUpdateData(menuSaveData);
      setOverrideModalOpen(true);

    }

  }

  const handleCompanyMenuChange = (appContext) => {
    setAppContext(appContext);
    appContext.isCompany ? handleFetchCompanyMenus(user.company.id)
      : handleFetchBranchMenus(appContext.id)
  };

  const handleOrderUpClick = (rowdata) => {
    alert(rowdata.id)
  }
  const handleOrderDownClick = (rowdata) => {
    alert(rowdata.id)
  }

  const handleDeleteConfirmed = async () => {
    await handleMenuDelete(rowIdToBeDeleted)
    setOpenDeleteConfirmDialogue(false);
  };



  useEffect(() => {

    appContext.isCompany ? handleFetchCompanyMenus(user.company.id)
      : handleFetchBranchMenus(appContext.id)
    handleFetchCompanyOptSlots(user.company.id);

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
          selectedMenu={MENUS}>
        </IxAppBar>
      </Suspense>
      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxModal modaltitle={menuUpdateData.id ? t('MenuForm.EditTitle') : t('MenuForm.title')} open={menuModalOpen} handleClose={handleMenuModalClose}>
          {menuModalOpen &&
            <MenuForm onSubmit={handleMenuSubmit}
              loading={company.isLoading}
              initialValues={menuUpdateData}
              // branches={appContext.isCompany ? company.branches.data : null}
              optSlotsData={company.optSlots.data}
              handleClose={handleMenuModalClose}>
            </MenuForm>}
        </IxModal>
        <IxModal modaltitle={t('MenuForm.copyMenu')}
          isSmall={true}
          open={menuCopyModalOpen}
          handleClose={handleMenuCopyModalClose}>
          {menuCopyModalOpen &&
            <MenuCopyForm onSubmit={handleMenuCopySubmit}
              loading={company.isLoading}
              initialValues={menuUpdateData}
              handleClose={handleMenuCopyModalClose}>
            </MenuCopyForm>}
        </IxModal>
        <IxModal modaltitle={t('MenuForm.overrideMenu')}
          isSmall={true}
          open={menuOverrideModalOpen}
          handleClose={handleMenuOverrideModalClose}>
          {menuOverrideModalOpen &&
            <MenuOverrideForm onSubmit={handleMenuOverrideSubmit}
              loading={company.isLoading}
              initialValues={menuUpdateData}
              handleClose={handleMenuOverrideModalClose}>
            </MenuOverrideForm>}
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
                        {t('NxtMenuHome.title')}
                      </Typography></Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      <Button variant="contained" startIcon={<AddIcon />} color="secondary" onClick={handleMenuModalOpen}>
                        {t('NxtMenuHome.New_Menu')}
                      </Button>
                    </Box>
                  </Box>

                </Grid>
                <Grid className={classes.tableWrapper} item xs={12} md={12} lg={12}>
                  <Box>
                    <Suspense fallback={<div>{t('common.loading')}</div>}>
                      <IxTable
                        columns={columns(handleOrderUpClick, handleOrderDownClick)}
                        showActionMenu={true}
                        // menuOptions={appContext.isCompany ? companyMenuOptions : branchMenuOptions}
                        data={company.menus.data}
                        pageName="menus"
                        handleActionClick={handleMenuActionClick}>
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
}