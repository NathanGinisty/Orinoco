function LoadID()
{
    document.getElementById("ID-order").innerHTML += " " + window.location.href.split('#')[1];
}

LoadID();