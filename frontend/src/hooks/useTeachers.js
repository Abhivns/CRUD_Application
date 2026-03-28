import { useCallback, useState } from 'react';
import { deleteTeacher, fetchTeachers } from '../api/teachers';

function useTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadTeachers = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetchTeachers();
      setTeachers(response.teachers || []);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeTeacher = useCallback(async (id) => {
    setDeletingId(id);

    try {
      await deleteTeacher(id);
      setTeachers((currentTeachers) =>
        currentTeachers.filter((teacher) => teacher.id !== id)
      );
    } finally {
      setDeletingId(null);
    }
  }, []);

  return {
    teachers,
    loading,
    deletingId,
    loadTeachers,
    removeTeacher,
  };
}

export default useTeachers;
