# Tabbed Stack Card

A Lovelace card that adds sticky tab navigation (Bubble style) to switch between card stacks.

## Features
- Sticky tabs
- Bubble chip look
- Persist active tab per popup (localStorage)
- Works inside Bubble Card popups

## Installation
1. Add this repository to HACS (Frontend)
2. Install
3. Reload Lovelace resources

## Example
```yaml
type: custom:tabbed-stack-card
storage_key: wohnen_tabs
default_tab: Licht
sticky_tabs: true
tabs:
  - id: Licht
    icon: mdi:lamp
    card: { ... }
