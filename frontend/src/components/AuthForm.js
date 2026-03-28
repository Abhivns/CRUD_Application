function AuthForm({ mode, values, errors, loading, onChange, onSubmit }) {
  return (
    <form className="card form-card" onSubmit={onSubmit}>
      <div className="section-header">
        <div>
          <p className="section-tag">{mode === 'login' ? 'Login' : 'Register'}</p>
          <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
        </div>
      </div>

      {mode === 'register' ? (
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
      ) : null}

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
          required
          type="password"
          value={values.password}
        />
        <span className="field-error">{errors.password}</span>
      </label>

      <button className="primary-button" disabled={loading} type="submit">
        {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
}

export default AuthForm;
