// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...


type httpCallback = (txt: string, code: number, req: XMLHttpRequest) => void;

var $ = {
  ajax: function (opts: { type: string, url: string, contentType: string, data: any, success: httpCallback }) {
    var http = new XMLHttpRequest();
    http.open(opts.type || "GET", opts.url, true);
    http.setRequestHeader("Content-type", opts.contentType);
    http.setRequestHeader("Authorization", `Bearer ${Vizzlo.APIKey}`);
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        opts.success(http.responseText, http.status, http);
      }
    }
    http.send(opts.data);
  }
};

module Vizzlo {
  export type Record = {};

  export interface Document {
    title: string;
    settings: any;
    style: any;
    data: Record[];
  }

  export let APIKey: string;

  export function Visualize(elementOrId: HTMLElement | string, doc: Document) {
    if (!APIKey) {
      throw new Error("Must configure API key using Vizzlo.ApiKEY = 'xxxxxxxxx';");
    }
    const div = document.createElement('div');
    div.style.position = 'relative';
    div.style.width = '100%';
    div.style.height = '0';
    div.style.paddingBottom = '75%'; // TODO: height/width
    const iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    div.appendChild(iframe);
    const parent = (typeof (elementOrId) === 'string') ? document.getElementById(elementOrId) : elementOrId;
    if (!parent) {
      throw new Error(`Parent element is not existant: ${elementOrId}`);
    }
    parent.appendChild(div);

    console.log(doc);

    $.ajax({
      type: "POST",
      data: JSON.stringify(doc),
      url: 'https://vizzlo.com/api/v1/render.html',
      contentType: "application/json",
      success: function (result, status, jqXHR) {
        const d = iframe.contentDocument;
        if (!d) {
          return;
        }
        d.open();
        d.write(result);
        d.close();
      }
    });
  };
};

export default Vizzlo;