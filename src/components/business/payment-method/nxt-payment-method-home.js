import React, { useEffect, Suspense } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { useParams, Route } from 'react-router-dom';
import PaymentMethodForm from './form/nxt-payment-method-form';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import { STORE, TABLE, PAYMENT_METHODS } from '../../../constants/left-menu';
import { JCB, VISA, CASH, AMEX, DINNERS_CLUB, MASTER } from './../../../constants/ix-payment-methods'
import { IxDialogue } from '../../basic/ix-dialogue';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    // height: '100vh',
    backgroundColor: '#ffffff',
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
  tableWrapper: {
    paddingTop: '24px !important',
  },
}));

export default function NxtPaymentMethodHome({
  dispatch,
  company,
  handlePaymentMethodAdd,
  handlePaymentMethodUpdate,
  handleFetchCompanyById,
  handleFetchCompanyBranches,
  handleFetchCompanyPaymentConfigs,
  destroyPaymentMethodForm,
  handleFetchPaymentMethods,
  formData,
}) {
  const classes = useStyles();
  const [appContext, setAppContext] = React.useState(
    localStorage.getItem('appContext')
      ? JSON.parse(localStorage.getItem('appContext'))
      : { isCompany: true }
  );
  const [paymentmethodModalOpen, setPaymentMethodModalOpen] = React.useState(
    false
  );
  const [paymentmethods, setPaymentMethods] = React.useState([]);

  const [openSuccessDialogue, setOpenSuccessDialogue] = React.useState(false);

  const showingSuccessMessage = () => {
    //window.alert('Action done successfully')
    setOpenSuccessDialogue(true);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { t, i18n } = useTranslation();

  const [successMessage, setSuccessMessage] = React.useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  // const PaymentMethodForm = React.lazy(() => import('./form/nxt-payment-method-form'));


  const handlePaymentMethodSubmit = async (values) => {
debugger
    let saveData = {
      companyId: values.companyId ? values.companyId : user.company.id,
      merchandId: values.merchantId,
      merchantKey: values.merchantKey,
      companyPaymentConfigs: [],
    };

    let cashConfig = {
      merchandId: values.merchantId,
      merchantKey: values.merchantKey,
    };
    cashConfig = JSON.stringify(cashConfig);
    cashConfig = `\"${cashConfig.split('"').join('\\"')}\"`;

    let visaConfig = {
      merchandId: values.merchantId,
      merchantKey: values.merchantKey,
    };
    visaConfig = JSON.stringify(visaConfig);
    visaConfig = `\"${visaConfig.split('"').join('\\"')}\"`;

    let jcbConfig = {
      merchandId: values.merchantId,
      merchantKey: values.merchantKey,
    };
    jcbConfig = JSON.stringify(jcbConfig);
    jcbConfig = `\"${jcbConfig.split('"').join('\\"')}\"`;

    let masterConfig = {
      merchandId: values.merchantId,
      merchantKey: values.merchantKey,
    };
    masterConfig = JSON.stringify(masterConfig);
    masterConfig = `\"${masterConfig.split('"').join('\\"')}\"`;

    let maxConfig = {
      merchandId: values.merchantId,
      merchantKey: values.merchantKey,
    };
    maxConfig = JSON.stringify(maxConfig);
    maxConfig = `\"${maxConfig.split('"').join('\\"')}\"`;

    let discoverConfig = {
      merchandId: values.merchantId,
      merchantKey: values.merchantKey,
    };
    discoverConfig = JSON.stringify(discoverConfig);
    discoverConfig = `\"${discoverConfig.split('"').join('\\"')}\"`;

    if (values[CASH] === true) {
      saveData.companyPaymentConfigs.push({
        paymentMethodName: CASH,
        paymentMethodId: 1, //CASH
        paymentMethodConfig: cashConfig,
      });
    }
    if (values[AMEX] === true) {
      saveData.companyPaymentConfigs.push({
        paymentMethodName: AMEX,
        paymentMethodId: 5, //AMEX
        paymentMethodConfig: maxConfig,
      });
    }
    if (values[DINNERS_CLUB] === true) {
      saveData.companyPaymentConfigs.push({
        paymentMethodName: DINNERS_CLUB,
        paymentMethodId: 6, //DINNERS_CLUB
        paymentMethodConfig: discoverConfig,
      });
    }
    if (values[VISA] === true) {
      saveData.companyPaymentConfigs.push({
        paymentMethodName: VISA,
        paymentMethodId: 2, //VISA
        paymentMethodConfig: visaConfig,
      });
    }
    if (values[MASTER] === true) {
      saveData.companyPaymentConfigs.push({
        paymentMethodName: MASTER,
        paymentMethodId: 3, //MASTER
        paymentMethodConfig: masterConfig,
      });
    }
    if (values[JCB] === true) {
      saveData.companyPaymentConfigs.push({
        paymentMethodName: JCB,
        paymentMethodId: 4, //JCB
        paymentMethodConfig: jcbConfig,
      });
    }

    if (saveData.companyPaymentConfigs.length === 0) {
      setSuccessMessage("Nothing to save ,Please select at least one option.")
      setOpenSuccessDialogue(true)
      return;
    }

    values.id && (saveData.id = values.id);

    let response = null
    values.companyId ? (response = await handlePaymentMethodUpdate(saveData, user.company.id))
      : (response = await handlePaymentMethodAdd(saveData, user.company.id))

     handleFetchPaymentMethods();
     handleFetchCompanyPaymentConfigs(user.company.id);

    setSuccessMessage('Record saved successfully')
    setOpenSuccessDialogue(true)

  };

  const handleCompanyMenuChange = (appContext) => {
    setAppContext(appContext);
    handleFetchCompanyPaymentConfigs(user.company.id);
  };

  useEffect(() => {
     handleFetchPaymentMethods();

    handleFetchCompanyPaymentConfigs(user.company.id);

    if (!company.userCompany.data) {
      handleFetchCompanyById();
      handleFetchCompanyBranches();
    }

  }, []);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <IxDialogue
        open={openSuccessDialogue}
        handleOpen={() => setOpenSuccessDialogue(true)}
        handleClose={() => setOpenSuccessDialogue(false)}
        handleAgree={() => setOpenSuccessDialogue(false)}
        handleDisagree={() => setOpenSuccessDialogue(false)}
        title={successMessage}
      />
      <IxAppBar
        companydata={company}
        handleCompanyMenuChange={handleCompanyMenuChange}
        selectedMenu={PAYMENT_METHODS}
      ></IxAppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Box className={classes.pageTitleWrapper}>
                    <Box width="50%">
                      <Typography
                        className={classes.pageTitle}
                        variant="h6"
                        gutterBottom
                      >
                        {t('NxtPaymentMethodHome.title')}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  className={classes.tableWrapper}
                  item
                  xs={12}
                  md={12}
                  lg={12}
                >
                  <Box>
                    <Suspense fallback={<div>{t('common.loading')}</div>}>
                      {company.allPaymentMethods && company.allPaymentMethods.data &&
                        company.paymentmethods && (
                          <PaymentMethodForm
                            paymentMethods={company.allPaymentMethods.data}
                            onSubmit={handlePaymentMethodSubmit}
                            loading={company.isLoading}
                            initialValues={company.paymentmethods.data.companyId
                              ? company.paymentmethods.data : {
                                CASH: false,
                                MASTER: false,
                                JCB: false,
                                VISA: false,
                                MAX: false,
                                Discover: false
                              }}
                          // initialValues={company.paymentmethods.data}
                          ></PaymentMethodForm>
                        )}
                    </Suspense>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
