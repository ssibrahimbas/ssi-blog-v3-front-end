<template>
  <div v-if="loaded">
    <ssi-page :header-small="false" :self-header="true" header-image="bg5.jpg">
      <template #header>
        <ssi-profile-container
          :image="profileInfos.profileImage"
          :name="profileInfos.fullName"
          :about="profileInfos.about"
          :count-of-experiences="countOfExperiences"
          :count-of-educations="countOfEducations"
          :count-of-certificates="countOfCertificates"
        />
      </template>
      <template #content>
        <div>
          <ssi-social-media-list />
          <h3 class="title">Hakkımda</h3>
          <h5 class="description">
            {{ profileInfos.description }}
          </h5>
          <ssi-ability-list />
          <div class="row f-column">
            <div class="col-md-6 ml-auto mr-auto">
              <h3 class="title text-center">Kariyerim</h3>
            </div>
            <tabs
              class="nav-align-center"
              tab-content-classes="gallery"
              tab-nav-classes="nav-pills-just-icons"
              type="primary"
              :pills="true"
            >
              <tab title="Educations">
                <i slot="label" class="now-ui-icons education_hat"></i>

                <div class="col-md-10 ml-auto mr-auto">
                  <div class="row collections">
                    <ssi-education-list
                      @setEducationCount="setEducationCount"
                    />
                  </div>
                </div>
              </tab>

              <tab title="Experiences">
                <i slot="label" class="now-ui-icons business_badge"></i>

                <div class="col-md-10 ml-auto mr-auto">
                  <div class="row collections">
                    <ssi-experience-list
                      @setExperienceCount="setExperienceCount"
                    />
                  </div>
                </div>
              </tab>

              <tab title="Certificates">
                <i slot="label" class="now-ui-icons education_paper"></i>

                <div class="col-md-10 ml-auto mr-auto">
                  <div class="row collections">
                    <ssi-certificate-list
                      @setCertificateCount="setCertificateCount"
                    />
                  </div>
                </div>
              </tab>
            </tabs>
            <hr class="ssi-hr" />
            <ssi-message-form />
          </div>
        </div>
      </template>
    </ssi-page>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import SsiPage from '~/components/Page/ssiPage.vue'
import SsiProfileContainer from '~/components/Profile/ssiProfileContainer.vue'
import SsiSocialMediaList from '~/components/socialMedia/ssiSocialMediaList.vue'
import SsiAbilityList from '~/components/Profile/abilities/ssiAbilityList.vue'
import SsiEducationList from '~/components/Educations/ssiEducationList.vue'
import SsiExperienceList from '~/components/Experiences/ssiExperienceList.vue'
import SsiEvaluationList from '~/components/Evaluations/ssiEvaluationList.vue'
import SsiMessageForm from '~/components/Message/ssiMessageForm.vue'
import SsiCertificateList from '~/components/Certificates/ssiCertificateList.vue'
import Tab from '~/components/Tools/Tabs/tab.vue'
import Tabs from '~/components/Tools/Tabs/tabs.vue'
import { SuperhumanProfileDetailModel } from '~/models/superhuman/superhumanProfileDetailModel'
import { ISuperhumanService } from '~/services/superhuman/ISuperhumanService'
import { MetaModel } from '~/models/meta/metaModel'
import { IConstants } from '~/constants/IConstants'

@Component({
  head(this: Index) {
    return {
      title: this.meta.title,
      bodyAttrs: {
        class: 'sidebar-collapse profile-page',
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.meta.keywords,
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: this.meta.title,
        },
        {
          hid: 'og-type',
          property: 'og:type',
          content: 'profile',
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: this.meta.url,
        },
        {
          hid: 'og-firstname',
          property: 'og:profile:first_name',
          content: this.meta.author.slice(0, this.meta.author.lastIndexOf(' ')),
        },
        {
          hid: 'og-lastname',
          property: 'og:profile:last_name',
          content: this.meta.author.slice(
            this.meta.author.lastIndexOf(' '),
            this.meta.author.length
          ),
        },
        {
          hid: 'og-username',
          property: 'og:profile:username',
          content: this.meta.author,
        },
        {
          hid: 'og-gender',
          property: 'og:profile:gender',
          content: this.profileInfos.gender,
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: process.env.BASE_STATIC_API_URL + this.meta.imageUrl,
        },
        {
          hid: 'og-image-alt',
          property: 'og:image:alt',
          content: this.meta.imageAlt,
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: this.meta.description,
        },
      ],
    }
  },
  components: {
    SsiPage,
    SsiProfileContainer,
    SsiSocialMediaList,
    SsiAbilityList,
    SsiEducationList,
    SsiExperienceList,
    SsiEvaluationList,
    SsiMessageForm,
    SsiCertificateList,
    Tab,
    Tabs,
  },
})
export default class Index extends Vue {
  @inject('ISuperhumanService') private $superhumanService!: ISuperhumanService
  @inject('IConstants') private $constants!: IConstants

  meta: MetaModel = {
    title: '',
    description: '',
    author: '',
    imageAlt: '',
    imageUrl: '',
    url: '',
    keywords: '',
    id: -1,
  }

  profileInfos: SuperhumanProfileDetailModel = {
    gender: '',
    meta: this.meta,
    fullName: '',
    about: '',
    description: '',
    profileImage: '',
    dateOfBirth: '',
  }

  countOfEducations: number = 0
  countOfExperiences: number = 0
  countOfCertificates: number = 0
  superhumanId: number = 5
  loaded: boolean = false

  async getSuperhumanProfileInfos(): Promise<void> {
    this.$constants.startLoader(this)
    const data =
      await this.$superhumanService.getSuperhumanProfileBySuperhumanId(
        this.superhumanId
      )
    if (data.success) {
      this.profileInfos = data.data
      this.meta = data.data.meta
    }
    this.loaded = true
    this.$constants.finishLoader(this)
  }

  setExperienceCount(count: number): void {
    this.countOfExperiences = count
  }

  setEducationCount(count: number): void {
    this.countOfEducations = count
  }

  setCertificateCount(count: number): void {
    this.countOfCertificates = count
  }

  created(): void {
    this.getSuperhumanProfileInfos()
  }
}
</script>

<style></style>
