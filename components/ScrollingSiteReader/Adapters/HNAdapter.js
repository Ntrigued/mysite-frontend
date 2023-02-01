import AbstractAdapter  from "./AbstractAdapter";
import React from "react";
import CommentSection from "../CommentSection";
import {comment} from "postcss";

class HNAdapter extends AbstractAdapter {
  constructor(setDetailView) {
    super();
    this.setDetailView = setDetailView;
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
    const inner_html = (
        <div className={'flex w-full'}>
          <div className={'flex justify-center w-1/10'}>
            <p className={'font-bold text-blue-600/75'}>{this.items_created }.</p>
          </div>
          <div className={'flex justify-left w-9/10'}>
            <p className={'font-bold text-slate-600/90'}>{item_info.title}.</p>
          </div>
        </div>
    );
    let data = {
      'id': story_id,
      'onClick': () => this.getDetailView(story_id).then((detail_view) => this.setDetailView(detail_view)),
      'key': this.items_created,
      'inner_html': inner_html,
    }

    return data;
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
    console.log('this.items_created: ', this.items_created);
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

    const comment_date = new Date(comment_info['time']);
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

  async getDetailView(item_id) {
    const item_info = await this.getBasicItemInfo(item_id);

    let title = item_info['title'];
    let children = item_info['kids'];
    if ('url' in item_info) title = <a href={item_info['url']} target="_blank" rel="noreferrer"> {title} </a>;
    return (
        <div className={'flex flex-col w-full h-full overflow-y-scroll'}>
          <div className={'pl-[5%] flex flex-wrap'}>
            <h2 className={'text-2xl'}>{title}</h2>
          </div>
          <div className={'flex flex-col flex-wrap'}>
            <CommentSection adapter={this} key={item_id} comment_ids={children} is_visible={true} />
          </div>
        </div>
    );
  }
}

export default HNAdapter;
