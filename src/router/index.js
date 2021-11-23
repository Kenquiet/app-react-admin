import React from "react";
import { HashRouter, Route,  Switch, Redirect } from "react-router-dom";
import {  } from "react-router"
import { connect } from 'react-redux'
import Login from "@/pages/login"
import { getUserInfo } from '@/store/actions';

const Router = ( props ) => {
  const { token } = props
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={ Login }></Route>
        <Route path="/" render={
          () => {
            if(!token) {
              return <Redirect to="/login"></Redirect>
            } else {
              // 走封装的路由位置页面
              // getUserInfo(token).then(() => <Layout />);
            }
          }
        }></Route>
      </Switch>
    </HashRouter>
  )
}

// 将 state 映射到props上，getUserInfo 映射成 Action
export default connect((state) => state.user, { getUserInfo })(Router)