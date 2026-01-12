import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/* -----------------------------------------------------------
   TEIL 1: DER EDITOR
   ----------------------------------------------------------- */
@customElement("tabbed-stack-card-editor")
export class TabbedStackCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @property({ attribute: false }) public lovelace?: any;
  @state() private _config?: any;

  public setConfig(config: any): void {
    this._config = config;
  }

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
    if (!this._config) return;
    const target = ev.target.configValue;
    const value = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;

    const newConfig = this._cloneConfig();
    newConfig[target] = value;
    this._emitConfigChanged(newConfig);
  }

  private _addTab() {
    const newConfig = this._cloneConfig();
    const newTabs = [...(newConfig.tabs || [])];
    const id = `tab_${Date.now()}`;
    newTabs.push({ id, label: "Neuer Tab", icon: "mdi:star", cards: [] });
    newConfig.tabs = newTabs;
    this._emitConfigChanged(newConfig);
  }

  private _removeTab(index: number) {
    const newConfig = this._cloneConfig();
    newConfig.tabs.splice(index, 1);
    this._emitConfigChanged(newConfig);
  }

  private _handleCardChanged(tabIndex: number, cardIndex: number, ev: any) {
    ev.stopPropagation();
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

  private _removeCard(tabIndex: number, cardIndex: number) {
      const newConfig = this._cloneConfig();
      newConfig.tabs[tabIndex].cards.splice(cardIndex, 1);
      this._emitConfigChanged(newConfig);
  }

  render() {
    // FIX: Wir warten hier NICHT mehr auf this.hass, nur auf die Config
    if (!this._config) {
      return html`<div style="padding: 20px;">Lade Konfiguration...</div>`;
    }

    return html`
      <div class="editor-container">
        <div class="global-settings">
          <div class="row">
             <label>Storage Key (optional)</label>
             <input class="inp" .value=${this._config.storage_key || ""} .configValue=${"storage_key"} @input=${this._handleValueChanged}>
          </div>
          <div class="row checkbox">
             <input type="checkbox" id="sticky" .checked=${this._config.sticky_tabs} .configValue=${"sticky_tabs"} @change=${this._handleValueChanged}>
             <label for="sticky">Sticky Tabs (oben fixiert)</label>
          </div>
        </div>

        <h3>Tabs</h3>
        ${(this._config.tabs || []).map((tab: any, tIdx: number) => html`
          <div class="tab-card">
            <div class="tab-header">
               <div class="inputs">
                  <input class="inp" placeholder="Label" .value=${tab.label || ""} @input=${(e: any) => {
                    const cfg = this._cloneConfig(); cfg.tabs[tIdx].label = e.target.value; this._emitConfigChanged(cfg);
                  }}>
                  <input class="inp" placeholder="Icon (mdi:...)" .value=${tab.icon || ""} @input=${(e: any) => {
                    const cfg = this._cloneConfig(); cfg.tabs[tIdx].icon = e.target.value; this._emitConfigChanged(cfg);
                  }}>
               </div>
               <button class="btn danger" @click=${() => this._removeTab(tIdx)}>X</button>
            </div>

            <div class="cards-list">
              ${(tab.cards || []).map((card: any, cIdx: number) => html`
                <div class="card-item">
                   <div class="card-top">
                      <span>${card.type}</span>
                      <button class="btn-xs danger" @click=${() => this._removeCard(tIdx, cIdx)}>Löschen</button>
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
        <button class="btn big-add" @click=${this._addTab}>Neuen Tab hinzufügen</button>
      </div>
    `;
  }

  static styles = css`
    .editor-container { padding: 10px; border: 1px solid transparent; }
    .inp { padding: 8px; width: 100%; box-sizing: border-box; border-radius: 5px; border: 1px solid #ccc; margin-bottom: 5px;}
    .row { margin-bottom: 10px; }
    .checkbox { display: flex; align-items: center; gap: 10px; }
    .tab-card { background: rgba(127,127,127,0.1); padding: 10px; border-radius: 8px; margin-bottom: 15px; border: 1px solid rgba(127,127,127,0.2); }
    .tab-header { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px; }
    .inputs { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
    .card-item { background: var(--card-background-color, #fff); border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 5px; }
    .card-top { display: flex; justify-content: space-between; font-size: 0.8em; margin-bottom: 5px; opacity: 0.7; font-weight: bold; text-transform: uppercase; }
    .btn { cursor: pointer; border: none; padding: 5px 10px; border-radius: 5px; background: #ddd; }
    .btn.danger { background: #f44336; color: white; }
    .btn.add-btn { background: #2196F3; color: white; width: 100%; margin-top: 5px;}
    .btn.big-add { background: #4CAF50; color: white; width: 100%; padding: 10px; font-weight: bold;}
    .btn-xs { font-size: 10px; padding: 2px 5px; }
  `;
}

/* -----------------------------------------------------------
   TEIL 2: DIE KARTE
   ----------------------------------------------------------- */
@customElement("tabbed-stack-card")
export class TabbedStackCard extends LitElement {
  @state() private _config: any;
  @state() private _activeTab: string = "";
  @state() private _error?: string;
  
  private _cardElement: any;
  private _helpers: any;
  private _hass: any;

  // Editor Konfiguration
  static getConfigElement() {
    return document.createElement("tabbed-stack-card-editor");
  }

  static getStubConfig() {
    return {
      sticky_tabs: false,
      tabs: [
        { id: "t1", label: "Tab 1", icon: "mdi:home", cards: [{ type: "markdown", content: "Willkommen!" }] },
        { id: "t2", label: "Tab 2", icon: "mdi:lightbulb", cards: [] }
      ]
    };
  }

  public set hass(value: any) {
    this._hass = value;
    if (this._cardElement) {
      this._cardElement.hass = value;
    }
  }

  public get hass() {
      return this._hass;
  }

  public setConfig(config: any) {
    if (!config) throw new Error("Keine Konfiguration");
    this._config = config;

    // Standard-Tab setzen
    if (this._config.tabs && this._config.tabs.length > 0) {
        const stored = this._config.storage_key ? localStorage.getItem(this._config.storage_key) : null;
        // Validiere, ob der gespeicherte Tab noch existiert
        const tabExists = stored && this._config.tabs.some((t: any) => t.id === stored);
        
        if (tabExists) {
            this._activeTab = stored!;
        } else if (!this._activeTab) {
            this._activeTab = this._config.default_tab || this._config.tabs[0].id;
        }
    }
    
    // Karte bauen starten
    this._buildCard();
  }

  private _setTab(id: string) {
    this._activeTab = id;
    if (this._config.storage_key) {
      localStorage.setItem(this._config.storage_key, id);
    }
    this._buildCard();
  }

  private async _buildCard() {
    if (!this._config || !this._activeTab) return;

    try {
        // 1. Helpers laden, falls noch nicht da
        if (!this._helpers) {
            if ((window as any).loadCardHelpers) {
                this._helpers = await (window as any).loadCardHelpers();
            } else {
                throw new Error("Card Helpers nicht verfügbar.");
            }
        }

        // 2. Aktuellen Tab finden
        const tab = this._config.tabs.find((t: any) => t.id === this._activeTab) || this._config.tabs[0];
        if (!tab) return;

        // 3. Konfiguration für den Inhalt erstellen (Vertical Stack)
        const cards = tab.cards || [];
        const stackConfig = {
            type: "vertical-stack",
            cards: cards
        };

        // 4. Element erzeugen
        this._cardElement = this._helpers.createCardElement(stackConfig);
        
        // 5. Hass sofort übergeben, falls vorhanden
        if (this._hass) {
            this._cardElement.hass = this._hass;
        }

        // 6. UI Update anfordern
        this.requestUpdate();

    } catch (e: any) {
        console.error("TabbedStackCard Error:", e);
        this._error = e.message;
        this.requestUpdate();
    }
  }

  render() {
    if (!this._config) return html``;
    
    // Fallback falls Fehler aufgetreten
    if (this._error) return html`<div style="color: red; padding: 10px; border: 1px solid red;">Fehler: ${this._error}</div>`;

    const tabs = this._config.tabs || [];

    return html`
      <div class="tabs-container ${this._config.sticky_tabs ? "sticky" : ""}">
        <div class="tabs-scroll">
            ${tabs.map((t: any) => html`
            <button 
                class="chip ${t.id === this._activeTab ? "active" : ""}"
                @click=${() => this._setTab(t.id)}
            >
                ${t.icon ? html`<ha-icon .icon="${t.icon}"></ha-icon>` : ""}
                <span>${t.label || t.id}</span>
            </button>
            `)}
        </div>
      </div>

      <div class="content">
        ${this._cardElement 
            ? this._cardElement 
            : html`<div class="loading">Lade Karten... (Helpers: ${!!this._helpers})</div>`
        }
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .tabs-container { 
        padding: 8px 0; 
        background: var(--tsc-bg, transparent);
        margin: 0 -4px; /* Leichter Überhang für bessere Optik */
    }
    .tabs-container.sticky {
        position: sticky; top: 0; z-index: 5;
        background: var(--card-background-color, rgba(255,255,255,0.9));
        backdrop-filter: blur(5px);
    }
    .tabs-scroll {
        display: flex; gap: 8px; overflow-x: auto; padding: 0 4px;
        scrollbar-width: none; /* Firefox */
    }
    .tabs-scroll::-webkit-scrollbar { display: none; }
    
    .chip {
        display: flex; align-items: center; gap: 6px;
        padding: 8px 16px; border-radius: 18px; border: none;
        background: var(--secondary-background-color, #e0e0e0);
        color: var(--primary-text-color);
        font-weight: 500; cursor: pointer; white-space: nowrap;
        transition: background 0.2s;
    }
    .chip.active {
        background: var(--primary-color, #03a9f4);
        color: var(--text-primary-color, #fff);
    }
    .chip.active ha-icon { color: inherit; }
    
    .content { margin-top: 8px; min-height: 50px; }
    .loading { opacity: 0.6; font-style: italic; padding: 20px; text-align: center;}
  `;
}

// Registrierung am Ende
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "tabbed-stack-card",
  name: "Tabbed Stack Card",
  description: "Tabs für deine Karten",
});