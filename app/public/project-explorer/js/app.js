async function updatePrograms(){   
    let req = new Request("/api/programs", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    await fetch(req)
        .then(response => response.json())
        .then(data => console.log(data))

    let options = document.getElementById('program').options
    console.log(options)
}

updatePrograms()