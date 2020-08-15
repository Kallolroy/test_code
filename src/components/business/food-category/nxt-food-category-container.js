import {
  addFoodCategory, editFoodCategory, changeFoodCategoryStatus, deleteFoodCategory,
  fetchBranchFoodCategories, fetchCompanyFoodCategories
} from '../../../actions/company/food-category-actions';
import { fetchCompanyOptSlots } from '../../../actions/company/opt-slot-actions';
import { fetchCompanyById, fetchCompanyBranches } from '../../../actions/company/company-actions';
import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import NxtFoodCategoryHome from './nxt-food-category-home';

const mapDispatchToProps = dispatch => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handleFoodCategoryAdd: (data) => {
      dispatch(addFoodCategory(data)).then(() => {
        // const appContext = localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true }
        dispatch(fetchCompanyFoodCategories(user.company.id))
      })
    },
    handleFoodCategoryUpdate: (data, id) => {
      dispatch(editFoodCategory(data, id)).then(() => {
        dispatch(fetchCompanyFoodCategories(user.company.id))
      });
    },
    handleChangeFoodCategoryStatus: (id, isActive) => {
      dispatch(changeFoodCategoryStatus(id, isActive)).then(() => {
        dispatch(fetchCompanyFoodCategories(user.company.id))
      });
    },
    handleFoodCategoryDelete: (id) => {
      dispatch(deleteFoodCategory(id)).then(() => {
        dispatch(fetchCompanyFoodCategories(user.company.id))
      });
    },
    handleFetchCompanyById: () => {
      dispatch(fetchCompanyById(user.company.id));
    },
    handleFetchCompanyBranches: () => {
      dispatch(fetchCompanyBranches(user.company.id));
    },
    handleFetchBranchFoodCategories: (branchId) => {
      dispatch(fetchBranchFoodCategories(branchId));
    },
    handleFetchCompanyFoodCategories: (companyId) => {
      dispatch(fetchCompanyFoodCategories(companyId));
    },
    handleFetchCompanyOptSlots: (companyId) => {
      dispatch(fetchCompanyOptSlots(companyId));
    },
    destroyFoodCategoryForm: () => dispatch(destroy('FoodCategoryForm')),
    handleWizardSubmit: () => dispatch(submit('wizard'))
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtFoodCategoryHome);
