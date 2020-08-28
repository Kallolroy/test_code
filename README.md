The application has been implemented using ** reactjs,react-redux ,materail ui ** . All code are in ** src ** directory .The folder structure inside ** src ** as below
## Directory structure:
- action-types
- actions
- assets/
  - images
  - styles
- components/
  - basic
  - composite
  - business
- constants 
- containers
- reducers
- router
- store
- models
- utils

###### action-types: 
Contains all the Redux action types based on the application feature. For example, if we have modal action then the actions could be   
```
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
```
###### actions:
Contains all the Redux actions.  
```
export const openModal = (params: Object) => ({
    type: OPEN_MODAL,
    payload: params,
});
```
###### assets:   
Contains the static assets like images, css, scss etc. These assets are global.

###### components:  
Components are defined here. Components can be divided into 3 major categories. All component specific resources like images/styles should be here.

###### basic: 
Smallest components like input box, checkbox, radio button, button etc.  
composite: Contains one or more basic components or third-party components. Like Calendar, datepicker etc. For using third-party components, we should use a wrapper component.  

######  business:   
Contains all business specific components combining with basic and composite components.  

###### constants:  
Constants shared across the application will be kept here. You can separate them in several files.  

###### containers:  
Containers contain components. The reason is that we want to achieve separation of concern principal.  Containers only contain the data logics and components will contain the display logics. We will try to use stateless components as much as possible.

###### reducers:  
All the Redux reducers will be here including root reducer.

###### router:  
Router definitions will be here.

###### store:  
Redux Store definition will be here.

###### models:  
Interfaces as models to be used to send and receive data.

###### utils:  
All the utility classes will be here.

###### Following basic key principles while create a new component:  
1.	Keep as small as possible. Say at most 100 lines  
2.	Use functional components instead of State Components.  
3.	Use lazy loading components  
4.	If the prop/state does not change then do not render the component. For this we can use memo.
5.	Use Context API to keep state and pass data from parent to child components when possible. Consider data which are not coming from backend/api calling.
6.	Use Redux to maintain state for the application. Keep data which are coming from backend or by calling API.
7.	Use render prop design pattern when for some components you have same logic, but their presentations are different. Like display list of person/product in thumbnail view. They have same logic as
a.	Fetch the data via an api call
b.	If error display error message
c.	If success, then show the items and tiles/list
8.	Components where we have different presentation based on same data, we can follow this pattern. For example, we can have a calendar container component that has different view like day/week/month.
9.	If needed to add same functionality to some existing components, we should use higher order components.
10.	To check the property types, we can use flow.
11.	Used Hooks as much as possible to achieve different functionality.

###### Naming conventions:  
1.	File names should be all small and words separated by – (dash).
2.	Component/Class names should follow Pascal notation.
3.	For basic and composite components use prefix Ix (prefix of Ixora)
4.	For Business components use UST as prefix
5.	Use camel case for method and argument names.
6.	For css class names use all small and words separated by –(dash)
