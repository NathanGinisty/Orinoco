/*

- formulaire de contact
- panier
- formulaire de commande
- confirmation de commande ( back-end ID, calculé depuis le backend)

*/

function multiplyNode(node, count, deep)
{
    for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        node.parentNode.insertBefore(copy, node);
    }
}
// multiplyNode(document.querySelector('.product'), 5, true);

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function newProduct(node, element, index, insertAfterNode = null)
{
    var newPrdt = node.cloneNode(true);
    
    insertAfter(newPrdt, insertAfterNode == null ? node : insertAfterNode);
    
    // rename to the new index
    newPrdt.querySelector("#prdt-0").setAttribute("id", index);
    newPrdt.querySelector("#prdt-name-0").setAttribute("id", "prdt-name-" + index);
    newPrdt.querySelector("#prdt-img-0").setAttribute("id", "prdt-img-" + index);
    newPrdt.querySelector("#prdt-price-0").setAttribute("id", "prdt-price-" + index);
    newPrdt.querySelector("#prdt-lenses-0-0").setAttribute("id", "prdt-lenses-" + index + "-0");
    newPrdt.querySelector("#prdt-description-0").setAttribute("id", "prdt-description-" + index);
    
    // set new value onto the new product
    document.getElementById("prdt-name-" + index).innerHTML = element.name;
    document.getElementById("prdt-img-" + index).src = element.imageUrl;
    document.getElementById("prdt-description-" + index).innerHTML = element.description;
    
    let newPrice = String(element.price);
    ;
    document.getElementById("prdt-price-" + index).innerHTML = newPrice.slice(0,-2)+ "." + newPrice.slice(-2,newPrice.length)+ "€";
    
    
    
    // get and set all the lenses value (ver1)
    var j = 0;
    var srcLenses = document.getElementById("prdt-lenses-" + index + "-0");
    var lastLenses = srcLenses;
    
    element.lenses.forEach(e => {
        if (j > 0)
        {
            var newLenses = srcLenses.cloneNode(true);
            lastLenses.parentNode.insertBefore(newLenses, lastLenses);
            newPrdt.querySelector("#prdt-lenses-" + index + "-0").setAttribute("id", "prdt-lenses-" + index + "-" + j);
        }
        document.getElementById("prdt-lenses-" + index + "-" + j).innerHTML = e;
        
        lastLenses = document.getElementById("prdt-lenses-" + index + "-" + j);
        j++;
    })
    
    // ----- get and set all the lenses value (ver2)
    // var srcLenses = document.getElementById("prdt-lenses-" + index + "-0");
    // var lastLenses = srcLenses;
    
    // for (let j = 1; j < element.lenses.length; j++)
    // {
    //     var newLenses = srcLenses.cloneNode(true);
    //     lastLenses.parentNode.insertBefore(newLenses, lastLenses);
    //     newPrdt.querySelector("#prdt-lenses-" + index + "-0").setAttribute("id", "prdt-lenses-" + index + "-" + j);
    //     lastLenses = newLenses;
    // }
    
    // for (let j = 0; j < element.lenses.length; j++)
    // {
    //     document.getElementById("prdt-lenses-" + index + "-" + j).innerHTML = element.lenses[j];
    // }
    
    return newPrdt;
}

/* ----------------------------------------------------------- */

function LoadProductPage(element)
{
    element.setAttribute("href", "product.html#" + element.id);
}

/* ----------------------------------------------------------- */

const apiData = {
    url: 'http://localhost:3000/api/',
    table: 'cameras',
    id: ''
}

const {url, table, id} = apiData
const apiUrl = `${url}${table}${id}`


function GetData()
{
    fetch(apiUrl)
    .then(data => data.json())
    .then(data =>{
        var lastNode = null;
        data.forEach(element => { lastNode = newProduct(document.querySelector('.product'), element, element._id, lastNode);});  
        document.querySelector('.product').remove(); // remove the base(first one) since it became useless
    })
    
}

GetData();