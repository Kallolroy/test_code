import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import { errorReducer } from './error-reducer';
import companyReducer from './company/company-reducer';
import staffReducer from './staff-readucer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    error: errorReducer,
    company:companyReducer,
    staff: staffReducer
  });

