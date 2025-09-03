function exportCookies() {
    let cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        let [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});

    let json = JSON.stringify(cookies, null, 2);
    let blob = new Blob([json], { type: 'application/json' });
    let url = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = url;
    a.download = 'cookies.json';
    a.click();

    URL.revokeObjectURL(url);
}

function importCookies() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.onchange = e => {
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onload = event => {
            try {
                let cookies = JSON.parse(event.target.result);
                for (let name in cookies) {
                    document.cookie = name + '=' + cookies[name] + '; path=/';
                }
                alert('Cookies imported successfully!');
            } catch {
                alert('Invalid JSON file');
            }
        };

        reader.readAsText(file);
    };

    input.click();
}