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
            <div className={'flex h-full'}>
                <input id={'item_id_field'} className={'w-[75%] border-4'} type={'text'} placeholder={'Enter item ID'}
                       onKeyDown={(e) => {if(e.key == 'Enter') loadItemFromIdField(adapter, setInfoForDetailView)}}>
                </input>
                <button className={'w-[25%] text-center bg-cyan-500 hover:bg-cyan-400'}
                        onClick={() => loadItemFromIdField(adapter, setInfoForDetailView)}>
                    Load
                </button>
            </div>
            {/*
                <div className={'flex min-h-[50%] h-[50%] w-full justify-around'}>
                    <button className={'flex h-full align-middle items-center'}
                            onClick={() => setAdapterName('Hacker News')}
                    >Hacker News</button>
                    <button className={'flex h-full align-middle items-center cursor-not-allowed'}
                            onClick={() => setAdapterName('Reddit')} disabled>Reddit (Coming Soon)</button>
                </div>
            */}
        </>
    );
}

export default BottomMenu;