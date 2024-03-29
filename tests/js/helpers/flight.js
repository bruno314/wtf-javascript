/*! Flight v1.5.1 | (c) Twitter, Inc. | MIT License */
!function (t, n) {
    "object" == typeof exports && "object" == typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : "object" == typeof exports ? exports.flight = n() : t.flight = n()
}(this, function () {
    return function (t) {
        function n(o) {
            if (e[o])return e[o].exports;
            var i = e[o] = {exports: {}, id: o, loaded: !1};
            return t[o].call(i.exports, i, i.exports, n), i.loaded = !0, i.exports
        }

        var e = {};
        return n.m = t, n.c = e, n.p = "", n(0)
    }([function (t, n, e) {
        var o, i;
        o = [e(1), e(2), e(3), e(4), e(5), e(6), e(7)], i = function (t, n, e, o, i, r, a) {
            "use strict";
            return {
                advice: t,
                component: n,
                compose: e,
                debug: o,
                logger: i,
                registry: r,
                utils: a
            }
        }.apply(n, o), !(void 0 !== i && (t.exports = i))
    }, function (t, n, e) {
        var o, i;
        o = [e(7)], i = function (t) {
            "use strict";
            var n = {
                around: function (t, n) {
                    return function () {
                        var e = 0, o = arguments.length, i = new Array(o + 1);
                        for (i[0] = t.bind(this); o > e; e++)i[e + 1] = arguments[e];
                        return n.apply(this, i)
                    }
                }, before: function (t, n) {
                    var e = "function" == typeof n ? n : n.obj[n.fnName];
                    return function () {
                        return e.apply(this, arguments), t.apply(this, arguments)
                    }
                }, after: function (t, n) {
                    var e = "function" == typeof n ? n : n.obj[n.fnName];
                    return function () {
                        var n = (t.unbound || t).apply(this, arguments);
                        return e.apply(this, arguments), n
                    }
                }, withAdvice: function () {
                    ["before", "after", "around"].forEach(function (e) {
                        this[e] = function (o, i) {
                            var r = o.trim().split(" ");
                            r.forEach(function (o) {
                                t.mutateProperty(this, o, function () {
                                    return this[o] = "function" == typeof this[o] ? n[e](this[o], i) : i, this[o]
                                })
                            }, this)
                        }
                    }, this)
                }
            };
            return n
        }.apply(n, o), !(void 0 !== i && (t.exports = i))
    }, function (t, n, e) {
        var o, i;
        o = [e(1), e(7), e(3), e(8), e(6), e(5), e(4)], i = function (t, n, e, o, i, r, a) {
            "use strict";
            function s() {
                var t = i.findComponentInfo(this);
                t && Object.keys(t.instances).forEach(function (n) {
                    var e = t.instances[n];
                    e && e.instance && e.instance.teardown()
                })
            }

            function c(t) {
                for (var e = arguments.length, o = new Array(e - 1), r = 1; e > r; r++)o[r - 1] = arguments[r];
                if (!t)throw new Error("Component needs to be attachTo'd a jQuery object, native node or selector string");
                var a = n.merge.apply(n, o), s = i.findComponentInfo(this);
                $(t).each(function (t, n) {
                    s && s.isAttachedTo(n) || (new this).initialize(n, a)
                }.bind(this))
            }

            function u() {
                var t = this.mixedIn || this.prototype.mixedIn || [];
                return t.map(function (t) {
                    if (null == t.name) {
                        var n = t.toString().match(l);
                        return n && n[1] ? n[1] : ""
                    }
                    return h[t.name] ? "" : t.name
                }).filter(Boolean).join(", ")
            }

            function f() {
                for (var l = arguments.length, h = new Array(l), p = 0; l > p; p++)h[p] = arguments[p];
                var d = function () {
                };
                return d.toString = d.prototype.toString = u, a.enabled && (d.describe = d.prototype.describe = d.toString()), d.attachTo = c, d.mixin = function () {
                    var t = f(), o = Object.create(d.prototype);
                    return o.mixedIn = [].concat(d.prototype.mixedIn), o.defaults = n.merge(d.prototype.defaults), o.attrDef = d.prototype.attrDef, e.mixin(o, arguments), t.prototype = o, t.prototype.constructor = t, t
                }, d.teardownAll = s, a.enabled && h.unshift(r), h.unshift(o, t.withAdvice, i.withRegistration), e.mixin(d.prototype, h), d
            }

            var l = /function (.*?)\s?\(/, h = {withBase: !0, withLogging: !0};
            return f.teardownAll = function () {
                i.components.slice().forEach(function (t) {
                    t.component.teardownAll()
                }), i.reset()
            }, f
        }.apply(n, o), !(void 0 !== i && (t.exports = i))
    }, function (t, n, e) {
        var o, i;
        o = [e(7)], i = function (t) {
            "use strict";
            function n(n, e) {
                Object.keys(n).forEach(function (i) {
                    o.indexOf(i) < 0 && t.propertyWritability(n, i, e)
                })
            }

            function e(t, e) {
                t.mixedIn = Object.prototype.hasOwnProperty.call(t, "mixedIn") ? t.mixedIn : [];
                for (var o = 0; o < e.length; o++)-1 == t.mixedIn.indexOf(e[o]) && (n(t, !1), e[o].call(t), t.mixedIn.push(e[o]));
                n(t, !0)
            }

            var o = ["mixedIn", "attrDef"];
            return {mixin: e}
        }.apply(n, o), !(void 0 !== i && (t.exports = i))
    }, function (t, n, e) {
        var o, i;
        o = [e(6)], i = function (t) {
            "use strict";
            function n(t, e, o) {
                o = o || {};
                var i = o.obj || window, r = o.path || (i == window ? "window" : ""), a = Object.keys(i);
                a.forEach(function (o) {
                    (g[t] || t)(e, i, o) && console.log([r, ".", o].join(""), "->", ["(", typeof i[o], ")"].join(""), i[o]), "[object Object]" == Object.prototype.toString.call(i[o]) && i[o] != i && -1 == r.split(".").indexOf(o) && n(t, e, {
                        obj: i[o],
                        path: [r, o].join(".")
                    })
                })
            }

            function e(t, e, o, i) {
                e && typeof o != e ? console.error([o, "must be", e].join(" ")) : n(t, o, i)
            }

            function o(t, n) {
                e("name", "string", t, n)
            }

            function i(t, n) {
                e("nameContains", "string", t, n)
            }

            function r(t, n) {
                e("type", "function", t, n)
            }

            function a(t, n) {
                e("value", null, t, n)
            }

            function s(t, n) {
                e("valueCoerced", null, t, n)
            }

            function c(t, e) {
                n(t, null, e)
            }

            function u() {
                var t = [].slice.call(arguments);
                y.eventNames.length || (y.eventNames = m), y.actions = t.length ? t : m, p()
            }

            function f() {
                var t = [].slice.call(arguments);
                y.actions.length || (y.actions = m), y.eventNames = t.length ? t : m, p()
            }

            function l() {
                y.actions = [], y.eventNames = [], p()
            }

            function h() {
                y.actions = m, y.eventNames = m, p()
            }

            function p() {
                try {
                    window.localStorage && (localStorage.setItem("logFilter_eventNames", y.eventNames), localStorage.setItem("logFilter_actions", y.actions))
                } catch (t) {
                }
            }

            function d() {
                var t, n;
                try {
                    t = window.localStorage && localStorage.getItem("logFilter_eventNames"), n = window.localStorage && localStorage.getItem("logFilter_actions")
                } catch (e) {
                    return
                }
                t && (y.eventNames = t), n && (y.actions = n), Object.keys(y).forEach(function (t) {
                    var n = y[t];
                    "string" == typeof n && n !== m && (y[t] = n ? n.split(",") : [])
                })
            }

            var g = {
                name: function (t, n, e) {
                    return t == e
                }, nameContains: function (t, n, e) {
                    return e.indexOf(t) > -1
                }, type: function (t, n, e) {
                    return n[e]instanceof t
                }, value: function (t, n, e) {
                    return n[e] === t
                }, valueCoerced: function (t, n, e) {
                    return n[e] == t
                }
            }, m = "all", y = {eventNames: [], actions: []};
            return {
                enable: function (t) {
                    this.enabled = !!t, t && window.console && (console.info("Booting in DEBUG mode"), console.info("You can configure event logging with DEBUG.events.logAll()/logNone()/logByName()/logByAction()")), d(), window.DEBUG = this
                },
                warn: function () {
                    if (window.console) {
                        var t = console.warn || console.log, n = [].slice.call(arguments);
                        n.unshift(this.toString() + ":"), t.apply(console, n)
                    }
                },
                registry: t,
                find: {
                    byName: o,
                    byNameContains: i,
                    byType: r,
                    byValue: a,
                    byValueCoerced: s,
                    custom: c
                },
                events: {
                    logFilter: y,
                    logByAction: u,
                    logByName: f,
                    logAll: h,
                    logNone: l
                }
            }
        }.apply(n, o), !(void 0 !== i && (t.exports = i))
    }, function (t, n, e) {
        var o, i;
        o = [e(7)], i = function (t) {
            "use strict";
            function n(t) {
                var n = t.tagName ? t.tagName.toLowerCase() : t.toString(), e = t.className ? "." + t.className : "", o = n + e;
                return t.tagName ? ["'", "'"].join(o) : o
            }

            function e(t, e, o) {
                if (window.DEBUG && window.DEBUG.enabled) {
                    var r, a, s, c, u, f, l, h, p, d;
                    "function" == typeof o[o.length - 1] && (c = o.pop(), c = c.unbound || c), 1 == o.length ? (s = e.$node[0], a = o[0]) : 2 != o.length || "object" != typeof o[1] || o[1].type ? (s = o[0], a = o[1], "trigger" == t && (u = o[2])) : (s = e.$node[0], a = o[0], "trigger" == t && (u = o[1])), r = "object" == typeof a ? a.type : a, f = window.DEBUG.events.logFilter, h = "all" == f.actions || f.actions.indexOf(t) > -1, l = function (t) {
                        return t.test ? t : new RegExp("^" + t.replace(/\*/g, ".*") + "$")
                    }, p = "all" == f.eventNames || f.eventNames.some(function (t) {
                            return l(t).test(r)
                        }), h && p && (d = [i[t], t, "[" + r + "]"], u && d.push(u), d.push(n(s)), d.push(e.constructor.describe.split(" ").slice(0, 3).join(" ")), console.groupCollapsed && "trigger" == t && console.groupCollapsed(t, r), Function.prototype.apply.call(console.info, console, d))
                }
            }

            function o() {
                this.before("trigger", function () {
                    e("trigger", this, t.toArray(arguments))
                }), console.groupCollapsed && this.after("trigger", function () {
                    console.groupEnd()
                }), this.before("on", function () {
                    e("on", this, t.toArray(arguments))
                }), this.before("off", function () {
                    e("off", this, t.toArray(arguments))
                })
            }

            var i = {on: "<-", trigger: "->", off: "x "};
            return o
        }.apply(n, o), !(void 0 !== i && (t.exports = i))
    }, function (t, n) {
        var e, o;
        e = [], o = function () {
            "use strict";
            function t(t, n) {
                var e, o, i, r = n.length;
                return "function" == typeof n[r - 1] && (r -= 1, i = n[r]), "object" == typeof n[r - 1] && (r -= 1), 2 == r ? (e = n[0], o = n[1]) : (e = t.node, o = n[0]), {
                    element: e,
                    type: o,
                    callback: i
                }
            }

            function n(t, n) {
                return t.element == n.element && t.type == n.type && (null == n.callback || t.callback == n.callback)
            }

            function e() {
                function e(t) {
                    this.component = t, this.attachedTo = [], this.instances = {}, this.addInstance = function (t) {
                        var n = new o(t);
                        return this.instances[t.identity] = n, this.attachedTo.push(t.node), n
                    }, this.removeInstance = function (t) {
                        delete this.instances[t.identity];
                        var n = this.attachedTo.indexOf(t.node);
                        n > -1 && this.attachedTo.splice(n, 1), Object.keys(this.instances).length || i.removeComponentInfo(this)
                    }, this.isAttachedTo = function (t) {
                        return this.attachedTo.indexOf(t) > -1
                    }
                }

                function o(t) {
                    this.instance = t, this.events = [], this.addBind = function (t) {
                        this.events.push(t), i.events.push(t)
                    }, this.removeBind = function (t) {
                        for (var e, o = 0; e = this.events[o]; o++)n(e, t) && this.events.splice(o, 1)
                    }
                }

                var i = this;
                (this.reset = function () {
                    this.components = [], this.allInstances = {}, this.events = []
                }).call(this), this.addInstance = function (t) {
                    var n = this.findComponentInfo(t);
                    n || (n = new e(t.constructor), this.components.push(n));
                    var o = n.addInstance(t);
                    return this.allInstances[t.identity] = o, n
                }, this.removeInstance = function (t) {
                    var n = this.findComponentInfo(t);
                    n && n.removeInstance(t), delete this.allInstances[t.identity]
                }, this.removeComponentInfo = function (t) {
                    var n = this.components.indexOf(t);
                    n > -1 && this.components.splice(n, 1)
                }, this.findComponentInfo = function (t) {
                    for (var n, e = t.attachTo ? t : t.constructor, o = 0; n = this.components[o]; o++)if (n.component === e)return n;
                    return null
                }, this.findInstanceInfo = function (t) {
                    return this.allInstances[t.identity] || null
                }, this.getBoundEventNames = function (t) {
                    return this.findInstanceInfo(t).events.map(function (t) {
                        return t.type
                    })
                }, this.findInstanceInfoByNode = function (t) {
                    var n = [];
                    return Object.keys(this.allInstances).forEach(function (e) {
                        var o = this.allInstances[e];
                        o.instance.node === t && n.push(o)
                    }, this), n
                }, this.on = function (n) {
                    for (var e, o = i.findInstanceInfo(this), r = arguments.length, a = 1, s = new Array(r - 1); r > a; a++)s[a - 1] = arguments[a];
                    if (o) {
                        e = n.apply(null, s), e && (s[s.length - 1] = e);
                        var c = t(this, s);
                        o.addBind(c)
                    }
                }, this.off = function () {
                    var e = t(this, arguments), o = i.findInstanceInfo(this);
                    o && o.removeBind(e);
                    for (var r, a = 0; r = i.events[a]; a++)n(r, e) && i.events.splice(a, 1)
                }, i.trigger = function () {
                }, this.teardown = function () {
                    i.removeInstance(this)
                }, this.withRegistration = function () {
                    this.after("initialize", function () {
                        i.addInstance(this)
                    }), this.around("on", i.on), this.after("off", i.off), window.DEBUG && (!1).enabled && this.after("trigger", i.trigger), this.after("teardown", {
                        obj: i,
                        fnName: "teardown"
                    })
                }
            }

            return new e
        }.apply(n, e), !(void 0 !== o && (t.exports = o))
    }, function (t, n, e) {
        var o, i;
        o = [e(4)], i = function (t) {
            "use strict";
            function n() {
                var n = t.enabled && !Object.propertyIsEnumerable("getOwnPropertyDescriptor");
                if (n)try {
                    Object.getOwnPropertyDescriptor(Object, "keys")
                } catch (e) {
                    return !1
                }
                return n
            }

            var e = 100, o = {
                isDomObj: function (t) {
                    return !(!t.nodeType && t !== window)
                }, toArray: function (t, n) {
                    n = n || 0;
                    for (var e = t.length, o = new Array(e - n), i = n; e > i; i++)o[i - n] = t[i];
                    return o
                }, merge: function () {
                    var t = arguments.length, n = new Array(t + 1);
                    if (0 === t)return {};
                    for (var e = 0; t > e; e++)n[e + 1] = arguments[e];
                    return n[0] = {}, n[n.length - 1] === !0 && (n.pop(), n.unshift(!0)), $.extend.apply(void 0, n)
                }, push: function (t, n, e) {
                    return t && Object.keys(n || {}).forEach(function (o) {
                        if (t[o] && e)throw new Error('utils.push attempted to overwrite "' + o + '" while running in protected mode');
                        "object" == typeof t[o] && "object" == typeof n[o] ? this.push(t[o], n[o]) : t[o] = n[o]
                    }, this), t
                }, getEnumerableProperty: function (t, n) {
                    return t.propertyIsEnumerable(n) ? t[n] : void 0
                }, compose: function () {
                    var t = arguments;
                    return function () {
                        for (var n = arguments, e = t.length - 1; e >= 0; e--)n = [t[e].apply(this, n)];
                        return n[0]
                    }
                }, uniqueArray: function (t) {
                    for (var n = {}, e = [], o = 0, i = t.length; i > o; ++o)n.hasOwnProperty(t[o]) || (e.push(t[o]), n[t[o]] = 1);
                    return e
                }, debounce: function (t, n, o) {
                    "number" != typeof n && (n = e);
                    var i, r;
                    return function () {
                        var e = this, a = arguments, s = function () {
                            i = null, o || (r = t.apply(e, a))
                        }, c = o && !i;
                        return i && clearTimeout(i), i = setTimeout(s, n), c && (r = t.apply(e, a)), r
                    }
                }, throttle: function (t, n) {
                    "number" != typeof n && (n = e);
                    var o, i, r, a, s, c, u = this.debounce(function () {
                        s = a = !1
                    }, n);
                    return function () {
                        o = this, i = arguments;
                        var e = function () {
                            r = null, s && (c = t.apply(o, i)), u()
                        };
                        return r || (r = setTimeout(e, n)), a ? s = !0 : (a = !0, c = t.apply(o, i)), u(), c
                    }
                }, countThen: function (t, n) {
                    return function () {
                        return --t ? void 0 : n.apply(this, arguments)
                    }
                }, delegate: function (t) {
                    return function (n, e) {
                        var o, i = $(n.target);
                        Object.keys(t).forEach(function (r) {
                            return !n.isPropagationStopped() && (o = i.closest(r)).length ? (e = e || {}, n.currentTarget = e.el = o[0], t[r].apply(this, [n, e])) : void 0
                        }, this)
                    }
                }, once: function (t) {
                    var n, e;
                    return function () {
                        return n ? e : (n = !0, e = t.apply(this, arguments))
                    }
                }, propertyWritability: function (t, e, o) {
                    n() && t.hasOwnProperty(e) && Object.defineProperty(t, e, {writable: o})
                }, mutateProperty: function (t, e, o) {
                    var i;
                    return n() && t.hasOwnProperty(e) ? (i = Object.getOwnPropertyDescriptor(t, e).writable, Object.defineProperty(t, e, {writable: !0}), o.call(t), void Object.defineProperty(t, e, {writable: i})) : void o.call(t)
                }
            };
            return o
        }.apply(n, o), !(void 0 !== i && (t.exports = i))
    }, function (t, n, e) {
        var o, i;
        o = [e(7), e(6), e(4)], i = function (t, n, e) {
            "use strict";
            function o(t) {
                t.events.slice().forEach(function (t) {
                    var n = [t.type];
                    t.element && n.unshift(t.element), "function" == typeof t.callback && n.push(t.callback), this.off.apply(this, n)
                }, t.instance)
            }

            function i(t, n) {
                try {
                    window.postMessage(n, "*")
                } catch (o) {
                    e.warn.call(this, ['Event "', t, '" was triggered with non-serializable data. ', "Flight recommends you avoid passing non-serializable data in events."].join(""))
                }
            }

            function r(t) {
                e.warn.call(this, ['Attribute "', t, '" defaults to an array or object. ', "Enclose this in a function to avoid sharing between component instances."].join(""))
            }

            function a(t) {
                var n, o = [];
                if (this.attr = new this.attrDef, e.enabled && window.console) {
                    for (var i in this.attrDef.prototype)o.push(i);
                    n = Object.keys(t);
                    for (var a = n.length - 1; a >= 0; a--)if (-1 == o.indexOf(n[a])) {
                        e.warn.call(this, 'Passed unused attribute "' + n[a] + '".');
                        break
                    }
                }
                for (var i in this.attrDef.prototype) {
                    if ("undefined" == typeof t[i]) {
                        if (null === this.attr[i])throw new Error('Required attribute "' + i + '" not specified in attachTo for component "' + this.toString() + '".');
                        e.enabled && "object" == typeof this.attr[i] && r.call(this, i)
                    } else this.attr[i] = t[i];
                    "function" == typeof this.attr[i] && (this.attr[i] = this.attr[i].call(this))
                }
            }

            function s(t) {
                e.enabled && e.warn.call(this, "defaultAttrs will be removed in a future version. Please use attributes.");
                var n = Object.create(t);
                for (var o in this.defaults)t.hasOwnProperty(o) || (n[o] = this.defaults[o], e.enabled && "object" == typeof this.defaults[o] && r.call(this, o));
                this.attr = n, Object.keys(this.defaults || {}).forEach(function (t) {
                    if (null === this.defaults[t] && null === this.attr[t])throw new Error('Required attribute "' + t + '" not specified in attachTo for component "' + this.toString() + '".')
                }, this)
            }

            function c(t) {
                return function (n, e) {
                    $(n.target).trigger(t, e)
                }
            }

            function u() {
                this.trigger = function () {
                    var t, n, o, r, a, s = arguments.length - 1, c = arguments[s];
                    return "string" == typeof c || c && c.defaultBehavior || (s--, o = c), 1 == s ? (t = $(arguments[0]), r = arguments[1]) : (t = this.$node, r = arguments[0]), r.defaultBehavior && (a = r.defaultBehavior, r = $.Event(r.type)), n = r.type || r, e.enabled && window.postMessage && i.call(this, n, o), "object" == typeof this.attr.eventData && (o = $.extend(!0, {}, this.attr.eventData, o)), t.trigger(r || n, o), a && !r.isDefaultPrevented() && (this[a] || a).call(this, r, o), t
                }, this.on = function () {
                    var n, e, o, i, r = arguments.length - 1, a = arguments[r];
                    if (i = "object" == typeof a ? t.delegate(this.resolveDelegateRules(a)) : "string" == typeof a ? c(a) : a, 2 == r ? (n = $(arguments[0]), e = arguments[1]) : (n = this.$node, e = arguments[0]), "function" != typeof i && "object" != typeof i)throw new Error('Unable to bind to "' + e + '" because the given callback is not a function or an object');
                    return o = i.bind(this), o.target = i, o.context = this, n.on(e, o), i.bound || (i.bound = []), i.bound.push(o), o
                }, this.off = function () {
                    var t, e, o, i = arguments.length - 1;
                    if ("function" == typeof arguments[i] && (o = arguments[i], i -= 1), 1 == i ? (t = $(arguments[0]), e = arguments[1]) : (t = this.$node, e = arguments[0]), o) {
                        var r = o.target ? o.target.bound : o.bound || [];
                        r && r.some(function (t, n, e) {
                            return t.context && this.identity == t.context.identity ? (e.splice(n, 1), o = t, !0) : void 0
                        }, this), t.off(e, o)
                    } else n.findInstanceInfo(this).events.forEach(function (n) {
                        e == n.type && t.off(e, n.callback)
                    });
                    return t
                }, this.resolveDelegateRules = function (t) {
                    var n = {};
                    return Object.keys(t).forEach(function (e) {
                        if (!(e in this.attr))throw new Error('Component "' + this.toString() + '" wants to listen on "' + e + '" but no such attribute was defined.');
                        n[this.attr[e]] = "string" == typeof t[e] ? c(t[e]) : t[e]
                    }, this), n
                }, this.select = function (t) {
                    return this.$node.find(this.attr[t])
                }, this.attributes = function (t) {
                    var n = function () {
                    };
                    this.attrDef && (n.prototype = new this.attrDef);
                    for (var e in t)n.prototype[e] = t[e];
                    this.attrDef = n
                }, this.defaultAttrs = function (n) {
                    t.push(this.defaults, n, !0) || (this.defaults = n)
                }, this.initialize = function (t, n) {
                    if (n = n || {}, this.identity || (this.identity = f++), !t)throw new Error("Component needs a node");
                    return t.jquery ? (this.node = t[0], this.$node = t) : (this.node = t, this.$node = $(t)), this.attrDef ? a.call(this, n) : s.call(this, n), this
                }, this.teardown = function () {
                    o(n.findInstanceInfo(this))
                }
            }

            var f = 0;
            return u
        }.apply(n, o), !(void 0 !== i && (t.exports = i))
    }])
});