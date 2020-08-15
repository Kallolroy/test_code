import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import { fetchCompanyById, fetchCompanyBranches }
  from '../../../actions/company/company-actions';
import {
  fetchCompanyServingHours, addServingHour,
  editServingHour, deleteServingHour, fetchBranchServingHours
} from '../../../actions/company/serving-hour-actions';
import NxtServingHour from './nxt-serving-hour-home';

const mapDispatchToProps = dispatch => {
  return {
    handleFetchCompanyServingHours: async (companyId) => {
      const response = await dispatch(fetchCompanyServingHours(companyId));
      return response;
    },
    handleFetchBranchServingHours: async (companyId, branchId) => {
      const response = await dispatch(fetchBranchServingHours(companyId, branchId));
      return response
    },
    handleServingHourAdd: (data) => {
      dispatch(addServingHour(data)).then(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const appContext = localStorage.getItem('appContext') ? JSON.parse(localStorage.getItem('appContext')) : { isCompany: true };
        appContext.isCompany ? dispatch(fetchCompanyServingHours(user.company.id)) : dispatch(fetchBranchServingHours(user.company.id, appContext.id))
      });
    },
    handleServingHourUpdate: (data) => {
      dispatch(editServingHour(data)).then(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const appContext = localStorage.getItem('appContext') ? JSON.parse(localStorage.getItem('appContext')) : { isCompany: true };
        appContext.isCompany ? dispatch(fetchCompanyServingHours(user.company.id)) : dispatch(fetchBranchServingHours(user.company.id, appContext.id))
      })
    },
    handleDeleteServingHour: (id) => {
      dispatch(deleteServingHour(id)).then(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const appContext = localStorage.getItem('appContext') ? JSON.parse(localStorage.getItem('appContext')) : { isCompany: true };
        appContext.isCompany ? dispatch(fetchCompanyServingHours(user.company.id)) : dispatch(fetchBranchServingHours(user.company.id, appContext.id))
      })
    },
    handleFetchCompanyById: () => {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch(fetchCompanyById(user.company.id));
    },
    handleFetchCompanyBranches: () => {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch(fetchCompanyBranches(user.company.id));
    },
    destroyServingHoursForm: () => dispatch(destroy('ServingHoursForm')),
    handleWizardSubmit: () => dispatch(submit('wizard')),
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtServingHour);
