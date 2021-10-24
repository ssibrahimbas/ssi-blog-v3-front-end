<template>
  <div class="section section-contact-us text-center">
    <div class="container">
      <h2 class="title">{{ form.information.formTitle }}</h2>
      <p class="description">{{ form.information.formSubTitle }}</p>
      <div class="row">
        <div class="col-lg-6 text-center ml-auto mr-auto col-md-8">
          <form-group-input
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
          </form-group-input>
          <form-group-input
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
            v-model="form.title.value"
            class="input-lg ssi-fg-input"
            :class="[
              { 'has-danger': !!form.firstName.error },
              {
                'has-success':
                  form.title.error === null && form.title.value.length > 3,
              },
            ]"
            :placeholder="form.information.titlePlaceholder"
            :error="form.title.error"
            addon-left-icon="now-ui-icons users_circle-08"
            @input="checkTitleIsValid"
          >
          </form-group-input>
          <div class="textarea-container">
            <textarea
              v-model="form.message.value"
              class="form-control"
              :class="[
                { 'has-danger': !!form.message.error },
                {
                  'has-success':
                    form.message.error === null &&
                    form.message.value.length > 10 &&
                    form.message.value.length < 500,
                },
              ]"
              name="name"
              rows="4"
              cols="80"
              :placeholder="form.information.messagePlaceholder"
              @input="checkMessageIsValid($event.target.value)"
            ></textarea>
            <div
              v-if="!!form.message.error"
              class="text-danger invalid-feedback"
              style="display: block"
            >
              {{ form.message.error }}
            </div>
          </div>
          <div class="ssi-checkbox-container">
            <checkbox
              v-model="form.expressConsent.value"
              @input="checkExpressConsentIsValid"
              >{{ form.information.expressConsentMessage }}
              <template v-if="!!form.expressConsent.error" #error>
                <div
                  class="text-danger invalid-feedback"
                  style="display: block"
                >
                  {{ form.expressConsent.error }}
                </div>
              </template>
            </checkbox>
          </div>
          <div class="send-button" @click="subscribe">
            <Button type="primary" :round="true" :block="true" size="lg"
              >{{ form.information.submitText }}
            </Button>
          </div>
          <div v-if="alert.show" class="ssi-alert-group">
            <alert :show="alert.show" dismissible>
              <div class="alert-icon">
                <i class="now-ui-icons" :class="alert.icon"></i>
              </div>
              <strong>{{ alert.title }}</strong> {{ alert.message }}
            </alert>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { inject } from 'inversify-props'
import FormGroupInput from '~/components/Tools/Inputs/formGroupInput.vue'
import Checkbox from '~/components/Tools/Inputs/checkbox.vue'
import Button from '~/components/Tools/Button/button.vue'
import { IEvaluationService } from '~/services/evaluation/IEvaluationService'
import { IConstants } from '~/constants/IConstants'
import { EvaluationFormModel } from '~/models/evaluation/evaluationFormModel'
import { EvaluationPostModel } from '~/models/evaluation/EvaluationPostModel'
import Alert from '~/components/Tools/Alert/alert.vue'
import { IValidator } from '~/constants/IValidator'

@Component({
  components: { Alert, FormGroupInput, Checkbox, Button },
})
export default class ssiEvaluationForm extends Vue {
  @inject('IValidator') private $validator!: IValidator
  @inject('IEvaluationService') $evaluationService!: IEvaluationService
  @inject('IConstants') $constants!: IConstants

  @Prop() postId!: number

  form: EvaluationFormModel = {
    firstName: {
      value: '',
      error: null,
    },
    lastName: {
      value: '',
      error: null,
    },
    title: {
      value: '',
      error: null,
    },
    email: {
      value: '',
      error: null,
    },
    message: {
      value: '',
      error: null,
    },
    expressConsent: {
      value: false,
      error: null,
    },
    information: this.$constants.evaluationForm,
  }

  alert: any = {
    type: null,
    show: false,
    title: null,
    message: null,
    icon: null,
  }

  checkIsEmailValid(email: string = this.form.email.value): boolean {
    const isValid: boolean = this.$validator.checkEmailIsValid(email)
    if (!isValid) {
      this.form.email.error = this.$constants.evaluationForm.emailError
    } else {
      this.form.email.error = null
    }
    return isValid
  }

  async subscribe(): Promise<void> {
    const validation: boolean = this.$validator.runValidator([
      this.checkFirstNameIsValid,
      this.checkLastNameIsValid,
      this.checkIsEmailValid,
      this.checkTitleIsValid,
      this.checkMessageIsValid,
      this.checkExpressConsentIsValid,
    ])
    if (!validation) return
    const evaluation: EvaluationPostModel = {
      senderName: `${this.form.firstName.value} ${this.form.lastName.value}`,
      senderEmail: this.form.email.value,
      title: this.form.title.value,
      description: this.form.message.value,
      postId: this.postId,
      expressConsent: this.form.expressConsent.value,
    }
    const data = await this.$evaluationService.addEvaluation(evaluation)
    if (data.success) {
      this.alert = {
        type: 'success',
        show: true,
        title: 'İşlem Başarılı!',
        message: this.$constants.evaluationForm.successMessage,
        icon: 'ui-2_like',
      }
      this.destroyForm()
    } else {
      this.alert = {
        type: 'danger',
        show: true,
        title: 'Bir şeyler yanlış gitti!',
        message: this.$constants.evaluationForm.dangerMessage,
        icon: 'ui-1_bell-53',
      }
    }
  }

  checkFirstNameIsValid(name: string = this.form.firstName.value): boolean {
    const condition: boolean = this.$validator.checkFirstNameIsValid(name)
    if (!condition) {
      this.form.firstName.error = this.$constants.evaluationForm.firstNameError
    } else {
      this.form.firstName.error = null
    }
    return condition
  }

  checkLastNameIsValid(name: string = this.form.lastName.value): boolean {
    const condition: boolean = this.$validator.checkLastNameIsValid(name)
    if (!condition) {
      this.form.lastName.error = this.$constants.evaluationForm.lastNameError
    } else {
      this.form.lastName.error = null
    }
    return condition
  }

  checkTitleIsValid(title: string = this.form.title.value): boolean {
    const condition = this.$validator.checkTitleIsValid(title)
    if (!condition) {
      this.form.title.error = this.$constants.evaluationForm.titleError
    } else {
      this.form.title.error = null
    }
    return condition
  }

  checkExpressConsentIsValid(
    expressConsent: boolean = this.form.expressConsent.value
  ): boolean {
    if (!expressConsent) {
      this.form.expressConsent.error =
        this.$constants.evaluationForm.expressConsentError
    } else {
      this.form.expressConsent.error = null
    }
    return expressConsent
  }

  checkMessageIsValid(message: string = this.form.message.value): boolean {
    const conditionPrimary: boolean =
      this.$validator.checkMessageMinLengthIsValid(message)
    const conditionSecondary: boolean =
      this.$validator.checkMessageMaxLengthIsValid(message)
    if (!conditionPrimary) {
      this.form.message.error = this.$constants.evaluationForm.messageMinError
    } else if (!conditionSecondary) {
      this.form.message.error = this.$constants.evaluationForm.messageMaxError
    } else {
      this.form.message.error = null
    }
    return conditionPrimary && conditionSecondary
  }

  destroyForm(): void {
    this.form = {
      ...this.form,
    }
  }
}
</script>

<style scoped></style>
