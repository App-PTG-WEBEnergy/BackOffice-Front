/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {  MenuUnfoldOutlined, MenuFoldOutlined,UserOutlined } from '@ant-design/icons';

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Media
} from "reactstrap";
import { AdminContext } from "contexts/AdminContext";
const AdminNavbar = ({ brandText,username }) => {
  const history = useHistory();
  const { collapse, toggle } = useContext(AdminContext)
  return (
    <>
      <Navbar className="navbar-top navbar-dark text-white "  expand="md" id="navbar-main">
        {collapse ? (<MenuUnfoldOutlined style={{ fontSize: 18, fontWeight: 'bold' }} className='mr-2 ml-4' onClick={toggle}>

        </MenuUnfoldOutlined>) : (
            <MenuFoldOutlined style={{ fontSize: 18, fontWeight: 'bold' }} className='mr-2 ml-4' onClick={toggle}></MenuFoldOutlined>
          )}
          <div
            className="h4 mb-0 text-white text-uppercase  d-lg-inline-block"
           
          >
            {brandText}
          </div>
          <Nav className="align-items-right ml-auto mr-3">
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                 
                  <Media className="ml-2  d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold text-white">
                    <UserOutlined
                      style={{ fontSize: 18, fontWeight: "bold" }}
                      className="mr-2 ml-4"
                     
                    ></UserOutlined>
                    {username}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem href="#pablo" onClick={e => {
                  localStorage.removeItem('token');
                  history.push("/auth/login");
                }}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
      </Navbar>
    </>
  )
}


export default AdminNavbar;
