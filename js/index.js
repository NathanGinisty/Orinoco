import * as main from './main.js';

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
    document.getElementById(index).addEventListener("click", function(){UpdateUrlProduct(this)});
    document.getElementById("prdt-name-" + index).innerHTML = element.name;
    document.getElementById("prdt-img-" + index).src = element.imageUrl;
    document.getElementById("prdt-description-" + index).innerHTML = element.description;
    
    let newPrice = String(element.price);
    document.getElementById("prdt-price-" + index).innerHTML = newPrice.slice(0,-2)+ "." + newPrice.slice(-2,newPrice.length)+ "€";
    
    // get and set all the lenses value
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
        document.getElementById("prdt-lenses-" + index + "-" + j).addEventListener("click", function(){UpdateUrlProduct(this, j)});
        lastLenses = document.getElementById("prdt-lenses-" + index + "-" + j);
        j++;
    })
    
    return newPrdt;
}

function UpdateUrlProduct(_element, _lenses = null)
{
    if (_lenses == null)
    {
        _element.setAttribute("href", _element.href + "#" + _element.id + "#0");
    }
    else
    {
        var numLense = _element.id.split('-')[3];
        var id = _element.parentNode.parentNode.childNodes[1].id;
        _element.setAttribute("href", _element.href + "#" + id + "#" + numLense);
    }
}

function LoadItems(_data)
{
    var lastNode = null;
    _data.forEach(element => { lastNode = newProduct(document.querySelector('.product'), element, element._id, lastNode);});  
    document.querySelector('.product').remove(); // remove the base(first one) since it became useless
}

//#Load ------------------------------ 

main.GetData(LoadItems);



//#region --- Function for testing ---

function consoletest()
{
    console.log("TESTING");
}

function multiplyNode(node, count, deep)
{
    for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        node.parentNode.insertBefore(copy, node);
    }
}
//multiplyNode(document.querySelector('.product'), 5, true);

//#endregion

