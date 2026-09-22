import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Pokedex } from "./pages/Pokedex/Pokedex";

function App(){
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Pokedex" element={<Pokedex/>}/>
        </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;