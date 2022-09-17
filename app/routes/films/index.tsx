
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Film, getFilms } from "~/api/films";

// SERVER SIDE
export const loader: LoaderFunction = async () => {
return getFilms();
}

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Films | Studio Codescaptain",
    viewport: "width=device-width,initial-scale=1",
    description: 'A description'
  });


// CLIENT SIDE
export default function FilmsIndex(){
    const films = useLoaderData<Film[]>();
    return (
    <div className="p-16 font-sans">
        <h1 className="text-6xl font-bold text-center">Studio Ghibli Films</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {films.map((film) => (
                <div key={film.title} className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer">
                    <div>{film.title}</div>
                    <img src={film.image} alt={film.title} />
                </div>
            ))}
        </div>
    </div>
    )
}