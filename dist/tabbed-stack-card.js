var Lt = Object.create;
var W = Object.defineProperty;
var Dt = Object.getOwnPropertyDescriptor;
var dt = (n, t) => (t = Symbol[n]) ? t : Symbol.for("Symbol." + n), H = (n) => {
  throw TypeError(n);
};
var jt = (n, t, e) => t in n ? W(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var ht = (n, t) => W(n, "name", { value: t, configurable: !0 });
var q = (n) => [, , , Lt((n == null ? void 0 : n[dt("metadata")]) ?? null)], pt = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], U = (n) => n !== void 0 && typeof n != "function" ? H("Function expected") : n, Vt = (n, t, e, s, i) => ({ kind: pt[n], name: t, metadata: s, addInitializer: (r) => e._ ? H("Already initialized") : i.push(U(r || null)) }), Bt = (n, t) => jt(t, dt("metadata"), n[3]), F = (n, t, e, s) => {
  for (var i = 0, r = n[t >> 1], o = r && r.length; i < o; i++) t & 1 ? r[i].call(e) : s = r[i].call(e, s);
  return s;
}, J = (n, t, e, s, i, r) => {
  var o, c, h, l, d, a = t & 7, g = !!(t & 8), p = !!(t & 16), b = a > 3 ? n.length + 1 : a ? g ? 1 : 2 : 0, ot = pt[a + 5], at = a > 3 && (n[b - 1] = []), zt = n[b] || (n[b] = []), _ = a && (!p && !g && (i = i.prototype), a < 5 && (a > 3 || !p) && Dt(a < 4 ? i : { get [e]() {
    return ct(this, r);
  }, set [e](f) {
    return lt(this, r, f);
  } }, e));
  a ? p && a < 4 && ht(r, (a > 2 ? "set " : a > 1 ? "get " : "") + e) : ht(i, e);
  for (var K = s.length - 1; K >= 0; K--)
    l = Vt(a, e, h = {}, n[3], zt), a && (l.static = g, l.private = p, d = l.access = { has: p ? (f) => Kt(i, f) : (f) => e in f }, a ^ 3 && (d.get = p ? (f) => (a ^ 1 ? ct : It)(f, i, a ^ 4 ? r : _.get) : (f) => f[e]), a > 2 && (d.set = p ? (f, I) => lt(f, i, I, a ^ 4 ? r : _.set) : (f, I) => f[e] = I)), c = (0, s[K])(a ? a < 4 ? p ? r : _[ot] : a > 4 ? void 0 : { get: _.get, set: _.set } : i, l), h._ = 1, a ^ 4 || c === void 0 ? U(c) && (a > 4 ? at.unshift(c) : a ? p ? r = c : _[ot] = c : i = c) : typeof c != "object" || c === null ? H("Object expected") : (U(o = c.get) && (_.get = o), U(o = c.set) && (_.set = o), U(o = c.init) && at.unshift(o));
  return a || Bt(n, i), _ && W(i, e, _), p ? a ^ 4 ? r : _ : i;
};
var Z = (n, t, e) => t.has(n) || H("Cannot " + e), Kt = (n, t) => Object(t) !== t ? H('Cannot use the "in" operator on this value') : n.has(t), ct = (n, t, e) => (Z(n, t, "read from private field"), e ? e.call(n) : t.get(n));
var lt = (n, t, e, s) => (Z(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e), It = (n, t, e) => (Z(n, t, "access private method"), e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, it = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, nt = Symbol(), ut = /* @__PURE__ */ new WeakMap();
let Pt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== nt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
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
const Wt = (n) => new Pt(typeof n == "string" ? n : n + "", void 0, nt), Tt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new Pt(e, n, nt);
}, qt = (n, t) => {
  if (it) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = j.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
  }
}, gt = it ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Wt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ft, defineProperty: Jt, getOwnPropertyDescriptor: Zt, getOwnPropertyNames: Xt, getOwnPropertySymbols: Gt, getPrototypeOf: Qt } = Object, v = globalThis, ft = v.trustedTypes, Yt = ft ? ft.emptyScript : "", X = v.reactiveElementPolyfillSupport, N = (n, t) => n, st = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Yt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, Ut = (n, t) => !Ft(n, t), _t = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: Ut };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = _t) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Jt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = Zt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const c = i == null ? void 0 : i.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? _t;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const t = Qt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const e = this.properties, s = [...Xt(e), ...Gt(e)];
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
    return qt(t, this.constructor.elementStyles), t;
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
    var r;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : st).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = s.getPropertyOptions(i), h = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((r = c.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? c.converter : st;
      this._$Em = i;
      const l = h.fromAttribute(e, c.type);
      this[i] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    var o;
    if (t !== void 0) {
      const c = this.constructor;
      if (i === !1 && (r = this[t]), s ?? (s = c.getPropertyOptions(t)), !((s.hasChanged ?? Ut)(r, e) || s.useDefault && s.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(c._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: r }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, o] of i) {
        const { wrapped: c } = o, h = this[r];
        c !== !0 || this._$AL.has(r) || h === void 0 || this.C(r, void 0, o, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[N("elementProperties")] = /* @__PURE__ */ new Map(), w[N("finalized")] = /* @__PURE__ */ new Map(), X == null || X({ ReactiveElement: w }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, $t = (n) => n, V = M.trustedTypes, bt = V ? V.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ht = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, Ot = "?" + m, te = `<${Ot}>`, x = document, R = () => x.createComment(""), z = (n) => n === null || typeof n != "object" && typeof n != "function", rt = Array.isArray, ee = (n) => rt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, mt = /-->/g, vt = />/g, y = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), yt = /'/g, At = /"/g, Nt = /^(?:script|style|textarea|title)$/i, se = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), $ = se(1), P = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Ct = /* @__PURE__ */ new WeakMap(), A = x.createTreeWalker(x, 129);
function Mt(n, t) {
  if (!rt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return bt !== void 0 ? bt.createHTML(t) : t;
}
const ie = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = O;
  for (let c = 0; c < e; c++) {
    const h = n[c];
    let l, d, a = -1, g = 0;
    for (; g < h.length && (o.lastIndex = g, d = o.exec(h), d !== null); ) g = o.lastIndex, o === O ? d[1] === "!--" ? o = mt : d[1] !== void 0 ? o = vt : d[2] !== void 0 ? (Nt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = y) : d[3] !== void 0 && (o = y) : o === y ? d[0] === ">" ? (o = i ?? O, a = -1) : d[1] === void 0 ? a = -2 : (a = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? y : d[3] === '"' ? At : yt) : o === At || o === yt ? o = y : o === mt || o === vt ? o = O : (o = y, i = void 0);
    const p = o === y && n[c + 1].startsWith("/>") ? " " : "";
    r += o === O ? h + te : a >= 0 ? (s.push(l), h.slice(0, a) + Ht + h.slice(a) + m + p) : h + m + (a === -2 ? c : p);
  }
  return [Mt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class L {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const c = t.length - 1, h = this.parts, [l, d] = ie(t, e);
    if (this.el = L.createElement(l, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (i = A.nextNode()) !== null && h.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const a of i.getAttributeNames()) if (a.endsWith(Ht)) {
          const g = d[o++], p = i.getAttribute(a).split(m), b = /([.?@])?(.*)/.exec(g);
          h.push({ type: 1, index: r, name: b[2], strings: p, ctor: b[1] === "." ? re : b[1] === "?" ? oe : b[1] === "@" ? ae : B }), i.removeAttribute(a);
        } else a.startsWith(m) && (h.push({ type: 6, index: r }), i.removeAttribute(a));
        if (Nt.test(i.tagName)) {
          const a = i.textContent.split(m), g = a.length - 1;
          if (g > 0) {
            i.textContent = V ? V.emptyScript : "";
            for (let p = 0; p < g; p++) i.append(a[p], R()), A.nextNode(), h.push({ type: 2, index: ++r });
            i.append(a[g], R());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ot) h.push({ type: 2, index: r });
      else {
        let a = -1;
        for (; (a = i.data.indexOf(m, a + 1)) !== -1; ) h.push({ type: 7, index: r }), a += m.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = x.createElement("template");
    return s.innerHTML = t, s;
  }
}
function T(n, t, e = n, s) {
  var o, c;
  if (t === P) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const r = z(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = T(n, i._$AS(n, t.values), i, s)), t;
}
class ne {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? x).importNode(e, !0);
    A.currentNode = i;
    let r = A.nextNode(), o = 0, c = 0, h = s[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let l;
        h.type === 2 ? l = new D(r, r.nextSibling, this, t) : h.type === 1 ? l = new h.ctor(r, h.name, h.strings, this, t) : h.type === 6 && (l = new he(r, this, t)), this._$AV.push(l), h = s[++c];
      }
      o !== (h == null ? void 0 : h.index) && (r = A.nextNode(), o++);
    }
    return A.currentNode = x, i;
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
    t = T(this, t, e), z(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ee(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && z(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = L.createElement(Mt(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(e);
    else {
      const o = new ne(i, this), c = o.u(this.options);
      o.p(e), this.T(c), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Ct.get(t.strings);
    return e === void 0 && Ct.set(t.strings, e = new L(t)), e;
  }
  k(t) {
    rt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new D(this.O(R()), this.O(R()), this, this.options)) : s = e[i], s._$AI(r), i++;
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
class B {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = T(this, t, e, 0), o = !z(t) || t !== this._$AH && t !== P, o && (this._$AH = t);
    else {
      const c = t;
      let h, l;
      for (t = r[0], h = 0; h < r.length - 1; h++) l = T(this, c[s + h], e, h), l === P && (l = this._$AH[h]), o || (o = !z(l) || l !== this._$AH[h]), l === u ? t = u : t !== u && (t += (l ?? "") + r[h + 1]), this._$AH[h] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class re extends B {
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
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = T(this, t, e, 0) ?? u) === P) return;
    const s = this._$AH, i = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
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
const Q = M.litHtmlPolyfillSupport;
Q == null || Q(L, D), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.2");
const ce = (n, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new D(t.insertBefore(R(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis;
class k extends w {
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
    return P;
  }
}
var Et;
k._$litElement$ = !0, k.finalized = !0, (Et = C.litElementHydrateSupport) == null || Et.call(C, { LitElement: k });
const Y = C.litElementPolyfillSupport;
Y == null || Y({ LitElement: k });
(C.litElementVersions ?? (C.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
var St, tt, le;
St = [Rt("tabbed-stack-card-editor")];
let E = class E extends (le = k) {
  setConfig(t) {
    this._config = t;
  }
  _emitConfigChanged(t) {
    const e = new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  _cloneConfig() {
    return JSON.parse(JSON.stringify(this._config));
  }
  _handleValueChanged(t) {
    if (!this._config) return;
    const e = t.target.configValue, s = t.target.type === "checkbox" ? t.target.checked : t.target.value, i = this._cloneConfig();
    i[e] = s, this._emitConfigChanged(i);
  }
  _addTab() {
    const t = this._cloneConfig(), e = [...t.tabs || []], s = `tab_${Date.now()}`;
    e.push({ id: s, label: "Neuer Tab", icon: "mdi:star", cards: [] }), t.tabs = e, this._emitConfigChanged(t);
  }
  _removeTab(t) {
    const e = this._cloneConfig();
    e.tabs.splice(t, 1), this._emitConfigChanged(e);
  }
  _handleCardChanged(t, e, s) {
    s.stopPropagation();
    const i = this._cloneConfig();
    i.tabs[t].cards[e] = s.detail.value, this._emitConfigChanged(i);
  }
  _addCard(t) {
    const e = this._cloneConfig();
    e.tabs[t].cards || (e.tabs[t].cards = []), e.tabs[t].cards.push({ type: "markdown", content: "Neue Karte" }), this._emitConfigChanged(e);
  }
  _removeCard(t, e) {
    const s = this._cloneConfig();
    s.tabs[t].cards.splice(e, 1), this._emitConfigChanged(s);
  }
  render() {
    return this._config ? $`
      <div class="editor-container">
        <div class="global-settings">
          <div class="row">
             <label>Storage Key (optional)</label>
             <input class="inp" .value=${this._config.storage_key || ""} .configValue=${"storage_key"} @input=${this._handleValueChanged}>
          </div>
          <div class="row checkbox">
             <input type="checkbox" id="sticky" .checked=${this._config.sticky_tabs} .configValue=${"sticky_tabs"} @change=${this._handleValueChanged}>
             <label for="sticky">Sticky Tabs (oben fixiert)</label>
          </div>
        </div>

        <h3>Tabs</h3>
        ${(this._config.tabs || []).map((t, e) => $`
          <div class="tab-card">
            <div class="tab-header">
               <div class="inputs">
                  <input class="inp" placeholder="Label" .value=${t.label || ""} @input=${(s) => {
      const i = this._cloneConfig();
      i.tabs[e].label = s.target.value, this._emitConfigChanged(i);
    }}>
                  <input class="inp" placeholder="Icon (mdi:...)" .value=${t.icon || ""} @input=${(s) => {
      const i = this._cloneConfig();
      i.tabs[e].icon = s.target.value, this._emitConfigChanged(i);
    }}>
               </div>
               <button class="btn danger" @click=${() => this._removeTab(e)}>X</button>
            </div>

            <div class="cards-list">
              ${(t.cards || []).map((s, i) => $`
                <div class="card-item">
                   <div class="card-top">
                      <span>${s.type}</span>
                      <button class="btn-xs danger" @click=${() => this._removeCard(e, i)}>Löschen</button>
                   </div>
                   <hui-card-element-editor
                      .hass=${this.hass}
                      .value=${s}
                      .lovelace=${this.lovelace}
                      @value-changed=${(r) => this._handleCardChanged(e, i, r)}
                   ></hui-card-element-editor>
                </div>
              `)}
              <button class="btn add-btn" @click=${() => this._addCard(e)}>+ Karte hinzufügen</button>
            </div>
          </div>
        `)}
        <button class="btn big-add" @click=${this._addTab}>Neuen Tab hinzufügen</button>
      </div>
    ` : $`<div style="padding: 20px;">Lade Konfiguration...</div>`;
  }
};
tt = q(le), E = J(tt, 0, "TabbedStackCardEditor", St, E), E.styles = Tt`
    .editor-container { padding: 10px; border: 1px solid transparent; }
    .inp { padding: 8px; width: 100%; box-sizing: border-box; border-radius: 5px; border: 1px solid #ccc; margin-bottom: 5px;}
    .row { margin-bottom: 10px; }
    .checkbox { display: flex; align-items: center; gap: 10px; }
    .tab-card { background: rgba(127,127,127,0.1); padding: 10px; border-radius: 8px; margin-bottom: 15px; border: 1px solid rgba(127,127,127,0.2); }
    .tab-header { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px; }
    .inputs { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
    .card-item { background: var(--card-background-color, #fff); border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 5px; }
    .card-top { display: flex; justify-content: space-between; font-size: 0.8em; margin-bottom: 5px; opacity: 0.7; font-weight: bold; text-transform: uppercase; }
    .btn { cursor: pointer; border: none; padding: 5px 10px; border-radius: 5px; background: #ddd; }
    .btn.danger { background: #f44336; color: white; }
    .btn.add-btn { background: #2196F3; color: white; width: 100%; margin-top: 5px;}
    .btn.big-add { background: #4CAF50; color: white; width: 100%; padding: 10px; font-weight: bold;}
    .btn-xs { font-size: 10px; padding: 2px 5px; }
  `, F(tt, 1, E);
let xt = E;
var kt, et, de;
kt = [Rt("tabbed-stack-card")];
let S = class S extends (de = k) {
  constructor() {
    super(...arguments), this._activeTab = "";
  }
  // Editor Konfiguration
  static getConfigElement() {
    return document.createElement("tabbed-stack-card-editor");
  }
  static getStubConfig() {
    return {
      sticky_tabs: !1,
      tabs: [
        { id: "t1", label: "Tab 1", icon: "mdi:home", cards: [{ type: "markdown", content: "Willkommen!" }] },
        { id: "t2", label: "Tab 2", icon: "mdi:lightbulb", cards: [] }
      ]
    };
  }
  set hass(t) {
    this._hass = t, this._cardElement && (this._cardElement.hass = t);
  }
  get hass() {
    return this._hass;
  }
  setConfig(t) {
    if (!t) throw new Error("Keine Konfiguration");
    if (this._config = t, this._config.tabs && this._config.tabs.length > 0) {
      const e = this._config.storage_key ? localStorage.getItem(this._config.storage_key) : null;
      e && this._config.tabs.some((i) => i.id === e) ? this._activeTab = e : this._activeTab || (this._activeTab = this._config.default_tab || this._config.tabs[0].id);
    }
    this._buildCard();
  }
  _setTab(t) {
    this._activeTab = t, this._config.storage_key && localStorage.setItem(this._config.storage_key, t), this._buildCard();
  }
  async _buildCard() {
    if (!(!this._config || !this._activeTab))
      try {
        if (!this._helpers)
          if (window.loadCardHelpers)
            this._helpers = await window.loadCardHelpers();
          else
            throw new Error("Card Helpers nicht verfügbar.");
        const t = this._config.tabs.find((i) => i.id === this._activeTab) || this._config.tabs[0];
        if (!t) return;
        const s = {
          type: "vertical-stack",
          cards: t.cards || []
        };
        this._cardElement = this._helpers.createCardElement(s), this._hass && (this._cardElement.hass = this._hass), this.requestUpdate();
      } catch (t) {
        console.error("TabbedStackCard Error:", t), this._error = t.message, this.requestUpdate();
      }
  }
  render() {
    if (!this._config) return $``;
    if (this._error) return $`<div style="color: red; padding: 10px; border: 1px solid red;">Fehler: ${this._error}</div>`;
    const t = this._config.tabs || [];
    return $`
      <div class="tabs-container ${this._config.sticky_tabs ? "sticky" : ""}">
        <div class="tabs-scroll">
            ${t.map((e) => $`
            <button 
                class="chip ${e.id === this._activeTab ? "active" : ""}"
                @click=${() => this._setTab(e.id)}
            >
                ${e.icon ? $`<ha-icon .icon="${e.icon}"></ha-icon>` : ""}
                <span>${e.label || e.id}</span>
            </button>
            `)}
        </div>
      </div>

      <div class="content">
        ${this._cardElement ? this._cardElement : $`<div class="loading">Lade Karten... (Helpers: ${!!this._helpers})</div>`}
      </div>
    `;
  }
};
et = q(de), S = J(et, 0, "TabbedStackCard", kt, S), S.styles = Tt`
    :host { display: block; }
    .tabs-container { 
        padding: 8px 0; 
        background: var(--tsc-bg, transparent);
        margin: 0 -4px; /* Leichter Überhang für bessere Optik */
    }
    .tabs-container.sticky {
        position: sticky; top: 0; z-index: 5;
        background: var(--card-background-color, rgba(255,255,255,0.9));
        backdrop-filter: blur(5px);
    }
    .tabs-scroll {
        display: flex; gap: 8px; overflow-x: auto; padding: 0 4px;
        scrollbar-width: none; /* Firefox */
    }
    .tabs-scroll::-webkit-scrollbar { display: none; }
    
    .chip {
        display: flex; align-items: center; gap: 6px;
        padding: 8px 16px; border-radius: 18px; border: none;
        background: var(--secondary-background-color, #e0e0e0);
        color: var(--primary-text-color);
        font-weight: 500; cursor: pointer; white-space: nowrap;
        transition: background 0.2s;
    }
    .chip.active {
        background: var(--primary-color, #03a9f4);
        color: var(--text-primary-color, #fff);
    }
    .chip.active ha-icon { color: inherit; }
    
    .content { margin-top: 8px; min-height: 50px; }
    .loading { opacity: 0.6; font-style: italic; padding: 20px; text-align: center;}
  `, F(et, 1, S);
let wt = S;
window.customCards = window.customCards || [];
window.customCards.push({
  type: "tabbed-stack-card",
  name: "Tabbed Stack Card",
  description: "Tabs für deine Karten"
});
export {
  wt as TabbedStackCard,
  xt as TabbedStackCardEditor
};
