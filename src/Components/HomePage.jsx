import {useEffect, useState} from "react";

const getAllPagesInfo = async () =>
{
    const request_url = process.env.REACT_APP_BASE_API_URL + 'pages/'
    let data = await fetch(request_url).then((data) => data.json());
    console.log(data.items, typeof data.items);
    return data.items;
}


const HomePage = (props) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        getAllPagesInfo().then((data) => setPages(data));
    });

    return (
        <div>
            <h1>Home Page</h1>
            <div>{
                pages.map((page, i) =>
                <h2>{page.title}</h2>
                )
            }</div>
        </div>
    );
}

export default HomePage;