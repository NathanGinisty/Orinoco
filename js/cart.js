import * as main from './main.js';

var cart = JSON.parse(sessionStorage.getItem("cart")); 
var totalPrice = 0;

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
            document.getElementById("item-quantity-" + completeID).addEventListener("click", function(){UpdateQuantity(this.firstElementChild)});
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

function RemoveItemFromArray(_arr, _value)
{
    var index = _arr.indexOf(_value);
    if (index > -1) {
        _arr.splice(index, 1);
    }
    return _arr;
}

function RemoveFromCart(_ID, _lenses)
{
    //console.log("will remove:" + _ID + "#" + _lenses);

    var i = 0;
    cart.forEach(e => {
        
        // Search the one to remove
        if (e.id == _ID && e.lenses == _lenses)
        {
            document.getElementById("item-" + _ID + "-" + _lenses).remove();
            console.log("removing:" + cart[i].id + "#" + cart[i].lenses);
            RemoveItemFromArray(cart, cart[i]);
            return;
        }
        i++;
    })
}

function UpdateQuantity(_form)
{
    // Reset cart price before updating it
    totalPrice = 0;
    
    //get ID from the parent node
    var parentID = _form.parentNode.id.split("-")[2];
    var parentLenses = _form.parentNode.id.split("-")[3];
    
    if (_form.value < 1)
    {
        // Remove from cart
        RemoveFromCart(parentID, parentLenses);

        // Block to 1
        //_form.value = 1;
    }
    
    
    
    // Update price
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
    
    // Update sessionStorage with the cart
    sessionStorage.setItem("cart", JSON.stringify(cart));
    
    // Draw the new total price of the cart
    document.getElementById("items-pricetotal").innerHTML = totalPrice.toFixed(2) + "€";
}

function AreContactAreValid(_contact)
{
    if (_contact.firstName == null || _contact.firstName == "") return false;
    if (_contact.lastName == null || _contact.lastName == "") return false;
    if (_contact.address == null || _contact.address == "") return false;
    if (_contact.city == null || _contact.city == "") return false;
    if (_contact.email == null || _contact.email == "") return false;
    
    return true;
}

function PostOrder()
{
    // Check if the cart is empty
    if (cart == null)
    {
        alert("Le panier est vide !");
        return;
    }
    
    // Prepare the contact information to be sent
    var contact = {
        firstName: document.getElementById("form-fname").value,
        lastName: document.getElementById("form-lname").value,
        address: document.getElementById("form-address").value,
        city: document.getElementById("form-city").value,
        email: document.getElementById("form-email").value
    };
    
    // Check if the contact are valid
    if (!AreContactAreValid(contact))
    {
        alert("Les informations sont incomplètes ou invalides !");
        return;
    }
    
    // Prepare the cart to be sent
    var products = [];
    cart.forEach(e => {
        for (let i = 0; i < e.quantity; i++) {
            products.push(e.id);
        }
    })
    
    var request = {
        method: 'POST',
        body: JSON.stringify({contact, products}),
        headers: {'Content-Type': 'application/json; charset=utf-8'},
    }
    
    main.SendData(ConfirmPostOrder, main.apiData.url + main.apiData.table + "/order", request);
}

function ConfirmPostOrder(_r)
{
    window.location.replace("./confirmation.html#" + _r.orderId)
    sessionStorage.removeItem('cart');
}

// ----------------------

// console.log(cart);
LoadCart();
document.getElementById("button-order").addEventListener("click", PostOrder);