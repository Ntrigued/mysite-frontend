import Image from 'next/image';
import Link from 'next/link';
import {useState} from "react";


export default function NavBar() {
    const link_base_styles = ['hidden', 'md:inline', 'lg:pt-[10%]'];
    const [link_styles, setLinkStyles] = useState<Array<string>>(link_base_styles);
    const changeLinkVisibility = () => {
        const elem = document.getElementById('outerNav');
        if(elem) {
            console.log('Updating link styles: ', link_styles)
            if(link_styles.includes('hidden'))  {
                setLinkStyles(link_styles.filter(item => item != 'hidden'));
            }
            else {
                setLinkStyles([...link_styles, 'hidden']);
            }
        }
    }


    const link_style_str = link_styles.join(' ')
    // @ts-ignore
    return (
        <nav id={'outerNav'} className={' bg-slate-500 flex flex-col items-center justify-items-center ' +
                                        'md:flex-row md:justify-items-left '+
                                        'lg:flex-col lg:mt-[1%] lg:mb-[7.5%] lg:w-[7.5%] rounded-br-lg rounded-tr-lg'}>
            <div className={'px-[2.5%] self-start md:hidden'}
                 onClick={changeLinkVisibility}>
                <Image src={'/navbar_icon.png'}
                       alt={"icon for opening navbar"}
                        width={45} height={45}/>
            </div>
            <div className={link_style_str}>
                <Link href={'/'}>Home</Link>
            </div>
            <div className={link_style_str}>
                <Link href={'/about'}>About Me</Link>
            </div>
        </nav>
    )
}