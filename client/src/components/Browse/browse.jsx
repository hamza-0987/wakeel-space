
import "./browse.css";
import React, { useState } from "react";
import Banner from './Banner';
import ClassList from './ClassList';
import landingVector from "../../assets/landing-vector.svg";
import Header from '../partials/Header/Header';
import MobileHeader from '../partials/Header/MobileHeader';
import FooterNav from '../partials/FooterNav/FooterNav';

export default function App() {

  const itemList = [
    "Apple",
    "Orange",
    "Banana",
    "Cherry",
    "Milk",
    "Peanuts",
    "Butter",
    "Tomato"
  ];

  const [filteredList, setFilteredList] = new useState(itemList);

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...itemList];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  };

  return (
    <section id="hero">
    <div className="dashboard">

      <div className="d-none d-md-block">
        <Header />
        <Banner />
      </div>
      <div className="d-block d-md-none">
        <MobileHeader />
        <Banner />
      </div>
        <div className="container pt-4">
          <div className="row">
            <div className="col-lg-6 pt-5 pt-lg-0 mb-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <input id="search-box" placeholder="Search" onChange={filterBySearch} />
              <div id="item-list">
                <ol>
                  {filteredList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
       
    </div>
    </section>
  );
}