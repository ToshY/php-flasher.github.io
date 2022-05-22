const prevNext = document.querySelectorAll(".prev-next");
const navigation = document.getElementById("main-navigation");
const navigationLinks = navigation.querySelectorAll("a");

let previous = undefined;
let next = undefined;
let active = undefined;

function renderPreviousNext(which, originalLink) {
    const links = document.querySelectorAll(which);

    links.forEach(function (link) {
        const label = link.querySelector("span");
        label.innerHTML = originalLink.innerHTML.replace(/\d+\. /, "").replace(/<(\S*?)[^>]*>.*?<\/\1>|<.*?\/>/, "");
        link.href = originalLink.href;
        link.classList.remove("hidden");
        link.classList.remove("sm:hidden");
    });
}

navigationLinks.forEach(function (link) {
    if (next !== undefined || link.href.includes("/docs/") === false) {
        return;
    }
    if (link.classList.contains("text-white")) {
        active = link;
    } else if (active === undefined) {
        previous = link;
    } else if (next === undefined) {
        next = link;
    }
});

if (active !== undefined) {
    prevNext.forEach(function (p) {
        p.classList.remove("hidden");
    });
    previous && renderPreviousNext(".link-previous", previous);
    next && renderPreviousNext(".link-next", next);
}
