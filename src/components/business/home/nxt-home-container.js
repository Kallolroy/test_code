import { editCompany, fetchCompanyById, fetchCompanyBranches } from '../../../actions/company/company-actions';
import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import NxtHome from './nxt-home';

const mapDispatchToProps = dispatch => {
  
  return {
    handleCompanyUpdate: (data) => {
      dispatch(editCompany(data));
    },
    handleFetchCompanyById: (companyId) => {
      dispatch(fetchCompanyById(companyId));
    },
    handleFetchCompanyBranches: (companyId) => {
      dispatch(fetchCompanyBranches(companyId));
    },
    destroyProjectWizardForm: () => dispatch(destroy('wizard')),
    handleWizardSubmit: () => dispatch(submit('wizard'))
  };
};

const mapStateToProps = ({ company, userListData }) => {
  return {
    userListData: userListData,
    company:company
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtHome);
