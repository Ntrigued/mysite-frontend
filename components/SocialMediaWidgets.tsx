import Image from "next/image";
import githubLogo from "/public/github-mark.png";

export default function SocialMediaWidgets() {
  // Twitter requires this script to show the widget
  fetch("https://platform.twitter.com/widgets.js")
    .then((response) => response.text())
    .then((text) => {
      return new Promise((resolve, reject) => {
        if (typeof window !== "undefined") {
          const script = document.createElement("script");
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          script.src = "https://platform.twitter.com/widgets.js";
          document.head.appendChild(script);
        }
      });
    });

  return (
    <div className={"flex xl:flex-col justify-center"}>
      <div id={"github_profile_div"}>
        <a
          href="https://github.com/Ntrigued"
          className={"flex justify-center items-center " + "xl:my-[5%]"}
        >
          <Image
            src={githubLogo}
            alt={"github logo, link to profile"}
            className={"max-w-[25%]"}
            width={114}
          />
        </a>
      </div>
      <div
        id={"twitter_follow_div"}
        className={
          "flex min-h-[28px] min-w-[114px] items-center " +
          "xl:flex-col xl:my-[5%]"
        }
      >
        <a
          href="https://twitter.com/allbeematthew?ref_src=twsrc%5Etfw"
          className="twitter-follow-button"
          data-size="large"
          data-show-screen-name="false"
          data-show-count="false"
        ></a>
      </div>
    </div>
  );
}
