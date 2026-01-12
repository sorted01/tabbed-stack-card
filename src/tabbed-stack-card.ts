import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/* ================= EDITOR (TEIL 1) ================= */
@customElement("tabbed-stack-card-editor")
export class TabbedStackCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private _config?: any;

  public setConfig(config: any): void {
    this._config = config;
  }

  private _dispatch(newConfig: any) {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    if (!this._config) return html`<div>Lade Konfiguration...</div>`;

    return html`
      <div style="padding: 10px;">
        <p><b>Globale Einstellungen</b></p>
        <label>
          <input type="checkbox" .checked=${this._config.sticky} 
            @change=${(e: any) => this._dispatch({...this._config, sticky: e.target.checked})}>
          Tabs oben anheften (Sticky)
        </label>

        <hr>
        <p><b>Tabs bearbeiten</b></p>
        ${(this._config.tabs || []).map((tab: any, index: number) => html`
          <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
            <input style="width: 100%; margin-bottom: 5px;" .value=${tab.label || ""} placeholder="Tab Name"
              @input=${(e: any) => {
                const tabs = [...this._config.tabs];
                tabs[index] = { ...tabs[index], label: e.target.value };
                this._dispatch({ ...this._config, tabs });
              }}>
            <input style="width: 100%;" .value=${tab.icon || ""} placeholder="Icon (z.B. mdi:lightbulb)"
              @input=${(e: any) => {
                const tabs = [...this._config.tabs];
                tabs[index] = { ...tabs[index], icon: e.target.value };
                this._dispatch({ ...this._config, tabs });
              }}>
            <button style="margin-top: 5px; color: red;" @click=${() => {
              const tabs = [...this._config.tabs];
              tabs.splice(index, 1);
              this._dispatch({ ...this._config, tabs });
            }}>Tab löschen</button>
          </div>
        `)}
        <button style="width: 100%; padding: 10px;" @click=${() => {
          const tabs = [...(this._config.tabs || [])];
          tabs.push({ id: "tab_" + Date.now(), label: "Neuer Tab", icon: "mdi:star", cards: [] });
          this._dispatch({ ...this._config, tabs });
        }}>+ Tab hinzufügen</button>
        <p style="font-size: 0.8em; color: gray; margin-top: 10px;">
          Nutze den "Code-Editor anzeigen" unten, um Karten (Cards) zu den Tabs hinzuzufügen.
        </p>
      </div>
    `;
  }
}

/* ================= KARTE (TEIL 2) ================= */
@customElement("tabbed-stack-card")
export class TabbedStackCard extends LitElement {
  @property({ attribute: false }) public hass: any;
  @state() private _config!: any;
  @state() private _activeTabId: string = "";
  @state() private _cardElement?: any;

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
    if (config.tabs && config.tabs.length > 0 && !this._activeTabId) {
      this._activeTabId = config.tabs[0].id;
    }
    this._updateContent();
  }

  private async _updateContent() {
    if (!this._config || !this.hass) return;
    const activeTab = this._config.tabs.find((t: any) => t.id === this._activeTabId) || this._config.tabs[0];
    
    const helpers = await (window as any).loadCardHelpers();
    const element = helpers.createCardElement({
      type: "vertical-stack",
      cards: activeTab?.cards || []
    });
    element.hass = this.hass;
    this._cardElement = element;
  }

  protected updated(changedProps: any) {
    if (changedProps.has("hass") && this._cardElement) {
      this._cardElement.hass = this.hass;
    }
  }

  render() {
    if (!this._config) return html``;

    return html`
      <div class="tabs-header ${this._config.sticky ? 'sticky' : ''}">
        <div class="tabs-container">
          ${this._config.tabs.map((t: any) => html`
            <button class="chip ${this._activeTabId === t.id ? 'active' : ''}"
              @click=${() => { this._activeTabId = t.id; this._updateContent(); }}>
              <ha-icon icon="${t.icon}"></ha-icon>
              <span>${t.label}</span>
            </button>
          `)}
        </div>
      </div>
      <div class="content">${this._cardElement}</div>
    `;
  }

  static styles = css`
    .tabs-header { padding: 10px 0; background: var(--card-background-color); z-index: 10; }
    .tabs-header.sticky { position: sticky; top: 0; }
    .tabs-container { display: flex; justify-content: center; gap: 10px; overflow-x: auto; }
    .chip { 
      display: flex; align-items: center; gap: 5px; padding: 8px 15px; 
      border-radius: 20px; border: none; background: var(--secondary-background-color);
      color: var(--primary-text-color); cursor: pointer; white-space: nowrap;
    }
    .chip.active { background: var(--primary-color); color: white; }
    .content { margin-top: 10px; }
  `;
}