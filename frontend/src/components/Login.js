import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function Login({ onLogin, isLoading }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    onLogin({
      email: formValue.email,
      password: formValue.password
    })
  }

  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__button">Регистрация</Link>
      </Header>

      <main>
        <section className="login">
          <h1 className="login__title">Вход</h1>
          <form className="login__form" onSubmit={handleSubmit}>
            <input type="email" className="login__input" name="email" placeholder="Email" minLength="2" maxLength="40" value={formValue.email || ''} required onChange={handleChange} />
            <input type="password" className="login__input" name="password" placeholder="Пароль" minLength="6" maxLength="20" value={formValue.password || ''} required onChange={handleChange} />
            <button type="submit" className="login__submit" >{isLoading ? "Вход..." : "Войти"}</button>
          </form>
        </section>
      </main>
    </>
  )
}