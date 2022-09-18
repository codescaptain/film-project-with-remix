export type CommentEntry = {
    name: string,
    message: string,
    filmId: string
} 


export async function getComments(filmId:string) {
   const response = await fetch(`http://localhost:3001/comments?filmId=${filmId}`);

    if(!response.ok){
        throw response
    }

    const comments:CommentEntry[] = await response.json();

    return comments;
}


export async function addComment(comment:CommentEntry) {
    const response = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(!response.ok){
        throw response
    }

    const new_comment:CommentEntry = await response.json();

    return new_comment;


    
}