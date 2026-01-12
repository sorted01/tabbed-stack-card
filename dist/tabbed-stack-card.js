var zt = Object.create;
var W = Object.defineProperty;
var Dt = Object.getOwnPropertyDescriptor;
var dt = (r, t) => (t = Symbol[r]) ? t : Symbol.for("Symbol." + r), N = (r) => {
  throw TypeError(r);
};
var Lt = (r, t, e) => t in r ? W(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var ht = (r, t) => W(r, "name", { value: t, configurable: !0 });
var K = (r) => [, , , zt((r == null ? void 0 : r[dt("metadata")]) ?? null)], pt = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], k = (r) => r !== void 0 && typeof r != "function" ? N("Function expected") : r, jt = (r, t, e, s, i) => ({ kind: pt[r], name: t, metadata: s, addInitializer: (n) => e._ ? N("Already initialized") : i.push(k(n || null)) }), Bt = (r, t) => Lt(t, dt("metadata"), r[3]), q = (r, t, e, s) => {
  for (var i = 0, n = r[t >> 1], o = n && n.length; i < o; i++) t & 1 ? n[i].call(e) : s = n[i].call(e, s);
  return s;
}, Z = (r, t, e, s, i, n) => {
  var o, c, h, l, d, a = t & 7, $ = !!(t & 8), p = !!(t & 16), m = a > 3 ? r.length + 1 : a ? $ ? 1 : 2 : 0, ot = pt[a + 5], at = a > 3 && (r[m - 1] = []), It = r[m] || (r[m] = []), _ = a && (!p && !$ && (i = i.prototype), a < 5 && (a > 3 || !p) && Dt(a < 4 ? i : { get [e]() {
    return ct(this, n);
  }, set [e](f) {
    return lt(this, n, f);
  } }, e));
  a ? p && a < 4 && ht(n, (a > 2 ? "set " : a > 1 ? "get " : "") + e) : ht(i, e);
  for (var J = s.length - 1; J >= 0; J--)
    l = jt(a, e, h = {}, r[3], It), a && (l.static = $, l.private = p, d = l.access = { has: p ? (f) => Jt(i, f) : (f) => e in f }, a ^ 3 && (d.get = p ? (f) => (a ^ 1 ? ct : Vt)(f, i, a ^ 4 ? n : _.get) : (f) => f[e]), a > 2 && (d.set = p ? (f, V) => lt(f, i, V, a ^ 4 ? n : _.set) : (f, V) => f[e] = V)), c = (0, s[J])(a ? a < 4 ? p ? n : _[ot] : a > 4 ? void 0 : { get: _.get, set: _.set } : i, l), h._ = 1, a ^ 4 || c === void 0 ? k(c) && (a > 4 ? at.unshift(c) : a ? p ? n = c : _[ot] = c : i = c) : typeof c != "object" || c === null ? N("Object expected") : (k(o = c.get) && (_.get = o), k(o = c.set) && (_.set = o), k(o = c.init) && at.unshift(o));
  return a || Bt(r, i), _ && W(i, e, _), p ? a ^ 4 ? n : _ : i;
};
var F = (r, t, e) => t.has(r) || N("Cannot " + e), Jt = (r, t) => Object(t) !== t ? N('Cannot use the "in" operator on this value') : r.has(t), ct = (r, t, e) => (F(r, t, "read from private field"), e ? e.call(r) : t.get(r));
var lt = (r, t, e, s) => (F(r, t, "write to private field"), s ? s.call(r, e) : t.set(r, e), e), Vt = (r, t, e) => (F(r, t, "access private method"), e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, it = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = Symbol(), ut = /* @__PURE__ */ new WeakMap();
let Ot = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (it && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ut.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ut.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Wt = (r) => new Ot(typeof r == "string" ? r : r + "", void 0, rt), Tt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new Ot(e, r, rt);
}, Kt = (r, t) => {
  if (it) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = L.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, $t = it ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Wt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: qt, defineProperty: Zt, getOwnPropertyDescriptor: Ft, getOwnPropertyNames: Gt, getOwnPropertySymbols: Qt, getPrototypeOf: Xt } = Object, v = globalThis, ft = v.trustedTypes, Yt = ft ? ft.emptyScript : "", G = v.reactiveElementPolyfillSupport, H = (r, t) => r, st = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Yt : null;
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
} }, kt = (r, t) => !qt(r, t), _t = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: kt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = _t) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Zt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Ft(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const c = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? _t;
  }
  static _$Ei() {
    if (this.hasOwnProperty(H("elementProperties"))) return;
    const t = Xt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(H("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(H("properties"))) {
      const e = this.properties, s = [...Gt(e), ...Qt(e)];
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
      for (const i of s) e.unshift($t(i));
    } else t !== void 0 && e.push($t(t));
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
    return Kt(t, this.constructor.elementStyles), t;
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
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : st).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = s.getPropertyOptions(i), h = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : st;
      this._$Em = i;
      const l = h.fromAttribute(e, c.type);
      this[i] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    var o;
    if (t !== void 0) {
      const c = this.constructor;
      if (i === !1 && (n = this[t]), s ?? (s = c.getPropertyOptions(t)), !((s.hasChanged ?? kt)(n, e) || s.useDefault && s.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(c._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: c } = o, h = this[n];
        c !== !0 || this._$AL.has(n) || h === void 0 || this.C(n, void 0, o, h);
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
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[H("elementProperties")] = /* @__PURE__ */ new Map(), x[H("finalized")] = /* @__PURE__ */ new Map(), G == null || G({ ReactiveElement: x }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, gt = (r) => r, j = M.trustedTypes, mt = j ? j.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Nt = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, Ut = "?" + b, te = `<${Ut}>`, E = document, R = () => E.createComment(""), I = (r) => r === null || typeof r != "object" && typeof r != "function", nt = Array.isArray, ee = (r) => nt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, bt = /-->/g, vt = />/g, y = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), yt = /'/g, At = /"/g, Ht = /^(?:script|style|textarea|title)$/i, se = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), g = se(1), O = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), wt = /* @__PURE__ */ new WeakMap(), A = E.createTreeWalker(E, 129);
function Mt(r, t) {
  if (!nt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return mt !== void 0 ? mt.createHTML(t) : t;
}
const ie = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = U;
  for (let c = 0; c < e; c++) {
    const h = r[c];
    let l, d, a = -1, $ = 0;
    for (; $ < h.length && (o.lastIndex = $, d = o.exec(h), d !== null); ) $ = o.lastIndex, o === U ? d[1] === "!--" ? o = bt : d[1] !== void 0 ? o = vt : d[2] !== void 0 ? (Ht.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = y) : d[3] !== void 0 && (o = y) : o === y ? d[0] === ">" ? (o = i ?? U, a = -1) : d[1] === void 0 ? a = -2 : (a = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? y : d[3] === '"' ? At : yt) : o === At || o === yt ? o = y : o === bt || o === vt ? o = U : (o = y, i = void 0);
    const p = o === y && r[c + 1].startsWith("/>") ? " " : "";
    n += o === U ? h + te : a >= 0 ? (s.push(l), h.slice(0, a) + Nt + h.slice(a) + b + p) : h + b + (a === -2 ? c : p);
  }
  return [Mt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class z {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, h = this.parts, [l, d] = ie(t, e);
    if (this.el = z.createElement(l, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (i = A.nextNode()) !== null && h.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const a of i.getAttributeNames()) if (a.endsWith(Nt)) {
          const $ = d[o++], p = i.getAttribute(a).split(b), m = /([.?@])?(.*)/.exec($);
          h.push({ type: 1, index: n, name: m[2], strings: p, ctor: m[1] === "." ? ne : m[1] === "?" ? oe : m[1] === "@" ? ae : B }), i.removeAttribute(a);
        } else a.startsWith(b) && (h.push({ type: 6, index: n }), i.removeAttribute(a));
        if (Ht.test(i.tagName)) {
          const a = i.textContent.split(b), $ = a.length - 1;
          if ($ > 0) {
            i.textContent = j ? j.emptyScript : "";
            for (let p = 0; p < $; p++) i.append(a[p], R()), A.nextNode(), h.push({ type: 2, index: ++n });
            i.append(a[$], R());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ut) h.push({ type: 2, index: n });
      else {
        let a = -1;
        for (; (a = i.data.indexOf(b, a + 1)) !== -1; ) h.push({ type: 7, index: n }), a += b.length - 1;
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
  var o, c;
  if (t === O) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = I(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = T(r, i._$AS(r, t.values), i, s)), t;
}
class re {
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
    A.currentNode = i;
    let n = A.nextNode(), o = 0, c = 0, h = s[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let l;
        h.type === 2 ? l = new D(n, n.nextSibling, this, t) : h.type === 1 ? l = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && (l = new he(n, this, t)), this._$AV.push(l), h = s[++c];
      }
      o !== (h == null ? void 0 : h.index) && (n = A.nextNode(), o++);
    }
    return A.currentNode = E, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class D {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = T(this, t, e), I(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== O && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ee(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && I(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = z.createElement(Mt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new re(i, this), c = o.u(this.options);
      o.p(e), this.T(c), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = wt.get(t.strings);
    return e === void 0 && wt.set(t.strings, e = new z(t)), e;
  }
  k(t) {
    nt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new D(this.O(R()), this.O(R()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = gt(t).nextSibling;
      gt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class B {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = T(this, t, e, 0), o = !I(t) || t !== this._$AH && t !== O, o && (this._$AH = t);
    else {
      const c = t;
      let h, l;
      for (t = n[0], h = 0; h < n.length - 1; h++) l = T(this, c[s + h], e, h), l === O && (l = this._$AH[h]), o || (o = !I(l) || l !== this._$AH[h]), l === u ? t = u : t !== u && (t += (l ?? "") + n[h + 1]), this._$AH[h] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ne extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class oe extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class ae extends B {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = T(this, t, e, 0) ?? u) === O) return;
    const s = this._$AH, i = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== u && (s === u || i);
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
const X = M.litHtmlPolyfillSupport;
X == null || X(z, D), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.2");
const ce = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new D(t.insertBefore(R(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class P extends x {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ce(e, this.renderRoot, this.renderOptions);
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
    return O;
  }
}
var Ct;
P._$litElement$ = !0, P.finalized = !0, (Ct = w.litElementHydrateSupport) == null || Ct.call(w, { LitElement: P });
const Y = w.litElementPolyfillSupport;
Y == null || Y({ LitElement: P });
(w.litElementVersions ?? (w.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
var St, tt, le;
St = [Rt("tabbed-stack-card-editor")];
let C = class C extends (le = P) {
  constructor() {
    super(...arguments), this._activeTabEditor = null;
  }
  // HA setzt die Config über diese Methode
  setConfig(t) {
    this._config = t;
  }
  // Sicherheits-Setter für den Fall, dass HA direkt auf das Property zugreift
  set config(t) {
    this._config = t;
  }
  _fireConfigChanged(t) {
    const e = new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  _updateTabProp(t, e, s) {
    const i = JSON.parse(JSON.stringify(this._config));
    i.tabs[t][e] = s, this._fireConfigChanged(i);
  }
  _addTab() {
    const t = JSON.parse(JSON.stringify(this._config || { tabs: [] }));
    t.tabs || (t.tabs = []), t.tabs.push({
      id: `tab_${Date.now()}`,
      label: "Neuer Tab",
      icon: "mdi:view-dashboard",
      cards: []
    }), this._fireConfigChanged(t);
  }
  _addCard(t) {
    const e = JSON.parse(JSON.stringify(this._config));
    e.tabs[t].cards.push({ type: "markdown", content: "Neue Karte" }), this._fireConfigChanged(e);
  }
  render() {
    if (!this._config) return g`<div style="padding: 20px;">Initialisiere Konfiguration...</div>`;
    const t = this._config.tabs || [];
    return g`
      <div class="editor-container">
        <div class="setting-row">
            <ha-switch 
                .checked=${this._config.sticky === !0} 
                @change=${(e) => this._fireConfigChanged({ ...this._config, sticky: e.target.checked })}
            ></ha-switch>
            <span style="margin-left: 10px;">Tabs oben anheften (Sticky)</span>
        </div>

        <div class="tab-list">
            ${t.map((e, s) => {
      var i;
      return g`
                <div class="tab-item">
                    <div class="tab-header-row" @click=${() => this._activeTabEditor = this._activeTabEditor === s ? null : s}>
                        <ha-icon .icon=${e.icon || "mdi:folder"}></ha-icon>
                        <span class="tab-label">${e.label || e.id}</span>
                        <ha-icon icon="mdi:chevron-down"></ha-icon>
                    </div>

                    ${this._activeTabEditor === s ? g`
                        <div class="tab-details">
                            <ha-textfield label="Label" .value=${e.label || ""} @input=${(n) => this._updateTabProp(s, "label", n.target.value)}></ha-textfield>
                            <ha-textfield label="Icon" .value=${e.icon || ""} @input=${(n) => this._updateTabProp(s, "icon", n.target.value)}></ha-textfield>
                            
                            <p><strong>Karten in diesem Tab:</strong></p>
                            ${(i = e.cards) == null ? void 0 : i.map((n, o) => g`
                                <div class="card-editor-box">
                                    <div class="card-editor-header">Karte: ${n.type}</div>
                                    <hui-card-element-editor
                                        .hass=${this.hass}
                                        .value=${n}
                                        .lovelace=${this.lovelace}
                                        @value-changed=${(c) => {
        c.stopPropagation();
        const h = JSON.parse(JSON.stringify(this._config));
        h.tabs[s].cards[o] = c.detail.value, this._fireConfigChanged(h);
      }}
                                    ></hui-card-element-editor>
                                </div>
                            `)}
                            <mwc-button raised @click=${() => this._addCard(s)}>+ Karte hinzufügen</mwc-button>
                        </div>
                    ` : ""}
                </div>
            `;
    })}
        </div>
        <mwc-button raised class="add-tab-btn" @click=${this._addTab}>+ Neuen Tab hinzufügen</mwc-button>
      </div>
    `;
  }
};
tt = K(le), C = Z(tt, 0, "TabbedStackCardEditor", St, C), C.styles = Tt`
    .editor-container { display: flex; flex-direction: column; gap: 10px; padding: 10px; }
    .setting-row { display: flex; align-items: center; margin-bottom: 10px; }
    .tab-item { border: 1px solid var(--divider-color); border-radius: 8px; margin-bottom: 8px; overflow: hidden; }
    .tab-header-row { display: flex; align-items: center; padding: 12px; cursor: pointer; background: var(--secondary-background-color); gap: 10px; }
    .tab-label { flex: 1; font-weight: bold; }
    .tab-details { padding: 15px; display: flex; flex-direction: column; gap: 10px; background: var(--card-background-color); }
    .card-editor-box { border: 1px dashed var(--divider-color); padding: 10px; margin-bottom: 10px; border-radius: 4px; }
    .card-editor-header { font-size: 0.8em; opacity: 0.7; margin-bottom: 5px; font-weight: bold; }
    ha-textfield { width: 100%; }
    .add-tab-btn { margin-top: 10px; --mdc-theme-primary: var(--primary-color); }
  `, q(tt, 1, C);
let Et = C;
var Pt, et, de;
Pt = [Rt("tabbed-stack-card")];
let S = class S extends (de = P) {
  constructor() {
    super(...arguments), this._activeTabId = "";
  }
  static getConfigElement() {
    return document.createElement("tabbed-stack-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:tabbed-stack-card",
      sticky: !1,
      tabs: [{ id: "tab1", label: "Home", icon: "mdi:home", cards: [] }]
    };
  }
  setConfig(t) {
    var e;
    this._config = t, ((e = t.tabs) == null ? void 0 : e.length) > 0 && !this._activeTabId && (this._activeTabId = t.tabs[0].id), this._updateChildCard();
  }
  async _updateChildCard() {
    var e, s, i, n;
    const t = ((s = (e = this._config) == null ? void 0 : e.tabs) == null ? void 0 : s.find((o) => o.id === this._activeTabId)) || ((n = (i = this._config) == null ? void 0 : i.tabs) == null ? void 0 : n[0]);
    t && (!this._helpers && window.loadCardHelpers && (this._helpers = await window.loadCardHelpers()), this._helpers && (this._cardElement = this._helpers.createCardElement({
      type: "vertical-stack",
      cards: t.cards || []
    }), this._cardElement.hass = this.hass));
  }
  updated(t) {
    t.has("hass") && this._cardElement && (this._cardElement.hass = this.hass);
  }
  render() {
    var t;
    return this._config ? g`
      <div class="main-container">
        <div class="tabs-bar ${this._config.sticky ? "sticky" : ""}">
          <div class="scroll-wrapper">
            ${(t = this._config.tabs) == null ? void 0 : t.map((e) => g`
              <button 
                class="tab-btn ${this._activeTabId === e.id ? "active" : ""}"
                @click=${() => {
      this._activeTabId = e.id, this._updateChildCard();
    }}
              >
                ${e.icon ? g`<ha-icon .icon=${e.icon}></ha-icon>` : ""}
                <span>${e.label}</span>
              </button>
            `)}
          </div>
        </div>
        <div class="content-area">${this._cardElement}</div>
      </div>
    ` : g``;
  }
};
et = K(de), S = Z(et, 0, "TabbedStackCard", Pt, S), S.styles = Tt`
    .main-container { width: 100%; }
    .tabs-bar { padding: 12px 0; z-index: 10; transition: background 0.3s; }
    .tabs-bar.sticky { 
        position: sticky; top: 0; 
        background: var(--ha-card-background, var(--card-background-color, white)); 
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .scroll-wrapper { display: flex; justify-content: center; gap: 10px; overflow-x: auto; scrollbar-width: none; }
    .scroll-wrapper::-webkit-scrollbar { display: none; }
    .tab-btn { 
        display: flex; align-items: center; gap: 8px; padding: 10px 18px; 
        border: none; border-radius: 25px; cursor: pointer;
        background: var(--secondary-background-color); color: var(--primary-text-color);
        font-weight: 500; transition: 0.2s;
    }
    .tab-btn.active { 
        background: var(--primary-color); color: var(--text-primary-color, white); 
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    .content-area { margin-top: 10px; }
  `, q(et, 1, S);
let xt = S;
window.customCards = window.customCards || [];
window.customCards.push({
  type: "tabbed-stack-card",
  name: "Tabbed Stack Card (Fixed)",
  description: "Tabs mit zentriertem Design und funktionierendem Editor",
  preview: !0
});
export {
  xt as TabbedStackCard,
  Et as TabbedStackCardEditor
};
