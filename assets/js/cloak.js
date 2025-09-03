function cloak() {
    const title = "Google";
    const favicon = "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico";
    const redirect = "https://google.com"
    const url = window.parent.location.href;

    const win = window.open();
    const doc = win.document;
    const icon = doc.createElement("link");
    const iframe = doc.createElement("iframe");

    doc.title = title
    icon.rel = "icon";
    icon.href = favicon;
    doc.head.appendChild(icon);

    doc.body.style.margin = "0";
    doc.body.style.height = "100vh";
    iframe.src = url;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    doc.body.appendChild(iframe);

    window.parent.location.replace(redirect);
}