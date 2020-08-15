import {
  addCompanySetting,
  editCompanySetting,
  fetchCompanySettings,
} from '../../../actions/company/company-setting-actions';
import {
  fetchCompanyById,
  fetchCompanyBranches,
  fetchLanguage,
} from '../../../actions/company/company-actions';
import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import NxtSettingHome from './nxt-setting-home';

const mapDispatchToProps = (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handleCompanySettingAdd: (data, companyId) => {
      dispatch(addCompanySetting(data, companyId));
    },
    handleCompanySettingUpdate: (data, companyId) => {
      dispatch(editCompanySetting(data, companyId));
    },
    handleFetchCompanyById: () => {
      dispatch(fetchCompanyById(user.company.id));
    },
    handleFetchCompanyBranches: () => {
      dispatch(fetchCompanyBranches(user.company.id));
    },
    handleFetchLanguages: async () => {
      const languages = await dispatch(fetchLanguage());
    },

    handleFetchCompanySettings: async (companyId) => {
      const response = await dispatch(fetchCompanySettings(companyId));
    },
    destroyCompanySettingForm: () => dispatch(destroy('SettingForm')),
    handleWizardSubmit: () => dispatch(submit('SettingForm')),
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company,
    language: company.languageList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtSettingHome);
