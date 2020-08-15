import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, green, grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  large: {
    width: theme.spacing(22),
    height: theme.spacing(22),
  },
  rounded: {
    color: '#fff',
    backgroundColor: grey[500],
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  citemedit: {
    border: '0px solid rgb(203, 204, 206)',
    width: '40px',
    padding: '3px',
    'border-radius': '2px',
    textAlign: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: '50px',
    height: 'auto',
    backgroundColor: 'rgb(203, 204, 206)'
  }
}));