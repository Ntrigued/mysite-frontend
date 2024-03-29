import Script from "next/script";

export default function CodepenPage(params: any) {
  return (
    <div>
      <div style={{ marginLeft: "5%", marginTop: "2.5%" }}>
        <p
          className="codepen"
          data-height="300"
          data-theme-id="dark"
          data-default-tab="result"
          data-slug-hash="VwgowMX"
          data-user="allbeematthew"
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
            See the Pen{" "}
            <a href="https://codepen.io/allbeematthew/pen/VwgowMX">2048 game</a>{" "}
            by Matthew Allbee (
            <a href="https://codepen.io/allbeematthew">@allbeematthew</a>) on{" "}
            <a href="https://codepen.io">CodePen</a>.
          </span>
        </p>
        <Script
          src="https://cpwebassets.codepen.io/assets/embed/ei.js"
          defer={false}
        ></Script>
      </div>
    </div>
  );
}
