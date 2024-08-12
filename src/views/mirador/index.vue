<template>
  <div class="img-mirador">
    <div class="body">
      <div class="handle">
        <div class="l">
          <div class="btn out">
            <i class="el-icon-caret-left"></i>
            <span>退出阅读</span>
          </div>
        </div>
        <div class="r">
          <div class="btn">
            <i class="iconfont icon-download"></i>
            <span>下载</span>
          </div>
          <div class="btn">
            <i class="iconfont icon-xinxi"></i>
            <span>纠错</span>
          </div>
          <div class="btn">
            <i class="el-icon-edit-outline"></i>
            <span>摘录</span>
          </div>
        </div>
      </div>
      <div id="my-mirador"></div>
    </div>
  </div>
</template>
  
<script>
import { config } from './config'
export default {
  name: "imgMirador",
  data() {
    return {
      mirador: null
    }
  },
  mounted() {
    this.init();

  },
  methods: {
    init() {
      const c = config()
      this.mirador = Mirador.viewer({
        id: "my-mirador",

        selectedTheme: 'light',
        manifests: {
          "https://iiif.harvardartmuseums.org/manifests/object/299843": {
            "provider": "Harvard University"
          }
        },
        windows: [
          {
            manifestId: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
            canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/page_2',
            thumbnailNavigationPosition: 'far-bottom',
          }
        ],
        window: {
          allowClose: false,
          allowFullscreen: true, // Configure to show a "fullscreen" button in the WindowTopBar
          allowMaximize: true, // Configure if windows can be maximized or not
          allowTopMenuButton: true, // Configure if window view and thumbnail display menu are visible or not
          allowWindowSideBar: true, // Configure if side bar menu is visible or not
          authNewWindowCenter: 'parent', // Configure how to center a new window created by the authentication flow. Options: parent, screen
          sideBarPanel: 'canvas', // Configure which sidebar is selected by default. Options: info, attribution, canvas, annotations, search
          defaultSidebarPanelHeight: 201,  // Configure default sidebar height in pixels
          defaultSidebarPanelWidth: 235, // Configure default sidebar width in pixels
          defaultView: 'single',  // Configure which viewing mode (e.g. single, book, gallery) for windows to be opened in
          forceDrawAnnotations: false,
          hideWindowTitle: false, // Configure if the window title is shown in the window title bar or not
          highlightAllAnnotations: false, // Configure whether to display annotations on the canvas by default
          showLocalePicker: false, // Configure locale picker for multi-lingual metadata
          sideBarOpen: true, // Configure if the sidebar (and its content panel) is open by default
          switchCanvasOnSearch: true,
          panels: { // Configure which panels are visible in WindowSideBarButtons
            info: false,
            attribution: false,
            canvas: true,
            annotations: false,
            search: false,
            layers: false,
          },
          sideBarOpenByDefault: false
        },
        "language": "zh-CN",
        "availableLanguages": {
          "en": "English",
          "zh-CN": "中文(简体)",
          "zh-TW": "中文(繁體)",
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
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.img-mirador {

  .body {
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;

    .handle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      background-color: #fff;

      .l {
        height: 100%;

        .btn {
          font-size: 16px;
          color: #865A16;
          line-height: 70px;

          &.out {
            padding: 0 20px;
            height: 100%;
            border-right: 1px #EEEEEE solid;
          }
        }
      }

      .r {
        display: flex;

        .btn {
          font-size: 16px;
          color: #888;
          width: 68px;
          text-align: center;

          i {
            padding-right: 3px;
          }
        }

      }
    }

    #my-mirador {
      position: relative;
      height: 800px;
    }
  }
}
</style>
  