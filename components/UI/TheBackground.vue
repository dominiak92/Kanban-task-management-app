<template>
    <div class="background"></div>
  </template>
  
  <script>
  
  export default {
    name: 'TheBackground',
  }
  </script>

  <style lang="scss" scoped>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $white;
    z-index: -1;
  }
  </style>