import { JCB, VISA, CASH, MAX, Discover, MASTER } from './../../../../constants/ix-payment-methods'

export default function (values) {
  const errors = {};
  const requiredFields = [];
  if (
    values[JCB] === true ||
    values[VISA] === true ||
    values[CASH] === true ||
    values[MAX] === true ||
    values[Discover] === true ||
    values[MASTER] === true
  ) {
    requiredFields.push('merchantId');
    requiredFields.push('merchantKey');
  }

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });


  return errors;
}
