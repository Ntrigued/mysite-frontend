import React, {Dispatch, SetStateAction} from 'react';
import ListItem from "../ListItem";

export default abstract class AbstractAdapter {
    // Don't call getInitial while its running, a problem thanks to double-rendering
    initial_items_mutex: Boolean = false;
    setInfoForDetailView: Dispatch<SetStateAction<any>>

    protected constructor(setInfoForDetailView: Dispatch<SetStateAction<any>>) {
        this.setInfoForDetailView = setInfoForDetailView;
    }

    abstract getCommentById(id: Number | string): Promise<JSX.Element>;
    abstract getComments(item_id: Array<Number | string>): Promise<Array<any>>;
    abstract getDetailInfo(item_id: Number | string): Promise<any>;
    abstract getDetailView(item_info: any): JSX.Element;
    abstract getInitial(): Promise<string[]>;
    abstract getNextBatch(): Promise<JSX.Element[]>;
    abstract getNextN(N: Number, last_id: Number | string): Promise<JSX.Element[]>;
    abstract getItemTitle(item_id: Number | string): Promise<string>;
    abstract tryForNextNItems(N: Number): Promise<JSX.Element[]>;
    abstract updateDetailView(key: Number | string): Promise<never>;
}

