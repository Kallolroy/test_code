import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText'

const IxFileUpload = ({ input, type, id, meta, onChange, label }) => {
  //const { mimeType } = this.props;
  return (
    <Box display="flex">
      {meta && meta.invalid && meta.error && (
        <div style={
          {
            'margin-left': '-14em',
            'margin-top': '2em',
            'margin-right': '2em',
          }
        }>
          <FormHelperText style={{ 'color': 'red' }}>{meta.error}</FormHelperText>
        </div>
      )}
      <div>
        <input
          name={input.name}
          type={type}
          accept="image/*"
          style={{ display: 'none' }}
          id={id}
          onChange={(event) => input.onChange(event, this)}
        />
        <label htmlFor={id}>
          <Button variant="contained" component="span" color="secondary">
            {label}
          </Button>
        </label>
      </div>
    </Box>
  );
};

export default IxFileUpload;
