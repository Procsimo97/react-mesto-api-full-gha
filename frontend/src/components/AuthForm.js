function AuthForm(props) {

  return (
    <div className="auth-form">
      <h1 className="auth-form__title">{props.title}</h1>
      <form className="auth-form__form" onSubmit={props.onSubmit}>
        <input className="auth-form__input auth-form__input_type_email"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={props.onChange}
          value={props.value.email || ''}
        />
        <input className="auth-form__input auth-form__input_type_password"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          required
          onChange={props.onChange}
          value={props.value.password || ''}
        />
        <button className="auth-form__sub-button" type="submit">{props.button} </button>
        {props.children}
      </form>

    </div>

  )
}

export default AuthForm;