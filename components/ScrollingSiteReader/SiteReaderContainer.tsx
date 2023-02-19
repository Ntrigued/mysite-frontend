import React, {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';
import InfiniteList from "./InfiniteList";
import AbstractAdapter from "./Adapters/AbstractAdapter";
import DummyAdapter from "./Adapters/DummyAdapter";
import HNAdapter from "./Adapters/HNAdapter";
import BottomMenu from "./BottomMenu";


function SiteReaderContainer(props: any) {
    const [adapter_name, setAdapterName] = useState("Hacker News");
    const[list_items, setListItems] = useState([]);
    const [detail_item_info, setInfoForDetailView] = useState(null);
    const adapter = useMemo(() => {
        //if(adapter_name == 'Dummy') return new DummyAdapter(setInfoForDetailView);
        if(adapter_name == 'Hacker News') return new HNAdapter(setInfoForDetailView);
        else return new HNAdapter(setInfoForDetailView);
    }, [adapter_name]);

    useEffect(() => {
        if(!adapter.initial_items_mutex) {
            adapter.getInitial().then((initial_items) => {
                adapter.getDetailInfo(initial_items[0]['id'])
                    .then((detail_info) => setInfoForDetailView(detail_info))
                    .catch((err) => console.log('Error loading detail info: ', err));
                setListItems(initial_items);
            });
        }
    }, [adapter]);

    const detail_view = adapter.getDetailView(detail_item_info);
    return (
        <div className={'flex flex-col h-full w-full'}>
            <div className={'flex flex-col md:flex-row w-full h-full pt-[2.5vh]'}>
                <div className={'flex h-[50%] md:h-full w-full md:w-1/3'}>
                    <InfiniteList adapter={ adapter } initial_items={list_items} />
                </div>
                <div className={'flex h-[50%] w-full md:h-full md:w-2/3'} >
                    { detail_view }
                </div>
            </div>
            <div className={'flex flex-col absolute bottom-0 right-[7.5vw] md:w-[20vw] h-[10%] bg-slate-500 rounded-t-lg'}>
                <BottomMenu adapter={adapter}
                            setInfoForDetailView={setInfoForDetailView}
                            setAdapterName={setAdapterName}/>
            </div>
        </div>
    );
}

export default SiteReaderContainer;
