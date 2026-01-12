import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/* ==========================================================================
   EDITOR-KOMPONENTE (Teil 1)
   ========================================================================== */
@customElement("tabbed-stack-card-editor")
export class TabbedStackCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @property({ attribute: false }) public lovelace?: any;
  @state() private _config?: any;
  @state() private _activeTabEditor: number | null = null;

  // HA setzt die Config über diese Methode
  public setConfig(config: any): void {
    this._config = config;
  }

  // Sicherheits-Setter für den Fall, dass HA direkt auf das Property zugreift
  set config(value: any) {
    this._config = value;
  }

  private _fireConfigChanged(newConfig: any) {
    const event = new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _updateTabProp(index: number, prop: string, value: string) {
    const newConfig = JSON.parse(JSON.stringify(this._config));
    newConfig.tabs[index][prop] = value;
    this._fireConfigChanged(newConfig);
  }

  private _addTab() {
    const newConfig = JSON.parse(JSON.stringify(this._config || { tabs: [] }));
    if (!newConfig.tabs) newConfig.tabs = [];
    newConfig.tabs.push({
      id: `tab_${Date.now()}`,
      label: `Neuer Tab`,
      icon: "mdi:view-dashboard",
      cards: []
    });
    this._fireConfigChanged(newConfig);
  }

  private _addCard(tabIdx: number) {
    const newConfig = JSON.parse(JSON.stringify(this._config));
    newConfig.tabs[tabIdx].cards.push({ type: "markdown", content: "Neue Karte" });
    this._fireConfigChanged(newConfig);
  }

  render() {
    // Wenn _config noch nicht da ist, zeigen wir einen Spinner/Text, 
    // aber stellen sicher, dass kein JS-Fehler das Fenster blockiert.
    if (!this._config) return html`<div style="padding: 20px;">Initialisiere Konfiguration...</div>`;

    const tabs = this._config.tabs || [];

    return html`
      <div class="editor-container">
        <div class="setting-row">
            <ha-switch 
                .checked=${this._config.sticky === true} 
                @change=${(ev: any) => this._fireConfigChanged({...this._config, sticky: ev.target.checked})}
            ></ha-switch>
            <span style="margin-left: 10px;">Tabs oben anheften (Sticky)</span>
        </div>

        <div class="tab-list">
            ${tabs.map((tab: any, idx: number) => html`
                <div class="tab-item">
                    <div class="tab-header-row" @click=${() => this._activeTabEditor = (this._activeTabEditor === idx ? null : idx)}>
                        <ha-icon .icon=${tab.icon || 'mdi:folder'}></ha-icon>
                        <span class="tab-label">${tab.label || tab.id}</span>
                        <ha-icon icon="mdi:chevron-down"></ha-icon>
                    </div>

                    ${this._activeTabEditor === idx ? html`
                        <div class="tab-details">
                            <ha-textfield label="Label" .value=${tab.label || ''} @input=${(e: any) => this._updateTabProp(idx, 'label', e.target.value)}></ha-textfield>
                            <ha-textfield label="Icon" .value=${tab.icon || ''} @input=${(e: any) => this._updateTabProp(idx, 'icon', e.target.value)}></ha-textfield>
                            
                            <p><strong>Karten in diesem Tab:</strong></p>
                            ${tab.cards?.map((card: any, cIdx: number) => html`
                                <div class="card-editor-box">
                                    <div class="card-editor-header">Karte: ${card.type}</div>
                                    <hui-card-element-editor
                                        .hass=${this.hass}
                                        .value=${card}
                                        .lovelace=${this.lovelace}
                                        @value-changed=${(ev: any) => {
                                            ev.stopPropagation();
                                            const cfg = JSON.parse(JSON.stringify(this._config));
                                            cfg.tabs[idx].cards[cIdx] = ev.detail.value;
                                            this._fireConfigChanged(cfg);
                                        }}
                                    ></hui-card-element-editor>
                                </div>
                            `)}
                            <mwc-button raised @click=${() => this._addCard(idx)}>+ Karte hinzufügen</mwc-button>
                        </div>
                    ` : ''}
                </div>
            `)}
        </div>
        <mwc-button raised class="add-tab-btn" @click=${this._addTab}>+ Neuen Tab hinzufügen</mwc-button>
      </div>
    `;
  }

  static styles = css`
    .editor-container { display: flex; flex-direction: column; gap: 10px; padding: 10px; }
    .setting-row { display: flex; align-items: center; margin-bottom: 10px; }
    .tab-item { border: 1px solid var(--divider-color); border-radius: 8px; margin-bottom: 8px; overflow: hidden; }
    .tab-header-row { display: flex; align-items: center; padding: 12px; cursor: pointer; background: var(--secondary-background-color); gap: 10px; }
    .tab-label { flex: 1; font-weight: bold; }
    .tab-details { padding: 15px; display: flex; flex-direction: column; gap: 10px; background: var(--card-background-color); }
    .card-editor-box { border: 1px dashed var(--divider-color); padding: 10px; margin-bottom: 10px; border-radius: 4px; }
    .card-editor-header { font-size: 0.8em; opacity: 0.7; margin-bottom: 5px; font-weight: bold; }
    ha-textfield { width: 100%; }
    .add-tab-btn { margin-top: 10px; --mdc-theme-primary: var(--primary-color); }
  `;
}

/* ==========================================================================
   KARTEN-KOMPONENTE (Teil 2)
   ========================================================================== */
@customElement("tabbed-stack-card")
export class TabbedStackCard extends LitElement {
  @property({ attribute: false }) public hass: any;
  @state() private _config!: any;
  @state() private _activeTabId: string = "";
  @state() private _cardElement?: any;
  private _helpers?: any;

  static getConfigElement() {
    return document.createElement("tabbed-stack-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:tabbed-stack-card",
      sticky: false,
      tabs: [{ id: "tab1", label: "Home", icon: "mdi:home", cards: [] }]
    };
  }

  public setConfig(config: any) {
    this._config = config;
    if (config.tabs?.length > 0 && !this._activeTabId) {
      this._activeTabId = config.tabs[0].id;
    }
    this._updateChildCard();
  }

  private async _updateChildCard() {
    const activeTab = this._config?.tabs?.find((t: any) => t.id === this._activeTabId) || this._config?.tabs?.[0];
    if (!activeTab) return;

    if (!this._helpers && (window as any).loadCardHelpers) {
      this._helpers = await (window as any).loadCardHelpers();
    }

    if (this._helpers) {
      this._cardElement = this._helpers.createCardElement({
        type: "vertical-stack",
        cards: activeTab.cards || []
      });
      this._cardElement.hass = this.hass;
    }
  }

  protected updated(changedProps: any) {
    if (changedProps.has("hass") && this._cardElement) {
      this._cardElement.hass = this.hass;
    }
  }

  render() {
    if (!this._config) return html``;

    return html`
      <div class="main-container">
        <div class="tabs-bar ${this._config.sticky ? 'sticky' : ''}">
          <div class="scroll-wrapper">
            ${this._config.tabs?.map((t: any) => html`
              <button 
                class="tab-btn ${this._activeTabId === t.id ? 'active' : ''}"
                @click=${() => { this._activeTabId = t.id; this._updateChildCard(); }}
              >
                ${t.icon ? html`<ha-icon .icon=${t.icon}></ha-icon>` : ''}
                <span>${t.label}</span>
              </button>
            `)}
          </div>
        </div>
        <div class="content-area">${this._cardElement}</div>
      </div>
    `;
  }

  static styles = css`
    .main-container { width: 100%; }
    .tabs-bar { padding: 12px 0; z-index: 10; transition: background 0.3s; }
    .tabs-bar.sticky { 
        position: sticky; top: 0; 
        background: var(--ha-card-background, var(--card-background-color, white)); 
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .scroll-wrapper { display: flex; justify-content: center; gap: 10px; overflow-x: auto; scrollbar-width: none; }
    .scroll-wrapper::-webkit-scrollbar { display: none; }
    .tab-btn { 
        display: flex; align-items: center; gap: 8px; padding: 10px 18px; 
        border: none; border-radius: 25px; cursor: pointer;
        background: var(--secondary-background-color); color: var(--primary-text-color);
        font-weight: 500; transition: 0.2s;
    }
    .tab-btn.active { 
        background: var(--primary-color); color: var(--text-primary-color, white); 
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    .content-area { margin-top: 10px; }
  `;
}

// Registrierung
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "tabbed-stack-card",
  name: "Tabbed Stack Card (Fixed)",
  description: "Tabs mit zentriertem Design und funktionierendem Editor",
  preview: true
});