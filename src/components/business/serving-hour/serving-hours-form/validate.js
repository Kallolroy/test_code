import i18n from '../../../../i18n';

export default function (values) {
    const errors = {};
    let requiredFields = [
      'name',
      'startTime',
      'endTime',
    ];
    
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = i18n.t('common.required');
      }
    });
  
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) ) {
      errors.email = i18n.t('common.invalid_email_input_error');
    }
  
    return errors;
  }
  