import React, { useState } from "react";
import EditField from "./EditField";
import BootstrapTable from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      datAmt: props.dataNum || "10",
      show: false,
      editingEmp: {
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        location: "",
        cell: "",
        key: ""
      }
    };

    this.refreshResults = this.refreshResults.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateEmp = this.updateEmp.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  updateEmp(e) {
    this.setState({ editingEmp: e, show: false });

    let list = this.state.tableData.slice();
    let personObj = list.find(person => person.cell === e.key);

    personObj.name.first = this.state.editingEmp.firstName;
    personObj.name.last = this.state.editingEmp.lastName;
    personObj.cell = this.state.editingEmp.cell;
    personObj.dob.date = this.state.editingEmp.dob;
    personObj.location.state = this.state.editingEmp.location;
    personObj.gender = this.state.editingEmp.gender;

    this.setState({ tableData: list });
  }

  async componentDidMount() {
    var response = await fetch(
      "https://randomuser.me/api/?results=" + this.state.datAmt
    );

    var data = await response.json();
    this.setState({ tableData: data.results });
  }

  rowClick(id) {
    let list = this.state.tableData.slice();
    let personObj = list.find(person => person.cell === id);

    this.setState({
      show: true,
      editingEmp: {
        firstName: personObj.name.first,
        lastName: personObj.name.last,
        dob: personObj.dob.date,
        gender: personObj.gender,
        location: personObj.location.city,
        cell: personObj.cell,
        key: id
      }
    });
  }

  async refreshResults(amount) {
    var response = await fetch("https://randomuser.me/api/?results=" + amount);
    var data = await response.json();
    await this.setState({ tableData: data.results });
  }

  render() {
    const { tableData } = this.state;

    return (
      <div id="tableDiv">
        <div>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.show}
            onHide={this.handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Employee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ModalFormBody
                emp={this.state.editingEmp}
                updateEmp={this.updateEmp}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <EditField onclick={this.refreshResults} dataNum={this.state.datAmt} />
        <BootstrapTable striped bordered hover variant="dark" id="empTbl">
          <thead>
            <tr>
              <th>First</th>
              <th>Last</th>
              <th>DOB</th>
              <th>Location</th>
              <th>Cell</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(person => (
              <tr key={person.cell} onClick={() => this.rowClick(person.cell)}>
                <td>{person.name.first}</td>
                <td>{person.name.last}</td>
                <td>{person.dob.date}</td>
                <td>{person.location.city + ", " + person.location.state}</td>
                <td>{person.cell}</td>
                <td>{person.gender}</td>
              </tr>
            ))}
          </tbody>
        </BootstrapTable>
      </div>
    );
  }
}

function ModalFormBody(props) {
  function editFirstName(e) {
    props.emp.firstName = e.target.value;
  }

  function editLastName(e) {
    props.emp.lastName = e.target.value;
  }

  function editDOB(e) {
    props.emp.dob = new Date().toISOString(e.target.value);
  }

  function editLocation(e) {
    props.emp.location = e.target.value;
  }

  function editCell(e) {
    props.emp.cell = e.target.value;
  }

  function editGender(e) {
    props.emp.gender = e.target.value;
  }

  function dateString(s) {
    return new Date(s).toISOString().split("T")[0];
  }

  function saveEmp() {
    props.updateEmp(props.emp);
  }

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First name"
            defaultValue={props.emp.firstName}
            onChange={editFirstName}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last name"
            defaultValue={props.emp.lastName}
            onChange={editLastName}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridDOB">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="D.O.B"
            defaultValue={dateString(props.emp.dob)}
            onChange={editDOB}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="fromGridGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            placeholder="Unspecified"
            defaultValue={props.emp.gender}
            onChange={editGender}
          />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control
          placeholder="Someplace, Someotherplace"
          defaultValue={props.emp.location}
          onChange={editLocation}
        />
      </Form.Group>

      <Form.Group controlId="formGridCell">
        <Form.Label>Cell #</Form.Label>
        <Form.Control
          placeholder="123-456-7890"
          defaultValue={props.emp.cell}
          onChange={editCell}
        />
      </Form.Group>

      <Button variant="primary" onClick={saveEmp}>
        Submit
      </Button>
    </Form>
  );
}

export default Table;
