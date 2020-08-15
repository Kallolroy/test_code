import {
  addKitchen,
  editKitchen,
  deleteKitchen,
  fetchBranchKitchens,
  fetchCompanyKitchens,
} from '../../../actions/company/kitchen-actions';
import {
  fetchCompanyById,
  fetchCompanyBranches,
} from '../../../actions/company/company-actions';

import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import NxtKitchenHome from './nxt-kitchen-home';

const mapDispatchToProps = (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return {
    handleKitchenAdd: (data) => {
      dispatch(addKitchen(data)).then(() => {
        const appContext = localStorage.getItem('appContext')
          ? JSON.parse(localStorage.getItem('appContext'))
          : { isCompany: true };
        appContext.isCompany
          ? dispatch(fetchCompanyKitchens(user.company.id))
          : dispatch(fetchBranchKitchens(appContext.id));
      });
    },
    handleKitchenUpdate: async (data) => {
      const response = await dispatch(editKitchen(data));
      if (response.status === 200 || response.status === 201) {
        const appContext = localStorage.getItem('appContext')
          ? JSON.parse(localStorage.getItem('appContext'))
          : { isCompany: true };
        appContext.isCompany
          ? dispatch(fetchCompanyKitchens(user.company.id))
          : dispatch(fetchBranchKitchens(appContext.id));
      }

      //getting problem with then and it fired multiple times but for quick solution has been provided over the code
      // dispatch(editKitchen(data))
      // .then(() => {
      //   const appContext = localStorage.getItem('appContext')
      //     ? JSON.parse(localStorage.getItem('appContext'))
      //     : { isCompany: true };
      //   appContext.isCompany
      //     ? dispatch(fetchCompanyKitchens(user.company.id))
      //     : dispatch(fetchBranchKitchens(appContext.id));
      // });
    },
    handleKitchenDelete: (id) => {
      dispatch(deleteKitchen(id)).then(() => {
        const appContext = localStorage.getItem('appContext')
          ? JSON.parse(localStorage.getItem('appContext'))
          : { isCompany: true };
        appContext.isCompany
          ? dispatch(fetchCompanyKitchens(user.company.id))
          : dispatch(fetchBranchKitchens(appContext.id));
      });
    },
    handleFetchCompanyById: () => {
      dispatch(fetchCompanyById(user.company.id));
    },
    handleFetchCompanyBranches: () => {
      dispatch(fetchCompanyBranches(user.company.id));
    },
    handleFetchBranchKitchens: (branchId) => {
      dispatch(fetchBranchKitchens(branchId));
    },
    handleFetchCompanyKitchens: (companyId) => {
      dispatch(fetchCompanyKitchens(companyId));
    },
    destroyKitchenForm: () => dispatch(destroy('KitchenForm')),
    handleWizardSubmit: () => dispatch(submit('wizard')),
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtKitchenHome);
