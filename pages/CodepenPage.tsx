import Link from "next/link";

import CodePen from "../components/CodePen/CodePen";

export default function CodepenPage(params: any) {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl ml-[2.5%] mt-[1%] md:text-6xl">Code Pens</h1>
      <div className="flex flex-col gap-y-[2rem] ml-[2.5%] mt-[3.125vh] mr-[2.5%] md:flex-row md:gap-y-0 md:gap-x-[2rem] md:mr-0">
        <div className="flex flex-col md:w-1/3">
          <h1 className="text-center text-2xl font-bold mb-[1vh]">2048 Game</h1>
          <CodePen
            slug_hash={"VwgowMX"}
            user={"allbeematthew"}
            title={"2048 Game"}
          />
          <Link
            className="text-center underline mt-[1.25%]"
            href="https://codepen.io/allbeematthew/full/VwgowMX"
          >
            Open in Full Page View
          </Link>
          <div id="2048_descr" className="mt-[5%]">
            <p className="indent-4 text-xl">
              Written with vanilla Javascript, CSS, and HTML, this pen is a
              clone of the famous{" "}
              <a
                className="underline"
                href="https://en.wikipedia.org/wiki/2048_(video_game)"
              >
                2048
              </a>{" "}
              game. The goal of the game is to get a box with a points value of
              (you may have guessed it) 2048. To play, either use arrow keys or
              swipe gestures to move the boxes around the grid. If two boxes
              with the same points value collide, they will combine into a
              single box with double the points.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:w-1/3">
          <h1 className="text-center text-2xl font-bold mb-[1vh]">
            Chord Display
          </h1>
          <CodePen
            slug_hash={"vYMaELz"}
            user={"allbeematthew"}
            title={"Chord Display Title"}
          />
          <Link
            className="text-center underline mt-[1.25%]"
            href="https://codepen.io/allbeematthew/full/vYMaELz"
          >
            Open in Full Page View
          </Link>
          <div id="2048_descr" className="mt-[5%]">
            <p className="indent-4 text-xl">
              Developed as a proof-of-concept for a larger app, this CodePen is
              meant to help you (or more specifically,{" "}
              <span className="italic">me</span>) play along with the chord
              changes from over 1,000 jazz standards. Simply select the desired
              song from the dropdown, set the BPM which you want to play at, and
              hit Start. If I do say so myself, {"it's"} a great learning tool.{" "}
              {"You'll"} probably want to view this in{" "}
              <Link
                className="underline"
                href="https://codepen.io/allbeematthew/full/vYMaELz"
              >
                Full Page Mode
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-[7.5%] mb-[2.5%] md:mt-[33vh] md:mb-0 md:w-1/3 md:justify-start xl:mt-[25vh]">
          <p className="text-center text-4xl font-bold">
            ...With more to come!
          </p>
        </div>
      </div>
    </div>
  );
}
