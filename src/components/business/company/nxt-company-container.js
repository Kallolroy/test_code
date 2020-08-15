import { addCompany, editCompany, fetchCompanies, deleteCompany }
  from '../../../actions/company/company-actions';
import { addNotification, editNotification, fetchNotifications }
  from '../../../actions/company/notification-actions';
import { destroy, submit } from 'redux-form';
import { connect } from 'react-redux';
import NxtCompanyHome from './nxt-company-home';

const mapDispatchToProps = dispatch => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handleCompanyAdd: (data) => {
      dispatch(addCompany(data))
        .then(() => {
          dispatch(fetchCompanies())
        })
    },
    handleCompanyUpdate: (data, id) => {
      dispatch(editCompany(data, id)).then(() => {
        dispatch(fetchCompanies())
      })
    },
    handleCompanyDelete: (id) => {
      dispatch(deleteCompany(id)).then(() => {
        dispatch(fetchCompanies())
      })
    },
    handleFetchCompanies: () => {
      dispatch(fetchCompanies());
    },
    handleNotificationAdd: (data) => {
      dispatch(addNotification(data));
    },

    destroyCompanyForm: () => dispatch(destroy('CompanyForm')),
    handleWizardSubmit: () => dispatch(submit('CompanyForm')),
    destroyNotificationForm: () => dispatch(destroy('NotificationForm')),
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtCompanyHome);
