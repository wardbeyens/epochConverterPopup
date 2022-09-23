function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function processSelection(e) {
    var text = getSelectedText();

    if (isNumeric(text)) {
        var humanReadableDate = convertTimestamp(parseInt(text));
        showBubble(e, humanReadableDate);
    }
}

function getSelectedText() {
    var text = "";

    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }

    return text;
}

function convertTimestamp(ts) {
    let timeStamp = ts;

    if (Math.abs(Date.now() - ts) < Math.abs(Date.now() - ts * 1000)) {
    } else {
        timeStamp *= 1000;
    }

    var date = new Date(timeStamp);
    var dateStr = "";

    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    dateStr += (d <= 9 ? '0' + d : d) + "/" + (m <= 9 ? '0' + m : m) + "/" + y + " - ";

    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds();
    dateStr += (h <= 9 ? '0' + h : h) + ":" + (mi <= 9 ? '0' + mi : mi) + ":" + (s <= 9 ? '0' + s : s);

    return dateStr;
}

function showBubble(e, text) {
    let ecBubbleText = document.getElementById('ec-bubble-text');
    let ecBubble = document.getElementById('ec-bubble');
    ecBubble.style.top = e.pageY + 20 + "px";
    ecBubble.style.left = e.pageX - 70 + "px";
    ecBubbleText.innerHTML = text;
    ecBubble.style.visibility = "visible";
}

function hideBubble() {
    let ecBubbleText = document.getElementById('ec-bubble-text');
    let ecBubble = document.getElementById('ec-bubble');
    ecBubbleText.innerHTML = "";
    ecBubble.style.visibility = "hidden";
}

function startScript() {
    const appendData = ("<div id=\"ec-bubble\"><div id=\"ec-bubble-text\"></div><div id=\"ec-bubble-close\"></div></div>");

    document.querySelector('body').insertAdjacentHTML("beforeend", appendData);


    document.onkeydown = function (evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            hideBubble();
        }
    };

    document.addEventListener("dblclick", function (e) {
        processSelection(e);
    });

    document.addEventListener("click", function (e) {
        processSelection(e);
    });

    document.getElementById('ec-bubble-close').addEventListener("click", function () {
        hideBubble();
    });

    document.addEventListener('click', function (e) {
        if (!document.getElementById('ec-bubble').contains(e.target)) {
            hideBubble();
        }
    });
};

startScript();