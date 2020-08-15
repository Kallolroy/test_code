import React, { Suspense } from 'react';
import {
  CssBaseline,
  Container,
  Grid,
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import ReceiptTemplateForm from './receipt-template-form/receipt-template-form';
import InfoIcon from '@material-ui/icons/Info';

import { RECEIPT_TEMPLATE } from '../../../constants/left-menu';
import { useTranslation } from 'react-i18next';
import { IxDialogue } from '../../basic/ix-dialogue';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100em',
    backgroundColor: '#ffffff',
  },
  container: {
    padding: theme.spacing(5.25),
  },
  appBarSpacer: {
    minHeight: 116,
  },
  pageTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: 'rgba(0,0,0,0.87)',
    marginTop: '5px',
    marginBottom: '5px',
  },
  pageInfoWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    border: '1px solid rgba(224, 224, 224, 1)',
    borderRadius: '4px',
  },
  pageInfoIcon: {
    width: '70px',
    color: 'rgba(0,0,0,0.3)',
  },
  pageInfo: {
    flexGrow: 1,
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgba(0,0,0,0.54)',
  },
  formWrapper: {},
}));

const NxtRecieptTemplateHome = ({
  company,
  // templateData,
  handleSetFormData,
  handleFetchCompanyById,
  handleFetchCompanyBranches,
  handleFetchRecieptTemplate,
  handleAddReceiptTemplate,
  handleUpdateReceiptTemplate,
  form,
}) => {
  const classes = useStyles();
  const [t] = useTranslation();
  const [appContext, setAppContext] = React.useState(
    localStorage.getItem('appContext')
      ? JSON.parse(localStorage.getItem('appContext'))
      : { isCompany: true }
  );
  const [templateData, setTemplateData] = React.useState({});
  const [successMessage, setSuccessMessage] = React.useState('');

  const [loggedInUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [templateFormVisible, setTemplateFormVisible] = React.useState(false);
  const [openSuccessConfirmDialogue, setOpenSuccessConfirmDialogue] = React.useState(false);

  const [receiptTemplateFormOpen, setReceiptTemplateFormOpen] = React.useState(false);

  const handleCompanyMenuChange = (appContext) => {
    setTemplateFormVisible(false);
    setAppContext(appContext)
    fetchData(appContext)
  };

  const fetchData = async (appContext) => {
    if (!appContext.isCompany) {
      const data = await handleFetchRecieptTemplate(loggedInUser.company.id, appContext.id);
      setTemplateFormVisible(true);
    }
  };

  const handleReceiptSubmit = async (values) => {
    let saveData = {};
    let headerText = {
      'en-US': {},
      'ja-JP': {},
      'ko-KR': {},
      'zh-CN': {},
    };
    let footerText = {
      'en-US': {},
      'ja-JP': {},
      'ko-KR': {},
      'zh-CN': {},
    };

    values.companyName_en &&
      (headerText['en-US'].companyName = values.companyName_en);
    values.companyName_ja &&
      (headerText['ja-JP'].companyName = values.companyName_ja);
    values.companyName_ko &&
      (headerText['ko-KR'].companyName = values.companyName_ko);
    values.companyName_zh &&
      (headerText['zh-CN'].companyName = values.companyName_zh);

    values.branchName_en &&
      (headerText['en-US'].branchName = values.branchName_en);
    values.branchName_ja &&
      (headerText['ja-JP'].branchName = values.branchName_ja);
    values.branchName_ko &&
      (headerText['ko-KR'].branchName = values.branchName_ko);
    values.branchName_zh &&
      (headerText['zh-CN'].branchName = values.branchName_zh);

    values.phone_en && (headerText['en-US'].phone = values.phone_en);
    values.phone_ja && (headerText['ja-JP'].phone = values.phone_ja);
    values.phone_ko && (headerText['ko-KR'].phone = values.phone_ko);
    values.phone_zh && (headerText['zh-CN'].phone = values.phone_zh);

    values.branchAddress_en &&
      (headerText['en-US'].branchAddress = values.branchAddress_en);
    values.branchAddress_ja &&
      (headerText['ja-JP'].branchAddress = values.branchAddress_ja);
    values.branchAddress_ko &&
      (headerText['ko-KR'].branchAddress = values.branchAddress_ko);
    values.branchAddress_zh &&
      (headerText['zh-CN'].branchAddress = values.branchAddress_zh);

    values.headerNote_en && (headerText['en-US'].note = values.headerNote_en);
    values.headerNote_ja && (headerText['ja-JP'].note = values.headerNote_ja);
    values.headerNote_ko && (headerText['ko-KR'].note = values.headerNote_ko);
    values.headerNote_zh && (headerText['zh-CN'].note = values.headerNote_zh);

    values.footerNote_en && (footerText['en-US'].note = values.footerNote_en);
    values.footerNote_ja && (footerText['ja-JP'].note = values.footerNote_ja);
    values.footerNote_ko && (footerText['ko-KR'].note = values.footerNote_ko);
    values.footerNote_zh && (footerText['zh-CN'].note = values.footerNote_zh);

    values.imageFile && (saveData.imageFile = values.imageFile);
    saveData.headerText = headerText;
    saveData.footerText = footerText;
    if (!values.id) {
      saveData.companyId = loggedInUser.company.id;
      saveData.branchId = !appContext.isCompany ? appContext.id : null;
    } else {
      saveData.id = values.id;
      saveData.companyId = values.companyId;
      saveData.branchId = values.branchId;
    }

    saveData.headerText = JSON.stringify(saveData.headerText);
    saveData.headerText = `\"${saveData.headerText.split('"').join('\\"')}\"`;
    saveData.footerText = JSON.stringify(saveData.footerText);
    saveData.footerText = `\"${saveData.footerText.split('"').join('\\"')}\"`;

    values.photo && (saveData.photo = values.photo);
    //Object.assign(saveData, values);

    let payload = new FormData();
    Object.keys(saveData).forEach((key) => payload.append(key, saveData[key]));

    values.id
      ? setSuccessMessage(t('NxtReceiptTemplate.messageUpdate'))
      : setSuccessMessage(t('NxtReceiptTemplate.messageInsert'));

    values.id
      ? await handleUpdateReceiptTemplate(
        payload,
        saveData.companyId,
        saveData.branchId,
        values.id
      )
      : await handleAddReceiptTemplate(
        payload,
        saveData.companyId,
        saveData.branchId
      );
    showingSuccessMessage();
  };

  const showingSuccessMessage = () => {
    //window.alert('Action done successfully')
    setOpenSuccessConfirmDialogue(true);
  };

  React.useEffect(() => {
    fetchData(appContext);

    if (!company.userCompany.data) {
      handleFetchCompanyById();
      handleFetchCompanyBranches();
    }
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <IxAppBar
          companydata={company}
          handleCompanyMenuChange={handleCompanyMenuChange}
          selectedMenu={RECEIPT_TEMPLATE}
        ></IxAppBar>
      </Suspense>

      <IxDialogue
        open={openSuccessConfirmDialogue}
        handleOpen={() => setOpenSuccessConfirmDialogue(true)}
        handleClose={() => setOpenSuccessConfirmDialogue(false)}
        handleAgree={() => setOpenSuccessConfirmDialogue(false)}
        handleDisagree={() => setOpenSuccessConfirmDialogue(false)}
        title={successMessage}
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer}> </div>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Box className={classes.pageTitleWrapper}>
                    <Box width="100%">
                      <Typography
                        className={classes.pageTitle}
                        variant="h6"
                        gutterBottom
                      >
                        {t('NxtReceiptTemplate.Title')}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className={classes.pageInfoWrapper}>
                    <InfoIcon className={classes.pageInfoIcon} />
                    <Typography className={classes.pageInfo}>
                      {t('NxtReceiptTemplate.Info')}
                    </Typography>
                  </Box>

                  <Box className={classes.formWrapper}>
                    {templateFormVisible && (
                      <ReceiptTemplateForm
                        templateData={company.receiptTemplate}
                        onSubmit={handleReceiptSubmit}
                      ></ReceiptTemplateForm>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default NxtRecieptTemplateHome;
