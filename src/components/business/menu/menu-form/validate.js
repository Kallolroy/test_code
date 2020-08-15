export default function (values) {
  const errors = {};
  let requiredFields = [
    'name_en',
    'name_ja',
    'name_ko',
    'name_zh',
    'keyName',
  ];
  if (values.menuType === 'ALL_YOU_CAN_EAT' || values.menuType === 'ALL_YOU_CAN_DRINK') {
    requiredFields.push('packagePrice')
    requiredFields.push('lastTimeToOrder')
    requiredFields.push('timeBoundDuration')
    requiredFields.push('reminderTime')
    isNaN(Number(values.packagePrice)) && (errors.packagePrice = 'Must be a number')
    isNaN(Number(values.lastTimeToOrder)) && (errors.lastTimeToOrder = 'Must be a number')
    isNaN(Number(values.timeBoundDuration)) && (errors.timeBoundDuration = 'Must be a number')
    isNaN(Number(values.reminderTime)) && (errors.reminderTime = 'Must be a number')
  }

  if (values.menuType === 'HAPPY_HOUR') {
    requiredFields.push('packageDiscountPercentage')
    requiredFields.push('reminderTime')
    isNaN(Number(values.packageDiscountPercentage)) && (errors.packageDiscountPercentage = 'Must be a number')
    isNaN(Number(values.reminderTime)) && (errors.reminderTime = 'Must be a number')
  }
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
      errors.menuPhoto = `The image size exceeds(${maxWeight}kb)`;
    }
  }

  // if (values.imageFile) {
  //   const mimeType = 'image/jpeg';
  //   if (!mimeType.includes(values.imageFile.type)) {
  //     errors.menuPhoto = `Image type must be ${mimeType}`;
  //   }
  // }


  return errors;
}
