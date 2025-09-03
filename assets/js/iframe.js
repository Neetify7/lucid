const iframe = document.getElementById('iframe');

if (window.parent.location.href !== 'about:blank') {
    iframe.src="/static/c"
} else {
    iframe.src="/static/h"
}

function r() {
    iframe.contentWindow.location.reload();
}

function h() {
    if (window.parent.location.href !== 'about:blank') {
        iframe.src="/static/c"
    } else {
        iframe.src="/static/h"
    }
}

function g() {
    if (window.parent.location.href !== 'about:blank') {
        iframe.src="/static/c"
    } else {
        iframe.src="/static/g"
    }
}

function d() {
    if (window.parent.location.href !== 'about:blank') {
        iframe.src="/static/c"
    } else {
    }
}

function y() {
    if (window.parent.location.href !== 'about:blank') {
        iframe.src="/static/c"
    } else {
        alert("Please reload if site is not working and wait a minute")
    }
}

function s() {
    if (window.parent.location.href !== 'about:blank') {
        iframe.src="/static/c"
    } else {
        alert("Please reload if site is not working and wait a minute")
    }
}
