import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsPage from "../Pages/ProductsPage";
import {ContextProvider} from "../../core/StateContext";
import * as React from 'react';
import {Layout} from "../Components/Layout";

function App() {
  return (
    <ContextProvider>
        <Layout>
            <ProductsPage/>
        </Layout>
    </ContextProvider>
  );
}

export default App;
