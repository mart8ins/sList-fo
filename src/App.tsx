import { Routes, Route } from "react-router-dom";
import "./App.css";
import Recipes from "./components/recipes/Recipes";
import SList from "./components/s-list/SList";
import Header from "./components/header/Header";
import Landing from "./components/landing/Landing";
import RouteGuard from "./components/utils/RouteGuard";

import UserContextProvider from "./context/UserContext";
import CreateSListContextProvider from "./context/CreateSListContext";
import CreateRecipeContextProvider from "./context/CreateRecipeContext";
import ModalContextProvider from "./context/ModalContext";
import ShoppingListsContextProvider from "./context/ShoppingListsContext";
import RecipesContextProvider from "./context/RecipesContext";

function App() {
    return (
        <UserContextProvider>
            <ShoppingListsContextProvider>
                <RecipesContextProvider>
                    <ModalContextProvider>
                        <CreateSListContextProvider>
                            <CreateRecipeContextProvider>
                                <div className="App">
                                    <Header />
                                    <Routes>
                                        <Route
                                            path="/"
                                            element={
                                                <RouteGuard>
                                                    <Landing />
                                                </RouteGuard>
                                            }
                                        />
                                        <Route
                                            path="recipes"
                                            element={
                                                <RouteGuard>
                                                    <Recipes />
                                                </RouteGuard>
                                            }
                                        />
                                        <Route
                                            path="shopping-list"
                                            element={
                                                <RouteGuard>
                                                    <SList />
                                                </RouteGuard>
                                            }
                                        />
                                    </Routes>
                                </div>
                            </CreateRecipeContextProvider>
                        </CreateSListContextProvider>
                    </ModalContextProvider>
                </RecipesContextProvider>
            </ShoppingListsContextProvider>
        </UserContextProvider>
    );
}

export default App;
