
/*
 On load, displays top-level comments. Children are loaded on expansion
 */
import React, {useRef, useEffect, useState, useMemo, RefObject} from "react";
import AbstractAdapter from './Adapters/AbstractAdapter';
import {adapter} from "next/dist/server/web/adapter";
import {Comment} from "postcss";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;


export default function CommentSection(props: any) {
    /*
       A nest-able comment "section", each component contains a list of divs, where each div contains a comment and then
       another CommentSection.

       All but the top-level are originally hidden, and comments are loaded the first time that they are un-hidden
     */
    const adapter = props.adapter;
    const is_visible: Boolean = props.is_visible == null ? false : props.is_visible;
    const comment_ids: Array<string | Number> = props.comment_ids;
    const [comment_data, setCommentData] = useState<Array<any>>([]);
    const [opened_list, setCommentOpenedList] = useState<Array<Boolean>>([]);

    useEffect(() => {
        console.log('Maybe getting comments', is_visible, comment_data, adapter);
        if(is_visible && comment_data.length == 0) {
            adapter.getComments(comment_ids).then((data: Array<any>) => {
                console.log('getting comments');
                setCommentData(data);
                setCommentOpenedList(Array(data.length).fill(false));
            });
        }
    }, [props.is_visible]);

    let comment_components: JSX.Element[] = comment_data.map((item: any, idx) => {
        console.log('item: ', item, ' children visible: ', opened_list[idx]);
        let item_id = item['comment_id'];
        let comment = item['comment'];
        let datetime = item['datetime'];
        let like_count = item['like_count'];
        let child_ids: Array<string | Number> = item['children'];

        const maybe_hidden = opened_list[idx] ? '' : ' hidden ';
        return (
            <div key={item_id} className={'flex flex-col bg-white '}>
                <div className={'flex flex-col'}
                     onClick={() => {
                         console.log('updating opened_list for ', idx);
                         let new_opened = [...opened_list];
                         new_opened[idx] = !new_opened[idx];
                         setCommentOpenedList(new_opened);
                     }}>
                    <div className={' flex flex-row items-center justify-start h-[5vh] pl-[1.25%]'}>
                        <p>{comment}</p>
                    </div>
                    <div className={'flex flex-row grow items-center justify-items-center w-[100%]'}>
                        <div className={'flex flex-row grow justify-start ml-[2.5%]'}>Likes: {like_count}</div>
                        <div className={'flex flex-row grow justify-start ml-[2.5%]'}>{datetime}</div>
                    </div>
                </div>
                <div className={'' + maybe_hidden}>
                    <CommentSection key={item_id} adapter={adapter}
                                    comment_ids={child_ids} is_visible={opened_list[idx]} />
                </div>
            </div>);
    });
    console.log('loaded CommentSection with key:', props.key, ' is_visible: ', is_visible);
    const maybe_hidden = is_visible ? '' : ' hidden ';
    return (
        <div className={'bg-slate-300 cursor-pointer flex flex-col w-[100%] pl-[2.5%]' + maybe_hidden}>
            {comment_components}
        </div>
    );
}
