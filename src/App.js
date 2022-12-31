import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import * as pages from "./components/pages";

import * as authAPI from "./lib/api/auth";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserRoute from "./auth/UserRoute";

import { useDispatch } from "react-redux";
import { setAuth } from "./modules/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = () => {
      authAPI
        .check()
        .then(res => {
          const newAuth = res.data;
          dispatch(setAuth(newAuth));
        })
        .catch(err => {
          console.log(err);
        });
    };
    checkAuth();
  }, [dispatch]);

  return (
    <Switch>
      <Route path="/web/main" component={pages.MainPage} />
      <Route path="/web/introduction" component={pages.EditableIntroductionPage} />
      <Route path="/web/rule" component={pages.RulePage} />
      <Route path="/web/board/:boardId" component={pages.BoardPage} />
      <Route path="/web/welfare" component={pages.WelfarePage} />
      <Route path="/web/petition/:petitionId" component={pages.PetitionViewPage} />
      <Route path="/web/petition" component={pages.PetitionBoardPage} />
      <Route path="/web/post/:postId" component={pages.PostViewPage} />

      {/* Admin */}
      <Route path="/web/admin/adminlogin" component={pages.AdminLoginPage} />
      <ProtectedRoute
        path="/web/admin/edit/introduction"
        component={pages.IntroEditPage}
        exact={true}
      />
      <ProtectedRoute path="/web/admin/edit/introduction/:id" component={pages.IntroEditPage} />
      <ProtectedRoute
        path="/web/admin/edit/rule"
        component={pages.RuleEditPage}
        exact={true}
      />
      <ProtectedRoute path="/web/admin/edit/rule/:id" component={pages.RuleEditPage} />
      <ProtectedRoute
        path="/web/admin/"
        component={pages.AdminPage}
        exact={true}
      />
      <ProtectedRoute
        path="/web/admin/edit/:boardId"
        component={pages.EditPage}
        exact={true}
      />

      <ProtectedRoute
        path="/web/admin/edit/:boardId/:postId"
        component={pages.EditPage}
      />


      <Route
        path="/web/auth/agreement/:login"
        component={pages.AuthAgreementPage}
      />
      <Route path="/web/auth/agreement" component={pages.AuthAgreementPage} />

      {/* User */}
      <UserRoute path="/web/user/studentFee" component={pages.StudentFeePage} />
      <UserRoute
        path="/web/user/petition/edit"
        component={pages.PetitionEditPage}
      />

      <Redirect to="/web/main" />
    </Switch>
  );
}

export default App;
