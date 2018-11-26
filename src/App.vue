<template>
  <intro></intro>
</template>

<script>
  export default {
    name: 'app',
    components: {
      Intro: () => import('./components/Intro.vue'),
    },
  };
</script>

<style lang="less">
  @import './style/theme.less';

  @font-face {
    font-family: 'font_family';
    src: url('./assets/fonts/iconfont.ttf');
  }

  .font_family {
    font-family: 'font_family' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  @font-face {
    font-family: 'DROIDKUFI';
    src: url('./assets/fonts/DROIDKUFI-REGULAR.TTF') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'DROIDKUFIBold';
    src: url('./assets/fonts/DROIDKUFI-BOLD.TTF') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  html,
  body {
    min-width: 1200px;
    -webkit-text-size-adjust: none;
  }
  [dir='rtl'] {
    font-family: 'DROIDKUFI', 'DROIDKUFIBold';
    .text-left{
      text-align: right;
    }
    .text-right {
      text-align: left;
    }
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }
</style>
