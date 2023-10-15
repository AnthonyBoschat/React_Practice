export function XMLrequest(post_get,identification, destination, bool = false, data = null)
{
    if(bool === false)
    {
        let XML_request = new XMLHttpRequest()
        XML_request.open(post_get, destination, true)
        XML_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        XML_request.send(`query=${identification}`)
        return XML_request
    }
    else if(bool === true)
    {
        if(data != null)
        {
            let XML_request = new XMLHttpRequest()
            XML_request.open("POST", destination, true)
            XML_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            XML_request.send(`query=${identification}&data=${data}`)
            return XML_request
        }
        
    }
}

export function onload(query, callback)
{
    query.onload = function()
    {
        if(query.status === 200)
        {
            let response = JSON.parse(query.responseText)
            if(response.status === true)
            {
                callback(response)
            }
            else{callback(false)}
        }
        else{callback(false)}
    }

    /*

    onload(query, function(response)
    {
        if(response)
        {
            console.log("Chargement réussi")
            ...reste du code...
        }
        else{console.log("Echec du traitement de la requête")}
    })

    */
}

export function injectAnimation(destination, nameClass, dury){

    destination.classList.add(nameClass)
    setTimeout(() => {
        destination.classList.remove(nameClass)
    }, dury*1000);
    
}