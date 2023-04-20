import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { Container, formHelperTextClasses } from "@mui/material";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HeadAndTail from "./Pages/HeadAndTail";
import NotFound from "./Pages/NotFoundPage";

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    let localToken = localStorage.getItem('token');
    setToken(localToken)
  }, [])

  return (
    <div className="App">
      <Header token={token} />
      <Container>
        <Routes>
          {token ?
            (
              <>
                <Route path="/home" exact element={<Home />} />,
                <Route path="/about" exact element={<About />} />,
                <Route path="/head-and-tail" exact element={<HeadAndTail />} />
              </>
            )
            :
            (
              <>
                <Route path="/" exact element={<Login />} />,
                <Route path="/login" exact element={<Login />} />,
                <Route path="/register" exact element={<Register />} />,
                <Route path="/login/*" exact element={<NotFound />} />,
                <Route path="/register/*" exact element={<NotFound />} />
              </>
            )
          }
        </Routes>
      </Container>

    </div>
  );
}

export default App;
