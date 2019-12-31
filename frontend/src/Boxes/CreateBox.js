import React, { Component } from "react";
import { withRouter } from "react-router-dom";
//import auth0Client from "../Auth";
import axios from "axios";

class CreateBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      boxName: "",
      ownerEmail: "ownerTest@gmail.com",
      description: null
    };
  }

  updateName(value) {
    this.setState({
      boxName: value
    });
  }

  updateDescription(value) {
    this.setState({
      description: value
    });
  }

  async submit() {
    this.setState({
      disabled: true
    });

    await axios.post(
      "http://localhost:8081/box",
      {
        name: this.state.boxName,
        ownerEmail: this.state.ownerEmail,
        mealsIds: [52918, 52846, 52795],
        description: this.state.description
      } /*,
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }*/
    );

    this.props.history.push("/boxes");
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">Create Box</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="Box name">Name:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={e => {
                      this.updateName(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Give your box a name."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Box description">Description:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={e => {
                      this.updateDescription(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Give more context to your box."
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {
                    this.submit();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateBox);
