import React, {useEffect} from "react";
import classNames from "classnames";
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {useActions} from "../../hooks/useActions";
import Alert from 'react-bootstrap/Alert';
import {useAuthSelectors} from "../../store/selectors/auth";
import {useNavigate} from "react-router-dom";

function Login() {
  const {authenticate} = useActions();
  const {authErrorMessage, user} = useAuthSelectors();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    const params = {email: "", password: ""}
    Object.values(e.currentTarget).forEach((el: any) => {
      if (el.type === 'email') params['email'] = el.value;
      if (el.type === 'password') params['password'] = el.value;
    })
    e.preventDefault();
    e.stopPropagation();
    authenticate(params);
  }

  useEffect(() => {
    if (user.id) {
      navigate('/quiz');
    }
    //eslint-disable-next-line
  }, [user.id])

  return (
    <div className={classNames('flex-center full-screen flex-column')}>
      {authErrorMessage && <Alert variant='danger' className={classNames('position-absolute top-0')}>
        {authErrorMessage}
      </Alert>}
      <Form className={classNames('flex-center flex-column')} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" required defaultValue='molly_beard@applica.dnp'/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="12345678" required defaultValue='235681'/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  )
}

export default Login;