import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import SiteReaderContainer from '../components/ScrollingSiteReader/SiteReaderContainer';


/* Originally, a generic "reader" that would have multiple adapters to determine what site to fetch from.
* For now, since only the Hacker News adapter was finished, its just a Hacker News reader
*/
export default function HackerNewsReader(props: any) {
    const query_client = new QueryClient();

    return (
      <div className={' h-full w-full'}>
        <QueryClientProvider client={query_client} >
            <SiteReaderContainer />
        </QueryClientProvider>
      </div>
    );
}