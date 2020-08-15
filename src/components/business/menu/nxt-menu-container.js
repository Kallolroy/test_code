import {
  addMenu, editMenu, deleteMenu, copyMenu, overrideMenu,
  changeMenuStatus, fetchBranchMenus, fetchCompanyMenus
} from '../../../actions/company/menu-actions';
import { fetchCompanyOptSlots } from '../../../actions/company/opt-slot-actions';
import { fetchCompanyById, fetchCompanyBranches } from '../../../actions/company/company-actions';
import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import NxtMenuHome from './nxt-menu-home';

const mapDispatchToProps = dispatch => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handleMenuAdd: (data) => {
      dispatch(addMenu(data)).then(() => {
        const appContext = localStorage.getItem('appContext') ? JSON.parse(localStorage.getItem('appContext')) : { isCompany: true };
        appContext.isCompany ? dispatch(fetchCompanyMenus(user.company.id)) : dispatch(fetchBranchMenus(appContext.id))
      })
    },
    handleMenuUpdate: (data, id) => {
      dispatch(editMenu(data, id)).then(() => {
        const appContext = localStorage.getItem('appContext') ? JSON.parse(localStorage.getItem('appContext')) : { isCompany: true };
        appContext.isCompany ? dispatch(fetchCompanyMenus(user.company.id)) : dispatch(fetchBranchMenus(appContext.id))

      })
    },
    handleMenuCopy: (data, branchId, id) => {
      dispatch(copyMenu(data, branchId, id)).then(() => {
        const appContext = localStorage.getItem('appContext') ? JSON.parse(localStorage.getItem('appContext')) : { isCompany: true };
        appContext.isCompany ? dispatch(fetchCompanyMenus(user.company.id)) : dispatch(fetchBranchMenus(appContext.id))

      })
    },
    handleMenuOverride: (data, branchId, id) => {
      dispatch(overrideMenu(data, branchId, id)).then(() => {
        const appContext = localStorage.getItem('appContext') ? JSON.parse(localStorage.getItem('appContext')) : { isCompany: true };
        appContext.isCompany ? dispatch(fetchCompanyMenus(user.company.id)) : dispatch(fetchBranchMenus(appContext.id))

      })
    },
    handleMenuDelete: (id) => {
      dispatch(deleteMenu(id)).then(() => {
        const appContext = localStorage.getItem('appContext') ? JSON.parse(localStorage.getItem('appContext')) : { isCompany: true };
        appContext.isCompany ? dispatch(fetchCompanyMenus(user.company.id)) : dispatch(fetchBranchMenus(appContext.id))

      })
    },
    handleChangeMenuStatus: (id, isActive) => {
      dispatch(changeMenuStatus(id, isActive)).then(() => {
        const appContext = localStorage.getItem('appContext') ? JSON.parse(localStorage.getItem('appContext')) : { isCompany: true };
        appContext.isCompany ? dispatch(fetchCompanyMenus(user.company.id)) : dispatch(fetchBranchMenus(appContext.id))

      })
    },
    handleFetchCompanyById: () => {
      dispatch(fetchCompanyById(user.company.id));
    },
    handleFetchCompanyBranches: () => {
      dispatch(fetchCompanyBranches(user.company.id));
    },
    handleFetchBranchMenus: (branchId) => {
      dispatch(fetchBranchMenus(branchId));
    },
    handleFetchCompanyMenus: (companyId) => {
      dispatch(fetchCompanyMenus(companyId));
    },
    handleFetchCompanyOptSlots: (companyId) => {
      dispatch(fetchCompanyOptSlots(companyId));
    },
    destroyMenuForm: () => dispatch(destroy('MenuForm')),
    handleWizardSubmit: () => dispatch(submit('wizard'))
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtMenuHome);
