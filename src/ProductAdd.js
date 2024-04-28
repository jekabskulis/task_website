import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar';
//import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import {useState, useEffect} from "react";

import { DVD, Book, Furniture } from "./formClass.js";
//import { validateInput} from "./validation.js";

const uploadLink = "https://www.jekabskulis25.shop/upload.php";
const getInfoLink = "https://www.jekabskulis25.shop/getInfro.php";

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
const validateInput = () =>
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
}

const ProductAdd = () =>
{
    const[skus, setSkus] = useState([]);
    const[newProductValue, setNewProductValue] = useState(newProductDefaultValue);
    const[product, setProduct] = useState([]);
    // eslint-disable-next-line
    const[formType, setFormType] = useState("");

    const getSkuList = () =>
    {
        fetch(getInfoLink, {
            method: "GET",
            headers:
            [
                ["Content-Type", "application/json"],
                ["Accept", "application/json"],
                ["Access-Control-Allow-Origin", "*"]
            ]
        })
        .then((rep) => rep.json())
        .then((allSkus) =>
        {
            setSkus(allSkus)
        })
    }
    useEffect(() =>
    {
        getSkuList();
        validateInput();
    }, [])

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
            type: event.target.value,
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
                        fetch(uploadLink,
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
                            window.location.href = "https://jekabs-kulis.web.app/"
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
                                        for(const item of Array.from(skus))
                                        {
                                            if(item.sku === event.target.value) 
                                            {
                                                document.getElementById("sku-uniqueness").required = true;
                                                document.getElementById("sku-uniqueness-label").style.display = "flex";
                                                break;
                                            }
                                            else
                                            {
                                                document.getElementById("sku-uniqueness").required = false;
                                                document.getElementById("sku-uniqueness-label").style.display = "none";
                                            }
                                        }
                                        setNewProductValue(updatedNewProductValue)
                                    }
                                }
                                required="required">
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label
                            id="sku-uniqueness-label">
                                SKU is not unique!
                            </Form.Label>
                            <Form.Control
                            type="hidden"
                            id="sku-uniqueness">
                            </Form.Control>
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
                                        validateInput()
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
                            <h3>Please, provide size.</h3>
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
                                            attributes: "Size: " + event.target.value + " MB"
                                        }
                                        setNewProductValue(updatedNewProductValue)
                                        validateInput()
                                    }
                                }
                                required="required"
                                min="0">
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="add-products__form__book mb-3" id="bookForm">
                            <h3>Please, provide weight.</h3>
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
                                            attributes: "Weight: " + event.target.value + " KG"
                                        }
                                        setNewProductValue(updatedNewProductValue)
                                        validateInput()
                                    }
                                }
                                required="required"
                                min="0">
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <div id="furnitureForm">
                            <h3>Please, provide dimensions.</h3>
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
                                            validateInput()
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
                                                attributes: "Dimensions: " + newProductValue.height + "x" + newProductValue.width + "x" + event.target.value
                                            }
                                            setNewProductValue(updatedNewProductValue)
                                            validateInput()
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
            
            
        </div>
    );  
}

export default ProductAdd;