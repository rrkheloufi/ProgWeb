import React, { Component } from "react";
import * as TheMealDb from "../TheMealDB/TheMealDB";

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: null
    };
  }

  async componentDidMount() {
    let categories = await TheMealDb.getCategories();
    // let areas = await TheMealDb.getAreas() ;
    // let ingredients = await TheMealDb.getIngredients();

    console.log("categories : " + categories[0].strCategory);
    this.setState({
      categories
    });
  }

  handleChange = (event) => {
    let selectedValue = event.target.value;
    this.props.onSelectChange(selectedValue);
  }
  createSelectItems(categories) {
    console.log("categories in create" + categories[0]);
    let items = [];         
    for (let i = 0; i <categories.length; i++) {             
         items.push({value: categories[i].strCategory, label:categories[i].strCategory});   
         //here I will be creating my options dynamically based on
         //what props are currently passed to the parent component
    }
    return items;
}  


  render() {
    const { categories } = this.state;

    const animatedComponents = makeAnimated();
    let options =  [
      { value: "one", label: "One" },
      { value: "two", label: "Two" }
    ];
    if (categories) {
      console.log("Cat in json" + categories);
      options = this.createSelectItems(categories);
      console.log("options : " + options[0].value);
    }
    return (
      <div className="container bg-faded py-3">
        <div className="row">
          {categories && (
            <div><p>test</p></div>)
          }
          <div className="input-group mb-4 text-center">
            <input
              type="search"
              placeholder="What are you searching for?"
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
        <div className="row" id="filter">
          <div className="col-md-4 col-sm-4 col-xs-6">
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={{value: 0, label: "All categories"}}
              isMulti
              options={options}
            />
          </div>

          <div className="col-md-4 col-sm-4 col-xs-6">
            <select id="filter filter-area" className="form-control selectpicker" data-live-search="true" placeholder="Area" multiple>
            </select>
          </div>

          <div className="col-md-4 col-sm-4 col-xs-6">
            <select id="filter filter-main-ingredient" className="form-control selectpicker" data-live-search="true">
            </select>
          </div>
        </div>
      </div>
    );
  }
}

{/*<div className="container bg-faded py-3">
        <div className="input-group mb-4 text-center">
          <input
            type="search"
            placeholder="What are you searching for?"
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
</div>*/}

export default SearchBar;
