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
import '@/assets/mirador.min.js'
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
      console.log(Mirador)
      this.mirador = Mirador.viewer({
        id: "my-mirador",
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
        selectedTheme: 'light',
        manifests: {
          "https://iiif.harvardartmuseums.org/manifests/object/299843": {
            "provider": "Harvard University"
          }
        },
        windows: [
          {
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

        },
        views: [
          { key: 'single', behaviors: ['individuals'] },
          { key: 'book', behaviors: ['paged'] },
          { key: 'scroll', behaviors: ['continuous'] },
          { key: 'gallery' },
        ],

        thumbnailNavigation: {
          defaultPosition: 'no', // Which position for the thumbnail navigation to be be displayed. Other possible values are "far-bottom" or "far-right"
          displaySettings: false, // Display the settings for this in WindowTopMenu
          height: 130, // height of entire ThumbnailNavigation area when position is "far-bottom"
          width: 100, // width of one canvas (doubled for book view) in ThumbnailNavigation area when position is "far-right"
        },
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.img-mirador {

  .body {
    width: 600px;
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
  