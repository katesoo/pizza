import React, { useCallback } from "react";
import { useSelector } from "react-redux";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import Pizza from "../components/Pizza";
import { selectorFilter, setCategoryId } from "../redux/slices/filterSlice";
import { fetchPizzas, selectorPizza } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";
import Loader from "../components/Loader";

export function PizzaStore() {
  const dispatch = useAppDispatch();
  const { categoryId, sort, search } = useSelector(selectorFilter);
  const { items, status } = useSelector(selectorPizza);

  const array = Array(8).fill(1);

  const pizzas = items.map((pizza: any, i: number) => (
    <Pizza {...pizza} key={i}></Pizza>
  ));

  const setActiveCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  React.useEffect(() => {
    dispatch(fetchPizzas({ categoryId, sort, search }));
    window.scrollTo(0, 0);
  }, [categoryId, sort.property, search, sort.direct]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          setValue={setActiveCategory}
        ></Categories>
        <Sort></Sort>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading" ? (
          array.map((_, i) => <Loader key={i}></Loader>)
        ) : status === "error" ? (
          <div>
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению питсы не были найдены :(
              <br />
              Попробуйте повторить запрос позже
            </p>{" "}
          </div>
        ) : (
          pizzas
        )}
      </div>
    </div>
  );
}
