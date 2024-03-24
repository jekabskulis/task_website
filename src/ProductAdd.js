
import Button from "react-bootstrap/Button"
//import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar';
//import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from 'react-router-dom';

const Product_add = () =>
{
    return(
        <div className="add-products">
             <Navbar className='justify-content-between pb-0'>
                <div className='add-products__heading'>Product List</div>
                <Row className='add-products__product-change'>
                    <Col><Link to='/'><Button className='add-products__product-change__Save'>Save</Button></Link></Col>
                    <Col><Link to='/'><Button className='add-products__product-chgage__cancel btn-danger'>Cancel</Button></Link></Col>
                </Row>
            </Navbar>
            <hr/>
            <h1>Add products page.</h1>
        </div>
    );
}

export default Product_add;