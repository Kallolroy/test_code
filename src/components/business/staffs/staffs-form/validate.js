import i18n from '../../../../i18n';
import { PLATFORM_ADMIN, COMPANY_ADMIN, BRANCH_ADMIN } 
from '../../../../constants/ix-user-roles'

export default function (values) {
    const errors = {};
    let requiredFields = [
        'firstName',
        'lastName',
        'userName',
        'email',
        'password',
        'confirmPassword',
        'oldPassword',
        'roles',
        'branch',
    ];

    if (values['roles'] && values['roles'].length) {
        for (let i = 0; i < values['roles'].length; i++) {
            const value = values['roles'][i]['name'].toLowerCase();
            if (value === PLATFORM_ADMIN || value === COMPANY_ADMIN) {
                const branchIndex = requiredFields.findIndex(field => field === 'branch');
                requiredFields.splice(branchIndex, 1);
                // const kitchenIndex = requiredFields.findIndex(field => field === 'kitchen');
                // requiredFields.splice(kitchenIndex,1);
                break;
            }
        }
    }

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = i18n.t('common.required');
        }
    });

    if (values['roles'] && !values['roles'].length) {
        errors.roles = i18n.t('common.required');
    }

    if (values['confirmPassword'] && (values['password'] !== values['confirmPassword'])) {
        errors.confirmPassword = i18n.t('common.password_does_not_match_error');
    }

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
