var Lt = Object.create;
var F = Object.defineProperty;
var Dt = Object.getOwnPropertyDescriptor;
var pt = (r, t) => (t = Symbol[r]) ? t : Symbol.for("Symbol." + r), U = (r) => {
  throw TypeError(r);
};
var Bt = (r, t, e) => t in r ? F(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var lt = (r, t) => F(r, "name", { value: t, configurable: !0 });
var G = (r) => [, , , Lt((r == null ? void 0 : r[pt("metadata")]) ?? null)], ut = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], P = (r) => r !== void 0 && typeof r != "function" ? U("Function expected") : r, Vt = (r, t, e, s, i) => ({ kind: ut[r], name: t, metadata: s, addInitializer: (n) => e._ ? U("Already initialized") : i.push(P(n || null)) }), qt = (r, t) => Bt(t, pt("metadata"), r[3]), D = (r, t, e, s) => {
  for (var i = 0, n = r[t >> 1], o = n && n.length; i < o; i++) t & 1 ? n[i].call(e) : s = n[i].call(e, s);
  return s;
}, B = (r, t, e, s, i, n) => {
  var o, a, l, h, d, c = t & 7, g = !!(t & 8), p = !!(t & 16), b = c > 3 ? r.length + 1 : c ? g ? 1 : 2 : 0, at = ut[c + 5], ct = c > 3 && (r[b - 1] = []), jt = r[b] || (r[b] = []), _ = c && (!p && !g && (i = i.prototype), c < 5 && (c > 3 || !p) && Dt(c < 4 ? i : { get [e]() {
    return ht(this, n);
  }, set [e](f) {
    return dt(this, n, f);
  } }, e));
  c ? p && c < 4 && lt(n, (c > 2 ? "set " : c > 1 ? "get " : "") + e) : lt(i, e);
  for (var K = s.length - 1; K >= 0; K--)
    h = Vt(c, e, l = {}, r[3], jt), c && (h.static = g, h.private = p, d = h.access = { has: p ? (f) => It(i, f) : (f) => e in f }, c ^ 3 && (d.get = p ? (f) => (c ^ 1 ? ht : Wt)(f, i, c ^ 4 ? n : _.get) : (f) => f[e]), c > 2 && (d.set = p ? (f, Z) => dt(f, i, Z, c ^ 4 ? n : _.set) : (f, Z) => f[e] = Z)), a = (0, s[K])(c ? c < 4 ? p ? n : _[at] : c > 4 ? void 0 : { get: _.get, set: _.set } : i, h), l._ = 1, c ^ 4 || a === void 0 ? P(a) && (c > 4 ? ct.unshift(a) : c ? p ? n = a : _[at] = a : i = a) : typeof a != "object" || a === null ? U("Object expected") : (P(o = a.get) && (_.get = o), P(o = a.set) && (_.set = o), P(o = a.init) && ct.unshift(o));
  return c || qt(r, i), _ && F(i, e, _), p ? c ^ 4 ? n : _ : i;
};
var Q = (r, t, e) => t.has(r) || U("Cannot " + e), It = (r, t) => Object(t) !== t ? U('Cannot use the "in" operator on this value') : r.has(t), ht = (r, t, e) => (Q(r, t, "read from private field"), e ? e.call(r) : t.get(r));
var dt = (r, t, e, s) => (Q(r, t, "write to private field"), s ? s.call(r, e) : t.set(r, e), e), Wt = (r, t, e) => (Q(r, t, "access private method"), e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, it = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = Symbol(), gt = /* @__PURE__ */ new WeakMap();
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
      s && (t = gt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && gt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Kt = (r) => new Ut(typeof r == "string" ? r : r + "", void 0, rt), Tt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new Ut(e, r, rt);
}, Zt = (r, t) => {
  if (it) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = V.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, ft = it ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Kt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ft, defineProperty: Gt, getOwnPropertyDescriptor: Qt, getOwnPropertyNames: Xt, getOwnPropertySymbols: Yt, getPrototypeOf: te } = Object, v = globalThis, _t = v.trustedTypes, ee = _t ? _t.emptyScript : "", X = v.reactiveElementPolyfillSupport, M = (r, t) => r, q = { toAttribute(r, t) {
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
} }, nt = (r, t) => !Ft(r, t), $t = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: nt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = $t) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Gt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Qt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? $t;
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
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : q).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : q;
      this._$Em = i;
      const h = l.fromAttribute(e, a.type);
      this[i] = h ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[t]), s ?? (s = a.getPropertyOptions(t)), !((s.hasChanged ?? nt)(n, e) || s.useDefault && s.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, s)))) return;
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
        const { wrapped: a } = o, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, o, l);
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[M("elementProperties")] = /* @__PURE__ */ new Map(), S[M("finalized")] = /* @__PURE__ */ new Map(), X == null || X({ ReactiveElement: S }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, bt = (r) => r, I = R.trustedTypes, mt = I ? I.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Ht = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, Mt = "?" + m, se = `<${Mt}>`, E = document, z = () => E.createComment(""), J = (r) => r === null || typeof r != "object" && typeof r != "function", ot = Array.isArray, ie = (r) => ot(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Y = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, vt = /-->/g, yt = />/g, y = RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), At = /'/g, xt = /"/g, Rt = /^(?:script|style|textarea|title)$/i, re = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), $ = re(1), O = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), wt = /* @__PURE__ */ new WeakMap(), x = E.createTreeWalker(E, 129);
function zt(r, t) {
  if (!ot(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return mt !== void 0 ? mt.createHTML(t) : t;
}
const ne = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = T;
  for (let a = 0; a < e; a++) {
    const l = r[a];
    let h, d, c = -1, g = 0;
    for (; g < l.length && (o.lastIndex = g, d = o.exec(l), d !== null); ) g = o.lastIndex, o === T ? d[1] === "!--" ? o = vt : d[1] !== void 0 ? o = yt : d[2] !== void 0 ? (Rt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = y) : d[3] !== void 0 && (o = y) : o === y ? d[0] === ">" ? (o = i ?? T, c = -1) : d[1] === void 0 ? c = -2 : (c = o.lastIndex - d[2].length, h = d[1], o = d[3] === void 0 ? y : d[3] === '"' ? xt : At) : o === xt || o === At ? o = y : o === vt || o === yt ? o = T : (o = y, i = void 0);
    const p = o === y && r[a + 1].startsWith("/>") ? " " : "";
    n += o === T ? l + se : c >= 0 ? (s.push(h), l.slice(0, c) + Ht + l.slice(c) + m + p) : l + m + (c === -2 ? a : p);
  }
  return [zt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class j {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const a = t.length - 1, l = this.parts, [h, d] = ne(t, e);
    if (this.el = j.createElement(h, s), x.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = x.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(Ht)) {
          const g = d[o++], p = i.getAttribute(c).split(m), b = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: n, name: b[2], strings: p, ctor: b[1] === "." ? ae : b[1] === "?" ? ce : b[1] === "@" ? le : W }), i.removeAttribute(c);
        } else c.startsWith(m) && (l.push({ type: 6, index: n }), i.removeAttribute(c));
        if (Rt.test(i.tagName)) {
          const c = i.textContent.split(m), g = c.length - 1;
          if (g > 0) {
            i.textContent = I ? I.emptyScript : "";
            for (let p = 0; p < g; p++) i.append(c[p], z()), x.nextNode(), l.push({ type: 2, index: ++n });
            i.append(c[g], z());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Mt) l.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(m, c + 1)) !== -1; ) l.push({ type: 7, index: n }), c += m.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = E.createElement("template");
    return s.innerHTML = t, s;
  }
}
function N(r, t, e = r, s) {
  var o, a;
  if (t === O) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = J(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = N(r, i._$AS(r, t.values), i, s)), t;
}
class oe {
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
    x.currentNode = i;
    let n = x.nextNode(), o = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let h;
        l.type === 2 ? h = new L(n, n.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (h = new he(n, this, t)), this._$AV.push(h), l = s[++a];
      }
      o !== (l == null ? void 0 : l.index) && (n = x.nextNode(), o++);
    }
    return x.currentNode = E, i;
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
    t = N(this, t, e), J(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== O && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ie(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && J(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = j.createElement(zt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new oe(i, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = wt.get(t.strings);
    return e === void 0 && wt.set(t.strings, e = new j(t)), e;
  }
  k(t) {
    ot(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new L(this.O(z()), this.O(z()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = bt(t).nextSibling;
      bt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class W {
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
    if (n === void 0) t = N(this, t, e, 0), o = !J(t) || t !== this._$AH && t !== O, o && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = n[0], l = 0; l < n.length - 1; l++) h = N(this, a[s + l], e, l), h === O && (h = this._$AH[l]), o || (o = !J(h) || h !== this._$AH[l]), h === u ? t = u : t !== u && (t += (h ?? "") + n[l + 1]), this._$AH[l] = h;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ae extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class ce extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class le extends W {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = N(this, t, e, 0) ?? u) === O) return;
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
    N(this, t);
  }
}
const tt = R.litHtmlPolyfillSupport;
tt == null || tt(j, L), (R.litHtmlVersions ?? (R.litHtmlVersions = [])).push("3.3.2");
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
const w = globalThis;
class k extends S {
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
    return O;
  }
}
var Ct;
k._$litElement$ = !0, k.finalized = !0, (Ct = w.litElementHydrateSupport) == null || Ct.call(w, { LitElement: k });
const et = w.litElementPolyfillSupport;
et == null || et({ LitElement: k });
(w.litElementVersions ?? (w.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: nt }, ue = (r = pe, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, r, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, r, a), a;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, r, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ge(r) {
  return (t, e) => typeof e == "object" ? ue(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
var kt, Ot, Nt, H;
Nt = [Jt("tabbed-stack-card-editor")];
let A = class A extends (Ot = k, kt = [ge({ attribute: !1 })], Ot) {
  constructor() {
    super(...arguments);
    D(H, 5, this);
  }
  set config(e) {
    e && this.setConfig(e);
  }
  setConfig(e) {
    const s = (e.tabs ?? []).map((i) => ({
      ...i,
      cards: i.cards ?? (i.card ? [i.card] : [])
    }));
    this._config = { ...e, tabs: s };
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
  _setValue(e, s) {
    const i = JSON.parse(JSON.stringify(this._config));
    i[e] = s, this._emitConfigChanged(i);
  }
  _addTab() {
    var i;
    const e = JSON.parse(JSON.stringify(this._config)), s = (((i = e.tabs) == null ? void 0 : i.length) ?? 0) + 1;
    e.tabs = e.tabs ?? [], e.tabs.push({
      id: `Tab${s}`,
      label: `Tab ${s}`,
      icon: "mdi:apps",
      cards: [{ type: "markdown", content: `Hello Tab ${s}` }]
    }), e.default_tab || (e.default_tab = e.tabs[0].id), this._emitConfigChanged(e);
  }
  _removeTab(e) {
    const s = JSON.parse(JSON.stringify(this._config));
    s.tabs.splice(e, 1), s.tabs.length || (s.tabs = [{ id: "Tab1", label: "Tab 1", icon: "mdi:apps", cards: [{ type: "markdown", content: "Hello" }] }]), s.default_tab && !s.tabs.some((i) => i.id === s.default_tab) && (s.default_tab = s.tabs[0].id), this._emitConfigChanged(s);
  }
  _addCard(e) {
    const s = JSON.parse(JSON.stringify(this._config));
    s.tabs[e].cards = s.tabs[e].cards ?? [], s.tabs[e].cards.push({ type: "markdown", content: "New card" }), this._emitConfigChanged(s);
  }
  _removeCard(e, s) {
    var n;
    const i = JSON.parse(JSON.stringify(this._config));
    (n = i.tabs[e].cards) == null || n.splice(s, 1), this._emitConfigChanged(i);
  }
  _updateCard(e, s, i) {
    const n = JSON.parse(JSON.stringify(this._config));
    n.tabs[e].cards = n.tabs[e].cards ?? [], n.tabs[e].cards[s] = i, this._emitConfigChanged(n);
  }
  _renderCardEditor(e, s, i) {
    if (this.hass ? customElements.get("hui-card-element-editor") : void 0) {
      const o = document.createElement("hui-card-element-editor");
      return o.hass = this.hass, o.value = i, o.addEventListener("value-changed", (a) => {
        var h;
        const l = (h = a == null ? void 0 : a.detail) == null ? void 0 : h.value;
        l && this._updateCard(e, s, l);
      }), $`<div class="card-editor">${o}</div>`;
    }
    return $`
      <div class="card-editor">
        <div class="hint">JSON-Fallback (Editor lädt ggf. später nach).</div>
        <textarea
          class="json"
          @change=${(o) => {
      try {
        const a = JSON.parse(o.target.value);
        this._updateCard(e, s, a);
      } catch {
      }
    }}
        >${JSON.stringify(i, null, 2)}</textarea>
      </div>
    `;
  }
  render() {
    return this._config ? $`
      <div class="section">
        <label class="switch">
          <input
            type="checkbox"
            .checked=${!!this._config.sticky_tabs}
            @change=${(e) => this._setValue("sticky_tabs", e.target.checked)}
          />
          <span>Sticky tabs</span>
        </label>
      </div>

      <div class="grid">
        <label>
          <div class="lbl">storage_key (optional)</div>
          <input
            class="inp"
            .value=${this._config.storage_key ?? ""}
            @input=${(e) => this._setValue("storage_key", e.target.value || void 0)}
          />
        </label>

        <label>
          <div class="lbl">default_tab (optional)</div>
          <input
            class="inp"
            .value=${this._config.default_tab ?? ""}
            @input=${(e) => this._setValue("default_tab", e.target.value || void 0)}
          />
        </label>
      </div>

      <div class="tabs-header">
        <div class="h">Tabs</div>
        <button class="btn" @click=${this._addTab}>Add Tab</button>
      </div>

      ${this._config.tabs.map(
      (e, s) => $`
          <div class="tab">
            <div class="tab-top">
              <div class="tab-title">Tab ${s + 1}</div>
              <button class="btn" @click=${() => this._removeTab(s)}>Remove</button>
            </div>

            <div class="grid">
              <label>
                <div class="lbl">id</div>
                <input
                  class="inp"
                  .value=${e.id}
                  @input=${(i) => {
        const n = JSON.parse(JSON.stringify(this._config));
        n.tabs[s].id = i.target.value, this._emitConfigChanged(n);
      }}
                />
              </label>

              <label>
                <div class="lbl">label</div>
                <input
                  class="inp"
                  .value=${e.label ?? ""}
                  @input=${(i) => {
        const n = JSON.parse(JSON.stringify(this._config));
        n.tabs[s].label = i.target.value || void 0, this._emitConfigChanged(n);
      }}
                />
              </label>

              <label>
                <div class="lbl">icon (mdi:...)</div>
                <input
                  class="inp"
                  .value=${e.icon ?? ""}
                  @input=${(i) => {
        const n = JSON.parse(JSON.stringify(this._config));
        n.tabs[s].icon = i.target.value || void 0, this._emitConfigChanged(n);
      }}
                />
              </label>
            </div>

            <div class="cards-header">
              <div class="h2">Cards in Tab</div>
              <button class="btn" @click=${() => this._addCard(s)}>Add Card</button>
            </div>

            ${(e.cards ?? []).map(
        (i, n) => $`
                <div class="card-block">
                  <div class="card-top">
                    <div class="card-title">Card ${n + 1}</div>
                    <button class="btn" @click=${() => this._removeCard(s, n)}>Remove</button>
                  </div>
                  ${this._renderCardEditor(s, n, i)}
                </div>
              `
      )}
          </div>
        `
    )}
    ` : $`<div class="hint">Konfiguration wird geladen…</div>`;
  }
};
H = G(Ot), B(H, 3, "config", kt, A), A = B(H, 0, "TabbedStackCardEditor", Nt, A), A.styles = Tt`
    :host { display:block; padding: 4px 0; }
    .hint { opacity:.7; font-size:12px; margin-bottom:8px; }
    .section { margin-bottom:10px; }
    .switch { display:inline-flex; gap:10px; align-items:center; font-weight:600; }
    .grid { display:grid; grid-template-columns:1fr; gap:10px; margin-bottom:12px; }
    .lbl { font-size:12px; opacity:.7; margin-bottom:4px; }
    .inp { width:100%; padding:8px 10px; border-radius:10px; border:1px solid rgba(0,0,0,.2); background: rgba(255,255,255,.6); }
    .tabs-header,.cards-header { display:flex; align-items:center; justify-content:space-between; margin:12px 0 8px; }
    .h,.h2 { font-weight:800; }
    .btn { padding:6px 10px; border-radius:10px; border:1px solid rgba(0,0,0,.2); background: rgba(0,0,0,.05); cursor:pointer; }
    .tab { border:1px solid rgba(0,0,0,.15); border-radius:12px; padding:12px; margin-bottom:12px; }
    .tab-top,.card-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
    .tab-title,.card-title { font-weight:800; }
    .card-block { border:1px dashed rgba(0,0,0,.25); border-radius:12px; padding:10px; margin-top:10px; }
    textarea.json { width:100%; min-height:140px; padding:10px; border-radius:10px; border:1px solid rgba(0,0,0,.2); font-family: ui-monospace, Menlo, Consolas, monospace; font-size:12px; background: rgba(255,255,255,.6); }
  `, D(H, 1, A);
let Et = A;
var Pt, st, fe;
Pt = [Jt("tabbed-stack-card")];
let C = class C extends (fe = k) {
  // ---- Visual editor integration ----
  static getConfigElement() {
    return document.createElement("tabbed-stack-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:tabbed-stack-card",
      sticky_tabs: !0,
      storage_key: "tabs_default",
      default_tab: "Licht",
      tabs: [
        {
          id: "Licht",
          label: "Licht",
          icon: "mdi:lamp",
          cards: [{ type: "markdown", content: "Hello Licht" }]
        },
        {
          id: "Rollo",
          label: "Rollo",
          icon: "mdi:roller-shade",
          cards: [{ type: "markdown", content: "Hello Rollo" }]
        }
      ]
    };
  }
  setConfig(t) {
    var i;
    if (!((i = t == null ? void 0 : t.tabs) != null && i.length))
      throw new Error("tabs required");
    const e = t.tabs.map((n) => ({
      ...n,
      cards: n.cards ?? (n.card ? [n.card] : [])
    }));
    this._config = { ...t, tabs: e };
    const s = this._config.storage_key ? localStorage.getItem(this._config.storage_key) : null;
    this._activeTab = s || this._config.default_tab || this._config.tabs[0].id, this._buildCard();
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
        throw new Error(
          "Home Assistant card helpers not found (window.loadCardHelpers missing)."
        );
      this._helpers = await window.loadCardHelpers();
    }
    const e = t.cards ?? [], s = e.length <= 1 ? e[0] ?? { type: "markdown", content: "No card configured" } : { type: "vertical-stack", cards: e };
    this._card = this._helpers.createCardElement(s), this._card.hass = this.hass, this.requestUpdate();
  }
  render() {
    return this._config ? $`
      <div class="tabs ${this._config.sticky_tabs ? "sticky" : ""}">
        ${this._config.tabs.map(
      (t) => $`
            <button
              class="chip ${t.id === this._activeTab ? "active" : ""}"
              @click=${() => this._setTab(t.id)}
            >
              ${t.icon ? $`<ha-icon icon="${t.icon}"></ha-icon>` : ""}
              <span>${t.label ?? t.id}</span>
            </button>
          `
    )}
      </div>

      <div class="content">
        ${this._card ?? ""}
      </div>
    ` : $``;
  }
};
st = G(fe), C = B(st, 0, "TabbedStackCard", Pt, C), C.styles = Tt`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
    }

    .tabs {
      display: flex;
      justify-content: center;
      gap: var(--tsc-chip-gap, 12px);
      padding: 10px 0 6px;
      background: var(--tsc-tabs-bg, transparent);
      z-index: 2;
    }

    /* Sticky inside scroll containers (Bubble popup works well) */
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

      /* Theme-friendly defaults */
      background: var(--tsc-chip-bg, rgba(0, 0, 0, 0.18));
      color: var(--primary-text-color);

      font-size: 14px;
      line-height: 1;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .chip.active {
      /* Default active color from theme */
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

      /* Prevent Bubble/global styles from breaking spacing inside our vertical-stack */
      --vertical-stack-card-gap: var(--tsc-stack-gap, 12px);

      width: 100%;
      max-width: 100%;
    }

    /* Ensure inner card takes full width and doesn't get weird layout constraints */
    .content > * {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  `, D(st, 1, C);
let St = C;
export {
  St as TabbedStackCard
};
