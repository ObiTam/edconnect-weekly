async function updatePrograms(){   
    let req = new Request("/api/programs", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    await fetch(req)
        .then(response => response.json())
        .then(data => {
            console.log('gotten programs')
            let dropdown = document.getElementById('program')
            for (let i = 0; i < data.length; i++){
                let op = document.createElement('option')
                op.value = op.textContent = data[i]
                dropdown.appendChild(op)
            } 
        })
}

async function updateGraduationYears(){   
    let req = new Request("/api/graduationYears", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    await fetch(req)
        .then(response => response.json())
        .then(data => {
            console.log('gotten years')
            let dropdown = document.getElementById('graduationYear')
            for (let i = 0; i < data.length; i++){
                let op = document.createElement('option')
                op.value = op.textContent = data[i]
                dropdown.appendChild(op)
            } 
        })
}

async function postUserData(data){
    let req = new Request("/api/register", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    await fetch(req)
        .then(response => {
            if (response.status === 200){
                console.log("request ok")
                return response.json()
            }
            else{
                console.log("request bad")
                return response.json()
            }
        })
        .then(data => {
            if(data.status === 'ok'){
                console.log(data)
                document.cookie = "uid=" + data.data.id
                console.log(document.cookie)
                window.setTimeout(function(){ window.location = "/project-explorer/index.html"}, 5000)
            }
            else{
                alert = document.getElementById("alertDiv")
                data.errors.forEach((e) => {
                    newTag = document.createElement('p')
                    newTag.textContent = e
                    alert.appendChild(newTag)
                })
                alert.style.display = "block"
                throw new Error("This request was bad \n status: " + data.status + " \n")
            }
        })
        .catch(e => console.log(e))
}

async function signupUser(){
    console.log('clicked')
    let data = {}
    const names = ["firstname", "lastname", "email", "password", "matricNumber", "program", "graduationYear"]
    
    names.forEach((name) => {
        document.getElementsByName(name).forEach((el) => {
            data[name] = el.value
            if (el.tagName == "INPUT"){
                el.value = ""
            }
            else{
                el.getElementsByTagName('option')[0].selected = "selected"
            }
        })
    })

    console.log(data)

    await postUserData(data)

    console.log('done')
}

if (window.location.pathname === "/project-explorer/register.html"){
    console.log('see')
    document.getElementById('signupButton').addEventListener('click', signupUser)
    updatePrograms()
    updateGraduationYears()
}