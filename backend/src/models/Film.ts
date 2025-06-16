export interface Film {
  film_id: number;
  title: string;
  description: string | null;
  release_year: number | null;
  language_id: number;
  rental_duration: number;
  rental_rate: number;
  length: number | null;
  replacement_cost: number;
  rating: string | null;
}
