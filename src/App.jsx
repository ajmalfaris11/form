import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export default function App() {
  return (
    <>
      <Row style={{ justifyContent: "center" }}>
        <Col xs={8} className="mt-5">
          <Card className="p-4">
            <h1 className="mb-4">Sign up</h1>
            <RegistrationForm />
          </Card>
        </Col>
      </Row>
    </>
  );
}

function RegistrationForm() {
  const {values, handleInput, resetValues} = useForm ();

  const submitForm = (event) => {
    event.preventDefault();
  }
  return (
    <Form onSubmit={submitForm}>
      <InputField
        label="Full Name"
        type="name"
        name="fullname"
        placeholder="enter your full name"
        value={values.fullname}
        onChange = {handleInput}
      />

      <InputField
        label="email"
        type="email"
        name="email"
        placeholder="username@exaples.com"
        value={values.email}
        onChange = {handleInput}
      />

      <InputField
        label="password"
        type="password"
        name="password"
        placeholder="enter a stong password"
        value={values.password}
        onChange = {handleInput}
      />

      <InputField
        label="Conform Password"
        type="password"
        name="confirmpassword"
        placeholder="re-enter your password"
        value={values.confirmpassword}
        onChange = {handleInput}
      />
      <div className="mt-3">
      <Button type="submit">Register</Button>
      {" "}
      <Button variant="outline-secondary" onClick={resetValues}>Reset</Button>
      </div>
    </Form>
  );
}

const InputField = ({ label, ...props }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control {...props} />
    </Form.Group>
  );
};

const useForm = ()=> {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: ""
  })

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name] : event.target.value
    })
  }

  const resetValues = (event) => {
    setValues({
      fullname: "",
      email: "",
      password: "",
      confirmpassword: ""
    })
  }

  return {values, handleInput, resetValues }
}
