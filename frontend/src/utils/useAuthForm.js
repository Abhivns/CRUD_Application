import { useState } from 'react';

const initialValuesByMode = {
  login: {
    email: '',
    password: '',
  },
  register: {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  },
};

function useAuthForm(mode) {
  const [values, setValues] = useState(initialValuesByMode[mode]);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
  }

  function validate() {
    const nextErrors = {};

    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.';
    }

    if (!values.password.trim()) {
      nextErrors.password = 'Password is required.';
    }

    if (mode === 'register') {
      if (!values.first_name.trim()) {
        nextErrors.first_name = 'First name is required.';
      }

      if (!values.last_name.trim()) {
        nextErrors.last_name = 'Last name is required.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  return {
    values,
    errors,
    notice,
    setNotice,
    loading,
    setLoading,
    handleChange,
    validate,
  };
}

export default useAuthForm;
