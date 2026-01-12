var Lt = Object.create;
var F = Object.defineProperty;
var Bt = Object.getOwnPropertyDescriptor;
var pt = (r, t) => (t = Symbol[r]) ? t : Symbol.for("Symbol." + r), U = (r) => {
  throw TypeError(r);
};
var It = (r, t, e) => t in r ? F(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var ct = (r, t) => F(r, "name", { value: t, configurable: !0 });
var G = (r) => [, , , Lt((r == null ? void 0 : r[pt("metadata")]) ?? null)], ut = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], O = (r) => r !== void 0 && typeof r != "function" ? U("Function expected") : r, qt = (r, t, e, s, i) => ({ kind: ut[r], name: t, metadata: s, addInitializer: (n) => e._ ? U("Already initialized") : i.push(O(n || null)) }), Vt = (r, t) => It(t, pt("metadata"), r[3]), B = (r, t, e, s) => {
  for (var i = 0, n = r[t >> 1], a = n && n.length; i < a; i++) t & 1 ? n[i].call(e) : s = n[i].call(e, s);
  return s;
}, I = (r, t, e, s, i, n) => {
  var a, o, c, h, d, l = t & 7, _ = !!(t & 8), u = !!(t & 16), $ = l > 3 ? r.length + 1 : l ? _ ? 1 : 2 : 0, ot = ut[l + 5], lt = l > 3 && (r[$ - 1] = []), Dt = r[$] || (r[$] = []), b = l && (!u && !_ && (i = i.prototype), l < 5 && (l > 3 || !u) && Bt(l < 4 ? i : { get [e]() {
    return ht(this, n);
  }, set [e](g) {
    return dt(this, n, g);
  } }, e));
  l ? u && l < 4 && ct(n, (l > 2 ? "set " : l > 1 ? "get " : "") + e) : ct(i, e);
  for (var K = s.length - 1; K >= 0; K--)
    h = qt(l, e, c = {}, r[3], Dt), l && (h.static = _, h.private = u, d = h.access = { has: u ? (g) => Wt(i, g) : (g) => e in g }, l ^ 3 && (d.get = u ? (g) => (l ^ 1 ? ht : Jt)(g, i, l ^ 4 ? n : b.get) : (g) => g[e]), l > 2 && (d.set = u ? (g, Z) => dt(g, i, Z, l ^ 4 ? n : b.set) : (g, Z) => g[e] = Z)), o = (0, s[K])(l ? l < 4 ? u ? n : b[ot] : l > 4 ? void 0 : { get: b.get, set: b.set } : i, h), c._ = 1, l ^ 4 || o === void 0 ? O(o) && (l > 4 ? lt.unshift(o) : l ? u ? n = o : b[ot] = o : i = o) : typeof o != "object" || o === null ? U("Object expected") : (O(a = o.get) && (b.get = a), O(a = o.set) && (b.set = a), O(a = o.init) && lt.unshift(a));
  return l || Vt(r, i), b && F(i, e, b), u ? l ^ 4 ? n : b : i;
};
var Q = (r, t, e) => t.has(r) || U("Cannot " + e), Wt = (r, t) => Object(t) !== t ? U('Cannot use the "in" operator on this value') : r.has(t), ht = (r, t, e) => (Q(r, t, "read from private field"), e ? e.call(r) : t.get(r));
var dt = (r, t, e, s) => (Q(r, t, "write to private field"), s ? s.call(r, e) : t.set(r, e), e), Jt = (r, t, e) => (Q(r, t, "access private method"), e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, it = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = Symbol(), _t = /* @__PURE__ */ new WeakMap();
let Ut = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (it && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = _t.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && _t.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Kt = (r) => new Ut(typeof r == "string" ? r : r + "", void 0, rt), Ht = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new Ut(e, r, rt);
}, Zt = (r, t) => {
  if (it) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = q.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, gt = it ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Kt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ft, defineProperty: Gt, getOwnPropertyDescriptor: Qt, getOwnPropertyNames: Xt, getOwnPropertySymbols: Yt, getPrototypeOf: te } = Object, v = globalThis, bt = v.trustedTypes, ee = bt ? bt.emptyScript : "", X = v.reactiveElementPolyfillSupport, M = (r, t) => r, V = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? ee : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, nt = (r, t) => !Ft(r, t), ft = { attribute: !0, type: String, converter: V, reflect: !1, useDefault: !1, hasChanged: nt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let C = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ft) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Gt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Qt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: i, set(a) {
      const o = i == null ? void 0 : i.call(this);
      n == null || n.call(this, a), this.requestUpdate(t, o, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const t = te(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const e = this.properties, s = [...Xt(e), ...Yt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(gt(i));
    } else t !== void 0 && e.push(gt(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Zt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const a = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : V).toAttribute(e, s.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, a;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), c = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((n = o.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? o.converter : V;
      this._$Em = i;
      const h = c.fromAttribute(e, o.type);
      this[i] = h ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    var a;
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[t]), s ?? (s = o.getPropertyOptions(t)), !((s.hasChanged ?? nt)(n, e) || s.useDefault && s.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, a] of i) {
        const { wrapped: o } = a, c = this[n];
        o !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, a, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[M("elementProperties")] = /* @__PURE__ */ new Map(), C[M("finalized")] = /* @__PURE__ */ new Map(), X == null || X({ ReactiveElement: C }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, $t = (r) => r, W = R.trustedTypes, mt = W ? W.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Nt = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, Mt = "?" + m, se = `<${Mt}>`, E = document, z = () => E.createComment(""), j = (r) => r === null || typeof r != "object" && typeof r != "function", at = Array.isArray, ie = (r) => at(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Y = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, vt = /-->/g, yt = />/g, y = RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), At = /'/g, wt = /"/g, Rt = /^(?:script|style|textarea|title)$/i, re = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), f = re(1), P = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), xt = /* @__PURE__ */ new WeakMap(), w = E.createTreeWalker(E, 129);
function zt(r, t) {
  if (!at(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return mt !== void 0 ? mt.createHTML(t) : t;
}
const ne = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = H;
  for (let o = 0; o < e; o++) {
    const c = r[o];
    let h, d, l = -1, _ = 0;
    for (; _ < c.length && (a.lastIndex = _, d = a.exec(c), d !== null); ) _ = a.lastIndex, a === H ? d[1] === "!--" ? a = vt : d[1] !== void 0 ? a = yt : d[2] !== void 0 ? (Rt.test(d[2]) && (i = RegExp("</" + d[2], "g")), a = y) : d[3] !== void 0 && (a = y) : a === y ? d[0] === ">" ? (a = i ?? H, l = -1) : d[1] === void 0 ? l = -2 : (l = a.lastIndex - d[2].length, h = d[1], a = d[3] === void 0 ? y : d[3] === '"' ? wt : At) : a === wt || a === At ? a = y : a === vt || a === yt ? a = H : (a = y, i = void 0);
    const u = a === y && r[o + 1].startsWith("/>") ? " " : "";
    n += a === H ? c + se : l >= 0 ? (s.push(h), c.slice(0, l) + Nt + c.slice(l) + m + u) : c + m + (l === -2 ? o : u);
  }
  return [zt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class D {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const o = t.length - 1, c = this.parts, [h, d] = ne(t, e);
    if (this.el = D.createElement(h, s), w.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = w.nextNode()) !== null && c.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(Nt)) {
          const _ = d[a++], u = i.getAttribute(l).split(m), $ = /([.?@])?(.*)/.exec(_);
          c.push({ type: 1, index: n, name: $[2], strings: u, ctor: $[1] === "." ? oe : $[1] === "?" ? le : $[1] === "@" ? ce : J }), i.removeAttribute(l);
        } else l.startsWith(m) && (c.push({ type: 6, index: n }), i.removeAttribute(l));
        if (Rt.test(i.tagName)) {
          const l = i.textContent.split(m), _ = l.length - 1;
          if (_ > 0) {
            i.textContent = W ? W.emptyScript : "";
            for (let u = 0; u < _; u++) i.append(l[u], z()), w.nextNode(), c.push({ type: 2, index: ++n });
            i.append(l[_], z());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Mt) c.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(m, l + 1)) !== -1; ) c.push({ type: 7, index: n }), l += m.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = E.createElement("template");
    return s.innerHTML = t, s;
  }
}
function T(r, t, e = r, s) {
  var a, o;
  if (t === P) return t;
  let i = s !== void 0 ? (a = e._$Co) == null ? void 0 : a[s] : e._$Cl;
  const n = j(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((o = i == null ? void 0 : i._$AO) == null || o.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = T(r, i._$AS(r, t.values), i, s)), t;
}
class ae {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? E).importNode(e, !0);
    w.currentNode = i;
    let n = w.nextNode(), a = 0, o = 0, c = s[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let h;
        c.type === 2 ? h = new L(n, n.nextSibling, this, t) : c.type === 1 ? h = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (h = new he(n, this, t)), this._$AV.push(h), c = s[++o];
      }
      a !== (c == null ? void 0 : c.index) && (n = w.nextNode(), a++);
    }
    return w.currentNode = E, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class L {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = T(this, t, e), j(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ie(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && j(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = D.createElement(zt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const a = new ae(i, this), o = a.u(this.options);
      a.p(e), this.T(o), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = xt.get(t.strings);
    return e === void 0 && xt.set(t.strings, e = new D(t)), e;
  }
  k(t) {
    at(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new L(this.O(z()), this.O(z()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = $t(t).nextSibling;
      $t(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class J {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = T(this, t, e, 0), a = !j(t) || t !== this._$AH && t !== P, a && (this._$AH = t);
    else {
      const o = t;
      let c, h;
      for (t = n[0], c = 0; c < n.length - 1; c++) h = T(this, o[s + c], e, c), h === P && (h = this._$AH[c]), a || (a = !j(h) || h !== this._$AH[c]), h === p ? t = p : t !== p && (t += (h ?? "") + n[c + 1]), this._$AH[c] = h;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class oe extends J {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class le extends J {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class ce extends J {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = T(this, t, e, 0) ?? p) === P) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class he {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    T(this, t);
  }
}
const tt = R.litHtmlPolyfillSupport;
tt == null || tt(D, L), (R.litHtmlVersions ?? (R.litHtmlVersions = [])).push("3.3.2");
const de = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new L(t.insertBefore(z(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis;
class k extends C {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = de(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return P;
  }
}
var St;
k._$litElement$ = !0, k.finalized = !0, (St = x.litElementHydrateSupport) == null || St.call(x, { LitElement: k });
const et = x.litElementPolyfillSupport;
et == null || et({ LitElement: k });
(x.litElementVersions ?? (x.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = { attribute: !0, type: String, converter: V, reflect: !1, hasChanged: nt }, ue = (r = pe, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), s === "accessor") {
    const { name: a } = e;
    return { set(o) {
      const c = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(a, c, r, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, r, o), o;
    } };
  }
  if (s === "setter") {
    const { name: a } = e;
    return function(o) {
      const c = this[a];
      t.call(this, o), this.requestUpdate(a, c, r, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function _e(r) {
  return (t, e) => typeof e == "object" ? ue(r, t, e) : ((s, i, n) => {
    const a = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), a ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
var kt, Pt, Tt, N;
Tt = [jt("tabbed-stack-card-editor")];
let A = class A extends (Pt = k, kt = [_e({ attribute: !1 })], Pt) {
  constructor() {
    super();
    B(N, 5, this);
    this._upgradeProperty("config"), this._upgradeProperty("hass"), this._upgradeProperty("lovelace");
  }
  set config(e) {
    e && this.setConfig(e);
  }
  _upgradeProperty(e) {
    if (Object.prototype.hasOwnProperty.call(this, e)) {
      const s = this[e];
      delete this[e], this[e] = s;
    }
  }
  setConfig(e) {
    const s = (e.tabs ?? []).map((i, n) => ({
      id: (i.id || `tab_${n + 1}`).toString(),
      label: (i.label || i.id || `Tab ${n + 1}`).toString(),
      icon: i.icon,
      cards: Array.isArray(i.cards) ? i.cards : []
    }));
    this._config = {
      type: "custom:tabbed-stack-card",
      sticky_tabs: !!e.sticky_tabs,
      storage_key: e.storage_key,
      default_tab: e.default_tab,
      tabs: s.length ? s : [{ id: "tab_1", label: "Tab 1", icon: "mdi:apps", cards: [] }]
    };
  }
  _emitConfigChanged(e) {
    this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _clone() {
    return JSON.parse(JSON.stringify(this._config));
  }
  _setRoot(e, s) {
    const i = this._clone();
    i[e] = s, this._emitConfigChanged(i);
  }
  _addTab() {
    const e = this._clone(), s = e.tabs.length + 1;
    e.tabs.push({
      id: `tab_${s}`,
      label: `Tab ${s}`,
      icon: "mdi:apps",
      cards: []
    }), e.default_tab || (e.default_tab = e.tabs[0].id), this._emitConfigChanged(e);
  }
  _removeTab(e) {
    const s = this._clone();
    s.tabs.splice(e, 1), s.tabs.length || (s.tabs = [{ id: "tab_1", label: "Tab 1", icon: "mdi:apps", cards: [] }]), s.default_tab && !s.tabs.some((i) => i.id === s.default_tab) && (s.default_tab = s.tabs[0].id), this._emitConfigChanged(s);
  }
  _updateTab(e, s) {
    const i = this._clone();
    i.tabs[e] = { ...i.tabs[e], ...s }, this._emitConfigChanged(i);
  }
  _addCard(e) {
    const s = this._clone();
    s.tabs[e].cards = s.tabs[e].cards ?? [], s.tabs[e].cards.push({ type: "markdown", content: "New card" }), this._emitConfigChanged(s);
  }
  _removeCard(e, s) {
    const i = this._clone();
    i.tabs[e].cards.splice(s, 1), this._emitConfigChanged(i);
  }
  _updateCard(e, s, i) {
    const n = this._clone();
    n.tabs[e].cards[s] = i, this._emitConfigChanged(n);
  }
  _renderHACardEditor(e, s, i) {
    if (this.hass ? customElements.get("hui-card-element-editor") : void 0) {
      const a = document.createElement("hui-card-element-editor");
      return a.hass = this.hass, a.value = i, a.addEventListener("value-changed", (o) => {
        var h;
        const c = (h = o == null ? void 0 : o.detail) == null ? void 0 : h.value;
        c && this._updateCard(e, s, c);
      }), a;
    }
    return f`
      <textarea
        class="json"
        @change=${(a) => {
      try {
        const o = JSON.parse(a.target.value);
        this._updateCard(e, s, o);
      } catch {
      }
    }}
      >${JSON.stringify(i, null, 2)}</textarea>
    `;
  }
  render() {
    return this._config ? f`
      <div class="root">
        <div class="row">
          <label class="switch">
            <input
              type="checkbox"
              .checked=${!!this._config.sticky_tabs}
              @change=${(e) => this._setRoot("sticky_tabs", e.target.checked)}
            />
            <span>Sticky Tabs</span>
          </label>
        </div>

        <div class="grid">
          <label>
            <div class="lbl">storage_key (optional)</div>
            <input
              class="inp"
              .value=${this._config.storage_key ?? ""}
              @input=${(e) => this._setRoot("storage_key", e.target.value || void 0)}
            />
          </label>

          <label>
            <div class="lbl">default_tab (optional)</div>
            <input
              class="inp"
              .value=${this._config.default_tab ?? ""}
              @input=${(e) => this._setRoot("default_tab", e.target.value || void 0)}
            />
          </label>
        </div>

        <div class="header">
          <div class="h">Tabs</div>
          <button class="btn" @click=${this._addTab}>Add Tab</button>
        </div>

        ${this._config.tabs.map(
      (e, s) => f`
            <div class="tab">
              <div class="tabTop">
                <div class="tabTitle">Tab ${s + 1}</div>
                <button class="btn danger" @click=${() => this._removeTab(s)}>Remove</button>
              </div>

              <div class="grid">
                <label>
                  <div class="lbl">id</div>
                  <input
                    class="inp"
                    .value=${e.id}
                    @input=${(i) => this._updateTab(s, { id: i.target.value })}
                  />
                </label>

                <label>
                  <div class="lbl">label</div>
                  <input
                    class="inp"
                    .value=${e.label}
                    @input=${(i) => this._updateTab(s, { label: i.target.value })}
                  />
                </label>

                <label>
                  <div class="lbl">icon (mdi:...)</div>
                  <input
                    class="inp"
                    .value=${e.icon ?? ""}
                    @input=${(i) => this._updateTab(s, { icon: i.target.value || void 0 })}
                  />
                </label>
              </div>

              <div class="header small">
                <div class="h2">Cards</div>
                <button class="btn" @click=${() => this._addCard(s)}>Add Card</button>
              </div>

              ${(e.cards ?? []).map(
        (i, n) => f`
                  <div class="cardBlock">
                    <div class="cardTop">
                      <div class="cardTitle">Card ${n + 1}</div>
                      <button class="btn danger" @click=${() => this._removeCard(s, n)}>Remove</button>
                    </div>
                    <div class="cardEditor">
                      ${this._renderHACardEditor(s, n, i)}
                    </div>
                  </div>
                `
      )}
            </div>
          `
    )}
      </div>
    ` : f`<div class="hint">Konfiguration wird geladen…</div>`;
  }
};
N = G(Pt), I(N, 3, "config", kt, A), A = I(N, 0, "TabbedStackCardEditor", Tt, A), A.styles = Ht`
    :host {
      display: block;
      padding: 4px 0;
    }
    .hint {
      opacity: 0.7;
      font-size: 12px;
      padding: 8px 0;
    }
    .root {
      display: block;
    }
    .row {
      margin-bottom: 10px;
    }
    .switch {
      display: inline-flex;
      gap: 10px;
      align-items: center;
      font-weight: 700;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      margin-bottom: 12px;
    }
    .lbl {
      font-size: 12px;
      opacity: 0.7;
      margin-bottom: 4px;
    }
    .inp {
      width: 100%;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      background: rgba(255, 255, 255, 0.6);
      box-sizing: border-box;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 12px 0 8px;
    }
    .header.small {
      margin-top: 10px;
    }
    .h,
    .h2 {
      font-weight: 900;
    }
    .btn {
      padding: 6px 10px;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.05);
      cursor: pointer;
    }
    .btn.danger {
      background: rgba(255, 0, 0, 0.08);
    }
    .tab {
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 12px;
      padding: 12px;
      margin-bottom: 12px;
    }
    .tabTop,
    .cardTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .tabTitle,
    .cardTitle {
      font-weight: 900;
    }
    .cardBlock {
      border: 1px dashed rgba(0, 0, 0, 0.25);
      border-radius: 12px;
      padding: 10px;
      margin-top: 10px;
    }
    .json {
      width: 100%;
      min-height: 140px;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      font-family: ui-monospace, Menlo, Consolas, monospace;
      font-size: 12px;
      background: rgba(255, 255, 255, 0.6);
      box-sizing: border-box;
    }
  `, B(N, 1, A);
let Et = A;
var Ot, st, ge;
Ot = [jt("tabbed-stack-card")];
let S = class S extends (ge = k) {
  set hass(t) {
    this._hass = t, this._card && (this._card.hass = t), this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  static getConfigElement() {
    const t = document.createElement("tabbed-stack-card-editor");
    return typeof t.setConfig != "function" && (t.setConfig = (e) => t.config = e), t;
  }
  static getStubConfig() {
    return {
      sticky_tabs: !0,
      storage_key: "tabbed_stack_active",
      default_tab: "tab_1",
      tabs: [
        { id: "tab_1", label: "Licht", icon: "mdi:lamp", cards: [] },
        { id: "tab_2", label: "Rollo", icon: "mdi:roller-shade", cards: [] }
      ]
    };
  }
  setConfig(t) {
    var n;
    if (!((n = t == null ? void 0 : t.tabs) != null && n.length))
      throw new Error("tabs required");
    const e = t.tabs.map((a, o) => ({
      id: (a.id || `tab_${o + 1}`).toString(),
      label: (a.label || a.id || `Tab ${o + 1}`).toString(),
      icon: a.icon,
      cards: Array.isArray(a.cards) ? a.cards : []
    }));
    this._config = {
      type: "custom:tabbed-stack-card",
      sticky_tabs: !!t.sticky_tabs,
      storage_key: t.storage_key,
      default_tab: t.default_tab,
      tabs: e
    };
    const s = this._config.storage_key ? localStorage.getItem(this._config.storage_key) : null, i = s && e.some((a) => a.id === s) && s || this._config.default_tab && e.some((a) => a.id === this._config.default_tab) && this._config.default_tab || e[0].id;
    this._activeTab = i, this._buildActive();
  }
  _setTab(t) {
    this._activeTab = t, this._config.storage_key && localStorage.setItem(this._config.storage_key, t), this._buildActive();
  }
  async _buildActive() {
    const t = this._config.tabs.find((i) => i.id === this._activeTab) ?? this._config.tabs[0];
    if (!this._helpers) {
      if (!window.loadCardHelpers) throw new Error("window.loadCardHelpers missing.");
      this._helpers = await window.loadCardHelpers();
    }
    const e = t.cards ?? [], s = e.length === 0 ? { type: "markdown", content: `No cards in "${t.label}"` } : e.length === 1 ? e[0] : { type: "vertical-stack", cards: e };
    this._card = this._helpers.createCardElement(s), this._hass && (this._card.hass = this._hass), this.requestUpdate();
  }
  render() {
    return this._config ? f`
      <div class="tabs ${this._config.sticky_tabs ? "sticky" : ""}">
        <div class="tabs-inner">
          ${this._config.tabs.map(
      (t) => f`
              <button
                class="chip ${t.id === this._activeTab ? "active" : ""}"
                @click=${() => this._setTab(t.id)}
                title=${t.label}
              >
                ${t.icon ? f`<ha-icon icon="${t.icon}"></ha-icon>` : p}
                <span>${t.label}</span>
              </button>
            `
    )}
        </div>
      </div>

      <div class="content">${this._card ?? p}</div>
    ` : f``;
  }
};
st = G(ge), S = I(st, 0, "TabbedStackCard", Ot, S), S.styles = Ht`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
    }

    /* Tabs container */
    .tabs {
      width: 100%;
      box-sizing: border-box;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 10px 0 6px;
      background: var(--tsc-tabs-bg, transparent);
      z-index: 2;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .tabs::-webkit-scrollbar {
      display: none;
    }

    .tabs.sticky {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    /* Perfect centering (even inside odd popup layouts) */
    .tabs-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--tsc-chip-gap, 12px);
      width: max-content;
      margin: 0 auto;
      padding: 0 8px;
    }

    /* Chips */
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: var(--tsc-chip-padding, 10px 18px);
      border-radius: var(--tsc-chip-radius, 999px);
      border: none;
      cursor: pointer;
      white-space: nowrap;

      /* Theme-aware defaults */
      background: var(--tsc-chip-bg, rgba(255, 255, 255, 0.18));
      color: var(--primary-text-color);

      font-size: 14px;
      line-height: 1;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .chip.active {
      background: var(--tsc-chip-bg-active, var(--primary-color));
      color: var(--tsc-chip-fg-active, var(--text-primary-color, var(--primary-text-color)));
    }

    ha-icon {
      --mdc-icon-size: var(--tsc-chip-icon-size, 22px);
      color: currentColor;
    }

    /* Content spacing shield (Bubble often sets 0 gap globally) */
    .content {
      padding-top: 6px;
      --vertical-stack-card-gap: var(--tsc-stack-gap, 12px);
      width: 100%;
      max-width: 100%;
    }
    .content > * {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  `, B(st, 1, S);
let Ct = S;
window.customCards = window.customCards || [];
window.customCards.push({
  type: "tabbed-stack-card",
  name: "Tabbed Stack Card",
  description: "Centered sticky tabs + multiple cards per tab + visual editor",
  preview: !0
});
export {
  Ct as TabbedStackCard
};
