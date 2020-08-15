import {
  addFoodItemOptSlot, editFoodItemOptSlot, changeFoodItemOptSlotStatus,
  deleteFoodItemOptSlot, fetchFoodItemOptSlotById
}
  from '../../../actions/company/food-item-opt-slots-actions';

import { fetchBranchMenus, fetchCompanyMenus, publishMenu } from '../../../actions/company/menu-actions';
import { fetchBranchFoodCategories, fetchCompanyFoodCategories }
  from '../../../actions/company/food-category-actions';
import { fetchCategoryFoodItems } from '../../../actions/company/food-item-actions';
import { fetchCompanyOptSlots } from '../../../actions/company/opt-slot-actions';
import { fetchCompanyChoicesGroups } from '../../../actions/company/choices-group-action';
import { fetchCompanyFoodItems, fetchFoodItemByMenuId } from '../../../actions/company/food-item-actions';
import { fetchFoodItemById } from '../../../actions/company/food-item-actions';
import { fetchCompanyById, fetchCompanyBranches } from '../../../actions/company/company-actions';
import { connect } from 'react-redux';
import { destroy, submit } from 'redux-form';
import NxtFoodItemRefHome from './nxt-food-item-ref-home';
import { useParams, Route } from 'react-router-dom';



const mapDispatchToProps = (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    handlePublishMenu: async (companyId, menuId) => {
      await dispatch(publishMenu(companyId, menuId))
    },
    handleFoodItemOptSlotAdd: async (data) => {
      await dispatch(addFoodItemOptSlot(data))
    },
    handleFoodItemOptSlotUpdate: async (data) => {
      await dispatch(editFoodItemOptSlot(data))
    },
    handleChangeFoodItemOptSlotStatus: async (menuId, foodItemId, optSlotIds, isActive) => {
      await dispatch(changeFoodItemOptSlotStatus(menuId, foodItemId, optSlotIds, isActive))
    },

    handleFoodItemOptSlotDelete: async (menuId, foodItemId) => {
      await dispatch(deleteFoodItemOptSlot(menuId, foodItemId))
    },
    handleFetchCompanyById: () => {
      dispatch(fetchCompanyById(user.company.id));
    },
    handleFetchCompanyBranches: () => {
      dispatch(fetchCompanyBranches(user.company.id));
    },
    handleFetchBranchMenus: (branchId) => {
      dispatch(fetchBranchMenus(branchId));
    },
    handleFetchCompanyMenus: (companyId) => {
      dispatch(fetchCompanyMenus(companyId));
    },
    handleFetchBranchFoodCategories: (branchId) => {
      dispatch(fetchBranchFoodCategories(branchId));
    },
    handleFetchCompanyFoodCategories: (companyId) => {
      dispatch(fetchCompanyFoodCategories(companyId));
    },
    handleFetchCategoryFoodItems: (catId) => {
      dispatch(fetchCategoryFoodItems(catId));
    },
    handleFetchCompanyFoodItems: (companyId) => {
      dispatch(fetchCompanyFoodItems(companyId));
    },
    handleFetchCompanyOptSlots: (companyId) => {
      dispatch(fetchCompanyOptSlots(companyId));
    },
    handleFetchFoodItemOptSlotById: (menuId, foodItemId) => {
      fetchFoodItemOptSlotById(menuId, foodItemId);
    },
    handleFetchCompanyChoicesGroups: (companyId) => {
      dispatch(fetchCompanyChoicesGroups(companyId));
    },
    handleFetchFoodItemMenuItems: (foodItemId) => {
      dispatch(fetchFoodItemById(foodItemId));
    },
    handleFetchMenuFoodItems: (menuId) => {
      dispatch(fetchFoodItemByMenuId(menuId));
    },

    destroyMenuItemForm: () => dispatch(destroy('MenuItemForm')),
    handleWizardSubmit: () => dispatch(submit('wizard'))
  };
};

const mapStateToProps = ({ company }) => {
  return {
    company: company
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NxtFoodItemRefHome);
