var jt = Object.create;
var W = Object.defineProperty;
var Dt = Object.getOwnPropertyDescriptor;
var dt = (r, t) => (t = Symbol[r]) ? t : Symbol.for("Symbol." + r), U = (r) => {
  throw TypeError(r);
};
var Lt = (r, t, e) => t in r ? W(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var ht = (r, t) => W(r, "name", { value: t, configurable: !0 });
var J = (r) => [, , , jt((r == null ? void 0 : r[dt("metadata")]) ?? null)], pt = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], H = (r) => r !== void 0 && typeof r != "function" ? U("Function expected") : r, Vt = (r, t, e, s, i) => ({ kind: pt[r], name: t, metadata: s, addInitializer: (n) => e._ ? U("Already initialized") : i.push(H(n || null)) }), Bt = (r, t) => Lt(t, dt("metadata"), r[3]), Z = (r, t, e, s) => {
  for (var i = 0, n = r[t >> 1], o = n && n.length; i < o; i++) t & 1 ? n[i].call(e) : s = n[i].call(e, s);
  return s;
}, K = (r, t, e, s, i, n) => {
  var o, c, h, l, d, a = t & 7, f = !!(t & 8), p = !!(t & 16), m = a > 3 ? r.length + 1 : a ? f ? 1 : 2 : 0, ot = pt[a + 5], at = a > 3 && (r[m - 1] = []), zt = r[m] || (r[m] = []), $ = a && (!p && !f && (i = i.prototype), a < 5 && (a > 3 || !p) && Dt(a < 4 ? i : { get [e]() {
    return ct(this, n);
  }, set [e](_) {
    return lt(this, n, _);
  } }, e));
  a ? p && a < 4 && ht(n, (a > 2 ? "set " : a > 1 ? "get " : "") + e) : ht(i, e);
  for (var I = s.length - 1; I >= 0; I--)
    l = Vt(a, e, h = {}, r[3], zt), a && (l.static = f, l.private = p, d = l.access = { has: p ? (_) => It(i, _) : (_) => e in _ }, a ^ 3 && (d.get = p ? (_) => (a ^ 1 ? ct : qt)(_, i, a ^ 4 ? n : $.get) : (_) => _[e]), a > 2 && (d.set = p ? (_, q) => lt(_, i, q, a ^ 4 ? n : $.set) : (_, q) => _[e] = q)), c = (0, s[I])(a ? a < 4 ? p ? n : $[ot] : a > 4 ? void 0 : { get: $.get, set: $.set } : i, l), h._ = 1, a ^ 4 || c === void 0 ? H(c) && (a > 4 ? at.unshift(c) : a ? p ? n = c : $[ot] = c : i = c) : typeof c != "object" || c === null ? U("Object expected") : (H(o = c.get) && ($.get = o), H(o = c.set) && ($.set = o), H(o = c.init) && at.unshift(o));
  return a || Bt(r, i), $ && W(i, e, $), p ? a ^ 4 ? n : $ : i;
};
var F = (r, t, e) => t.has(r) || U("Cannot " + e), It = (r, t) => Object(t) !== t ? U('Cannot use the "in" operator on this value') : r.has(t), ct = (r, t, e) => (F(r, t, "read from private field"), e ? e.call(r) : t.get(r));
var lt = (r, t, e, s) => (F(r, t, "write to private field"), s ? s.call(r, e) : t.set(r, e), e), qt = (r, t, e) => (F(r, t, "access private method"), e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, it = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = Symbol(), ut = /* @__PURE__ */ new WeakMap();
let Tt = class {
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
const Wt = (r) => new Tt(typeof r == "string" ? r : r + "", void 0, rt), Pt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new Tt(e, r, rt);
}, Jt = (r, t) => {
  if (it) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = L.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, ft = it ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Wt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Zt, defineProperty: Kt, getOwnPropertyDescriptor: Ft, getOwnPropertyNames: Gt, getOwnPropertySymbols: Qt, getPrototypeOf: Xt } = Object, v = globalThis, _t = v.trustedTypes, Yt = _t ? _t.emptyScript : "", G = v.reactiveElementPolyfillSupport, N = (r, t) => r, st = { toAttribute(r, t) {
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
} }, Ht = (r, t) => !Zt(r, t), $t = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: Ht };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = $t) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Kt(this.prototype, t, i);
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
    return this.elementProperties.get(t) ?? $t;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const t = Xt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
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
      for (const i of s) e.unshift(ft(i));
    } else t !== void 0 && e.push(ft(t));
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
    return Jt(t, this.constructor.elementStyles), t;
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
      if (i === !1 && (n = this[t]), s ?? (s = c.getPropertyOptions(t)), !((s.hasChanged ?? Ht)(n, e) || s.useDefault && s.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(c._$Eu(t, s)))) return;
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[N("elementProperties")] = /* @__PURE__ */ new Map(), w[N("finalized")] = /* @__PURE__ */ new Map(), G == null || G({ ReactiveElement: w }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, gt = (r) => r, V = M.trustedTypes, mt = V ? V.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Ut = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, Ot = "?" + b, te = `<${Ot}>`, C = document, R = () => C.createComment(""), z = (r) => r === null || typeof r != "object" && typeof r != "function", nt = Array.isArray, ee = (r) => nt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, bt = /-->/g, vt = />/g, y = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), yt = /'/g, At = /"/g, Nt = /^(?:script|style|textarea|title)$/i, se = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), g = se(1), T = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Et = /* @__PURE__ */ new WeakMap(), A = C.createTreeWalker(C, 129);
function Mt(r, t) {
  if (!nt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return mt !== void 0 ? mt.createHTML(t) : t;
}
const ie = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = O;
  for (let c = 0; c < e; c++) {
    const h = r[c];
    let l, d, a = -1, f = 0;
    for (; f < h.length && (o.lastIndex = f, d = o.exec(h), d !== null); ) f = o.lastIndex, o === O ? d[1] === "!--" ? o = bt : d[1] !== void 0 ? o = vt : d[2] !== void 0 ? (Nt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = y) : d[3] !== void 0 && (o = y) : o === y ? d[0] === ">" ? (o = i ?? O, a = -1) : d[1] === void 0 ? a = -2 : (a = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? y : d[3] === '"' ? At : yt) : o === At || o === yt ? o = y : o === bt || o === vt ? o = O : (o = y, i = void 0);
    const p = o === y && r[c + 1].startsWith("/>") ? " " : "";
    n += o === O ? h + te : a >= 0 ? (s.push(l), h.slice(0, a) + Ut + h.slice(a) + b + p) : h + b + (a === -2 ? c : p);
  }
  return [Mt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class j {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, h = this.parts, [l, d] = ie(t, e);
    if (this.el = j.createElement(l, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (i = A.nextNode()) !== null && h.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const a of i.getAttributeNames()) if (a.endsWith(Ut)) {
          const f = d[o++], p = i.getAttribute(a).split(b), m = /([.?@])?(.*)/.exec(f);
          h.push({ type: 1, index: n, name: m[2], strings: p, ctor: m[1] === "." ? ne : m[1] === "?" ? oe : m[1] === "@" ? ae : B }), i.removeAttribute(a);
        } else a.startsWith(b) && (h.push({ type: 6, index: n }), i.removeAttribute(a));
        if (Nt.test(i.tagName)) {
          const a = i.textContent.split(b), f = a.length - 1;
          if (f > 0) {
            i.textContent = V ? V.emptyScript : "";
            for (let p = 0; p < f; p++) i.append(a[p], R()), A.nextNode(), h.push({ type: 2, index: ++n });
            i.append(a[f], R());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ot) h.push({ type: 2, index: n });
      else {
        let a = -1;
        for (; (a = i.data.indexOf(b, a + 1)) !== -1; ) h.push({ type: 7, index: n }), a += b.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = C.createElement("template");
    return s.innerHTML = t, s;
  }
}
function P(r, t, e = r, s) {
  var o, c;
  if (t === T) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = z(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = P(r, i._$AS(r, t.values), i, s)), t;
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? C).importNode(e, !0);
    A.currentNode = i;
    let n = A.nextNode(), o = 0, c = 0, h = s[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let l;
        h.type === 2 ? l = new D(n, n.nextSibling, this, t) : h.type === 1 ? l = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && (l = new he(n, this, t)), this._$AV.push(l), h = s[++c];
      }
      o !== (h == null ? void 0 : h.index) && (n = A.nextNode(), o++);
    }
    return A.currentNode = C, i;
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
    t = P(this, t, e), z(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== T && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ee(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && z(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = j.createElement(Mt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new re(i, this), c = o.u(this.options);
      o.p(e), this.T(c), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Et.get(t.strings);
    return e === void 0 && Et.set(t.strings, e = new j(t)), e;
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
    if (n === void 0) t = P(this, t, e, 0), o = !z(t) || t !== this._$AH && t !== T, o && (this._$AH = t);
    else {
      const c = t;
      let h, l;
      for (t = n[0], h = 0; h < n.length - 1; h++) l = P(this, c[s + h], e, h), l === T && (l = this._$AH[h]), o || (o = !z(l) || l !== this._$AH[h]), l === u ? t = u : t !== u && (t += (l ?? "") + n[h + 1]), this._$AH[h] = l;
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
    if ((t = P(this, t, e, 0) ?? u) === T) return;
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
    P(this, t);
  }
}
const X = M.litHtmlPolyfillSupport;
X == null || X(j, D), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.2");
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
const E = globalThis;
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
    return T;
  }
}
var xt;
k._$litElement$ = !0, k.finalized = !0, (xt = E.litElementHydrateSupport) == null || xt.call(E, { LitElement: k });
const Y = E.litElementPolyfillSupport;
Y == null || Y({ LitElement: k });
(E.litElementVersions ?? (E.litElementVersions = [])).push("4.2.2");
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
let x = class x extends (le = k) {
  setConfig(t) {
    const e = (t.tabs ?? []).map((s) => ({
      ...s,
      cards: s.cards ?? (s.card ? [s.card] : [])
    }));
    this._config = { ...t, tabs: e };
  }
  _emitConfigChanged(t) {
    this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _setValue(t, e) {
    const s = structuredClone(this._config), i = t.split(".");
    let n = s;
    for (let o = 0; o < i.length - 1; o++) n = n[i[o]];
    n[i[i.length - 1]] = e, this._emitConfigChanged(s);
  }
  _addTab() {
    const t = structuredClone(this._config), e = t.tabs.length + 1;
    t.tabs.push({
      id: `Tab${e}`,
      label: `Tab ${e}`,
      icon: "mdi:apps",
      cards: [{ type: "markdown", content: `Hello Tab ${e}` }]
    }), t.default_tab || (t.default_tab = t.tabs[0].id), this._emitConfigChanged(t);
  }
  _removeTab(t) {
    const e = structuredClone(this._config);
    e.tabs.splice(t, 1), e.tabs.length || (e.tabs = [
      { id: "Tab1", label: "Tab 1", icon: "mdi:apps", cards: [{ type: "markdown", content: "Hello" }] }
    ]), e.default_tab && !e.tabs.some((s) => s.id === e.default_tab) && (e.default_tab = e.tabs[0].id), this._emitConfigChanged(e);
  }
  _addCard(t) {
    const e = structuredClone(this._config);
    e.tabs[t].cards = e.tabs[t].cards ?? [], e.tabs[t].cards.push({ type: "markdown", content: "New card" }), this._emitConfigChanged(e);
  }
  _removeCard(t, e) {
    var i;
    const s = structuredClone(this._config);
    (i = s.tabs[t].cards) == null || i.splice(e, 1), this._emitConfigChanged(s);
  }
  _updateCard(t, e, s) {
    const i = structuredClone(this._config);
    i.tabs[t].cards = i.tabs[t].cards ?? [], i.tabs[t].cards[e] = s, this._emitConfigChanged(i);
  }
  _renderCardEditor(t, e, s) {
    if (customElements.get("hui-card-element-editor")) {
      const n = document.createElement("hui-card-element-editor");
      return n.hass = this.hass, n.value = s, n.addEventListener("value-changed", (o) => {
        var h;
        const c = (h = o == null ? void 0 : o.detail) == null ? void 0 : h.value;
        c && this._updateCard(t, e, c);
      }), g`<div class="card-editor">${n}</div>`;
    }
    return g`
      <div class="card-editor">
        <ha-textfield
          class="json"
          label="Card config (JSON fallback)"
          .value=${JSON.stringify(s, null, 2)}
          @change=${(n) => {
      try {
        const o = JSON.parse(n.target.value);
        this._updateCard(t, e, o);
      } catch {
      }
    }}
        ></ha-textfield>
      </div>
    `;
  }
  render() {
    return !this.hass || !this._config ? g`` : g`
      <div class="section">
        <ha-switch
          .checked=${!!this._config.sticky_tabs}
          @change=${(t) => this._setValue("sticky_tabs", t.target.checked)}
        ></ha-switch>
        <div class="row">
          <div class="title">Sticky tabs</div>
          <div class="desc">Tabs bleiben beim Scrollen oben.</div>
        </div>
      </div>

      <div class="grid">
        <ha-textfield
          label="storage_key (optional)"
          .value=${this._config.storage_key ?? ""}
          @change=${(t) => this._setValue("storage_key", t.target.value || void 0)}
        ></ha-textfield>

        <ha-textfield
          label="default_tab (optional)"
          .value=${this._config.default_tab ?? ""}
          @change=${(t) => this._setValue("default_tab", t.target.value || void 0)}
        ></ha-textfield>
      </div>

      <div class="tabs-header">
        <div class="h">Tabs</div>
        <mwc-button @click=${this._addTab} outlined>Add Tab</mwc-button>
      </div>

      ${this._config.tabs.map((t, e) => g`
        <div class="tab">
          <div class="tab-top">
            <div class="tab-title">Tab ${e + 1}</div>
            <mwc-button @click=${() => this._removeTab(e)} outlined>Remove</mwc-button>
          </div>

          <div class="grid">
            <ha-textfield
              label="id"
              .value=${t.id}
              @change=${(s) => {
      const i = structuredClone(this._config);
      i.tabs[e].id = s.target.value, this._emitConfigChanged(i);
    }}
            ></ha-textfield>

            <ha-textfield
              label="label"
              .value=${t.label ?? ""}
              @change=${(s) => {
      const i = structuredClone(this._config);
      i.tabs[e].label = s.target.value || void 0, this._emitConfigChanged(i);
    }}
            ></ha-textfield>

            <ha-textfield
              label="icon (mdi:...)"
              .value=${t.icon ?? ""}
              @change=${(s) => {
      const i = structuredClone(this._config);
      i.tabs[e].icon = s.target.value || void 0, this._emitConfigChanged(i);
    }}
            ></ha-textfield>
          </div>

          <div class="cards-header">
            <div class="h2">Cards in Tab</div>
            <mwc-button @click=${() => this._addCard(e)} outlined>Add Card</mwc-button>
          </div>

          ${(t.cards ?? []).map((s, i) => g`
            <div class="card-block">
              <div class="card-top">
                <div class="card-title">Card ${i + 1}</div>
                <mwc-button @click=${() => this._removeCard(e, i)} outlined>Remove</mwc-button>
              </div>

              ${this._renderCardEditor(e, i, s)}
            </div>
          `)}
        </div>
      `)}
    `;
  }
};
tt = J(le), x = K(tt, 0, "TabbedStackCardEditor", St, x), x.styles = Pt`
    .section {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-bottom: 14px;
    }
    .row .title {
      font-weight: 600;
    }
    .row .desc {
      opacity: 0.7;
      font-size: 12px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      margin-bottom: 12px;
    }
    .tabs-header, .cards-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 14px 0 8px;
    }
    .h, .h2 {
      font-weight: 700;
    }
    .tab {
      border: 1px solid rgba(0,0,0,0.15);
      border-radius: 12px;
      padding: 12px;
      margin-bottom: 12px;
    }
    .tab-top, .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .tab-title, .card-title {
      font-weight: 700;
    }
    .card-block {
      border: 1px dashed rgba(0,0,0,0.25);
      border-radius: 12px;
      padding: 10px;
      margin-top: 10px;
    }
    .card-editor {
      margin-top: 8px;
    }
    ha-textfield.json {
      width: 100%;
    }
  `, Z(tt, 1, x);
let Ct = x;
var kt, et, de;
kt = [Rt("tabbed-stack-card")];
let S = class S extends (de = k) {
  // ---- UI editor hooks ----
  static getConfigElement() {
    return document.createElement("tabbed-stack-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:tabbed-stack-card",
      sticky_tabs: !0,
      storage_key: "tabs_default",
      default_tab: "Tab1",
      tabs: [
        {
          id: "Tab1",
          label: "Tab 1",
          icon: "mdi:lamp",
          cards: [{ type: "markdown", content: "Hello Tab 1" }]
        },
        {
          id: "Tab2",
          label: "Tab 2",
          icon: "mdi:roller-shade",
          cards: [{ type: "markdown", content: "Hello Tab 2" }]
        }
      ]
    };
  }
  setConfig(t) {
    var s;
    if (!((s = t == null ? void 0 : t.tabs) != null && s.length)) throw new Error("tabs required");
    this._config = t;
    const e = t.storage_key ? localStorage.getItem(t.storage_key) : null;
    this._activeTab = e || t.default_tab || t.tabs[0].id, this._buildCard();
  }
  updated(t) {
    t.has("hass") && this._card && (this._card.hass = this.hass);
  }
  _setTab(t) {
    this._activeTab = t, this._config.storage_key && localStorage.setItem(this._config.storage_key, t), this._buildCard();
  }
  async _buildCard() {
    const t = this._config.tabs.find((i) => i.id === this._activeTab) ?? this._config.tabs[0];
    if (!this._helpers) {
      if (!window.loadCardHelpers)
        throw new Error("Home Assistant card helpers not found (window.loadCardHelpers missing).");
      this._helpers = await window.loadCardHelpers();
    }
    const e = t.cards ?? (t.card ? [t.card] : []), s = e.length <= 1 ? e[0] ?? { type: "markdown", content: "No card configured" } : { type: "vertical-stack", cards: e };
    this._card = this._helpers.createCardElement(s), this._card.hass = this.hass, this.requestUpdate();
  }
  render() {
    return this._config ? g`
      <div class="tabs ${this._config.sticky_tabs ? "sticky" : ""}">
        ${this._config.tabs.map(
      (t) => g`
            <button
              class="chip ${t.id === this._activeTab ? "active" : ""}"
              @click=${() => this._setTab(t.id)}
            >
              ${t.icon ? g`<ha-icon icon="${t.icon}"></ha-icon>` : ""}
              <span>${t.label ?? t.id}</span>
            </button>
          `
    )}
      </div>

      <div class="content">${this._card ?? ""}</div>
    ` : g``;
  }
};
et = J(de), S = K(et, 0, "TabbedStackCard", kt, S), S.styles = Pt`
    :host {
      display: block;
    }

    .tabs {
      display: flex;
      justify-content: center;
      gap: var(--tsc-chip-gap, 12px);
      padding: 10px 0 6px;

      /* default: blend with surrounding UI */
      background: var(--tsc-tabs-bg, transparent);
      z-index: 2;
    }

    .tabs.sticky {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: var(--tsc-chip-padding, 10px 18px);
      border-radius: var(--tsc-chip-radius, 999px);
      border: none;
      cursor: pointer;

      /* Theme-friendly defaults (works for everyone) */
      background: var(--tsc-chip-bg, rgba(0, 0, 0, 0.18));
      color: var(--primary-text-color);

      font-size: 14px;
      line-height: 1;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .chip.active {
      /* Theme default: primary */
      background: var(--tsc-chip-bg-active, var(--primary-color));
      color: var(
        --tsc-chip-fg-active,
        var(--text-primary-color, var(--primary-text-color))
      );
    }

    .chip.active ha-icon {
      color: var(
        --tsc-chip-fg-active,
        var(--text-primary-color, var(--primary-text-color))
      );
    }

    .chip:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    ha-icon {
      --mdc-icon-size: var(--tsc-chip-icon-size, 22px);
    }

    .content {
      padding-top: 6px;
    }
  `, Z(et, 1, S);
let wt = S;
export {
  wt as TabbedStackCard
};
