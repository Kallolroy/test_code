import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import NxtRecieptTemplateHome from './reciept-template-home';
import {
  fetchCompanyById,
  fetchCompanyBranches,
} from '../../../actions/company/company-actions';
import {
  fetchReceiptTemplate,
  addReceiptTemplate,
  editReceiptTemplate
} from '../../../actions/company/receipt-template-actions';

const mapDispatchToProps = (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handleFetchCompanyById: () => {
      dispatch(fetchCompanyById(user.company.id));
    },
    handleFetchCompanyBranches: () => {
      dispatch(fetchCompanyBranches(user.company.id));
    },
    handleFetchRecieptTemplate: async (companyId, branchId) => {
      const response = await dispatch(
        fetchReceiptTemplate(companyId, branchId)
      );
      return response;
    },
    handleAddReceiptTemplate: (payload, companyId, branchId) => {
      dispatch(addReceiptTemplate(payload, companyId, branchId));
    },
    handleUpdateReceiptTemplate: (payload, companyId, branchId, id) => {
      dispatch(editReceiptTemplate(payload, companyId, branchId, id));
    },
    
    destroyServingHoursForm: () => dispatch(destroy('RecieptTemplateForm')),
    handleWizardSubmit: () => dispatch(submit('wizard')),
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NxtRecieptTemplateHome);
