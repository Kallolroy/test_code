import i18n from '../../../../i18n';

export default function (values) {
  const errors = {};
  let requiredFields = [
    'name_en',
    'name_ja',
    'name_ko',
    'name_zh',
  ];
  
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = i18n.t('common.required');
    }
  });

  // todo : implement later
  // if (!values.choicesItems || !values.choicesItems.length) {
  //   // errors.members = { _error: 'At least one choiceItem must be entered' }
  // } else {
  //   const choicesItemsArrayErrors = []
  //   values.choicesItems.forEach((choiceItem, choiceItemIndex) => {
  //     const choiceItemErrors = {}
  //     if (!choiceItem || !choiceItem.name_en) {
  //       choiceItemErrors.name_en = 'Required'
  //       choicesItemsArrayErrors[choiceItemIndex] = choiceItemErrors
  //     }
  //     if (!choiceItem || !choiceItem.price) {
  //       choiceItemErrors.price = 'Required'
  //       choicesItemsArrayErrors[choiceItemIndex] = choiceItemErrors
  //     }
  //   })
  
  //   if (choicesItemsArrayErrors.length) {
  //     errors['choicesItems'] = choicesItemsArrayErrors
  //   }
  // }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) ) {
    errors.email = 'Invalid email address';
  }

  return errors;
}
