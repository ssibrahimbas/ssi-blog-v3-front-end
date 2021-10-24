<template>
  <div class="ssi-evaluation-list-item">
    <div class="ssi-card-header">
      <div class="ssi-left">
        <p class="text-primary">{{ senderName }}</p>
      </div>
      <div class="ssi-right">
        <p class="text-muted">{{ title }}</p>
      </div>
    </div>
    <div class="ssi-card-body">
      <div class="ssi-left">
        <img
          :alt="imageAlt"
          :src="imageSrc"
          class="ssi-round-img"
          width="64"
          height="64"
        />
      </div>
      <div class="ssi-right">
        <p class="text-muted" :class="{ expanded: isReadLess }">
          {{ description }}
          <span
            v-if="isReadMore"
            class="text-primary ssi-read-more"
            @click="readMore(true)"
          ><br />daha fazla göster...</span
          >
          <span
            v-if="isReadLess"
            class="text-primary ssi-read-less"
            @click="readLess"
          ><br />daha az göster...
          </span>
        </p>
      </div>
    </div>
    <div class="ssi-card-footer">
      <p class="text-muted text-right text-primary">
        {{ formatDate(dateOfCreate) }}
      </p>
    </div>
  </div>
</template>

<script lang='ts'>
import "reflect-metadata";
import {Component, Vue, Prop} from 'vue-property-decorator'
import {inject} from 'inversify-props'
import { IConstants } from '~/constants/IConstants'

@Component
export default class SsiEvaluationListItem extends Vue {

  @inject("IConstants") private $constants! : IConstants

  @Prop() senderName! : string
  @Prop() title! : string
  @Prop() content! : string
  @Prop() dateOfCreate! : string

  imageAlt : string = this.$constants.standards.evaluations.imageAlt
  imageSrc : string = this.$constants.standards.evaluations.imageSrc

  isReadMore: boolean = false;
  isReadLess: boolean = false;
  description : string = '';
  maxChar : number = this.$constants.standards.evaluations.maxChar

  calculateReadMore() : void {
    if (this.content.length > this.maxChar) {
      this.isReadMore = true;
      this.description = this.content.slice(0, this.maxChar);
    } else {
      this.readMore();
    }
  }

  readMore(value : boolean = false) : void {
    this.isReadMore = false;
    this.description = this.content;
    this.isReadLess = value;
  }

  readLess() : void {
    this.isReadMore = true;
    this.isReadLess = false;
    this.description = this.content.slice(0, this.maxChar);
  }

  formatDate(date : string) : string {
    return this.$constants.formatDate(date);
  }

  created() : void {
    this.calculateReadMore();
  }

}
</script>

<style lang="scss" scoped>
.ssi-evaluation-list-item {
  width: 80%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
  rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  padding-inline: 1.5rem;
  padding-block: 0.8rem;
  border-radius: 5px;
  .ssi-left {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    img {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    }
    p {
      text-shadow: 0.5px 1px 1px rgba(0, 0, 0, 0.3);
    }
  }
  .ssi-right {
    display: flex;
    justify-content: flex-end;
  }
  .ssi-card-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .ssi-card-body {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .ssi-left {
      width: 15%;
      display: flex;
      justify-content: center;
    }
    .ssi-right {
      width: 85%;
      p {
        transition: all 1s;
        max-height: 100px;
        width: 95%;
        margin-left: auto;
        text-overflow: ellipsis;
        hyphens: auto;
        overflow-wrap: break-word;
        &.expanded {
          max-height: 500px;
        }
      }
    }
  }
  .ssi-card-footer {
    p {
      font-size: 0.9rem;
      text-shadow: 0.5px 1px 1px rgba(0, 0, 0, 0.3);
    }
  }
}
.ssi-round-img {
  border-radius: 50%;
}
</style>
