export const apiData = {
    url: 'http://localhost:3000/api/',
    table: 'cameras'
}

export function GetData(_callback, _url = apiData.url + apiData.table)
{
    fetch(_url)
    .then(data => data.json())
    .then(data =>{
        _callback(data);
    })
    
}

export function SendData(_callback, _url, _request)
{
    // Sending info...
    fetch(_url, _request)
    .then((response) => response.json())
    .then( (r) => {
        // console.log(r);
        _callback(r);
    })
    .catch((error) => {
        console.error(error);
    })
}