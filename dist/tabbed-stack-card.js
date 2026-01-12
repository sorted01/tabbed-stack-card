var Dt = Object.create;
var V = Object.defineProperty;
var Lt = Object.getOwnPropertyDescriptor;
var dt = (r, t) => (t = Symbol[r]) ? t : Symbol.for("Symbol." + r), H = (r) => {
  throw TypeError(r);
};
var jt = (r, t, e) => t in r ? V(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var ct = (r, t) => V(r, "name", { value: t, configurable: !0 });
var K = (r) => [, , , Dt((r == null ? void 0 : r[dt("metadata")]) ?? null)], pt = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], O = (r) => r !== void 0 && typeof r != "function" ? H("Function expected") : r, It = (r, t, e, i, s) => ({ kind: pt[r], name: t, metadata: i, addInitializer: (n) => e._ ? H("Already initialized") : s.push(O(n || null)) }), Bt = (r, t) => jt(t, dt("metadata"), r[3]), q = (r, t, e, i) => {
  for (var s = 0, n = r[t >> 1], o = n && n.length; s < o; s++) t & 1 ? n[s].call(e) : i = n[s].call(e, i);
  return i;
}, F = (r, t, e, i, s, n) => {
  var o, h, c, l, d, a = t & 7, f = !!(t & 8), p = !!(t & 16), $ = a > 3 ? r.length + 1 : a ? f ? 1 : 2 : 0, ot = pt[a + 5], at = a > 3 && (r[$ - 1] = []), zt = r[$] || (r[$] = []), b = a && (!p && !f && (s = s.prototype), a < 5 && (a > 3 || !p) && Lt(a < 4 ? s : { get [e]() {
    return ht(this, n);
  }, set [e](g) {
    return lt(this, n, g);
  } }, e));
  a ? p && a < 4 && ct(n, (a > 2 ? "set " : a > 1 ? "get " : "") + e) : ct(s, e);
  for (var J = i.length - 1; J >= 0; J--)
    l = It(a, e, c = {}, r[3], zt), a && (l.static = f, l.private = p, d = l.access = { has: p ? (g) => Jt(s, g) : (g) => e in g }, a ^ 3 && (d.get = p ? (g) => (a ^ 1 ? ht : Wt)(g, s, a ^ 4 ? n : b.get) : (g) => g[e]), a > 2 && (d.set = p ? (g, W) => lt(g, s, W, a ^ 4 ? n : b.set) : (g, W) => g[e] = W)), h = (0, i[J])(a ? a < 4 ? p ? n : b[ot] : a > 4 ? void 0 : { get: b.get, set: b.set } : s, l), c._ = 1, a ^ 4 || h === void 0 ? O(h) && (a > 4 ? at.unshift(h) : a ? p ? n = h : b[ot] = h : s = h) : typeof h != "object" || h === null ? H("Object expected") : (O(o = h.get) && (b.get = o), O(o = h.set) && (b.set = o), O(o = h.init) && at.unshift(o));
  return a || Bt(r, s), b && V(s, e, b), p ? a ^ 4 ? n : b : s;
};
var Z = (r, t, e) => t.has(r) || H("Cannot " + e), Jt = (r, t) => Object(t) !== t ? H('Cannot use the "in" operator on this value') : r.has(t), ht = (r, t, e) => (Z(r, t, "read from private field"), e ? e.call(r) : t.get(r));
var lt = (r, t, e, i) => (Z(r, t, "write to private field"), i ? i.call(r, e) : t.set(r, e), e), Wt = (r, t, e) => (Z(r, t, "access private method"), e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, st = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = Symbol(), ut = /* @__PURE__ */ new WeakMap();
let kt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (st && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ut.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ut.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Vt = (r) => new kt(typeof r == "string" ? r : r + "", void 0, rt), Pt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[n + 1], r[0]);
  return new kt(e, r, rt);
}, Kt = (r, t) => {
  if (st) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = j.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, ft = st ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Vt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: qt, defineProperty: Ft, getOwnPropertyDescriptor: Zt, getOwnPropertyNames: Yt, getOwnPropertySymbols: Gt, getPrototypeOf: Qt } = Object, v = globalThis, gt = v.trustedTypes, Xt = gt ? gt.emptyScript : "", Y = v.reactiveElementPolyfillSupport, U = (r, t) => r, it = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Xt : null;
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
} }, Ot = (r, t) => !qt(r, t), bt = { attribute: !0, type: String, converter: it, reflect: !1, useDefault: !1, hasChanged: Ot };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = bt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Ft(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: n } = Zt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const h = s == null ? void 0 : s.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? bt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Qt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, i = [...Yt(e), ...Gt(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(ft(s));
    } else t !== void 0 && e.push(ft(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Kt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var n;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : it).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const h = i.getPropertyOptions(s), c = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((n = h.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? h.converter : it;
      this._$Em = s;
      const l = c.fromAttribute(e, h.type);
      this[s] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, n) {
    var o;
    if (t !== void 0) {
      const h = this.constructor;
      if (s === !1 && (n = this[t]), i ?? (i = h.getPropertyOptions(t)), !((i.hasChanged ?? Ot)(n, e) || i.useDefault && i.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(h._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: n }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, o] of s) {
        const { wrapped: h } = o, c = this[n];
        h !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, o, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var n;
        return (n = s.hostUpdate) == null ? void 0 : n.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[U("elementProperties")] = /* @__PURE__ */ new Map(), w[U("finalized")] = /* @__PURE__ */ new Map(), Y == null || Y({ ReactiveElement: w }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, _t = (r) => r, I = M.trustedTypes, $t = I ? I.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Ht = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, Nt = "?" + m, te = `<${Nt}>`, E = document, R = () => E.createComment(""), z = (r) => r === null || typeof r != "object" && typeof r != "function", nt = Array.isArray, ee = (r) => nt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, mt = /-->/g, vt = />/g, y = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), yt = /'/g, At = /"/g, Ut = /^(?:script|style|textarea|title)$/i, ie = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), _ = ie(1), k = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), xt = /* @__PURE__ */ new WeakMap(), A = E.createTreeWalker(E, 129);
function Mt(r, t) {
  if (!nt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return $t !== void 0 ? $t.createHTML(t) : t;
}
const se = (r, t) => {
  const e = r.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = N;
  for (let h = 0; h < e; h++) {
    const c = r[h];
    let l, d, a = -1, f = 0;
    for (; f < c.length && (o.lastIndex = f, d = o.exec(c), d !== null); ) f = o.lastIndex, o === N ? d[1] === "!--" ? o = mt : d[1] !== void 0 ? o = vt : d[2] !== void 0 ? (Ut.test(d[2]) && (s = RegExp("</" + d[2], "g")), o = y) : d[3] !== void 0 && (o = y) : o === y ? d[0] === ">" ? (o = s ?? N, a = -1) : d[1] === void 0 ? a = -2 : (a = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? y : d[3] === '"' ? At : yt) : o === At || o === yt ? o = y : o === mt || o === vt ? o = N : (o = y, s = void 0);
    const p = o === y && r[h + 1].startsWith("/>") ? " " : "";
    n += o === N ? c + te : a >= 0 ? (i.push(l), c.slice(0, a) + Ht + c.slice(a) + m + p) : c + m + (a === -2 ? h : p);
  }
  return [Mt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class D {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, c = this.parts, [l, d] = se(t, e);
    if (this.el = D.createElement(l, i), A.currentNode = this.el.content, e === 2 || e === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (s = A.nextNode()) !== null && c.length < h; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const a of s.getAttributeNames()) if (a.endsWith(Ht)) {
          const f = d[o++], p = s.getAttribute(a).split(m), $ = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: n, name: $[2], strings: p, ctor: $[1] === "." ? ne : $[1] === "?" ? oe : $[1] === "@" ? ae : B }), s.removeAttribute(a);
        } else a.startsWith(m) && (c.push({ type: 6, index: n }), s.removeAttribute(a));
        if (Ut.test(s.tagName)) {
          const a = s.textContent.split(m), f = a.length - 1;
          if (f > 0) {
            s.textContent = I ? I.emptyScript : "";
            for (let p = 0; p < f; p++) s.append(a[p], R()), A.nextNode(), c.push({ type: 2, index: ++n });
            s.append(a[f], R());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Nt) c.push({ type: 2, index: n });
      else {
        let a = -1;
        for (; (a = s.data.indexOf(m, a + 1)) !== -1; ) c.push({ type: 7, index: n }), a += m.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = E.createElement("template");
    return i.innerHTML = t, i;
  }
}
function P(r, t, e = r, i) {
  var o, h;
  if (t === k) return t;
  let s = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const n = z(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== n && ((h = s == null ? void 0 : s._$AO) == null || h.call(s, !1), n === void 0 ? s = void 0 : (s = new n(r), s._$AT(r, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = P(r, s._$AS(r, t.values), s, i)), t;
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? E).importNode(e, !0);
    A.currentNode = s;
    let n = A.nextNode(), o = 0, h = 0, c = i[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let l;
        c.type === 2 ? l = new L(n, n.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (l = new ce(n, this, t)), this._$AV.push(l), c = i[++h];
      }
      o !== (c == null ? void 0 : c.index) && (n = A.nextNode(), o++);
    }
    return A.currentNode = E, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class L {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = P(this, t, e), z(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== k && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ee(t) ? this.k(t) : this._(t);
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
    var n;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = D.createElement(Mt(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === s) this._$AH.p(e);
    else {
      const o = new re(s, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = xt.get(t.strings);
    return e === void 0 && xt.set(t.strings, e = new D(t)), e;
  }
  k(t) {
    nt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const n of t) s === e.length ? e.push(i = new L(this.O(R()), this.O(R()), this, this.options)) : i = e[s], i._$AI(n), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = _t(t).nextSibling;
      _t(t).remove(), t = s;
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
  constructor(t, e, i, s, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = P(this, t, e, 0), o = !z(t) || t !== this._$AH && t !== k, o && (this._$AH = t);
    else {
      const h = t;
      let c, l;
      for (t = n[0], c = 0; c < n.length - 1; c++) l = P(this, h[i + c], e, c), l === k && (l = this._$AH[c]), o || (o = !z(l) || l !== this._$AH[c]), l === u ? t = u : t !== u && (t += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    o && !s && this.j(t);
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
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? u) === k) return;
    const i = this._$AH, s = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ce {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const Q = M.litHtmlPolyfillSupport;
Q == null || Q(D, L), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.2");
const he = (r, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new L(t.insertBefore(R(), n), n, void 0, e ?? {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis;
class T extends w {
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
    return k;
  }
}
var Ct;
T._$litElement$ = !0, T.finalized = !0, (Ct = x.litElementHydrateSupport) == null || Ct.call(x, { LitElement: T });
const X = x.litElementPolyfillSupport;
X == null || X({ LitElement: T });
(x.litElementVersions ?? (x.litElementVersions = [])).push("4.2.2");
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
let C = class C extends (le = T) {
  constructor() {
    super(...arguments), this._activeTabEditor = null;
  }
  // Welcher Tab ist im Editor gerade offen?
  setConfig(t) {
    this._config = t, this._config.tabs || (this._config = { ...this._config, tabs: [] });
  }
  _fireConfigChanged(t) {
    const e = new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  // --- Actions ---
  _addTab() {
    if (!this._config) return;
    const t = [...this._config.tabs || []], e = t.length + 1;
    t.push({
      id: `tab_${Date.now()}`,
      label: `Tab ${e}`,
      icon: "mdi:view-dashboard",
      cards: []
    }), this._fireConfigChanged({ ...this._config, tabs: t }), this._activeTabEditor = t.length - 1;
  }
  _removeTab(t) {
    if (!this._config) return;
    const e = [...this._config.tabs];
    e.splice(t, 1), this._fireConfigChanged({ ...this._config, tabs: e }), this._activeTabEditor = null;
  }
  _addCardToTab(t) {
    if (!this._config) return;
    const e = JSON.parse(JSON.stringify(this._config.tabs));
    e[t].cards.push({ type: "markdown", content: "Neue Karte - Bitte bearbeiten" }), this._fireConfigChanged({ ...this._config, tabs: e });
  }
  _removeCardFromTab(t, e) {
    if (!this._config) return;
    const i = JSON.parse(JSON.stringify(this._config.tabs));
    i[t].cards.splice(e, 1), this._fireConfigChanged({ ...this._config, tabs: i });
  }
  _updateCardConfig(t, e, i) {
    if (!this._config) return;
    const s = JSON.parse(JSON.stringify(this._config.tabs));
    s[t].cards[e] = i, this._fireConfigChanged({ ...this._config, tabs: s });
  }
  _toggleSticky(t) {
    this._config && this._fireConfigChanged({ ...this._config, sticky: t.target.checked });
  }
  _updateTabProp(t, e, i) {
    if (!this._config) return;
    const s = JSON.parse(JSON.stringify(this._config.tabs));
    s[t][e] = i, this._fireConfigChanged({ ...this._config, tabs: s });
  }
  // --- Render ---
  render() {
    if (!this.hass || !this._config) return _`<div>Lade Editor...</div>`;
    const t = this._config.tabs || [];
    return _`
      <div class="card-config">
        
        <div class="option-row">
            <ha-switch 
                .checked=${this._config.sticky === !0} 
                @change=${this._toggleSticky}
            ></ha-switch>
            <span>Tabs oben anheften (Sticky)</span>
        </div>

        <div class="separator"></div>

        <h3>Tabs verwalten</h3>
        ${t.map((e, i) => _`
            <div class="tab-box ${this._activeTabEditor === i ? "open" : ""}">
                <div class="tab-header">
                    <div class="tab-inputs">
                        <ha-icon icon="${e.icon || "mdi:view-dashboard"}"></ha-icon>
                        <input 
                            type="text" 
                            class="flat-input bold" 
                            .value=${e.label} 
                            @change=${(s) => this._updateTabProp(i, "label", s.target.value)}
                        />
                    </div>
                    <div class="actions">
                        <button class="icon-btn" @click=${() => this._activeTabEditor = this._activeTabEditor === i ? null : i}>
                            ${this._activeTabEditor === i ? "▲" : "▼"} Bearbeiten
                        </button>
                        <button class="icon-btn delete" @click=${() => this._removeTab(i)}>🗑</button>
                    </div>
                </div>

                ${this._activeTabEditor === i ? _`
                    <div class="tab-content-editor">
                        <div class="row">
                             <label>Icon:</label>
                             <input type="text" class="flat-input" .value=${e.icon || ""} @change=${(s) => this._updateTabProp(i, "icon", s.target.value)} placeholder="mdi:...">
                        </div>
                        <div class="row">
                             <label>ID (optional):</label>
                             <input type="text" class="flat-input" .value=${e.id} @change=${(s) => this._updateTabProp(i, "id", s.target.value)}>
                        </div>

                        <h4>Karten in diesem Tab</h4>
                        ${(e.cards || []).map((s, n) => _`
                            <div class="card-wrapper">
                                <div class="card-actions-top">
                                    <span class="type-badge">${s.type}</span>
                                    <button class="text-btn delete" @click=${() => this._removeCardFromTab(i, n)}>Entfernen</button>
                                </div>
                                
                                <hui-card-element-editor
                                    .hass=${this.hass}
                                    .value=${s}
                                    .lovelace=${this.lovelace}
                                    @value-changed=${(o) => {
      o.stopPropagation(), this._updateCardConfig(i, n, o.detail.value);
    }}
                                ></hui-card-element-editor>
                            </div>
                        `)}

                        <button class="add-btn" @click=${() => this._addCardToTab(i)}>
                            + Karte hinzufügen
                        </button>
                    </div>
                ` : ""}
            </div>
        `)}

        <button class="add-btn main" @click=${this._addTab}>
            + Neuen Tab hinzufügen
        </button>

      </div>
    `;
  }
};
tt = K(le), C = F(tt, 0, "TabbedStackCardEditor", St, C), C.styles = Pt`
    .card-config { display: flex; flex-direction: column; gap: 10px; }
    .separator { border-bottom: 1px solid var(--divider-color); margin: 10px 0; }
    .option-row { display: flex; align-items: center; gap: 10px; }
    
    .tab-box { 
        border: 1px solid var(--divider-color); 
        border-radius: 8px; 
        background: var(--card-background-color);
        transition: all 0.2s ease;
    }
    .tab-box.open { border-color: var(--primary-color); }
    
    .tab-header { 
        display: flex; justify-content: space-between; align-items: center; 
        padding: 10px; 
        background: rgba(127,127,127, 0.05);
    }
    .tab-inputs { display: flex; align-items: center; gap: 8px; flex: 1; }
    
    .tab-content-editor { padding: 15px; border-top: 1px solid var(--divider-color); }
    
    .card-wrapper { 
        border: 1px dashed var(--divider-color); 
        padding: 10px; margin-bottom: 15px; 
        border-radius: 4px;
    }
    .card-actions-top { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.8rem; }
    .type-badge { background: var(--primary-color); color: var(--text-primary-color); padding: 2px 6px; border-radius: 4px; }
    
    .flat-input { border: 1px solid transparent; background: transparent; color: var(--primary-text-color); padding: 5px; border-bottom: 1px solid var(--divider-color); width: 100%; }
    .flat-input:focus { border-bottom-color: var(--primary-color); outline: none; }
    .flat-input.bold { font-weight: bold; font-size: 1.1rem; }
    
    .add-btn { background: var(--primary-color); color: var(--text-primary-color); border: none; padding: 10px; width: 100%; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .add-btn.main { margin-top: 10px; }
    
    .icon-btn { background: none; border: none; cursor: pointer; color: var(--secondary-text-color); }
    .text-btn { background: none; border: none; cursor: pointer; color: var(--primary-color); text-decoration: underline; }
    .delete { color: var(--error-color); }
    
    .row { display: grid; grid-template-columns: 80px 1fr; gap: 10px; align-items: center; margin-bottom: 10px; }
  `, q(tt, 1, C);
let Et = C;
var Tt, et, de;
Tt = [Rt("tabbed-stack-card")];
let S = class S extends (de = T) {
  constructor() {
    super(...arguments), this._activeTabId = "";
  }
  // Verknüpfung zum Editor
  static getConfigElement() {
    return document.createElement("tabbed-stack-card-editor");
  }
  static getStubConfig() {
    return {
      sticky: !1,
      tabs: [
        { id: "tab1", label: "Wohnzimmer", icon: "mdi:sofa", cards: [] },
        { id: "tab2", label: "Licht", icon: "mdi:lightbulb", cards: [] }
      ]
    };
  }
  set hass(t) {
    this._hass = t, this._cardElement && (this._cardElement.hass = t);
  }
  setConfig(t) {
    if (!t) throw new Error("Invalid Configuration");
    this._config = t, this._config.tabs && this._config.tabs.length > 0 && (!this._activeTabId || !this._config.tabs.find((e) => e.id === this._activeTabId)) && (this._activeTabId = this._config.tabs[0].id), this._createCardElement();
  }
  async _loadHelpers() {
    this._helpers || (window.loadCardHelpers ? this._helpers = await window.loadCardHelpers() : console.error("loadCardHelpers not found"));
  }
  async _createCardElement() {
    if (!this._config || !this._activeTabId) return;
    await this._loadHelpers();
    const t = this._config.tabs.find((i) => i.id === this._activeTabId);
    if (!t || !this._helpers) return;
    const e = this._helpers.createCardElement({
      type: "vertical-stack",
      cards: t.cards || []
    });
    e.hass = this._hass, this._cardElement = e, this.requestUpdate();
  }
  _switchTab(t) {
    this._activeTabId = t, this._createCardElement();
  }
  render() {
    return !this._config || !this._config.tabs ? _`` : _`
      <div class="tsc-container">
        
        <div class="tabs-header ${this._config.sticky ? "sticky" : ""}">
            <div class="tabs-scroll-area">
                ${this._config.tabs.map((t) => {
      const e = t.id === this._activeTabId;
      return _`
                        <button 
                            class="tab-chip ${e ? "active" : ""}"
                            @click=${() => this._switchTab(t.id)}
                        >
                            ${t.icon ? _`<ha-icon icon="${t.icon}"></ha-icon>` : ""}
                            <span>${t.label}</span>
                        </button>
                    `;
    })}
            </div>
        </div>

        <div class="tab-content">
            ${this._cardElement}
        </div>

      </div>
    `;
  }
};
et = K(de), S = F(et, 0, "TabbedStackCard", Tt, S), S.styles = Pt`
    /* Container Style */
    .tsc-container {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    /* Tabs Header */
    .tabs-header {
        padding: 12px 0;
        width: 100%;
        z-index: 5;
        background: transparent;
        transition: background 0.3s;
    }

    .tabs-header.sticky {
        position: sticky;
        top: 0;
        /* Wir nutzen die Variable für die Karten-Hintergrundfarbe, damit es beim Scrollen lesbar bleibt */
        background: var(--ha-card-background, var(--card-background-color, #fff)); 
        margin-left: -4px; /* Kleine Korrekturen für Randabstände */
        margin-right: -4px;
        padding-left: 4px;
        padding-right: 4px;
        border-bottom: 1px solid rgba(127,127,127, 0.1);
    }

    .tabs-scroll-area {
        display: flex;
        justify-content: center; /* ZENTRIERT die Tabs */
        gap: 12px;
        overflow-x: auto;
        /* Scrollbalken verstecken */
        -ms-overflow-style: none; 
        scrollbar-width: none; 
    }
    .tabs-scroll-area::-webkit-scrollbar { display: none; }

    /* Einzelner Tab (Chip Style) */
    .tab-chip {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border: none;
        border-radius: 32px; /* Pillen-Form */
        cursor: pointer;
        font-family: inherit;
        font-weight: 500;
        font-size: 14px;
        transition: all 0.2s ease-in-out;
        
        /* Standard Zustand (Inaktiv) */
        background: var(--secondary-background-color, #e5e5e5);
        color: var(--primary-text-color, #333);
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    /* Hover Effekt */
    .tab-chip:hover {
        filter: brightness(0.95);
    }

    /* Aktiver Tab */
    .tab-chip.active {
        background: var(--primary-color, #03a9f4);
        color: var(--text-primary-color, #fff);
        font-weight: bold;
        box-shadow: 0 3px 6px rgba(0,0,0,0.2);
    }

    /* Icon im Tab */
    .tab-chip ha-icon {
        --mdc-icon-size: 20px;
    }

    /* Content Bereich */
    .tab-content {
        margin-top: 8px;
        min-height: 50px;
        animation: fade-in 0.2s ease-out;
    }

    @keyframes fade-in {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
    }
  `, q(et, 1, S);
let wt = S;
window.customCards = window.customCards || [];
window.customCards.push({
  type: "tabbed-stack-card",
  name: "Tabbed Stack Card (OneFile)",
  description: "Tabs zentriert & sticky, mit visuellem Editor."
});
export {
  wt as TabbedStackCard,
  Et as TabbedStackCardEditor
};
