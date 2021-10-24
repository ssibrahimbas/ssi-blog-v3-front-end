<template>
  <div class="section section-contact-us text-center">
    <div class="container">
      <h2 class="title">{{ form.information.formTitle }}</h2>
      <p class="description">{{ form.information.formSubTitle }}</p>
      <div class="row">
        <div class="col-lg-6 text-center ml-auto mr-auto col-md-8">
          <form-group-input
            v-model="form.senderName.value"
            class="input-lg ssi-fg-input"
            :class="[
              { 'has-danger': !!form.senderName.error },
              {
                'has-success':
                  form.senderName.error === null &&
                  form.senderName.value.length > 0,
              },
            ]"
            :placeholder="form.information.senderNamePlaceholder"
            :error="form.senderName.error"
            addon-left-icon="now-ui-icons users_circle-08"
            @input="checkSenderNameIsValid"
          >
          </form-group-input>
          <form-group-input
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
          </form-group-input>
          <form-group-input
            v-model="form.subject.value"
            class="input-lg ssi-fg-input"
            :class="[
              { 'has-danger': !!form.subject.error },
              {
                'has-success':
                  form.subject.error === null && form.subject.value.length > 0,
              },
            ]"
            :placeholder="form.information.subjectPlaceholder"
            :error="form.subject.error"
            addon-left-icon="now-ui-icons users_circle-08"
            @input="checkSubjectIsValid"
          >
          </form-group-input>
          <div class="textarea-container">
            <textarea
              v-model="form.text.value"
              class="form-control"
              :class="[
                { 'has-danger': !!form.text.error },
                {
                  'has-success':
                    form.text.error === null &&
                    form.text.value.length > 10 &&
                    form.text.value.length < 500,
                },
              ]"
              name="name"
              rows="4"
              cols="80"
              :placeholder="form.information.textPlaceholder"
              @input="checkTextIsValid($event.target.value)"
            ></textarea>
            <div
              v-if="!!form.text.error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              {{ form.text.error }}
            </div>
          </div>
          <div class="ssi-checkbox-container">
            <Checkbox
              v-model="form.agreement.value"
              @input="checkAgreementIsValid"
              >{{ form.information.expressConsentMessage }}
              <template v-if="!!form.agreement.error" #error>
                <div
                  class="text-danger invalid-feedback"
                  style="display: block"
                >
                  {{ form.agreement.error }}
                </div>
              </template>
            </Checkbox>
          </div>
          <div class="send-button" @click="sendMessageForm">
            <Button type="primary" :round="true" :center="true" size="lg">{{
              form.information.submitText
            }}</Button>
          </div>
          <div class="ssi-alert-group">
            <Alert :show="alert.show" :type="alert.type">
              <div class="alert-icon">
                <i class="now-ui-icons" :class="alert.icon"></i>
              </div>
              <strong>{{ alert.title }}</strong> {{ alert.message }}
            </Alert>
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
import FormGroupInput from '~/components/Tools/Inputs/formGroupInput.vue'
import Button from '~/components/Tools/Button/button.vue'
import Checkbox from '~/components/Tools/Inputs/checkbox.vue'
import Alert from '~/components/Tools/Alert/alert.vue'
import { IValidator } from '~/constants/IValidator'
import { IConstants } from '~/constants/IConstants'
import { IMessageService } from '~/services/message/IMessageService'
import { MessageFormModel } from '~/models/message/messageFormModel'
import { MessageModel } from '~/models/message/messageModel'

@Component({
  components: {
    FormGroupInput,
    Button,
    Checkbox,
    Alert,
  },
})
export default class SsiMessageForm extends Vue {
  @inject('IValidator') private $validator!: IValidator
  @inject('IConstants') private $constants!: IConstants
  @inject('IMessageService') private $messageService!: IMessageService

  initialForm : MessageFormModel = {
    senderName: {
      value: '',
      error: null,
    },
    email: {
      value: '',
      error: null,
    },
    subject: {
      value: '',
      error: null,
    },
    text: {
      value: '',
      error: null,
    },
    agreement: {
      value: false,
      error: null,
    },
    information: this.$constants.messageForm,
  }

  form: MessageFormModel = {
    ...this.initialForm
  }

  alert: any = {
    type: null,
    show: false,
    title: null,
    message: null,
    icon: null,
  }

  async sendMessageForm(): Promise<void> {
    const validation: boolean = this.$validator.runValidator([
      this.checkSenderNameIsValid,
      this.checkIsEmailValid,
      this.checkSubjectIsValid,

      this.checkAgreementIsValid,
    ])
    if (!validation) return
    const message: MessageModel = {
      senderName: this.form.senderName.value,
      email: this.form.email.value,
      subject: this.form.subject.value,
      text: this.form.text.value,
      agreement: this.form.agreement.value,
    }
    this.$constants.startLoader(this);
    const data = await this.$messageService.sendMessage(message)
    this.$constants.finishLoader(this);
    if (data.success) {
      this.alert = {
        type: 'success',
        show: true,
        title: 'İşlem Başarılı!',
        message: this.$constants.messageForm.successMessage,
        icon: 'ui-2_like',
      }
      this.destroyForm()
    } else {
      this.alert = {
        type: 'danger',
        show: true,
        title: 'Bir şeyler yanlış gitti!',
        message: this.$constants.messageForm.dangerMessage,
        icon: 'ui-1_bell-53',
      }
    }
  }

  checkIsEmailValid(email: string = this.form.email.value): boolean {
    const isValid: boolean = this.$validator.checkEmailIsValid(email)
    if (!isValid) {
      this.form.email.error = this.$constants.messageForm.emailError
    } else {
      this.form.email.error = null
    }
    return isValid
  }

  checkSubjectIsValid(subject: string = this.form.subject.value): boolean {
    const condition: boolean = this.$validator.checkStringIsFitMinimumLength(
      subject,
      2
    )
    if (!condition) {
      this.form.subject.error = this.$constants.messageForm.subjectError
    } else {
      this.form.subject.error = null
    }
    return condition
  }

  checkTextIsValid(text: string = this.form.text.value): boolean {
    const conditionPrimary: boolean =
      this.$validator.checkStringIsFitMinimumLength(text, 10)
    const conditionSecondary: boolean =
      this.$validator.checkStringIsFitMaximumLength(text, 500)
    if (!conditionPrimary) {
      this.form.text.error = this.$constants.messageForm.textMinError
    } else if (!conditionSecondary) {
      this.form.text.error = this.$constants.messageForm.textMaxError
    } else {
      this.form.text.error = null
    }
    return conditionPrimary && conditionSecondary
  }

  checkSenderNameIsValid(name: string = this.form.senderName.value): boolean {
    const condition: boolean = this.$validator.checkStringIsFitMinimumLength(
      name,
      5
    )
    if (!condition) {
      this.form.senderName.error = this.$constants.messageForm.senderNameError
    } else {
      this.form.senderName.error = null
    }
    return condition
  }

  checkAgreementIsValid(
    agreement: boolean = this.form.agreement.value
  ): boolean {
    if (!agreement) {
      this.form.agreement.error =
        this.$constants.messageForm.expressConsentError
    } else {
      this.form.agreement.error = null
    }
    return agreement
  }

  destroyForm(): void {
    this.form = {
      ...this.initialForm,
    }
  }
}
</script>

<style scoped>
.ssi-checkbox-container {
  margin-block: 2rem;
}
</style>
