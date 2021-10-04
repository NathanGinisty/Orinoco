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
