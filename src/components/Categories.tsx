import React from "react";

type CategoriesProps = {
  value: number,
  setValue: (i: number) => void
}

export const Categories: React.FC <CategoriesProps> = ({value, setValue}) => {
  
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return (<li className={value === i ? "active" : ""} key={i} onClick={()=>setValue(i)}>{category}</li>)
        })}
      </ul>
    </div>
  );
}
