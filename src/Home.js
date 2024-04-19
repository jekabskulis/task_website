import Button from "react-bootstrap/Button"
import Navbar from 'react-bootstrap/Navbar';
//import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react";

const newDeleteProductDefaultValue = 
{
    ids: [],
    queryType: "deleteProduct"
}

const Home = () =>
{
    const[cards, setCards] = useState([]);
    const[newDeleteProductValue, setNewDeleteProductValue] = useState(newDeleteProductDefaultValue);
    const[deleteProduct, setDeleteProduct] = useState([]);
   
    //Returns info from the database
    const getValueList = () =>
    {
        fetch("https://jekabskulis.000webhostapp.com/getInfo.php", {
            method: "GET",
            headers:
            [
                ["Content-Type", "application/json"],
                ["Accept", "application/json"],
                ["Access-Control-Allow-Origin", "*"]
            ]
        })
        .then((rep) => rep.json())
        .then((allCards) =>
        {
            setCards(allCards)
        })
    }

    useEffect(() =>
    {
        getValueList();
    }, [])

    return(
        <div className="products">
            <Navbar className='justify-content-between pb-0'>
                <div className='products__heading'>Product List</div>
                <Row className='products__product-change'>
                    <Col><Link to='/product-add'><Button className='products__product-chgage__add'>Add</Button></Link></Col>
                    <Col><Button className='products__product-change__delete btn-danger' id='delete-product-btn' form="delete-form" type="submit">Mass delete</Button></Col>
                </Row>
            </Navbar>
            <hr/>
            <Row>
            {Array.from(cards).map((card, index) =>
            {
                return(
                    <Col key={Math.random()} className="mt-3 col-xl-3 col-lg-4">
                        <Card className="p-3 h-100 w-100">
                            <Form
                            id="delete-form" 
                            onSubmit={(event) =>
                                {
                                event.preventDefault();
                                fetch("https://jekabskulis.000webhostapp.com/delete.php",
                                {
                                    method: "POST",
                                    headers:
                                    [
                                        ["Content-Type", "application/json"],
                                        ["Accept", "application/json"],
                                        ["Access-Control-Allow-Origin", "*"]
                                    ],
                                    body: JSON.stringify(newDeleteProductValue)
                                })
                                .then((rep) => rep.json())
                                .then((deletedProduct) =>
                                {
                                    setDeleteProduct(...deleteProduct, deletedProduct)
                                })
                                setNewDeleteProductValue(newDeleteProductValue)
                            }}>
                                <Form.Check
                                type="checkbox"
                                id={`delete-product-${index}`}
                                className="delete-checkbox"
                                onChange=
                                {
                                    () =>
                                    {
                                        if(document.getElementById(`delete-product-${index}`).checked)
                                        {
                                            newDeleteProductValue.ids[newDeleteProductValue.ids.length] = card.id;
                                        }
                                        else
                                        {
                                            newDeleteProductValue.ids = newDeleteProductValue.ids.filter(item => item !== card.id);    
                                        }
                                    }
                                }></Form.Check>
                                <Form.Group>
                                    <Form.Control
                                    type="hidden"
                                    value="">

                                    </Form.Control>
                                </Form.Group>
                            </Form>
                            <Card.Body>
                                <Card.Title className="text-center mb-1">{card.sku}</Card.Title>
                                <Card.Text className="text-center mb-1">{card.name}</Card.Text>
                                <Card.Text className="text-center mb-1">Price: {card.price}$</Card.Text>
                                <Card.Text className="text-center mb-1">{card.attributes}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
            )
            })}
            </Row>
        </div>
    );
}

export default Home;