import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { LovelaceCard } from "custom-card-helpers";

interface TabConfig {
  id: string;
  label?: string;
  icon?: string;
  card: any; // Lovelace card config
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

  setConfig(config: CardConfig) {
    if (!config?.tabs?.length) {
      throw new Error("tabs required");
    }

    this._config = config;

    const stored = config.storage_key
      ? localStorage.getItem(config.storage_key)
      : null;

    this._activeTab = stored || config.default_tab || config.tabs[0].id;

    // async build, don't block setConfig
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
      this._config.tabs.find(t => t.id === this._activeTab) ??
      this._config.tabs[0];

    // Load Home Assistant Lovelace helpers
    if (!this._helpers) {
      if (!window.loadCardHelpers) {
        throw new Error(
          "Home Assistant card helpers not found (window.loadCardHelpers missing)."
        );
      }
      this._helpers = await window.loadCardHelpers();
    }

    this._card = this._helpers.createCardElement(tab.card);
    this._card.hass = this.hass;

    this.requestUpdate();
  }

  render() {
    if (!this._config) return html``;

    return html`
      <div class="tabs ${this._config.sticky_tabs ? "sticky" : ""}">
        ${this._config.tabs.map(
          t => html`
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

      <div class="content">
        ${this._card ?? ""}
      </div>
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
      background: var(--tsc-tabs-bg, transparent);
      z-index: 2;
    }

    /* Sticky inside scroll containers (Bubble popup works well with this) */
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

      background: var(--tsc-chip-bg, rgba(0, 0, 0, 0.18));
      color: var(--primary-text-color);

      font-size: 14px;
      line-height: 1;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .chip.active {
      background: var(--tsc-chip-bg-active, rgba(255, 105, 180, 0.35));
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
