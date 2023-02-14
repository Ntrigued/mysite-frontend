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
  const [items, setItems] = useState(props.initial_items);
  const listElem = useRef(undefined);
  // Replace with any updates from parent component
  useEffect(() => setItems(props.initial_items), [props.initial_items]);

  console.log('props initial_items:', props.initial_items);
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
