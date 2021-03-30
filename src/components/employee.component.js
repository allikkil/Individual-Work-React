import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.onChangeFname = this.onChangeFname.bind(this);
    this.onChangeLname = this.onChangeLname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.onChangeHdate = this.onChangeHdate.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);

    this.state = {
      currentEmployee: {
        id: null,
        fname: "",
        lname: "",
        email: "",
        telephone: "",
        hireDate: "",
        active: false,

      },
      message: ""
    };
  }

  componentDidMount() {
    this.getEmployee(this.props.match.params.id);
  }

  onChangeFname(e) {
    const firstname = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          firstname: firstname
        }
      };
    });
  }

  onChangeLname(e) {
    const lastname = e.target.value;

    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        lastname: lastname
      }
    }));
  }
  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        email: email
      }
    }));
  }
  onChangeTelephone(e) {
    const telephone = e.target.value;

    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        telephone: telephone
      }
    }));
  }
  onChangeHdate(e) {
    const hireDate = e.target.value;

    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        hireDate: hireDate
      }
    }));
  }

  getEmployee(id) {
    EmployeeDataService.get(id)
      .then(response => {
        this.setState({
          currentEmployee: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateActive(status) {
    var data = {
      id: this.state.currentEmployee.id,
      firstname: this.state.currentEmployee.firstname,
      lastname: this.state.currentEmployee.lastname,
      email: this.state.currentEmployee.email,
      telephone: this.state.currentEmployee.telephone,
      hireDate: this.state.currentEmployee.hireDate,
      active: status
    };

    EmployeeDataService.update(this.state.currentEmployee.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentEmployee: {
            ...prevState.currentEmployee,
            active: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateEmployee() {
    EmployeeDataService.update(
      this.state.currentEmployee.id,
      this.state.currentEmployee
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The employee was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteEmployee() {
    EmployeeDataService.delete(this.state.currentEmployee.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/employees')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentEmployee } = this.state;

    return (
      <div>
        {currentEmployee ? (
          <div className="edit-form">
            <h4>Employee</h4>
            <form>
              <div className="form-group">
                <label htmlFor="firstname">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={currentEmployee.firstname}
                  onChange={this.onChangeFname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={currentEmployee.lastname}
                  onChange={this.onChangeLname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentEmployee.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telephone">Telephone</label>
                <input
                  type="text"
                  className="form-control"
                  id="telephone"
                  value={currentEmployee.telephone}
                  onChange={this.onChangeTelephone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hireDate">Hired date</label>
                <input
                  type="text"
                  className="form-control"
                  id="hireDate"
                  value={currentEmployee.hireDate}
                  onChange={this.onChangeHdate}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentEmployee.active ? "Active" : "Inactive"}
              </div>
            </form>

            {currentEmployee.active ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateActive(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateActive(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteEmployee}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateEmployee}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Employee...</p>
          </div>
        )}
      </div>
    );
  }
}