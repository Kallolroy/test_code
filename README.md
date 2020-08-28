The application has been implemented using reactjs,react-redux ,materail ui . The folder structure as below
###### Directory structure:
*action-types
*actions
assets/
images
styles
components/
basic
composite
business
constants 
containers
reducers
router
store
models
utils

action-types:
Contains all the Redux action types based on the application feature. For example, if we have modal action then the actions could be 
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

actions:
Contains all the Redux actions.
export const openModal = (params: Object) => ({
type: OPEN_MODAL,
payload: params,
});

assets:
Contains the static assets like images, css, scss etc. These assets are global.

components:
Components are defined here. Components can be divided into 3 major categories. All component specific resources like images/styles should be here.

basic: Smallest components like input box, checkbox, radio button, button etc.
composite: Contains one or more basic components or third-party components. Like Calendar, datepicker etc. For using third-party components, we should use a wrapper component.

business: Contains all business specific components combining with basic and composite components.

constants:
Constants shared across the application will be kept here. You can separate them in several files.

containers:
Containers contain components. The reason is that we want to achieve separation of concern principal.  Containers only contain the data logics and components will contain the display logics. We will try to use stateless components as much as possible.

reducers:
All the Redux reducers will be here including root reducer.

router:
Router definitions will be here.

store:
Redux Store definition will be here.

models:
Interfaces as models to be used to send and receive data.

utils:
All the utility classes will be here.
