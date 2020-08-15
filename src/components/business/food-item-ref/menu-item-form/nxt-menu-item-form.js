import React, { useEffect, Suspense, useRef } from 'react';
import clsx from 'clsx';
import { Field, FieldArray, reduxForm } from 'redux-form'
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './style';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import DialogActions from '@material-ui/core/DialogActions';
import { deepOrange, green, grey, red } from '@material-ui/core/colors';
import validate from './validate'
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import IxSelectField from '../../../basic/ix-selectfield';
import IxSelect from '../../../basic/ix-select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IxSwitch from '../../../basic/ix-switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IxAutoCompleteForm from '../../../basic/ix-auto-complete-form';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import IxAutoComplete from '../../../basic/ix-auto-complete';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InfoIcon from '@material-ui/icons/Info';
import { Divider } from '@material-ui/core';
import { useTranslation } from 'react-i18next'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';


function TabPanelAdd({ children, value, index, ...other }) {
  // const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

const timeFormater = (time) => {
  let timeHour = time.split('T')[1] ? time.split('T')[1].substring(0, 5) : time
  let [hours, minutes] = timeHour.split(":");

  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  // minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

let MenuItemForm = (props) => {
  const { handleSubmit, handleClose, pristine, reset,
    submitting, error, loading, foodItems, foodCategories,
    menus, optSlots, choicesGroups, initialValues } = props

  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const [tabValue, setTabValue] = React.useState(0);
  const [tabPanelCount, setTabPanelCount] = React.useState(0);

  const [expandedDetail, setExpandedDetail] = React.useState(true);
  const [expandedCategory, setExpandedCategory] = React.useState(true);
  const [expandedChoice, setExpandedChoice] = React.useState(true);
  const [expandedPrice, setExpandedPrice] = React.useState(true);

  const [isSeperateOption, setSeperateOption] = React.useState(initialValues.isSeperateOption)
  const [choicesCategories, setChoicesCategories] = React.useState([])
  const [selectedCategories, setSelectedCategories] = React.useState([])
  const [selectedMenu, setSelectedMenu] = React.useState(
    initialValues.menuId ? menus.find((m) => m.id === Number(initialValues.menuId)) : menus[0]
  )

  const [optsSate, setOptsSate] = React.useState(
    initialValues.menuId ?
      menus.find((m) => m.id === Number(initialValues.menuId)).optSlots.map((opt) => {
        const optObj = {}
        optObj.optSlotId = opt.optSlotId
        optObj.checked = true
        return optObj
      }) :
      menus[0].optSlots.map((opt) => {
        const optObj = {}
        optObj.optSlotId = opt.optSlotId
        optObj.checked = true
        return optObj
      })
  )

  useEffect(() => {
    //set edit data
    if (initialValues.isEdit) {
      //set optslots
      setOptsSate(initialValues.operationSlots.map((opt, index) => {
        const optObj = {}
        optObj.optSlotId = opt.optSlotId
        optObj.checked = true
        return optObj
      }))

      props.change("optsSate", initialValues.operationSlots.map((opt, index) => {
        const optObj = {}
        optObj.optSlotId = opt.optSlotId
        optObj.checked = true
        return optObj
      }));

      //categories
      let selectedCategories = []
      initialValues.operationSlots.map((opt, index) => {
        let categories = []
        return selectedCategories.push({
          tabIndex: index,
          categories: opt.foodCategoryIds.map((catId, i) => {
            return foodCategories.find((fcat) => fcat.id === catId)
          })
        })
      })
      setSelectedCategories(selectedCategories)
      props.change("Categories", selectedCategories)
      //choices Item
      let choicesCategoriesEdit = []
      initialValues.operationSlots.map((opt, index) => {
        const cGroup = _.groupBy(opt.choicesItemOptSlots, 'choicesCategoryId');
        Object.keys(cGroup).map((cGroupId) => {
          const cCatGroup = choicesGroups.find((cg) => cg.id === Number(cGroupId))
          let cCatGroupCopy = JSON.parse(JSON.stringify(cCatGroup))

          const tabcCat = choicesCategoriesEdit.find((ccat) => ccat.tabIndex === index)
          tabcCat ? tabcCat.choicesCategories.push(cCatGroupCopy) :
            choicesCategoriesEdit.push(
              {
                tabIndex: index,
                choicesCategories: [cCatGroupCopy]
              }
            )
        })
      })

      setChoicesCategories(choicesCategoriesEdit)
      props.change("choiceCategories", choicesCategoriesEdit)

      //price
      initialValues.operationSlots.map((opt, index) => {
        props.change(`price_${index}`, opt.price);
      })
    } else {
      props.change("optsSate", optsSate);
    }

  }, []);


  const handleOptChange = (event) => {
    //props.change(event.target.name, event.target.checked);
    const optsList = [...optsSate];
    let opt = optsList.find((O) => O.optSlotId === Number(event.target.name))
    if (opt) {
      optsList.find((O) => O.optSlotId === Number(event.target.name)).checked = event.target.checked
    } else {
      opt = selectedMenu.optSlots.find((O) => O.optSlotId === Number(event.target.name))
      const optObj = {}
      optObj.optSlotId = opt.optSlotId
      optObj.checked = true
      optsList.push(optObj)
    }
    props.change("optsSate", optsList)
    setOptsSate(optsList);
  };

  const handleMenuChange = (event) => {
    const menu = menus.find((m) => {
      return m.id.toString() === event.target.value;
    })
    setSelectedMenu(menu)
    setOptsSate(menu.optSlots.map((opt) => {
      const optObj = {}
      optObj.optSlotId = opt.optSlotId
      optObj.checked = true
      return optObj
    }))

    props.change("optsSate", menu.optSlots.map((opt) => {
      const optObj = {}
      optObj.optSlotId = opt.optSlotId
      optObj.checked = true
      return optObj
    }));
  }

  const handleChangeAutoComplete = (tabIndex, event, newValue) => {
    const stateCategories = [...selectedCategories];
    const tabCat = stateCategories.find((cat) => cat.tabIndex === tabIndex)
    tabCat ? (tabCat.categories = newValue) : stateCategories.push(
      {
        tabIndex: tabIndex,
        categories: newValue
      }
    )
    setSelectedCategories(stateCategories)
    props.change("Categories", stateCategories)
  }

  const handleChoicesCatChange = (event) => {

  }

  const handleExpandDetailClick = () => {
    setExpandedDetail(!expandedDetail);
  };

  const handleExpandCategoryClick = () => {
    setExpandedCategory(!expandedCategory);
  };

  const handleExpandChoiceClick = () => {
    setExpandedChoice(!expandedChoice);
  };

  const handleExpandedPriceClick = () => {
    setExpandedPrice(!expandedPrice);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddChoicesCategory = (event, tabIndex) => {
    const choicesCategoriesSate = [...choicesCategories];
    const selectedChoiceCatId = document.getElementsByName(`choicesCategoryId_${tabIndex}`)[0].value
    const cCatGroup = choicesGroups.find((cGroup) => cGroup.id === Number(selectedChoiceCatId))

    let cCatGroupCopy = JSON.parse(JSON.stringify(cCatGroup))
    // Object.keys(cCatGroup).map((key, index) => {
    //   cCatGroupCopy[key] = cCatGroup[key]
    // })

    const tabcCat = choicesCategoriesSate.find((ccat) => ccat.tabIndex === tabIndex)
    tabcCat ? tabcCat.choicesCategories.push(cCatGroupCopy) :
      choicesCategoriesSate.push(
        {
          tabIndex: tabIndex,
          choicesCategories: [cCatGroupCopy]
        }
      )
    setChoicesCategories(choicesCategoriesSate)
    props.change("choiceCategories", choicesCategoriesSate)

    // const selectedChoiceCatId = document.getElementsByName(`choicesCategoryId_${tabIndex}`)[0].value
    // setChoicesCategories([...choicesCategories, Number(selectedChoiceCatId)])
  }

  const handleSeperateOption = (event) => {
    setSeperateOption(event.target.checked)
  }

  function TabPanel({ children, value, index, ...other }) {
    // const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
  }

  const renderTabs = ({ input, children, label, meta: { touched, invalid, value, error }, ...rest }) => {
    return (
      <Box mb={1}>
        <Tabs {...input} {...rest}
          value={tabValue}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleTabChange}
          aria-label=""
        >
          {children}
        </Tabs>
      </Box>
    )
  }

  const renderTabPanelsAdd = (tabIndex) => {
    return <TabPanelAdd value={tabValue} index={tabIndex}>
      <Box display="flex">
        <Box width="90%" pt={2} pl={1}>
          <Typography paragraph variant="Category">{t('MenuItemForm.category')}</Typography>
        </Box>
        <Box>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expandedCategory,
            })}
            onClick={handleExpandCategoryClick}
            aria-expanded={expandedCategory}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Box>

      <Collapse in={expandedCategory} timeout="auto">
        <Box width="50%" ml={1}>
          <Field
            name={`category_${tabIndex}`}
            id={`category_${tabIndex}`}
            component={IxAutoComplete}
            options={foodCategories}
            displayProperty={"name"}
            defaultValue={
              selectedCategories.find((cat) => cat.tabIndex === tabIndex) ?
                selectedCategories.find((cat) => cat.tabIndex === tabIndex).categories :
                []
            }
            onChangeAutoComplete={
              (event, newValue) => handleChangeAutoComplete(tabIndex, event, newValue)
            }
            placeholder={"Select Category"}
            label={t("MenuItemForm.MenuCategories")}
          />
        </Box>
        <Box width="70%" p={1}>
          <Typography variant="caption" display="block" gutterBottom style={{ 'font-size': '10px' }}>
          {t('MenuItemForm.category_message')}
      </Typography>
        </Box>
        <Box ml={1} my={1}>
          <Link href="#" color="secondary">{t('MenuItemForm.add_new_cat')}</Link>
        </Box>
        <Box display={"flex"} width="70%" ml={1} mt={2} p={1} border={1} borderColor="grey.400" borderRadius={4}>
          <Box mr={1}>
            <InfoIcon color="secondary"></InfoIcon>
          </Box>

          <Typography variant="caption" display="block" gutterBottom style={{ 'font-size': '10px' }}>
           {t('MenuItemForm.category_message_1')}
      </Typography>
        </Box>
      </Collapse>

      <Box display="flex">
        <Box width="90%" pt={2} pl={1}>
          <Typography paragraph variant="paragraph">{t('MenuItemForm.choice_option')}</Typography>
        </Box>
        <Box>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expandedChoice,
            })}
            onClick={handleExpandChoiceClick}
            aria-expanded={expandedChoice}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={expandedChoice} timeout="auto">
        <Box display="flex">
          <Box mb={1} width="40%">
            <Field
              name={`choicesCategoryId_${tabIndex}`}
              component={IxSelectField}
              isNative={false}
              onChange={handleChoicesCatChange}
              label={t('MenuItemForm.choicesOption')}
            >
              {choicesGroups && choicesGroups.map((cGroup, index) => {
                return <MenuItem value={cGroup.id}>
                  <Box>
                    <Box fontSize={16}>{cGroup.name['en-US']}</Box>
                    <Box mt={1}>
                      {cGroup.choicesItems && cGroup.choicesItems.map((cItem, index) => {
                        let html = []
                        index < 3 && html.push(`${cItem.name['en-US']}, `)
                        index > 3 && html.push(`+${cGroup.choicesItems.length - 3} left`)
                        return html
                      })}
                    </Box>
                  </Box>
                </MenuItem >
              })}
            </Field>
          </Box>
          <Box mt={1} ml={1}>
            <Button variant="contained" style={{ 'padding': '12px' }}
              onClick={(event) => handleAddChoicesCategory(event, tabIndex)}
              color="secondary">
              {t('common.add')}
            </Button>
          </Box>
        </Box>

        {choicesCategories.find((cCat) => cCat.tabIndex === tabIndex) &&
          <Box border={1} borderColor="grey.400" borderRadius={4} ml={1} mt={1} width="70%">
            {renderExpansionPanel(tabIndex)}
          </Box>}
        <Box mt={1} ml={1}>
          <Link href="#" color="secondary">{t('MenuItemForm.add_new_choice_group')}</Link>
        </Box>
      </Collapse>

      <Box display="flex">
        <Box width="90%" pt={2} pl={1}>
          <Typography paragraph variant="paragraph">{t('MenuItemForm.menu_pricing')}</Typography>
        </Box>
        <Box>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expandedPrice,
            })}
            onClick={handleExpandedPriceClick}
            aria-expanded={expandedPrice}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={expandedPrice} timeout="auto">
        <Box display="flex" >
          <Box width="30%">
            <Field
              name={`price_${tabIndex}`}
              component={IxTextFieldForm}
              label={t("MenuItemForm.regularPrice")}
            />
          </Box>
          <Box width="70%" p={1} pt={3}>
            <Typography variant="caption" display="block" gutterBottom style={{ 'font-size': '10px' }}>
              {t('MenuItemForm.menu_pricing_message')}
      </Typography>
          </Box>
        </Box>
      </Collapse>

    </TabPanelAdd>

  }

  const renderTabPanelsEdit = (tabIndex) => {
    return <TabPanel value={tabValue} index={tabIndex}>
      <Box display="flex">
        <Box width="90%" pt={2} pl={1}>
          <Typography paragraph variant="Category">Category</Typography>
        </Box>
        <Box>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expandedCategory,
            })}
            onClick={handleExpandCategoryClick}
            aria-expanded={expandedCategory}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Box>

      <Collapse in={expandedCategory} timeout="auto">
        <Box width="50%" ml={1}>
          <Field
            name={`category_${tabIndex}`}
            id={`category_${tabIndex}`}
            component={IxAutoComplete}
            options={foodCategories}
            displayProperty={"name"}
            defaultValue={
              selectedCategories.find((cat) => cat.tabIndex === tabIndex) ?
                selectedCategories.find((cat) => cat.tabIndex === tabIndex).categories :
                []
            }
            onChangeAutoComplete={
              (event, newValue) => handleChangeAutoComplete(tabIndex, event, newValue)
            }
            placeholder={"Select Category"}
            label={t("MenuItemForm.MenuCategories")}
          />
        </Box>
        <Box width="70%" p={1}>
          <Typography variant="caption" display="block" gutterBottom style={{ 'font-size': '10px' }}>
           {t('MenuItemForm.category_message')}
      </Typography>
        </Box>
        <Box ml={1} my={1}>
          <Link href="#" color="secondary">{t('MenuItemForm.add_new_cat')}</Link>
        </Box>
        <Box display={"flex"} width="70%" ml={1} mt={2} p={1} border={1} borderColor="grey.400" borderRadius={4}>
          <Box mr={1}>
            <InfoIcon color="secondary"></InfoIcon>
          </Box>

          <Typography variant="caption" display="block" gutterBottom style={{ 'font-size': '10px' }}>
           {t('MenuItemForm.category_message_1')}
      </Typography>
        </Box>
      </Collapse>

      <Box display="flex">
        <Box width="90%" pt={2} pl={1}>
          <Typography paragraph variant="paragraph">{t('MenuItemForm.choice_option')}</Typography>
        </Box>
        <Box>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expandedChoice,
            })}
            onClick={handleExpandChoiceClick}
            aria-expanded={expandedChoice}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={expandedChoice} timeout="auto">
        <Box display="flex">
          <Box mb={1} width="40%">
            <Field
              name={`choicesCategoryId_${tabIndex}`}
              component={IxSelectField}
              isNative={false}
              onChange={handleChoicesCatChange}
              label={t('MenuItemForm.choicesOption')}
            >
              {choicesGroups && choicesGroups.map((cGroup, index) => {
                return <MenuItem value={cGroup.id}>
                  <Box>
                    <Box fontSize={16}>{cGroup.name['en-US']}</Box>
                    <Box mt={1}>
                      {cGroup.choicesItems && cGroup.choicesItems.map((cItem, index) => {
                        let html = []
                        index < 3 && html.push(`${cItem.name['en-US']}, `)
                        index > 3 && html.push(`+${cGroup.choicesItems.length - 3} left`)
                        return html
                      })}
                    </Box>
                  </Box>
                </MenuItem >
              })}
            </Field>
          </Box>
          <Box mt={1} ml={1}>
            <Button variant="contained" style={{ 'padding': '12px' }}
              onClick={(event) => handleAddChoicesCategory(event, tabIndex)}
              color="secondary">
              {t('common.add')}
            </Button>
          </Box>
        </Box>

        {choicesCategories.find((cCat) => cCat.tabIndex === tabIndex) &&
          <Box border={1} borderColor="grey.400" borderRadius={4} ml={1} mt={1} width="70%">
            {renderExpansionPanel(tabIndex)}
          </Box>}
        <Box mt={1} ml={1}>
          <Link href="#" color="secondary">{t('+新しい選択肢を追加')}</Link>
        </Box>
      </Collapse>

      <Box display="flex">
        <Box width="90%" pt={2} pl={1}>
          <Typography paragraph variant="paragraph">{t('MenuItemForm.menu_pricing')}</Typography>
        </Box>
        <Box>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expandedPrice,
            })}
            onClick={handleExpandedPriceClick}
            aria-expanded={expandedPrice}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={expandedPrice} timeout="auto">
        <Box display="flex" >
          <Box width="30%">
            <Field
              name={`price_${tabIndex}`}
              component={IxTextFieldForm}
              label={t("MenuItemForm.regularPrice")}
            />
          </Box>
          <Box width="70%" p={1} pt={3}>
            <Typography variant="caption" display="block" gutterBottom style={{ 'font-size': '10px' }}>
              {t('MenuItemForm.menu_pricing_message')}
      </Typography>
          </Box>
        </Box>
      </Collapse>

    </TabPanel>

  }

  const renderExpansionPanel = (tabIndex) => {
    const html = [];

    const handleCItemEdit = (e, cGroup, cItem) => {
      if (e.key === "Enter") {
        const choicesCategoriesState = [...choicesCategories];
        let cCatsSate = choicesCategoriesState.find((cCat) => cCat.tabIndex === tabIndex)
        let cGroupstate = cCatsSate.choicesCategories.find((cGroups) => cGroups.id === cGroup.id)
        let cItemState = cGroupstate.choicesItems.find(cItems => cItems.id === cItem.id)
        cItemState.price = Number(e.target.value)
        setChoicesCategories(choicesCategoriesState)
      }
    }

    const handleCItemDelete = (e, cGroup, cItem) => {
      const choicesCategoriesState = [...choicesCategories];
      let cCatsSate = choicesCategoriesState.find((cCat) => cCat.tabIndex === tabIndex)
      let cGroupstate = cCatsSate.choicesCategories.find((cGroups) => cGroups.id === cGroup.id)
      let cItemState = cGroupstate.choicesItems.find(cItems => cItems.id === cItem.id)
      cGroupstate.choicesItems.splice(cGroupstate.choicesItems.findIndex(function (cItems) {
        return cItems.id === cItem.id;
      }), 1);

      const cCatGroup = choicesGroups.find((cOGroup) => cOGroup.id === cGroup.id)

      setChoicesCategories(choicesCategoriesState)
      // cCatGroup.choicesItems.push(cItemState)
    }

    const handleDeleteChoicesGroup = (cGroupId) => {
      const newChoicesCategories = [...choicesCategories];
      let cCats = newChoicesCategories.find((cCat) => cCat.tabIndex === tabIndex)
      cCats.choicesCategories.splice(cCats.choicesCategories.findIndex(function (cCatId) {
        return cCatId === cGroupId;
      }), 1);
      setChoicesCategories(newChoicesCategories)
    }

    choicesCategories.find((cCat) => cCat.tabIndex === tabIndex).choicesCategories
      .map((choiceCat, index) => {
        html.push(
          <>
            <ExpansionPanel>
              <ExpansionPanelSummary aria-controls="panel1a-content" id={`summery_${index}`}>
                <Box mr={2}>
                  <ExpandMoreIcon />
                </Box>
                <Box width="70%">
                  <Typography className={classes.heading}>{choiceCat.name['en-US']}</Typography>
                </Box>
                <Box>
                  {`${choiceCat.choicesItems.length} items`}
                </Box>
                <Box ml={2}>
                  {/* <EditIcon style={{ color: grey[400] }} fontSize="small"></EditIcon> */}
                  <DeleteIcon
                    style={{ color: grey[400], marginLeft: '15px', cursor: "pointer" }}
                    fontSize="small"
                    onClick={(e) => handleDeleteChoicesGroup(choiceCat.id)}
                  >
                  </DeleteIcon>
                </Box>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TableContainer>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="center">Addition Prices</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {choiceCat.choicesItems.map((cItem, index) => {
                        return <TableRow >
                          <TableCell align="left">{cItem.name['en-US']}</TableCell>
                          <TableCell align="center" width="1%">
                            <input type="text" className={classes.citemedit}
                              onKeyDown={(e) => handleCItemEdit(e, choiceCat, cItem)} defaultValue={cItem.price}>
                            </input>
                          </TableCell>
                          <TableCell align="left">
                            <HighlightOffIcon
                              style={{ color: red[400], marginLeft: '5px', cursor: "pointer" }}
                              fontSize="small"
                              onClick={(e) => handleCItemDelete(e, choiceCat, cItem)}
                            />
                          </TableCell>
                        </TableRow>
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Divider></Divider>
          </>
        )

      })

    return html;

  }

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.name}>
        <Box pl={1}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="#" color="inherit" onClick={handleClose}>
              <Typography variant="h6" gutterBottom>
                {/* <ArrowBackIcon /> */}
                {t('MenuItemForm.title')}
              </Typography>
            </Link>
          </Breadcrumbs>
        </Box>

        <Box display="flex">
          <Box width="90%" pt={2} pl={1}>
            <Typography paragraph variant="paragraph">{t('MenuItemForm.details')}</Typography>
          </Box>
          <Box>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expandedDetail,
              })}
              onClick={handleExpandDetailClick}
              aria-expanded={expandedDetail}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>

        <Collapse in={expandedDetail} timeout="auto">
          <Box display="flex">
            <Box mb={1} width="30%">
              <Field
                name="foodItemId"
                component={IxSelectField}
                label={t('MenuItemForm.masterItem')}
              >
                {foodItems && foodItems.map((foodItem, index) => {
                  return <option value={foodItem.id}>{foodItem.name['en-US']}</option>
                })}
              </Field>
            </Box>
          </Box>
          <Box width="40%">
            <Field
              name="menuId"
              component={IxSelectField}
              onChange={handleMenuChange}
              label={t('MenuItemForm.menu')}
            >
              {menus && menus.map((menu, index) => {
                return <option value={menu.id}>{menu.name['en-US']}</option>
              })}
            </Field>
          </Box>
          <Box ml={1} mt={2}>
            <FormLabel component="legend" >{t('MenuItemForm.MenuServing')}</FormLabel>
          </Box>
          <Box ml={1}>
            {selectedMenu.optSlots && selectedMenu.optSlots.map((optMenu, index) => {
              return optSlots.map((optData, index) => {
                return (
                  optMenu.optSlotId === optData.id &&
                  <FormControlLabel
                    control={<Checkbox name={optData.id}
                      checked={optsSate.length > 0 &&
                        optsSate.find((O) => O.optSlotId === optData.id) ? optsSate.find((O) => O.optSlotId === optData.id).checked : false}
                      onChange={handleOptChange} />}
                    label={`${optData.name}(Everyday :${timeFormater(optData.startTime)} -${timeFormater(optData.endTime)}`} />
                )
              })
            })}
          </Box>
          <Box width="70%" ml={2} mt={2}>
            <Field name="isSeperateOption"
              component={IxSwitch}
              onChange={handleSeperateOption}
              checked={isSeperateOption}
              label={t('MenuItemForm.separate_option')}>
            </Field>
          </Box>
          <Box p={1} width="70%">
            <Typography variant="caption" display="block" gutterBottom style={{ 'font-size': '10px' }}>
              {t('MenuItemForm.separate_message')}
            </Typography>
          </Box>
          <Box mb={1}>
            {isSeperateOption && <Field
              name="langTab"
              component={renderTabs}
            >
              {/* render tabs */}
              {optsSate.length > 0 && optsSate.map((optState, index) => {
                return optSlots.map((optData, index) => {
                  return (
                    optState.optSlotId === optData.id && optState.checked &&
                    <Tab label={optData.name} variant="fullWidth" style={{ 'min-width': '130px' }} />
                  )
                })
              })}
            </Field>}
          </Box>
        </Collapse>

        {/* tab panels */}

        {optsSate.length > 0 && optsSate.filter((O) => O.checked === true)
          .map((optState, indexStateOpt) => {
            return optSlots.map((optData, index) => {
              if (optState.optSlotId === optData.id && optState.checked) {
                const panelHtml = initialValues.isEdit ? renderTabPanelsEdit(indexStateOpt) : renderTabPanelsAdd(indexStateOpt)
                return panelHtml
              }
            })
          })}

        <DialogActions>
          <Box textAlign="left" width="100%">
            <Field name="isActive" component={IxSwitch} label={t('common.active')}></Field>
          </Box>
          <Button variant="contained" onClick={handleClose}>
            {t('common.cancel_button')}
          </Button>
          <Button type="submit" variant="contained" disabled={loading} color="secondary">
            {t('common.submit_button')}
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </DialogActions>
      </form >
    </>
  )
}

MenuItemForm = reduxForm({
  form: 'MenuItemForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  //initialValues: editData,
  validate,
})(MenuItemForm)

export default MenuItemForm