const apiUrl = "http://localhost:3000/api/cameras/"

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

/* ----------------------------------------------------------- */

GetItemFromID(window.location.href.split('#')[1]);