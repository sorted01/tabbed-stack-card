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
  @state() private _config?: CardConfig;

  setConfig(config: CardConfig) {
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

  private _setValue(key: keyof CardConfig, value: any) {
    const cfg = structuredClone(this._config!);
    (cfg as any)[key] = value;
    this._emitConfigChanged(cfg);
  }

  private _addTab() {
    const cfg = structuredClone(this._config!);
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
    const cfg = structuredClone(this._config!);
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
    const cfg = structuredClone(this._config!);
    cfg.tabs[tabIndex].cards = cfg.tabs[tabIndex].cards ?? [];
    cfg.tabs[tabIndex].cards!.push({ type: "markdown", content: "New card" });
    this._emitConfigChanged(cfg);
  }

  private _removeCard(tabIndex: number, cardIndex: number) {
    const cfg = structuredClone(this._config!);
    cfg.tabs[tabIndex].cards?.splice(cardIndex, 1);
    this._emitConfigChanged(cfg);
  }

  private _updateCard(tabIndex: number, cardIndex: number, newCardConfig: any) {
    const cfg = structuredClone(this._config!);
    cfg.tabs[tabIndex].cards = cfg.tabs[tabIndex].cards ?? [];
    cfg.tabs[tabIndex].cards![cardIndex] = newCardConfig;
    this._emitConfigChanged(cfg);
  }

  private _renderCardEditor(tabIndex: number, cardIndex: number, cardCfg: any) {
    // If HA editor exists and hass is available, use it
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

    // Fallback JSON editor (always works)
    return html`
      <div class="card-editor">
        <div class="hint">
          ${this.hass
            ? "Card-Editor nicht verfügbar → JSON-Fallback."
            : "Home Assistant Kontext lädt noch… JSON-Fallback aktiv."}
        </div>
        <textarea
          class="json"
          @change=${(e: any) => {
            try {
              const v = JSON.parse(e.target.value);
              this._updateCard(tabIndex, cardIndex, v);
            } catch {
              // ignore parse errors
            }
          }}
        >${JSON.stringify(cardCfg, null, 2)}</textarea>
      </div>
    `;
  }

  render() {
    if (!this._config) {
      return html`<div class="hint">Konfiguration wird geladen…</div>`;
    }

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
                    const cfg = structuredClone(this._config!);
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
                    const cfg = structuredClone(this._config!);
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
                    const cfg = structuredClone(this._config!);
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
    :host {
      display: block;
      padding: 4px 0;
    }
    .hint {
      opacity: 0.7;
      font-size: 12px;
      margin-bottom: 8px;
    }
    .section {
      margin-bottom: 10px;
    }
    .switch {
      display: inline-flex;
      gap: 10px;
      align-items: center;
      font-weight: 600;
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
      border: 1px solid rgba(0,0,0,0.2);
      background: rgba(255,255,255,0.6);
    }
    .tabs-header, .cards-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 12px 0 8px;
    }
    .h, .h2 {
      font-weight: 800;
    }
    .btn {
      padding: 6px 10px;
      border-radius: 10px;
      border: 1px solid rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.05);
      cursor: pointer;
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
      font-weight: 800;
    }
    .card-block {
      border: 1px dashed rgba(0,0,0,0.25);
      border-radius: 12px;
      padding: 10px;
      margin-top: 10px;
    }
    textarea.json {
      width: 100%;
      min-height: 140px;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid rgba(0,0,0,0.2);
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 12px;
      background: rgba(255,255,255,0.6);
    }
  `;
}
