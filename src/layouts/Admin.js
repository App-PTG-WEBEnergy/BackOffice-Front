import { Layout } from "antd";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { AdminContext } from "contexts/AdminContext";
import routes from "routes.js";
import "react-chat-widget/lib/styles.css";
import Chat from "components/chat/Chat";
import { Helmet } from "react-helmet";

class Admin extends React.Component {
  static contextType = AdminContext;
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  getRoutes = (routes) => {
    const data = [];
    const decodeRoutes = (routes, path) => {};
    routes.forEach((item, index) => {});
    routes.forEach((item, index) => {
      if (item.nodes)
        item.nodes.forEach((node, index) => {
          var n = { ...node };
          n.path = item.path + n.path;
          data.push(n);
        });
      else data.push(item);
    });
    decodeRoutes(routes);

    return data.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  getMRoutes = (routes) => {
    const data = [];
    const permiss = JSON.parse(localStorage.getItem("permisstiongroup"));
    var user = JSON.parse(localStorage.getItem("user"));
    routes.forEach((item, index) => {
      // if (item.nodes)
      //   item.nodes.forEach((node, index) => {
      //     // var n = { ...node };
      //     // n.path = item.path + n.path;
      //     // data.push(n);
      //   });
      // else {
      try {
        if (item.path === "/joinus") {
          if (item.nodes) {
            item.nodes.forEach((node, index) => {
              var n = { ...node };
              if (n.path === "/joinus") {
                if (
                  permiss["view_" + n.path.replace("/", "")] === "Y" ||
                  permiss["modify_" + n.path.replace("/", "")] === "Y" ||
                  permiss["approve_" + item.path.replace("/", "")] === "Y"
                ) {
                } else {
                  item.nodes.splice(index, 1);
                }
              } else if (
                permiss["view_" + n.path.replace("/", "")] === "Y" ||
                permiss["modify_" + n.path.replace("/", "")] === "Y"
              ) {
              }
              // else if(n.path === "/chat"){

              // }
              else {
                item.nodes.splice(index, 1);
              }
            });
            data.push(item);
          }
        } else if (
          permiss["view_" + item.path.replace("/", "")] === "Y" ||
          permiss["modify_" + item.path.replace("/", "")] === "Y" ||
          permiss["approve_" + item.path.replace("/", "")] === "Y"
        ) {
          data.push(item);
        }
      

      if (item.path === "/user-permission") {
        if (permiss["id"] === 1) {
          data.push(item);
        } else {
        }
      }
    } catch (error) {}
      //}
    });
    return data;
  };

  getBrandText = (path) => {
    console.log(path);
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        if (routes[i].nodes) {
          for (let j = 0; j < routes[i].nodes.length; j++) {
            if (
              this.props.location.pathname.indexOf(
                routes[i].layout + routes[i].path + routes[i].nodes[j].path
              ) !== -1
            ) {
              return routes[i].name + " / " + routes[i].nodes[j].name;
            }
          }
        }
        return routes[i].name;
      }
    }
    return "Brand";
  };

  getUser() {
    const check =
      localStorage.getItem("user") === undefined ||
      localStorage.getItem("user") === null;
    if (!check) {
      var user = JSON.parse(localStorage.getItem("user"));
      return user.firstName;
    }

    return "Username";
  }

  render() {
    const { collapse, toggle, getWindowDimensions } = this.context;
    const checkCollapse = () => {
      const size = getWindowDimensions();
      // alert(size.width)
      if (size.width <= 1000) {
        if (!collapse) {
          toggle();
        }
      }
    };
    return (
      <Layout>
        <Helmet>
          <title>
            PTG |{" "}
            {this.getBrandText(this.props.location.pathname).split("/")[0]}
          </title>
        </Helmet>
        <Sidebar
          routes={this.getMRoutes(routes)}
          logo={{
            logo_text: "PTG Back Office",
            innerLink: "/admin/home",
            imgSrc: require("assets/img/brand/logo.png"),
            imgAlt: "...",
          }}
        ></Sidebar>

        <Layout className="site-layout">
          <Chat></Chat>
          <div
            className="main-content"
            ref="mainContent"
            onClick={checkCollapse}
          >
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              username={this.getUser()}
            />
            <Switch>
              {this.getRoutes(routes)}
              <Redirect from="*" to="/admin/home" />
            </Switch>
            <Container fluid></Container>
          </div>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;
