import React, { useState } from 'react';
import "./Dashboard.css";
import AddIcon from '@material-ui/icons/Add';
const SideDash = (props) => {
  const [show, setShow] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const toggle = () => setShow(prevState=>!prevState);
  const toggleJoin = () => setShowJoin(prevState=>!prevState);
  return (
    <div className="col-3 d-none d-md-block Dashboard_Sidedrawer px-1 ps-4 width-20">
      <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search Material</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="eg. Previous Year Papers"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
      <div className="row join-links pt-3">
        <div className="col-12 d-flex justify-content-center pb-3">
          <button className="join-create-btn" onClick={() => setShow(true)}>
          <AddIcon className="pe-1 mb-1"></AddIcon>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideDash;
