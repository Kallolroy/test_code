import {
    GET_STAFFS_REQUEST,
    GET_STAFFS_SUCCESS,
    GET_STAFFS_FAILURE,

    ADD_STAFF_REQUEST,
    ADD_STAFF_SUCCESS,
    ADD_STAFF_FAILURE,

    EDIT_STAFF_REQUEST,
    EDIT_STAFF_SUCCESS,
    EDIT_STAFF_FAILURE,

    DELETE_STAFF_REQUEST,
    DELETE_STAFF_SUCCESS,
    DELETE_STAFF_FAILURE,

    SET_STAFF_FORM_INITIAL_VALUES,

    GET_ROLES_REQUEST,
    GET_ROLES_SUCCESS,
    GET_ROLES_FAILURE,
} from '../action-types/staff-types';

const initialState = {
    staffs: [],
    roles: [],
    formInitialValue: {}
};

const staffReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_STAFFS_REQUEST:
            return { ...state, isLoading: payload.isLoading };
        case GET_STAFFS_SUCCESS:
            return { ...state, isLoading: false, staffs: payload.staffs };
        case GET_STAFFS_FAILURE:
            return { ...state, isLoading: false, error: payload, staffs: [] };
        case ADD_STAFF_REQUEST:
            return { ...state, isLoading: payload.isLoading };
        case ADD_STAFF_SUCCESS:
            return { ...state, isLoading: false, Staff: payload.staff };
        case ADD_STAFF_FAILURE:
            return { ...state, isLoading: false, error: payload };
        case EDIT_STAFF_REQUEST:
            return { ...state, isLoading: payload.isLoading };
        case EDIT_STAFF_SUCCESS:
            return { ...state, isLoading: false, Staff: payload.staff };
        case EDIT_STAFF_FAILURE:
            return { ...state, isLoading: false, error: payload };
        case DELETE_STAFF_REQUEST:
            return { ...state, isLoading: payload.isLoading };
        case DELETE_STAFF_SUCCESS:
            return { ...state, isLoading: false };
        case DELETE_STAFF_FAILURE:
            return { ...state, isLoading: false, error: payload };
        case GET_ROLES_REQUEST:
            return { ...state, isLoading: payload.isLoading };
        case GET_ROLES_SUCCESS:
            return { ...state, isLoading: false, roles: payload.roles };
        case GET_ROLES_FAILURE:
            return { ...state, isLoading: false, error: payload };
        case SET_STAFF_FORM_INITIAL_VALUES:
            return { ...state, formInitialValue: payload.data };

        default:
            return state;
    }
};

export default staffReducer;
