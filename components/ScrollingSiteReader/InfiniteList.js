import React, { useState, useRef, useEffect } from 'react';


/*
 parameters from adapter:
  - amount: # of items to load at a time
    - place onvisible listener to item $amount from the bottom
      - when hit, load $amount more items and set the listener to the last item before the new ones
*/

function InfiniteList(props) {
  const adapter = props.adapter;
  const setDetailView = props.setDetailView;
  let reload_amount = adapter.reload_amount;
  const [items, setItems] = useState([]);
  const listElem = useRef(undefined);

  useEffect(() => {
      console.log('getting initial for ', adapter);
      if(!adapter.initial_items_mutex) {
        adapter.getInitial().then(initial_items => {
          adapter.getDetailView(initial_items[0]['id'])
              .then((detail_view) => setDetailView(detail_view));
          setItems(initial_items);
        });
      }
  }, [adapter]);

  function maybeUpdate() {
    let el = listElem.current;
    let max_height = el.scrollHeight - el.offsetHeight;
    let scroll_percent = el.scrollTop / max_height;
    console.log(scroll_percent, reload_amount);
    if(scroll_percent > reload_amount) {
      adapter.getNextBatch().then(new_items => {
        setItems( [...items, ...new_items] );
      });
    }
  }

  const list_elems = items.map((item_info) => adapter.buildListItem(item_info));
  return (
    <div ref={listElem} onScroll={maybeUpdate} className={'flex flex-col items-center h-full overflow-y-scroll'} >
      { list_elems }
    </div>
  );
}

export default InfiniteList;
