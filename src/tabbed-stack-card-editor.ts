import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

type TabConfig = {
  id: string;
  label?: string;
  icon?: string;
  cards?: any[];
  card?: any; // backward compat
};

type CardConfig = {
  type: string;
  tabs: TabConfig[];
  default_tab?: string;
  storage_key?: string;
  sticky_tabs?: boolean;
};

@customElement("tabbed-stack-card-editor")
export class TabbedStackCardEditor extends LitElement {
  @property({ attribute: false }) public hass: any;
  @state() private _config!: CardConfig;

  setConfig(config: CardConfig) {
    // Normalize tabs to cards[]
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

  private _setValue(path: string, value: any) {
    const cfg: any = structuredClone(this._config);
    const parts = path.split(".");
    let cur = cfg;
    for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
    cur[parts[parts.length - 1]] = value;
    this._emitConfigChanged(cfg);
  }

  private _addTab() {
    const cfg = structuredClone(this._config);
    const idx = cfg.tabs.length + 1;
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
    const cfg = structuredClone(this._config);
    cfg.tabs.splice(i, 1);
    if (!cfg.tabs.length) {
      cfg.tabs = [
        { id: "Tab1", label: "Tab 1", icon: "mdi:apps", cards: [{ type: "markdown", content: "Hello" }] },
      ];
    }
    if (cfg.default_tab && !cfg.tabs.some((t) => t.id === cfg.default_tab)) {
      cfg.default_tab = cfg.tabs[0].id;
    }
    this._emitConfigChanged(cfg);
  }

  private _addCard(tabIndex: number) {
    const cfg = structuredClone(this._config);
    cfg.tabs[tabIndex].cards = cfg.tabs[tabIndex].cards ?? [];
    cfg.tabs[tabIndex].cards.push({ type: "markdown", content: "New card" });
    this._emitConfigChanged(cfg);
  }

  private _removeCard(tabIndex: number, cardIndex: number) {
    const cfg = structuredClone(this._config);
    cfg.tabs[tabIndex].cards?.splice(cardIndex, 1);
    this._emitConfigChanged(cfg);
  }

  private _updateCard(tabIndex: number, cardIndex: number, newCardConfig: any) {
    const cfg = structuredClone(this._config);
    cfg.tabs[tabIndex].cards = cfg.tabs[tabIndex].cards ?? [];
    cfg.tabs[tabIndex].cards[cardIndex] = newCardConfig;
    this._emitConfigChanged(cfg);
  }

  private _renderCardEditor(tabIndex: number, cardIndex: number, cardCfg: any) {
    // Prefer HA built-in card editor if available
    const EditorEl = customElements.get("hui-card-element-editor");
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

    // Fallback: JSON textarea
    return html`
      <div class="card-editor">
        <ha-textfield
          class="json"
          label="Card config (JSON fallback)"
          .value=${JSON.stringify(cardCfg, null, 2)}
          @change=${(e: any) => {
            try {
              const v = JSON.parse(e.target.value);
              this._updateCard(tabIndex, cardIndex, v);
            } catch {
              // ignore parse errors
            }
          }}
        ></ha-textfield>
      </div>
    `;
  }

  render() {
    if (!this.hass || !this._config) return html``;

    return html`
      <div class="section">
        <ha-switch
          .checked=${!!this._config.sticky_tabs}
          @change=${(e: any) => this._setValue("sticky_tabs", e.target.checked)}
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
          @change=${(e: any) => this._setValue("storage_key", e.target.value || undefined)}
        ></ha-textfield>

        <ha-textfield
          label="default_tab (optional)"
          .value=${this._config.default_tab ?? ""}
          @change=${(e: any) => this._setValue("default_tab", e.target.value || undefined)}
        ></ha-textfield>
      </div>

      <div class="tabs-header">
        <div class="h">Tabs</div>
        <mwc-button @click=${this._addTab} outlined>Add Tab</mwc-button>
      </div>

      ${this._config.tabs.map((t, i) => html`
        <div class="tab">
          <div class="tab-top">
            <div class="tab-title">Tab ${i + 1}</div>
            <mwc-button @click=${() => this._removeTab(i)} outlined>Remove</mwc-button>
          </div>

          <div class="grid">
            <ha-textfield
              label="id"
              .value=${t.id}
              @change=${(e: any) => {
                const cfg = structuredClone(this._config);
                cfg.tabs[i].id = e.target.value;
                this._emitConfigChanged(cfg);
              }}
            ></ha-textfield>

            <ha-textfield
              label="label"
              .value=${t.label ?? ""}
              @change=${(e: any) => {
                const cfg = structuredClone(this._config);
                cfg.tabs[i].label = e.target.value || undefined;
                this._emitConfigChanged(cfg);
              }}
            ></ha-textfield>

            <ha-textfield
              label="icon (mdi:...)"
              .value=${t.icon ?? ""}
              @change=${(e: any) => {
                const cfg = structuredClone(this._config);
                cfg.tabs[i].icon = e.target.value || undefined;
                this._emitConfigChanged(cfg);
              }}
            ></ha-textfield>
          </div>

          <div class="cards-header">
            <div class="h2">Cards in Tab</div>
            <mwc-button @click=${() => this._addCard(i)} outlined>Add Card</mwc-button>
          </div>

          ${(t.cards ?? []).map((c, ci) => html`
            <div class="card-block">
              <div class="card-top">
                <div class="card-title">Card ${ci + 1}</div>
                <mwc-button @click=${() => this._removeCard(i, ci)} outlined>Remove</mwc-button>
              </div>

              ${this._renderCardEditor(i, ci, c)}
            </div>
          `)}
        </div>
      `)}
    `;
  }

  static styles = css`
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
  `;
}
