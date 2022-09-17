import { useParams } from "@remix-run/react"

export default function DynamiChild(){
    const { someId } = useParams();

    return <div> I am dynamic {someId}</div>
}