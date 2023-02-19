import React, {Dispatch, SetStateAction} from "react";
import AbstractAdapter from "./Adapters/AbstractAdapter";

const loadItemFromIdField = (adapter: AbstractAdapter,
                             setInfoForDetailView: Dispatch<SetStateAction<any>>) => {
    try {
        const item_id = document.getElementById('item_id_field')?.value;
        if(item_id != null && item_id.length > 0) {
            adapter.getDetailInfo(item_id)
                .then((detail_info) => setInfoForDetailView(detail_info))
                .catch((err) => console.log('Error loading detail info: ', err));
        }
    } catch(error) {
        console.error('error: ', error);
    }
}

function BottomMenu(props: any) {
    const adapter = props.adapter;
    const setInfoForDetailView = props.setInfoForDetailView;
    const setAdapterName = props.setAdapterName;

    return (
        <>
            <div className={'flex h-[50%]'}>
                <input id={'item_id_field'} className={'w-[75%] border-4'} type={'text'} placeholder={'Enter item ID'}
                       onKeyDown={(e) => {if(e.key == 'Enter') loadItemFromIdField(adapter, setInfoForDetailView)}}>
                </input>
                <button className={'w-[25%] bg-cyan-500 hover:bg-cyan-400'}
                        onClick={() => loadItemFromIdField(adapter, setInfoForDetailView)}>
                    Load
                </button>
            </div>
            <div className={'flex h-[50%] w-full justify-around'}>
                <button onClick={() => setAdapterName('Hacker News')}
                        className={'flex grow-1 h-full align-center items-center'}>Hacker News</button>
                <button className={'flex grow-1 h-full align-middle items-center cursor-not-allowed'}
                        disabled onClick={() => setAdapterName('Reddit')}>Reddit (Coming Soon)</button>
            </div>
        </>
    );
}

export default BottomMenu;