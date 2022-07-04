<template>
  <header class="header">
      <slot name="left"></slot>
      <div class="header_title">{{title}}</div>
      <slot name="right"></slot>
  </header>
</template>

<script>
export default {
    props:['title']
}

</script>
<style lang="less" scoped>
.header{
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ee82ee;
    z-index: 9999;
    color: #ffffff;
    line-height: 50px;
    text-align: center;
    .header_title{
        text-align: center;
        line-height: 50px;
    }
    .header_right{
        position: absolute;
        right: 10px;
        top:0px;
        line-height: 50px;
    }
    .header_left{
        position: absolute;
        left: 10px;
        top: 0px;
        line-height: 50px;
    }
}
</style>