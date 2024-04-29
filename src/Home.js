import Button from "react-bootstrap/Button"
import Navbar from 'react-bootstrap/Navbar';
//import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

const getInfoLink = "https://www.jekabskulis25.shop/getInfro.php";
const deleteLink = "https://www.jekabskulis25.shop/delete.php";

const newDeleteProductDefaultValue = 
{
    ids: [],
    queryType: "deleteProduct"
}

const addDeleteClassToCheckboxes = () =>
{
    const parent = document.getElementsByClassName('delete-checkbox-div');
    for(let i = 0; i < parent.length; i++)
    {
        parent[i].getElementsByTagName("input").item(0).classList.add("delete-checkbox");
        console.log(parent[i].getElementsByTagName("input").item(0));
    }
    
}

const Home = () =>
{

    const[cards, setCards] = useState([]);
    const[newDeleteProductValue, setNewDeleteProductValue] = useState(newDeleteProductDefaultValue);
    const[deleteProduct, setDeleteProduct] = useState([]);
   

    //Returns info from the database
    useEffect(() =>
    {
        getValueList();
        addDeleteClassToCheckboxes();
    }, [])
    const getValueList = () =>
    {
        fetch(getInfoLink, {
            method: "GET",
            headers:
            [
                ["Content-Type", "application/json"],
                ["Accept", "application/json"],
                ["Access-Control-Allow-Origin", "*"],
                ["Cache-Control", "no-store, no-cache"]
            ]
        })
        .then((rep) => rep.json())
        .then((allCards) =>
        {
            setCards(allCards)
        })
    }

    return(
        <div className="products">
            <Navbar className='justify-content-between pb-0'>
                <div className='products__heading'>Product List</div>
                <Row className='products__product-change'>
                    <Col><Link to="/product-add"><Button className='products__product-chgage__add'>ADD</Button></Link></Col>
                    <Col><Button className='products__product-change__delete btn-danger' id='delete-product-btn' form="delete-form" type="submit">MASS DELETE</Button></Col>
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
                                fetch(deleteLink,
                                {
                                    method: "POST",
                                    headers:
                                    [
                                        ["Content-Type", "application/json"],
                                        ["Accept", "application/json"],
                                        ["Access-Control-Allow-Origin", "*"],
                                        ["Cache-Control", "no-store, no-cache"]

                                    ],
                                    body: JSON.stringify(newDeleteProductValue)
                                })
                                .then((rep) => rep.json())
                                .then((deletedProduct) =>
                                {
                                    setDeleteProduct(...deleteProduct, deletedProduct)
                                    window.location.reload();
                                })
                                setNewDeleteProductValue(newDeleteProductValue)
                            }}>
                                <Form.Check
                                type="checkbox"
                                id={`delete-product-${index} delete-checkbox`}
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
                                {addDeleteClassToCheckboxes()}
                            </Card.Body>
                        </Card>
                    </Col>
            )
            })}
            </Row>
            {addDeleteClassToCheckboxes()}
        </div>
    );
}

export default Home;