import Button from "react-bootstrap/Button"
//import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar';
//import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from 'react-router-dom';

const Home = () =>
{
    return(
        <div className="products">
            <Navbar className='justify-content-between pb-0'>
                <div className='products__heading'>Product List</div>
                <Row className='products__product-change'>
                    <Col><Button className='products__product-change__delete btn-danger' id='delete-product-btn'>Mass delete</Button></Col>
                    <Col><Link to='/product-add'><Button className='products__product-chgage__add'>Add</Button></Link></Col>
                </Row>
            </Navbar>
            <hr/>
            <h1>Product list!</h1>
        </div>
    );
}

export default Home;