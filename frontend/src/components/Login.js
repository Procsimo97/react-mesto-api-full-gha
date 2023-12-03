import { useState } from "react";
import AuthForm from "./AuthForm";


function Login({onLogin}) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formValue);

  }

  const handleChange =(e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name] : value
    });
  }


    return (
      <AuthForm title={"Вход"} 
                button={"Войти"}
                onSubmit={handleSubmit}
                onChange={handleChange}
                value={formValue}
      />
    )
}
export default Login;