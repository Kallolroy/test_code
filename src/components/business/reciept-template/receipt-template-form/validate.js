import i18n from '../../../../i18n';

export default function (values) {
  const errors = {};
  let requiredFields = [
    'companyName_en',
    'companyName_ja',
    'companyName_ko',
    'companyName_zh',
    'branchName_en',
    'branchName_ja',
    'branchName_ko',
    'branchName_zh',
    'branchAddress_en',
    'branchAddress_ja',
    'branchAddress_ko',
    'branchAddress_zh',
    'headerNote_en',
    'headerNote_ja',
    'headerNote_ko',
    'headerNote_zh',
    'footerNote_en',
    'footerNote_ja',
    'footerNote_ko',
    'footerNote_zh'
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = i18n.t('common.required');
    }
  });

  return errors;
}
