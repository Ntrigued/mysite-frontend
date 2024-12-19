import Link from "next/link";
import Image from "next/image";
import githubLogo from "../public/github-mark.png";
import LinkedInLogo from "../public/linkedin_logo.png";

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
        id={"linkedin_profile_div"}
        className={
          "flex min-h-[28px] min-w-[114px] items-center " +
          "xl:flex-col xl:my-[5%]"
        }
      >
        <a
          href="https://www.linkedin.com/in/matthew-allbee/"
          className={"flex justify-center items-center " + "xl:my-[5%]"}
        >
          <Image
            src={LinkedInLogo}
            alt={"LinkedIn logo, link to profile"}
            className={"max-w-[25%]"}
            width={114}
          />
        </a>
      </div>
    </div>
  );
}
