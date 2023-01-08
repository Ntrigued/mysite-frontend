import AbstractAdapter  from "./AbstractAdapter";
import CommentSection from "../CommentSection";
import React from "react";


class DummyAdapter extends AbstractAdapter {
  constructor(setDetailView) {
    super();
    this.items_created = 0;
    this.comments_created = 0;
    this.reload_amount = 0.95;
    this.setDetailView = setDetailView;
  }

  async getNextItem() {
    this.items_created += 1;
    const key = this.items_created;
    const inner_html = (
        <div className={'flex w-[100%]'}>
            <div className={'flex justify-center w-[10%]'}>
                <p className={'font-bold'}>{this.items_created}.</p>
            </div>
            <div className={'flex items-center justify-center w-[90%]'}>
                <p className={'font-bold'}>Dummy Item #{this.items_created}.</p>
            </div>
        </div>
    );
    const data = {
      'onClick': () => this.updateDetailView(key),
      'key': key,
       'inner_html': inner_html,
    };
    return this.buildListItem(data);
  }

  async tryForNextNItems(N) {
      let row_promises = [];
      for(let i = 0; i < N; i++) {
          row_promises.push(this.getNextItem());
      }
      return Promise.all(row_promises);
  }

  async getNextBatch() { return this.tryForNextNItems(5); }

  async getInitial() {
    this.updateDetailView(1);
    return this.tryForNextNItems(50);
  }

  createDummyComment() {
      const like_count = Math.floor(Math.random() * 1000) - 500;
      const currentdate = new Date();
      const datetime = currentdate.toDateString() + ' ' +
          currentdate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      const length = Math.floor(Math.random() * 10);
      let comment = '';
      for(let i = 0; i < length; i++) {
          const word_len = Math.floor(Math.random() * 10);
          let word = '';
          for(let j = 0; j < word_len; j++) {
              word += String.fromCharCode(Math.floor(Math.random() * 26 + 64)); // 65535));
          }
          comment += word + ' ';
      }

      this.comments_created += 1;
      return {
          'comment': comment,
          'comment_id': this.comments_created,
          'like_count': like_count,
          'datetime': datetime,
          'children': [1,2,3,4,5,6,7,8,9,10],
      }
  }

  async getCommentById(id) {
      return this.createDummyComment();
  }

  async getComments(item_id) {
      let comment_data = [];
      for(let i = 0; i < 3; i++) comment_data.push(this.createDummyComment());
      return comment_data;
  }

  async updateDetailView(id) {
    this.setDetailView(
      <div className={'flex flex-col items-center h-screen overflow-y-scroll'}>
          <div id={'dummy-title-' + id} className={'flex items-center'}>
              <h1 className={'text-4xl text-bold'}>Dummy Detail View for Item #{ id }</h1>
          </div>
          <div id={'dummy-content-' + id} className={'flex flex-col'}>
              <p className={'mx-[1vw] text-center'}>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                  veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                  ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque
                  porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                  adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore
                  et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
                  ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea
                  voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem
                  eum fugiat quo voluptas nulla pariatur?"
              </p>
          </div>
          <CommentSection adapter={this} key={id} comment_ids={[1, 2, 3, 4, 31,'5', 6, 7, 8]} is_visible={true} />
      </div>
    );
  }
}

export default DummyAdapter;
