import Link from 'next/link';
import Image from "next/image";
import githubLogo from 'public/github-mark.png';


export default function SocialMediaWidgets() {

    return (
      <div  className={'flex flex-col items-center '}>
          <div id={'twitter_follow_div'}>
              <a href="https://twitter.com/allbeematthew?ref_src=twsrc%5Etfw"
                 className="twitter-follow-button" data-size="large" data-show-screen-name="false"
                 data-show-count="false">Follow</a>
              <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
          </div>
          <div id={'github_profile_div'}>
              <a href='https://github.com/Ntrigued' className={'flex flex-col items-center'}>
                  <Image src={githubLogo} alt={'github logo, link to profile'}
                         className={'w-[20%]'} />
              </a>
          </div>
      </div>
    );
}
