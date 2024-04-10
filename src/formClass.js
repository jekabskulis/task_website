
class FormClass 
{
    constructor(type)
    {
        this.type = type;
    }
    
    getHTML()
    {
        throw Error("Type not implemented!");
    }
}

class DVD extends FormClass
{
    getHTML()
    {
        //Shows form group fields.
        document.getElementById("dvdForm").style.display = "flex";
        document.getElementById("bookForm").style.display = "none";
        document.getElementById("furnitureForm").style.display = "none";
        //Turns off/on required property for input fields.
        document.getElementById("size").required = true;
        document.getElementById("weight").required = false;
        document.getElementById("length").required = false;
        document.getElementById("height").required = false;
        document.getElementById("width").required = false;
        console.log("formClas");
        return null;
    }
}

class Book extends FormClass
{
    getHTML()
    {
        //Shows form group fields.
        document.getElementById("dvdForm").style.display = "none";
        document.getElementById("bookForm").style.display = "flex";
        document.getElementById("furnitureForm").style.display = "none";
        //Turns off/on required property for input fields.
        document.getElementById("size").required = false;
        document.getElementById("weight").required = true;
        document.getElementById("length").required = false;
        document.getElementById("height").required = false;
        document.getElementById("width").required = false;
        return null;
    }
}

class Furniture extends FormClass
{
    getHTML()
    {
        //Shows form group fields.
        document.getElementById("dvdForm").style.display = "none";
        document.getElementById("bookForm").style.display = "none";
        document.getElementById("furnitureForm").style.display = "block";
        //Turns off/on required property for input fields.
        document.getElementById("size").required = false;
        document.getElementById("weight").required = false;
        document.getElementById("length").required = true;
        document.getElementById("height").required = true;
        document.getElementById("width").required = true;
        return null;
    }
}

export {FormClass, DVD, Book, Furniture};

