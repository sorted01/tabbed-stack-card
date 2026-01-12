import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { LovelaceCard } from "custom-card-helpers";

type Tab = {
  id: string;
  label: string;
  icon?: string;
  cards: any[];
};

type TabbedStackConfig = {
  type: string;
  sticky_tabs?: boolean;
  storage_key?: string;
  default_tab?: string;
  tabs: Tab[];
};

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<any>;
    customCards?: Array<any>;
  }
}

/* =========================
   Editor (same file)
   ========================= */

@customElement("tabbed-stack-card-editor")
class TabbedStackCardEditor extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public lovelace: any;

  @state() private _config?: TabbedStackConfig;

  // HA may set config as property instead of calling setConfig()
  @property({ attribute: false })
  set config(value: TabbedStackConfig | undefined) {
    if (value) this.setConfig(value);
  }

  constructor() {
    super();
    this._upgradeProperty("config");
    this._upgradeProperty("hass");
    this._upgradeProperty("lovelace");
  }

  private _upgradeProperty(prop: string) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = (this as any)[prop];
      delete (this as any)[prop];
      (this as any)[prop] = value;
    }
  }

  public setConfig(config: TabbedStackConfig) {
    // normalize & ensure required structure
    const tabs = (config.tabs ?? []).map((t, idx) => ({
      id: (t.id || `tab_${idx + 1}`).toString(),
      label: (t.label || t.id || `Tab ${idx + 1}`).toString(),
      icon: t.icon,
      cards: Array.isArray(t.cards) ? t.cards : [],
    }));

    this._config = {
      type: "custom:tabbed-stack-card",
      sticky_tabs: !!config.sticky_tabs,
      storage_key: config.storage_key,
      default_tab: config.default_tab,
      tabs: tabs.length ? tabs : [{ id: "tab_1", label: "Tab 1", icon: "mdi:apps", cards: [] }],
    };
  }

  private _emitConfigChanged(cfg: TabbedStackConfig) {
    this._config = cfg;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: cfg },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _clone(): TabbedStackConfig {
    return JSON.parse(JSON.stringify(this._config!));
  }

  private _setRoot<K extends keyof TabbedStackConfig>(key: K, value: TabbedStackConfig[K]) {
    const cfg = this._clone();
    (cfg as any)[key] = value;
    this._emitConfigChanged(cfg);
  }

  private _addTab() {
    const cfg = this._clone();
    const next = cfg.tabs.length + 1;
    cfg.tabs.push({
      id: `tab_${next}`,
      label: `Tab ${next}`,
      icon: "mdi:apps",
      cards: [],
    });
    if (!cfg.default_tab) cfg.default_tab = cfg.tabs[0].id;
    this._emitConfigChanged(cfg);
  }

  private _removeTab(index: number) {
    const cfg = this._clone();
    cfg.tabs.splice(index, 1);
    if (!cfg.tabs.length) {
      cfg.tabs = [{ id: "tab_1", label: "Tab 1", icon: "mdi:apps", cards: [] }];
    }
    if (cfg.default_tab && !cfg.tabs.some((t) => t.id === cfg.default_tab)) {
      cfg.default_tab = cfg.tabs[0].id;
    }
    this._emitConfigChanged(cfg);
  }

  private _updateTab(index: number, patch: Partial<Tab>) {
    const cfg = this._clone();
    cfg.tabs[index] = { ...cfg.tabs[index], ...patch };
    this._emitConfigChanged(cfg);
  }

  private _addCard(tabIndex: number) {
    const cfg = this._clone();
    cfg.tabs[tabIndex].cards = cfg.tabs[tabIndex].cards ?? [];
    cfg.tabs[tabIndex].cards.push({ type: "markdown", content: "New card" });
    this._emitConfigChanged(cfg);
  }

  private _removeCard(tabIndex: number, cardIndex: number) {
    const cfg = this._clone();
    cfg.tabs[tabIndex].cards.splice(cardIndex, 1);
    this._emitConfigChanged(cfg);
  }

  private _updateCard(tabIndex: number, cardIndex: number, newCardConfig: any) {
    const cfg = this._clone();
    cfg.tabs[tabIndex].cards[cardIndex] = newCardConfig;
    this._emitConfigChanged(cfg);
  }

  private _renderHACardEditor(tabIndex: number, cardIndex: number, cardCfg: any) {
    // Prefer HA's standard card editor
    const EditorEl = this.hass ? customElements.get("hui-card-element-editor") : undefined;

    if (EditorEl) {
      const el: any = document.createElement("hui-card-element-editor");
      el.hass = this.hass;
      el.value = cardCfg;
      el.addEventListener("value-changed", (ev: any) => {
        const value = ev?.detail?.value;
        if (value) this._updateCard(tabIndex, cardIndex, value);
      });
      return el;
    }

    // Fallback JSON editor
    return html`
      <textarea
        class="json"
        @change=${(e: any) => {
          try {
            const v = JSON.parse(e.target.value);
            this._updateCard(tabIndex, cardIndex, v);
          } catch {}
        }}
      >${JSON.stringify(cardCfg, null, 2)}</textarea>
    `;
  }

  render() {
    if (!this._config) return html`<div class="hint">Konfiguration wird geladen…</div>`;

    return html`
      <div class="root">
        <div class="row">
          <label class="switch">
            <input
              type="checkbox"
              .checked=${!!this._config.sticky_tabs}
              @change=${(e: any) => this._setRoot("sticky_tabs", e.target.checked)}
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
              @input=${(e: any) => this._setRoot("storage_key", e.target.value || undefined)}
            />
          </label>

          <label>
            <div class="lbl">default_tab (optional)</div>
            <input
              class="inp"
              .value=${this._config.default_tab ?? ""}
              @input=${(e: any) => this._setRoot("default_tab", e.target.value || undefined)}
            />
          </label>
        </div>

        <div class="header">
          <div class="h">Tabs</div>
          <button class="btn" @click=${this._addTab}>Add Tab</button>
        </div>

        ${this._config.tabs.map(
          (t, i) => html`
            <div class="tab">
              <div class="tabTop">
                <div class="tabTitle">Tab ${i + 1}</div>
                <button class="btn danger" @click=${() => this._removeTab(i)}>Remove</button>
              </div>

              <div class="grid">
                <label>
                  <div class="lbl">id</div>
                  <input
                    class="inp"
                    .value=${t.id}
                    @input=${(e: any) => this._updateTab(i, { id: e.target.value })}
                  />
                </label>

                <label>
                  <div class="lbl">label</div>
                  <input
                    class="inp"
                    .value=${t.label}
                    @input=${(e: any) => this._updateTab(i, { label: e.target.value })}
                  />
                </label>

                <label>
                  <div class="lbl">icon (mdi:...)</div>
                  <input
                    class="inp"
                    .value=${t.icon ?? ""}
                    @input=${(e: any) => this._updateTab(i, { icon: e.target.value || undefined })}
                  />
                </label>
              </div>

              <div class="header small">
                <div class="h2">Cards</div>
                <button class="btn" @click=${() => this._addCard(i)}>Add Card</button>
              </div>

              ${(t.cards ?? []).map(
                (c, ci) => html`
                  <div class="cardBlock">
                    <div class="cardTop">
                      <div class="cardTitle">Card ${ci + 1}</div>
                      <button class="btn danger" @click=${() => this._removeCard(i, ci)}>Remove</button>
                    </div>
                    <div class="cardEditor">
                      ${this._renderHACardEditor(i, ci, c)}
                    </div>
                  </div>
                `
              )}
            </div>
          `
        )}
      </div>
    `;
  }

  static styles = css`
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
  `;
}

/* =========================
   Card (same file)
   ========================= */

@customElement("tabbed-stack-card")
export class TabbedStackCard extends LitElement {
  @state() private _config!: TabbedStackConfig;
  @state() private _activeTab!: string;

  private _helpers?: any;
  private _card?: LovelaceCard;

  // always forward hass updates
  private _hass: any;

  public set hass(value: any) {
    this._hass = value;
    if (this._card) this._card.hass = value;
    this.requestUpdate();
  }
  public get hass() {
    return this._hass;
  }

  static getConfigElement() {
    // Return editor element that definitely supports setConfig even before upgrade
    const el: any = document.createElement("tabbed-stack-card-editor");
    if (typeof el.setConfig !== "function") el.setConfig = (cfg: any) => (el.config = cfg);
    return el;
  }

  static getStubConfig(): Omit<TabbedStackConfig, "type"> {
    return {
      sticky_tabs: true,
      storage_key: "tabbed_stack_active",
      default_tab: "tab_1",
      tabs: [
        { id: "tab_1", label: "Licht", icon: "mdi:lamp", cards: [] },
        { id: "tab_2", label: "Rollo", icon: "mdi:roller-shade", cards: [] },
      ],
    };
  }

  setConfig(config: TabbedStackConfig) {
    if (!config?.tabs?.length) {
      throw new Error("tabs required");
    }

    // normalize
    const tabs: Tab[] = config.tabs.map((t, idx) => ({
      id: (t.id || `tab_${idx + 1}`).toString(),
      label: (t.label || t.id || `Tab ${idx + 1}`).toString(),
      icon: t.icon,
      cards: Array.isArray(t.cards) ? t.cards : [],
    }));

    this._config = {
      type: "custom:tabbed-stack-card",
      sticky_tabs: !!config.sticky_tabs,
      storage_key: config.storage_key,
      default_tab: config.default_tab,
      tabs,
    };

    const stored =
      this._config.storage_key ? localStorage.getItem(this._config.storage_key) : null;

    const initial =
      (stored && tabs.some((t) => t.id === stored) && stored) ||
      (this._config.default_tab && tabs.some((t) => t.id === this._config.default_tab) && this._config.default_tab) ||
      tabs[0].id;

    this._activeTab = initial;
    void this._buildActive();
  }

  private _setTab(id: string) {
    this._activeTab = id;
    if (this._config.storage_key) localStorage.setItem(this._config.storage_key, id);
    void this._buildActive();
  }

  private async _buildActive() {
    const tab = this._config.tabs.find((t) => t.id === this._activeTab) ?? this._config.tabs[0];

    if (!this._helpers) {
      if (!window.loadCardHelpers) throw new Error("window.loadCardHelpers missing.");
      this._helpers = await window.loadCardHelpers();
    }

    const cards = tab.cards ?? [];
    const cfg =
      cards.length === 0
        ? { type: "markdown", content: `No cards in "${tab.label}"` }
        : cards.length === 1
        ? cards[0]
        : { type: "vertical-stack", cards };

    this._card = this._helpers.createCardElement(cfg);
    if (this._hass) this._card.hass = this._hass;
    this.requestUpdate();
  }

  render() {
    if (!this._config) return html``;

    return html`
      <div class="tabs ${this._config.sticky_tabs ? "sticky" : ""}">
        <div class="tabs-inner">
          ${this._config.tabs.map(
            (t) => html`
              <button
                class="chip ${t.id === this._activeTab ? "active" : ""}"
                @click=${() => this._setTab(t.id)}
                title=${t.label}
              >
                ${t.icon ? html`<ha-icon icon="${t.icon}"></ha-icon>` : nothing}
                <span>${t.label}</span>
              </button>
            `
          )}
        </div>
      </div>

      <div class="content">${this._card ?? nothing}</div>
    `;
  }

  static styles = css`
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
  `;
}

/* =========================
   Card picker registration
   ========================= */

window.customCards = window.customCards || [];
window.customCards.push({
  type: "tabbed-stack-card",
  name: "Tabbed Stack Card",
  description: "Centered sticky tabs + multiple cards per tab + visual editor",
  preview: true,
});
