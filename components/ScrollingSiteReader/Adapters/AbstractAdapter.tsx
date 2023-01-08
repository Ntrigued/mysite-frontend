import React, {Dispatch, SetStateAction, useState} from 'react';

export default class AbstractAdapter {
    setDetailView: Dispatch<SetStateAction<any>>| undefined
    
    setDetailViewSetter(setDetailView: Dispatch<SetStateAction<any>>) {
        this.setDetailView = setDetailView;
    }
    
    async getInitialItems(): Promise<JSX.Element[]> { throw new Error("Not Implemented"); }
    async getNextBatch(): Promise<JSX.Element[]> { throw new Error("Not Implemented"); } //Let the adapter decide how many items to get
    async tryForNextNItems(N: Number): Promise<JSX.Element[]> { throw new Error("Not Implemented"); } // Load N items
    async getNextN(N: Number, last_id: Number | string): Promise<JSX.Element[]> { throw new Error("Not Implemented"); } // get up-to N new items, that should appear higher than an item IDed by last_id
    async getDetailView(item_id: Number | string): Promise<JSX.Element> { throw new Error("Not Implemented"); }
    async updateDetailView(key: Number | string): Promise<never> { throw new Error("Not Implemented"); }
    async getCommentById(id: Number | string): Promise<JSX.Element> { throw new Error('Not Implemented'); }
    async getComments(item_id: Array<Number | string>): Promise<Array<any>> { throw new Error('Not Implemented'); }

    buildListItem(data: any): JSX.Element {
        return (
            <div className={'cursor-pointer flex w-[100%] ' +
                'bg-gradient-to-b from-slate-200 to-white hover:bg-gradient-to-t hover:from-slate-300'}
                 onClick={ data['onClick'] } key={data['key']}>
                {data['inner_html']}
            </div>
        );

    }
}
