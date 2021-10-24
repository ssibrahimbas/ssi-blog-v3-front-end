<template>
  <div class="ssi-search-input" :class="{ 'ssi-open': opened }">
    <input
      :value="searchText"
      type="text"
      :placeholder="ssiPlaceHolder"
      class="ssi-search-box"
      @change="$emit('change:ssi', $event)"
    />
    <span class="ssi-search-button" @click="toggleSearch">
      <span class="ssi-search-icon" @click="checkSearch"></span>
    </span>
  </div>
</template>

<script lang='ts'>
import {Component, Vue, Prop, Emit} from 'vue-property-decorator'

@Component
export default class SsiSearchInput extends Vue {
  @Prop({default: ''}) searchText! : string
  @Prop({default: 'Bir şeyler arayın...'}) ssiPlaceHolder! : string

  opened : boolean = false;

  toggleSearch() : void {
    this.opened = !this.opened;
  }

  checkSearch() : void {
    if(this.opened) {
      this.searchTextEmit(this.searchText);
    }
  }

  @Emit("click:ssi")
  searchTextEmit(searchText : string) : string {
    return searchText;
  }

}
</script>

<style lang="scss" scoped>
$search-bg-color: #fff;
$search-text-color: #34495E;
$icon-color: #41B883;
$transition: all 0.5s ease;

.ssi-search-input {
  width: 50px;
  height: 50px;
  background-color: $search-bg-color;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  transition: $transition;
  &:before {
    content: "";
    display: block;
    width: 3px;
    height: 100%;
    position: relative;
    background-color: $icon-color;
    transition: $transition;
  }
  &.ssi-open {
    width: 95%;
    &:before {
      height: 30px;
      margin: 10px 0 10px 30px;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
      position: absolute;
    }
  }
}

.ssi-search-box {
  width: 100%;
  height: 100%;
  box-shadow: none;
  border: none;
  background: transparent;
  color: $search-text-color;
  padding: 20px 50px 20px 45px;
  margin-right: 10px;
  font-size: 20px;
  &:focus {
    outline: none;
  }
}

.ssi-search-button {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  right: 0;
  top: 0;
  padding: 4px;
  cursor: pointer;
}

.ssi-search-icon {
  margin-top: 2px;
  width: 28px;
  height: 28px;
  border-radius: 40px;
  border: 3px solid $icon-color;
  display: block;
  position: relative;
  margin-left: 0;
  transition: $transition;
  &:before {
    content: "";
    width: 3px;
    height: 10px;
    position: absolute;
    right: -3px;
    top: 20px;
    display: block;
    background-color: $icon-color;
    transform: rotate(-45deg);
    transition: $transition;
  }
  &:after {
    content: "";
    width: 3px;
    height: 10px;
    position: absolute;
    right: -8px;
    top: 25px;
    display: block;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: $icon-color;
    transform: rotate(-45deg);
    transition: $transition;
  }
  .ssi-open & {
    margin: 0;
    width: 30px;
    height: 30px;
    border-radius: 60px;
    &:before {
      transform: rotate(52deg);
      right: 10px;
      top: 10px;
      width: 2px;
      border-top-left-radius: 50px;
      height: 9px;
    }
    &:after {
      transform: rotate(-230deg);
      right: 10px;
      border-top-right-radius: 50px;
      top: 5.5px;
      width: 2px;
      height: 9px;
    }
  }
}
.ssi-open .ssi-search-button {
  align-items: center;
}

@media screen and (max-width: 700px) {
  .ssi-search {
    width: 100%;
  }
}
</style>

