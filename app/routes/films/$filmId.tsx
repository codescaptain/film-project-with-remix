import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Film, getFilmById } from "~/api/films";
import invariant from "tiny-invariant"
import { useLoaderData } from "@remix-run/react";

// SERVER SIDE
export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.filmId, 'expected params.filmId');
  
    const film = await getFilmById(params.filmId);
  
    return film;
  };

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Films | Studio Codescaptain",
    viewport: "width=device-width,initial-scale=1",
    description: 'A description'
  });


export default function Film(){
    const film = useLoaderData<Film>();
    
    return (
    <div>
        {film.title}
    </div>)
}