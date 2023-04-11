import React, {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';
import InfiniteList from "./InfiniteList";
import HNAdapter from "./Adapters/HNAdapter";
import BottomMenu from "./BottomMenu";


function SiteReaderContainer(props: any) {
    const [adapter_name, setAdapterName] = useState("Hacker News");
    const[list_item_ids, setListItemIds] = useState<string[] | Number[]>([]);
    const [detail_item_info, setInfoForDetailView] = useState(null);
    const adapter = useMemo(() => {
        //if(adapter_name == 'Dummy') return new DummyAdapter(setInfoForDetailView);
        if(adapter_name == 'Hacker News') return new HNAdapter(setInfoForDetailView);
        else return new HNAdapter(setInfoForDetailView);
    }, [adapter_name]);

    useEffect(() => {
        if(!adapter.initial_items_mutex) {
            adapter.getInitial().then((initial_ids) => {
                adapter.getDetailInfo(initial_ids[0])
                    .then((detail_info) => setInfoForDetailView(detail_info))
                    .catch((err) => console.log('Error loading detail info: ', err));
                setListItemIds(initial_ids);
            });
        }
    }, [adapter]);

    const detail_view = adapter.getDetailView(detail_item_info);
    return (
        <div className={'flex flex-col h-full w-full'}>
            <div className={'flex flex-col md:flex-row w-full h-full'}>
                <div className={'flex h-[50%] md:h-full w-full md:w-1/3'}>
                    <InfiniteList adapter={adapter} initial_ids={list_item_ids} />
                </div>
                <div className={'flex h-[50%] w-full border-t-8 border-solid border-[#edeef1] ' +
                                'md:h-full md:w-2/3 md:border-0'} >
                    { detail_view }
                </div>
            </div>
            <div className={'flex flex-col grow fixed bottom-0 right-[7.5vw] md:w-[20vw] h-[6%] ' +
                'rounded-t-lg'}>
                <BottomMenu adapter={adapter}
                            setInfoForDetailView={setInfoForDetailView}
                            setAdapterName={setAdapterName}/>
            </div>
        </div>
    );
}

export default SiteReaderContainer;
