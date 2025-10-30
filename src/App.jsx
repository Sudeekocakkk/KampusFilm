import { useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { tvReducer, initialState } from "./reducers/tvReducer";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import "./App.css";

export default function App(){
  const [state, dispatch] = useReducer(tvReducer, initialState);

  // watchlist'i kalıcı yapmak istersen:
  useEffect(()=>{
    const saved = localStorage.getItem("kampusfilm:watchlist");
    if (saved) dispatch({ type: "SET_WATCHLIST", payload: JSON.parse(saved) });
  }, []);
  useEffect(()=>{
    localStorage.setItem("kampusfilm:watchlist", JSON.stringify(state.watchlist));
  }, [state.watchlist]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home state={state} dispatch={dispatch} />} />
        <Route path="/show/:id" element={<ShowDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
