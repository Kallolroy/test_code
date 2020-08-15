import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      backgroundColor:'#ffffff'
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
    pageTitleWrapper:{
      display: 'flex',
      alignItems: 'center',
    },
    pageTitle:{
      fontSize: '24px',
      fontWeight: 500,
      color: 'rgba(0,0,0,0.87)',
      marginTop:'5px',
      marginBottom:'5px',
    },
    tableWrapper:{
      paddingTop: '24px !important'
    }
  }));

export default useStyles;