<template>
<div></div>
</template>
<script>
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Fancyapps from "@fancyapps/ui/dist/fancybox/fancybox.umd"

export default {
  created() {
    Fancyapps.Fancybox.bind("[data-fancybox]", {
      Hash: false,
    });
  },
}
</script>