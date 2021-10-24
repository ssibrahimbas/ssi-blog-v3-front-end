<template>
  <div v-if="certificates.length > 0" class="ssi-container">
    <ssi-certificate-list-item
      v-for="(certificate, index) in certificates"
      :key="index"
      :certificate="certificate"
    />
  </div>
</template>

<script lang='ts'>
import "reflect-metadata";
import {Component, Vue, Emit} from 'vue-property-decorator'
import {inject} from "inversify-props";
import SsiCertificateListItem from "~/components/Certificates/ssiCertificateListItem.vue";
import { CertificateListModel } from '~/models/certificate/certificateListModel'
import { ICertificateService } from '~/services/certificate/ICertificateService'

@Component({
  components: {
    SsiCertificateListItem
  }
})
export default class SsiCertificateList extends Vue {
  @inject("ICertificateService") private $certificateService! : ICertificateService

  certificates : CertificateListModel[] = [];
  countOfCertificate : number = 0;
  superhumanId : number = 5;

  created() : void {
    this.getCertificates();
  }

  async getCertificates() : Promise<void> {
    const data = await this.$certificateService.getAllCertificatesBySuperhumanId(this.superhumanId);
    this.certificates = data.data.result;
    this.countOfCertificate = data.data.count;
    this.emitCertificateCount(data.data.count);
  }

  @Emit("setCertificateCount")
  emitCertificateCount(count : number) : number {
    return count;
  }
}
</script>

<style scoped>

</style>
