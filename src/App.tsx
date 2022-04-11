import { Routes, Route } from "react-router-dom";
import "./App.css";
import Recipes from "./components/recipes/Recipes";
import SList from "./components/s-list/SList";
import Header from "./components/header/Header";
import Landing from "./components/landing/Landing";
import SignIn from "./components/signin/SignIn";

import UserContextProvider from "./context/UserContext";
import CreateSListContextProvider from "./context/CreateSListContext";

function App() {
    return (
        <UserContextProvider>
            <CreateSListContextProvider>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="auth" element={<SignIn />} />
                        <Route path="recipes" element={<Recipes />} />
                        <Route path="shopping-list" element={<SList />} />
                    </Routes>
                </div>
            </CreateSListContextProvider>
        </UserContextProvider>
    );
}

export default App;
