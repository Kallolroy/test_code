import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'

import HomeContainer from '../components/business/home/nxt-home-container';
import StoreContainer from '../components/business/store/nxt-store-container';
import TableContainer from '../components/business/restaurant-table/nxt-table-container';
import KitchenContainer from '../components/business/kitchen/nxt-kitchen-container';
import MenuContainer from '../components/business/menu/nxt-menu-container';
import MenuItemContainer from '../components/business/menu-item/nxt-menu-item-container';
import FoodCategoryContainer from '../components/business/food-category/nxt-food-category-container';
import FoodItemContainer from '../components/business/food-item/nxt-food-item-container';
import FoodItemRefContainer from '../components/business/food-item-ref/nxt-food-item-ref-container';
import About from '../components/business/about';
import ErrorBoundary from '../components/composite/ix-error-boundary';
import { themeLoginHome } from '../utils/themes';
import { ThemeProvider } from '@material-ui/core/styles';
import LoginContainer from '../components/business/login/login-container';
import ResetPasswordContainer from '../components/business/reset-password/reset-password-container';
import ForgotPasswordContainer from '../components/business/forgot-password/forgot-password-container';
import NxtChoicesGroupContainer from '../components/business/choices-group/nxt-choices-group-container';
import NxtServingHoursContainer from '../components/business/serving-hour/nxt-serving-hours-container';
import PaymentMethodContainer from '../components/business/payment-method/nxt-payment-method-container';
import SettingContainer from '../components/business/settings/nxt-setting-container';
import NxtStaffsContainer from '../components/business/staffs/nxt-staffs-container';
import AuthRoute from './auth-route';
import NxtRecieptTemplateContainer from '../components/business/reciept-template/reciept-template-container';
import CompanyContainer from '../components/business/company/nxt-company-container';
import NotificationContainer from '../components/business/notifications/nxt-notification-container';

export const AppRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" render={props => <ThemeProvider theme={themeLoginHome}><LoginContainer {...props} /> </ThemeProvider>} />
            <Route exact path="/resetpassword" render={props => <ErrorBoundary><ThemeProvider theme={themeLoginHome}><ResetPasswordContainer {...props} /> </ThemeProvider></ErrorBoundary>} />
            <Route exact path="/forgotpassword/:resetCode" render={props => <ErrorBoundary><ThemeProvider theme={themeLoginHome}><ForgotPasswordContainer {...props} /> </ThemeProvider></ErrorBoundary>} />
            <Route exact path="/about" render={props => <About {...props} />} />
            <AuthRoute exact path="/" component={HomeContainer} />
            <AuthRoute exact path="/home" component={HomeContainer} />
            <AuthRoute exact path="/store" component={StoreContainer} />
            <AuthRoute exact path="/restauranttables" component={TableContainer} />
            <AuthRoute exact path="/kitchens" component={KitchenContainer} />
            <AuthRoute exact path="/menus" component={MenuContainer} />
            <AuthRoute exact path="/menu-items/:menuId" component={MenuItemContainer} />
            <AuthRoute exact path="/food-categories" component={FoodCategoryContainer} />
            <AuthRoute exact path="/food-items/:catId?" component={FoodItemContainer} />
            <AuthRoute exact path="/food-items-ref/:itemId/:refType?" component={FoodItemRefContainer} />
            <AuthRoute exact path="/choices-group" component={ NxtChoicesGroupContainer } />
            <AuthRoute exact path="/serving-hours" component={ NxtServingHoursContainer } />
            <AuthRoute exact path="/payment-methods" component={ PaymentMethodContainer } />
            <AuthRoute exact path="/settings" component={ SettingContainer } />
            <AuthRoute exact path="/receipt-template" component={ NxtRecieptTemplateContainer } />
            <AuthRoute exact path="/staffs" component={ NxtStaffsContainer } />
            <AuthRoute exact path="/companies" component={CompanyContainer} />
            <AuthRoute exact path="/notifications" component={NotificationContainer} />
            <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
    </BrowserRouter>
);