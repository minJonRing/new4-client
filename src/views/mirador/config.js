export const config = () => ({
  "catalog": [
    {
      "manifestId": "https://krwxk-prod.oss-cn-beijing.aliyuncs.com/6666_ts_00000017/6666_ts_00000017.json"
    }
  ],
  "companionWindows": {
    "cw-47849949-4ce2-4b5b-995e-90164f3fc84b": {
      "content": "canvas",
      "default": true,
      "id": "cw-47849949-4ce2-4b5b-995e-90164f3fc84b",
      "position": "left"
    },
    "cw-f479e363-58dd-4c27-a2dd-bf45fc001df8": {
      "content": "thumbnailNavigation",
      "default": true,
      "id": "cw-f479e363-58dd-4c27-a2dd-bf45fc001df8",
      "position": "off"
    }
  },
  "config": {
    "state": {},
    "canvasNavigation": {
      "height": 50,
      "width": 50
    },
    "selectedTheme": "light",
    "themes": {
      "dark": {
        "palette": {
          "type": "dark",
          "primary": {
            "main": "#4db6ac"
          },
          "secondary": {
            "main": "#4db6ac"
          },
          "shades": {
            "dark": "#000000",
            "main": "#424242",
            "light": "#616161"
          }
        }
      },
      "light": {
        "palette": {
          "type": "light"
        }
      }
    },
    "theme": {
      "palette": {
        "type": "light",
        "primary": {
          "main": "#1967d2"
        },
        "secondary": {
          "main": "#1967d2"
        },
        "shades": {
          "dark": "#eeeeee",
          "main": "#ffffff",
          "light": "#f5f5f5"
        },
        "error": {
          "main": "#b00020"
        },
        "notification": {
          "main": "#ffa224"
        },
        "hitCounter": {
          "default": "#bdbdbd"
        },
        "highlights": {
          "primary": "#ffff00",
          "secondary": "#00BFFF"
        },
        "section_divider": "rgba(0, 0, 0, 0.25)",
        "annotations": {
          "hidden": {
            "globalAlpha": 0
          },
          "default": {
            "strokeStyle": "#00BFFF",
            "globalAlpha": 1
          },
          "hovered": {
            "strokeStyle": "#BF00FF",
            "globalAlpha": 1
          },
          "selected": {
            "strokeStyle": "#ffff00",
            "globalAlpha": 1
          }
        },
        "search": {
          "default": {
            "fillStyle": "#00BFFF",
            "globalAlpha": 0.3
          },
          "hovered": {
            "fillStyle": "#00FFFF",
            "globalAlpha": 0.3
          },
          "selected": {
            "fillStyle": "#ffff00",
            "globalAlpha": 0.3
          }
        }
      },
      "typography": {
        "body1": {
          "fontSize": "1rem",
          "letterSpacing": "0em",
          "lineHeight": "1.6em"
        },
        "body2": {
          "fontSize": "0.878rem",
          "letterSpacing": "0.015em",
          "lineHeight": "1.6em"
        },
        "button": {
          "fontSize": "0.878rem",
          "letterSpacing": "0.09em",
          "lineHeight": "2.25rem",
          "textTransform": "uppercase"
        },
        "caption": {
          "fontSize": "0.772rem",
          "letterSpacing": "0.033em",
          "lineHeight": "1.6rem"
        },
        "body1Next": {
          "fontSize": "1rem",
          "letterSpacing": "0em",
          "lineHeight": "1.6em"
        },
        "body2Next": {
          "fontSize": "0.878rem",
          "letterSpacing": "0.015em",
          "lineHeight": "1.6em"
        },
        "buttonNext": {
          "fontSize": "0.878rem",
          "letterSpacing": "0.09em",
          "lineHeight": "2.25rem"
        },
        "captionNext": {
          "fontSize": "0.772rem",
          "letterSpacing": "0.33em",
          "lineHeight": "1.6rem"
        },
        "overline": {
          "fontSize": "0.678rem",
          "fontWeight": 500,
          "letterSpacing": "0.166em",
          "lineHeight": "2em",
          "textTransform": "uppercase"
        },
        "h1": {
          "fontSize": "2.822rem",
          "letterSpacing": "-0.015em",
          "lineHeight": "1.2em"
        },
        "h2": {
          "fontSize": "1.575rem",
          "letterSpacing": "0em",
          "lineHeight": "1.33em"
        },
        "h3": {
          "fontSize": "1.383rem",
          "fontWeight": 300,
          "letterSpacing": "0em",
          "lineHeight": "1.33em"
        },
        "h4": {
          "fontSize": "1.215rem",
          "letterSpacing": "0.007em",
          "lineHeight": "1.45em"
        },
        "h5": {
          "fontSize": "1.138rem",
          "letterSpacing": "0.005em",
          "lineHeight": "1.55em"
        },
        "h6": {
          "fontSize": "1.067rem",
          "fontWeight": 400,
          "letterSpacing": "0.01em",
          "lineHeight": "1.6em"
        },
        "subtitle1": {
          "fontSize": "0.937rem",
          "letterSpacing": "0.015em",
          "lineHeight": "1.6em",
          "fontWeight": 300
        },
        "subtitle2": {
          "fontSize": "0.878rem",
          "fontWeight": 500,
          "letterSpacing": "0.02em",
          "lineHeight": "1.75em"
        },
        "useNextVariants": true
      },
      "overrides": {
        "MuiListSubheader": {
          "root": {
            "&[role=\"presentation\"]:focus": {
              "outline": 0
            }
          }
        },
        "MuiTooltip": {
          "tooltipPlacementLeft": {
            "@media (min-width:600px)": {
              "margin": 0
            }
          },
          "tooltipPlacementRight": {
            "@media (min-width:600px)": {
              "margin": 0
            }
          },
          "tooltipPlacementTop": {
            "@media (min-width:600px)": {
              "margin": 0
            }
          },
          "tooltipPlacementBottom": {
            "@media (min-width:600px)": {
              "margin": 0
            }
          }
        },
        "MuiTouchRipple": {
          "childPulsate": {
            "animation": "none"
          },
          "rippleVisible": {
            "animation": "none"
          }
        }
      },
      "props": {
        "MuiButtonBase": {
          "disableTouchRipple": true
        },
        "MuiLink": {
          "underline": "always"
        }
      }
    },
    "language": "zh-CN",
    "availableLanguages": {
      "ar": "العربية",
      "de": "Deutsch",
      "en": "English",
      "fr": "Français",
      "ja": "日本語",
      "lt": "Lietuvių",
      "nl": "Nederlands",
      "pt-BR": "Português do Brasil",
      "zh-CN": "中文(简体)",
      "zh-TW": "中文(繁體)",
      "it": "Italiano",
      "sr": "Српски"
    },
    "annotations": {
      "htmlSanitizationRuleSet": "iiif",
      "filteredMotivations": [
        "oa:commenting",
        "oa:tagging",
        "sc:painting",
        "commenting",
        "tagging"
      ]
    },
    "createGenerateClassNameOptions": {
      "productionPrefix": "mirador"
    },
    "requests": {
      "preprocessors": [],
      "postprocessors": []
    },
    "translations": {
      "de": {
        "brightness": "Helligkeit",
        "collapse_open": "Bildbearbeitung ausblenden",
        "collapse_close": "Bildbearbeitung einblenden",
        "contrast": "Kontrast",
        "flip": "Spiegeln",
        "greyscale": "Darstellung in Graustufen",
        "hide": "Bildbearbeitung verbergen",
        "invert": "Umkehrung der Farben",
        "revert": "Einstellungen zurücksetzen",
        "rotateLeft": "Rotation links",
        "rotateRight": "Rotation rechts",
        "saturation": "Sättigung",
        "show": "Bildbearbeitung anzeigen"
      },
      "en": {
        "brightness": "Brightness",
        "collapse_open": "Collapse image tools",
        "collapse_close": "Expand image tools",
        "contrast": "Contrast",
        "flip": "Flip",
        "greyscale": "Greyscale",
        "hide": "Hide image tools",
        "invert": "Invert colors",
        "revert": "Revert image",
        "rotateLeft": "Rotate left",
        "rotateRight": "Rotate right",
        "saturation": "Saturation",
        "show": "Show image tools"
      },
      "fr": {
        "brightness": "Luminosité",
        "collapse_open": "Fermer les outils de réglages de l'image",
        "collapse_close": "Ouvrir les outils de réglages de l'image",
        "contrast": "Contraste",
        "flip": "Miroir",
        "greyscale": "Niveaux de gris",
        "invert": "Inverser les couleurs",
        "revert": "Réinitialiser les réglages",
        "rotateLeft": "Rotation vers la gauche",
        "rotateRight": "Rotation vers la droite",
        "saturation": "Saturation"
      },
      "sr": {
        "brightness": "Осветљење",
        "collapse_open": "Затворите алат",
        "collapse_close": "Отворите алат",
        "contrast": "Контраст",
        "flip": "Окрени",
        "greyscale": "Црнобело",
        "hideImageTools": "Сакријте алат",
        "invert": "Инверзија боја",
        "revert": "Поништи подешавања",
        "rotateLeft": "Ротирај лево",
        "rotateRight": "Ротирај десно",
        "saturation": "Сатурација",
        "showImageTools": "Прикажите алат"
      },
      "zh-CN": {
        "brightness": "亮度",
        "collapse_open": "收起图像工具",
        "collapse_close": "展开图像工具",
        "contrast": "对比度",
        "flip": "反转图像",
        "greyscale": "灰度",
        "hide": "隐藏图像工具",
        "invert": "反色",
        "revert": "恢复图像",
        "rotateLeft": "向左旋转90度",
        "rotateRight": "向右旋转90度",
        "saturation": "饱和度",
        "show": "显示图像工具",
        "aboutThisItem": "有关此物件",
        "addedFromUrl": "(从URL添加)",
        "addManifestUrl": "来源",
        "addManifestUrlHelp": "IIIF资源的URL",
        "addResource": "添加资源",
        "annotationCanvasLabel_1/1": "物件: [{{label}}]",
        "annotationCanvasLabel_1/2": "左方: [{{label}}]",
        "annotationCanvasLabel_2/2": "右方: [{{label}}]",
        "annotations": "注释",
        "attribution": "著作权",
        "attributionTitle": "著作权",
        "book": "书籍",
        "bottom": "下方",
        "cancel": "取消",
        "canvasIndex": "索引",
        "changeTheme": "变更背景主题",
        "closeAddResourceForm": "关闭表格",
        "closeAddResourceMenu": "关闭资源列表",
        "closeCompanionWindow": "关闭附属窗口",
        "closeWindow": "关闭窗口",
        "collapseSection": "关闭{{section}}分页",
        "collapseSidePanel": "关闭边栏",
        "itemList": "标题列表",
        "copy": "复制",
        "currentItem": "当前物件",
        "currentItem_1/1": "当前物件",
        "currentItem_1/2": "左方",
        "currentItem_2/2": "右方",
        "dark": "黑色主题",
        "dismiss": "关闭信息",
        "highlightAllAnnotations": "显示所有注释",
        "downloadExport": "导出排版样式",
        "downloadExportWorkspace": "导出排版样式",
        "elastic": "弹性",
        "elasticDescription": "在当前工作区自由摆放窗口，窗口可重叠。",
        "emptyResourceList": "资源列表为空",
        "errorDialogConfirm": "确定",
        "errorDialogTitle": "发生错误",
        "exitFullScreen": "退出全屏",
        "expandSection": "开启{{section}}分页",
        "expandSidePanel": "开启边栏",
        "fetchManifest": "添加",
        "fullScreen": "全屏",
        "gallery": "画廊",
        "hideZoomControls": "隐藏缩放选项",
        "iiif_homepage": "有关此资源",
        "iiif_manifest": "IIIF",
        "iiif_renderings": "其他格式",
        "iiif_seeAlso": "另见",
        "import": "导入",
        "importWorkspace": "导入工作区排版样式",
        "importWorkspaceHint": "在此粘贴即将导入到Mirador 3的配置",
        "item": "物件: {{label}}",
        "language": "语言",
        "light": "白色主题",
        "links": "连结",
        "listAllOpenWindows": "切换至窗口",
        "login": "登录",
        "manifestError": "无法添加资源:",
        "maximizeWindow": "最大化窗口",
        "minimizeWindow": "最小化窗口",
        "mirador": "Mirador",
        "miradorResources": "Mirador资源",
        "miradorViewer": "Mirador阅览器",
        "mosaic": "马赛克",
        "mosaicDescription": "在工作区以网格方式排列窗口",
        "moveCompanionWindowToBottom": "移至下方",
        "moveCompanionWindowToRight": "移至右方",
        "nextCanvas": "下一页",
        "numItems": "{{number}} 项物件",
        "off": "关闭",
        "openCompanionWindow_annotations": "注释",
        "openCompanionWindow_attribution": "归属",
        "openCompanionWindow_canvas": "目录",
        "openCompanionWindow_info": "信息",
        "openInCompanionWindow": "移至新的附属窗口",
        "openWindows": "现有窗口",
        "pagination": "{{current}} / {{total}}",
        "position": "位置",
        "previewWindowTitle": "{{title}}",
        "previousCanvas": "上一页",
        "related": "相关信息",
        "resource": "资源",
        "right": "右方",
        "rights": "版权",
        "selectWorkspaceMenu": "选择工作区排版方式",
        "showingNumAnnotations": "显示 {{number}} 项注释",
        "showZoomControls": "显示缩放选项",
        "sidebarPanelsNavigation": "切换边栏",
        "single": "单项",
        "startHere": "按此开始",
        "theme": "背景主题",
        "thumbnailList": "缩略图列表",
        "thumbnailNavigation": "缩略图",
        "thumbnails": "显示缩略图",
        "toggleWindowSideBar": "切换边栏开关",
        "tryAgain": "请重试",
        "untitled": "[无标题]",
        "view": "物件排列方式",
        "welcome": "欢迎使用Mirador",
        "window": "窗口: {{label}}",
        "windowMenu": "窗口选项",
        "windowNavigation": "切换窗口",
        "windowPluginButtons": "选项",
        "workspace": "桌面",
        "workspaceFullScreen": "全屏",
        "workspaceMenu": "工作区设定",
        "workspaceOptions": "工作区选项",
        "workspaceSelectionTitle": "选择工作区排版方式",
        "zoomIn": "放大",
        "zoomOut": "放小",
        "zoomReset": "重设缩放"
      }
    },
    "window": {
      "allowClose": false,
      "allowFullscreen": false,
      "allowMaximize": false,
      "allowTopMenuButton": true,
      "allowWindowSideBar": true,
      "authNewWindowCenter": "parent",
      "sideBarPanel": "info",
      "defaultSidebarPanelHeight": 201,
      "defaultSidebarPanelWidth": 235,
      "defaultView": "single",
      "forceDrawAnnotations": false,
      "hideWindowTitle": false,
      "highlightAllAnnotations": false,
      "showLocalePicker": false,
      "sideBarOpen": false,
      "panels": {
        "info": false,
        "attribution": false,
        "canvas": true,
        "annotations": false,
        "search": false,
        "layers": false
      },
      "views": [
        {
          "key": "single"
        },
        {
          "key": "book"
        },
        {
          "key": "gallery"
        }
      ],
      "sideBarOpenByDefault": true,
      "defaultSideBarPanel": "canvas"
    },
    "windows": [
      {
        "imageToolsEnabled": true,
        "imageToolsOpen": false,
        "manifestId": "https://krwxk-prod.oss-cn-beijing.aliyuncs.com/6666_ts_00000017/6666_ts_00000017.json",
        "canvasId": "https://iiif.modernhistory.org.cn/iiif/2/canvas/177027596"
      }
    ],
    "thumbnailNavigation": {
      "defaultPosition": "off",
      "displaySettings": true,
      "height": 130,
      "width": 100
    },
    "workspace": {
      "draggingEnabled": true,
      "allowNewWindows": true,
      "id": "6fffe9b4-4fd3-44ee-af43-270492fe69ee",
      "isWorkspaceAddVisible": false,
      "exposeModeOn": false,
      "height": 5000,
      "showZoomControls": false,
      "type": "mosaic",
      "viewportPosition": {
        "x": 0,
        "y": 0
      },
      "width": 5000
    },
    "workspaceControlPanel": {
      "enabled": true
    },
    "galleryView": {
      "height": 120,
      "width": null
    },
    "osdConfig": {
      "alwaysBlend": false,
      "blendTime": 0.1,
      "preserveImageSizeOnResize": true,
      "preserveViewport": true,
      "showNavigationControl": false
    },
    "export": {
      "catalog": true,
      "companionWindows": true,
      "config": true,
      "elasticLayout": true,
      "layers": true,
      "manifests": {},
      "viewers": true,
      "windows": true,
      "workspace": true
    },
    "auth": {
      "serviceProfiles": [
        {
          "profile": "http://iiif.io/api/auth/1/external",
          "external": true
        },
        {
          "profile": "http://iiif.io/api/auth/1/kiosk",
          "kiosk": true
        },
        {
          "profile": "http://iiif.io/api/auth/1/clickthrough"
        },
        {
          "profile": "http://iiif.io/api/auth/1/login"
        },
        {
          "profile": "http://iiif.io/api/auth/0/external",
          "external": true
        },
        {
          "profile": "http://iiif.io/api/auth/0/kiosk",
          "kiosk": true
        },
        {
          "profile": "http://iiif.io/api/auth/0/clickthrough"
        },
        {
          "profile": "http://iiif.io/api/auth/0/login"
        }
      ]
    },
    "id": "mirador",
    "uniqTag": "",
    "bzId": "",
    "daId": ""
  },
  "elasticLayout": {
    "window-74e4ca46-8e1c-416a-83f9-a52773798ebf": {
      "windowId": "window-74e4ca46-8e1c-416a-83f9-a52773798ebf",
      "height": 400,
      "width": 400,
      "x": 200,
      "y": 200
    }
  },
  "layers": {},
  "manifests": {},
  "viewers": {
    "window-74e4ca46-8e1c-416a-83f9-a52773798ebf": {
      "flip": false,
      "rotation": 0,
      "x": 2500,
      "y": 3000,
      "zoom": 0.00011866830065359482
    }
  },
  "windows": {
    "window-74e4ca46-8e1c-416a-83f9-a52773798ebf": {
      "canvasId": "https://iiif.modernhistory.org.cn/iiif/2/canvas/177027596",
      "collectionIndex": 0,
      "companionAreaOpen": true,
      "companionWindowIds": [
        "cw-47849949-4ce2-4b5b-995e-90164f3fc84b",
        "cw-f479e363-58dd-4c27-a2dd-bf45fc001df8"
      ],
      "draggingEnabled": true,
      "highlightAllAnnotations": false,
      "id": "window-74e4ca46-8e1c-416a-83f9-a52773798ebf",
      "manifestId": "https://krwxk-prod.oss-cn-beijing.aliyuncs.com/6666_ts_00000017/6666_ts_00000017.json",
      "maximized": false,
      "rangeId": null,
      "rotation": null,
      "selectedAnnotations": {},
      "sideBarOpen": true,
      "sideBarPanel": "canvas",
      "thumbnailNavigationId": "cw-f479e363-58dd-4c27-a2dd-bf45fc001df8",
      "thumbnailNavigationPosition": "off",
      "imageToolsEnabled": true,
      "imageToolsOpen": false,
      "visibleCanvases": [
        "https://iiif.modernhistory.org.cn/iiif/2/canvas/177027596"
      ]
    }
  },
  "workspace": {
    "draggingEnabled": true,
    "allowNewWindows": true,
    "id": "6fffe9b4-4fd3-44ee-af43-270492fe69ee",
    "isWorkspaceAddVisible": false,
    "exposeModeOn": false,
    "height": 5000,
    "showZoomControls": false,
    "type": "mosaic",
    "viewportPosition": {
      "x": 0,
      "y": 0
    },
    "width": 5000,
    "windowIds": [
      "window-74e4ca46-8e1c-416a-83f9-a52773798ebf"
    ],
    "focusedWindowId": "window-74e4ca46-8e1c-416a-83f9-a52773798ebf",
    "layout": "window-74e4ca46-8e1c-416a-83f9-a52773798ebf"
  }
}
)