var Lt = Object.create;
var W = Object.defineProperty;
var Dt = Object.getOwnPropertyDescriptor;
var dt = (n, t) => (t = Symbol[n]) ? t : Symbol.for("Symbol." + n), O = (n) => {
  throw TypeError(n);
};
var jt = (n, t, e) => t in n ? W(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var ht = (n, t) => W(n, "name", { value: t, configurable: !0 });
var q = (n) => [, , , Lt((n == null ? void 0 : n[dt("metadata")]) ?? null)], pt = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], U = (n) => n !== void 0 && typeof n != "function" ? O("Function expected") : n, Vt = (n, t, e, s, i) => ({ kind: pt[n], name: t, metadata: s, addInitializer: (r) => e._ ? O("Already initialized") : i.push(U(r || null)) }), Kt = (n, t) => jt(t, dt("metadata"), n[3]), J = (n, t, e, s) => {
  for (var i = 0, r = n[t >> 1], o = r && r.length; i < o; i++) t & 1 ? r[i].call(e) : s = r[i].call(e, s);
  return s;
}, Z = (n, t, e, s, i, r) => {
  var o, h, c, l, d, a = t & 7, g = !!(t & 8), p = !!(t & 16), b = a > 3 ? n.length + 1 : a ? g ? 1 : 2 : 0, ot = pt[a + 5], at = a > 3 && (n[b - 1] = []), zt = n[b] || (n[b] = []), _ = a && (!p && !g && (i = i.prototype), a < 5 && (a > 3 || !p) && Dt(a < 4 ? i : { get [e]() {
    return ct(this, r);
  }, set [e](f) {
    return lt(this, r, f);
  } }, e));
  a ? p && a < 4 && ht(r, (a > 2 ? "set " : a > 1 ? "get " : "") + e) : ht(i, e);
  for (var B = s.length - 1; B >= 0; B--)
    l = Vt(a, e, c = {}, n[3], zt), a && (l.static = g, l.private = p, d = l.access = { has: p ? (f) => Bt(i, f) : (f) => e in f }, a ^ 3 && (d.get = p ? (f) => (a ^ 1 ? ct : It)(f, i, a ^ 4 ? r : _.get) : (f) => f[e]), a > 2 && (d.set = p ? (f, I) => lt(f, i, I, a ^ 4 ? r : _.set) : (f, I) => f[e] = I)), h = (0, s[B])(a ? a < 4 ? p ? r : _[ot] : a > 4 ? void 0 : { get: _.get, set: _.set } : i, l), c._ = 1, a ^ 4 || h === void 0 ? U(h) && (a > 4 ? at.unshift(h) : a ? p ? r = h : _[ot] = h : i = h) : typeof h != "object" || h === null ? O("Object expected") : (U(o = h.get) && (_.get = o), U(o = h.set) && (_.set = o), U(o = h.init) && at.unshift(o));
  return a || Kt(n, i), _ && W(i, e, _), p ? a ^ 4 ? r : _ : i;
};
var F = (n, t, e) => t.has(n) || O("Cannot " + e), Bt = (n, t) => Object(t) !== t ? O('Cannot use the "in" operator on this value') : n.has(t), ct = (n, t, e) => (F(n, t, "read from private field"), e ? e.call(n) : t.get(n));
var lt = (n, t, e, s) => (F(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e), It = (n, t, e) => (F(n, t, "access private method"), e);
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
const { is: Jt, defineProperty: Zt, getOwnPropertyDescriptor: Ft, getOwnPropertyNames: Gt, getOwnPropertySymbols: Qt, getPrototypeOf: Xt } = Object, v = globalThis, ft = v.trustedTypes, Yt = ft ? ft.emptyScript : "", G = v.reactiveElementPolyfillSupport, N = (n, t) => n, st = { toAttribute(n, t) {
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
} }, Ut = (n, t) => !Jt(n, t), _t = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: Ut };
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
      i !== void 0 && Zt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = Ft(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const h = i == null ? void 0 : i.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? _t;
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
      const h = s.getPropertyOptions(i), c = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((r = h.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? h.converter : st;
      this._$Em = i;
      const l = c.fromAttribute(e, h.type);
      this[i] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    var o;
    if (t !== void 0) {
      const h = this.constructor;
      if (i === !1 && (r = this[t]), s ?? (s = h.getPropertyOptions(t)), !((s.hasChanged ?? Ut)(r, e) || s.useDefault && s.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(h._$Eu(t, s)))) return;
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
        const { wrapped: h } = o, c = this[r];
        h !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, o, c);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[N("elementProperties")] = /* @__PURE__ */ new Map(), w[N("finalized")] = /* @__PURE__ */ new Map(), G == null || G({ ReactiveElement: w }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, $t = (n) => n, V = M.trustedTypes, bt = V ? V.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ot = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, Ht = "?" + m, te = `<${Ht}>`, E = document, R = () => E.createComment(""), z = (n) => n === null || typeof n != "object" && typeof n != "function", rt = Array.isArray, ee = (n) => rt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, mt = /-->/g, vt = />/g, y = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), yt = /'/g, At = /"/g, Nt = /^(?:script|style|textarea|title)$/i, se = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), $ = se(1), P = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Ct = /* @__PURE__ */ new WeakMap(), A = E.createTreeWalker(E, 129);
function Mt(n, t) {
  if (!rt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return bt !== void 0 ? bt.createHTML(t) : t;
}
const ie = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = H;
  for (let h = 0; h < e; h++) {
    const c = n[h];
    let l, d, a = -1, g = 0;
    for (; g < c.length && (o.lastIndex = g, d = o.exec(c), d !== null); ) g = o.lastIndex, o === H ? d[1] === "!--" ? o = mt : d[1] !== void 0 ? o = vt : d[2] !== void 0 ? (Nt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = y) : d[3] !== void 0 && (o = y) : o === y ? d[0] === ">" ? (o = i ?? H, a = -1) : d[1] === void 0 ? a = -2 : (a = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? y : d[3] === '"' ? At : yt) : o === At || o === yt ? o = y : o === mt || o === vt ? o = H : (o = y, i = void 0);
    const p = o === y && n[h + 1].startsWith("/>") ? " " : "";
    r += o === H ? c + te : a >= 0 ? (s.push(l), c.slice(0, a) + Ot + c.slice(a) + m + p) : c + m + (a === -2 ? h : p);
  }
  return [Mt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class L {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const h = t.length - 1, c = this.parts, [l, d] = ie(t, e);
    if (this.el = L.createElement(l, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (i = A.nextNode()) !== null && c.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const a of i.getAttributeNames()) if (a.endsWith(Ot)) {
          const g = d[o++], p = i.getAttribute(a).split(m), b = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: r, name: b[2], strings: p, ctor: b[1] === "." ? re : b[1] === "?" ? oe : b[1] === "@" ? ae : K }), i.removeAttribute(a);
        } else a.startsWith(m) && (c.push({ type: 6, index: r }), i.removeAttribute(a));
        if (Nt.test(i.tagName)) {
          const a = i.textContent.split(m), g = a.length - 1;
          if (g > 0) {
            i.textContent = V ? V.emptyScript : "";
            for (let p = 0; p < g; p++) i.append(a[p], R()), A.nextNode(), c.push({ type: 2, index: ++r });
            i.append(a[g], R());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ht) c.push({ type: 2, index: r });
      else {
        let a = -1;
        for (; (a = i.data.indexOf(m, a + 1)) !== -1; ) c.push({ type: 7, index: r }), a += m.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = E.createElement("template");
    return s.innerHTML = t, s;
  }
}
function T(n, t, e = n, s) {
  var o, h;
  if (t === P) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const r = z(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = T(n, i._$AS(n, t.values), i, s)), t;
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? E).importNode(e, !0);
    A.currentNode = i;
    let r = A.nextNode(), o = 0, h = 0, c = s[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let l;
        c.type === 2 ? l = new D(r, r.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(r, c.name, c.strings, this, t) : c.type === 6 && (l = new he(r, this, t)), this._$AV.push(l), c = s[++h];
      }
      o !== (c == null ? void 0 : c.index) && (r = A.nextNode(), o++);
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
    t = T(this, t, e), z(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ee(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && z(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = L.createElement(Mt(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(e);
    else {
      const o = new ne(i, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
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
class K {
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
      const h = t;
      let c, l;
      for (t = r[0], c = 0; c < r.length - 1; c++) l = T(this, h[s + c], e, c), l === P && (l = this._$AH[c]), o || (o = !z(l) || l !== this._$AH[c]), l === u ? t = u : t !== u && (t += (l ?? "") + r[c + 1]), this._$AH[c] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class re extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class oe extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class ae extends K {
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
const X = M.litHtmlPolyfillSupport;
X == null || X(L, D), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.2");
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
var xt;
k._$litElement$ = !0, k.finalized = !0, (xt = C.litElementHydrateSupport) == null || xt.call(C, { LitElement: k });
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
let x = class x extends (le = k) {
  // HA ruft diese Methode auf, um die Konfiguration zu übergeben
  setConfig(t) {
    this._config = t;
  }
  // Hilfsmethode: Sendet die neue Config an Home Assistant
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
    if (!this._config || !this.hass) return;
    const e = t.target.configValue, s = t.target.type === "checkbox" ? t.target.checked : t.target.value;
    if (this._config[e] === s) return;
    const i = this._cloneConfig();
    s === "" || s === void 0 ? delete i[e] : i[e] = s, this._emitConfigChanged(i);
  }
  _addTab() {
    const t = this._cloneConfig(), e = [...t.tabs || []], s = `tab_${Date.now()}`;
    e.push({
      id: s,
      label: "Neuer Tab",
      icon: "mdi:border-all",
      cards: []
    }), t.tabs = e, this._emitConfigChanged(t);
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
  render() {
    var t;
    return !this.hass || !this._config ? $`<div>Lade Konfiguration...</div>` : $`
      <div class="editor-container">
        <div class="global-settings grid">
          <label>
            <div class="lbl">Storage Key (für Merken des Tabs)</div>
            <input
              class="inp"
              .value=${this._config.storage_key || ""}
              .configValue=${"storage_key"}
              @input=${this._handleValueChanged}
            />
          </label>
          
          <label class="switch-container">
            <input
              type="checkbox"
              .checked=${this._config.sticky_tabs}
              .configValue=${"sticky_tabs"}
              @change=${this._handleValueChanged}
            />
            <span>Tabs oben anheften (Sticky)</span>
          </label>
        </div>

        <hr />

        <div class="header">
          <h3>Tabs Konfiguration</h3>
          <button class="btn add-btn" @click=${this._addTab}>+ Tab hinzufügen</button>
        </div>

        ${(t = this._config.tabs) == null ? void 0 : t.map((e, s) => {
      var i;
      return $`
          <div class="tab-card">
            <div class="tab-header">
              <strong>${e.label || e.id}</strong>
              <button class="btn danger" @click=${() => this._removeTab(s)}>Löschen</button>
            </div>

            <div class="grid">
              <input class="inp" placeholder="ID" .value=${e.id} @input=${(r) => {
        const o = this._cloneConfig();
        o.tabs[s].id = r.target.value, this._emitConfigChanged(o);
      }} />
              <input class="inp" placeholder="Label" .value=${e.label || ""} @input=${(r) => {
        const o = this._cloneConfig();
        o.tabs[s].label = r.target.value, this._emitConfigChanged(o);
      }} />
            </div>

            <div class="cards-section">
              <h4>Karten in diesem Tab</h4>
              ${(i = e.cards) == null ? void 0 : i.map((r, o) => $`
                <div class="card-wrapper">
                  <div class="card-editor-header">
                     <span>Karte ${o + 1} (${r.type})</span>
                     <button class="btn-small danger" @click=${() => {
        const h = this._cloneConfig();
        h.tabs[s].cards.splice(o, 1), this._emitConfigChanged(h);
      }}>Entfernen</button>
                  </div>
                  <hui-card-element-editor
                    .hass=${this.hass}
                    .value=${r}
                    .lovelace=${this.lovelace}
                    @value-changed=${(h) => this._handleCardChanged(s, o, h)}
                  ></hui-card-element-editor>
                </div>
              `)}
              <button class="btn add-btn" @click=${() => this._addCard(s)}>+ Karte hinzufügen</button>
            </div>
          </div>
        `;
    })}
      </div>
    `;
  }
};
tt = q(le), x = Z(tt, 0, "TabbedStackCardEditor", St, x), x.styles = Tt`
    .editor-container { padding: 10px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
    .lbl { font-size: 12px; font-weight: bold; margin-bottom: 5px; }
    .inp { 
      width: 100%; padding: 10px; border-radius: 4px; 
      border: 1px solid var(--divider-color); 
      background: var(--card-background-color);
      color: var(--primary-text-color);
      box-sizing: border-box;
    }
    .tab-card { 
      border: 1px solid var(--divider-color); 
      padding: 15px; border-radius: 8px; margin-bottom: 20px;
      background: rgba(var(--rgb-primary-text-color), 0.03);
    }
    .tab-header { display: flex; justify-content: space-between; margin-bottom: 15px; align-items: center; }
    .card-wrapper { 
      margin: 10px 0; padding: 10px; 
      border: 1px dashed var(--divider-color); 
      border-radius: 8px; 
    }
    .card-editor-header { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 5px; opacity: 0.8; }
    .btn { padding: 8px 16px; border-radius: 4px; border: none; cursor: pointer; font-weight: bold; }
    .btn-small { padding: 4px 8px; font-size: 11px; border-radius: 4px; border: none; cursor: pointer; }
    .add-btn { background: var(--primary-color); color: white; }
    .danger { background: var(--error-color); color: white; }
    .switch-container { display: flex; align-items: center; gap: 10px; cursor: pointer; }
    hr { border: 0; border-top: 1px solid var(--divider-color); margin: 20px 0; }
  `, J(tt, 1, x);
let Et = x;
var kt, et, de;
kt = [Rt("tabbed-stack-card")];
let S = class S extends (de = k) {
  // Verbindet die Karte mit dem visuellen Editor
  static getConfigElement() {
    return document.createElement("tabbed-stack-card-editor");
  }
  static getStubConfig() {
    return {
      sticky_tabs: !0,
      tabs: [
        {
          id: "tab1",
          label: "Licht",
          icon: "mdi:lamp",
          cards: [{ type: "light", entity: "" }]
        },
        {
          id: "tab2",
          label: " Klima",
          icon: "mdi:thermostat",
          cards: [{ type: "thermostat", entity: "" }]
        }
      ]
    };
  }
  setConfig(t) {
    var i;
    if (!((i = t == null ? void 0 : t.tabs) != null && i.length)) {
      this._config = t;
      return;
    }
    const e = t.tabs.map((r) => ({
      ...r,
      cards: r.cards ?? (r.card ? [r.card] : [])
    }));
    this._config = { ...t, tabs: e };
    const s = this._config.storage_key ? localStorage.getItem(this._config.storage_key) : null;
    (!this._activeTab || !this._config.tabs.some((r) => r.id === this._activeTab)) && (this._activeTab = s || this._config.default_tab || this._config.tabs[0].id), this._buildCard();
  }
  _setTab(t) {
    this._activeTab = t, this._config.storage_key && localStorage.setItem(this._config.storage_key, t), this._buildCard();
  }
  async _buildCard() {
    var s, i;
    if (!((i = (s = this._config) == null ? void 0 : s.tabs) != null && i.length)) return;
    const e = (this._config.tabs.find((r) => r.id === this._activeTab) ?? this._config.tabs[0]).cards ?? [];
    if (this._helpers || window.loadCardHelpers && (this._helpers = await window.loadCardHelpers()), this._helpers) {
      const r = e.length === 1 ? e[0] : { type: "vertical-stack", cards: e };
      this._cardElement = this._helpers.createCardElement(r), this._cardElement.hass = this.hass;
    }
  }
  // Wichtig für Live-Vorschau: Wenn sich Hass ändert, muss es an die Unterkarte weitergereicht werden
  updated(t) {
    t.has("hass") && this._cardElement && (this._cardElement.hass = this.hass);
  }
  render() {
    return !this._config || !this._config.tabs ? $`` : $`
      <div class="tabs ${this._config.sticky_tabs ? "sticky" : ""}">
        ${this._config.tabs.map(
      (t) => $`
            <button
              class="chip ${t.id === this._activeTab ? "active" : ""}"
              @click=${() => this._setTab(t.id)}
            >
              ${t.icon ? $`<ha-icon .icon="${t.icon}"></ha-icon>` : ""}
              <span>${t.label ?? t.id}</span>
            </button>
          `
    )}
      </div>

      <div class="content">
        ${this._cardElement || $`<p>Lade Karten...</p>`}
      </div>
    `;
  }
};
et = q(de), S = Z(et, 0, "TabbedStackCard", kt, S), S.styles = Tt`
    :host {
      display: block;
      width: 100%;
    }
    .tabs {
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 8px 0;
      overflow-x: auto;
      background: var(--tsc-tabs-bg, transparent);
    }
    .tabs.sticky {
      position: sticky;
      top: 0;
      z-index: 10;
      background: var(--card-background-color, white);
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 20px;
      border: none;
      cursor: pointer;
      background: var(--secondary-background-color, #eee);
      color: var(--primary-text-color);
      white-space: nowrap;
      transition: all 0.2s ease;
    }
    .chip.active {
      background: var(--primary-color);
      color: var(--text-primary-color, white);
    }
    .content {
      margin-top: 8px;
    }
  `, J(et, 1, S);
let wt = S;
window.customCards = window.customCards || [];
window.customCards.push({
  type: "tabbed-stack-card",
  name: "Tabbed Stack Card",
  description: "Erlaubt das Gruppieren von Karten in Tabs.",
  preview: !0
});
export {
  wt as TabbedStackCard
};
