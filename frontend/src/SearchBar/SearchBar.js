import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <div class="container bg-faded py-3">
        <div className="input-group mb-4 text-center">
          <input
            type="search"
            placeholder="What're you searching for?"
            aria-describedby="button-addon6"
            className="form-control searchBar"
          />
          <div className="input-group-append">
            <button
              id="button-addon6"
              type="submit"
              className="btn btn-info searchButton"
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
