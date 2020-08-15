import { makeStyles } from '@material-ui/core/styles';

export const PROJECT_STATUS_TABLE_CELL_CONTENT =
  'projectStatusTableCellContent';
export const APP_BAR_LANGUAGE_SELECT =
  'appBarLanguageSelect';
export const APP_BAR_COMPANY_SELECT =
  'appBarCompanySelect';

export const useStyles = makeStyles(theme => ({
  [PROJECT_STATUS_TABLE_CELL_CONTENT]: {
    padding: '1px 2px 1px 2px',
    display: 'inline',
    fontSize: '10px'
  },
  [APP_BAR_LANGUAGE_SELECT]: {
    color: 'white !important',
    '& .MuiSelect-icon': {
      color: 'white'
    }
  },
  [APP_BAR_COMPANY_SELECT]: {
    color: '#ef6c00',
    fontSize: '16px',
    '& .MuiSelect-icon': {
      color: '#ef6c00'
    }
  }
}));
