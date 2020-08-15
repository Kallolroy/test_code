export default function (values) {
  const errors = {};
  let requiredFields = [
    'name_en',
    'name_ja',
    'name_ko',
    'name_zh',
    'description_en',
    'description_ja',
    'description_ko',
    'description_zh',
    'prepareDuration',
    'currentStock',
    'defaultPrice'
  ];

  if (values.isDailyOpeningEnabled) {
    requiredFields.push('dailyOpeningCount')
  } else {
    errors.dailyOpeningCount = null
  }

  isNaN(Number(values.prepareDuration)) && (errors.prepareDuration = 'Must be a number')
  isNaN(Number(values.defaultStock)) && (errors.defaultStock = 'Must be a number')
  isNaN(Number(values.calorie)) && (errors.calorie = 'Must be a number')
  isNaN(Number(values.dailyOpeningCount)) && (errors.dailyOpeningCount = 'Must be a number')
  isNaN(Number(values.currentStock)) && (errors.currentStock = 'Must be a number')

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (values.imageFile && values.imageFile.size) {
    // Get image size in kilobytes
    const imageFileKb = values.imageFile.size / 1024;
    const maxWeight = 150;
    if (imageFileKb > maxWeight) {
      errors.foodItemPhoto = `The image size exceeds(${maxWeight}kb)`;
    }
  }

  // if (values.imageFile) {
  //   const mimeType = 'image/jpeg';
  //   if (!mimeType.includes(values.imageFile.type)) {
  //     errors.foodItemPhoto = `Image type must be ${mimeType}`;
  //   }
  // }

  return errors;
}
