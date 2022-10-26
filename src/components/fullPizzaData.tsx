import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const FullPizzaData: React.FC = () => {
  const { id } = useParams();
  const [pizzaData, setPizzaData] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get(
          `https://62f38e0eb81dba4a0135e14d.mockapi.io/pizzas/` + id
        );
        
        setPizzaData(data);
      } catch (err) {
        alert('Не удалось получить пиццу');
        navigate('/');
      }
    }
    getPizza();
  }, []);

  if (!pizzaData) {
    return <h2>Загрузка...</h2>;
  }

  return (
    <div className="container">
      <img src={pizzaData.imageUrl}></img>
      <h2>{pizzaData.title}</h2>
      <h4>{pizzaData.price} ₽</h4>
    </div>
  );
};
