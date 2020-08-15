export default function(values) {
    const errors = {};
    const requiredFields = [
      'name',
      'tableNo',
      'noOfSeats'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required';
      }
    });

    isNaN(Number(values.noOfSeats)) &&  (errors.noOfSeats = 'Must be a number')

    return errors;
  }
  