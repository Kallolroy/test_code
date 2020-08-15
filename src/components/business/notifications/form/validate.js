export default function (values) {
  const errors = {};
  const requiredFields = [
    'subject',
    'body'

  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
}
