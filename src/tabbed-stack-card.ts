import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCard } from "custom-card-helpers";

// Bundle editor into the same output
import "./tabbed-stack-card-editor";

interface TabConfig {
  id: string;
  label?: string;
  icon?: string;

  // Preferred: multiple cards per tab
  cards?: any[];

  // Backward compatibility: single card
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
    customCards?: Array<any>;
  }
}

@customElement("tabbed-stack-card")
export class TabbedStackCard extends LitElement {
  @state() private _config!: CardConfig;
  @state() private _activeTab!: string;

  private _card?: LovelaceCard;
  private _helpers?: any;

  // IMPORTANT: HA may mutate hass object in place -> lit won't detect changes.
  // So we use a dedicated setter that always forwards to child.
  private _hass: any;

  public set hass(value: any) {
    this._hass = value;
    if (this._card) this._card.hass = value;
    this.requestUpdate();
  }

  public get hass() {
    return this._hass;
  }

  // ---- Visual editor integration ----
  static getConfigElement() {
    return document.createElement("tabbed-stack-card-editor");
  }

  static getStubConfig(): CardConfig {
    return {
      type: "custom:tabbed-stack-card",
      sticky_tabs: true,
      storage_key: "tabs_default",
      default_tab: "Licht",
      tabs: [
        {
          id: "Licht",
          label: "Licht",
          icon: "mdi:lamp",
          cards: [{ type: "markdown", content: "Hello Licht" }],
        },
        {
          id: "Rollo",
          label: "Rollo",
          icon: "mdi:roller-shade",
          cards: [{ type: "markdown", content: "Hello Rollo" }],
        },
      ],
    };
  }

  setConfig(config: CardConfig) {
    if (!config?.tabs?.length) throw new Error("tabs required");

    // Normalize tabs to always have cards[]
    const normalizedTabs = config.tabs.map((t) => ({
      ...t,
      cards: t.cards ?? (t.card ? [t.card] : []),
    }));

    this._config = { ...config, tabs: normalizedTabs };

    const stored = this._config.storage_key
      ? localStorage.getItem(this._config.storage_key)
      : null;

    this._activeTab = stored || this._config.default_tab || this._config.tabs[0].id;

    void this._buildCard();
  }

  private _setTab(id: string) {
    this._activeTab = id;

    if (this._config.storage_key) {
      localStorage.setItem(this._config.storage_key, id);
    }

    void this._buildCard();
  }

  private async _buildCard() {
    if (!this._config?.tabs?.length) return;

    const tab =
      this._config.tabs.find((t) => t.id === this._activeTab) ?? this._config.tabs[0];

    // Load HA Lovelace helpers (preferred)
    if (!this._helpers) {
      if (!window.loadCardHelpers) {
        throw new Error("Home Assistant card helpers not found (window.loadCardHelpers missing).");
      }
      this._helpers = await window.loadCardHelpers();
    }

    const cards = tab.cards ?? [];
    const cardConfig =
      cards.length <= 1
        ? (cards[0] ?? { type: "markdown", content: "No card configured" })
        : { type: "vertical-stack", cards };

    // Create new child card
    this._card = this._helpers.createCardElement(cardConfig);
    // Forward hass immediately
    if (this._hass) this._card.hass = this._hass;

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

      <div class="content">
        ${this._card ?? ""}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
    }

    .tabs {
      display: flex;
      justify-content: center;
      gap: var(--tsc-chip-gap, 12px);
      padding: 10px 0 6px;
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

      /* Theme-friendly defaults */
      background: var(--tsc-chip-bg, rgba(0, 0, 0, 0.18));
      color: var(--primary-text-color);

      font-size: 14px;
      line-height: 1;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .chip.active {
      /* Default active color from theme */
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

      /* Shield against Bubble/global overrides */
      --vertical-stack-card-gap: var(--tsc-stack-gap, 12px);

      width: 100%;
      max-width: 100%;
    }

    .content > * {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  `;
}

// Register for HA card picker + editor reliability
window.customCards = window.customCards || [];
window.customCards.push({
  type: "tabbed-stack-card",
  name: "Tabbed Stack Card",
  description: "Tabbed navigation with multiple cards per tab (Bubble-style).",
  preview: true,
});
