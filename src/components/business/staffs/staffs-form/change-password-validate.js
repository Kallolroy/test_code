import i18n from '../../../../i18n';

export default function (values) {
    const errors = {};
    let requiredFields = [
        'oldPassword',
        'password',
        'confirmPassword',
      
    ];

    requiredFields.forEach(field => {
        if (!values[field]) {
        errors[field] = i18n.t('common.required');
        }
    });

   
    if(values['confirmPassword'] && (values['password'] !== values['confirmPassword'])){
        errors.confirmPassword = i18n.t('common.password_does_not_match_error');
    }
   

    return errors;
}
