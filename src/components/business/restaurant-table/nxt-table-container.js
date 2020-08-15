import {
  addTable,
  editTable,
  fetchBranchTables,
  fetchCompanyTables,
  fetchBranchSections,
  setGeneratedTableCode,
  deleteTable,
} from '../../../actions/company/table-actions';
import {
  fetchCompanyById,
  fetchCompanyBranches,
} from '../../../actions/company/company-actions';
import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import NxtTableHome from './nxt-table-home';

const mapDispatchToProps = (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handleGeneratedTableCodeAdd: (code) => {
      dispatch(setGeneratedTableCode(code));
    },
    handleTableAdd: async (data) => {
      await dispatch(addTable(data));
    },

    handleTableUpdate: async (data) => {
      await dispatch(editTable(data));
    },
    handleFetchCompanyById: (companyId) => {
      dispatch(fetchCompanyById(user.company.id));
    },
    handleFetchCompanyBranches: () => {
      dispatch(fetchCompanyBranches(user.company.id));
    },
    handleFetchBranchTables: (branchId) => {
      dispatch(fetchBranchTables(branchId));
    },
    // handleFetchBranchSections: (branchId) => {
    //   dispatch(fetchBranchSections(branchId));
    // },
    handleFetchCompanyTables: (companyId) => {
      dispatch(fetchCompanyTables(companyId));
    },

    handleTableDelete: (id) => {
      dispatch(deleteTable(id)).then(() => {
        const appContext = localStorage.getItem('appContext')
          ? JSON.parse(localStorage.getItem('appContext'))
          : { isCompany: true };
        appContext.isCompany
          ? dispatch(fetchCompanyTables(user.company.id))
          : dispatch(fetchBranchTables(appContext.id));
      });
    },

    destroyTableForm: () => dispatch(destroy('TableForm')),
    handleWizardSubmit: () => dispatch(submit('TableForm')),
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtTableHome);
