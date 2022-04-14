import { Routes, Route } from "react-router-dom";
import "./App.css";
import Recipes from "./components/recipes/Recipes";
import SList from "./components/s-list/SList";
import Header from "./components/header/Header";
import Landing from "./components/landing/Landing";
import SignIn from "./components/signin/SignIn";

import UserContextProvider from "./context/UserContext";
import CreateSListContextProvider from "./context/CreateSListContext";
import CreateRecipeContextProvider from "./context/CreateRecipeContext";
import ModalContextProvider from "./context/ModalContext";
import ShoppingListsContextProvider from "./context/ShoppingListsContext";

function App() {
    return (
        <UserContextProvider>
            <CreateSListContextProvider>
                <CreateRecipeContextProvider>
                    <ModalContextProvider>
                        <ShoppingListsContextProvider>
                            <div className="App">
                                <Header />
                                <Routes>
                                    <Route path="/" element={<Landing />} />
                                    <Route path="auth" element={<SignIn />} />
                                    <Route
                                        path="recipes"
                                        element={<Recipes />}
                                    />
                                    <Route
                                        path="shopping-list"
                                        element={<SList />}
                                    />
                                </Routes>
                            </div>
                        </ShoppingListsContextProvider>
                    </ModalContextProvider>
                </CreateRecipeContextProvider>
            </CreateSListContextProvider>
        </UserContextProvider>
    );
}

export default App;
