import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

/**
 * Autocomplete text field
 * @param {array} options Array of object. theses values will be rendered. Property of object, about to be displayed should be passed by `displayProperty`
 * @param {string} label default material design input label, only displayed if it is provided
 * @param {func} onChangeAutoComplete change event will passed as parameter
 * @param {string} displayProperty this attribute of the options will be displayed
 * @param {bool} disableClearable if clear selection icon/functionability will be appeared or not
 * @param {string} placeholder placeholder of the control
 * @param {string} title top title of the control
 */
const IxAutoComplete = ({
  options,
  label,
  id,
  defaultValue,
  onChangeAutoComplete = null,
  displayProperty = 'name.en-US',
  disableClearable = false,
  placeholder = 'All',
  title
}) => (
  <div>
    <div variant="body1" color="textSecondary">
      {title}
    </div>
    <Autocomplete
      multiple
      id={id}
      options={options}
      defaultValue={defaultValue}
      getOptionLabel={option => option[displayProperty]}
      disableClearable={disableClearable}
      onChange={(event, newValue) => {
        onChangeAutoComplete && onChangeAutoComplete(event, newValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          // size="small"
          variant="outlined"
          placeholder={placeholder}
        />
      )}
    />
  </div>
);

export default IxAutoComplete;
