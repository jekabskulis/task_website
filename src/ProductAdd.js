
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar';
//import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import { useState } from "react";

import { DVD, Book, Furniture } from "./formClass.js";
//import { validateInput} from "./validation.js";


const newProductDefaultValue =
{
    sku: "",
    name: "",
    price: "",
    type: "",
    length: "",
    width: "",
    height: "",
    size: "",
    weight: "",
    attributes: ""
}
//Supposed to be in a separate file, but validation didn't properly work unless validation function is in the same file as input fields.
const validateInput = () =>
{
    document.addEventListener("DOMContentLoaded", () => 
    {
        let elem = document.getElementsByTagName("input");
        for (let i = 0; i < elem.length; i++) {
            elem[i].oninvalid = (event) => 
            {
                event.target.setCustomValidity("");
                //Default validity message
                if(event.target.validity.valueMissing)
                {
                    event.target.setCustomValidity("Please, submit required data");
                }
                //Validity message for numbers, overwrites default message.
                if(event.target.validity.patternMismatch)
                {
                    event.target.setCustomValidity("Please, provide the data of indicated type");
                }
            };
            elem[i].oninput = (event) => 
            {
                event.target.setCustomValidity("");
            };
        }
    })
}

const ProductAdd = () =>
{
    const[newProductValue, setNewProductValue] = useState(newProductDefaultValue);
    const[product, setProduct] = useState([]);
    // eslint-disable-next-line
    const[formType, setFormType] = useState("");

    const handleFormTypeChange = (event) => 
    {
        const DVDSelect = new DVD(event.target.value);
        const BookSelect = new Book(event.target.value);
        const FurnitureSelect = new Furniture(event.target.value);
        let classObj = {DVDSelect, BookSelect, FurnitureSelect};
        let key = event.target.value;
        setFormType(classObj[key].getHTML);
        
        
        const updatedNewProductValue =
        {
            ...newProductValue,
            attributes: ""
        }
        setNewProductValue(updatedNewProductValue)
    }

    return(
        <div className="add-products">
             <Navbar className='justify-content-between pb-0'>
                <div className='add-products__heading'>Product List</div>
                <Row className='add-products__product-change'>
                    <Col><Button className='add-products__product-change__Save' form="product_form" type="submit">Save</Button></Col>
                    <Col><Link to='/'><Button className='add-products__product-chgage__cancel btn-danger'>Cancel</Button></Link></Col>
                </Row>
            </Navbar>
            <hr/>
            <Row>
                <Col lg={8}>
                    <Form 
                    className="add-products__form" 
                    id="product_form"
                    onSubmit={(event) =>
                        {
                        
                        event.preventDefault();
                        fetch("https://jekabskulis.000webhostapp.com/upload.php",
                        {
                            method: "POST",
                            headers:
                            [
                                ["Content-Type", "application/json"],
                                ["Accept", "application/json"],
                                ["Access-Control-Allow-Origin", "*"]
                            ],
                            body: JSON.stringify(newProductValue)
                        })
                        .then((rep) => rep.json())
                        .then((addedProduct) =>
                        {
                            setProduct(...product, addedProduct)
                        })
                        setNewProductValue(newProductDefaultValue)
                    }}>
                        <Form.Group as={Row} className="add-products__form__sku mb-3">
                            <Form.Label column sm={2}>
                                SKU
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                type="text"
                                placeholder="SKU"
                                id="sku"
                                pattern=".*|^$"
                                value={newProductValue.sku}
                                onChange=
                                {
                                    (event) =>
                                    {
                                        const updatedNewProductValue =
                                        {
                                            ...newProductValue,
                                            sku: event.target.value
                                        }
                                        setNewProductValue(updatedNewProductValue)
                                    }
                                }
                                required="required">
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="add-products__form__name  mb-3">
                            <Form.Label column sm={2}>Name</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                type="text"
                                placeholder="Name"
                                id="name"
                                pattern=".*|^$"
                                value={newProductValue.name}
                                onChange=
                                {
                                    (event) =>
                                    {
                                        const updatedNewProductValue =
                                        {
                                            ...newProductValue,
                                            name: event.target.value
                                        }
                                        setNewProductValue(updatedNewProductValue)
                                    }
                                }
                                required="required">
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="add-products__form__price  mb-3">
                            <Form.Label column sm={2}>Price ($)</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                type="text"
                                placeholder="Price"
                                id="price"
                                value={newProductValue.price}
                                pattern="^\d*\.?\d*$"
                                onChange=
                                {
                                    (event) =>
                                    {
                                        const updatedNewProductValue =
                                        {
                                            ...newProductValue,
                                            price: event.target.value
                                        }
                                        setNewProductValue(updatedNewProductValue)
                                    }
                                }
                                required="required"
                                min="0">
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="add-products__form__product-type mb-3">
                            <Form.Label column sm={3}>Type Switcher</Form.Label>
                            <Col sm={5}>
                                <Form.Select
                                id="productType" onChange={handleFormTypeChange} required="required" defaultValue="">
                                    <option value="" disabled hidden>Please choose product type</option>
                                    <option value="DVDSelect">DVD</option>
                                    <option value="BookSelect">Book</option>
                                    <option value="FurnitureSelect">Furniture</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="add-products__form__dvd  mb-3" id="dvdForm">
                            <Form.Label column sm={2}>Size (MB)</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                type="text"
                                placeholder="Size"
                                id="size"
                                pattern="^\d*\.?\d*$"
                                value={newProductValue.size}
                                onChange=
                                {
                                    (event) =>
                                    {
                                        const updatedNewProductValue =
                                        {
                                            ...newProductValue,
                                            size: event.target.value,
                                            attributes: event.target.value + " MB"
                                        }
                                        setNewProductValue(updatedNewProductValue)
                                    }
                                }
                                required="required"
                                min="0">
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="add-products__form__book mb-3" id="bookForm">
                            <Form.Label column sm={2}>Weight (KG)</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                type="text"
                                placeholder="Weight"
                                id="weight"
                                pattern="^\d*\.?\d*$"
                                value={newProductValue.weight}
                                onChange=
                                {
                                    (event) =>
                                    {
                                        const updatedNewProductValue =
                                        {
                                            ...newProductValue,
                                            weight: event.target.value,
                                            attributes: event.target.value + " KG"
                                        }
                                        setNewProductValue(updatedNewProductValue)
                                    }
                                }
                                required="required"
                                min="0">
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <div id="furnitureForm">
                            <Form.Group as={Row} className="add-products__form__furniture mb-3">
                                <Form.Label column sm={2}>Height (CM)</Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                    type="text"
                                    placeholder="Height"
                                    id="height"
                                    pattern="^\d*\.?\d*$"
                                    value={newProductValue.height}
                                    onChange=
                                    {
                                        (event) =>
                                        {
                                            const updatedNewProductValue =
                                            {
                                                ...newProductValue,
                                                height: event.target.value
                                            }
                                            setNewProductValue(updatedNewProductValue)
                                        }
                                    }
                                    required="required"
                                    min="0">
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="add-products__form__furniture mb-3">
                                <Form.Label column sm={2}>Width (CM)</Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                    type="text"
                                    placeholder="Width"
                                    id="width"
                                    pattern="^\d*\.?\d*$"
                                    value={newProductValue.width}
                                    onChange=
                                    {
                                        (event) =>
                                        {
                                            const updatedNewProductValue =
                                            {
                                                ...newProductValue,
                                                width: event.target.value
                                            }
                                            setNewProductValue(updatedNewProductValue)
                                        }
                                    }
                                    required="required"
                                    min="0">
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="add-products__form__furniture mb-3">
                                <Form.Label column sm={2}>Length (CM)</Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                    type="text"
                                    placeholder="Length"
                                    id="length"
                                    pattern="^\d*\.?\d*$"
                                    value={newProductValue.length}
                                    onChange=
                                    {
                                        (event) =>
                                        {
                                            const updatedNewProductValue =
                                            {
                                                ...newProductValue,
                                                length: event.target.value,
                                                attributes: newProductValue.height + "x" + newProductValue.width + "x" + event.target.value
                                            }
                                            setNewProductValue(updatedNewProductValue)
                                        }
                                    }
                                    required="required"
                                    min="0">
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </div>
                    </Form>
                </Col>
            </Row>
            
            {//Adds validation to input fields
            validateInput()}
        </div>
    );  
}

export default ProductAdd;