import React, { useEffect, useState, Suspense } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import validate from './validate';
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import SaveIcon from '@material-ui/icons/Save';
import {
  Typography,
  IconButton,
  Collapse,
  FormLabel,
  Avatar,
  DialogActions,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IxFileUpload from '../../../basic/ix-upload-file';
import { green } from '@material-ui/core/colors';
import NxtReceiptTemplatePreview from './receipt-template-preview';

import Tabs from '@material-ui/core/Tabs';
import config from '../../../../config';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from '@material-ui/lab';

const IxModal = React.lazy(() => import('../../../composite/ix-modal')); // Lazy-loaded

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-root': {
      '& input': {
        fontSize: '16px',
        color: theme.palette.text.primary,
        fontWeight: 400,
      },
      '& textarea': {
        fontSize: '16px',
        color: theme.palette.text.primary,
        fontWeight: 400,
      },
    },
  },
  expansionPanelTitle: {
    cursor: 'pointer',
    fontSize: '16px',
    color: theme.palette.text.primary,
    fontWeight: 500,
    marginTop: theme.spacing(1),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .MuiIconButton-root': {
      marginRight: '-12px',
    },
  },
  expansionPaneDetail: {
    width: '100%',
  },
  logoPanel: {
    display: 'flex',
  },
  logoContent: {
    marginLeft: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
  },
  logoBox: {
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    height: '180px',
    width: '250px',
  },
  logoImage: {
    boxSizing: 'border-box',
    border: '2px dashed #cccccc',
    background: '#f2f2f2',
    fontSize: '14px',
    color: 'rgba(0,0,0,0.54)',
    fontWeight: 400,
    height: '180px',
    width: '250px',
  },
  logoAttributes: {
    '& p': {
      margin: 0,
      padding: 0,
      fontWeight: 500,
    },
  },
  logoHint: {
    marginBottom: '16px !important',
  },
  logoFileFormat: {
    marginBottom: '4px !important',
  },
  logoActionButtons: {
    display: 'flex',
    marginTop: 'auto',
    '& .MuiButton-root': {
      fontSize: '14px',
      fontWeight: 500,
      padding: '6px 16px',
      height: '40px',
      '&:first-of-type': {
        marginRight: theme.spacing(1),
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
  inputWrapper: {
    width: '80%',
    margin: 0,
    '& .MuiTextField-root': {
      marginLeft: '0 !important',
    },
  },
  headerContent: {},
  helperText: {
    marginTop: theme.spacing(0),
    fontSize: '12px',
    color: 'rgba(0,0,0,0.54)',
  },
  actionButtons: {},
  saveButton: {
    marginLeft: theme.spacing(1),
  },
  previewButton: {
    display: 'inline-block',
    marginTop: '15px',
    marginBottom: '25px',
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

let ReceiptTemplate = (props) => {
  const {
    handleSubmit,
    handleClose,
    pristine,
    reset,
    submitting,
    error,
    loading,
    optSlotsData,
    templateData,
    formData,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [tabValue, setTabValue] = React.useState(0);
  const [
    companyLogoPanelExpanded,
    setCompanyLogoPanelExpanded,
  ] = React.useState(true);
  const [
    headerContentPanelExpanded,
    setHeaderContentPanelExpanded,
  ] = React.useState(true);
  const [
    footerContentPanelExpanded,
    setFooterContentPanelExpanded,
  ] = React.useState(true);

  const [logo, setLogo] = React.useState(null);

  const [isTemplatePreviewOpen, setIsTemplatePreviewOpen] = React.useState(
    false
  );

  const displayImage = async () => {
    if (templateData.logoImage) {
      // const imageData = await getImageData(templateData.companyId, templateData.photo);

      const imgSrc = `${config.api.base}/common/companies/${templateData.companyId}/images/${templateData.logoImage}`;
      setLogo(imgSrc);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    props.change('langType', newValue);
  };

  const handleTemplatePreviewClose = () => {
    setIsTemplatePreviewOpen(false);
  };

  const handleExpandPhotoClick = () => {
    setCompanyLogoPanelExpanded(!companyLogoPanelExpanded);
  };

  const handleExpandHeaderContentClick = () => {
    setHeaderContentPanelExpanded(!headerContentPanelExpanded);
  };

  const handleFooterContentContentClick = () => {
    setFooterContentPanelExpanded(!footerContentPanelExpanded);
  };

  const clearLogo = () => {
    props.change('imageFile', null);
    setLogo(null);
  };

  const handleCapture = (event, input) => {
    let imageFile = event.target.files[0];
    props.change('imageFile', imageFile);
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();
      const data = new FormData();
      imageObject.onload = () => {
        data.append('file', imageFile);
        imageFile = data;
      };
      setLogo(localImageUrl);
    }
  };

  const showPreview = () => {
    setIsTemplatePreviewOpen(true);
  };

  const renderTabs = ({
    input,
    label,
    meta: { touched, invalid, value, error },
    children,
    ...rest
  }) => {
    return (
      <Box mb={1}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="wrapped label tabs example"
        >
          <Tab
            label="ENGLISH"
            variant="fullWidth"
            style={{ 'min-width': '130px' }}
          />
          <Tab
            label="JAPANESE"
            variant="fullWidth"
            style={{ 'min-width': '130px' }}
          />
          <Tab
            label="KOREAN"
            variant="fullWidth"
            style={{ 'min-width': '130px' }}
          />
          <Tab
            label="CHINESE"
            variant="fullWidth"
            style={{ 'min-width': '130px' }}
          />
        </Tabs>
      </Box>
    );
  };

  React.useEffect(() => {
    if (templateData) {
      setLogo(templateData.logoImage);
      displayImage();
      props.change('id', templateData.id);
      props.change('companyId', templateData.companyId);
      props.change('branchId', templateData.branchId);

      if (templateData.headerText && templateData.headerText['en-US']) {
        //console.log('DOES IT GO?');
        props.change(
          'companyName_en',
          templateData.headerText['en-US'].companyName
        );
        props.change(
          'branchName_en',
          templateData.headerText['en-US'].branchName
        );
        props.change(
          'branchAddress_en',
          templateData.headerText['en-US'].branchAddress
        );
        props.change('phone_en', templateData.headerText['en-US'].phone);
        props.change('headerNote_en', templateData.headerText['en-US'].note);
      }
      if (templateData.headerText && templateData.headerText['ja-JP']) {
        props.change(
          'companyName_ja',
          templateData.headerText['ja-JP'].companyName
        );
        props.change(
          'branchName_ja',
          templateData.headerText['ja-JP'].branchName
        );
        props.change(
          'branchAddress_ja',
          templateData.headerText['ja-JP'].branchAddress
        );
        props.change('phone_ja', templateData.headerText['ja-JP'].phone);
        props.change('headerNote_ja', templateData.headerText['ja-JP'].note);
      }
      if (templateData.headerText && templateData.headerText['ko-KR']) {
        props.change(
          'companyName_ko',
          templateData.headerText['ko-KR'].companyName
        );
        props.change(
          'branchName_ko',
          templateData.headerText['ko-KR'].branchName
        );
        props.change(
          'branchAddress_ko',
          templateData.headerText['ko-KR'].branchAddress
        );
        props.change('phone_ko', templateData.headerText['ko-KR'].phone);
        props.change('headerNote_ko', templateData.headerText['ko-KR'].note);
      }
      if (templateData.headerText && templateData.headerText['zh-CN']) {
        props.change(
          'companyName_zh',
          templateData.headerText['zh-CN'].companyName
        );
        props.change(
          'branchName_zh',
          templateData.headerText['zh-CN'].branchName
        );
        props.change(
          'branchAddress_zh',
          templateData.headerText['zh-CN'].branchAddress
        );
        props.change('phone_zh', templateData.headerText['zh-CN'].phone);
        props.change('headerNote_zh', templateData.headerText['zh-CN'].note);
      }

      if (templateData.footerText && templateData.footerText['en-US']) {
        props.change('footerNote_en', templateData.footerText['en-US'].note);
      }
      if (templateData.footerText && templateData.footerText['ja-JP']) {
        props.change('footerNote_ja', templateData.footerText['ja-JP'].note);
      }
      if (templateData.footerText && templateData.footerText['ko-KR']) {
        props.change('footerNote_ko', templateData.footerText['ko-KR'].note);
      }
      if (templateData.footerText && templateData.footerText['zh-CN']) {
        props.change('footerNote_zh', templateData.footerText['zh-CN'].note);
      }
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        {/* {Company logo area start} */}
        <Box
          onClick={handleExpandPhotoClick}
          className={classes.expansionPanelTitle}
        >
          <Typography variant="paragraph">
            {t('NxtReceiptTemplate.LogoLabel')}
          </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: companyLogoPanelExpanded,
            })}
            aria-expanded={companyLogoPanelExpanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Collapse
          in={companyLogoPanelExpanded}
          timeout="auto"
          className={classes.expansionPaneDetail}
        >
          <Box className={classes.logoPanel}>
            <Box className={classes.logo}>
              <Avatar variant="rounded" className={classes.logoBox}>
                <Field
                  name="logoPreview"
                  component="img"
                  src={logo}
                  className={classes.logoImage}
                />
              </Avatar>
            </Box>

            <Box className={classes.logoContent}>
              <Box className={classes.logoAttributes}>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  className={classes.logoHint}
                >
                  {t('NxtReceiptTemplate.LogoHint')}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.logoFileFormat}
                >
                  {t('NxtReceiptTemplate.LogoFileFormat')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {t('NxtReceiptTemplate.LogoPixelInfo')}
                </Typography>
              </Box>

              <Box className={classes.logoActionButtons}>
                <Field
                  name="photo"
                  type="file"
                  component={IxFileUpload}
                  id="category_logo"
                  label={t('NxtReceiptTemplate.addPhotoBtnLabel')}
                  onChange={handleCapture}
                ></Field>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={clearLogo}
                >
                  {t('NxtReceiptTemplate.removePhotoBtnLabel')}
                </Button>
              </Box>
            </Box>
          </Box>
        </Collapse>

        {/* {Company logo area end} */}
        <Box my={2}>
          <Field name="langTab" component={renderTabs} />
        </Box>
        {/* {Header content area start} */}
        <Box
          onClick={handleExpandHeaderContentClick}
          className={classes.expansionPanelTitle}
        >
          <Typography variant="paragraph">
            {t('NxtReceiptTemplate.HeaderContentLabel')}
          </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: headerContentPanelExpanded,
            })}
            aria-expanded={headerContentPanelExpanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Collapse
          in={headerContentPanelExpanded}
          timeout="auto"
          className={classes.expansionPaneDetail}
        >
          <Box className={classes.headerContent}>
            <Box className={classes.inputWrapper}>
              {tabValue === 0 && (
                <Field
                  name="companyName_en"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelCompanyName')}
                />
              )}
              {tabValue === 1 && (
                <Field
                  name="companyName_ja"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelCompanyName')}
                />
              )}

              {tabValue === 2 && (
                <Field
                  name="companyName_ko"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelCompanyName')}
                />
              )}
              {tabValue === 3 && (
                <Field
                  name="companyName_zh"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelCompanyName')}
                />
              )}
            </Box>
            <Box className={classes.inputWrapper}>
              {tabValue === 0 && (
                <Field
                  name="branchName_en"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelStoreName')}
                />
              )}

              {tabValue === 1 && (
                <Field
                  name="branchName_ja"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelStoreName')}
                />
              )}
              {tabValue === 2 && (
                <Field
                  name="branchName_ko"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelStoreName')}
                />
              )}
              {tabValue === 3 && (
                <Field
                  name="branchName_zh"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelStoreName')}
                />
              )}
            </Box>
            <Box className={classes.inputWrapper}>
              {tabValue === 0 && (
                <Field
                  name="branchAddress_en"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelStoreAddress')}
                />
              )}
              {tabValue === 1 && (
                <Field
                  name="branchAddress_ja"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelStoreAddress')}
                />
              )}
              {tabValue === 2 && (
                <Field
                  name="branchAddress_ko"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelStoreAddress')}
                />
              )}
              {tabValue === 3 && (
                <Field
                  name="branchAddress_zh"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelStoreAddress')}
                />
              )}
            </Box>
            <Box className={classes.inputWrapper}>
              {tabValue === 0 && (
                <Field
                  name="phone_en"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelPhone')}
                  props={{
                    type: 'phone',
                    InputLabelProps: {
                      // shrink: true,
                    },
                  }}
                />
              )}
              {tabValue === 1 && (
                <Field
                  name="phone_ja"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelPhone')}
                  props={{
                    type: 'phone',
                    InputLabelProps: {
                      // shrink: true,
                    },
                  }}
                />
              )}
              {tabValue === 2 && (
                <Field
                  name="phone_ko"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelPhone')}
                  props={{
                    type: 'phone',
                    InputLabelProps: {
                      // shrink: true,
                    },
                  }}
                />
              )}
              {tabValue === 3 && (
                <Field
                  name="phone_zh"
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelPhone')}
                  props={{
                    type: 'phone',
                    InputLabelProps: {
                      // shrink: true,
                    },
                  }}
                />
              )}
            </Box>
            <Box className={classes.inputWrapper}>
              {tabValue === 0 && (
                <Field
                  name="headerNote_en"
                  multiline
                  rows={3}
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelHeaderNote')}
                />
              )}
              {tabValue === 1 && (
                <Field
                  name="headerNote_ja"
                  multiline
                  rows={3}
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelHeaderNote')}
                />
              )}
              {tabValue === 2 && (
                <Field
                  name="headerNote_ko"
                  multiline
                  rows={3}
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelHeaderNote')}
                />
              )}
              {tabValue === 3 && (
                <Field
                  name="headerNote_zh"
                  multiline
                  rows={3}
                  component={IxTextFieldForm}
                  label={t('NxtReceiptTemplate.FieldLabelHeaderNote')}
                />
              )}
              <Typography variant="body1" className={classes.helperText}>
                {t('NxtReceiptTemplate.FieldLabelHeaderNoteHint')}
              </Typography>
            </Box>
          </Box>
        </Collapse>

        {/* {Header content area end} */}

        {/* {Footer content area start} */}
        <Box
          onClick={handleFooterContentContentClick}
          className={classes.expansionPanelTitle}
        >
          <Typography paragraph variant="paragraph">
            {t('NxtReceiptTemplate.LabelFooterContent')}
          </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: footerContentPanelExpanded,
            })}
            aria-expanded={footerContentPanelExpanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Collapse
          in={footerContentPanelExpanded}
          timeout="auto"
          className={classes.expansionPaneDetail}
        >
          <Box className={classes.inputWrapper}>
            {tabValue === 0 && (
              <Field
                name="footerNote_en"
                multiline
                rows={4}
                component={IxTextFieldForm}
                label={t('NxtReceiptTemplate.FieldLabelFooterNote')}
              />
            )}
            {tabValue === 1 && (
              <Field
                name="footerNote_ja"
                multiline
                rows={4}
                component={IxTextFieldForm}
                label={t('NxtReceiptTemplate.FieldLabelFooterNote')}
              />
            )}
            {tabValue === 2 && (
              <Field
                name="footerNote_ko"
                multiline
                rows={4}
                component={IxTextFieldForm}
                label={t('NxtReceiptTemplate.FieldLabelFooterNote')}
              />
            )}
            {tabValue === 3 && (
              <Field
                name="footerNote_zh"
                multiline
                rows={4}
                component={IxTextFieldForm}
                label={t('NxtReceiptTemplate.FieldLabelFooterNote')}
              />
            )}
            <Typography variant="body1" className={classes.helperText}>
              {t('NxtReceiptTemplate.FieldLabelFooterNoteHint')}
            </Typography>
          </Box>
        </Collapse>

        {/* {Footer content area end} */}

        <Box className={classes.actionButtons}>
          <Button
            variant="text"
            color="secondary"
            className={classes.previewButton}
            disabled ={!templateData}
            onClick={showPreview}
          >
            {t('NxtReceiptTemplate.PreviewBtnLabel')}
          </Button>

          <Box>
            <Button variant="outlined" color="secondary">
              {t('common.cancel_button')}
            </Button>

            <Button
              variant="contained"
              type="submit"
              color="secondary"
              startIcon={<SaveIcon />}
              className={classes.saveButton}
            >
              {t('common.save')}
            </Button>
          </Box>
        </Box>
        <Suspense fallback={<div>{t('common.loading')}</div>}>
          <IxModal
            modaltitle={t('NxtReceiptTemplate.PreviewTitle')}
            open={isTemplatePreviewOpen}
            handleClose={handleTemplatePreviewClose}
          >
            {isTemplatePreviewOpen &&  (
              <NxtReceiptTemplatePreview
                logo={logo}
                formValues={logo}
                props={props}
                formData={templateData}
                handleClose={handleTemplatePreviewClose}
              ></NxtReceiptTemplatePreview>
            )}
          </IxModal>
        </Suspense>
      </form>
    </>
  );
};

ReceiptTemplate = reduxForm({
  form: 'ReceiptTemplateForm', // a unique identifier for this form,
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  validate,
})(ReceiptTemplate);

// ReceiptTemplate = connect(
//   (state) => ({
//     templateData: state.receiptTemplate.form,
//   })
//   // { load: loadAccount } // bind action creator
// )(ReceiptTemplate);

export default ReceiptTemplate;
