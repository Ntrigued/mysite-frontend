import SiteReaderContainer from '../components/ScrollingSiteReader/SiteReaderContainer';
import DummyAdapter from '../components/ScrollingSiteReader/Adapters/DummyAdapter';
import HNAdapter from '../components/ScrollingSiteReader/Adapters/HNAdapter';

export default function ScrollingSiteReader(props: any) {
    return (
      <div className={' h-[97.5vh] w-full'}>
        <SiteReaderContainer />
      </div>
    );
}