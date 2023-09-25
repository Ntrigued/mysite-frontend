import React, { useState, useRef, useEffect } from 'react';
import ListItem from "./ListItem";


/*
 parameters from adapter:
  - amount: # of items to load at a time
    - place onvisible listener to item $amount from the bottom
      - when hit, load $amount more items and set the listener to the last item before the new ones
*/

function InfiniteList(props) {
  const setInfoForDetailView = props.setInfoForDetailView
  const adapter = props.adapter;
  let reload_amount = adapter.reload_amount;
  const [item_ids, setItemIds] = useState(props.initial_ids);
  const listElem = useRef(undefined);
  // Replace with any updates from parent component
  useEffect(() => setItemIds(props.initial_ids), [props.initial_ids]);

  function maybeUpdate() {
    let el = listElem.current;
    let max_height = el.scrollHeight - el.offsetHeight;
    let scroll_percent = el.scrollTop / max_height;
    if(scroll_percent > reload_amount) {
      adapter.getNextBatch().then(new_item_ids => {
        setItemIds( [...item_ids, ...new_item_ids] );
      });
    }
  }

  return (
    <div ref={listElem} onScroll={maybeUpdate} className={'flex flex-col items-center w-full h-full overflow-y-scroll'}>
      { item_ids.map((item_id, idx) => {
        return <ListItem key={item_id} idx={idx+1}  adapter={adapter} item_id={item_id}
                         setInfoForDetailView={setInfoForDetailView} />
      }) }
    </div>
  );
}

export default InfiniteList;
