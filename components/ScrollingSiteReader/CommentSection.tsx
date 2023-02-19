
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
    const comment_ids: Array<string | Number> = props.comment_ids ? props.comment_ids : [];
    const [comment_data, setCommentData] = useState<Array<any>>([]);
    const [opened_list, setCommentOpenedList] = useState<Array<Boolean>>([]);

    useEffect(() => {
        if(is_visible && comment_data.length == 0) {
            adapter.getComments(comment_ids).then((data: Array<any>) => {
                setCommentData(data);
                setCommentOpenedList(Array(data.length).fill(false));
            });
        }
    }, [props.is_visible]);

    let comment_components: JSX.Element[] = comment_data
        .filter((item) => 'comment' in item && item['comment'].trim().length > 0)
        .map((item: any, idx) => {
        let item_id = item['comment_id'];
        let comment = item['comment'];
        let username = item['username'];
        let datetime = item['datetime'];
        let like_count = item['like_count'];
        let child_ids: Array<string | Number> = item['children'];

        const maybe_hidden = opened_list[idx] ? '' : ' hidden ';
        const maybe_likes = like_count === null ? '' : 'Likes: ' + like_count;
        return (
            <div key={item_id} className={'flex flex-col bg-white pt-[3vh] pb-[1.5vh] ' +
                'bg-gradient-to-b from-transparent to-[#94a3b85c]'}>
                <div className={'flex flex-col'}
                     onClick={() => {
                         let new_opened = [...opened_list];
                         new_opened[idx] = !new_opened[idx];
                         setCommentOpenedList(new_opened);
                     }}>
                    <div className={'flex flex-row justify-start ml-[2.5%] min-w-[15%] font-bold'}>
                        {username}</div>
                    <div className={' flex flex-col justify-start py-[1vh] pl-[1.25%]'}
                        dangerouslySetInnerHTML={{__html: comment}}>
                    </div>
                    <div className={'flex flex-row items-center justify-items-center w-full'}>
                        <div className={'flex flex-row justify-start ml-[2.5%] min-w-[15%] text-sm'}>
                            {datetime}</div>
                        <div className={'flex flex-row justify-start ml-[2.5%] min-w-[15%] text-sm'}>
                            {maybe_likes}</div>
                        <div className={'flex flex-row grow justify-end mr-[2.5%] italic text-sm'}>
                            ({child_ids.length} children)</div>
                    </div>
                </div>
                <div className={'' + maybe_hidden}>
                    <CommentSection key={item_id} adapter={adapter}
                                    comment_ids={child_ids} is_visible={opened_list[idx]} />
                </div>
            </div>);
    });
    const maybe_hidden = is_visible ? '' : ' hidden ';
    return (
        <div className={'bg-slate-300 cursor-pointer flex flex-col w-[100%] pl-[2.5%]' + maybe_hidden}>
            {comment_components}
        </div>
    );
}
