import { addBranch, editBranch, deleteBranch } from '../../../actions/company/branch-actions';
import { editCompany, fetchCompanyById, fetchCompanyBranches } from '../../../actions/company/company-actions';
import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import NxtStoreHome from './nxt-store-home';

const mapDispatchToProps = dispatch => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handleBranchAdd: (data) => {
      dispatch(addBranch(data)).then(() => dispatch(fetchCompanyBranches(user.company.id)))
    },
    handleBranchUpdate: (data) => {
      dispatch(editBranch(data)).then(() => dispatch(fetchCompanyBranches(user.company.id)))
    },
    handleBranchDelete: (id) => {
      dispatch(deleteBranch(id)).then(() => dispatch(fetchCompanyBranches(user.company.id)))
    },
    handleFetchCompanyById: () => {
      dispatch(fetchCompanyById(user.company.id));
    },
    handleFetchCompanyBranches: () => {
      dispatch(fetchCompanyBranches(user.company.id));
    },
    destroyBranchForm: () => dispatch(destroy('BranchForm')),
    handleWizardSubmit: () => dispatch(submit('wizard'))
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtStoreHome);
