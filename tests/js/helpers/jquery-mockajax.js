/*! jQuery Mockjax
 * A Plugin providing simple and flexible mocking of ajax requests and responses
 *
 * Version: 2.0.1
 * Home: https://github.com/jakerella/jquery-mockjax
 * Copyright (c) 2015 Jordan Kasper, formerly appendTo;
 * NOTE: This repository was taken over by Jordan Kasper (@jakerella) October, 2014
 *
 * Dual licensed under the MIT or GPL licenses.
 * http://opensource.org/licenses/MIT OR http://www.gnu.org/licenses/gpl-2.0.html
 */
!function (a, b) {
    "use strict";
    if ("function" == typeof define && define.amd && define.amd.jQuery)define(["jquery"], function (c) {
        return b(c, a)
    }); else {
        if ("object" != typeof exports)return b(a.jQuery || a.$, a);
        module.exports = b
    }
}(this, function (a, b) {
    "use strict";
    function c(c) {
        void 0 === b.DOMParser && b.ActiveXObject && (b.DOMParser = function () {
        }, DOMParser.prototype.parseFromString = function (a) {
            var b = new ActiveXObject("Microsoft.XMLDOM");
            return b.async = "false", b.loadXML(a), b
        });
        try {
            var d = (new DOMParser).parseFromString(c, "text/xml");
            if (!a.isXMLDoc(d))throw new Error("Unable to parse XML");
            var e = a("parsererror", d);
            if (1 === e.length)throw new Error("Error: " + a(d).text());
            return d
        } catch (f) {
            var g = void 0 === f.name ? f : f.name + ": " + f.message;
            return void a(document).trigger("xmlParseError", [g])
        }
    }

    function d(b, c) {
        var e = !0;
        return "string" == typeof c ? a.isFunction(b.test) ? b.test(c) : b === c : (a.each(b, function (f) {
            return void 0 === c[f] ? e = !1 : void("object" == typeof c[f] && null !== c[f] ? (e && a.isArray(c[f]) && (e = a.isArray(b[f]) && c[f].length === b[f].length), e = e && d(b[f], c[f])) : e = b[f] && a.isFunction(b[f].test) ? e && b[f].test(c[f]) : e && b[f] === c[f])
        }), e)
    }

    function e(b, c) {
        return b[c] === a.mockjaxSettings[c]
    }

    function f(b, c) {
        if (a.isFunction(b))return b(c);
        if (a.isFunction(b.url.test)) {
            if (!b.url.test(c.url))return null
        } else {
            var e = b.namespace || a.mockjaxSettings.namespace;
            if (e) {
                var f = [e, b.url].join("/");
                f = f.replace(/(\/+)/g, "/"), b.url = f
            }
            var g = b.url.indexOf("*");
            if (b.url !== c.url && -1 === g || !new RegExp(b.url.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&").replace(/\*/g, ".+")).test(c.url))return null
        }
        if (b.requestHeaders) {
            if (void 0 === c.headers)return null;
            var h = !1;
            if (a.each(b.requestHeaders, function (a, b) {
                    var d = c.headers[a];
                    return d !== b ? (h = !0, !1) : void 0
                }), h)return null
        }
        return !b.data || c.data && d(b.data, c.data) ? b && b.type && b.type.toLowerCase() !== c.type.toLowerCase() ? null : b : null
    }

    function g(a) {
        return "number" == typeof a && a >= 0
    }

    function h(b) {
        if (a.isArray(b) && 2 === b.length) {
            var c = b[0], d = b[1];
            if (g(c) && g(d))return Math.floor(Math.random() * (d - c)) + c
        } else if (g(b))return b;
        return A
    }

    function i(b, d, f) {
        var g = function (e) {
            return function () {
                return function () {
                    this.status = b.status, this.statusText = b.statusText, this.readyState = 1;
                    var g = function () {
                        this.readyState = 4;
                        var e;
                        "json" === d.dataType && "object" == typeof b.responseText ? this.responseText = JSON.stringify(b.responseText) : "xml" === d.dataType ? "string" == typeof b.responseXML ? (this.responseXML = c(b.responseXML), this.responseText = b.responseXML) : this.responseXML = b.responseXML : "object" == typeof b.responseText && null !== b.responseText ? (b.contentType = "application/json", this.responseText = JSON.stringify(b.responseText)) : this.responseText = b.responseText, ("number" == typeof b.status || "string" == typeof b.status) && (this.status = b.status), "string" == typeof b.statusText && (this.statusText = b.statusText), e = this.onreadystatechange || this.onload, a.isFunction(e) ? (b.isTimeout && (this.status = -1), e.call(this, b.isTimeout ? "timeout" : void 0)) : b.isTimeout && (this.status = -1)
                    };
                    if (a.isFunction(b.response)) {
                        if (2 === b.response.length)return void b.response(f, function () {
                            g.call(e)
                        });
                        b.response(f)
                    }
                    g.call(e)
                }.apply(e)
            }
        }(this);
        b.proxy ? u({
            global: !1,
            url: b.proxy,
            type: b.proxyType,
            data: b.data,
            dataType: "script" === d.dataType ? "text/plain" : d.dataType,
            complete: function (a) {
                b.responseXML = a.responseXML, b.responseText = a.responseText, e(b, "status") && (b.status = a.status), e(b, "statusText") && (b.statusText = a.statusText), this.responseTimer = setTimeout(g, h(b.responseTime))
            }
        }) : d.async === !1 ? g() : this.responseTimer = setTimeout(g, h(b.responseTime))
    }

    function j(b, c, d, e) {
        return b = a.extend(!0, {}, a.mockjaxSettings, b), "undefined" == typeof b.headers && (b.headers = {}), "undefined" == typeof c.headers && (c.headers = {}), b.contentType && (b.headers["content-type"] = b.contentType), {
            status: b.status,
            statusText: b.statusText,
            readyState: 1,
            open: function () {
            },
            send: function () {
                e.fired = !0, i.call(this, b, c, d)
            },
            abort: function () {
                clearTimeout(this.responseTimer)
            },
            setRequestHeader: function (a, b) {
                c.headers[a] = b
            },
            getResponseHeader: function (a) {
                return b.headers && b.headers[a] ? b.headers[a] : "last-modified" === a.toLowerCase() ? b.lastModified || (new Date).toString() : "etag" === a.toLowerCase() ? b.etag || "" : "content-type" === a.toLowerCase() ? b.contentType || "text/plain" : void 0
            },
            getAllResponseHeaders: function () {
                var c = "";
                return b.contentType && (b.headers["Content-Type"] = b.contentType), a.each(b.headers, function (a, b) {
                    c += a + ": " + b + "\n"
                }), c
            }
        }
    }

    function k(a, b, c) {
        if (l(a), a.dataType = "json", a.data && y.test(a.data) || y.test(a.url)) {
            o(a, b, c);
            var d = /^(\w+:)?\/\/([^\/?#]+)/, e = d.exec(a.url), f = e && (e[1] && e[1] !== location.protocol || e[2] !== location.host);
            if (a.dataType = "script", "GET" === a.type.toUpperCase() && f) {
                var g = m(a, b, c);
                return g ? g : !0
            }
        }
        return null
    }

    function l(a) {
        "GET" === a.type.toUpperCase() ? y.test(a.url) || (a.url += (/\?/.test(a.url) ? "&" : "?") + (a.jsonp || "callback") + "=?") : a.data && y.test(a.data) || (a.data = (a.data ? a.data + "&" : "") + (a.jsonp || "callback") + "=?")
    }

    function m(b, c, d) {
        var e = d && d.context || b, f = a.Deferred ? new a.Deferred : null;
        if (c.response && a.isFunction(c.response))c.response(d); else if ("object" == typeof c.responseText)a.globalEval("(" + JSON.stringify(c.responseText) + ")"); else {
            if (c.proxy)return u({
                global: !1,
                url: c.proxy,
                type: c.proxyType,
                data: c.data,
                dataType: "script" === b.dataType ? "text/plain" : b.dataType,
                complete: function (d) {
                    a.globalEval("(" + d.responseText + ")"), n(b, c, e, f)
                }
            }), f;
            a.globalEval("(" + c.responseText + ")")
        }
        return n(b, c, e, f), f
    }

    function n(b, c, d, e) {
        var f;
        if (setTimeout(function () {
                p(b, d, c), q(b, d)
            }, h(c.responseTime)), e) {
            try {
                f = a.parseJSON(c.responseText)
            } catch (g) {
            }
            e.resolveWith(d, [f || c.responseText])
        }
    }

    function o(a, c, d) {
        var e = d && d.context || a, f = a.jsonpCallback || "jsonp" + z++;
        a.data && (a.data = (a.data + "").replace(y, "=" + f + "$1")), a.url = a.url.replace(y, "=" + f + "$1"), b[f] = b[f] || function () {
                p(a, e, c), q(a, e), b[f] = void 0;
                try {
                    delete b[f]
                } catch (d) {
                }
            }
    }

    function p(b, c, d) {
        b.success && b.success.call(c, d.responseText || "", "success", {}), b.global && (b.context ? a(b.context) : a.event).trigger("ajaxSuccess", [{}, b])
    }

    function q(b, c) {
        b.complete && b.complete.call(c, {
            statusText: "success",
            status: 200
        }, "success"), b.global && (b.context ? a(b.context) : a.event).trigger("ajaxComplete", [{}, b]), b.global && !--a.active && a.event.trigger("ajaxStop")
    }

    function r(b, c) {
        var d, e, g, h;
        "object" == typeof b ? (c = b, b = void 0) : (c = c || {}, c.url = b), e = a.ajaxSetup({}, c), e.type = e.method = e.method || e.type, h = function (b, d) {
            var e = c[b.toLowerCase()];
            return function () {
                a.isFunction(e) && e.apply(this, [].slice.call(arguments)), d["onAfter" + b]()
            }
        };
        for (var i = 0; i < v.length; i++)if (v[i] && (g = f(v[i], e)))return w.push(e), a.mockjaxSettings.log(g, e), e.dataType && "JSONP" === e.dataType.toUpperCase() && (d = k(e, g, c)) ? d : (g.cache = e.cache, g.timeout = e.timeout, g.global = e.global, g.isTimeout && (g.responseTime > 1 ? c.timeout = g.responseTime - 1 : (g.responseTime = 2, c.timeout = 1)), a.isFunction(g.onAfterSuccess) && (c.success = h("Success", g)), a.isFunction(g.onAfterError) && (c.error = h("Error", g)), a.isFunction(g.onAfterComplete) && (c.complete = h("Complete", g)), s(g, c), function (b, c, e, f) {
            d = u.call(a, a.extend(!0, {}, e, {
                xhr: function () {
                    return j(b, c, e, f)
                }
            }))
        }(g, e, c, v[i]), d);
        if (x.push(c), a.mockjaxSettings.throwUnmocked === !0)throw new Error("AJAX not mocked: " + c.url);
        return u.apply(a, [c])
    }

    function s(a, b) {
        if (a.url instanceof RegExp && a.hasOwnProperty("urlParams")) {
            var c = a.url.exec(b.url);
            if (1 !== c.length) {
                c.shift();
                var d = 0, e = c.length, f = a.urlParams.length, g = Math.min(e, f), h = {};
                for (d; g > d; d++) {
                    var i = a.urlParams[d];
                    h[i] = c[d]
                }
                b.urlParams = h
            }
        }
    }

    function t(a) {
        var b, c, d, e = [], f = a instanceof RegExp ? function (b) {
            return a.test(b)
        } : function (b) {
            return a === b
        };
        for (b = 0, c = v.length; c > b; b++)d = v[b], f(d.url) || e.push(d);
        return e
    }

    var u = a.ajax, v = [], w = [], x = [], y = /=\?(&|$)/, z = (new Date).getTime();
    a.extend({ajax: r});
    var A = 500;
    return a.mockjaxSettings = {
        log: function (c, d) {
            if (c.logging !== !1 && ("undefined" != typeof c.logging || a.mockjaxSettings.logging !== !1) && b.console && console.log) {
                var e = "MOCK " + d.type.toUpperCase() + ": " + d.url, f = a.ajaxSetup({}, d);
                if ("function" == typeof console.log)console.log(e, f); else try {
                    console.log(e + " " + JSON.stringify(f))
                } catch (g) {
                    console.log(e)
                }
            }
        },
        logging: !0,
        namespace: null,
        status: 200,
        statusText: "OK",
        responseTime: A,
        isTimeout: !1,
        throwUnmocked: !1,
        contentType: "text/plain",
        response: "",
        responseText: "",
        responseXML: "",
        proxy: "",
        proxyType: "GET",
        lastModified: null,
        etag: "",
        headers: {
            etag: "IJF@H#@923uf8023hFO@I#H#",
            "content-type": "text/plain"
        }
    }, a.mockjax = function (a) {
        var b = v.length;
        return v[b] = a, b
    }, a.mockjax.clear = function (a) {
        "string" == typeof a || a instanceof RegExp ? v = t(a) : a || 0 === a ? v[a] = null : v = [], w = [], x = []
    }, a.mockjax.handler = function (a) {
        return 1 === arguments.length ? v[a] : void 0
    }, a.mockjax.mockedAjaxCalls = function () {
        return w
    }, a.mockjax.unfiredHandlers = function () {
        for (var a = [], b = 0, c = v.length; c > b; b++) {
            var d = v[b];
            null === d || d.fired || a.push(d)
        }
        return a
    }, a.mockjax.unmockedAjaxCalls = function () {
        return x
    }, a.mockjax
});