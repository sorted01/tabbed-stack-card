import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/* ==========================================================================
   INTERFACES & TYPES
   ========================================================================== */
interface TabConfig {
  id: string;
  label: string;
  icon?: string;
  cards: any[]; // Array von Karten-Konfigurationen
}

interface CardConfig {
  type: string;
  tabs: TabConfig[];
  sticky?: boolean;
  default_tab?: string;
}

/* ==========================================================================
   TEIL 1: DER VISUELLE EDITOR
   ========================================================================== */
@customElement("tabbed-stack-card-editor")
export class TabbedStackCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @property({ attribute: false }) public lovelace?: any;
  @state() private _config?: CardConfig;
  @state() private _activeTabEditor: number | null = null; // Welcher Tab ist im Editor gerade offen?

  public setConfig(config: CardConfig): void {
    this._config = config;
    // Wenn noch keine Tabs da sind, initialisiere ein leeres Array
    if (!this._config.tabs) {
      this._config = { ...this._config, tabs: [] };
    }
  }

  private _fireConfigChanged(newConfig: CardConfig) {
    const event = new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  // --- Actions ---

  private _addTab() {
    if (!this._config) return;
    const newTabs = [...(this._config.tabs || [])];
    const idx = newTabs.length + 1;
    newTabs.push({
      id: `tab_${Date.now()}`,
      label: `Tab ${idx}`,
      icon: "mdi:view-dashboard",
      cards: [],
    });
    this._fireConfigChanged({ ...this._config, tabs: newTabs });
    this._activeTabEditor = newTabs.length - 1; // Öffne den neuen Tab direkt
  }

  private _removeTab(index: number) {
    if (!this._config) return;
    const newTabs = [...this._config.tabs];
    newTabs.splice(index, 1);
    this._fireConfigChanged({ ...this._config, tabs: newTabs });
    this._activeTabEditor = null;
  }

  private _addCardToTab(tabIndex: number) {
    if (!this._config) return;
    const newTabs = JSON.parse(JSON.stringify(this._config.tabs));
    // Wir fügen eine Standard-Karte hinzu, die der User dann ändern kann
    newTabs[tabIndex].cards.push({ type: "markdown", content: "Neue Karte - Bitte bearbeiten" });
    this._fireConfigChanged({ ...this._config, tabs: newTabs });
  }

  private _removeCardFromTab(tabIndex: number, cardIndex: number) {
    if (!this._config) return;
    const newTabs = JSON.parse(JSON.stringify(this._config.tabs));
    newTabs[tabIndex].cards.splice(cardIndex, 1);
    this._fireConfigChanged({ ...this._config, tabs: newTabs });
  }

  private _updateCardConfig(tabIndex: number, cardIndex: number, newCardConfig: any) {
    if (!this._config) return;
    const newTabs = JSON.parse(JSON.stringify(this._config.tabs));
    newTabs[tabIndex].cards[cardIndex] = newCardConfig;
    this._fireConfigChanged({ ...this._config, tabs: newTabs });
  }

  private _toggleSticky(ev: any) {
     if (!this._config) return;
     this._fireConfigChanged({ ...this._config, sticky: ev.target.checked });
  }

  private _updateTabProp(tabIndex: number, prop: string, value: string) {
    if (!this._config) return;
    const newTabs = JSON.parse(JSON.stringify(this._config.tabs));
    newTabs[tabIndex][prop] = value;
    this._fireConfigChanged({ ...this._config, tabs: newTabs });
  }

  // --- Render ---

  render() {
    if (!this.hass || !this._config) return html`<div>Lade Editor...</div>`;

    const tabs = this._config.tabs || [];

    return html`
      <div class="card-config">
        
        <div class="option-row">
            <ha-switch 
                .checked=${this._config.sticky === true} 
                @change=${this._toggleSticky}
            ></ha-switch>
            <span>Tabs oben anheften (Sticky)</span>
        </div>

        <div class="separator"></div>

        <h3>Tabs verwalten</h3>
        ${tabs.map((tab, tIdx) => html`
            <div class="tab-box ${this._activeTabEditor === tIdx ? 'open' : ''}">
                <div class="tab-header">
                    <div class="tab-inputs">
                        <ha-icon icon="${tab.icon || 'mdi:view-dashboard'}"></ha-icon>
                        <input 
                            type="text" 
                            class="flat-input bold" 
                            .value=${tab.label} 
                            @change=${(e: any) => this._updateTabProp(tIdx, 'label', e.target.value)}
                        />
                    </div>
                    <div class="actions">
                        <button class="icon-btn" @click=${() => this._activeTabEditor = (this._activeTabEditor === tIdx ? null : tIdx)}>
                            ${this._activeTabEditor === tIdx ? '▲' : '▼'} Bearbeiten
                        </button>
                        <button class="icon-btn delete" @click=${() => this._removeTab(tIdx)}>🗑</button>
                    </div>
                </div>

                ${this._activeTabEditor === tIdx ? html`
                    <div class="tab-content-editor">
                        <div class="row">
                             <label>Icon:</label>
                             <input type="text" class="flat-input" .value=${tab.icon || ''} @change=${(e: any) => this._updateTabProp(tIdx, 'icon', e.target.value)} placeholder="mdi:...">
                        </div>
                        <div class="row">
                             <label>ID (optional):</label>
                             <input type="text" class="flat-input" .value=${tab.id} @change=${(e: any) => this._updateTabProp(tIdx, 'id', e.target.value)}>
                        </div>

                        <h4>Karten in diesem Tab</h4>
                        ${(tab.cards || []).map((card: any, cIdx: number) => html`
                            <div class="card-wrapper">
                                <div class="card-actions-top">
                                    <span class="type-badge">${card.type}</span>
                                    <button class="text-btn delete" @click=${() => this._removeCardFromTab(tIdx, cIdx)}>Entfernen</button>
                                </div>
                                
                                <hui-card-element-editor
                                    .hass=${this.hass}
                                    .value=${card}
                                    .lovelace=${this.lovelace}
                                    @value-changed=${(ev: CustomEvent) => {
                                        ev.stopPropagation();
                                        this._updateCardConfig(tIdx, cIdx, ev.detail.value);
                                    }}
                                ></hui-card-element-editor>
                            </div>
                        `)}

                        <button class="add-btn" @click=${() => this._addCardToTab(tIdx)}>
                            + Karte hinzufügen
                        </button>
                    </div>
                ` : ''}
            </div>
        `)}

        <button class="add-btn main" @click=${this._addTab}>
            + Neuen Tab hinzufügen
        </button>

      </div>
    `;
  }

  static styles = css`
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
  `;
}

/* ==========================================================================
   TEIL 2: DIE KARTE
   ========================================================================== */
@customElement("tabbed-stack-card")
export class TabbedStackCard extends LitElement {
  @state() private _config?: CardConfig;
  @state() private _activeTabId: string = "";
  @state() private _helpers?: any;
  
  private _cardElement?: any; // Die aktuelle Helper-Karte (Vertical Stack)
  private _hass: any;

  // Verknüpfung zum Editor
  public static getConfigElement() {
    return document.createElement("tabbed-stack-card-editor");
  }

  public static getStubConfig() {
    return {
      sticky: false,
      tabs: [
        { id: "tab1", label: "Wohnzimmer", icon: "mdi:sofa", cards: [] },
        { id: "tab2", label: "Licht", icon: "mdi:lightbulb", cards: [] }
      ]
    };
  }

  public set hass(value: any) {
    this._hass = value;
    // Update auch an die Kind-Karte weitergeben, falls vorhanden
    if (this._cardElement) {
      this._cardElement.hass = value;
    }
  }

  public setConfig(config: CardConfig) {
    if (!config) throw new Error("Invalid Configuration");
    this._config = config;
    
    // Aktiven Tab wiederherstellen oder Standard setzen
    if (this._config.tabs && this._config.tabs.length > 0) {
        if (!this._activeTabId || !this._config.tabs.find(t => t.id === this._activeTabId)) {
            this._activeTabId = this._config.tabs[0].id;
        }
    }
    
    this._createCardElement();
  }

  private async _loadHelpers() {
    if (this._helpers) return;
    // Helper laden, um Standard-Karten (wie vertical-stack) zu rendern
    if ((window as any).loadCardHelpers) {
      this._helpers = await (window as any).loadCardHelpers();
    } else {
        // Fallback für sehr alte HA Versionen, meist nicht nötig
        console.error("loadCardHelpers not found");
    }
  }

  private async _createCardElement() {
    if (!this._config || !this._activeTabId) return;

    await this._loadHelpers();

    const activeTab = this._config.tabs.find(t => t.id === this._activeTabId);
    if (!activeTab || !this._helpers) return;

    // Wir erstellen einen vertical-stack für den Inhalt des Tabs
    // Das erlaubt HA, sich um das Layout der Karten im Tab zu kümmern
    const element = this._helpers.createCardElement({
      type: "vertical-stack",
      cards: activeTab.cards || []
    });
    
    element.hass = this._hass;
    this._cardElement = element;
    this.requestUpdate();
  }

  private _switchTab(tabId: string) {
    this._activeTabId = tabId;
    this._createCardElement();
  }

  render() {
    if (!this._config || !this._config.tabs) return html``;

    return html`
      <div class="tsc-container">
        
        <div class="tabs-header ${this._config.sticky ? 'sticky' : ''}">
            <div class="tabs-scroll-area">
                ${this._config.tabs.map(tab => {
                    const isActive = tab.id === this._activeTabId;
                    return html`
                        <button 
                            class="tab-chip ${isActive ? 'active' : ''}"
                            @click=${() => this._switchTab(tab.id)}
                        >
                            ${tab.icon ? html`<ha-icon icon="${tab.icon}"></ha-icon>` : ''}
                            <span>${tab.label}</span>
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

  static styles = css`
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
  `;
}

// Registrierung
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "tabbed-stack-card",
  name: "Tabbed Stack Card (OneFile)",
  description: "Tabs zentriert & sticky, mit visuellem Editor.",
});