"use strict";
const content = MiniReact.createElement("div", null,
    MiniReact.createElement("a", { href: "xxx" }, "Link"));
console.log(JSON.stringify(content, null, 2));
