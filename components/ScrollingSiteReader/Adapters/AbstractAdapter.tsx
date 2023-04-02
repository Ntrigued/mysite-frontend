import React, {Dispatch, SetStateAction} from 'react';
import ListItem from "../ListItem";

export default abstract class AbstractAdapter {
    // Don't call getInitial while its running, a problem thanks to double-rendering
    initial_items_mutex: Boolean = false;
    setInfoForDetailView: Dispatch<SetStateAction<any>>

    protected constructor(setInfoForDetailView: Dispatch<SetStateAction<any>>) {
        this.setInfoForDetailView = setInfoForDetailView;
    }

    async getCommentById(id: Number | string): Promise<JSX.Element> { throw new Error('Not Implemented') }
    async getComments(item_id: Array<Number | string>): Promise<Array<any>> { throw new Error('Not Implemented') }
    async getDetailInfo(item_id: Number | string): Promise<any> { throw new Error("Not Implemented") }
    getDetailView(item_info: any): JSX.Element { throw new Error("Not Implemented") }
    async getInitial(): Promise<string[]> { throw new Error("Not Implemented") }
    async getNextBatch(): Promise<JSX.Element[]> { throw new Error("Not Implemented") } //Let the adapter decide how many items to get
    async getNextN(N: Number, last_id: Number | string): Promise<JSX.Element[]> { throw new Error("Not Implemented") } // get up-to N new items, that should appear higher than an item IDed by last_id
    async getItemTitle(item_id: Number | string): Promise<string> { throw new Error("Not Implemented") }
    async tryForNextNItems(N: Number): Promise<JSX.Element[]> { throw new Error("Not Implemented") } // Load N items
    async updateDetailView(key: Number | string): Promise<never> { throw new Error("Not Implemented") }
}
