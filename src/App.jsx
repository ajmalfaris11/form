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
  const { values, handleInput, resetValues, validate, errors } = useForm();

  const submitForm = (event) => {
    event.preventDefault();
    if (validate()) {
      // Do something on successful validation
      console.log("Form submitted successfully!");
    }
  };

  return (
    <Form onSubmit={submitForm}>
      <InputField
        label="Full Name"
        type="text"
        name="fullname"
        placeholder="Enter your full name"
        value={values.fullname}
        onChange={handleInput}
        error={errors.fullname}
      />

      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="username@example.com"
        value={values.email}
        onChange={handleInput}
        error={errors.email}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="Enter a strong password"
        value={values.password}
        onChange={handleInput}
        error={errors.password}
      />

      <InputField
        label="Confirm Password"
        type="password"
        name="confirmpassword"
        placeholder="Re-enter your password"
        value={values.confirmpassword}
        onChange={handleInput}
        error={errors.confirmpassword}
      />

      <div className="mt-3">
        <Button type="submit">Register</Button>{" "}
        <Button variant="outline-secondary" onClick={resetValues}>
          Reset
        </Button>
      </div>
    </Form>
  );
}

// ====== label combonent ======

const InputField = ({ label, error, ...props }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control {...props}  className={error ? "is-invalid" : ""} />
      {error && <div className="text-danger">{error}</div>}
    </Form.Group>
  );
};

const useForm = () => {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const resetValues = () => {
    setValues({
      fullname: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (values.fullname.length < 3) {
      newErrors.fullname = "Minimum 3 letters required";
    }

    if (
      !values.email.match(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      )
    ) {
      newErrors.email = "Not a valid email";
    }

    if (values.password.length < 8) {
      newErrors.password = "Password should contain at least 8 characters";
    } else if (values.password !== values.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, handleInput, resetValues, validate, errors };
};
