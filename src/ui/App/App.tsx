import 'bootstrap/dist/css/bootstrap.min.css';
import {ContextProvider} from "../../core/StateContext";
import * as React from 'react';
import {Layout} from "../Components/Layout";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Routes} from "../../constants/routes";

function App() {
  return (
    <ContextProvider>
        <BrowserRouter>
            <Switch>
                <Layout>
                    {Routes.map((el, idx) => (
                        <Route path={el.path} key={idx} component={el.page} exact/>
                    ))}
                </Layout>
            </Switch>
        </BrowserRouter>
  </ContextProvider>
  );
}

export default App;
