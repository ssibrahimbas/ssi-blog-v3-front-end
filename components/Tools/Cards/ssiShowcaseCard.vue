<template>
  <div class="card ssi-showcase-card">
    <nuxt-link :to="url" class="ssi-link">
      <img
        :src="API + imageUrl"
        class="card-img-top ssi-link"
        :alt="imageAlt"
      />
    </nuxt-link>
    <div class="card-body">
      <nuxt-link :to="url" class="ssi-link">
        <h5 class="card-title text-center ssi-link">
          {{ title }}
        </h5>
      </nuxt-link>

      <p class="card-text">{{ description }}</p>
      <nuxt-link :to="url" class="ssi-link">
        <p class="card-text text-primary">
          <span class="ssi-link" :href="url">{{ linkText }}</span>
        </p>
      </nuxt-link>

      <p class="card-text ssi-text-between">
        <small class="text-muted text-muted">{{ commentsText }}</small
        ><small class="text-muted text-primary">{{ dateText }}</small>
      </p>
      <ssi-software-languages
        v-if="softwareLanguages"
        :software-languages="softwareLanguages"
      />
      <ssi-hashtags :hashtags="hashtags" />
    </div>
    <hr class="ssi-hr" />

    <div class="showcase-profile">
      <ssi-profile-card
        :name="superhuman.fullName"
        :image="superhuman.profileImage"
        url="/profilim"
        :about="superhuman.about"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SsiProfileCard from '~/components/Tools/Cards/ssiProfileCard.vue'
import { SuperhumanProfileModel } from '~/models/superhuman/superhumanProfileModel'
import SsiHashtags from '~/components/Hashtags/ssiHashtags.vue'
import { SoftwareLanguageModel } from '~/models/softwareLanguage/softwareLanguageModel'
import SsiSoftwareLanguages from '~/components/SoftwareLanguages/ssiSoftwareLanguages.vue'

@Component({
  components: {
    SsiProfileCard,
    SsiHashtags,
    SsiSoftwareLanguages,
  },
})
export default class SsiShowcaseCard extends Vue {
  @Prop() imageUrl!: string
  @Prop({ default: '' }) imageAlt!: string
  @Prop() title!: string
  @Prop() description!: string
  @Prop() dateText!: string
  @Prop() commentsText!: string
  @Prop({ required: true }) url!: string
  @Prop() superhuman!: SuperhumanProfileModel
  @Prop() hashtags!: []
  @Prop({ default: 'devamını okuyayım...' }) linkText!: string
  @Prop() softwareLanguages!: SoftwareLanguageModel[]

  API: string = process.env.BASE_STATIC_API_URL || ''
}
</script>

<style lang="scss" scoped>
.ssi-showcase-card {
  width: 70%;
  margin-inline: auto;
  margin-bottom: 5rem !important;
  .card-title {
    font-weight: 500;
  }
  img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    object-fit: cover;
    width: 100%;
    height: auto;
    max-height: 350px;
  }
  hr {
    margin-inline: auto;
    width: 40%;
  }
  .ssi-text-between {
    width: 90%;
    margin-inline: auto;
    display: flex;
    justify-content: space-between;
    small {
      font-size: 65%;
    }
  }
  .showcase-profile {
    width: 60%;
    margin-inline: auto;
    margin-bottom: 2.5rem;
  }
}
</style>
