import React, { useState } from 'react';
import InfiniteList from "./InfiniteList";
import AbstractAdapter from "./Adapters/AbstractAdapter";
//import './App.css';


function SiteContainer(props: any) {
    const [detail_view, setDetailView] = useState("");
    props.adapter.setDetailViewSetter(setDetailView);

    return (
        <div className={'flex '}>
            <div className={'w-[33.3vw] '}>
                <InfiniteList adapter={ props.adapter } />
            </div>
            <div className={'h-screen w-[66.6vw]'} >
                { detail_view }
            </div>
        </div>
    );
}

export default SiteContainer;
