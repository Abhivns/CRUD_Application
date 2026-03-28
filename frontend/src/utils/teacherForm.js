export function createTeacherFormValues() {
  return {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    university_name: '',
    gender: 'male',
    year_joined: '',
    department: '',
    phone_number: '',
  };
}

export function validateTeacherForm(values, isEditMode) {
  const errors = {};

  if (!values.first_name.trim()) {
    errors.first_name = 'First name is required.';
  }

  if (!values.last_name.trim()) {
    errors.last_name = 'Last name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  }

  if (!isEditMode && !values.password.trim()) {
    errors.password = 'Password is required.';
  }

  if (values.password && values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  if (!values.university_name.trim()) {
    errors.university_name = 'University name is required.';
  }

  if (!values.year_joined) {
    errors.year_joined = 'Year joined is required.';
  }

  return errors;
}
