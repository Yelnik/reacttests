import React, { useState } from "react";
import EditField from "./EditField";
import BootstrapTable from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tableData: [], datAmt: props.dataNum || "10", show: "false" };

    this.refreshResults = this.refreshResults.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.editWin = this.editWin.bind(this);
  }

  handleClose() {
    //props.update(employee);
    //changeShow(false);
  }

  handleShow() {
    this.setState( { show: "true" });
  }

  editWin(e) {
    
    //EditWindow({ emp: e, update: this.updateEmployee });
  }

  async componentDidMount() {
    var response = await fetch(
      "https://randomuser.me/api/?results=" + this.state.datAmt
    );

    var data = await response.json();
    await this.setState({ tableData: data.results });

    console.log(this.state.tableData[0]);
  }

  rowClick(id) {
    let list = this.state.tableData.slice();
    let personObj = list.find(person => person.cell == id);
    this.setState({ show: "true" });

    
    // <div>
    // <EditWindow emp={personObj} update={this.updateEmployee}/>
    // </div>
    // personObj.name.first = "Rick";
    //this.setState({ tableData: list });
    //console.log(personObj);
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
          <Button
            variant="success"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={this.handleShow}
          >
            Launch demo modal
        </Button>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.show} onHide={this.handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Employee
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <ModalFormBody /> */}
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

function ModalFormBody() {
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control as="select">
            <option>Choose...</option>
            <option>...</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Form.Row>

      <Form.Group id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
  </Button>
    </Form>
  );
}

export default Table;
