## Overview

Injects classes for all settings on rows and cells in the Umbraco grid.

`install-package Our.Umbraco.WysiwygGrid -pre`

More docs to come.

## Examples

Customize the backoffice by including your own customzation css in your own plugin:  
[Our.Umbraco.WysiwygGrid/App_Plugins/Customization/package.manifest](Our.Umbraco.WysiwygGrid/App_Plugins/Customization/package.manifest)

Optionally make the rte iframe body transparent:  
[Our.Umbraco.WysiwygGrid/css/rte.css](Our.Umbraco.WysiwygGrid/css/rte.css)

Modify your grid view to add classes instead of attributes for settings:  
[Our.Umbraco.WysiwygGrid/Views/Partials/Grid/Bootstrap4.cshtml](Our.Umbraco.WysiwygGrid/Views/Partials/Grid/Bootstrap4.cshtml)

The example view concats setting keys with settings values delimited with dash,
and adds those sets as classes instead of attributes as in the original bootstrap views.  
The JavaScript does the same to the grid in the backoffice.

Example grid settings:

```json
[
  {
    "label": "Class",
    "description": "Set a css class",
    "key": "class",
    "view": "textstring"
  },
  {
    "label": "Theme",
    "description": "Set a color theme",
    "key": "theme",
    "view": "radiobuttonlist",
    "prevalues": [
      {
        "value": "normal",
        "label": "Normal"
      },
      {
        "value": "inverse",
        "label": "Inverse"
      }
    ]
  },
  {
    "label": "Horizontal padding",
    "description": "Set horizontal padding",
    "key": "padding",
    "view": "radiobuttonlist",
    "prevalues": [
      {
        "value": "none",
        "label": "None"
      },
      {
        "value": "some",
        "label": "Some"
      },
      {
        "value": "lots",
        "label": "A lot"
      }
    ]
  }
]
```

## Test site authentication

Username: admin@admin.com  
Password: adminadminadmin
