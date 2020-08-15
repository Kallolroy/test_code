import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import BusinessIcon from '@material-ui/icons/Business';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useTranslation } from 'react-i18next';
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

export default function IxLeftBarMenuSuperAdmin({ selectedId }) {
  const classes = useStyles();
  const { t, i18n } = useTranslation()

  const getParentMenuId = () => {
    if (selectedId !== null && selectedId !== undefined) {
      if (selectedId > 2 && selectedId < 6) {
        return ['2']; // Menu
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
      <StyledTreeItem nodeId="1" labelText={t('NxtCompanyHome.companies')} labelIcon={BusinessIcon} path="/companies" />
      <StyledTreeItem nodeId="2" labelText={t('IxLeftBarMenu.Reports')} labelIcon={AssessmentIcon}>
        <StyledTreeItem
          nodeId="3"
          labelText={t('IxLeftBarMenu.company_report')}
          color="#1a73e8"
          bgColor="#e8f0fe"
          path=""
        />
        <StyledTreeItem
          nodeId="4"
          labelText={t('IxLeftBarMenu.user_report')}
          color="#e3742f"
          bgColor="#fcefe3"
          path=""
        />
        <StyledTreeItem
          nodeId="5"
          labelText={t('IxLeftBarMenu.sales_report')}
          color="#a250f5"
          bgColor="#f3e8fd"
          path=""
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="6" labelText={t('IxLeftBarMenu.notifications')} labelIcon={NotificationsNoneIcon} path="/notifications" />
    </TreeView>
  );
}
