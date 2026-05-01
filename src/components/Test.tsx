import { useState, useEffect } from "react";
import { supabase } from "../utils/supbase";

type Todo = {
  id: number | string;
  name: string;
};

export default function Test() {
  const [items, setItems] = useState<Todo[]>([]);

  useEffect(() => {
    async function getTest() {
      const { data, error } = await supabase.from("test").select("*");

      if (error) {
        console.error("Error fetching test data:", error);
        setItems([]);
        return;
      }

      console.log("supabase data:", data);
      setItems(data ?? []);
    }

    getTest();
  }, []);

  return (
    <div>
      {items.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}
