import { Link } from 'react-router-dom';

function TeacherTable({ teachers, onDelete, deletingId }) {
  if (!teachers.length) {
    return <div className="card empty-card">No teacher records found yet.</div>;
  }

  return (
    <div className="table-wrapper card">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>University</th>
            <th>Gender</th>
            <th>Year Joined</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.first_name} {teacher.last_name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.university_name}</td>
              <td>{teacher.gender}</td>
              <td>{teacher.year_joined}</td>
              <td>{teacher.department || '-'}</td>
              <td>{teacher.phone_number || '-'}</td>
              <td className="table-actions">
                <Link className="secondary-button" to={`/teachers/${teacher.id}/edit`}>
                  Edit
                </Link>
                <button
                  className="danger-button"
                  disabled={deletingId === teacher.id}
                  onClick={() => onDelete(teacher.id)}
                  type="button"
                >
                  {deletingId === teacher.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherTable;
