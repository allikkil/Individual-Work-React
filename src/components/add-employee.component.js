import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.onChangeFname = this.onChangeFname.bind(this);
    this.onChangeLname = this.onChangeLname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.onChangeHdate = this.onChangeHdate.bind(this);

    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      fname: "",
      lname: "",
      email: "",
      telephone: "",
      hireDate: "",
      active: false,

      submitted: false
    };
  }

  onChangeFname(e) {
    this.setState({
      fname: e.target.value
    });
  }
  onChangeLname(e) {
    this.setState({
      lname: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeTelephone(e) {
    this.setState({
      telephone: e.target.value
    });
  }
  onChangeHdate(e) {
    this.setState({
      hireDate: e.target.value
    });
  }

  saveEmployee() {
    var data = {
      id: null,
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      telephone: this.state.telephone,
      hireDate: this.state.hireDate,

    };

    EmployeeDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          fname: response.data.fname,
          lname: response.data.lname,
          email: response.data.email,
          telephone: response.data.telephone,
          hireDate: response.data.hireDate,
          active: response.data.active,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newEmployee() {
    this.setState({
      id: null,
      fname: "",
      lname: "",
      email: "",
      telephone: "",
      hireDate: "",
      active: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newEmployee}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                required
                value={this.state.fname}
                onChange={this.onChangeFname}
                name="firstname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                required
                value={this.state.lname}
                onChange={this.onChangeLname}
                name="lastname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="telephone">Telephone</label>
              <input
                type="text"
                className="form-control"
                id="telephone"
                required
                value={this.state.telephone}
                onChange={this.onChangeTelephone}
                name="telephone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="hireDate">Hired date</label>
              <input
                type="text"
                className="form-control"
                id="hireDate"
                required
                value={this.state.hireDate}
                onChange={this.onChangeHdate}
                name="hireDate"
              />
            </div>

            <button onClick={this.saveEmployee} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}