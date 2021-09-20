const apiUrl = "http://localhost:3000/api/cameras/"
var cart = JSON.parse(sessionStorage.getItem("cart")); 

function LoadCart()
{
    var srcItem = document.getElementById("item-0-0");
    var lastItem = srcItem;
    
    var totalPrice = 0;
    if (cart != null)
    {
        cart.forEach(e => {
            var newItem = srcItem.cloneNode(true);
            var completeID = e.id + "-" + e.lenses;
            
            lastItem.parentNode.insertBefore(newItem, lastItem);
            
            // rename to the new index      
            document.getElementById("item-0-0").setAttribute("id", "item-" + completeID);
            document.getElementById("item-name-0-0").setAttribute("id", "item-name-" + completeID);
            document.getElementById("item-quantity-0-0").setAttribute("id", "item-quantity-" + completeID);
            document.getElementById("item-price-0-0").setAttribute("id", "item-price-" + completeID);
            document.getElementById("item-pricetotal-0-0").setAttribute("id", "item-pricetotal-" + completeID);
            
            // set new value onto the new product
            
            document.getElementById("item-name-" + completeID).innerHTML = e.name + " (" + e.lensesText + ")";
            document.getElementById("item-quantity-" + completeID).firstChild.value = e.quantity;
            document.getElementById("item-price-" + completeID).innerHTML = e.price.toFixed(2) + "€";
            document.getElementById("item-pricetotal-" + completeID).innerHTML = (e.price * e.quantity).toFixed(2) + "€";
            
            totalPrice += (e.price * e.quantity);
            
            lastItem = newItem;
        })
    }
    
    document.getElementById("items-pricetotal").innerHTML = totalPrice.toFixed(2) + "€";
    
    document.getElementById("item-0-0").style.display = "none";
    // srcItem.remove(); // remove the base(first one) since it became useless
}

function UpdateQuantity(_form)
{
    var totalPrice = 0;

    //get ID from the parend node
    var parentID = _form.parentNode.id.split("-")[2];
    var parentLenses = _form.parentNode.id.split("-")[3];

    if (cart != null)
    {
        cart.forEach(e => {
            // change value
            if (e.id == parentID && e.lenses == parentLenses)
            {
                e.quantity = _form.value;
                document.getElementById("item-pricetotal-" + parentID + "-" + parentLenses).innerHTML = (e.price * e.quantity).toFixed(2) + "€";
            }

            // update the total price
            totalPrice += (e.price * e.quantity);
        })
    }

    // save new value
    sessionStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById("items-pricetotal").innerHTML = totalPrice.toFixed(2) + "€";
}

// ----------------------

console.log(cart);
LoadCart();