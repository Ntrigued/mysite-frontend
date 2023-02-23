import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import SiteReaderContainer from '../components/ScrollingSiteReader/SiteReaderContainer';


export default function ScrollingSiteReader(props: any) {
    const query_client = new QueryClient();

    return (
      <div className={' h-[97.5vh] w-full'}>
        <QueryClientProvider client={query_client} >
            <SiteReaderContainer />
        </QueryClientProvider>
      </div>
    );
}