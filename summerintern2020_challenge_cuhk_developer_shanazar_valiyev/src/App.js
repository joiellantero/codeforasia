import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CreateForm from './components/create-form.component';
import EditForm from './components/edit-form.component';
import ShowForm from './components/show-form.component';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>

              <Navbar.Brand>
                <Link to={"/create-form"} className='nav-link'>
                  codeforasia
              </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">

                <Nav>
                  <Link to={"./create-form"} className="nav-link">
                    Create form
                </Link>
                </Nav>

                <Nav>
                  <Link to={"./show-form"} className="nav-link">
                    Show form
                </Link>
                </Nav>

              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path='/' component={CreateForm} />
                  <Route exact path='/create-form' component={CreateForm} />
                  <Route exact path='/edit-form' component={EditForm} />
                  <Route exact path='/show-form' component={ShowForm} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
