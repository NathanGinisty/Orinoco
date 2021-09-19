const apiUrl = "http://localhost:3000/api/cameras/"

var itemId = window.location.href.split('#')[1];

function GetItemFromID(index)
{
    fetch(apiUrl + index)
    .then(data => data.json())
    .then(data =>{
        
        // rename to the new index        
        document.getElementById("prdt-0").setAttribute("id", "prdt-" + index);
        document.getElementById("prdt-name-0").setAttribute("id", "prdt-name-" + index);
        document.getElementById("prdt-price-0").setAttribute("id", "prdt-price-" + index);
        document.getElementById("prdt-description-0").setAttribute("id", "prdt-description-" + index);
        document.getElementById("prdt-img-0").setAttribute("id", "prdt-img-" + index);
        document.getElementById("prdt-lenses-0-0").setAttribute("id", "prdt-lenses-" + index + "-0");
        
        // set new value onto the new product
        document.getElementById("prdt-name-" + index).innerHTML = data.name;
        document.getElementById("prdt-img-" + index).src = data.imageUrl;
        document.getElementById("prdt-description-" + index).innerHTML = data.description;
        
        let newPrice = String(data.price);
        document.getElementById("prdt-price-" + index).innerHTML = newPrice.slice(0,-2)+ "." + newPrice.slice(-2,newPrice.length)+ "€";
        
        // get and set all the lenses value (ver1)
        var j = 0;
        var srcLenses = document.getElementById("prdt-lenses-" + index + "-0");
        var lastLenses = srcLenses;
        
        data.lenses.forEach(e => {
            if (j > 0)
            {
                var newLenses = srcLenses.cloneNode(true);
                lastLenses.parentNode.insertBefore(newLenses, lastLenses);
                document.getElementById("prdt-lenses-" + index + "-0").setAttribute("id", "prdt-lenses-" + index + "-" + j);
            }
            document.getElementById("prdt-lenses-" + index + "-" + j).innerHTML = e;
            
            lastLenses = document.getElementById("prdt-lenses-" + index + "-" + j);
            j++;
        })
        
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
    var a = document.getElementById("prdt-price-" + itemId).innerHTML.split(".")[0];
    var b = document.getElementById("prdt-price-" + itemId).innerHTML.split(".")[1].split('€')[0];
    var trueValuePrice = parseFloat(a) + (parseFloat(b)/100);

    var productToAdd = {
        id: itemId,
        name: document.getElementById("prdt-name-" + itemId).innerHTML,
        price: trueValuePrice,
        lenses: itemLenses,
        lensesText: document.getElementById("prdt-lenses-" + itemId + "-" + itemLenses).innerHTML,
        quantity: 1};
    
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


GetItemFromID(itemId);