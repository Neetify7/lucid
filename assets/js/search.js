const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
let folders = [];

async function fetchSites() {
    const res = await fetch("/assets/json/s.json");
    return res.json();
}

async function fetchFiles(repo) {
    let url = `https://api.github.com/repos/${repo}/git/trees/main?recursive=1`;
    let res = await fetch(url);
    if (res.status === 403) throw new Error("ratelimit");
    let data = await res.json();
    return data.tree;
}

function formatName(folder) {
    let name = folder.split("/").pop();
    name = name.replace(/[-_]/g, " ");
    name = name.replace(/\b\w/g, char => char.toUpperCase());
    return name;
}

function renderResults(list) {
    searchResults.innerHTML = "";
    list.forEach(item => {
        const button = document.createElement("button");
        button.textContent = `[${item.repo}] ${formatName(item.folder)}`;
        button.addEventListener("click", () => openFolder(item.repo, item.folder));
        searchResults.appendChild(button);
    });
}

function openFolder(repo, folder) {
    document.body.style.backgroundColor = "white";
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    document.body.innerHTML = "";
    const iframe = document.createElement("iframe");
    iframe.src = `https://rawcdn.githack.com/${repo}/main/${folder}/index.html`;
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    iframe.style.border = "none";
    document.body.appendChild(iframe);
}

function fuzzyMatch(str, query) {
    str = str.toLowerCase().replace(/[-_.]/g, " ");
    query = query.toLowerCase().replace(/[-_.]/g, " ");
    const words = query.split(/\s+/).filter(Boolean);
    return words.every(word => {
        let i = 0;
        for (let j = 0; j < str.length; j++) {
            if (str[j] === word[i]) i++;
            if (i === word.length) return true;
        }
        return false;
    });
}

async function init() {
    try {
        const sites = await fetchSites();
        for (const site of sites) {
            try {
                const files = await fetchFiles(site.repo);
                const topLevelFolders = new Set();
                files.forEach(f => {
                    if (f.path.endsWith("index.html")) {
                        const folder = f.path.replace(/\/?index\.html$/, "");
                        if (!folder.includes("/")) topLevelFolders.add(folder);
                    }
                });
                folders = folders.concat(
                    Array.from(topLevelFolders).map(folder => ({
                        repo: site.repo,
                        folder
                    }))
                );
            } catch (err) {
                if (err.message === "ratelimit") {
                    alert("You're being rate limited, try again later");
                    return;
                }
            }
        }
        renderResults(folders);
    } catch (err) {
        alert("Error loading sites");
    }
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (!query) return renderResults(folders);
    const filtered = folders.filter(f =>
        fuzzyMatch(f.folder, query) || fuzzyMatch(f.repo, query)
    );
    renderResults(filtered);
});

init();