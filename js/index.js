import * as main from './main.js';

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function NewItem(node, element, index, insertAfterNode = null)
{
    // create another item by copying the template
    var item = node.cloneNode(true);   
    insertAfter(item, insertAfterNode == null ? node : insertAfterNode);
    
    // set all the info except lenses
    InitItemsInfo(item, index, element);
    
    // set all the lenses
    InitItemsLenses(item, index, element);
    
    return item;
}

function InitItemsInfo(_item, _index, _element)
{
    // rename to the new index
    _item.querySelector("#prdt-0").setAttribute("id", _index);
    _item.querySelector("#prdt-name-0").setAttribute("id", "prdt-name-" + _index);
    _item.querySelector("#prdt-img-0").setAttribute("id", "prdt-img-" + _index);
    _item.querySelector("#prdt-price-0").setAttribute("id", "prdt-price-" + _index);
    _item.querySelector("#prdt-lenses-0-0").setAttribute("id", "prdt-lenses-" + _index + "-0");
    _item.querySelector("#prdt-description-0").setAttribute("id", "prdt-description-" + _index);
    
    // set new value onto the new product
    document.getElementById(_index).addEventListener("click", function(){UpdateUrlProduct(this)});
    document.getElementById("prdt-name-" + _index).innerHTML = _element.name;
    document.getElementById("prdt-img-" + _index).src = _element.imageUrl;
    document.getElementById("prdt-description-" + _index).innerHTML = _element.description;
    
    let newPrice = String(_element.price);
    document.getElementById("prdt-price-" + _index).innerHTML = newPrice.slice(0,-2)+ "." + newPrice.slice(-2,newPrice.length)+ "€";
}

function InitItemsLenses(_item, _index, _element)
{
    var j = 0;
    var srcLenses = document.getElementById("prdt-lenses-" + _index + "-0");
    var lastLenses = srcLenses;
    
    _element.lenses.forEach(e => {
        if (j > 0)
        {
            var newLenses = srcLenses.cloneNode(true);
            lastLenses.parentNode.insertBefore(newLenses, lastLenses);
            _item.querySelector("#prdt-lenses-" + _index + "-0").setAttribute("id", "prdt-lenses-" + _index + "-" + j);
        }
        document.getElementById("prdt-lenses-" + _index + "-" + j).innerHTML = e;
        document.getElementById("prdt-lenses-" + _index + "-" + j).addEventListener("click", function(){UpdateUrlProduct(this, j)});
        lastLenses = document.getElementById("prdt-lenses-" + _index + "-" + j);
        j++;
    })
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
    _data.forEach(element => { lastNode = NewItem(document.querySelector('.product'), element, element._id, lastNode);});  
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

