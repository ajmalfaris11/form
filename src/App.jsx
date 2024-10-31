import { Card, Col, Form, Row } from 'react-bootstrap';



export default function App() {
  return (
    <>
      <Row style={{justifyContent:'center'}}>
        <Col xs={8} className="mt-5">
          <Card className="p-4">
            <h1 className='mb-4'>Sign up</h1>
            <RegistrationForm />
          </Card>
        </Col>
      </Row>
    </>
  );
}

function RegistrationForm(){
  return (
    <Form>

    </Form>
  );
}