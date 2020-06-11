<template>
  <!-- <sidebar class="sidebar-container" /> -->
  <div :class="classObj" class="app-wrapper">
    <el-row>
      <el-col :span="4">
        <div class="nav-title">铁通智能报系统</div>
      </el-col>
      <el-col :span="14">
        <sidebar />
      </el-col>
      <el-col :span="6">
        <div class="nav-right">
          <el-link type="info" @click.native="logout">退出</el-link>
        </div>
      </el-col>
    </el-row>

    <!-- <tags-view v-if="needTagsView" />
    <navbar /> -->
    <app-main />
    <right-panel v-if="showSettings">
      <settings />
    </right-panel>

    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" /> -->
    <!-- <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <sidebar />
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div> -->
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Settings, Sidebar } from './components'
// import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    RightPanel,
    Settings,
    Sidebar
    // Navbar,
    // TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .nav-title {
    width: 100%;
    height: 56px;
    line-height: 56px;
    padding-left: 20px;
    color: #bfcbd9;
    background-color: #304156;
    font-size: 16px;
    font-weight: 700;
  }
  .nav-right {
     width: 100%;
    height: 56px;
    line-height: 56px;
    padding-right: 20px;
    color: #bfcbd9;
    background-color: #304156;
    text-align: right;
  }
  >>> .el-menu {
    background-color: #304156 !important;
  }
  >>> .el-link.el-link--info {
    font-size: 16px;
    color: #bfcbd9;
  }
</style>
