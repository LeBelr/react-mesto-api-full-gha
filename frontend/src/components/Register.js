import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function Register({ onRegister, isLoading }) {
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
    onRegister({
      email: formValue.email,
      password: formValue.password
    })
  }

  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__button">Войти</Link>
      </Header>

      <main>
        <section className="register">
          <h1 className="register__title">Регистрация</h1>
          <form className="register__form" onSubmit={handleSubmit}>
            <input type="email" className="register__input" name="email" placeholder="Email" minLength="2" maxLength="30" value={formValue.email || ''} required onChange={handleChange} />
            <input type="password" className="register__input" name="password" placeholder="Пароль" minLength="6" maxLength="20" value={formValue.password || ''} required onChange={handleChange} />
            <button type="submit" className="register__submit" >{isLoading ? "Регистрация..." : "Зарегистрироваться"}</button>
          </form>
          <p className="register__signin">Уже зарегестрированы? <Link to="sign-in" className="register__signin-link">Войти</Link></p>
        </section>
      </main>
    </>
  )
}