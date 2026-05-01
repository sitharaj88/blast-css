---
title: Forms
section: Components
lede: Inputs, selects, textareas, switches, checkboxes, ranges, file inputs, fieldsets — with built-in error and disabled states.
---

# Forms

## Input

<demo>
<div class="b-field">
  <label class="b-label" for="i-1">Email</label>
  <input class="b-input" id="i-1" type="email" placeholder="you@company.com">
  <span class="b-help">We'll never share this address.</span>
</div>
</demo>

## With icon

<demo>
<div class="b-field">
  <label class="b-label" for="i-search">Search</label>
  <input class="b-input b-search" id="i-search" type="search" placeholder="Search docs">
</div>
</demo>

## Sizes

<demo>
<div class="b-stack" style="--b-stack-gap: var(--b-2)">
  <input class="b-input b-input-sm" placeholder="Small">
  <input class="b-input" placeholder="Default">
  <input class="b-input b-input-lg" placeholder="Large">
</div>
</demo>

## Select

<demo>
<select class="b-select">
  <option>Apple</option>
  <option>Banana</option>
  <option>Cherry</option>
</select>
</demo>

## Textarea

`field-sizing: content` lets the textarea grow with its content automatically:

<demo>
<textarea class="b-textarea" placeholder="Type — I grow with you."></textarea>
</demo>

## Input group with addon

<demo>
<div class="b-input-group">
  <span class="b-addon">https://</span>
  <input class="b-input" placeholder="example.com">
  <button class="b-btn">Verify</button>
</div>
</demo>

## Switch

<demo>
<label class="b-switch"><input type="checkbox" checked><span>Email notifications</span></label>
</demo>

## Checkbox & radio

<demo>
<div class="b-stack" style="--b-stack-gap: var(--b-2)">
  <label class="b-check"><input type="checkbox"> Subscribe</label>
  <label class="b-check"><input type="checkbox" checked> Send weekly digest</label>
  <label class="b-check"><input type="radio" name="r-demo"> Email</label>
  <label class="b-check"><input type="radio" name="r-demo" checked> SMS</label>
</div>
</demo>

## Range

<demo>
<input type="range" class="b-range">
</demo>

## Validation states

<demo>
<div class="b-field">
  <label class="b-label" for="i-err">Username</label>
  <input class="b-input" id="i-err" aria-invalid="true" value="taken">
  <span class="b-error">That username is already taken.</span>
</div>
</demo>

## Required indicator

Add `data-required` to `.b-label` to render a red asterisk:

<demo>
<label class="b-label" data-required>Email</label>
</demo>

## Fieldset

<demo>
<fieldset class="b-fieldset">
  <legend>Billing</legend>
  <div class="b-stack" style="--b-stack-gap: var(--b-3)">
    <input class="b-input" placeholder="Card number">
    <div class="b-cluster">
      <input class="b-input" placeholder="MM/YY" style="flex:1">
      <input class="b-input" placeholder="CVC" style="flex:1">
    </div>
  </div>
</fieldset>
</demo>

## Disabled

<demo>
<input class="b-input" disabled value="Read-only">
</demo>

## API

| Class | Effect |
| --- | --- |
| `.b-field` | Vertical label/input/help stack |
| `.b-label` | Field label (`data-required` for asterisk) |
| `.b-help` | Help text |
| `.b-error` | Error text (red) |
| `.b-input` / `.b-select` / `.b-textarea` / `.b-file` | Inputs |
| `.b-input-sm` / `.b-input-lg` | Sizes |
| `.b-search` | Adds search icon |
| `.b-input-group` | Joins inputs + addons + buttons |
| `.b-addon` | Inline label inside an input group |
| `.b-switch` | Toggle switch |
| `.b-check` | Aligned checkbox/radio + label |
| `.b-range` | Styled range slider |
| `.b-fieldset` | Group of related fields |
