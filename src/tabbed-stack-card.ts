import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { LovelaceCard } from "custom-card-helpers";

// IMPORTANT: bundle editor into same output
import "./tabbed-stack-card-editor";

interface TabConfig {
  id: string;
  label?: string;
  icon?: string;

  // NEW: multiple cards per tab
  cards?: any[];

  // BACKWARD COMPAT: single card
  card?: any;
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
  }
}

@customElement("tabbed-stack-card")
export class TabbedStackCard extends LitElement {
  @property({ attribute: false }) hass: any;
  @state() private _config!: CardConfig;
  @state() private _activeTab!: string;

  private _card?: LovelaceCard;
  private _helpers?: any;

  // ---- UI editor hooks ----
  static getConfigElement() {
    return document.createElement("tabbed-stack-card-editor");
  }

  static getStubConfig(): CardConfig {
    return {
      type: "custom:tabbed-stack-card",
      sticky_tabs: true,
      storage_key: "tabs_default",
      default_tab: "Tab1",
      tabs: [
        {
          id: "Tab1",
          label: "Tab 1",
          icon: "mdi:lamp",
          cards: [{ type: "markdown", content: "Hello Tab 1" }],
        },
        {
          id: "Tab2",
          label: "Tab 2",
          icon: "mdi:roller-shade",
          cards: [{ type: "markdown", content: "Hello Tab 2" }],
        },
      ],
    };
  }

  setConfig(config: CardConfig) {
    if (!config?.tabs?.length) throw new Error("tabs required");

    this._config = config;

    const stored = config.storage_key ? localStorage.getItem(config.storage_key) : null;
    this._activeTab = stored || config.default_tab || config.tabs[0].id;

    void this._buildCard();
  }

  updated(changed: Map<string, any>) {
    if (changed.has("hass") && this._card) {
      this._card.hass = this.hass;
    }
  }

  private _setTab(id: string) {
    this._activeTab = id;

    if (this._config.storage_key) {
      localStorage.setItem(this._config.storage_key, id);
    }

    void this._buildCard();
  }

  private async _buildCard() {
    const tab =
      this._config.tabs.find((t) => t.id === this._activeTab) ?? this._config.tabs[0];

    // Load Lovelace helpers
    if (!this._helpers) {
      if (!window.loadCardHelpers) {
        throw new Error("Home Assistant card helpers not found (window.loadCardHelpers missing).");
      }
      this._helpers = await window.loadCardHelpers();
    }

    // NEW: support multiple cards
    const cards = tab.cards ?? (tab.card ? [tab.card] : []);
    const cardConfig =
      cards.length <= 1
        ? cards[0] ?? { type: "markdown", content: "No card configured" }
        : { type: "vertical-stack", cards };

    this._card = this._helpers.createCardElement(cardConfig);
    this._card.hass = this.hass;

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
    :host {
      display: block;
    }

    .tabs {
      display: flex;
      justify-content: center;
      gap: var(--tsc-chip-gap, 12px);
      padding: 10px 0 6px;

      /* default: blend with surrounding UI */
      background: var(--tsc-tabs-bg, transparent);
      z-index: 2;
    }

    .tabs.sticky {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: var(--tsc-chip-padding, 10px 18px);
      border-radius: var(--tsc-chip-radius, 999px);
      border: none;
      cursor: pointer;

      /* Theme-friendly defaults (works for everyone) */
      background: var(--tsc-chip-bg, rgba(0, 0, 0, 0.18));
      color: var(--primary-text-color);

      font-size: 14px;
      line-height: 1;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .chip.active {
      /* Theme default: primary */
      background: var(--tsc-chip-bg-active, var(--primary-color));
      color: var(
        --tsc-chip-fg-active,
        var(--text-primary-color, var(--primary-text-color))
      );
    }

    .chip.active ha-icon {
      color: var(
        --tsc-chip-fg-active,
        var(--text-primary-color, var(--primary-text-color))
      );
    }

    .chip:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    ha-icon {
      --mdc-icon-size: var(--tsc-chip-icon-size, 22px);
    }

    .content {
      padding-top: 6px;
    }
  `;
}
