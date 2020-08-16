import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppFooter,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";

import navigation from "../../_nav";
import routes from "../../routes";

const DefaultFooter = React.lazy(() => import("./DefaultFooter"));

class DefaultLayout extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  componentDidMount() {
    if (!JSON.parse(window.localStorage.getItem("isLogin"))) {
      this.props.history.push("/login");
    }
  }
  render() {
    let user = window.localStorage.getItem("currentUser");
    user = JSON.parse(user);
    return (
      <div className="app">
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader>
              <img
                src={require("./avatar.png")}
                style={{ width: 150, height: 150, marginBottom: 10 }}
                alt=""
              />
              <br />
              <strong>Hello, {user.fullName}</strong>
              <br />
              {user.email}
              <hr style={{ backgroundColor: "#fff" }} />
            </AppSidebarHeader>
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
