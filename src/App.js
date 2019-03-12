
// import './App.css';
// import BootstrapTable from 'react-bootstrap/Table'
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Navbar from 'react-bootstrap/Navbar'


// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <link
//             rel="stylesheet"
//             href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
//             integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
//             crossOrigin="anonymous"
//           />
//           <NavBar />
//           {/* <Container >
//             <Row>
//               <Col>1 of 3</Col>
//               <Col xs={6}>2 of 3 (wider)</Col>
//               <Col>3 of 3</Col>
//             </Row>
//             <Row>
//               <Col>1 of 3</Col>
//               <Col xs={5}>2 of 3 (wider)</Col>
//               <Col>3 of 3</Col>
//             </Row>
//           </Container>; */}
//           < BTable />
//         </header>
//       </div>
//     );
//   }
// }

// class NavBar extends React.Component {
//   render() {
//     return (
//       <Navbar bg="light" expand="lg">
//         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mr-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#link">Link</Nav.Link>
//             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//           <Form inline>
//             <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//             <Button variant="outline-success">Search</Button>
//           </Form>
//         </Navbar.Collapse>
//       </Navbar>
//         )
//   }
// }

// class BTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tableDat: null,
//     }
//   }

//   componentDidMount() {
//     fetch("https://randomuser.me/api/?results=10")
//       .then(res => res.json())
//       .then(json => this.setState({ tableDat: json }))
//       .then(console.log(this.state.tableDat));
//   }

//   render() {
//     let data = this.state.tableDat;

//     return (
//       <div>
//         <BootstrapTable >
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Occupation</th>
//               <th>Sex</th>
//             </tr>
//           </thead>
//         </BootstrapTable>
//       </div>
//     )
//   };
// }


// class TableRow extends React.Component {
//   render() {
//     return (
//       <div></div>
//     );

//   }
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
          <Route path="/employees" component={Employees} />
        </div>
      </Router>
    );
  }
}

class EditWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = null;
  }

  render() {
    return (
      <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"> Launch demo modal</button>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ...
      </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


}

class EditFIeld extends React.Component {
  constructor(props) {
    super(props);

    this.state = { dataNum: props.dataNum }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.value >>> 0 !== parseFloat(e.target.value)) {
      e.target.value = e.target.value.slice(0, -1);
      return;
    }

    if (e.target.value === null) {
      e.target.value = "";
      return;
    }

    this.setState({ dataNum: e.target.value });
  }

  render() {
    return (
      <div>
        <button id="refreshBtn" type="button" className="btn btn-success" onClick={() => this.props.onclick(this.state.dataNum)}>Refresh</button>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Entries in table</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handleChange} placeholder="10" />
            <small id="emailHelp" className="form-text text-muted">Change amount of entries in table</small>
          </div>
        </form>
      </div>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tableData: [], datAmt: props.dataNum || '10' };

    this.refreshResults = this.refreshResults.bind(this);
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=' + this.state.datAmt)
      .then(response => response.json())
      .then(data => this.setState({ tableData: data.results }, () => console.log(this.state.tableData[0])))
  }

  refreshResults(amount) {
    fetch('https://randomuser.me/api/?results=' + amount)
      .then(response => response.json())
      .then(data => this.setState({ tableData: data.results }, () => console.log(this.state.tableData[0])))

    this.setState({ datAmt: amount })
  }

  render() {
    const { tableData } = this.state;

    return (
      <div id="tableDiv">
        <EditFIeld onclick={this.refreshResults} dataNum={this.state.datAmt} />
        <table className="table table-dark table-striped text-center" id="empTbl">
          <thead>
            <tr>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">DOB</th>
              <th scope="col">Location</th>
              <th scope="col">Cell</th>
              <th scope="col">Gender</th>
            </tr>
          </thead>
          <tbody>
            {
              tableData.map(person =>
                <tr key={person.cell}>
                  <td>
                    {person.name.first}
                  </td>
                  <td >
                    {person.name.last}
                  </td>
                  <td>
                    {person.dob.date}
                  </td>
                  <td>
                    {person.location.city + ', ' + person.location.state}
                  </td>
                  <td >
                    {person.cell}
                  </td>
                  <td >
                    {person.gender}
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

class ThemeSwitcher extends React.Component {

  state = { theme: null }

  resetTheme = evt => {
    evt.preventDefault();
    this.setState({ theme: null });
  }

  chooseTheme = (theme, evt) => {
    evt.preventDefault();
    this.setState({ theme });
  }

  render() {

    const { theme } = this.state;
    const themeClass = theme ? theme.toLowerCase() : 'secondary';

    return (
      <div className="d-flex flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
        <span className={`h1 mb-4 w-100 text-center text-${themeClass}`}>{theme || 'Default'}</span>
        <div className="btn-group">
          <button type="button" className={`btn btn-${themeClass} btn-lg`}>{theme || 'Choose'} Theme</button>
          <button type="button" className={`btn btn-${themeClass} btn-lg dropdown-toggle dropdown-toggle-split`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="sr-only">Toggle Theme Dropdown</span>
          </button>
          <div className="dropdown-menu">

            <a className="dropdown-item" href="#" onClick={e => this.chooseTheme('Primary', e)}>Primary Theme</a>
            <a className="dropdown-item" href="#" onClick={e => this.chooseTheme('Danger', e)}>Danger Theme</a>
            <a class="dropdown-item" href="#" onClick={e => this.chooseTheme('Success', e)}>Success Theme</a>

            <div className="dropdown-divider"></div>

            <a className="dropdown-item" href="#" onClick={this.resetTheme}>Default Theme</a>
          </div>

        </div>

      </div>
    );

  }

}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <ThemeSwitcher />
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Employees() {
  return (
    <div>
      <h2>Employees</h2>
      <Table />
    </div>
  );
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}

export default App;