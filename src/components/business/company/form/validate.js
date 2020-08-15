export default function (values) {
  const errors = {};
  const requiredFields = [
    'name',
    'firstName',
    'lastName',
    'userEmail',
    'email',
    'address',
    'phone',
    'userName',
    'password',
    'confirmPassword',
    'allowableBranches',
    'allowableUsers'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }

  isNaN(Number(values.allowableBranches)) && (errors.allowableBranches = 'Must be a number')
  isNaN(Number(values.allowableUsers)) && (errors.allowableUsers = 'Must be a number')

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password mismatched';
  }

  return errors;
}
