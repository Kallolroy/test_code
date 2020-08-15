export default function (values) {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'allowableBranches',
    'allowableUsers'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  isNaN(Number(values.allowableBranches)) && (errors.allowableBranches = 'Must be a number')
  isNaN(Number(values.allowableUsers)) && (errors.allowableUsers = 'Must be a number')

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }

  if (values.imageFile && values.imageFile.size) {
    // Get image size in kilobytes
    const imageFileKb = values.imageFile.size / 1024;
    const maxWeight = 150;
    if (imageFileKb > maxWeight) {
      errors.companyLogo = `The image size exceeds(${maxWeight}kb)`;
    }
  }

  // if (values.imageFile) {
  //   const mimeType = 'image/jpeg';
  //   if (!mimeType.includes(values.imageFile.type)) {
  //     errors.companyLogo = `Image type must be ${mimeType}`;
  //   }
  // }

  return errors;
}
