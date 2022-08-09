import React from "react";
import styles from "./AvailableMeals.module.css";
import MealContext from "../../store/meal-context";

import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
  return (
    <MealContext.Consumer>
      {(ctx) => {
        return (
          <section>
            <Card className={styles.meals}>
              <ul>
                {ctx.meals.map((meal) => (
                  <MealItem
                    key={meal.id}
                    id={meal.id}
                    name={meal.name}
                    description={meal.description}
                    price={meal.price}
                  />
                ))}
              </ul>
            </Card>
          </section>
        );
      }}
    </MealContext.Consumer>
  );
};

export default AvailableMeals;
