
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


export {validateInput};