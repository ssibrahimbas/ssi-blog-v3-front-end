<template>
  <div class="section section-contact-us text-center section-ssi-form">
    <hr class="ssi-hr" />
    <div class="container">
      <h2 class="title">{{ form.information.formTitle }}</h2>
      <p class="description">{{ form.information.formSubTitle }}</p>
      <div class="row">
        <div class="col-lg-6 text-center ml-auto mr-auto col-md-8">
          <SsiFormGroupInput
            v-model="form.firstName.value"
            class="input-lg ssi-fg-input"
            :class="[
              { 'has-danger': !!form.firstName.error },
              {
                'has-success':
                  form.firstName.error === null &&
                  form.firstName.value.length > 0,
              },
            ]"
            :placeholder="form.information.firstNamePlaceholder"
            :error="form.firstName.error"
            addon-left-icon="now-ui-icons users_circle-08"
            @input="checkFirstNameIsValid"
          >
          </SsiFormGroupInput>
          <SsiFormGroupInput
            v-model="form.lastName.value"
            class="input-lg ssi-fg-input"
            :class="[
              { 'has-danger': !!form.lastName.error },
              {
                'has-success':
                  form.lastName.error === null &&
                  form.lastName.value.length > 0,
              },
            ]"
            :placeholder="form.information.lastNamePlaceholder"
            :error="form.lastName.error"
            addon-left-icon="now-ui-icons users_circle-08"
            @input="checkLastNameIsValid"
          >
          </SsiFormGroupInput>
          <SsiFormGroupInput
            v-model="form.email.value"
            class="input-lg ssi-fg-input"
            :class="[
              { 'has-danger': !!form.email.error },
              {
                'has-success':
                  form.email.error === null && form.email.value.length > 2,
              },
            ]"
            :placeholder="form.information.emailPlaceholder"
            addon-left-icon="now-ui-icons ui-1_email-85"
            :error="form.email.error"
            @input="checkIsEmailValid"
          >
          </SsiFormGroupInput>
          <p class="text-muted text-center no-margin">
            {{ form.information.subscriberTypeMessage }}
          </p>
          <div class="ssi-button-checkbox-container">
            <b-form-checkbox
              v-for="(type, index) in subscriberTypes"
              :key="index"
              :checked="false"
              name="check-button"
              button
              :button-variant="
                checkTypeIsThere(type.id) ? 'primary' : 'secondary'
              "
              @change="toggleType(type.id)"
              >{{ type.text }}</b-form-checkbox
            >
            <template v-if="!!form.types.error">
              <div class="text-danger invalid-feedback" style="display: block">
                {{ form.types.error }}
              </div>
            </template>
          </div>
          <div class="ssi-checkbox-container">
            <SsiCheckbox
              v-model="form.notification.value"
              @input="checkNotificationIsValid"
              >{{ form.information.notificationMessage }}
              <template v-if="!!form.notification.error" #error>
                <div
                  class="text-danger invalid-feedback"
                  style="display: block"
                >
                  {{ form.notification.error }}
                </div>
              </template>
            </SsiCheckbox>
          </div>
          <div class="send-button" @click="subscribe">
            <SsiButton type="primary" :round="true" :center="true" size="lg">{{
              form.information.submitText
            }}</SsiButton>
          </div>
          <div class="ssi-alert-group">
            <SsiAlert :show="alert.show" :type="alert.type">
              <div class="alert-icon">
                <i class="now-ui-icons" :class="alert.icon"></i>
              </div>
              <strong>{{ alert.title }}</strong> {{ alert.message }}
            </SsiAlert>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Component, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import SsiFormGroupInput from '~/components/Tools/Inputs/formGroupInput.vue'
import SsiButton from '~/components/Tools/Button/button.vue'
import SsiCheckbox from '~/components/Tools/Inputs/checkbox.vue'
import SsiAlert from '~/components/Tools/Alert/alert.vue'
import { SubscribeFormModel } from '~/models/subscribe/subscribeFormModel'
import { IValidator } from '~/constants/IValidator'
import { IConstants } from '~/constants/IConstants'
import { SubscribeModel } from '~/models/subscribe/subscribeModel'
import { ISubscriberService } from '~/services/subscriber/ISubscriberService'
import { SubscriberTypeModel } from '~/models/subscriberType/subscriberTypeModel'

@Component({
  components: {
    SsiButton,
    SsiFormGroupInput,
    SsiCheckbox,
    SsiAlert,
  },
})
export default class SsiSubscriberForm extends Vue {
  @inject('IValidator') private $validator!: IValidator
  @inject('IConstants') private $constants!: IConstants
  @inject('ISubscriberService') private $subscriberService!: ISubscriberService

  initialForm: SubscribeFormModel = {
    firstName: {
      value: '',
      error: null,
    },
    lastName: {
      value: '',
      error: null,
    },
    email: {
      value: '',
      error: null,
    },
    notification: {
      value: false,
      error: null,
    },
    information: this.$constants.subscriberForm,
    types: {
      value: [],
      error: null,
    },
  }

  form: SubscribeFormModel = {
    ...this.initialForm,
  }

  subscriberTypes: SubscriberTypeModel[] = []

  alert: any = {
    type: 'danger',
    show: true,
    title: 'Bir şeyler yanlış gitti!',
    message: this.$constants.subscriberForm.dangerMessage,
    icon: 'ui-1_bell-53',
  }

  async getSubscriberTypes(): Promise<void> {
    const data = await this.$subscriberService.getSubscriberTypes()
    if (!data || !data.success) return
    this.subscriberTypes = data.data.result
  }

  async subscribe(): Promise<void> {
    const validation: boolean = this.$validator.runValidator([
      this.checkFirstNameIsValid,
      this.checkLastNameIsValid,
      this.checkIsEmailValid,
      this.checkSubscriberTypes,
      this.checkNotificationIsValid,
    ])
    if (!validation) return
    const subscriber: SubscribeModel = {
      subscriber: {
        firstName: this.form.firstName.value,
        lastName: this.form.lastName.value,
        email: this.form.email.value,
        postNotification: this.form.notification.value,
      },
      types: this.form.types.value,
    }
    this.$constants.startLoader(this)
    const data = await this.$subscriberService.registerSubscriber(subscriber)
    this.$constants.finishLoader(this)
    if (data.success) {
      this.alert = {
        type: 'success',
        show: true,
        title: 'İşlem Başarılı!',
        message: this.$constants.subscriberForm.successMessage,
        icon: 'ui-2_like',
      }
      this.destroyForm()
    } else {
      this.alert = {
        type: 'danger',
        show: true,
        title: 'Bir şeyler yanlış gitti!',
        message: this.$constants.subscriberForm.dangerMessage,
        icon: 'ui-1_bell-53',
      }
    }
  }

  toggleType(typeId: number): void {
    const isThere: boolean = this.checkTypeIsThere(typeId)
    if (isThere) {
      this.sliceSubscriberType(typeId)
    } else {
      this.addSubscriberType(typeId)
    }
  }

  addSubscriberType(typeId: number): void {
    this.form.types.value.push({
      id: typeId,
      name: undefined,
      description: undefined,
      text: undefined,
    })
  }

  checkTypeIsThere(typeId: number): boolean {
    return this.form.types.value.findIndex((t) => t.id === typeId) !== -1
  }

  sliceSubscriberType(typeId: number): void {
    this.form.types.value = this.form.types.value.filter((t) => t.id !== typeId)
  }

  checkSubscriberTypes(): boolean {
    if (this.form.types.value.length > 0) {
      this.form.types.error = null
      return true
    }
    this.form.types.error = this.$constants.subscriberForm.subscriberTypeError
    return false
  }

  checkIsEmailValid(email: string = this.form.email.value): boolean {
    const isValid: boolean = this.$validator.checkEmailIsValid(email)
    if (!isValid) {
      this.form.email.error = this.$constants.subscriberForm.emailError
    } else {
      this.form.email.error = null
    }
    return isValid
  }

  checkFirstNameIsValid(name: string = this.form.firstName.value): boolean {
    const condition: boolean = this.$validator.checkFirstNameIsValid(name)
    if (!condition) {
      this.form.firstName.error = this.$constants.subscriberForm.firstNameError
    } else {
      this.form.firstName.error = null
    }
    return condition
  }

  checkLastNameIsValid(name: string = this.form.lastName.value): boolean {
    const condition: boolean = this.$validator.checkLastNameIsValid(name)
    if (!condition) {
      this.form.lastName.error = this.$constants.subscriberForm.lastNameError
    } else {
      this.form.lastName.error = null
    }
    return condition
  }

  checkNotificationIsValid(
    notification: boolean = this.form.notification.value
  ): boolean {
    if (!notification) {
      this.form.notification.error =
        this.$constants.subscriberForm.notificationError
    } else {
      this.form.notification.error = null
    }
    return notification
  }

  destroyForm(): void {
    this.form = {
      ...this.initialForm,
    }
  }

  created(): void {
    this.getSubscriberTypes()
  }
}
</script>

<style lang="scss">
.row {
  margin-top: 2rem;
  .ssi-fg-input.has-success.input-group-focus {
    .input-group-text {
      border-color: #1be611 !important;
    }
  }
  .ssi-fg-input.has-danger {
    .input-group-text {
      border-color: #ffcfcf !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.send-button {
  margin-top: 2rem;
}
.section-ssi-form {
  margin-top: 5rem;
  padding-top: 3rem;
  .container {
    padding-top: 4rem;
  }
}
</style>
<style lang="scss">
$ssi-mediuam-gray: #dddddd;

.ssi-button-checkbox-container {
  .btn-secondary {
    color: #000 !important;
    &:not(:disabled):not(.disabled):active:focus {
      background-color: $ssi-mediuam-gray !important;
    }
  }
}
</style>
