import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: null
    };
  }

  async componentDidMount() {
    const boxes = (
      await axios.get(`http://localhost:8081/boxes`, {
        params: {
          ownerEmail: "ownerTest@gmail.com" //TODO : pass here the email of the user
        }
      })
    ).data;
    this.setState({
      boxes
    });
  }

  confirmSuppression(id, name) {
    confirmAlert({
      title: "Confirmation.",
      message: "Are you sure you want to delete the " + name + " box ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios.delete(`http://localhost:8081/box/${id}`);
            this.props.history.push("/boxes");
          }
        },
        {
          label: "No",
          onClick: () => this.props.history.push("/boxes")
        }
      ]
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.boxes === null && <p>Loading boxes...</p>}
          {this.state.boxes &&
            this.state.boxes.map(box => (
              <div key={box._id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/box/${box._id}`}>
                  <div className="card mb-3 boxCard">
                    <div className="card-header">
                      {box.name}
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        onClick={() => {
                          this.confirmSuppression(box._id, box.name);
                        }}
                      >
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                      </button>
                    </div>

                    <div className="card-body">
                      <img
                        className="card-img-top"
                        src="https://cdn.shopify.com/s/files/1/0024/3879/1281/products/recipebook_1024x1024@2x.png?v=1540587935"
                        alt="Recipe Img"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          <div key={box._id} className="col-sm-12 col-md-4 col-lg-3">
            <Link to={`/boxes/create`}>
              <div className="card mb-3 boxCard">
                <div className="card-header">Create new box</div>
                <div className="card-body">
                  <img
                    className="card-img-top"
                    src="https://cdn4.iconfinder.com/data/icons/meBaze-Freebies/512/add.png"
                    alt="Add Box Img"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default box;
