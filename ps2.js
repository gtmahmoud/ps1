var nopage;
var jenis;
var nomerhal;
var lblname1;
halamanblogger();

function loophalaman(banyakdata) {
    maksimal = parseInt(banyakdata / postperpage) + 1;
    var blogPager = document.getElementById("blog-pager");
    html = '<div class="paginator" id="paginator1"></div>';
    if (blogPager) {
        blogPager.innerHTML = html
    }
    pag1 = new Paginator('paginator1', maksimal, numshowpage, nomerhal, "")
}

function hitungtotaldata(root) {
    var feed = root.feed;
    var totaldata = parseInt(feed.openSearch$totalResults.$t, 10);
    loophalaman(totaldata)
}

function halamanblogger() {
    var thisUrl = urlactivepage;
    if (thisUrl.indexOf("/search/label/") != -1) {
        if (thisUrl.indexOf("?updated-max") != -1) {
            lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?updated-max"))
        } else {
            lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?&max"))
        }
    }
    if (thisUrl.indexOf("?q=") == -1 && thisUrl.indexOf(".html") == -1) {
        if (thisUrl.indexOf("/search/label/") == -1) {
            jenis = "page";
            if (urlactivepage.indexOf("#PageNo=") != -1) {
                nomerhal = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
            } else {
                nomerhal = 1
            }
            document.write("<script src=\"" + home_page + "feeds/posts/summary?max-results=1&alt=json-in-script&callback=hitungtotaldata\"><\/script>")
        } else {
            jenis = "label";
            if (thisUrl.indexOf("&max-results=") == -1) {
                postperpage = 20
            }
            if (urlactivepage.indexOf("#PageNo=") != -1) {
                nomerhal = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
            } else {
                nomerhal = 1
            }
            document.write('<script src="' + home_page + 'feeds/posts/summary/-/' + lblname1 + '?alt=json-in-script&callback=hitungtotaldata&max-results=1" ><\/script>')
        }
    }
}

function redirectpage(numberpage) {
    if (numberpage != 1) {
        jsonstart = (numberpage - 1) * postperpage;
        nopage = numberpage;
        var nBody = document.getElementsByTagName('head')[0];
        var newInclude = document.createElement('script');
        newInclude.type = 'text/javascript';
        newInclude.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
        nBody.appendChild(newInclude)
    } else {
        alamat = home_page;
        location.href = alamat
    }
}

function redirectlabel(numberpage) {
    if (numberpage != 1) {
        jsonstart = (numberpage - 1) * postperpage;
        nopage = numberpage;
        var nBody = document.getElementsByTagName('head')[0];
        var newInclude = document.createElement('script');
        newInclude.type = 'text/javascript';
        newInclude.setAttribute("src", home_page + "feeds/posts/summary/-/" + lblname1 + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
        nBody.appendChild(newInclude)
    } else {
        alamat = home_page + "search/label/" + lblname1 + "?&max-results=" + postperpage;
        location.href = alamat
    }
}

function finddatepost(root) {
    post = root.feed.entry[0];
    var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
    var timestamp = encodeURIComponent(timestamp1);
    if (jenis == "page") {
        var alamat = home_page + "search?updated-max=" + timestamp + "&max-results=" + postperpage + "#PageNo=" + nopage
    } else {
        var alamat = home_page + "search/label/" + lblname1 + "?updated-max=" + timestamp + "&max-results=" + postperpage + "#PageNo=" + nopage
    }
    location.href = alamat
}