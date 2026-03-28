import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Alert from '../components/Alert';
import TeacherTable from '../components/TeacherTable';
import useTeachers from '../hooks/useTeachers';
import { formatApiError } from '../utils/apiError';

function TeachersListPage() {
  const { teachers, loading, deletingId, loadTeachers, removeTeacher } = useTeachers();
  const location = useLocation();
  const [notice, setNotice] = useState(location.state?.notice || { type: '', message: '' });

  useEffect(() => {
    loadTeachers().catch((error) => {
      setNotice({ type: 'error', message: formatApiError(error, 'Unable to load teachers.') });
    });
  }, [loadTeachers]);

  async function handleDelete(id) {
    setNotice({ type: '', message: '' });

    try {
      await removeTeacher(id);
      setNotice({ type: 'success', message: 'Teacher deleted successfully.' });
    } catch (error) {
      setNotice({ type: 'error', message: formatApiError(error, 'Unable to delete teacher.') });
    }
  }

  return (
    <section className="page-stack">
      <div className="page-header">
        <div>
          <p className="section-tag">Teachers</p>
          <h2>Teachers list page</h2>
          <p className="lead-text">View combined teacher and user data from both tables.</p>
        </div>
        <Link className="primary-button" to="/teachers/new">
          Add Teacher
        </Link>
      </div>

      <Alert message={notice.message} type={notice.type} />

      {loading ? (
        <div className="card empty-card">Loading teacher records...</div>
      ) : (
        <TeacherTable deletingId={deletingId} onDelete={handleDelete} teachers={teachers} />
      )}
    </section>
  );
}

export default TeachersListPage;
