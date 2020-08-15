import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import {
  fetchCompanyStaffs, fetchBranchStaffs, fetchKitchenStaffs, addStaff, editStaff,
  deleteStaff, fetchRoles, setStaffFormInitialValues
} from '../../../actions/staff-actions';
import { fetchCompanyKitchens } from '../../../actions/company/kitchen-actions';
import { fetchCompanyBranches, fetchCompanyById } from '../../../actions/company/company-actions';
import NxtStaffs from './nxt-staffs-home';

const mapDispatchToProps = dispatch => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handleFetchCompanyStaffs: (companyId) => {
      dispatch(fetchCompanyStaffs(companyId));
    },
    handleFetchBranchStaffs: (branchId, companyId) => {
      dispatch(fetchBranchStaffs(branchId, companyId));
    },
    handleFetchKitchenStaffs: (kitchenId) => {
      dispatch(fetchKitchenStaffs(kitchenId));
    },
    handleFetchCompanyKitchens: (companyId) => {
      dispatch(fetchCompanyKitchens(companyId));
    },
    handleStaffAdd: async (data) => {
      await dispatch(addStaff(data));
    },
    handleStaffUpdate: async (data) => {
      await dispatch(editStaff(data));
    },
    handleDeleteStaff: async (id) => {
      await dispatch(deleteStaff(id));
    },
    handleFetchRoles: () => {
      dispatch(fetchRoles());
    },
    handleFetchCompanyBranches: () => {
      dispatch(fetchCompanyBranches(user.company.id));
    },
    handleFetchCompanyById: () => {
      dispatch(fetchCompanyById(user.company.id));
    },
    handleSetFormInitialValues: (data) => {
      dispatch(setStaffFormInitialValues(data));
    },
    destroyStaffsForm: () => dispatch(destroy('StaffsForm')),
    handleWizardSubmit: () => dispatch(submit('wizard')),
  };
};

const mapStateToProps = ({ company, staff }) => {
  return { company: company, staff: staff };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtStaffs);
