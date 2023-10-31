import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsPage from "../Pages/ProductsPage";
import {ContextProvider} from "../../core/StateContext";

function App() {
  return (
    <ContextProvider>
        <ProductsPage/>
    </ContextProvider>
  );
}

export default App;
