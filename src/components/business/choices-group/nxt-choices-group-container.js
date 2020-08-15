import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import NxtChoicesGroup from './nxt-choices-group';
import { fetchCompanyById, fetchCompanyBranches }
  from '../../../actions/company/company-actions';
import {
  fetchChoiceGroup, fetchCompanyChoicesGroups, changeChoicesGroupStatus,
  addChoicesGroup, editChoicesGroup, deleteChoicesGroup
}
  from '../../../actions/company/choices-group-action';

const mapDispatchToProps = dispatch => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handlefetchChoiceGroup: (id) => {
      dispatch(fetchChoiceGroup(id));
    },
    handleFetchCompanyChoicesGroups: (companyId) => {
      dispatch(fetchCompanyChoicesGroups(companyId))
    },
    handleChoicesGroupAdd: (data) => {
      dispatch(addChoicesGroup(data)).then(() => {
        dispatch(fetchCompanyChoicesGroups(user.company.id))
      })
    },
    handleFetchCompanyById: () => {
      dispatch(fetchCompanyById(user.company.id));
    },
    handleFetchCompanyBranches: () => {
      dispatch(fetchCompanyBranches(user.company.id));
    },
    handleChoicesGroupUpdate: (data) => {
      dispatch(editChoicesGroup(data)).then(() => {
        dispatch(fetchCompanyChoicesGroups(user.company.id))
      })
    },
    handleChangeChoicesGroupStatus: (id, isActive) => {
      dispatch(changeChoicesGroupStatus(id, isActive)).then(() => {
        dispatch(fetchCompanyChoicesGroups(user.company.id))
      })
    },
    handleDeleteChoiceGroup: (id) => {
      dispatch(deleteChoicesGroup(id)).then(() => {
        dispatch(fetchCompanyChoicesGroups(user.company.id))
      })
    },
    destroyChoiceGroupForm: () => dispatch(destroy('ChoiceGroupForm')),
    handleWizardSubmit: () => dispatch(submit('wizard')),
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtChoicesGroup);
