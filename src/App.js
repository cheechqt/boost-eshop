import { Route, Routes } from "react-router-dom";

import { Header, Footer } from "./components";
import { Home, Contact } from "./pages";

import "./App.scss";

function App() {
  return (
    // <div style={{ background: "black", height: "100vh" }}>
    //   <h1>Hello World!!!</h1>
    // </div>
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
