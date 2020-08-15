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
import CompanySettingForm from './form/setting-form';
import IxAppBar from '../../composite/app-bar/ix-app-bar';
import { STORE, TABLE, SETTINGS } from '../../../constants/left-menu';
import { IxDialogue } from '../../basic/ix-dialogue';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
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

export default function NxtSettingHome({
  dispatch,
  company,
  language,
  handleCompanySettingAdd,
  handleCompanySettingUpdate,
  handleFetchCompanyById,
  handleFetchCompanyBranches,
  handleFetchCompanySettings,
  destroyCompanySettingForm,
  handleFetchLanguages,
}) {
  const classes = useStyles();
  const [appContext, setAppContext] = React.useState(
    localStorage.getItem('appContext')
      ? JSON.parse(localStorage.getItem('appContext'))
      : { isCompany: true }
  );
  const [companysettingModalOpen, setCompanySettingModalOpen] = React.useState(
    false
  );
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const [companySettingData, setCompanySettingData] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
  const menuOptions = [{ displayName: 'Edit' }, { displayName: 'Delete' }];
  const [successMessage, setSuccessMessage] = React.useState('');

  const [
    openDeleteConfirmDialogue,
    setOpenDeleteConfirmDialogue,
  ] = React.useState(false);

  const showingSuccessMessage = () => {
    //window.alert('Action done successfully')
    setOpenDeleteConfirmDialogue(true);
  };

  const handleCompanySettingSubmit = async (values) => {
    //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);

    let configs = [];

    let TABLE_CHARGES = {
      companyId: user.company.id,
      configName: 'TABLE_CHARGES',
      configValue: Number(values['TABLE_CHARGES']),
    };
    if (values['TABLE_CHARGES_ID']) {
      TABLE_CHARGES.id = values['TABLE_CHARGES_ID'];
      //handleCompanySettingUpdate(TABLE_CHARGES, user.company.id);
    } else {
      //handleCompanySettingAdd(TABLE_CHARGES, user.company.id);
    }
    configs.push(TABLE_CHARGES)

    let EAT_IN_TAX = {
      companyId: user.company.id,
      configName: 'EAT_IN_TAX',
      configValue: Number(values['EAT_IN_TAX']),
    };
    if (values['EAT_IN_TAX_ID']) {
      EAT_IN_TAX.id = values['EAT_IN_TAX_ID'];
      //handleCompanySettingUpdate(EAT_IN_TAX, user.company.id);
    } else {
      //handleCompanySettingAdd(EAT_IN_TAX, user.company.id);
    }
    configs.push(EAT_IN_TAX)

    let TAKE_AWAY_TAX = {
      companyId: user.company.id,
      configName: 'TAKE_AWAY_TAX',
      configValue: Number(values['TAKE_AWAY_TAX']),
    };
    if (values['TAKE_AWAY_TAX_ID']) {
      TAKE_AWAY_TAX.id = values['TAKE_AWAY_TAX_ID'];
      //handleCompanySettingUpdate(TAKE_AWAY_TAX, user.company.id);
    } else {
      //handleCompanySettingAdd(TAKE_AWAY_TAX, user.company.id);
    }
    configs.push(TAKE_AWAY_TAX)

    let KIDS_DISCOUNT = {
      companyId: user.company.id,
      configName: 'KIDS_DISCOUNT',
      configValue: Number(values['KIDS_DISCOUNT']),
    };
    if (values['KIDS_DISCOUNT_ID']) {
      KIDS_DISCOUNT.id = values['KIDS_DISCOUNT_ID'];
      //handleCompanySettingUpdate(KIDS_DISCOUNT, user.company.id);
    } else {
      //handleCompanySettingAdd(KIDS_DISCOUNT, user.company.id);
    }
    configs.push(KIDS_DISCOUNT)

    let DEFAULT_LANGUAGE = {
      companyId: user.company.id,
      configName: 'DEFAULT_LANGUAGE',
      configValue: values['DEFAULT_LANGUAGE'],
    };
    if (values['DEFAULT_LANGUAGE_ID']) {
      DEFAULT_LANGUAGE.id = values['DEFAULT_LANGUAGE_ID'];
      //handleCompanySettingUpdate(DEFAULT_LANGUAGE, user.company.id);
    } else {
      //handleCompanySettingAdd(DEFAULT_LANGUAGE, user.company.id);
    }
    configs.push(DEFAULT_LANGUAGE)

    let DAILY_STOCK_UPDATE = {
      companyId: user.company.id,
      configName: 'DAILY_STOCK_UPDATE',
      configValue: values['DAILY_STOCK_UPDATE'] ? values['DAILY_STOCK_UPDATE'] : false,
    };

    if (values['DAILY_STOCK_UPDATE_ID']) {
      DAILY_STOCK_UPDATE.id = values['DAILY_STOCK_UPDATE_ID'];
      //handleCompanySettingUpdate(DAILY_STOCK_UPDATE, user.company.id);
      //setSuccessMessage(t('SettingForm.messageUpdate'));
    } else {
      //handleCompanySettingAdd(DAILY_STOCK_UPDATE, user.company.id);
      //setSuccessMessage(t('SettingForm.messageInsert'));
    }
    configs.push(DAILY_STOCK_UPDATE)

    DAILY_STOCK_UPDATE.id ? handleCompanySettingUpdate(configs, user.company.id) : handleCompanySettingAdd(configs, user.company.id)

    setSuccessMessage(t('SettingForm.messageUpdate'));
    showingSuccessMessage();
  };

  const handleCompanyMenuChange = (appContext) => {
    setAppContext(appContext);
  };

  const loadSettings = async () => {
    appContext.isCompany && (await handleFetchCompanySettings(user.company.id));
    setCompanySettingModalOpen(true);
  };

  const loadLanguage = () => {
    //   company.languageList.data.length(setLanguages(company.languageList.data));

    company &&
      company.languageList !== undefined &&
      setLanguages(company.languageList.data);
  };

  useEffect(() => {
    loadSettings();
    handleFetchLanguages();

    if (!company.userCompany.data) {
      handleFetchCompanyById();
      handleFetchCompanyBranches();
    }
    loadLanguage();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IxAppBar
        companydata={company}
        handleCompanyMenuChange={handleCompanyMenuChange}
        selectedMenu={SETTINGS}
      ></IxAppBar>

      <IxDialogue
        open={openDeleteConfirmDialogue}
        handleOpen={() => setOpenDeleteConfirmDialogue(true)}
        handleClose={() => setOpenDeleteConfirmDialogue(false)}
        handleAgree={() => setOpenDeleteConfirmDialogue(false)}
        handleDisagree={() => setOpenDeleteConfirmDialogue(false)}
        title={successMessage}
      />

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
                        {t('NxtCompanySettingHome.title')}
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
                      {companysettingModalOpen &&
                        company.companysettings &&
                        company.companysettings.data &&
                        company.languageList &&
                        company.languageList.data && (
                          <CompanySettingForm
                            onSubmit={handleCompanySettingSubmit}
                            loading={company.isLoading}
                            languageList={company.languageList}
                            companySettingData={company.companysettings.data.filter(
                              (c) => c.companyId === user.company.id
                            )}
                          ></CompanySettingForm>
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
