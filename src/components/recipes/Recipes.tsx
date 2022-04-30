import { useContext } from "react";
import { Navigate } from "react-router-dom";
import "./recipes.css";
import { recipesContext } from "../../context/RecipesContext";
import { modalContext } from "../../context/ModalContext";
import ModalOutput from "../landing/components/components/ModalOutput";

const Recipes = () => {
    const { modalIsOpen, openModal } = useContext(modalContext);
    const { recipes } = useContext(recipesContext);
    return (
        <div className="recipes__container">
            {modalIsOpen && <ModalOutput />}
            {recipes.length ? (
                recipes.map((recipe) => {
                    const id = recipe._id;
                    return (
                        <div
                            onClick={() => {
                                openModal("recipe-details", id);
                            }}
                            className="recipe__box"
                            key={id}
                        >
                            <div>
                                {recipe.cals} <span>calories</span>
                            </div>
                            <div>{recipe.recipeTitle}</div>
                        </div>
                    );
                })
            ) : (
                <Navigate to="/" />
            )}
        </div>
    );
};

export default Recipes;
