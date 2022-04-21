import { useContext } from "react";
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
            {recipes.map((recipe) => {
                return (
                    <div
                        onClick={() => {
                            openModal("recipe-details", recipe.id);
                        }}
                        className="recipe__box"
                        key={recipe.id}
                    >
                        <div>
                            {recipe.cals} <span>calories</span>
                        </div>
                        <div>{recipe.recipeTitle}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Recipes;
