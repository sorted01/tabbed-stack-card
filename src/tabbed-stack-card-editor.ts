import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("tabbed-stack-card-editor")
export class TabbedStackCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @property({ attribute: false }) public lovelace?: any;

  @state() private _config?: any;

  // HA ruft diese Methode auf, um die Konfiguration zu übergeben
  public setConfig(config: any): void {
    this._config = config;
  }

  // Hilfsmethode: Sendet die neue Config an Home Assistant
  private _emitConfigChanged(config: any) {
    const event = new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _cloneConfig() {
    return JSON.parse(JSON.stringify(this._config));
  }

  private _handleValueChanged(ev: any) {
    if (!this._config || !this.hass) return;
    const target = ev.target.configValue;
    const value = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;

    if (this._config[target] === value) return;

    const newConfig = this._cloneConfig();
    if (value === "" || value === undefined) {
      delete newConfig[target];
    } else {
      newConfig[target] = value;
    }
    this._emitConfigChanged(newConfig);
  }

  private _addTab() {
    const newConfig = this._cloneConfig();
    const newTabs = [...(newConfig.tabs || [])];
    const id = `tab_${Date.now()}`;
    newTabs.push({
      id,
      label: `Neuer Tab`,
      icon: "mdi:border-all",
      cards: []
    });
    newConfig.tabs = newTabs;
    this._emitConfigChanged(newConfig);
  }

  private _removeTab(index: number) {
    const newConfig = this._cloneConfig();
    newConfig.tabs.splice(index, 1);
    this._emitConfigChanged(newConfig);
  }

  private _handleCardChanged(tabIndex: number, cardIndex: number, ev: any) {
    ev.stopPropagation(); // Verhindert Endlosschleifen
    const newConfig = this._cloneConfig();
    newConfig.tabs[tabIndex].cards[cardIndex] = ev.detail.value;
    this._emitConfigChanged(newConfig);
  }

  private _addCard(tabIndex: number) {
    const newConfig = this._cloneConfig();
    if (!newConfig.tabs[tabIndex].cards) newConfig.tabs[tabIndex].cards = [];
    newConfig.tabs[tabIndex].cards.push({ type: "markdown", content: "Neue Karte" });
    this._emitConfigChanged(newConfig);
  }

  render() {
    if (!this.hass || !this._config) {
      return html`<div>Lade Konfiguration...</div>`;
    }

    return html`
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

        ${this._config.tabs?.map((tab: any, tIdx: number) => html`
          <div class="tab-card">
            <div class="tab-header">
              <strong>${tab.label || tab.id}</strong>
              <button class="btn danger" @click=${() => this._removeTab(tIdx)}>Löschen</button>
            </div>

            <div class="grid">
              <input class="inp" placeholder="ID" .value=${tab.id} @input=${(e: any) => {
                const cfg = this._cloneConfig();
                cfg.tabs[tIdx].id = e.target.value;
                this._emitConfigChanged(cfg);
              }} />
              <input class="inp" placeholder="Label" .value=${tab.label || ""} @input=${(e: any) => {
                const cfg = this._cloneConfig();
                cfg.tabs[tIdx].label = e.target.value;
                this._emitConfigChanged(cfg);
              }} />
            </div>

            <div class="cards-section">
              <h4>Karten in diesem Tab</h4>
              ${tab.cards?.map((card: any, cIdx: number) => html`
                <div class="card-wrapper">
                  <div class="card-editor-header">
                     <span>Karte ${cIdx + 1} (${card.type})</span>
                     <button class="btn-small danger" @click=${() => {
                        const cfg = this._cloneConfig();
                        cfg.tabs[tIdx].cards.splice(cIdx, 1);
                        this._emitConfigChanged(cfg);
                     }}>Entfernen</button>
                  </div>
                  <hui-card-element-editor
                    .hass=${this.hass}
                    .value=${card}
                    .lovelace=${this.lovelace}
                    @value-changed=${(ev: any) => this._handleCardChanged(tIdx, cIdx, ev)}
                  ></hui-card-element-editor>
                </div>
              `)}
              <button class="btn add-btn" @click=${() => this._addCard(tIdx)}>+ Karte hinzufügen</button>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  static styles = css`
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
  `;
}