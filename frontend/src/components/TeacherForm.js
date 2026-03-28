function TeacherForm({
  values,
  errors,
  loading,
  isEditMode,
  onChange,
  onSubmit,
}) {
  const joinedYears = Array.from({ length: 50 }, (_, index) => String(2000 + index)).reverse();

  return (
    <form className="card form-card" onSubmit={onSubmit}>
      <div className="section-header">
        <div>
          <p className="section-tag">{isEditMode ? 'Edit Teacher' : 'Create Teacher'}</p>
          <h2>{isEditMode ? 'Update teacher details' : 'Add a new teacher'}</h2>
        </div>
      </div>

      <div className="grid-two">
        <label>
          First name
          <input name="first_name" onChange={onChange} required value={values.first_name} />
          <span className="field-error">{errors.first_name}</span>
        </label>
        <label>
          Last name
          <input name="last_name" onChange={onChange} required value={values.last_name} />
          <span className="field-error">{errors.last_name}</span>
        </label>
      </div>

      <div className="grid-two">
        <label>
          Email
          <input name="email" onChange={onChange} required type="email" value={values.email} />
          <span className="field-error">{errors.email}</span>
        </label>
        <label>
          Password
          <input
            name="password"
            onChange={onChange}
            required={!isEditMode}
            type="password"
            value={values.password}
          />
          <span className="field-hint">
            {isEditMode ? 'Leave blank to keep the current password.' : 'Minimum 6 characters.'}
          </span>
          <span className="field-error">{errors.password}</span>
        </label>
      </div>

      <label>
        University name
        <input
          name="university_name"
          onChange={onChange}
          required
          value={values.university_name}
        />
        <span className="field-error">{errors.university_name}</span>
      </label>

      <div className="grid-two">
        <label>
          Gender
          <select name="gender" onChange={onChange} value={values.gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <span className="field-error">{errors.gender}</span>
        </label>
        <label>
          Year joined
          <select name="year_joined" onChange={onChange} required value={values.year_joined}>
            <option value="">Select year</option>
            {joinedYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <span className="field-error">{errors.year_joined}</span>
        </label>
      </div>

      <div className="grid-two">
        <label>
          Department
          <input name="department" onChange={onChange} value={values.department} />
          <span className="field-error">{errors.department}</span>
        </label>
        <label>
          Phone number
          <input name="phone_number" onChange={onChange} value={values.phone_number} />
          <span className="field-error">{errors.phone_number}</span>
        </label>
      </div>

      <button className="primary-button" disabled={loading} type="submit">
        {loading ? 'Saving...' : isEditMode ? 'Update Teacher' : 'Create Teacher'}
      </button>
    </form>
  );
}

export default TeacherForm;
