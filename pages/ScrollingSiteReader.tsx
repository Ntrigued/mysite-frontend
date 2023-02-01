import SiteContainer from '../components/ScrollingSiteReader/SiteContainer';
import DummyAdapter from '../components/ScrollingSiteReader/Adapters/DummyAdapter';
import HNAdapter from '../components/ScrollingSiteReader/Adapters/HNAdapter';

export default function ScrollingSiteReader(props: any) {
    return (
      <div className={' h-full w-full'}>
        <SiteContainer />
      </div>
    );
}