<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
.loader {
  width: 30px;
  height: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l11 2s infinite;
}
@keyframes l11 {
  0%   {background: conic-gradient($background-quaternary 0     ,$background-primary 0)}
  12.5%{background: conic-gradient($background-quaternary 45deg ,$background-primary 46deg)}
  25%  {background: conic-gradient($background-quaternary 90deg ,$background-primary 91deg)}
  37.5%{background: conic-gradient($background-quaternary 135deg,$background-primary 136deg)}
  50%  {background: conic-gradient($background-quaternary 180deg,$background-primary 181deg)}
  62.5%{background: conic-gradient($background-quaternary 225deg,$background-primary 226deg)}
  75%  {background: conic-gradient($background-quaternary 270deg,$background-primary 271deg)}
  87.5%{background: conic-gradient($background-quaternary 315deg,$background-primary 316deg)}
  100% {background: conic-gradient($background-quaternary 360deg,$background-primary 360deg)}
}
</style>