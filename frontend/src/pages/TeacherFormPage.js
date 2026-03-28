import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import TeacherForm from '../components/TeacherForm';
import { createTeacher, fetchTeacher, updateTeacher } from '../api/teachers';
import { formatApiError } from '../utils/apiError';
import { createTeacherFormValues, validateTeacherForm } from '../utils/teacherForm';

function TeacherFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [values, setValues] = useState(createTeacherFormValues());
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditMode);

  useEffect(() => {
    async function loadTeacher() {
      if (!isEditMode) {
        return;
      }

      setPageLoading(true);

      try {
        const response = await fetchTeacher(id);
        setValues({
          email: response.teacher.email || '',
          first_name: response.teacher.first_name || '',
          last_name: response.teacher.last_name || '',
          password: '',
          university_name: response.teacher.university_name || '',
          gender: response.teacher.gender || 'male',
          year_joined: String(response.teacher.year_joined || ''),
          department: response.teacher.department || '',
          phone_number: response.teacher.phone_number || '',
        });
      } catch (error) {
        setNotice({ type: 'error', message: formatApiError(error, 'Unable to load teacher.') });
      } finally {
        setPageLoading(false);
      }
    }

    loadTeacher();
  }, [id, isEditMode]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateTeacherForm(values, isEditMode);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    setNotice({ type: '', message: '' });

    const payload = {
      ...values,
      year_joined: Number(values.year_joined),
    };

    if (isEditMode && !payload.password) {
      delete payload.password;
    }

    try {
      if (isEditMode) {
        await updateTeacher(id, payload);
      } else {
        await createTeacher(payload);
      }

      navigate('/teachers', {
        replace: true,
        state: {
          notice: {
            type: 'success',
            message: isEditMode
              ? 'Teacher updated successfully.'
              : 'Teacher created successfully.',
          },
        },
      });
    } catch (error) {
      setNotice({ type: 'error', message: formatApiError(error, 'Unable to save teacher.') });
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return <div className="page-loader">Loading teacher record...</div>;
  }

  return (
    <section className="page-stack">
      <div className="page-header">
        <div>
          <p className="section-tag">{isEditMode ? 'Edit Page' : 'Add Page'}</p>
          <h2>{isEditMode ? 'Edit teacher' : 'Add teacher'}</h2>
        </div>
        <Link className="secondary-button" to="/teachers">
          Back to list
        </Link>
      </div>

      <Alert message={notice.message} type={notice.type} />

      <TeacherForm
        errors={errors}
        isEditMode={isEditMode}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        values={values}
      />
    </section>
  );
}

export default TeacherFormPage;
