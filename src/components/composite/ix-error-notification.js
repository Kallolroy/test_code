import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SET_ERROR, HIDE_ERROR } from '../../action-types/error-types';
import {
  REQUIRED,
  INVALID_FORMAT,
  INVALID_REQUEST,
  UNIQUE,
  INVALID_DATA,
  LIMIT_OVER,
  TIME_OVERLAP,
  RESOURCE_NOT_FOUND,
  DATABASE_OPERATION_FAILED,
  OPERATION_FAILED,
  INVALID_JSON_FORMAT,
} from '../../constants/ix-error-code';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ErrorNotification(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const isOpen = useSelector((state) => state.error.isOpen);
  const error = useSelector((state) => state.error.error);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    dispatch({ type: HIDE_ERROR });
    if (reason === 'clickaway') {
      return;
    }
    //setOpen(false);
  };

  const generateErrorMsg = (error) => {
    if (error.type === 'warning') {
      return error.message
    } else {
      const exceptions = error.response.data.exceptions;
      let errMessage = [];
      exceptions &&
        exceptions.length > 0 &&
        exceptions.map((exp, index) => {
          switch (exp.code) {
            case UNIQUE:
              errMessage.push(
                `Operation Failed!!, ${exp.description} should be uniq`
              );
              break;
            case INVALID_REQUEST:
              errMessage.push(`Operation Failed!!, ${exp.description}`);
              break;
            case REQUIRED:
              errMessage.push(
                `Operation Failed!!, ${exp.description} is required field`
              );
              break;
            case INVALID_JSON_FORMAT:
              errMessage.push(`Operation Failed!!, ${exp.description}`);
              break;
            case RESOURCE_NOT_FOUND:
              errMessage.push(`No data found for ${exp.description}`);
              break;
            case LIMIT_OVER:
              errMessage.push(`Operation Failed!!, ${exp.description}`);
              break;
            case TIME_OVERLAP:
              errMessage.push(`Operation Failed!!, ${exp.description}` + i18n.t('error.time_overlap_message'));
              break;
            default:
              errMessage.push('Operation Failed!!, Unknown error');
              break;
          }
        });

      exceptions &&
        exceptions.code &&
        exceptions.code === RESOURCE_NOT_FOUND &&
        errMessage.push('Operation Failed !! , No data found');
      exceptions &&
        exceptions.code &&
        exceptions.code === INVALID_REQUEST &&
        errMessage.push(`Operation Failed!!, ${exceptions.description}`);

      !exceptions && errMessage.push('Operation Failed !!, Unknown error');
      return errMessage.join(' ,');
    }

  };

  return (
    <>
      {error && error.response && error.response.data && (
        <div className={classes.root}>
          <Snackbar
            open={isOpen}
            autoHideDuration={10000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              {generateErrorMsg(error)}
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
}
