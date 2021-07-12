import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './Shared/Layout';
import {
    Container,
    Jumbotron,
    Card,
    CardDeck,
    Button
} from 'react-bootstrap'

async function getProjectList() {
    let req = new Request("/api/projects", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await
        fetch(req)
            .then(response => response.json())
            .then(data => {
                console.log('gotten projects')
                return data
            }
            )
            .catch(e => console.log(e))
}

const Project = () => {
    return (
        <Card id="project1" style={{ width: '17rem', margin: '0.4rem' }}>
            <Card.Body>
                <Card.Title className="text-primary">Project Title</Card.Title>
                <br />
                <Card.Subtitle className="text-muted" id="authors1">Author 1, Author 2</Card.Subtitle>
                <br />
                <Card.Text id="abstract1">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
                <p id="tags1">
                    <Card.Link href="#">#html</Card.Link>
                    <Card.Link href="#">#css</Card.Link>
                    <Card.Link href="#">#javascript</Card.Link>
                </p>
            </Card.Body>
        </Card>
    )
}

function Home () {
    const [projects, setProjects] = useState([])
    console.log('start')
    useEffect(() => {
        if(!projects){
           let p = getProjectList()
           setProjects(p)
        }
    },[projects])
    console.log('end')
    console.log(projects.length)
    console.log((projects.length < 4 ? projects.length : 4))
    // for (let i = 0; i < (projects.length < 4 ? projects.length : 4); i++) {
    //     console.log(i)
    //     project = projects[i]
    //     console.log(project)

    //     document.getElementById('project' + (i + 1)).style.visibility = 'visible'

    //     title = document.getElementById('title' + (i + 1))
    //     title.href = '/project-explorer/viewproject.html?id=' + project.id
    //     title.firstElementChild.textContent = project['name']

    //     authors = document.getElementById('authors' + (i + 1))
    //     authors.textContent = ''
    //     for (var j = 0; j < project['authors'].length - 1; j++) {
    //         authors.textContent += project['authors'][j] + ', '
    //     }
    //     authors.textContent += project['authors'][j]

    //     document.getElementById('abstract' + (i + 1)).textContent = project['abstract']

    //     tags = document.getElementById('tags' + (i + 1))
    //     tags.innerHTML = ''
    //     for (var k = 0; k < project['tags'].length; k++) {
    //         tags.innerHTML += "<a class='card-link'>" + project['tags'][k] + "</a>"
    //     }
    // }

    // for (var i = projects.length; i < 4; i++) {
    //     document.getElementById('project' + (i + 1)).style.visibility = 'hidden'
    // }
    return (
        <Layout>
            <Container>
                <Jumbotron className="jumbotron">
                    <h1>Welcome to Project Explorer</h1>
                    <p>
                        Project Explorer is a repository tool for final year projects accross all departments at your institution. You can submit your project and search projects submitted by others to learn from
                    </p>
                    <Button href="register.html" variant="primary">Get Started</Button>
                    <Button href="login.html" variant="secondary">Login</Button>
                </Jumbotron>

                <CardDeck className="row showcase">
                    <Project />
                </CardDeck>

            </Container>

            <br />

        </Layout>
    )
}
export default Home