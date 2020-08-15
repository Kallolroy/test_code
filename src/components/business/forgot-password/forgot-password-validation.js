const ForgotPasswordValidate = values => {
  const errors = {};
  const requiredFields = [
   
    'password',
    'confirmPassword',
   
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password mismatched';
  }
  return errors;
}

export default ForgotPasswordValidate