export default function (values) {
  const errors = {};
  let requiredFields = [
    'name_en',
    // 'price_0'
  ];
  
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  !values.Categories && (errors.category_0 = 'Required')
  isNaN(Number(values.price_0)) && (errors.price_0 = 'Must be a number')

  return errors;
}
