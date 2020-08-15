import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalGroceryStoreOutlinedIcon from '@material-ui/icons/LocalGroceryStoreOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import StoreIcon from '@material-ui/icons/Store';
import TableChartIcon from '@material-ui/icons/TableChart';
import KitchenIcon from '@material-ui/icons/Kitchen';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import RestaurantMenuOutlinedIcon from '@material-ui/icons/RestaurantMenuOutlined';
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';
import GroupWorkOutlinedIcon from '@material-ui/icons/GroupWorkOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useTranslation } from 'react-i18next';
import { PLATFORM_ADMIN, COMPANY_ADMIN, BRANCH_ADMIN } from '../../../constants/ix-user-roles'
import { NavLink, BrowserRouter as Router } from 'react-router-dom'

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: 'rgba(0,0,0,.87)',
    '&:hover > $content': {
      backgroundColor: 'rgba(38, 50, 56, 0.08)'
    },
    '&:focus > $content, &$selected > $content, &$selected > $content a ': {
      // backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: '#f18e00',
      backgroundColor: 'rgba(38, 50, 56, 0.08)'
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent'
      // color: '#f18e00',
    },
  },
  content: {
    color: 'rgba(0,0,0,.54)',
    // borderTopRightRadius: theme.spacing(2),
    // borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(3),
  },
  emptylIcon: {
    marginRight: theme.spacing(4),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
  link: {
    'text-decoration': 'none',
    color: 'rgba(0,0,0,.87)'
  }
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, path, ...other } = props;
  return (
    <TreeItem
      label={
        <NavLink className={classes.link} to={path ? path : "#"}>
          <div className={classes.labelRoot}>
            {LabelIcon ? <LabelIcon color="inherit" className={classes.labelIcon} /> : <div className={classes.emptylIcon} />}
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </div>
        </NavLink>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    // minHeight: window.innerHeight,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function IxLeftBarMenu({ selectedId }) {
  const classes = useStyles();
  const { t, i18n } = useTranslation()
  const user = JSON.parse(localStorage.getItem('user'));
  const appContext = localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true }

  const getParentMenuId = () => {
    if (selectedId !== null && selectedId !== undefined) {
      if (selectedId > 6 && selectedId < 12) {
        return ['6']; // Menu
      } else if (selectedId === 13 || selectedId === 14) {
        return ['12']; // Payment
      } else {
        return [selectedId.toString()];
      }
    }
  }

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={getParentMenuId()}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      selected={selectedId.toString()}
    >
      <StyledTreeItem nodeId="1" labelText={t('IxLeftBarMenu.Dashboard')} labelIcon={EqualizerIcon} path="/home" />
      {appContext.isCompany &&
        <StyledTreeItem nodeId="2" labelText={t('IxLeftBarMenu.Stores')} labelIcon={StoreIcon} path="/store" />}
      <StyledTreeItem nodeId="3" labelText={t('IxLeftBarMenu.Restaurants_tables')} labelIcon={TableChartIcon} path="/restauranttables" />
      <StyledTreeItem nodeId="4" labelText={t('IxLeftBarMenu.Kitchens')} labelIcon={KitchenIcon} path="/kitchens" />
      <StyledTreeItem nodeId="5" labelText={t('IxLeftBarMenu.Reports')} labelIcon={ListAltIcon} />
      <StyledTreeItem nodeId="6" labelText={t('IxLeftBarMenu.Menu')} labelIcon={RestaurantIcon}>
        <StyledTreeItem
          nodeId="7"
          labelText={t('IxLeftBarMenu.Menus')}
          // labelIcon={RestaurantMenuOutlinedIcon}
          color="#1a73e8"
          bgColor="#e8f0fe"
          path="/menus"
        />
        <StyledTreeItem
          nodeId="8"
          labelText={t('IxLeftBarMenu.Categoris')}
          // labelIcon={CategoryOutlinedIcon}
          color="#e3742f"
          bgColor="#fcefe3"
          path="/food-categories"
        />
        <StyledTreeItem
          nodeId="9"
          labelText={t('IxLeftBarMenu.MenuItems')}
          // labelIcon={ListOutlinedIcon}
          color="#a250f5"
          bgColor="#f3e8fd"
          path="/food-items"
        />
        <StyledTreeItem
          nodeId="10"
          labelText={t('IxLeftBarMenu.ChoicesGroup')}
          // labelIcon={GroupWorkOutlinedIcon}
          color="#3c8039"
          bgColor="#e6f4ea"
          path="/choices-group"
        />
        <StyledTreeItem
          nodeId="11"
          labelText={t('IxLeftBarMenu.ServingHours')}
          // labelIcon={HourglassEmptyOutlinedIcon}
          color="#3c8039"
          bgColor="#e6f4ea"
          path="/serving-hours"
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="12" labelText={t('IxLeftBarMenu.Payment')} labelIcon={CreditCardOutlinedIcon} >
        {appContext.isCompany &&
          <StyledTreeItem
            nodeId="13"
            labelText={t('IxLeftBarMenu.PaymentMethods')}
            color="#1a73e8"
            bgColor="#e8f0fe"
            path="/payment-methods"
          />}
        {
          !appContext.isCompany &&
          <StyledTreeItem
            nodeId="14"
            labelText={t('IxLeftBarMenu.RecieptTemplate')}
            color="#1a73e8"
            bgColor="#e8f0fe"
            path="/receipt-template"
          />
        }
      </StyledTreeItem>

      <StyledTreeItem nodeId="15" labelText={t('IxLeftBarMenu.Staff')} labelIcon={PeopleAltOutlinedIcon} path="/staffs" />
      {
        appContext.isCompany &&
        < StyledTreeItem nodeId="16" labelText={t('IxLeftBarMenu.Setting')} labelIcon={SettingsOutlinedIcon} path="/settings" />
      }
    </TreeView>
  );
}
