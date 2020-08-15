import { addMenuItem, editMenuItem, fetchBranchMenuItems, fetchMenuMenuItems } from '../../../actions/company/menu-item-actions';
import { fetchCompanyById, fetchCompanyBranches } from '../../../actions/company/company-actions';
import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import NxtMenuItemHome from './nxt-menu-item-home';

const mapDispatchToProps = dispatch => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handleMenuItemAdd: (data) => {
      dispatch(addMenuItem(data));
    },
    handleMenuItemUpdate: (data) => {
      dispatch(editMenuItem(data));
    },
    handleFetchCompanyById: (companyId) => {
      dispatch(fetchCompanyById(user.company.id));
    },
    handleFetchCompanyBranches: () => {
      dispatch(fetchCompanyBranches(user.company.id));
    },
    handleFetchMenuMenuItems: (menuId) => {
      dispatch(fetchMenuMenuItems(menuId));
    },
    destroyMenuItemForm: () => dispatch(destroy('MenuItemForm')),
    handleWizardSubmit: () => dispatch(submit('wizard'))
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtMenuItemHome);
