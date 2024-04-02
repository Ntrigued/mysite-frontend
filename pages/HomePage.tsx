import Image from "next/image";
import Link from "next/link";

export default function HomePage(props: any) {
  return (
    <div className=" flex flex-col w-full md:ml-[2.5vw]">
      <div
        id="greeting_div"
        className="w-full pt-[2.5%] pl-[5%] pr-[5%] mb-[5%] md:mb-0 xl:pt-[1.25%] xl:pl-[1.25%]"
      >
        <h1 className="animate-fade-in-home_title_1 text-5xl text-left ">
          Hi there,
        </h1>
        <h2 className="animate-fade-in-home_title_2 opacity-0 text-4xl">
          {" "}
          welcome to my site.
        </h2>
        <h3 className="animate-fade-in-home_title_3 opacity-0 text-2xl mt-[5%]">
          Have a look around:
        </h3>
      </div>
      <div
        className=" grid grid-cols-1 gap-x-5 gap-y-5
       self-center xl:self-auto md:grid-cols-2 xl:grid-cols-3"
      >
        <Link href="/HackerNewsReader">
          <div className="animate-fade-in-hn_card opacity-0 shadow-xl rounded-lg flex flex-col items-center justify-around border-solid border-2 w-[15em] aspect-square md:w-[20em] xl:w-[25em]">
            <div className="h-1/2 flex items-center">
              <h3 className="pl-[1em] pr-[1em] text-2xl font-bold text-center md:text-4xl">
                Hacker News Reader
              </h3>
            </div>
            <div className="h-1/2 flex items-start">
              <p className="pl-[1em] pr-[1em] text-center md:text-2xl">
                A reader for Hacker News posts, with infinite scroll and a
                responsive design across different device sizes
              </p>
            </div>
          </div>
        </Link>
        <Link href="/CodepenPage">
          <div className="animate-fade-in-codepen_card opacity-0 shadow-xl rounded-lg flex flex-col items-center justify-around border-solid border-2 w-[15em] aspect-square md:w-[20em] xl:w-[25em]">
            <div className="h-1/2 flex items-center">
              <h3 className="pl-[1em] pr-[1em] text-2xl font-bold text-center md:text-4xl">
                Code Pens
              </h3>
            </div>
            <div className="h-1/2 flex items-start">
              <p className="pl-[1em] pr-[1em] text-center md:text-2xl">
                small projects, complete with code, built on the CodePen.io
                platform
              </p>
            </div>
          </div>
        </Link>
        {/* <Link href="/AboutMe">
          <div className="shadow-xl rounded-lg flex flex-col items-center justify-around border-solid border-2 w-[15em] aspect-square md:w-[20em] xl:w-[25em]">
            <div className="h-1/2 flex items-center">
              <h3 className="pl-[1em] pr-[1em] text-2xl font-bold text-center md:text-4xl">
                About Me
              </h3>
            </div>
            <div className="h-1/4 flex items-center justify-center">
              <Image
                className="max-w-[40%] rounded-full"
                src={"/profile_img.jpg"}
                alt={"profile image"}
                width={380}
                height={403}
              />
            </div>
            <div className="h-1/4 flex items-center justify-center">
              <p className="pl-[1em] pr-[1em] text-center md:text-2xl">
                Some info about me
              </p>
            </div>
          </div>
        </Link>
  */}
      </div>
    </div>
  );
}
