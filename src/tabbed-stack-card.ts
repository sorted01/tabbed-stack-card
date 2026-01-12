import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { LovelaceCard } from "custom-card-helpers";

interface TabConfig {
  id: string;
  label?: string;
  icon?: string;
  cards?: any[];
  card?: any; // backward compat
}

interface CardConfig {
  type: string;
  tabs: TabConfig[];
  default_tab?: string;
  storage_key?: string;
  sticky_tabs?: boolean;
}

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<any>;
    customCards?: Array<any>;
  }
}

/* ------------------------- Editor (same file) ------------------------- */

@customElement("tabbed-stack-card-editor")
class TabbedStackCardEditor extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ attribute: false }) public lovelace: any;

  // HA sometimes assigns config via property instead of setConfig()
  @property({ attribute: false })
  set config(value: CardConfig | undefined) {
    if (value) this.setConfig(value);
  }

  @state() private _config?: CardConfig;

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

  public setConfig(config: CardConfig) {
    const tabs = (config.tabs ?? []).map((t) => ({
      ...t,
      cards: t.cards ?? (t.card ? [t.card] : []),
    }));
    this._config = { ...config, tabs };
  }

  private _emitConfigChanged(config: CardConfig) {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _clone(): CardConfig {
    return JSON.parse(JSON.stringify(this._config!));
  }

  private _setValue(key: keyof CardConfig, value: any) {
    const cfg = this._clone();
    (cfg as any)[key] = value;
    this._emitConfigChanged(cfg);
  }

  private _addTab() {
    const cfg = this._clone();
    const idx = (cfg.tabs?.length ?? 0) + 1;
    cfg.tabs = cfg.tabs ?? [];
    cfg.tabs.push({
      id: `Tab${idx}`,
      label: `Tab ${idx}`,
      icon: "mdi:apps",
      cards: [{ type: "markdown", content: `Hello Tab ${idx}` }],
    });
    if (!cfg.default_tab) cfg.default_tab = cfg.tabs[0].id;
    this._emitConfigChanged(cfg);
  }

  private _removeTab(i: number) {
    const cfg = this._clone();
    cfg.tabs.splice(i, 1);
    if (!cfg.tabs.length) {
      cfg.tabs = [
        {
          id: "Tab1",
          label: "Tab 1",
          icon: "mdi:apps",
          cards: [{ type: "markdown", content: "Hello" }],
        },
      ];
    }
    if (cfg.default_tab && !cfg.tabs.some((t) => t.id === cfg.default_tab)) {
      cfg.default_tab = cfg.tabs[0].id;
    }
    this._emitConfigChanged(cfg);
  }

  private _addCard(tabIndex: number) {
    const cfg = this._clone();
    cfg.tabs[tabIndex].cards = cfg.tabs[tabIndex].cards ?? [];
    cfg.tabs[tabIndex].cards!.push({ type: "markdown", content: "New card" });
    this._emitConfigChanged(cfg);
  }

  private _removeCard(tabIndex: number, cardIndex: number) {
    const cfg = this._clone();
    cfg.tabs[tabIndex].cards?.splice(cardIndex, 1);
    this._emitConfigChanged(cfg);
  }

  private _updateCard(tabIndex: number, cardIndex: number, newCardConfig: any) {
    const cfg = this._clone();
    cfg.tabs[tabIndex].cards = cfg.tabs[tabIndex].cards ?? [];
    cfg.tabs[tabIndex].cards![cardIndex] = newCardConfig;
    this._emitConfigChanged(cfg);
  }

  private _renderCardEditor(tabIndex: number, cardIndex: number, cardCfg: any) {
    const EditorEl = this.hass ? customElements.get("hui-card-element-editor") : undefined;

    if (EditorEl) {
      const el: any = document.createElement("hui-card-element-editor");
      el.hass = this.hass;
      el.value = cardCfg;
      el.addEventListener("value-changed", (ev: any) => {
        const value = ev?.detail?.value;
        if (value) this._updateCard(tabIndex, cardIndex, value);
      });
      return html`<div class="card-editor">${el}</div>`;
    }

    return html`
      <div class="card-editor">
        <div class="hint">
          ${this.hass ? "Card-Editor nicht verfügbar → JSON-Fallback." : "HA lädt noch… JSON-Fallback aktiv."}
        </div>
        <textarea
          class="json"
          @change=${(e: any) => {
            try {
              const v = JSON.parse(e.target.value);
              this._updateCard(tabIndex, cardIndex, v);
            } catch {}
          }}
        >${JSON.stringify(cardCfg, null, 2)}</textarea>
      </div>
    `;
  }

  render() {
    if (!this._config) return html`<div class="hint">Konfiguration wird geladen…</div>`;

    return html`
      <div class="section">
        <label class="switch">
          <input
            type="checkbox"
            .checked=${!!this._config.sticky_tabs}
            @change=${(e: any) => this._setValue("sticky_tabs", e.target.checked)}
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
            @input=${(e: any) => this._setValue("storage_key", e.target.value || undefined)}
          />
        </label>

        <label>
          <div class="lbl">default_tab (optional)</div>
          <input
            class="inp"
            .value=${this._config.default_tab ?? ""}
            @input=${(e: any) => this._setValue("default_tab", e.target.value || undefined)}
          />
        </label>
      </div>

      <div class="tabs-header">
        <div class="h">Tabs</div>
        <button class="btn" @click=${this._addTab}>Add Tab</button>
      </div>

      ${this._config.tabs.map(
        (t, i) => html`
          <div class="tab">
            <div class="tab-top">
              <div class="tab-title">Tab ${i + 1}</div>
              <button class="btn" @click=${() => this._removeTab(i)}>Remove</button>
            </div>

            <div class="grid">
              <label>
                <div class="lbl">id</div>
                <input
                  class="inp"
                  .value=${t.id}
                  @input=${(e: any) => {
                    const cfg = this._clone();
                    cfg.tabs[i].id = e.target.value;
                    this._emitConfigChanged(cfg);
                  }}
                />
              </label>

              <label>
                <div class="lbl">label</div>
                <input
                  class="inp"
                  .value=${t.label ?? ""}
                  @input=${(e: any) => {
                    const cfg = this._clone();
                    cfg.tabs[i].label = e.target.value || undefined;
                    this._emitConfigChanged(cfg);
                  }}
                />
              </label>

              <label>
                <div class="lbl">icon (mdi:...)</div>
                <input
                  class="inp"
                  .value=${t.icon ?? ""}
                  @input=${(e: any) => {
                    const cfg = this._clone();
                    cfg.tabs[i].icon = e.target.value || undefined;
                    this._emitConfigChanged(cfg);
                  }}
                />
              </label>
            </div>

            <div class="cards-header">
              <div class="h2">Cards in Tab</div>
              <button class="btn" @click=${() => this._addCard(i)}>Add Card</button>
            </div>

            ${(t.cards ?? []).map(
              (c, ci) => html`
                <div class="card-block">
                  <div class="card-top">
                    <div class="card-title">Card ${ci + 1}</div>
                    <button class="btn" @click=${() => this._removeCard(i, ci)}>Remove</button>
                  </div>
                  ${this._renderCardEditor(i, ci, c)}
                </div>
              `
            )}
          </div>
        `
      )}
    `;
  }

  static styles = css`
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
  `;
}

/* -------------------------- Card (same file) -------------------------- */

@customElement("tabbed-stack-card")
export class TabbedStackCard extends LitElement {
  @state() private _config!: CardConfig;
  @state() private _activeTab!: string;

  private _card?: LovelaceCard;
  private _helpers?: any;

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
    // Ensure setConfig exists even before upgrade
    const el: any = document.createElement("tabbed-stack-card-editor");
    if (typeof el.setConfig !== "function") {
      el.setConfig = (cfg: any) => (el.config = cfg);
    }
    return el;
  }

  static getStubConfig() {
    return {
      sticky_tabs: true,
      storage_key: "tabs_default",
      default_tab: "Licht",
      tabs: [
        { id: "Licht", label: "Licht", icon: "mdi:lamp", cards: [{ type: "markdown", content: "Hello Licht" }] },
        { id: "Rollo", label: "Rollo", icon: "mdi:roller-shade", cards: [{ type: "markdown", content: "Hello Rollo" }] },
      ],
    };
  }

  setConfig(config: CardConfig) {
    if (!config?.tabs?.length) throw new Error("tabs required");

    const normalizedTabs = config.tabs.map((t) => ({
      ...t,
      cards: t.cards ?? (t.card ? [t.card] : []),
    }));

    this._config = { ...config, tabs: normalizedTabs };

    const stored = this._config.storage_key ? localStorage.getItem(this._config.storage_key) : null;
    this._activeTab = stored || this._config.default_tab || this._config.tabs[0].id;

    void this._buildCard();
  }

  private _setTab(id: string) {
    this._activeTab = id;
    if (this._config.storage_key) localStorage.setItem(this._config.storage_key, id);
    void this._buildCard();
  }

  private async _buildCard() {
    if (!this._config?.tabs?.length) return;

    const tab =
      this._config.tabs.find((t) => t.id === this._activeTab) ?? this._config.tabs[0];

    if (!this._helpers) {
      if (!window.loadCardHelpers) throw new Error("window.loadCardHelpers missing.");
      this._helpers = await window.loadCardHelpers();
    }

    const cards = tab.cards ?? [];
    const cardConfig =
      cards.length <= 1
        ? (cards[0] ?? { type: "markdown", content: "No card configured" })
        : { type: "vertical-stack", cards };

    this._card = this._helpers.createCardElement(cardConfig);
    if (this._hass) this._card.hass = this._hass;
    this.requestUpdate();
  }

  render() {
    if (!this._config) return html``;

    return html`
      <div class="tabs ${this._config.sticky_tabs ? "sticky" : ""}">
        ${this._config.tabs.map(
          (t) => html`
            <button
              class="chip ${t.id === this._activeTab ? "active" : ""}"
              @click=${() => this._setTab(t.id)}
            >
              ${t.icon ? html`<ha-icon icon="${t.icon}"></ha-icon>` : ""}
              <span>${t.label ?? t.id}</span>
            </button>
          `
        )}
      </div>

      <div class="content">${this._card ?? ""}</div>
    `;
  }

  static styles = css`
    :host { display:block; width:100%; max-width:100%; }
    .tabs {
      display:flex; justify-content:center;
      gap: var(--tsc-chip-gap, 12px);
      padding:10px 0 6px;
      background: var(--tsc-tabs-bg, transparent);
      z-index:2;
    }
    .tabs.sticky { position: sticky; top: 0; z-index: 10; }
    .chip {
      display:inline-flex; align-items:center; gap:8px;
      padding: var(--tsc-chip-padding, 10px 18px);
      border-radius: var(--tsc-chip-radius, 999px);
      border:none; cursor:pointer;
      background: var(--tsc-chip-bg, rgba(0,0,0,0.18));
      color: var(--primary-text-color);
      font-size:14px; line-height:1;
      user-select:none; -webkit-tap-highlight-color:transparent;
    }
    .chip.active {
      background: var(--tsc-chip-bg-active, var(--primary-color));
      color: var(--tsc-chip-fg-active, var(--text-primary-color, var(--primary-text-color)));
    }
    .chip.active ha-icon {
      color: var(--tsc-chip-fg-active, var(--text-primary-color, var(--primary-text-color)));
    }
    ha-icon { --mdc-icon-size: var(--tsc-chip-icon-size, 22px); }
    .content {
      padding-top: 6px;
      --vertical-stack-card-gap: var(--tsc-stack-gap, 12px);
      width:100%; max-width:100%;
    }
    .content > * { display:block; width:100%; max-width:100%; }
  `;
}

// Card picker registration
window.customCards = window.customCards || [];
window.customCards.push({
  type: "tabbed-stack-card",
  name: "Tabbed Stack Card",
  description: "Tabbed navigation with multiple cards per tab (Bubble-style).",
  preview: true,
});
