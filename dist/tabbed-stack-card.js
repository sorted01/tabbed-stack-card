var Rt = Object.create;
var W = Object.defineProperty;
var zt = Object.getOwnPropertyDescriptor;
var dt = (n, t) => (t = Symbol[n]) ? t : Symbol.for("Symbol." + n), T = (n) => {
  throw TypeError(n);
};
var It = (n, t, e) => t in n ? W(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var ht = (n, t) => W(n, "name", { value: t, configurable: !0 });
var q = (n) => [, , , Rt((n == null ? void 0 : n[dt("metadata")]) ?? null)], pt = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], H = (n) => n !== void 0 && typeof n != "function" ? T("Function expected") : n, Dt = (n, t, e, s, i) => ({ kind: pt[n], name: t, metadata: s, addInitializer: (r) => e._ ? T("Already initialized") : i.push(H(r || null)) }), Lt = (n, t) => It(t, dt("metadata"), n[3]), K = (n, t, e, s) => {
  for (var i = 0, r = n[t >> 1], o = r && r.length; i < o; i++) t & 1 ? r[i].call(e) : s = r[i].call(e, s);
  return s;
}, Z = (n, t, e, s, i, r) => {
  var o, c, h, l, d, a = t & 7, $ = !!(t & 8), p = !!(t & 16), g = a > 3 ? n.length + 1 : a ? $ ? 1 : 2 : 0, ot = pt[a + 5], at = a > 3 && (n[g - 1] = []), Mt = n[g] || (n[g] = []), f = a && (!p && !$ && (i = i.prototype), a < 5 && (a > 3 || !p) && zt(a < 4 ? i : { get [e]() {
    return ct(this, r);
  }, set [e](_) {
    return lt(this, r, _);
  } }, e));
  a ? p && a < 4 && ht(r, (a > 2 ? "set " : a > 1 ? "get " : "") + e) : ht(i, e);
  for (var B = s.length - 1; B >= 0; B--)
    l = Dt(a, e, h = {}, n[3], Mt), a && (l.static = $, l.private = p, d = l.access = { has: p ? (_) => jt(i, _) : (_) => e in _ }, a ^ 3 && (d.get = p ? (_) => (a ^ 1 ? ct : Bt)(_, i, a ^ 4 ? r : f.get) : (_) => _[e]), a > 2 && (d.set = p ? (_, V) => lt(_, i, V, a ^ 4 ? r : f.set) : (_, V) => _[e] = V)), c = (0, s[B])(a ? a < 4 ? p ? r : f[ot] : a > 4 ? void 0 : { get: f.get, set: f.set } : i, l), h._ = 1, a ^ 4 || c === void 0 ? H(c) && (a > 4 ? at.unshift(c) : a ? p ? r = c : f[ot] = c : i = c) : typeof c != "object" || c === null ? T("Object expected") : (H(o = c.get) && (f.get = o), H(o = c.set) && (f.set = o), H(o = c.init) && at.unshift(o));
  return a || Lt(n, i), f && W(i, e, f), p ? a ^ 4 ? r : f : i;
};
var J = (n, t, e) => t.has(n) || T("Cannot " + e), jt = (n, t) => Object(t) !== t ? T('Cannot use the "in" operator on this value') : n.has(t), ct = (n, t, e) => (J(n, t, "read from private field"), e ? e.call(n) : t.get(n));
var lt = (n, t, e, s) => (J(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e), Bt = (n, t, e) => (J(n, t, "access private method"), e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, it = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, nt = Symbol(), ut = /* @__PURE__ */ new WeakMap();
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
const Vt = (n) => new Pt(typeof n == "string" ? n : n + "", void 0, nt), Wt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new Pt(e, n, nt);
}, qt = (n, t) => {
  if (it) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = D.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
  }
}, $t = it ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Vt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Kt, defineProperty: Zt, getOwnPropertyDescriptor: Jt, getOwnPropertyNames: Ft, getOwnPropertySymbols: Gt, getPrototypeOf: Qt } = Object, y = globalThis, _t = y.trustedTypes, Xt = _t ? _t.emptyScript : "", F = y.reactiveElementPolyfillSupport, k = (n, t) => n, st = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Xt : null;
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
} }, Ut = (n, t) => !Kt(n, t), ft = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: Ut };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ft) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Zt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = Jt(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = Qt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const e = this.properties, s = [...Ft(e), ...Gt(e)];
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[k("elementProperties")] = /* @__PURE__ */ new Map(), S[k("finalized")] = /* @__PURE__ */ new Map(), F == null || F({ ReactiveElement: S }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, gt = (n) => n, L = N.trustedTypes, mt = L ? L.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ht = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, Tt = "?" + m, Yt = `<${Tt}>`, E = document, M = () => E.createComment(""), R = (n) => n === null || typeof n != "object" && typeof n != "function", rt = Array.isArray, te = (n) => rt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yt = /-->/g, bt = />/g, b = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), At = /'/g, vt = /"/g, Ot = /^(?:script|style|textarea|title)$/i, ee = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), x = ee(1), P = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Et = /* @__PURE__ */ new WeakMap(), A = E.createTreeWalker(E, 129);
function kt(n, t) {
  if (!rt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return mt !== void 0 ? mt.createHTML(t) : t;
}
const se = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = O;
  for (let c = 0; c < e; c++) {
    const h = n[c];
    let l, d, a = -1, $ = 0;
    for (; $ < h.length && (o.lastIndex = $, d = o.exec(h), d !== null); ) $ = o.lastIndex, o === O ? d[1] === "!--" ? o = yt : d[1] !== void 0 ? o = bt : d[2] !== void 0 ? (Ot.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = b) : d[3] !== void 0 && (o = b) : o === b ? d[0] === ">" ? (o = i ?? O, a = -1) : d[1] === void 0 ? a = -2 : (a = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? b : d[3] === '"' ? vt : At) : o === vt || o === At ? o = b : o === yt || o === bt ? o = O : (o = b, i = void 0);
    const p = o === b && n[c + 1].startsWith("/>") ? " " : "";
    r += o === O ? h + Yt : a >= 0 ? (s.push(l), h.slice(0, a) + Ht + h.slice(a) + m + p) : h + m + (a === -2 ? c : p);
  }
  return [kt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class z {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const c = t.length - 1, h = this.parts, [l, d] = se(t, e);
    if (this.el = z.createElement(l, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (i = A.nextNode()) !== null && h.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const a of i.getAttributeNames()) if (a.endsWith(Ht)) {
          const $ = d[o++], p = i.getAttribute(a).split(m), g = /([.?@])?(.*)/.exec($);
          h.push({ type: 1, index: r, name: g[2], strings: p, ctor: g[1] === "." ? ne : g[1] === "?" ? re : g[1] === "@" ? oe : j }), i.removeAttribute(a);
        } else a.startsWith(m) && (h.push({ type: 6, index: r }), i.removeAttribute(a));
        if (Ot.test(i.tagName)) {
          const a = i.textContent.split(m), $ = a.length - 1;
          if ($ > 0) {
            i.textContent = L ? L.emptyScript : "";
            for (let p = 0; p < $; p++) i.append(a[p], M()), A.nextNode(), h.push({ type: 2, index: ++r });
            i.append(a[$], M());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Tt) h.push({ type: 2, index: r });
      else {
        let a = -1;
        for (; (a = i.data.indexOf(m, a + 1)) !== -1; ) h.push({ type: 7, index: r }), a += m.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = E.createElement("template");
    return s.innerHTML = t, s;
  }
}
function U(n, t, e = n, s) {
  var o, c;
  if (t === P) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const r = R(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = U(n, i._$AS(n, t.values), i, s)), t;
}
class ie {
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
    let r = A.nextNode(), o = 0, c = 0, h = s[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let l;
        h.type === 2 ? l = new I(r, r.nextSibling, this, t) : h.type === 1 ? l = new h.ctor(r, h.name, h.strings, this, t) : h.type === 6 && (l = new ae(r, this, t)), this._$AV.push(l), h = s[++c];
      }
      o !== (h == null ? void 0 : h.index) && (r = A.nextNode(), o++);
    }
    return A.currentNode = E, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class I {
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
    t = U(this, t, e), R(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : te(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && R(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = z.createElement(kt(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(e);
    else {
      const o = new ie(i, this), c = o.u(this.options);
      o.p(e), this.T(c), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Et.get(t.strings);
    return e === void 0 && Et.set(t.strings, e = new z(t)), e;
  }
  k(t) {
    rt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new I(this.O(M()), this.O(M()), this, this.options)) : s = e[i], s._$AI(r), i++;
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
class j {
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
    if (r === void 0) t = U(this, t, e, 0), o = !R(t) || t !== this._$AH && t !== P, o && (this._$AH = t);
    else {
      const c = t;
      let h, l;
      for (t = r[0], h = 0; h < r.length - 1; h++) l = U(this, c[s + h], e, h), l === P && (l = this._$AH[h]), o || (o = !R(l) || l !== this._$AH[h]), l === u ? t = u : t !== u && (t += (l ?? "") + r[h + 1]), this._$AH[h] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ne extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class re extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class oe extends j {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = U(this, t, e, 0) ?? u) === P) return;
    const s = this._$AH, i = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ae {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    U(this, t);
  }
}
const Q = N.litHtmlPolyfillSupport;
Q == null || Q(z, I), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.3.2");
const he = (n, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new I(t.insertBefore(M(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class C extends S {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = he(e, this.renderRoot, this.renderOptions);
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
var wt;
C._$litElement$ = !0, C.finalized = !0, (wt = v.litElementHydrateSupport) == null || wt.call(v, { LitElement: C });
const X = v.litElementPolyfillSupport;
X == null || X({ LitElement: C });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
var xt, tt, ce;
xt = [Nt("tabbed-stack-card-editor")];
class Y extends (ce = C) {
  setConfig(t) {
    this._config = t;
  }
  _dispatch(t) {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return this._config ? x`
      <div style="padding: 10px;">
        <p><b>Globale Einstellungen</b></p>
        <label>
          <input type="checkbox" .checked=${this._config.sticky} 
            @change=${(t) => this._dispatch({ ...this._config, sticky: t.target.checked })}>
          Tabs oben anheften (Sticky)
        </label>

        <hr>
        <p><b>Tabs bearbeiten</b></p>
        ${(this._config.tabs || []).map((t, e) => x`
          <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
            <input style="width: 100%; margin-bottom: 5px;" .value=${t.label || ""} placeholder="Tab Name"
              @input=${(s) => {
      const i = [...this._config.tabs];
      i[e] = { ...i[e], label: s.target.value }, this._dispatch({ ...this._config, tabs: i });
    }}>
            <input style="width: 100%;" .value=${t.icon || ""} placeholder="Icon (z.B. mdi:lightbulb)"
              @input=${(s) => {
      const i = [...this._config.tabs];
      i[e] = { ...i[e], icon: s.target.value }, this._dispatch({ ...this._config, tabs: i });
    }}>
            <button style="margin-top: 5px; color: red;" @click=${() => {
      const s = [...this._config.tabs];
      s.splice(e, 1), this._dispatch({ ...this._config, tabs: s });
    }}>Tab löschen</button>
          </div>
        `)}
        <button style="width: 100%; padding: 10px;" @click=${() => {
      const t = [...this._config.tabs || []];
      t.push({ id: "tab_" + Date.now(), label: "Neuer Tab", icon: "mdi:star", cards: [] }), this._dispatch({ ...this._config, tabs: t });
    }}>+ Tab hinzufügen</button>
        <p style="font-size: 0.8em; color: gray; margin-top: 10px;">
          Nutze den "Code-Editor anzeigen" unten, um Karten (Cards) zu den Tabs hinzuzufügen.
        </p>
      </div>
    ` : x`<div>Lade Konfiguration...</div>`;
  }
}
tt = q(ce), Y = Z(tt, 0, "TabbedStackCardEditor", xt, Y), K(tt, 1, Y);
var Ct, et, le;
Ct = [Nt("tabbed-stack-card")];
let w = class w extends (le = C) {
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
    this._config = t, t.tabs && t.tabs.length > 0 && !this._activeTabId && (this._activeTabId = t.tabs[0].id), this._updateContent();
  }
  async _updateContent() {
    if (!this._config || !this.hass) return;
    const t = this._config.tabs.find((i) => i.id === this._activeTabId) || this._config.tabs[0], s = (await window.loadCardHelpers()).createCardElement({
      type: "vertical-stack",
      cards: (t == null ? void 0 : t.cards) || []
    });
    s.hass = this.hass, this._cardElement = s;
  }
  updated(t) {
    t.has("hass") && this._cardElement && (this._cardElement.hass = this.hass);
  }
  render() {
    return this._config ? x`
      <div class="tabs-header ${this._config.sticky ? "sticky" : ""}">
        <div class="tabs-container">
          ${this._config.tabs.map((t) => x`
            <button class="chip ${this._activeTabId === t.id ? "active" : ""}"
              @click=${() => {
      this._activeTabId = t.id, this._updateContent();
    }}>
              <ha-icon icon="${t.icon}"></ha-icon>
              <span>${t.label}</span>
            </button>
          `)}
        </div>
      </div>
      <div class="content">${this._cardElement}</div>
    ` : x``;
  }
};
et = q(le), w = Z(et, 0, "TabbedStackCard", Ct, w), w.styles = Wt`
    .tabs-header { padding: 10px 0; background: var(--card-background-color); z-index: 10; }
    .tabs-header.sticky { position: sticky; top: 0; }
    .tabs-container { display: flex; justify-content: center; gap: 10px; overflow-x: auto; }
    .chip { 
      display: flex; align-items: center; gap: 5px; padding: 8px 15px; 
      border-radius: 20px; border: none; background: var(--secondary-background-color);
      color: var(--primary-text-color); cursor: pointer; white-space: nowrap;
    }
    .chip.active { background: var(--primary-color); color: white; }
    .content { margin-top: 10px; }
  `, K(et, 1, w);
let St = w;
export {
  St as TabbedStackCard,
  Y as TabbedStackCardEditor
};
