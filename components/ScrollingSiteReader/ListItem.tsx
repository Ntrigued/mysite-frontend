import React from "react";
import {useQuery} from "@tanstack/react-query";

function ListItem(props: any) {
    const adapter = props.adapter;
    //const data = props.data;
    const item_id = props.item_id;
    const idx = props.idx;
    let { isLoading, isError, data, error } = useQuery(['item_'+item_id],
         () => adapter.getItemTitle(item_id));

    const isComplete = !isLoading && !isError;
    if(isError) {
        return;
    } else {
        return (
            <div className={'cursor-pointer flex w-full pt-[1vh] pb-[0.5vh] ' +
                'bg-gradient-to-b from-slate-200 to-white hover:bg-gradient-to-t hover:from-slate-300'}
                 onClick={ () => adapter.getDetailInfo(item_id)
                     .then((detail_info: any) => adapter.setInfoForDetailView(detail_info)) }>
                <div className={'flex w-full'}>
                    {isLoading &&
                        <>
                            <div className={'flex justify-center w-[10%]'}>
                                <p className={'font-bold text-blue-600/75'}>{idx}</p>
                            </div>
                            <div className={'flex justify-left w-[90%]'}>
                                <p className={'text-slate-600/90'}>Loading Info...</p>
                            </div>
                        </>
                    }
                    {isComplete  &&
                        <>
                            <div className={'flex justify-center w-[10%]'}>
                                <p className={'font-bold text-blue-600/75'}>{idx}</p>
                            </div>
                            <div className={'flex justify-left w-[90%]'}>
                                <p className={'font-bold text-slate-600/90'}>{data}</p>
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }
}

export default ListItem;