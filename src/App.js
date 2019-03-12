import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Table} from './Table'

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
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          {" "}
          Launch demo modal
        </button>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ThemeSwitcher extends React.Component {
  state = { theme: null };

  resetTheme = evt => {
    evt.preventDefault();
    this.setState({ theme: null });
  };

  chooseTheme = (theme, evt) => {
    evt.preventDefault();
    this.setState({ theme });
  };

  render() {
    const { theme } = this.state;
    const themeClass = theme ? theme.toLowerCase() : "secondary";

    return (
      <div className="d-flex flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
        <span className={`h1 mb-4 w-100 text-center text-${themeClass}`}>
          {theme || "Default"}
        </span>
        <div className="btn-group">
          <button type="button" className={`btn btn-${themeClass} btn-lg`}>
            {theme || "Choose"} Theme
          </button>
          <button
            type="button"
            className={`btn btn-${themeClass} btn-lg dropdown-toggle dropdown-toggle-split`}
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle Theme Dropdown</span>
          </button>
          <div className="dropdown-menu">
            <a
              className="dropdown-item"
              href="#"
              onClick={e => this.chooseTheme("Primary", e)}
            >
              Primary Theme
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={e => this.chooseTheme("Danger", e)}
            >
              Danger Theme
            </a>
            <a
              class="dropdown-item"
              href="#"
              onClick={e => this.chooseTheme("Success", e)}
            >
              Success Theme
            </a>

            <div className="dropdown-divider" />

            <a className="dropdown-item" href="#" onClick={this.resetTheme}>
              Default Theme
            </a>
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
