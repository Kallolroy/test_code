import React, { useEffect, Suspense } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ErrorBoundary from '../../composite/ix-error-boundary';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MaterialTable from 'material-table';
import Highcharts from 'highcharts'
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { DASHBOARD } from './../../../constants/left-menu';
import { EAT_IN, TAKE_AWAY } from './../../../constants/dashboard-chart-type';

import optionsSalesPerOrder from './options-sales-per-order'
import optionsGenderWiseCustomer from './options-gender-wise-customer'
import optionsCustomersPerOrder from './options-customers-per-day'
import optionsTopChoices from './options-top-choices'

import {
  getSalesPerDay,
  getGenderWiseCustomers,
  getCustomersPerDay,
  getTopChoices,
  getTopNotifications
} from "./../../../services/dashboard-service"

import IxAppBar from '../../composite/app-bar/ix-app-bar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    padding: theme.spacing(4.25),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    border: '1px solid rgb(232,232,232)',
  },
  fixedHeight: {
    height: 315,
  },
  appBarSpacer: {
    minHeight: 116
  },
  pageTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function NxtHome({
  dispatch,
  company,
  handleFetchCompanyById,
  handleFetchCompanyBranches
}) {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('user'));
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [appContext, setAppContext] = React.useState(localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true });
  const { t, i18n } = useTranslation();

  //charts vars
  const [salesPerOrderOption, setSalesPerOrderOption] = React.useState(optionsSalesPerOrder)
  const [genderWiseCustomerOption, setGenderWiseCustomerOption] = React.useState(optionsGenderWiseCustomer)
  const [customersPerOrderOption, setCustomersPerOrderOption] = React.useState(optionsCustomersPerOrder)
  const [topChoicesOption, setTopChoicesOption] = React.useState(optionsTopChoices)
  const [topNotifications, setTopNotifications] = React.useState([])

  // const Highcharts = React.lazy(() => import('highcharts')); // Lazy-loaded
  const HighchartsReact = React.lazy(() => import('highcharts-react-official')); // Lazy-loaded

  const handleCompanyMenuChange = async (appContext) => {
    appContext.isCompany ? await loadTopChoices(user.company.id, null) : await loadTopChoices(user.company.id, appContext.id)
    appContext.isCompany ? await loadGenderWiseCustomersData(user.company.id, null) : await loadGenderWiseCustomersData(user.company.id, appContext.id)
    appContext.isCompany ? await loadCustomersPerDayData(user.company.id, null) : await loadCustomersPerDayData(user.company.id, appContext.id)
    appContext.isCompany ? await loadSalesData(user.company.id, null) : await loadSalesData(user.company.id, appContext.id)
    appContext.isCompany ? await loadNotifications(user.company.id, null) : await loadNotifications(user.company.id, appContext.id)
    setAppContext(appContext)
  };

  //load chart data
  const loadTopChoices = async (companyId, branchId) => {
    topChoicesOption.loading = false
    const choicesData = branchId ? await getTopChoices(companyId, branchId) : await getTopChoices(companyId, null)

    topChoicesOption.series = []
    let seriesData = []
    choicesData && choicesData.data.map((cData) => {
      let foodItemName = ""
      try {
        foodItemName = JSON.parse(cData.footItemName.replace(/\\/g, ""))
      }
      catch (err) {
        foodItemName = cData.footItemName ? JSON.parse(cData.footItemName.replace(/\\/g, "").slice(1, -1)) : cData.footItemName
      }
      topChoicesOption.xAxis.categories.push(foodItemName['en-US'])
      seriesData.push(cData.foodItemCount)
    })

    seriesData.length > 0 && topChoicesOption.series.push({
      name: i18n.t('Dashboard.top_choices'),
      data: seriesData
    })

    setTopChoicesOption(topChoicesOption)
    topChoicesOption.loading = true
  }

  const loadGenderWiseCustomersData = async (companyId, branchId) => {
    genderWiseCustomerOption.loading = false
    const genderWiseCustomersData = branchId ? await getGenderWiseCustomers(companyId, branchId) : await getGenderWiseCustomers(companyId, null)
    genderWiseCustomerOption.series = []
    let series = {
      name: 'Customers %',
      colorByPoint: true,
      data: []
    }

    genderWiseCustomersData && genderWiseCustomersData.data.map((gData) => {
      series.data.push({
        name: gData.gender,
        y: gData.count
      })
    })

    series.data.length > 0 && genderWiseCustomerOption.series.push(series)
    setGenderWiseCustomerOption(genderWiseCustomerOption)
    genderWiseCustomerOption.loading = true
  }

  const loadCustomersPerDayData = async (companyId, branchId) => {
    customersPerOrderOption.loading = false
    const customersData = branchId ? await getCustomersPerDay(companyId, branchId) : await getCustomersPerDay(companyId, null)
    customersPerOrderOption.series = []
    let seriesData = []
    customersData && customersData.data.map((cData) => {
      let dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(cData.date).getDay()]
      customersPerOrderOption.xAxis.categories.push(dayName)
      seriesData.push(cData.customerCount)
    })

    let sDatatotal = 0
    seriesData.map((d) => {
      sDatatotal = sDatatotal + Number(d)
    })

    sDatatotal > 0 && customersPerOrderOption.series.push({
      name: i18n.t('Dashboard.cust_per_day'),
      data: seriesData
    })
    setCustomersPerOrderOption(customersPerOrderOption)
    customersPerOrderOption.loading = true
  }

  const loadSalesData = async (companyId, branchId) => {
    salesPerOrderOption.loading = false
    const salesData = branchId ? await getSalesPerDay(companyId, branchId) : await getSalesPerDay(companyId, null)
    salesPerOrderOption.series = []

    let eatInData = {
      name: i18n.t('Dashboard.eat_in'),
      data: []
    }
    let takeOutData = {
      name: i18n.t('Dashboard.take_out'),
      data: []
    }
    salesData && salesData.data && salesData.data.map((saleData) => {

      let dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(saleData.date).getDay()]
      salesPerOrderOption.xAxis.categories.push(dayName)

      saleData.sales.map(sale => {
        sale.dineType === EAT_IN && (eatInData.data.push(sale.amount))
        sale.dineType === TAKE_AWAY && (takeOutData.data.push(sale.amount))

      })

    })

    let eatIntotal = 0
    eatInData.data.map((d) => {
      eatIntotal = eatIntotal + Number(d)
    })

    let takeOuttotal = 0
    takeOutData.data.map((d) => {
      takeOuttotal = takeOuttotal + Number(d)
    })

    eatInData.data.length > 0 && eatIntotal > 0 && salesPerOrderOption.series.push(eatInData)
    takeOutData.data.length > 0 && takeOutData > 0 && salesPerOrderOption.series.push(takeOutData)

    setSalesPerOrderOption(salesPerOrderOption)
    salesPerOrderOption.loading = true
  }

  const loadNotifications = async (companyId, branchId) => {
    topNotifications.loading = false
    const notificationsData = branchId ? await getTopNotifications(companyId, branchId) : await getTopNotifications(companyId, null)
    notificationsData && notificationsData.data && setTopNotifications(notificationsData.data)
    topNotifications.loading = true
  }

  const loadData = async () => {
    appContext.isCompany ? await loadTopChoices(user.company.id, null) : await loadTopChoices(user.company.id, appContext.id)
    appContext.isCompany ? await loadGenderWiseCustomersData(user.company.id, null) : await loadGenderWiseCustomersData(user.company.id, appContext.id)
    appContext.isCompany ? await loadCustomersPerDayData(user.company.id, null) : await loadCustomersPerDayData(user.company.id, appContext.id)
    appContext.isCompany ? await loadSalesData(user.company.id, null) : await loadSalesData(user.company.id, appContext.id)
    appContext.isCompany ? await loadNotifications(user.company.id, null) : await loadNotifications(user.company.id, appContext.id)
  }

  useEffect(() => {
    loadData()

    if (!company.userCompany.data) {
      handleFetchCompanyById(user.company.id)
      handleFetchCompanyBranches(user.company.id)
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className={classes.root}>
        <CssBaseline />
        {/* app bar */}
        <IxAppBar companydata={company}
          handleCompanyMenuChange={handleCompanyMenuChange}
          selectedMenu={DASHBOARD}>
        </IxAppBar>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <Box className={classes.pageTitleWrapper}>
                  <Box width="50%">
                    <Typography className={classes.pageTitle} variant="h6" gutterBottom>
                      {t('Dashboard.title')}
                    </Typography></Box>
                  <Box width="50%" display="flex" justifyContent="flex-end">

                  </Box>
                </Box>
              </Grid>
              {/* Sales per order type */}
              <Grid item xs={12} md={3} lg={3}>
                <Paper border={1} className={fixedHeightPaper}>
                  {t('Dashboard.top_choices')}

                  <Box height="10px">
                    <Suspense fallback={<Box mt={8} textAlign="center">{t('common.loading')}</Box>}>
                      {topChoicesOption.series.length > 0 ?
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={topChoicesOption}
                        />
                        : topChoicesOption.loading && <Box mt={8} textAlign="center">{t('common.nodata')}</Box>}
                    </Suspense>
                  </Box>
                </Paper>
              </Grid>
              {/* Gender wise customer */}
              <Grid item xs={12} md={3} lg={3}>
                <Paper className={fixedHeightPaper}>
                  {t('Dashboard.gender_wise_cust')}
                  <Box height="10px">
                    <Suspense fallback={<Box mt={8} textAlign="center">{t('common.loading')}</Box>}>
                      {genderWiseCustomerOption.series.length > 0 ?
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={genderWiseCustomerOption}
                        />
                        : genderWiseCustomerOption.loading && <Box mt={8} textAlign="center">{t('common.nodata')}</Box>
                      }
                    </Suspense>
                  </Box>
                </Paper>
              </Grid>
              {/* Customers per day */}
              <Grid item xs={12} md={3} lg={6}>
                <Paper className={fixedHeightPaper}>
                  {t('Dashboard.cust_per_day')}
                  <Box height="10px">
                    <Suspense fallback={<Box mt={8} textAlign="center">{t('common.loading')}</Box>}>
                      {customersPerOrderOption.series.length > 0 ?
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={customersPerOrderOption}
                        />
                        : customersPerOrderOption.loading && <Box mt={8} textAlign="center">{t('common.nodata')}</Box>
                      }
                    </Suspense>
                  </Box>
                </Paper>
              </Grid>
              {/* Order type wise sales per day */}
              <Grid item xs={12} md={6} lg={6}>
                <Paper className={fixedHeightPaper}>
                  {t('Dashboard.order_wise_sales')}
                  <Box height="10px">
                    <Suspense fallback={<Box mt={8} textAlign="center">{t('common.loading')}</Box>}>
                      {
                        salesPerOrderOption.series.length > 0 ?
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={salesPerOrderOption}
                          />
                          : salesPerOrderOption.loading && <Box mt={8} textAlign="center">{t('common.nodata')}</Box>
                      }
                    </Suspense>
                  </Box>
                </Paper>
              </Grid>
              {/* Recent Notifications */}
              {appContext.isCompany &&
                <Grid item xs={12} md={6} lg={6}>
                  <Paper className={fixedHeightPaper}>
                    {t('Dashboard.recent_notifications')}
                    <Box>
                      <Suspense fallback={<Box mt={8} textAlign="center">{t('common.loading')}</Box>}>
                        <MaterialTable
                          title=""
                          columns={[
                            { title: i18n.t('common.Date'), field: 'date' },
                            { title: i18n.t('NotificationForm.Message'), field: 'message' }
                          ]}
                          data={topNotifications.map(row => {
                            row.date = new Date(row.date).toLocaleDateString("ja-JP")
                            return row
                          })}
                          options={{
                            paging: false,
                            search: false,
                            sorting: false,
                            toolbar: false
                          }}

                          detailPanel={rowData => {
                            return (
                              <Box
                                p={4}
                                width="100%"
                                height="115px"

                              >
                                {rowData.message}
                              </Box>
                            )
                          }}
                          onRowClick={(event, rowData, togglePanel) => togglePanel()}
                        />
                      </Suspense>
                    </Box>
                  </Paper>
                </Grid>}
            </Grid>
          </Container>
        </main>
      </div>

    </ErrorBoundary>
  );
}