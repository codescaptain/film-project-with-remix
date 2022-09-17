
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
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