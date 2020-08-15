import {
  getPaymentMethods,
  addPaymentMethod,
  editPaymentMethod,
  fetchCompanyPaymentConfigs,
} from '../../../actions/company/payment-method-actions';
import {
  fetchCompanyById,
  fetchCompanyBranches,
} from '../../../actions/company/company-actions';
import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import NxtPaymentMethodHome from './nxt-payment-method-home';

const mapDispatchToProps = (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handlePaymentMethodAdd: async (data, companyId) => {
      const response = await dispatch(addPaymentMethod(data, companyId));
      return response
    },
    handlePaymentMethodUpdate: async (data, companyId) => {
      const response = await dispatch(editPaymentMethod(data, companyId));
      return response
    },
    handleFetchCompanyById: () => {
      dispatch(fetchCompanyById(user.company.id));
    },
    handleFetchCompanyBranches: () => {
      dispatch(fetchCompanyBranches(user.company.id));
    },
    handleFetchPaymentMethods: async () => {
      await dispatch(getPaymentMethods());
    },
    handleFetchCompanyPaymentConfigs: (companyId) => {
      dispatch(fetchCompanyPaymentConfigs(companyId));
      //return result;
    },
    destroyPaymentMethodForm: () => dispatch(destroy('PaymentMethodForm')),
    handleWizardSubmit: () => dispatch(submit('PaymentMethodForm')),
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company,
    // formData: form.PaymentMethodForm,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NxtPaymentMethodHome);
