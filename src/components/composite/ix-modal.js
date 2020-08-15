import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    '& .inputFields': {
      marginTop: '1em',
      marginBottom: '1em',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    paddingLeft: theme.spacing(1),
  },
  titleRoot: {
    paddingBottom: 0,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.root}
      {...other}
      classes={{ root: classes.titleRoot }}
    >
      <Typography className={classes.title} variant="h6">
        {children}
      </Typography>
      {/* {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null} */}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: 'none',
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const useDialogueStyles = makeStyles((theme) => ({
  customWidthMedium: {
    maxWidth: '750px',
  },
  customWidthSmall: {
    maxWidth: '650px',
  },
}));
export default function IxDialog(props) {
  const classes = useDialogueStyles();
  const { onExited, isSmall } = props;
  return (
    <div>
      <Dialog
        onExited={onExited}
        open={props.open}
        aria-labelledby="customized-dialog-title"
        fullWidth={true}
        maxWidth={'sm'}
        classes={{ paperWidthSm: isSmall ? classes.customWidthSmall : classes.customWidthMedium }}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          {props.modaltitle}
        </DialogTitle>
        <DialogContent dividers>{props.children}</DialogContent>
        {props.showCloseButton && (
          <DialogActions>
            <Button autoFocus onClick={props.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
