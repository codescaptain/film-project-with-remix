import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Film, getFilmById } from "~/api/films";
import invariant from "tiny-invariant"
import { Outlet, useLoaderData } from "@remix-run/react";
import FilmBanner from "~/components/FilmBanner";
import CharacterList from "~/components/CharacterList";

// SERVER SIDE
export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.filmId, 'expected params.filmId');
  
    const film = await getFilmById(params.filmId);

    console.log('fetching film... -->', film.title);
    
  
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
        <FilmBanner film={film}/>
        <div className="p-10">
            <p>{film.description}</p>
            <div className="flex py-5 space-x-5">
             <CharacterList characters= {film.characters} />

             <div className="flex-1">
                <Outlet />
             </div>
            </div>
        </div>
        
    </div>
    )
}