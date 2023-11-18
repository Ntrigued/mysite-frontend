import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ColorSchemeModal from "./ColorSchemeModal";

import SocialMediaWidgets from "./SocialMediaWidgets";

export default function NavBar() {
  const [maybe_hidden, setMaybeHidden] = useState<string>("hidden");

  const navbar_link_styles =
    maybe_hidden +
    " font-medium text-black/80 text-center" +
    " " +
    "md:flex md:px-[1.5%] md:py-[1%]" +
    " " +
    "xl:flex-col xl:px-inherit xl:pb-inherit xl:text-lg" +
    " ";
  // @ts-ignore
  return (
    <nav
      id={"outerNav"}
      className={
        "bg-slate-500 flex flex-col w-full items-center justify-items-center " +
        "md:flex-row md:justify-items-left " +
        "xl:flex-col xl:mt-[1%] xl:mb-[3%] " +
        "xl:rounded-br-xl xl:rounded-tr-xl xl:justify-items-center"
      }
    >
      <div
        className={"px-[1.5%] self-start md:hidden"}
        onClick={() =>
          maybe_hidden == "hidden"
            ? setMaybeHidden("flex")
            : setMaybeHidden("hidden")
        }
      >
        <Image
          src={"/navbar_icon.png"}
          alt={"icon for opening navbar"}
          width={45}
          height={45}
        />
      </div>
      {/* <div className={navbar_link_styles + ' xl:pt-[20%] '}>
                <Link href={'/'}>Home</Link>
            </div> */}
      <div className={navbar_link_styles + " xl:pt-[20%] "}>
        <Link href={"/HackerNewsReader"}>HN Reader</Link>
      </div>
      <div className={navbar_link_styles + " xl:pt-[20%] "}>
        <ColorSchemeModal />
      </div>
      {/* <div className={navbar_link_styles + ' xl:pt-[10%] '}>
                <Link href={'/about'} className={'word-'}>About Me</Link>
            </div> */}
      <div
        className={
          navbar_link_styles +
          " my-[2.5%] md:my-0 " +
          "md:grow md:justify-end xl:mb-[2.5vh]"
        }
      >
        <SocialMediaWidgets />
      </div>
    </nav>
  );
}
