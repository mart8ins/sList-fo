import { Routes, Route } from "react-router-dom";
import "./App.css";
import Recipes from "./components/recipes/Recipes";
import SList from "./components/s-list/SList";
import Header from "./components/header/Header";
import Landing from "./components/landing/Landing";
import SignIn from "./components/signin/SignIn";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="auth" element={<SignIn />} />
                <Route path="recipes" element={<Recipes />} />
                <Route path="shopping-list" element={<SList />} />
            </Routes>
        </div>
    );
}

export default App;
