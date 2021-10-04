import * as main from './main.js';

var itemID = window.location.href.split('#')[1];

function LoadItemFromID(_id)
{
    main.GetData(LoadItem, main.apiData.url + main.apiData.table + "/" + _id);
}

function LoadItem(_data)
{
    // rename to the new _id        
    document.getElementById("prdt-0").setAttribute("id", "prdt-" + itemID);
    document.getElementById("prdt-name-0").setAttribute("id", "prdt-name-" + itemID);
    document.getElementById("prdt-price-0").setAttribute("id", "prdt-price-" + itemID);
    document.getElementById("prdt-description-0").setAttribute("id", "prdt-description-" + itemID);
    document.getElementById("prdt-img-0").setAttribute("id", "prdt-img-" + itemID);
    document.getElementById("prdt-lenses-0-0").setAttribute("id", "prdt-lenses-" + itemID + "-0");
    
    // set new value onto the new product
    document.getElementById("prdt-name-" + itemID).innerHTML = _data.name;
    document.getElementById("prdt-img-" + itemID).src = _data.imageUrl;
    document.getElementById("prdt-description-" + itemID).innerHTML = _data.description;
    
    let newPrice = String(_data.price);
    document.getElementById("prdt-price-" + itemID).innerHTML = newPrice.slice(0,-2)+ "." + newPrice.slice(-2,newPrice.length)+ "€";
    
    // get and set all the lenses value (ver1)
    var j = 0;
    var srcLenses = document.getElementById("prdt-lenses-" + itemID + "-0");
    var lastLenses = srcLenses;
    
    _data.lenses.forEach(e => {
        if (j > 0)
        {
            var newLenses = srcLenses.cloneNode(true);
            lastLenses.parentNode.insertBefore(newLenses, lastLenses);
            document.getElementById("prdt-lenses-" + itemID + "-0").setAttribute("id", "prdt-lenses-" + itemID + "-" + j);
        }
        document.getElementById("prdt-lenses-" + itemID + "-" + j).innerHTML = e;
        document.getElementById("prdt-lenses-" + itemID + "-" + j).addEventListener("click", function(){SelectLenses(this)});
        
        lastLenses = document.getElementById("prdt-lenses-" + itemID + "-" + j);
        j++;
    })
    
}

function SelectLenses(_element)
{
    var numLense = _element.id.split('-')[3];
    var currentHtml = window.location.href.split('#')[0] + "#" + window.location.href.split('#')[1];
    var currentHtml2 = window.location.href.split(/(?=#)/g).slice(0,-1).splice(',')[1];
    window.location.href = currentHtml2 + "#" + numLense;
}

function AddToCart()
{   
    // Get or init (if doesn't already exist) the storage 
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    
    // Create another object
    var alreadyExist = false;
    var itemLenses = window.location.href.split('#')[2];
    
    //parseInt()
    var a = document.getElementById("prdt-price-" + itemID).innerHTML.split(".")[0];
    var b = document.getElementById("prdt-price-" + itemID).innerHTML.split(".")[1].split('€')[0];
    var trueValuePrice = parseFloat(a) + (parseFloat(b)/100);
    
    var productToAdd =
    {
        id: itemID,
        name: document.getElementById("prdt-name-" + itemID).innerHTML,
        price: trueValuePrice,
        lenses: itemLenses,
        lensesText: document.getElementById("prdt-lenses-" + itemID + "-" + itemLenses).innerHTML,
        quantity: 1
    };
    
    // Check if already exist. If yes, increase quantity
    cart.forEach(e => {
        if (e.id == productToAdd.id && e.lenses == productToAdd.lenses)
        {
            e.quantity++;
            alreadyExist = true;
        }
    })
    
    // If doesn't exist, add new product
    if (!alreadyExist)
    {
        cart.push(productToAdd);
    }
    
    sessionStorage.setItem("cart", JSON.stringify(cart));
}

/* ----------------------------------------------------------- */


LoadItemFromID(itemID);
document.getElementById("button-addtocart").addEventListener("click", AddToCart);

