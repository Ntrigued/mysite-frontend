import React, { useMemo, useState } from 'react';
import InfiniteList from "./InfiniteList";
import AbstractAdapter from "./Adapters/AbstractAdapter";
import DummyAdapter from "./Adapters/DummyAdapter";
import HNAdapter from "./Adapters/HNAdapter";
//import './App.css';


function SiteContainer(props: any) {
    const [adapter_name, setAdapterName] = useState("Hacker News");
    const [detail_view, setDetailView] = useState("");

    const adapter = useMemo(() => {
        if(adapter_name == 'Dummy') return new DummyAdapter(setDetailView);
        if(adapter_name == 'Hacker News') return new HNAdapter(setDetailView);
        else return new HNAdapter();
    }, [adapter_name]);
    console.log(adapter_name, adapter);
    return (
        <div className={'flex flex-col h-full w-full '}>
            <div className={'flex w-full h-[5%] bg-slate-500'}>
                <button onClick={() => setAdapterName('Dummy')}
                    className={'flex h-full justify-center items-center px-[2.5%]'}>Dummy</button>
                <button onClick={() => setAdapterName('Hacker News')}
                    className={'flex h-full justify-center items-center px-[2.5%]'}>Hacker News</button>
            </div>
            <div className={'flex w-full h-[95%]'}>
                <div className={'flex h-full w-1/3'}>
                    <InfiniteList adapter={ adapter } setDetailView={setDetailView} />
                </div>
                <div className={'flex h-full w-2/3'} >
                    { detail_view }
                </div>
            </div>
        </div>
    );
}

export default SiteContainer;
