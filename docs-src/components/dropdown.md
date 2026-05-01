---
title: Dropdown
section: Components
lede: Click-to-open menu built on `<details>` — closes on outside click and Escape automatically.
---

# Dropdown

<demo>
<details class="b-dropdown">
  <summary class="b-btn b-btn-secondary">Actions ▾</summary>
  <div class="b-dropdown-menu">
    <div class="b-dropdown-label">Account</div>
    <a href="#">Profile</a>
    <a href="#">Settings</a>
    <hr>
    <button>Sign out</button>
  </div>
</details>
</demo>

```html
<details class="b-dropdown">
  <summary class="b-btn b-btn-secondary">Actions ▾</summary>
  <div class="b-dropdown-menu">
    <a href="#">Profile</a>
    <a href="#">Settings</a>
    <hr>
    <button>Sign out</button>
  </div>
</details>
```

## With sections

<demo>
<details class="b-dropdown">
  <summary class="b-btn">Open menu</summary>
  <div class="b-dropdown-menu" style="min-width:14rem">
    <div class="b-dropdown-label">Status</div>
    <button>● Online</button>
    <button>● Away</button>
    <hr>
    <div class="b-dropdown-label">Account</div>
    <a href="#">Profile</a>
    <a href="#">Sign out</a>
  </div>
</details>
</demo>

## Behavior

Without JS, `<details>` opens on click. The bundled JS adds:

- **Escape** closes the menu and returns focus to the trigger
- **Outside click** closes the menu

## API

| Class | Effect |
| --- | --- |
| `.b-dropdown` | Wrapper (use a `<details>` element) |
| `.b-dropdown-menu` | The popup panel |
| `.b-dropdown-label` | Section label inside the menu |
