export default function (values) {
  const errors = {};
  const requiredFields = [
    'TABLE_CHARGES',
    'EAT_IN_TAX',
    'TAKE_AWAY_TAX',
    'KIDS_DISCOUNT',
    'DEFAULT_LANGUAGE',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  isNaN(Number(values.TABLE_CHARGES)) && (errors.TABLE_CHARGES = 'Must be a number')
  isNaN(Number(values.EAT_IN_TAX)) && (errors.EAT_IN_TAX = 'Must be a number')
  isNaN(Number(values.TAKE_AWAY_TAX)) && (errors.TAKE_AWAY_TAX = 'Must be a number')
  isNaN(Number(values.KIDS_DISCOUNT)) && (errors.KIDS_DISCOUNT = 'Must be a number')
  
  return errors;
}
