import { Request, Response } from "express";
import { getDbPool } from "../database/db";

//Lógica de getFilms
export const getFilms = async (_req: Request, res: Response) => {
  try {
    //Llamamos a getDbPool para comprobar conexion
    const db = getDbPool();
    const [rows] = await db.query(
      "SELECT film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating FROM film LIMIT 20"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener films:", error);
    res.status(500).json({ message: "Error al obtener films", error });
  }
};

//Lógica de de getAvailable
export const getAvailable = async (_req: Request, res: Response) => {
  //Llamamos a getDbPool para comprobar conexion
  const db = getDbPool();
  try {
    const [rows] = await db.query(`
      SELECT DISTINCT a.actor_id, a.first_name, a.last_name
      FROM actor a
      JOIN film_actor fa ON a.actor_id = fa.actor_id
      JOIN film f ON fa.film_id = f.film_id
      JOIN film_category fc ON f.film_id = fc.film_id
      JOIN category c ON fc.category_id = c.category_id
      WHERE c.name = 'Horror';
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al consultar datos", error });
  }
};
