
import './App.css';
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <div className='container'>
      <h1>Hello World.</h1>
      {/*
        <Container className='mb-3' fluid>
          <Row>
            {Array.from(cards).map((card, index) =>
            {
              return(
                <Col key={Math.random()} className='m-3 item-list'>
                  <Form className='checkbox-form'>
                    <Form.Check type='checkbox' id={`delete-item-${index}`} label="" className='delete-checkbox'></Form.Check>
                  </Form>
                </Col>
              )
            })}
          </Row>
        </Container>
          */}
    </div>
  );
}

export default App;
