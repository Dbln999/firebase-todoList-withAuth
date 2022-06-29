import React from "react";

const Loader = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
        <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
  );
};

export default Loader;
