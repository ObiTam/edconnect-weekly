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
                window.location = "/project-explorer/index.html"
            }
            else{
                alert = document.getElementById("alertDiv")
                data.errors.forEach((e) => {
                    alert.innerHTML += e + "<br>"
                })
                alert.style.display = "block"
                throw new Error("This request was bad \n status: " + data.status + " \n")
            }
        })
        .catch(e => console.log(e))
}

async function signupUser(){
    console.log('clicked')

    alert = document.getElementById('alertDiv')
    alert.style.display = "none"
    alert.innerHTML= ""

    let data = {}
    const names = ["firstname", "lastname", "email", "password", "matricNumber", "program", "graduationYear"]
    
    names.forEach((name) => {
        el = document.getElementById(name)
        data[name] = el.value
        if (el.tagName == "INPUT"){
            el.value = ""
        }
        else{
            el.getElementsByTagName('option')[0].selected = "selected"
        }
    })

    console.log(data)

    await postUserData(data)

    console.log('done')
}

function switchToLoggedIn(){
    document.getElementById('signup').style.display = 'none'
    document.getElementById('logout').style.display = 'block'
    document.getElementById('login').style.display = 'none'
    document.getElementById('username').style.display = 'block'
}

function switchToLoggedOut(){
    document.getElementById('signup').style.display = 'block'
    document.getElementById('logout').style.display = 'none'
    document.getElementById('login').style.display = 'block'
    document.getElementById('username').style.display = 'none'
    document.cookie = 'uid=; expires=Thu 01 Jan 1970T00:00:00Z;' 
    console.log(done)
}

async function getDetails(uid){
    let req = new Request("/api/users/" + uid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    await fetch(req)
        .then(response => {
            console.log(response)
            if (response.status === 200){
                return response.json()
            }
            else{
                throw new Error('invalid request')
            }
        })
        .then(data => {
            console.log(data)
            if (data){
                document.getElementById('username').textContent += ', ' + data.firstname
                switchToLoggedIn()
                return true
            }
            else{
                throw new Error('invalid user id')
            }
        })
        .catch(
            e => console.log(e)
        )
        return false
}

function checkLoggedIn(){
    cookies = document.cookie.split('; ')
    for (let i = 0; i < cookies.length; i++){
        data = cookies[i].split('=')
        if (data[0] === 'uid' && data[1]){
            uid = data[1]
            return getDetails(uid)
        }
    }
    return false
}

async function checkLoginData(data){
    let req = new Request("/api/login", {
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
                window.location = "/project-explorer/index.html"
            }
            else{
                alert = document.getElementById("alertDiv")
                alert.innerHTML = "Invalid email/password"
                alert.style.display = "block"
                throw new Error("This request was bad \n status: " + data.status + " \n")
            }
        })
        .catch(e => console.log(e))
}

async function loginUser(){
    console.log('clicked')

    alert = document.getElementById('alertDiv')
    alert.style.display = "none"
    alert.innerHTML= ""

    let data = {}
    const names = ["email", "password"]
    
    names.forEach((name) => {
        el = document.getElementById(name)
        data[name] = el.value
        el.value = ""
    })

    console.log(data)

    await checkLoginData(data)

    console.log('done')
}

function register(){
    console.log('register page')
    document.getElementById('signupButton').addEventListener('click', signupUser)
    updatePrograms()
    updateGraduationYears()
}

function login(){
    console.log('login page')
    document.getElementById('loginButton').addEventListener('click', loginUser)
}

async function postProjectData(data){
    let req = new Request("/api/projects", {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
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
                window.location = "/project-explorer/index.html"
            }
            else{
                alert = document.getElementById("alertDiv")
                data.errors.forEach((e) => {
                    alert.innerHTML += e + "<br>"
                })
                alert.style.display = "block"
                throw new Error("This request was bad \n status: " + data.status + " \n")
            }
        })
        .catch(e => console.log(e))
}

async function newProject(){
    console.log('clicked')

    alert = document.getElementById('alertDiv')
    alert.style.display = "none"
    alert.innerHTML= ""

    let data = {}
    const names = ["name", "abstract"]
    
    names.forEach((name) => {
        el = document.getElementById(name)
        data[name] = el.value
        el.value = ""
    })

    el = document.getElementById('authors')
    data['authors'] = el.value.split(',')
    el.value = ""

    el = document.getElementById('tags')
    data['tags'] = el.value.split(' ')
    el.value = ""

    console.log(data)

    await postProjectData(data)

    console.log('done')
}

function createProject(){
    if (!checkLoggedIn()){
        window.location = "/project-explorer/index.html"
    }
    console.log('create project page')
    document.getElementById('continue').addEventListener('click', newProject)
}

window.onload = () => {
    checkLoggedIn()
    document.getElementById('logout').addEventListener("click", switchToLoggedOut)
    
    if (window.location.pathname.includes("register.html")){register()}
    if (window.location.pathname.includes("login.html")){login()}
    if (window.location.pathname.includes("createproject.html")){createProject()}
}