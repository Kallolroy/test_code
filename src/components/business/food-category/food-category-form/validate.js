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
      errors[field] = 'Required';
    }
  });
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
      errors.category_logo = `The image size exceeds(${maxWeight}kb)`;
    }
  }

  values.id && values.id === Number(values.parentId) && (errors.parentId = 'Parent child could not be same')

  return errors;
}
