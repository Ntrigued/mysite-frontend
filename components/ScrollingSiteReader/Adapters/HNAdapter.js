import AbstractAdapter  from "./AbstractAdapter";
import React from "react";

class HNAdapter extends AbstractAdapter {
  constructor(setDetailView) {
    super();
    this.setDetailView = setDetailView;
    this.items_created = 0;
    this.reload_amount = 0.95;
    this.top_stories_endpoint = "https://hacker-news.firebaseio.com/v0/topstories.json";
    this.top_stories_ids = null;
    this.basic_item_info = {};
    this.basic_item_info_endpoint = "https://hacker-news.firebaseio.com/v0/item/";
  }

  async getBasicItemInfo(item_id) {
    const info = await fetch(this.basic_item_info_endpoint + item_id + ".json")
        .then(response =>response.json());
    this.basic_item_info[item_id] = info;
    return info;
  }

  async getTopStoriesIDs() {
    return fetch(this.top_stories_endpoint)
        .then(response => response.json());
  }

  async getNextItem() {
    let story_id = this.top_stories_ids.shift();
    if(story_id === undefined) {
      // there aren't anymore stories, send the signal down to not update anything
      return Promise.reject('STORIES EXHAUSTED');
    }

    let item_info = await this.getBasicItemInfo(story_id);
    this.items_created += 1;
    const inner_html = (
        <div className={'flex w-[100%]'}>
          <div className={'flex justify-center w-[10%]'}>
            <p className={'font-bold text-blue-600/75'}>{this.items_created}.</p>
          </div>
          <div className={'flex justify-left w-[90%]'}>
            <p className={'font-bold text-slate-600/90'}>{item_info.title}.</p>
          </div>
        </div>
    );
    let data = {
      'onClick': () => this.updateDetailView(item_info),
      'key': this.items_created,
      'inner_html': inner_html,
    }

    return this.buildListItem(data);
  }

  async tryForNextNItems(N) {
    let row_promises = [];
    for(let i = 0; i < N; i++) {
      row_promises.push(this.getNextItem());
    }
    return Promise.allSettled(row_promises)
        .then((items) => {
          return items.filter((item) => item.status === 'fulfilled')
                       .map((item) => item.value);
        });
  }

  async getInitial() {
    this.top_stories_ids = await this.getTopStoriesIDs();
    const list_items = await this.tryForNextNItems(50);
    return list_items;
  }


  async getNextBatch() {
    return this.tryForNextNItems(5);
  }

  async updateDetailView(item_info) {
    let title = item_info['title'];
    if ('url' in item_info) title = <a href={item_info['url']} target="_blank"> {title} </a>;
    this.setDetailView(
        <div style={{"padding-left": "5%", "text-align": "left-justify"}}>
          <h2>{title}</h2>
        </div>
    );
  }
}

export default HNAdapter;
