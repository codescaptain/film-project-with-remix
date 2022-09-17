
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, Link, useCatch, useLoaderData } from "@remix-run/react";
import { Film, getFilms } from "~/api/films";

// SERVER SIDE
export const loader: LoaderFunction = async ({request}) => {
    const url = new URL(request.url)
    const title = url.searchParams.get('title')

    
    return getFilms(title);
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
        
        <Form reloadDocument method="get" className="py-5">
            <label className="font-bold">
                Search {' '}
                <input 
                    type="text"
                    name="title"
                    placeholder="Type a title.."
                    className="border-2 rounded py-2 px-3" 
                />
             </label>

             <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"> 
                Search 
             </button>
        </Form>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {films.map((film) => (
          <Link
          title={film.title}
          key={film.id}
          to={film.id}
          className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer"
          prefetch="intent"
        >
          <div>{film.title}</div>
          <img src={film.image} alt={film.title} />
        </Link>
            ))}
        </div>
    </div>
    )
}

export function CatchBoundary(){
    const caught = useCatch();
    

    if( caught.status === 404){

        return (
            <div className="mb-3">
                <div className="text-3xl mb-2">Details</div>
                <div className="p-4 rounded shadow-lg border bg-rose-200 border-rose-600">
                    <div className="text-gray-700 font-bold text-xl mb-2">
                        {caught.statusText}
                    </div>
                    <p>{caught.status} {caught.statusText}</p>
                </div>
            </div>
        );
    }

    throw new Error('Unknown Error')

}