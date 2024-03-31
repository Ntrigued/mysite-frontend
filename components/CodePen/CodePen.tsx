import Script from "next/script";

export default function CodePen(params: any) {
  const slug_hash = params.slug_hash;
  const title = params.title;
  const user = params.user;

  return (
    <>
      <div>
        <p
          className="codepen"
          data-height="300"
          data-theme-id="dark"
          data-default-tab="result"
          data-slug-hash={slug_hash}
          data-user={user}
          style={{
            height: "50vh",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid",
            margin: "1em 0",
            padding: "1em",
          }}
        >
          <span>
            Still loading... or blocked by adblock. See the Pen:{" "}
            <a
              style={{ textDecoration: "underline" }}
              href={"https://codepen.io/" + user + "/pen/" + slug_hash}
            >
              {title}
            </a>{" "}
            by Matthew Allbee (
            <a
              style={{ textDecoration: "underline" }}
              href="https://codepen.io/allbeematthew"
            >
              @allbeematthew
            </a>
            ) on CodePen.
          </span>
        </p>
        <Script
          src="https://cpwebassets.codepen.io/assets/embed/ei.js"
          defer={false}
        ></Script>
      </div>
    </>
  );
}
