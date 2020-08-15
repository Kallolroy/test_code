import {
  addFoodItem, editFoodItem, changeFoodItemStatus, deleteFoodItem, fetchBranchFoodItems,
  fetchCompanyFoodItems, fetchCategoryFoodItems, updateFoodItemStock, reOrderFoodItem
}
  from '../../../actions/company/food-item-actions';
import { fetchCompanyById, fetchCompanyBranches }
  from '../../../actions/company/company-actions';
import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import NxtFoodItemHome from './nxt-food-item-home';

const mapDispatchToProps = dispatch => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handleFoodItemAdd: (data) => {
      dispatch(addFoodItem(data)).then(() => {
        const appContext = localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true }
        appContext.isCompany ? dispatch(fetchCompanyFoodItems(user.company.id)) : dispatch(fetchBranchFoodItems(user.company.id, appContext.id));

      });
    },
    handleFoodItemUpdate: (data, id) => {
      dispatch(editFoodItem(data, id)).then(() => {
        const appContext = localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true }
        appContext.isCompany ? dispatch(fetchCompanyFoodItems(user.company.id)) : dispatch(fetchBranchFoodItems(user.company.id, appContext.id));

      });
    },
    handleFoodItemReOrder: (sourceId, destinationId) => {
      dispatch(reOrderFoodItem(sourceId, destinationId)).then(() => {
        const appContext = localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true }
        appContext.isCompany ? dispatch(fetchCompanyFoodItems(user.company.id)) : dispatch(fetchBranchFoodItems(user.company.id, appContext.id));

      });
    },
    handleChangeFoodItemStatus: (id, isActive) => {
      dispatch(changeFoodItemStatus(id, isActive)).then(() => {
        const appContext = localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true }
        appContext.isCompany ? dispatch(fetchCompanyFoodItems(user.company.id)) : dispatch(fetchBranchFoodItems(user.company.id, appContext.id));

      });
    },
    handleFoodItemDelete: (id) => {
      dispatch(deleteFoodItem(id)).then(() => {
        const appContext = localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true }
        appContext.isCompany ? dispatch(fetchCompanyFoodItems(user.company.id)) : dispatch(fetchBranchFoodItems(user.company.id, appContext.id));

      });
    },
    handleUpdateFoodItemStock: (data, id, branchId) => {
      dispatch(updateFoodItemStock(data, branchId, id)).then(() => {
        const appContext = localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true }
        appContext.isCompany ? dispatch(fetchCompanyFoodItems(user.company.id)) : dispatch(fetchBranchFoodItems(user.company.id, appContext.id));

      });
    },
    handleFetchCompanyById: () => {
      dispatch(fetchCompanyById(user.company.id));
    },
    handleFetchCompanyBranches: () => {
      dispatch(fetchCompanyBranches(user.company.id));
    },
    handleFetchBranchFoodItems: (branchId) => {
      dispatch(fetchBranchFoodItems(user.company.id, branchId));
    },
    handleFetchCategoryFoodItems: (catId) => {
      dispatch(fetchCategoryFoodItems(catId));
    },
    handleFetchCompanyFoodItems: (companyId) => {
      dispatch(fetchCompanyFoodItems(companyId));
    },
    destroyFoodItemForm: () => dispatch(destroy('FoodItemForm')),
    handleWizardSubmit: () => dispatch(submit('wizard'))
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtFoodItemHome);
