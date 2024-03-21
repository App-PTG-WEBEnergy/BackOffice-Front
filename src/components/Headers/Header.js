
import React from "react";


import { Container } from "reactstrap";

const Header = (props)=> {

    return (
      <>
        <div className="header bg-success pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {props.component}
            </div>
          </Container>
        </div>
      </>
    );
  
}

export default Header;
