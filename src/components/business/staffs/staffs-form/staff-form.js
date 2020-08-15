import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import { green } from '@material-ui/core/colors';
import validate from './validate';
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import SaveIcon from '@material-ui/icons/Save';
import IxSwitchForm from '../../../basic/ix-switch-form';
import IxSelectField from '../../../basic/ix-selectfield';
import { Typography } from '@material-ui/core';
import { PLATFORM_ADMIN, COMPANY_ADMIN, BRANCH_ADMIN } from '../../../../constants/ix-user-roles'
import IxControlledAutoComplete from '../../../basic/ix-controlled-autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-root': {
      '& input': {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.87)',
        fontWeight: 400,
      },
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  twoColumnRow: {
    display: 'flex',
  },
  childColumn: {
    width: '50%',
  },
  autocompleteWrapper: {
    margin: '8px 8px 24px 8px',
    boxSizing: 'content-box',
  },
  hrLine: {
    borderTop: '1px solid rgb(229,229,229)',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  hrBottom: {
    borderTop: '1px solid rgb(229,229,229)',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  description: {
    marginTop: theme.spacing(0.6),
    fontSize: '12px',
    color: 'rgba(0,0,0,0.54)',
  },
  activeSwitch: {
    fontSize: '16px',
    fontWeight: '400',
    color: 'rgba(0,0,0,.87)',
    marginLeft: '16px',
  },
}));

let StaffForm = (props) => {
  const {
    handleSubmit,
    handleClose,
    pristine,
    reset,
    submitting,
    error,
    loading,
    roleList = [],
    branchList = [],
    kitchenData,
    branchValue,
    rolesValue,
    initialValues,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const [kitchenList, setKitchenList] = useState([]);
  const [isBranchKitchenVisible, setIsBranchKitchenVisible] = React.useState(
    true
  );

  useEffect(() => {
    roleList && delete roleList[0]
    roleList && delete roleList[5]
    if (rolesValue && rolesValue.length) {
      for (let i = 0; i < rolesValue.length; i++) {
        const value = rolesValue[i]['name'].toLowerCase();
        if (value === PLATFORM_ADMIN.toLowerCase() || value === COMPANY_ADMIN.toLowerCase()) {
          setIsBranchKitchenVisible(false);
          return;
        }
      }
    }
    setIsBranchKitchenVisible(true);
  }, [rolesValue]);

  useEffect(() => {
    let kitchens = [];
    if (
      initialValues.branch &&
      branchValue &&
      initialValues.branch.id === branchValue.id
    ) {
      // initialValues.branch.id = -1;
      return;
    }
    if (branchValue && kitchenData && kitchenData.length > 0) {
      kitchenData.map((k) => {
        k.branchId === branchValue.id && kitchens.push(k)
      })
      props.change('kitchenId', null);
    } else if (initialValues.kitchenId && kitchenData && kitchenData.length > 0) {
      kitchenData.map((k) => {
        k.branchId === initialValues.branch.id && kitchens.push(k)
      })
      props.change('kitchenId', initialValues.kitchenId);
    }
    setKitchenList(kitchens);
  }, [branchValue]);

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Box className={classes.twoColumnRow}>
          <Box mb={1} className={classes.childColumn}>
            <Field
              name="firstName"
              component={IxTextFieldForm}
              label={t('NxtStaffForm.Label_firstName')}
            />
          </Box>
          <Box mb={1} className={classes.childColumn}>
            <Field
              name="lastName"
              component={IxTextFieldForm}
              label={t('NxtStaffForm.Label_lastName')}
            />
          </Box>
        </Box>

        <Box className={classes.twoColumnRow}>
          <Box mb={1} className={classes.childColumn}>
            <Field
              name="phone"
              placeholder="0000000000000"
              component={IxTextFieldForm}
              label={t('NxtStaffForm.Label_phone')}
              props={{
                type: 'phone',
                InputLabelProps: {
                  // shrink: true,
                },
              }}
            />
          </Box>
          <Box mb={1} className={classes.childColumn}>
            <Field
              name="dob"
              component={IxTextFieldForm}
              label={t('NxtStaffForm.Label_dob')}
              props={{
                type: 'date',
                InputLabelProps: {
                  shrink: true,
                },
              }}
            />
          </Box>
        </Box>

        <Box mb={1}>
          <Field
            name="address"
            component={IxTextFieldForm}
            label={t('NxtStaffForm.Label_address')}
          />
        </Box>

        <Box className={classes.hrLine} />

        <Box className={classes.twoColumnRow}>
          <Box mb={1} className={classes.childColumn}>
            <Field
              name="userName"
              component={IxTextFieldForm}
              label={t('NxtStaffForm.Label_userName')}
            />
          </Box>
          <Box mb={1} className={classes.childColumn}>
            <Field
              name="email"
              component={IxTextFieldForm}
              label={t('NxtStaffForm.Label_email')}
            />
          </Box>
        </Box>
        {initialValues && !initialValues.id &&
          <Box className={classes.twoColumnRow}>
            {
              <Box mb={1} className={classes.childColumn}>
                <Field
                  name="password"
                  component={IxTextFieldForm}
                  label={t('NxtStaffForm.Label_password')}
                  props={{
                    type: 'password',
                    InputLabelProps: {
                      shrink: true,
                    },
                    // value:"00:00"
                  }}
                />
              </Box>
            }
            <Box mb={1} className={classes.childColumn}>
              <Field
                name="confirmPassword"
                component={IxTextFieldForm}
                label={t('NxtStaffForm.Label_confirmPassword')}
                props={{
                  type: 'password',
                  InputLabelProps: {
                    shrink: true,
                  },
                  // value:"00:00"
                }}
              />
            </Box>
          </Box>

        }

        <Box className={classes.hrBottom} />

        <Box className={classes.autocompleteWrapper}>
          <Field
            name="roles"
            id="roles"
            component={IxControlledAutoComplete}
            options={roleList}
            displayProperty="name"
            placeholder={''}
            multiple={true}
            disableClearable={true}
            label={t('NxtStaffForm.Label_Role')}
          />
        </Box>

        {isBranchKitchenVisible && (
          <Box className={classes.autocompleteWrapper}>
            <Box>
              <Field
                name="branch"
                id="branch-access-id"
                component={IxControlledAutoComplete}
                options={branchList}
                displayProperty="name"
                placeholder=""
                multiple={false}
                disableClearable={true}
                label={t('NxtStaffForm.Label_storeAccess')}
              />
            </Box>
            <Typography variant="body1" className={classes.description}>
              {t('NxtStaffForm.Branch_Description')}
            </Typography>
          </Box>
        )}

        {/* {isBranchKitchenVisible && (
          <Box className={classes.autocompleteWrapper}>
            <Box>
              <Field
                name="kitchen"
                id="kitchens"
                component={IxControlledAutoComplete}
                options={kitchenList}
                displayProperty="name"
                placeholder=""
                multiple={false}
                disableClearable={true}
                label={t('NxtStaffForm.Label_kitchenAccess')}
              />
            </Box>
            <Typography variant="body1" className={classes.description}>
              {t('NxtStaffForm.Kitchen_Description')}
            </Typography>
          </Box>
        )} */}
        {isBranchKitchenVisible &&
          <Box className="inputFields dropdownField">
            <Field
              className={classes.dropdownField}
              //className="inputFields dropdownField"
              name="kitchenId"
              component={IxSelectField}
              label={t('NxtStaffForm.Label_kitchenAccess')}
              placeHolder={"select"}
            >
              {kitchenList.length > 0 &&
                <option value={null}></option>
              }
              {kitchenList.length > 0 &&
                kitchenList.map((kitchen, index) => {
                  return <option value={kitchen.id}>{kitchen.name}</option>;
                })

              }
            </Field>
          </Box>
        }

        <DialogActions>
          <Box width="70%">
            <Field
              name="isActive"
              component={IxSwitchForm}
              label={
                <Typography className={classes.activeSwitch}>
                  {' '}
                  {t('common.active')}{' '}
                </Typography>
              }
            ></Field>
          </Box>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            {t('common.cancel_button')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || submitting}
            color="secondary"
            startIcon={<SaveIcon />}
          >
            {t('common.save')}
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </DialogActions>
      </form>
    </>
  );
};

StaffForm = reduxForm({
  form: 'StaffForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  validate,
})(StaffForm);

StaffForm = connect(
  (state) => ({
    initialValues: state.staff.formInitialValue,
  })
  // { load: loadAccount } // bind action creator
)(StaffForm);

const selector = formValueSelector('StaffForm');

StaffForm = connect((state) => {
  const rolesValue = selector(state, 'roles');
  const branchValue = selector(state, 'branch');
  const kitchenData = state.company.kitchens.data
  return {
    rolesValue,
    branchValue,
    kitchenData
  };
})(StaffForm);

export default StaffForm;
