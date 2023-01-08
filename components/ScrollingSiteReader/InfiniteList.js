import React, { useState, useRef, useEffect } from 'react';


/*
 parameters from adapter:
  - amount: # of items to load at a time
    - place onvisible listener to item $amount from the bottom
      - when hit, load $amount more items and set the listener to the last item before the new ones
*/

function InfiniteList(props) {
  const adapter = props.adapter;
  let reload_amount = adapter.reload_amount;
  const [items, setItems] = useState([]);
  const listElem = useRef(undefined);

  useEffect(() => {
      adapter.getInitial().then(initial_items => setItems(initial_items))
  }, []);

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

  return (
    <div ref={listElem} onScroll={maybeUpdate} className={'flex flex-col items-center h-screen overflow-y-scroll'} >
      { items }
    </div>
  );
}

export default InfiniteList;
