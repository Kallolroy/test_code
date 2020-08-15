import i18n from '../../../../i18n';

export default function (values) {
  const errors = {};
  const requiredFields = [
    'name',
    'address',
    'email',
    'phone',
    'allowableBranches',
    'allowableBranches'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.phone && !/^\+(?:[0-9]●?){6,14}[0-9]$/i.test(values.phone)) {
    errors.phone = i18n.t('common.invalid_phone_input_error');
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
}
