import { LitElement, html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import type { LovelaceCard } from "custom-card-helpers";

// Importiert den Editor, damit er registriert wird
import "./tabbed-stack-card-editor";

interface TabConfig {
  id: string;
  label?: string;
  icon?: string;
  cards?: any[];
  card?: any;
}

interface CardConfig {
  type: string;
  tabs: TabConfig[];
  default_tab?: string;
  storage_key?: string;
  sticky_tabs?: boolean;
}

@customElement("tabbed-stack-card")
export class TabbedStackCard extends LitElement {
  // Hass als Property sorgt für automatische Updates der Unterkarten
  @property({ attribute: false }) public hass: any;
  
  @state() private _config!: CardConfig;
  @state() private _activeTab!: string;

  private _cardElement?: LovelaceCard;
  private _helpers?: any;

  // Verbindet die Karte mit dem visuellen Editor
  static getConfigElement() {
    return document.createElement("tabbed-stack-card-editor");
  }

  static getStubConfig() {
    return {
      sticky_tabs: true,
      tabs: [
        {
          id: "tab1",
          label: "Licht",
          icon: "mdi:lamp",
          cards: [{ type: "light", entity: "" }],
        },
        {
          id: "tab2",
          label: " Klima",
          icon: "mdi:thermostat",
          cards: [{ type: "thermostat", entity: "" }],
        },
      ],
    };
  }

  setConfig(config: CardConfig) {
    if (!config?.tabs?.length) {
        // Falls der Editor noch lädt oder Tabs leer sind, verhindern wir einen Absturz
        this._config = config;
        return;
    }

    // Normalisierung
    const normalizedTabs = config.tabs.map((t) => ({
      ...t,
      cards: t.cards ?? (t.card ? [t.card] : []),
    }));

    this._config = { ...config, tabs: normalizedTabs };

    // Tab-Auswahl (Storage oder Default)
    const stored = this._config.storage_key
      ? localStorage.getItem(this._config.storage_key)
      : null;

    if (!this._activeTab || !this._config.tabs.some(t => t.id === this._activeTab)) {
        this._activeTab = stored || this._config.default_tab || this._config.tabs[0].id;
    }

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
    if (!this._config?.tabs?.length) return;

    const tab = this._config.tabs.find((t) => t.id === this._activeTab) ?? this._config.tabs[0];
    const cards = tab.cards ?? [];

    if (!this._helpers) {
      if (window.loadCardHelpers) {
        this._helpers = await window.loadCardHelpers();
      }
    }

    if (this._helpers) {
        const cardConfig = cards.length === 1 
            ? cards[0] 
            : { type: "vertical-stack", cards };
            
        this._cardElement = this._helpers.createCardElement(cardConfig);
        this._cardElement!.hass = this.hass;
    }
  }

  // Wichtig für Live-Vorschau: Wenn sich Hass ändert, muss es an die Unterkarte weitergereicht werden
  protected updated(changedProps: Map<string, any>) {
    if (changedProps.has("hass") && this._cardElement) {
      this._cardElement.hass = this.hass;
    }
  }

  render() {
    if (!this._config || !this._config.tabs) return html``;

    return html`
      <div class="tabs ${this._config.sticky_tabs ? "sticky" : ""}">
        ${this._config.tabs.map(
          (t) => html`
            <button
              class="chip ${t.id === this._activeTab ? "active" : ""}"
              @click=${() => this._setTab(t.id)}
            >
              ${t.icon ? html`<ha-icon .icon="${t.icon}"></ha-icon>` : ""}
              <span>${t.label ?? t.id}</span>
            </button>
          `
        )}
      </div>

      <div class="content">
        ${this._cardElement || html`<p>Lade Karten...</p>`}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .tabs {
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 8px 0;
      overflow-x: auto;
      background: var(--tsc-tabs-bg, transparent);
    }
    .tabs.sticky {
      position: sticky;
      top: 0;
      z-index: 10;
      background: var(--card-background-color, white);
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 20px;
      border: none;
      cursor: pointer;
      background: var(--secondary-background-color, #eee);
      color: var(--primary-text-color);
      white-space: nowrap;
      transition: all 0.2s ease;
    }
    .chip.active {
      background: var(--primary-color);
      color: var(--text-primary-color, white);
    }
    .content {
      margin-top: 8px;
    }
  `;
}

// Custom Card Picker Integration
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "tabbed-stack-card",
  name: "Tabbed Stack Card",
  description: "Erlaubt das Gruppieren von Karten in Tabs.",
  preview: true,
});