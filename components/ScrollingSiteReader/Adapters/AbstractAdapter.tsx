import React, {Dispatch, SetStateAction, useState} from 'react';

export default abstract class AbstractAdapter {
    // Don't call getInitial while its running, a problem thanks to double-rendering
    initial_items_mutex: Boolean = false;
    setInfoForDetailView: Dispatch<SetStateAction<any>>

    protected constructor(setInfoForDetailView: Dispatch<SetStateAction<any>>) {
        this.setInfoForDetailView = setInfoForDetailView;
    }
    
    async getInitial(): Promise<JSX.Element[]> { throw new Error("Not Implemented"); }
    async getNextBatch(): Promise<JSX.Element[]> { throw new Error("Not Implemented"); } //Let the adapter decide how many items to get
    async tryForNextNItems(N: Number): Promise<JSX.Element[]> { throw new Error("Not Implemented"); } // Load N items
    async getNextN(N: Number, last_id: Number | string): Promise<JSX.Element[]> { throw new Error("Not Implemented"); } // get up-to N new items, that should appear higher than an item IDed by last_id
    async getDetailInfo(item_id: Number | string): Promise<any> { throw new Error("Not Implemented"); }
    getDetailView(item_info: any): JSX.Element { throw new Error("Not Implemented"); }
    async updateDetailView(key: Number | string): Promise<never> { throw new Error("Not Implemented"); }
    async getCommentById(id: Number | string): Promise<JSX.Element> { throw new Error('Not Implemented'); }
    async getComments(item_id: Array<Number | string>): Promise<Array<any>> { throw new Error('Not Implemented'); }

    buildListItem(data: any): JSX.Element {
        return (
            <div className={'cursor-pointer flex w-full pt-[1vh] pb-[0.5vh] ' +
                'bg-gradient-to-b from-slate-200 to-white hover:bg-gradient-to-t hover:from-slate-300'}
                 onClick={ () => this.getDetailInfo(data['id'])
                     .then((detail_info) => this.setInfoForDetailView(detail_info)) } key={data['key']}>
                <div className={'flex w-full'}>
                    <div className={'flex justify-center w-[10%]'}>
                        <p className={'font-bold text-blue-600/75'}>{data['key']}</p>
                    </div>
                    <div className={'flex justify-left w-[90%]'}>
                        <p className={'font-bold text-slate-600/90'}>{data['title']}</p>
                    </div>
                </div>
            </div>
        );

    }
}
