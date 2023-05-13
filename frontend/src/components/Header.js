import { Link } from "react-router-dom"

export default function Header({children}) {
  return (
    <header className="header">
      <Link to="/" className="header__logo"/>
      {children}
    </header>
  )
}