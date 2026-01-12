import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { LovelaceCard } from "custom-card-helpers";

// Bundle the editor into the same JS output
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
  }
}

@customElement("tabbed-stack-card")
export class TabbedStackCard extends LitElement {
  @property({ attribute: false }) public hass: any;

  @state() private _config!: CardConfig;
  @state() private _activeTab!: string;

  private _card?: LovelaceCard;
  private _helpers?: any;

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
    if (!config?.tabs?.length) {
      throw new Error("tabs required");
    }

    // Normalize: if someone still uses tab.card, keep it working
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

    // Load Home Assistant Lovelace helpers
    if (!this._helpers) {
      if (!window.loadCardHelpers) {
        throw new Error(
          "Home Assistant card helpers not found (window.loadCardHelpers missing)."
        );
      }
      this._helpers = await window.loadCardHelpers();
    }

    const cards = tab.cards ?? [];
    const cardConfig =
      cards.length <= 1
        ? (cards[0] ?? { type: "markdown", content: "No card configured" })
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

    /* Sticky inside scroll containers (Bubble popup works well) */
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

      /* Prevent Bubble/global styles from breaking spacing inside our vertical-stack */
      --vertical-stack-card-gap: var(--tsc-stack-gap, 12px);

      width: 100%;
      max-width: 100%;
    }

    /* Ensure inner card takes full width and doesn't get weird layout constraints */
    .content > * {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  `;
}
