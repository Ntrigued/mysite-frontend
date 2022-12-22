import {useEffect, useState} from "react";

const getAllPagesInfo = async () =>
{
    console.log(process.env);
    const request_url = process.env.BASE_API_URL as string;
    console.log(request_url);
    let data = await fetch(request_url).then((data) => data.json());
    console.log(data.items, typeof data.items);
    return data.items;
}


export default function HomePage(props: any) {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        getAllPagesInfo().then((data) => setPages(data));
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <div>{
                pages.map((page: any, i) =>
                    <h2 key={i}>{page.title}</h2>
                )
            }</div>
        </div>
    );
}