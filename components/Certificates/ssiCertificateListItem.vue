<template>
  <ssi-info-card
    :image="certificate.organization.imagePath"
    :title="certificate.certificate.title"
    :description="
      `Verildiği tarih ${calculateDateText(
        certificate.certificate.dateOfReceipt
      )} - ${
        certificate.certificate.isExpirationDate
          ? calculateDateText(certificate.certificate.dateOfExpiration)
          : 'Sona erme süresi yok'
      }`
    "
  >
    <template #content>
      <p class="ssi-date">
        Yeterlilik Kimliği {{ certificate.certificate.qualificationIdentity }}
      </p>
      <a target="_blank" :href="certificate.certificate.qualificationUrl"
      ><b>Yeterlilik belgesini gör</b></a
      >
    </template>
  </ssi-info-card>
</template>

<script lang='ts'>
import "reflect-metadata";
import {Component, Vue, Prop} from 'vue-property-decorator'
import {inject} from 'inversify-props'
import SsiInfoCard from '~/components/Tools/Cards/ssiInfoCard.vue'
import { IConstants } from '~/constants/IConstants'
import { CertificateListModel } from '~/models/certificate/certificateListModel'

@Component({
  components: {
    SsiInfoCard
  }
})
export default class SsiCertificateListItem extends Vue {
  @Prop() certificate! : CertificateListModel

  @inject("IConstants") private $constants! : IConstants

  calculateDateText(stringDate : string) : string {
    const date : Date = new Date(stringDate);
    const year : number = date.getUTCFullYear();
    const month : string = this.$constants.months[date.getMonth()]
    return `${month} ${year}`;
  }
}
</script>

<style scoped>

</style>
