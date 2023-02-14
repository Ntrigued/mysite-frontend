import React, {useEffect, useMemo, useState} from 'react';
import InfiniteList from "./InfiniteList";
import AbstractAdapter from "./Adapters/AbstractAdapter";
import DummyAdapter from "./Adapters/DummyAdapter";
import HNAdapter from "./Adapters/HNAdapter";
//import './App.css';


function SiteReaderContainer(props: any) {
    const [adapter_name, setAdapterName] = useState("Hacker News");
    const[list_items, setListItems] = useState([]);
    const [detail_view, setDetailView] = useState("");

    const adapter = useMemo(() => {
        if(adapter_name == 'Dummy') return new DummyAdapter(setDetailView);
        if(adapter_name == 'Hacker News') return new HNAdapter(setDetailView);
        else return new HNAdapter();
    }, [adapter_name]);
    useEffect(() => {
        console.log('getting initial for ', adapter);
        if(!adapter.initial_items_mutex) {
            adapter.getInitial().then(initial_items => {
                adapter.getDetailView(initial_items[0]['id'])
                    .then((detail_view) => setDetailView(detail_view));
                console.log('initial items: ', initial_items);
                setListItems(initial_items);
            });
        }
    }, [adapter]);

    return (
        <div className={'flex flex-col h-full w-full '}>
            <div className={'flex w-full h-full'}>
                <div className={'flex h-full w-1/3'}>
                    <InfiniteList adapter={ adapter } initial_items={list_items} setDetailView={setDetailView} />
                </div>
                <div className={'flex h-full w-2/3'} >
                    { detail_view }
                </div>
            </div>
            <div className={' absolute bottom-0 right-[7.5vw] md:w-[20vw] h-[5%] bg-slate-500 rounded-tr-lg'}>
                <div className={'flex h-full w-full justify-around'}>
                    <button onClick={() => setAdapterName('Hacker News')}
                            className={'flex grow-1 h-full align-center items-center'}>Hacker News</button>
                    <button className={'flex grow-1 h-full align-middle items-center cursor-not-allowed'}
                        disabled onClick={() => setAdapterName('Reddit')}>Reddit (Coming Soon)</button>
                </div>
            </div>
        </div>
    );
}

export default SiteReaderContainer;
