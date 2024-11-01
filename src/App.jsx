import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";

export default function App() {
  return (
    <Row className="justify-content-center bg-primary vh-100 d-flex align-items-center m-0">
      <div className="bg-white p-4 rounded shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Sign-up</h3>
        <RegistrationForm />
      </div>
    </Row>
  );
}

function RegistrationForm() {
  const { values, handleInput, resetValues, validate, errors } = useForm();

  const submitForm = (event) => {
    event.preventDefault();
    if (validate()) {
      alert("Form Submitted");
      resetValues();
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
        type="email"
        name="email"
        placeholder="username@example.com"
        value={values.email}
        onChange={handleInput}
        error={errors.email}
      />

      <InputField
        type="password"
        name="password"
        placeholder="Enter a strong password"
        value={values.password}
        onChange={handleInput}
        error={errors.password}
      />

      <InputField
        type="password"
        name="confirmpassword"
        placeholder="Re-enter your password"
        value={values.confirmpassword}
        onChange={handleInput}
        error={errors.confirmpassword}
      />

      <Form.Group controlId="terms" className="mb-3 d-flex align-items-center">
        <Form.Check
          type="checkbox"
          name="terms"
          checked={values.terms}
          onChange={handleInput}
          required
        />
        <Form.Label className="ms-2" htmlFor="terms">
          I accept all terms & conditions
        </Form.Label>
      </Form.Group>

      <Button type="submit" className="w-100 mb-2" variant="primary">
        Register Now
      </Button>

      <div className="text-center">
        <small>
          Already have an account? <a href="#login" class="text-decoration-none">Login now</a>
        </small>
      </div>
    </Form>
  );
}

// ====== InputField component ======

const InputField = ({ error, ...props }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Control {...props} className={error ? "is-invalid" : ""} />
      {error && <div className="text-danger small mt-1">{error}</div>}
    </Form.Group>
  );
};

const useForm = () => {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
    terms: false, // Add terms checkbox to initial values
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, type, value, checked } = event.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value, // Update checkbox value if not check box set the input values
    });
  };

  const resetValues = () => {
    setValues({
      fullname: "",
      email: "",
      password: "",
      confirmpassword: "",
      terms: false, // Reset checkbox to false
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (values.fullname.length < 3) {
      newErrors.fullname = "Minimum 3 letters required";
    }

    if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
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
