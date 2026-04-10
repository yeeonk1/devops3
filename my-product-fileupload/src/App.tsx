import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductWrite from "./components/ProductWrite";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/write" element={<ProductWrite />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
