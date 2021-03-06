/** @private */
export type RequestCallback = (txt: string, code: number, req: XMLHttpRequest) => void;

/** @private */
export function httpRequest(opts: {
    token: string;
    type?: string;
    url: string;
    contentType: string;
    data: any;
    success: RequestCallback;
}) {
    const http = new XMLHttpRequest();
    http.open(opts.type || 'GET', opts.url, true);
    http.setRequestHeader('Content-type', opts.contentType);
    http.setRequestHeader('Authorization', `Bearer ${opts.token}`);
    http.onreadystatechange = () => {
        if (http.readyState === 4 && http.status === 200) {
            opts.success(http.responseText, http.status, http);
        }
    };
    http.send(opts.data);
}
