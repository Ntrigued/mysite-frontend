import Image from 'next/image';
import Link from 'next/link';
import {useState} from "react";

import SocialMediaWidgets from "./SocialMediaWidgets";


export default function NavBar() {
    const [maybe_hidden, setMaybeHidden] = useState<string>( 'hidden');


    const navbar_link_styles = ' ' + 'flex font-medium text-black/80 text-center' + ' '+
                                'md:inline md:px-[1.5%] md:py-[1%]' + ' ' +
                                'xl:px-inherit xl:pb-inherit xl:text-md' + ' ';
    // @ts-ignore
    return (
        <nav id={'outerNav'} className={'bg-slate-500 flex flex-col items-center justify-items-center ' +
                                        'md:flex-row md:justify-items-left '+
                                        'xl:flex-col xl:mt-[1%] xl:mb-[3%] xl:w-[7.5%] '+
                                        'xl:rounded-br-xl xl:rounded-tr-xl xl:justify-items-center'}>
            <div className={'px-[2.5%] self-start md:hidden'}
                 onClick={() => maybe_hidden == 'hidden' ? setMaybeHidden('') : setMaybeHidden('hidden')}>
                <Image src={'/navbar_icon.png'}
                       alt={"icon for opening navbar"}
                        width={45} height={45}/>
            </div>
            <div className={maybe_hidden + navbar_link_styles + ' xl:pt-[20%] '}>
                <Link href={'/'}>Home</Link>
            </div>
            <div className={maybe_hidden + navbar_link_styles + ' xl:pt-[10%] '}>
                <Link href={'/about'} className={'word-'}>About Me</Link>
            </div>
            <div className={maybe_hidden + navbar_link_styles + ' xl:flex xl:items-end xl:grow xl:mb-[2.5vh]'}>
                <SocialMediaWidgets />
            </div>
        </nav>
    )
}