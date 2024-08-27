import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form/Form";
import Auth from "./components/Auth/auth";
import Responses from "./components/Responses/responses";

function App() {
  const credentials = {
    userName: "sanju",
    passWord: "0000",
  };

  const [isAuth, setIsAuth] = useState(() => {
    const savedAuthState = sessionStorage.getItem("isAuth");
    return savedAuthState === "true" ? true : false;
  });

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("isAuth", isAuth);
  }, [isAuth]);

  return (
    <BrowserRouter>
      <div className="App">
        <h1 className="title">Welcome To Kodusware</h1>
        <Routes>
          <Route path="/" Component={Form} />
          <Route
            path="/admin"
            element={
              isAuth ? (
                <Responses />
              ) : (
                <Auth credentials={credentials} setIsAuth={setIsAuth} />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
