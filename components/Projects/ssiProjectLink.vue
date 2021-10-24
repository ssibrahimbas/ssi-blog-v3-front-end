<template>
   <a
    :href="url ? API + url : null"
    class="btn btn-default btn-round btn-lg btn-icon"
    rel="tooltip"
    :title="title"
    target="_blank"
    @click="$emit('click:ssi')"
  >
    <i :class="icon"></i>
  </a>
</template>

<script lang="ts">
import "reflect-metadata";
    import { Component, Vue, Prop } from 'vue-property-decorator';


    @Component
    export default class SsiProjectLink extends Vue {
        @Prop() url? : string;
        @Prop() title? : string;
        @Prop() icon? : string;

        API : string = process.env.BASE_STATIC_API_URL || ''
    }
</script>

<style lang="scss" scoped>
.btn-default {
    height: 2.6rem !important;
    width: 2.6rem !important;
    min-width: 2.6rem !important;
    i {
        font-size: 1rem !important;
    }
}
</style>