# CHANGELOG

## v1.2.4 - 4/28/25

### Adds

- Adds the ability to render static links with the `qa-` prefix to point the `qa-ds-header` link to the QA environment (mostly used by QA). [RENO-4570](https://newyorkpubliclibrary.atlassian.net/browse/RENO-4570)

## v1.2.3 - 3/13/25

### Updates

- Updates the `actions/cache` Github Action to v4.

## v1.2.2 - 10/17/24

### Adds

- Adds the Twitter/X icon back in the Footer.

## v1.2.1 - 9/13/24

### Removals

- Removes code that called the `/auth/patrons/tokens/{token}` Platform API. The code supported the feature that displayed a logged in patron's name but this has long been removed. The API endpoint itself has also been removed and is deprecated.
- Removes Twitter/X icon from the Footer.

## v1.2.0 - 8/20/24

### Adds

- Adds `.nvmrc` file for Node 20.

### Updates

- Updates to Node 20 in Dockerfile and Github Actions.
- Updates `vite` to `4.5.3`.

## v1.1.0 - 8/6/24

### Updates

- Adds `!important` designation to header font sizes so consuming app styles
  don't override it.
- Ensures consuming app, libguides, has base font of 16px so header appears correctly.

### Removes

- Removes fallback font options so footer inherits from the DS.

## 5/16/24

### Updates

- Updates "Press" link in the footer to point to `/press`.
- Updates old "browse" and Encore links to the new "borrow.nypl.org" domain.

## 4/16/24

### Fixes

- Fixes search term encoding so that Vega can properly consume the query.

## 1/10/24

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
