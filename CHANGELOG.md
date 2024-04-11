# CHANGELOG

## 1.0.0 - 4/11/2024

### Updates

- Updates DS to v3.0.0
- Updates React to v18

### Fixes

- Fixes search term encoding so that vega can properly consume the query

## 10/30/23

### Updates

- Updates the DS version to 2.1.1.

## 10/5/23

### Updates

- Updates the Donate button URL.

### Updates

## 9/21/23

- Adds commands to copy the latest Docker image on ECR to a previous image
  before pushing the latest image
- Adds commands for Travis to initiate changes to the fallback stack

## 9/14/23

### Updates

- Updates the DS version to `1.7.3`.
- Updates the breakpoints, spacing, font size, icons, and colors to the mobile
  and desktop header. This is a general UI update for minor visual improvements.

## 8/22/23

### Updates

- Updates to DS version 1.7.1.
- Updates the spacing between elements in the `Header` component for mobile and
  desktop. This does not include any of the popup menus.

## 7/19/23

### Fixes

- Adds explicit focus styles for the skip nav links. They were inadvertently
  removed when the global styles were disabled.

## 6/13/23

### Adds

- Adds style files for the `Header` and `Footer` component. A new theme file is
  created and passed to the `DSProvider` component.

### Updates

- Removes the reset CSS and disables global styles in the `DSProvider`
  component.
