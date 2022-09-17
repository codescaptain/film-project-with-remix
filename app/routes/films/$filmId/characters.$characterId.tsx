import { LoaderFunction } from "@remix-run/node";
import { FilmCharacter, getFilmCharacter } from "~/api/films";
import invariant from "tiny-invariant"
import { useCatch, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.characterId, 'expected params.characterId');
  
    const character = await getFilmCharacter(params.characterId);

    console.log('fetching film... -->', character.name);
    
    /* throw new Error('RANDOM ERROR! ') */

  
    return character;
  };


export default function Character(){
    const characterDetails = useLoaderData<FilmCharacter>()
    return (
        <div className="mb-3">
            <div className="text-3xl mb-2">Character Details</div>
            <div className="p-4 rounded shadow-lg border">
                <div className="text-gray-700 font-bold text-xl mb-2">
                    {characterDetails.name}
                </div>
                <ul className="py-2">
                    <li>Gender: {characterDetails.name}</li>
                    <li>Age: {characterDetails.age}</li>
                    <li>Eye Color: {characterDetails.eye_color}</li>
                    <li>Hair Color: {characterDetails.hair_color}</li>
                </ul>
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

export function ErrorBoundary({error}: any){
    return (
        <div className="mb-3">
            <div className="text-3xl mb-2">Details</div>
            <div className="p-4 rounded shadow-lg border bg-rose-200 border-rose-600">
                <div className="text-gray-700 font-bold text-xl mb-2">
                    uh oh.... Sorry someting went wrong!
                </div>
                <p>{error?.message}</p>
            </div>
        </div>
    )
}


