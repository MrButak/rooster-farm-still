<template>

<div class="checkout-step-header-wrapper">
    <div id="pointer-left">
    </div>
    <div id="pointer-middle">
    </div>
    <!-- <div id="pointer-middle">
    </div> -->
</div>

</template>



<script setup>



</script>



<style lang="scss" scoped>

.checkout-step-header-wrapper {
    display: flex;
    gap: 2rem;
    width: 100%
}

#pointer-left {
  width: 3rem;
  height: 40px;
  position: relative;
  background: red;
}
#pointer-left:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
//   border-left: 20px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
#pointer-left:before {
  content: "";
  position: absolute;
  right: -20px;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 20px solid red;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}


#pointer-middle {
  width: 3rem;
  height: 40px;
  position: relative;
  background: red;
}
#pointer-middle:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 20px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
#pointer-middle:before {
  content: "";
  position: absolute;
  right: -20px;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 20px solid red;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
</style>
