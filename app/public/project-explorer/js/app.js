function updatePrograms(){   
    let req = new Request("/api/programs", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    fetch(req)
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

function updateGraduationYears(){   
    let req = new Request("/api/graduationYears", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    fetch(req)
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

    return await fetch(req)
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
                setUID(data)
                console.log(document.cookie)
                return true
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
        .catch(e => {
            console.log(e)
            return false
        })
        
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
    test = await postUserData(data)
    if (test){
        window.location = "/project-explorer/index.html"
            
    }

    console.log('done')
}

async function getDetails(uid){
    let req = new Request("/api/users/" + uid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await fetch(req)
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
            console.log('end json conversion')
            if (data){
                console.log(data)
                return data
            }
            else{
                throw new Error('invalid user id')
            }
        })
        .catch(e => {
            console.log(e)
            return false
        })
}

function getUID(){
    cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++){
        data = cookies[i].trim().split('=')
        if (data[0] === 'uid' && data[1]){
            let uid = data[1]
            return uid
            }
            break
        }
    return null
}

function setUID(data){
    document.cookie = "uid=" + data.data.id + "; path=/"
}

function resetUID(){
    document.cookie = 'uid=; expires=Thu 01 Jan 1970T00:00:00Z; path=/;' 
}

function switchToLoggedIn(data){
    document.getElementById('username').textContent += ', ' + data.firstname
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
    document.getElementById('username').textContent = 'Hi'
    resetUID()
    console.log(done)
}

async function checkLoggedIn(){
    uid = getUID()
    console.log('uid = ' + uid)
    if (uid){
        data = await getDetails(uid)
        console.log('gotten data')
        if(data){
            return data
        }
    }
    return null
}

async function checkLoginData(data){
    let req = new Request("/api/login", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await fetch(req)
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
                setUID(data)
                console.log(document.cookie)
                return data
            }
            else{
                alert = document.getElementById("alertDiv")
                alert.innerHTML = "Invalid email/password"
                alert.style.display = "block"
                throw new Error("This request was bad \n status: " + data.status + " \n")
            }
        })
        .catch(e => {
            console.log(e)
            return null
        })
}

async function loginUser(){
    console.log('clicked')

    alert = document.getElementById('alertDiv')
    alert.style.display = "none"
    alert.innerHTML= ""

    let loginData = {}
    const names = ["email", "password"]
    
    names.forEach((name) => {
        el = document.getElementById(name)
        loginData[name] = el.value
        el.value = ""
    })

    console.log(loginData)

    userData = await checkLoginData(loginData)
    if (userData){
        switchToLoggedIn(userData)
        window.location = "/project-explorer/index.html"
    }

    console.log('done')
}

async function postProjectData(data){
    let req = new Request("/api/projects", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await fetch(req)
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
                return true
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
        .catch(e => {
            console.log(e)
            return false
        })
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

    good = await postProjectData(data)
    if(good){
        window.location = "/project-explorer/index.html"
    }

    console.log('done')
}

async function getProjectList(){
    let req = new Request("/api/projects", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await fetch(req)
        .then(response => response.json())
        .then(data => {
            console.log('gotten projects')
            return data
            } 
        )
        .catch(e => console.log(e))
}

async function getProject(id){
    let req = new Request("/api/projects/"+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await fetch(req)
        .then(response => response.json())
        .then(data => {
            console.log('gotten project')
            return data
            } 
        )
        .catch(e => console.log(e))
}

async function getCreator(id){
    let req = new Request("/api/users/"+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await fetch(req)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log('gotten creator')
            console.log(data)
            return data
            } 
        )
        .catch(e => console.log(e))
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

function createProject(userData){
    if (!userData){
        window.location = "/project-explorer/login.html"
    }
    console.log('create project page')
    document.getElementById('continue').addEventListener('click', newProject)
}

async function index(){
    projects = await getProjectList()
    console.log(projects.length)
    console.log((projects.length < 4 ? projects.length : 4))
    for (let i=0; i < (projects.length < 4 ? projects.length : 4); i++){
        console.log(i)
        project = projects[i]
        console.log(project)

        document.getElementById('project'+(i+1)).style.visibility = 'visible'
        
        title = document.getElementById('title'+(i+1))
        title.href = '/project-explorer/viewproject.html?id='+project.id
        title.firstElementChild.textContent = project['name']

        authors = document.getElementById('authors'+(i+1))
        authors.textContent = ''
        for(var j = 0; j < project['authors'].length-1; j++){
            authors.textContent += project['authors'][j] + ', '
        }
        authors.textContent += project['authors'][j]

        document.getElementById('abstract'+(i+1)).textContent = project['abstract']

        tags = document.getElementById('tags'+(i+1))
        tags.innerHTML = ''
        for(var k = 0; k < project['tags'].length; k++){
            tags.innerHTML += "<a class='card-link'>" + project['tags'][k] + "</a>"
        }
    }

    for (var i=projects.length; i<4; i++){
        document.getElementById('project'+(i+1)).style.visibility = 'hidden'
    }
}

async function viewProject(){
    console.log('view project page')

    id = window.location.search.slice(4)
    console.log(id)

    project = await getProject(id)
    console.log(project)

    document.getElementById('project_name').textContent = project.name
    document.getElementById('project_abstract').textContent = project.abstract

    authors = document.getElementById('project_authors')
    authors.innerHTML = ''
    for(var j = 0; j < project['authors'].length; j++){
        authors.innerHTML += "<li class='list-group-item'>" + project['authors'][j] + "</li>"
    }

    tags = document.getElementById('project_tags')
    tags.innerHTML = ''
    for(var j = 0; j < project['tags'].length; j++){
        tags.innerHTML += "<a href='#' class='card-link'>" + project['tags'][j] + "</a>"
    }

    creator = await getCreator(project.createdBy)
    createdBy = document.getElementById('project_author')
    createdBy.innerHTML = "Created By <br>" + creator.firstname + ' ' + creator.lastname
}

window.onload = async () => {
    data = await checkLoggedIn()
    if(data){
        console.log('logged in')
        switchToLoggedIn(data)
    }
    
    document.getElementById('logout').addEventListener("click", switchToLoggedOut)
    if (window.location.pathname.includes("index.html")){index()}
    if (window.location.pathname.includes("register.html")){register()}
    if (window.location.pathname.includes("login.html")){login()}
    if (window.location.pathname.includes("createproject.html")){createProject(data)}
    if (window.location.pathname.includes("viewproject.html")){viewProject(data)}
}