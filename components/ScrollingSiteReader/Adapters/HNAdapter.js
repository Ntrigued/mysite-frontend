import AbstractAdapter  from "./AbstractAdapter";
import React from "react";
import CommentSection from "../CommentSection";
import Image from "next/image";
import url_link_img from 'public/url_link.jpg';

class HNAdapter extends AbstractAdapter {
  constructor(setInfoForDetailView) {
    super(setInfoForDetailView);
    this.stories_processed = 0;
    this.items_created = 0;
    this.initial_items = [];
    this.reload_amount = 0.95;
    this.top_stories_endpoint = "https://hacker-news.firebaseio.com/v0/topstories.json";
    this.top_stories_ids = null;
    this.basic_item_info = {};
    this.basic_item_info_endpoint = "https://hacker-news.firebaseio.com/v0/item/";
  }

  async getBasicItemInfo(item_id) {
    const info = await fetch(this.basic_item_info_endpoint + item_id + ".json")
        .then(response => response.json());
    console.log('item_info for ' + item_id + ': ', info);
    this.basic_item_info[item_id] = info;
    return info;
  }

  async getTopStoriesIDs() {
    return fetch(this.top_stories_endpoint)
        .then(response => response.json());
  }

  async getNextItem() {
    if(this.top_stories_ids.length <= this.stories_processed) {
      // there aren't anymore stories, send the signal down to not update anything
      return Promise.reject('STORIES EXHAUSTED');
    }
    let story_id = this.top_stories_ids[this.stories_processed];
    this.stories_processed += 1;
    let item_info = await this.getBasicItemInfo(story_id);
    this.items_created += 1;
    item_info['id'] = story_id;
    item_info['key'] = this.items_created;

    return item_info;
  }

  async tryForNextNItems(N) {
    let row_promises = [];
    for(let i = 0; i < N; i++) {
      row_promises.push(this.getNextItem());
    }
    return Promise.allSettled(row_promises)
        .then((items) => {
          return items.filter((item) => item.status === 'fulfilled')
                       .map((item) => item.value)
                       .sort((a, b) => {
                         if(parseInt(a['key']) < parseInt(b['key'])) return -1;
                         return 1;
                       });
        });
  }

  async getInitial() {
    // Only get story IDs if we haven't yet, reset counter if necessary
    this.initial_items_mutex = true;
    this.items_created = 0;
    if(this.top_stories_ids == null) this.top_stories_ids = await this.getTopStoriesIDs();
    let initial_items = await this.tryForNextNItems(50);
    this.initial_items_mutex = false;
    return initial_items;
  }

  async getNextBatch() {
    return this.tryForNextNItems(5);
  }

  async getComment(item_id) {
    const comment_info = await fetch(this.basic_item_info_endpoint + item_id + ".json")
        .then(response => response.json());

    const comment_date = new Date(comment_info['time'] * 1000);
    const datetime = comment_date.toDateString() + ' ' +
        comment_date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const children = 'kids' in comment_info ? comment_info['kids'] : []; // HN skips key when there aren't kids

    return {
      'comment': comment_info['text'],
      'username': comment_info['by'],
      'comment_id': comment_info['id'],
      'like_count': null,
      'datetime': datetime,
      'children': children,
    }
  }

  async getComments(item_ids) {
    let comment_promises = item_ids.map((item_id) => this.getComment(item_id));
    return Promise.allSettled(comment_promises).then((settled_promises) => {
      return settled_promises.filter((prom) => prom.status === 'fulfilled')
          .map((item) => item.value);
    });
  }

  async getDetailInfo(item_id) {
    const item_info = await this.getBasicItemInfo(item_id);
    const item_date = new Date(item_info['time'] * 1000);
    const datetime = item_date.toDateString() + ' ' +
        item_date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    item_info['id'] = item_id;
    item_info['datetime'] = datetime;
    return item_info;
  }

  getDetailView(item_info) {
    if(item_info == null) return <></>;

    let title = item_info['title'];
    if ('url' in item_info) {
      title = <a href={item_info['url']} target="_blank" rel="noreferrer" className={'hover:underline'}>
        {title}
        <Image src={url_link_img}  alt={'link image'} className={'w-[0.75em] inline'}/>
      </a>;
    }
    let content = '';
    if('text' in item_info) content = <div className={'my-[2.5%]'}
                                           dangerouslySetInnerHTML={{__html: item_info['text']}}></div>;
    return (
        <div className={'flex flex-col w-full h-full overflow-y-scroll'}>
          <div className={'pl-[5%] flex flex-wrap'}>
            <h2 className={'text-2xl'}>{title}</h2>
            {content}
          </div>
          <div className={'flex flex-col flex-wrap'}>
            <CommentSection adapter={this} key={item_info['id']} comment_ids={item_info['kids']} is_visible={true} />
          </div>
        </div>
    );
  }
}

export default HNAdapter;

