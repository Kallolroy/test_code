import {
  GET_COMPANIES_REQUEST,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_FAILURE,
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILURE,
  GET_COMPANY_BRANCHES_REQUEST,
  GET_COMPANY_BRANCHES_SUCCESS,
  GET_COMPANY_BRANCHES_FAILURE,
  EDIT_COMPANY_REQUEST,
  EDIT_COMPANY_SUCCESS,
  EDIT_COMPANY_FAILURE,
  ADD_COMPANY_REQUEST,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILURE,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAILURE,
} from '../../action-types/company/company-types';

import {
  GET_BRANCHES_REQUEST,
  GET_BRANCHES_SUCCESS,
  GET_BRANCHES_FAILURE,
  GET_BRANCH_REQUEST,
  GET_BRANCH_SUCCESS,
  GET_BRANCH_FAILURE,
  EDIT_BRANCH_REQUEST,
  EDIT_BRANCH_SUCCESS,
  EDIT_BRANCH_FAILURE,
  ADD_BRANCH_REQUEST,
  ADD_BRANCH_SUCCESS,
  ADD_BRANCH_FAILURE,
  DELETE_BRANCH_REQUEST,
  DELETE_BRANCH_SUCCESS,
  DELETE_BRANCH_FAILURE,
} from '../../action-types/company/branch-types';

import {
  GET_TABLES_REQUEST,
  GET_TABLES_SUCCESS,
  GET_TABLES_FAILURE,
  GET_TABLE_REQUEST,
  GET_TABLE_SUCCESS,
  GET_TABLE_FAILURE,
  GET_SECTIONS_REQUEST,
  GET_SECTIONS_SUCCESS,
  GET_SECTIONS_FAILURE,
  EDIT_TABLE_REQUEST,
  EDIT_TABLE_SUCCESS,
  EDIT_TABLE_FAILURE,
  ADD_TABLE_REQUEST,
  ADD_TABLE_SUCCESS,
  ADD_TABLE_FAILURE,
  ADD_GENERATED_TABLE_CODE,
  DELETE_TABLE_REQUEST,
  DELETE_TABLE_SUCCESS,
  DELETE_TABLE_FAILURE,
} from '../../action-types/company/table-types';

import {
  GET_KITCHENS_REQUEST,
  GET_KITCHENS_SUCCESS,
  GET_KITCHENS_FAILURE,
  GET_KITCHEN_REQUEST,
  GET_KITCHEN_SUCCESS,
  GET_KITCHEN_FAILURE,
  EDIT_KITCHEN_REQUEST,
  EDIT_KITCHEN_SUCCESS,
  EDIT_KITCHEN_FAILURE,
  ADD_KITCHEN_REQUEST,
  ADD_KITCHEN_SUCCESS,
  ADD_KITCHEN_FAILURE,
  DELETE_KITCHEN_REQUEST,
  DELETE_KITCHEN_SUCCESS,
  DELETE_KITCHEN_FAILURE,
} from '../../action-types/company/kitchen-types';

import {
  GET_MENUS_REQUEST,
  GET_MENUS_SUCCESS,
  GET_MENUS_FAILURE,
  GET_MENU_REQUEST,
  GET_MENU_SUCCESS,
  GET_MENU_FAILURE,
  EDIT_MENU_REQUEST,
  EDIT_MENU_SUCCESS,
  PUBLISH_MENU_REQUEST,
  EDIT_MENU_FAILURE,
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
  ADD_MENU_FAILURE,
  DELETE_MENU_REQUEST,
  DELETE_MENU_SUCCESS,
  DELETE_MENU_FAILURE,
} from '../../action-types/company/menu-types';

import {
  GET_OPTSLOTS_REQUEST,
  GET_OPTSLOTS_SUCCESS,
  GET_OPTSLOTS_FAILURE,
  GET_OPTSLOT_REQUEST,
  GET_OPTSLOT_SUCCESS,
  GET_OPTSLOT_FAILURE,
  EDIT_OPTSLOT_REQUEST,
  EDIT_OPTSLOT_SUCCESS,
  EDIT_OPTSLOT_FAILURE,
  ADD_OPTSLOT_REQUEST,
  ADD_OPTSLOT_SUCCESS,
  ADD_OPTSLOT_FAILURE,
} from '../../action-types/company/opt-slot-types';

import {
  GET_MENUITEMS_REQUEST,
  GET_MENUITEMS_SUCCESS,
  GET_MENUITEMS_FAILURE,
  GET_MENUITEM_REQUEST,
  GET_MENUITEM_SUCCESS,
  GET_MENUITEM_FAILURE,
  EDIT_MENUITEM_REQUEST,
  EDIT_MENUITEM_SUCCESS,
  EDIT_MENUITEM_FAILURE,
  ADD_MENUITEM_REQUEST,
  ADD_MENUITEM_SUCCESS,
  ADD_MENUITEM_FAILURE,
} from '../../action-types/company/menu-item-types';

import {
  GET_FOODCATEGORIES_REQUEST,
  GET_FOODCATEGORIES_SUCCESS,
  GET_FOODCATEGORIES_FAILURE,
  GET_FOODCATEGORY_REQUEST,
  GET_FOODCATEGORY_SUCCESS,
  GET_FOODCATEGORY_FAILURE,
  EDIT_FOODCATEGORY_REQUEST,
  EDIT_FOODCATEGORY_SUCCESS,
  EDIT_FOODCATEGORY_FAILURE,
  ADD_FOODCATEGORY_REQUEST,
  ADD_FOODCATEGORY_SUCCESS,
  ADD_FOODCATEGORY_FAILURE,
  DELETE_FOODCATEGORY_REQUEST,
  DELETE_FOODCATEGORY_SUCCESS,
  DELETE_FOODCATEGORY_FAILURE,
} from '../../action-types/company/food-category-types';

import {
  GET_FOODITEMS_REQUEST,
  GET_FOODITEMS_SUCCESS,
  GET_MENUFOODITEMS_REQUEST,
  GET_MENUFOODITEMS_SUCCESS,
  GET_MENUFOODITEMS_FAILURE,
  GET_FOODITEMS_FAILURE,
  GET_FOODITEM_REQUEST,
  GET_FOODITEM_SUCCESS,
  GET_FOODITEM_FAILURE,
  EDIT_FOODITEM_REQUEST,
  EDIT_FOODITEM_SUCCESS,
  EDIT_FOODITEM_FAILURE,
  ADD_FOODITEM_REQUEST,
  ADD_FOODITEM_SUCCESS,
  ADD_FOODITEM_FAILURE,
  DELETE_FOODITEM_REQUEST,
  DELETE_FOODITEM_SUCCESS,
  DELETE_FOODITEM_FAILURE,
} from '../../action-types/company/food-item-types';

import {
  GET_CHOICES_GROUPS_REQUEST,
  GET_CHOICES_GROUPS_SUCCESS,
  GET_CHOICES_GROUPS_FAILURE,
  GET_CHOICES_GROUP_SUCCESS,
  GET_CHOICES_GROUP_REQUEST,
  GET_CHOICES_GROUP_FAILURE,
  EDIT_CHOICES_GROUP_REQUEST,
  EDIT_CHOICES_GROUP_SUCCESS,
  EDIT_CHOICES_GROUP_FAILURE,
  ADD_CHOICES_GROUP_REQUEST,
  ADD_CHOICES_GROUP_SUCCESS,
  ADD_CHOICES_GROUP_FAILURE,
  DELETE_CHOICES_GROUP_REQUEST,
  DELETE_CHOICES_GROUP_SUCCESS,
  DELETE_CHOICES_GROUP_FAILURE,
} from '../../action-types/company/choices-group-types';

import {
  GET_SERVING_HOURS_REQUEST,
  GET_SERVING_HOURS_SUCCESS,
  GET_SERVING_HOURS_FAILURE,
  ADD_SERVING_HOUR_REQUEST,
  ADD_SERVING_HOUR_SUCCESS,
  ADD_SERVING_HOUR_FAILURE,
  EDIT_SERVING_HOUR_REQUEST,
  EDIT_SERVING_HOUR_SUCCESS,
  EDIT_SERVING_HOUR_FAILURE,
  DELETE_SERVING_HOUR_REQUEST,
  DELETE_SERVING_HOUR_SUCCESS,
  DELETE_SERVING_HOUR_FAILURE,
} from '../../action-types/company/serving-hour-types';

import {
  GET_FOOD_ITEM_OPT_SLOTS_REQUEST,
  GET_FOOD_ITEM_OPT_SLOTS_SUCCESS,
  GET_FOOD_ITEM_OPT_SLOTS_FAILURE,
  GET_FOOD_ITEM_OPT_SLOT_REQUEST,
  GET_FOOD_ITEM_OPT_SLOT_SUCCESS,
  GET_FOOD_ITEM_OPT_SLOT_FAILURE,
  EDIT_FOOD_ITEM_OPT_SLOT_REQUEST,
  EDIT_FOOD_ITEM_OPT_SLOT_SUCCESS,
  EDIT_FOOD_ITEM_OPT_SLOT_FAILURE,
  ADD_FOOD_ITEM_OPT_SLOT_REQUEST,
  ADD_FOOD_ITEM_OPT_SLOT_SUCCESS,
  ADD_FOOD_ITEM_OPT_SLOT_FAILURE,
  DELETE_FOOD_ITEM_OPT_SLOT_REQUEST,
  DELETE_FOOD_ITEM_OPT_SLOT_SUCCESS,
  DELETE_FOOD_ITEM_OPT_SLOT_FAILURE,
} from '../../action-types/company/food-item-opt-slots-types';

import {
  GET_PAYMENTMETHODS_REQUEST,
  GET_PAYMENTMETHODS_SUCCESS,
  GET_PAYMENTMETHODS_FAILURE,
  GET_PAYMENTMETHOD_REQUEST,
  GET_PAYMENTMETHOD_SUCCESS,
  GET_PAYMENTMETHOD_FAILURE,
  EDIT_PAYMENTMETHOD_REQUEST,
  EDIT_PAYMENTMETHOD_SUCCESS,
  EDIT_PAYMENTMETHOD_FAILURE,
  ADD_PAYMENTMETHOD_REQUEST,
  ADD_PAYMENTMETHOD_SUCCESS,
  ADD_PAYMENTMETHOD_FAILURE,
  ADD_PAYMENTMETHODS_SUCCESS,
  ADD_PAYMENTMETHODS_FAILURE,
} from '../../action-types/company/payment-method-types';

import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAILURE,
  EDIT_NOTIFICATION_REQUEST,
  EDIT_NOTIFICATION_SUCCESS,
  EDIT_NOTIFICATION_FAILURE,
  ADD_NOTIFICATION_REQUEST,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAILURE,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAILURE,
} from '../../action-types/company/notification-types';

import {
  GET_COMPANYSETTINGS_REQUEST,
  GET_COMPANYSETTINGS_SUCCESS,
  GET_COMPANYSETTINGS_FAILURE,
  GET_COMPANYSETTING_REQUEST,
  GET_COMPANYSETTING_SUCCESS,
  GET_COMPANYSETTING_FAILURE,
  EDIT_COMPANYSETTING_REQUEST,
  EDIT_COMPANYSETTING_SUCCESS,
  EDIT_COMPANYSETTING_FAILURE,
  ADD_COMPANYSETTING_REQUEST,
  ADD_COMPANYSETTING_SUCCESS,
  ADD_COMPANYSETTING_FAILURE,
  GET_LANGUAGE_REQUEST,
  GET_LANGUAGE_SUCCESS,
  GET_LANGUAGE_FAILURE,
} from '../../action-types/company/company-setting-types';

import {
  GET_RECEIPT_TEMPLATE_REQUEST,
  GET_RECEIPT_TEMPLATE_SUCCESS,
  GET_RECEIPT_TEMPLATE_FAILURE,
  ADD_RECEIPT_TEMPLATE_REQUEST,
  ADD_RECEIPT_TEMPLATE_SUCCESS,
  ADD_RECEIPT_TEMPLATE_FAILURE,
  EDIT_RECEIPT_TEMPLATE_REQUEST,
  EDIT_RECEIPT_TEMPLATE_SUCCESS,
  EDIT_RECEIPT_TEMPLATE_FAILURE,
  SET_RECEIPT_TEMPLATE_FORM_DATA,
} from '../../action-types/receipt-template-types';

const initialState = {
  companyList: [],
  userCompany: {},
  branches: [],
  tables: [],
  branch: {},
  kitchens: [],
  menus: [],
  optSlots: [],
  MenuItems: [],
  fooditems: [],
  ChoicesGroups: [],
  ServingHours: [],
  sections: [],
};

const companyReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_COMPANIES_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_COMPANIES_SUCCESS:
      return { ...state, isLoading: false, companyList: payload.companies };
    case GET_COMPANIES_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case GET_LANGUAGE_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_LANGUAGE_SUCCESS:
      return { ...state, isLoading: false, languageList: payload.language };
    case GET_LANGUAGE_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case GET_COMPANY_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_COMPANY_SUCCESS:
      return { ...state, isLoading: false, userCompany: payload.userCompany };
    case GET_COMPANY_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case GET_COMPANY_BRANCHES_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_COMPANY_BRANCHES_SUCCESS:
      return { ...state, isLoading: false, branches: payload.branches };
    case GET_COMPANY_BRANCHES_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_COMPANY_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_COMPANY_SUCCESS:
      return { ...state, isLoading: false, userCompany: payload.userCompany };
    case EDIT_COMPANY_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case ADD_COMPANY_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_COMPANY_SUCCESS:
      return { ...state, isLoading: false, userCompany: payload.userCompany };
    case ADD_COMPANY_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case DELETE_COMPANY_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case DELETE_COMPANY_SUCCESS:
      return { ...state, isLoading: false, userCompany: payload.response };
    case DELETE_COMPANY_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case ADD_BRANCH_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_BRANCH_SUCCESS:
      return { ...state, isLoading: false, branch: payload.branch };
    case ADD_BRANCH_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case DELETE_BRANCH_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case DELETE_BRANCH_SUCCESS:
      return { ...state, isLoading: false, branch: payload.branch };
    case DELETE_BRANCH_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case ADD_TABLE_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_TABLE_SUCCESS:
      return { ...state, isLoading: false, table: payload.table };
    case ADD_TABLE_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_TABLE_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_TABLE_SUCCESS:
      return { ...state, isLoading: false, table: payload.table };
    case EDIT_TABLE_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case GET_TABLES_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_TABLES_SUCCESS:
      return { ...state, isLoading: false, tables: payload.tables };
    case GET_TABLES_FAILURE:
      return { ...state, isLoading: false, error: payload, tables: [] };
    case ADD_GENERATED_TABLE_CODE:
      return { ...state, isLoading: false, generatedTableCode: payload };
    case DELETE_TABLE_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case DELETE_TABLE_SUCCESS:
      return { ...state, isLoading: false, KITCHEN: payload.kitchen };
    case DELETE_TABLE_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case ADD_KITCHEN_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_KITCHEN_SUCCESS:
      return { ...state, isLoading: false, KITCHEN: payload.kitchen };
    case ADD_KITCHEN_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case DELETE_KITCHEN_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case DELETE_KITCHEN_SUCCESS:
      return { ...state, isLoading: false, KITCHEN: payload.kitchen };
    case DELETE_KITCHEN_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_KITCHEN_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_KITCHEN_SUCCESS:
      return { ...state, isLoading: false, KITCHEN: payload.kitchen };
    case EDIT_KITCHEN_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case GET_KITCHENS_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_KITCHENS_SUCCESS:
      return { ...state, isLoading: false, kitchens: payload.kitchens };
    case GET_KITCHENS_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case ADD_MENU_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_MENU_SUCCESS:
      return { ...state, isLoading: false, menu: payload.menu };
    case ADD_MENU_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_MENU_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case PUBLISH_MENU_REQUEST:
      return { ...state, isPublishing: payload.isPublishing };
    case EDIT_MENU_SUCCESS:
      return { ...state, isLoading: false, isPublishing: false, menu: payload.menu };
    case EDIT_MENU_FAILURE:
      return { ...state, isLoading: false, isPublishing: false, error: payload };
    case DELETE_MENU_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case DELETE_MENU_SUCCESS:
      return { ...state, isLoading: false, menu: payload.menu };
    case DELETE_MENU_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case GET_MENUS_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_MENUS_SUCCESS:
      return { ...state, isLoading: false, menus: payload.menus };
    case GET_MENUS_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case ADD_OPTSLOT_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_OPTSLOT_SUCCESS:
      return { ...state, isLoading: false, optSlot: payload.OPTSLOT };
    case ADD_OPTSLOT_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_OPTSLOT_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_OPTSLOT_SUCCESS:
      return { ...state, isLoading: false, optSlot: payload.OPTSLOT };
    case EDIT_OPTSLOT_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case GET_OPTSLOTS_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_OPTSLOTS_SUCCESS:
      return { ...state, isLoading: false, optSlots: payload.optSlots };
    case GET_OPTSLOTS_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case ADD_MENUITEM_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_MENUITEM_SUCCESS:
      return { ...state, isLoading: false, menuitem: payload.menuitem };
    case ADD_MENUITEM_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_MENUITEM_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_MENUITEM_SUCCESS:
      return { ...state, isLoading: false, menuitem: payload.menuitem };
    case EDIT_MENUITEM_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case GET_MENUITEMS_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_MENUITEMS_SUCCESS:
      return { ...state, isLoading: false, MenuItems: payload.menuitems };
    case GET_MENUITEMS_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case ADD_FOODCATEGORY_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_FOODCATEGORY_SUCCESS:
      return { ...state, isLoading: false, foodcategory: payload.foodcategory };
    case ADD_FOODCATEGORY_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_FOODCATEGORY_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_FOODCATEGORY_SUCCESS:
      return { ...state, isLoading: false, foodcategory: payload.foodcategory };
    case EDIT_FOODCATEGORY_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case DELETE_FOODCATEGORY_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case DELETE_FOODCATEGORY_SUCCESS:
      return { ...state, isLoading: false, foodcategory: payload.foodcategory };
    case DELETE_FOODCATEGORY_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case GET_FOODCATEGORIES_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_FOODCATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        foodcategories: payload.foodcategories,
      };
    case GET_FOODCATEGORIES_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case ADD_FOODITEM_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_FOODITEM_SUCCESS:
      return { ...state, isLoading: false, fooditem: payload.fooditem };
    case ADD_FOODITEM_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_FOODITEM_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_FOODITEM_SUCCESS:
      return { ...state, isLoading: false, fooditem: payload.fooditem };
    case EDIT_FOODITEM_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case DELETE_FOODITEM_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case DELETE_FOODITEM_SUCCESS:
      return { ...state, isLoading: false, fooditem: payload.fooditem };
    case DELETE_FOODITEM_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case GET_FOODITEMS_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_FOODITEMS_SUCCESS:
      return { ...state, isLoading: false, fooditems: payload.fooditems };
    case GET_MENUFOODITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        menufooditems: payload.menufooditems,
      };
    case GET_MENUFOODITEMS_FAILURE:
      return { ...state, isLoading: false, error: payload, menufooditems: [] };
    case GET_FOODITEMS_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case GET_FOODITEM_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_FOODITEM_SUCCESS:
      return { ...state, isLoading: false, fooditem: payload.fooditem };
    case GET_FOODITEM_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case GET_CHOICES_GROUPS_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_CHOICES_GROUPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ChoicesGroups: payload.choicesGroups,
      };
    case GET_CHOICES_GROUPS_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case GET_CHOICES_GROUP_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_CHOICES_GROUP_SUCCESS:
      return { ...state, isLoading: false, ChoicesGroup: payload.choicesGroup };
    case GET_CHOICES_GROUP_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case ADD_CHOICES_GROUP_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_CHOICES_GROUP_SUCCESS:
      return { ...state, isLoading: false, ChoicesGroup: payload.choicesGroup };
    case ADD_CHOICES_GROUP_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_CHOICES_GROUP_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_CHOICES_GROUP_SUCCESS:
      return { ...state, isLoading: false, ChoicesGroup: payload.choicesGroup };
    case EDIT_CHOICES_GROUP_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case DELETE_CHOICES_GROUP_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case DELETE_CHOICES_GROUP_SUCCESS:
      return { ...state, isLoading: false };
    case DELETE_CHOICES_GROUP_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case GET_SERVING_HOURS_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_SERVING_HOURS_SUCCESS:
      return { ...state, isLoading: false, ServingHours: payload.servingHours };
    case GET_SERVING_HOURS_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case ADD_SERVING_HOUR_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_SERVING_HOUR_SUCCESS:
      return { ...state, isLoading: false, ServingHour: payload.servingHour };
    case ADD_SERVING_HOUR_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_SERVING_HOUR_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_SERVING_HOUR_SUCCESS:
      return { ...state, isLoading: false, ChoicesGroup: payload.choicesGroup };
    case EDIT_SERVING_HOUR_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case DELETE_SERVING_HOUR_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case DELETE_SERVING_HOUR_SUCCESS:
      return { ...state, isLoading: false };
    case DELETE_SERVING_HOUR_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case GET_FOOD_ITEM_OPT_SLOTS_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_FOOD_ITEM_OPT_SLOTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        Food_item_opt_slots: payload.food_item_opt_slots,
      };
    case GET_FOOD_ITEM_OPT_SLOTS_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case ADD_FOOD_ITEM_OPT_SLOT_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_FOOD_ITEM_OPT_SLOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        Food_item_opt_slot: payload.food_item_opt_slot,
      };
    case ADD_FOOD_ITEM_OPT_SLOT_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_FOOD_ITEM_OPT_SLOT_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_FOOD_ITEM_OPT_SLOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        Food_item_opt_slot: payload.food_item_opt_slot,
      };
    case EDIT_FOOD_ITEM_OPT_SLOT_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case DELETE_FOOD_ITEM_OPT_SLOT_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case DELETE_FOOD_ITEM_OPT_SLOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        Food_item_opt_slot: payload.food_item_opt_slot,
      };
    case DELETE_FOOD_ITEM_OPT_SLOT_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case GET_SECTIONS_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_SECTIONS_SUCCESS:
      return { ...state, isLoading: false, sections: payload.sections };
    case GET_SECTIONS_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case GET_PAYMENTMETHODS_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_PAYMENTMETHODS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paymentmethods: payload.paymentmethods,
      };
    case GET_PAYMENTMETHODS_FAILURE:
      return { ...state, isLoading: false, error: payload, paymentmethods: [] };
    case GET_PAYMENTMETHOD_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_PAYMENTMETHOD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paymentmethod: payload.paymentmethod,
      };
    case GET_PAYMENTMETHOD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        paymentmethod: null,
      };
    case ADD_PAYMENTMETHOD_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_PAYMENTMETHOD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paymentmethod: payload.paymentmethod,
      };
    case ADD_PAYMENTMETHODS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allPaymentMethods: payload.paymentmethod,
      };
    case ADD_PAYMENTMETHODS_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case ADD_PAYMENTMETHOD_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_PAYMENTMETHOD_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_PAYMENTMETHOD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paymentmethod: payload.paymentmethod,
      };
    case EDIT_PAYMENTMETHOD_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case GET_NOTIFICATIONS_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notifications: payload.notifications,
      };
    case GET_NOTIFICATIONS_FAILURE:
      return { ...state, isLoading: false, error: payload, notifications: [] };
    case GET_NOTIFICATION_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_NOTIFICATION_SUCCESS:
      return { ...state, isLoading: false, notification: payload.notification };
    case GET_NOTIFICATION_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case ADD_NOTIFICATION_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_NOTIFICATION_SUCCESS:
      return { ...state, isLoading: false, notification: payload.notification };
    case ADD_NOTIFICATION_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_NOTIFICATION_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_NOTIFICATION_SUCCESS:
      return { ...state, isLoading: false, notification: payload.notification };
    case EDIT_NOTIFICATION_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case GET_COMPANYSETTINGS_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_COMPANYSETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companysettings: payload.companysettings,
      };
    case GET_COMPANYSETTINGS_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case GET_COMPANYSETTING_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_COMPANYSETTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companysetting: payload.companysetting,
      };
    case GET_COMPANYSETTING_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case ADD_COMPANYSETTING_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_COMPANYSETTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companysetting: payload.companysetting,
      };
    case ADD_COMPANYSETTING_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case EDIT_COMPANYSETTING_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_COMPANYSETTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companysetting: payload.companysetting,
      };
    case EDIT_COMPANYSETTING_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case GET_RECEIPT_TEMPLATE_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case GET_RECEIPT_TEMPLATE_SUCCESS:
      return { ...state, isLoading: false, receiptTemplate: payload.ReceiptTemplate };
    case GET_RECEIPT_TEMPLATE_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case EDIT_RECEIPT_TEMPLATE_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case EDIT_RECEIPT_TEMPLATE_SUCCESS:
      return { ...state, isLoading: false, receiptTemplate: payload.receiptTemplate };
    case EDIT_RECEIPT_TEMPLATE_FAILURE:
      return { ...state, isLoading: false, error: payload };

    case ADD_RECEIPT_TEMPLATE_REQUEST:
      return { ...state, isLoading: payload.isLoading };
    case ADD_RECEIPT_TEMPLATE_SUCCESS:
      return { ...state, isLoading: false, receiptTemplate: payload.receiptTemplate };
    case ADD_RECEIPT_TEMPLATE_FAILURE:
      return { ...state, isLoading: false, error: payload };


    default:
      return state;
  }
};

export default companyReducer;
