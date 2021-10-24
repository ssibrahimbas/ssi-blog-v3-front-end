import { injectable } from 'inversify-props'
import { FormType, IConstants } from '~/constants/IConstants'

export interface IFooterPage {
  title: string,
  path: string,
  icon: string
}

export interface IHomePage {
  title: string,
  description: string
}

@injectable()
export default class Constants implements IConstants {
  months: string[] = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  days: string[] = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];

  static siteName: string = "Ssi Blog v3";
  static siteDescription: string =
    "Developed by ssibrahimbas. Theme owner CreativeTim.";

  subscriberForm: FormType = {
    formTitle: "Yeniliklerden Haberdar Ol!",
    firstNamePlaceholder: "İsminiz...",
    firstNameError: "İsminiz 2 karakterden büyük olmalıdır.",
    lastNamePlaceholder: "Soyisminiz...",
    lastNameError: "Soyisminiz 2 karakterden büyük olmalıdır.",
    emailPlaceholder: "E-posta adresiniz...",
    emailError: "Lütfen geçerli bir E-posta adresi giriniz.",
    formSubTitle: "Aşağıdaki formu doldurarak bültene abone olabilirsin.",
    subscriberTypeMessage: "Abonelik Tipi Seçiniz",
    subscriberTypeError: "Abone olabilmek için abonelik tipi seçmelisiniz.",
    notificationMessage:
      "Yeni içeriklerden e-posta adresim aracılığıyla haberdar olmak istiyorum.",
    notificationError: "Bildirimleri açmadan bültene kayıt olamazsınız.",
    submitText: "Bültene Abone Ol!",
    successMessage: "Bültene başarıyla abone oldunuz!",
    dangerMessage: "Bültene abone olamadınız. Tekrar deneyiniz.",
  };

  evaluationForm: FormType = {
    formTitle: "Yorum Yapmak İster Misin?",
    formSubTitle: "Aşağıdaki formu doldurarak bu gönderiye yorum yapabilirsin.",
    firstNamePlaceholder: "İsminiz...",
    firstNameError: "İsminiz 2 karakterden büyük olmalıdır.",
    lastNamePlaceholder: "Soyisminiz...",
    lastNameError: "Soyisminiz 2 karakterden büyük olmalıdır.",
    emailPlaceholder: "E-posta adresiniz...",
    emailError: "Lütfen geçerli bir E-posta adresi giriniz.",
    titlePlaceholder: "Başlık...",
    titleError: "Yorumunuzun başlığı 2 karakterden büyük olmalıdır.",
    messagePlaceholder: "Mesajınız...",
    messageMinError: "Mesajınız en az 10 karakterden oluşmalıdır.",
    messageMaxError: "Mesajınız en fazla 500 karakterden oluşmalıdır.",
    expressConsentMessage:
      "Yorumumun herkese açık yayımlanacağını biliyorum ve girdiğim bilgilerimin saklanmasını kabul ediyorum.",
    expressConsentError: "Açık rıza onayı vermeden yorum yapamazsın.",
    submitText: "Yorumumu Kaydet!",
    successMessage: "Yorumunuz kaydedildi!",
    dangerMessage: "Yorumunuz kaydedilemedi. Tekrar deneyiniz.",
  };

  messageForm: FormType = {
    formTitle: "Benimle iletişime geçin!",
    formSubTitle: "Aşağıdaki formu doldurarak benimle iletişime geçebilirsiniz.",
    senderNamePlaceholder: "İsminiz...",
    senderNameError: "İsminiz 2 karakterden büyük olmalıdır.",
    emailPlaceholder: "E-posta adresiniz...",
    emailError: "Lütfen geçerli bir E-posta adresi giriniz.",
    subjectPlaceholder: "Konu...",
    subjectError: "Konu en az 2 karakterden oluşmalıdır.",
    textPlaceholder: "Mesajınız...",
    textMinError: "Mesajınız en az 10 karakterden oluşmalıdır.",
    textMaxError: "Mesajınız en çok 500 karakterden oluşmalıdır.",
    expressConsentMessage: "Formda girdiğim bilgilerimin saklanmasını kabul ediyorum.",
    expressConsentError: "Açık rıza onayı vermeden benimle iletişime geçemezsin :(",
    submitText: "İletişime Geç!",
    successMessage: "Mesajınız sisteme kaydedildi. En yakın zamanda dönüş sağlayacağım :)",
    dangerMessage: "Mesajınız kaydedilirken bir sorun yaşandı. Lütfen tekrar deneyin."

  }

  showcasePage = {
    name: "posts",
    title: "Tüm yazılarım",
    description:
      "Bu sayfa aracılığıyla tüm yazılarımı görebilirsiniz. Ayrıca yazılarım arasında başlığa göre arama yapabilirsiniz. Eğer konuya göre arama yapmak istiyorsanız bu sefer #konu şeklinde arama yapmanız gerekmektedir.",
  };

  projectsPage = {
    name: "projects",
    title: "Projelerim",
    description:
      "Bu sayfa aracılığıyla projelerimi görebilirsiniz. Proje kartlarında bulunan ikonlara tıklayarak dokümanlara ya da linklere erişebilirsiniz. Eğer proje kartının üzerinde elmas simgesi görüyorsanız bu simge projenin açık kaynak kodlu bir proje olduğu anlamına gelir.",
  };

  homePage = {
    name: "home",
    title: "Ssi Blog v3",
    description: "Web sitemin 3. Versiyonuna hoş geldin! Burada ağırlıklı olarak web/mobil geliştirme ile ilgili yazılar göreceksin. Tabii ki bu alanda benden çok çok bilgili insanlar var. Benim bu siteyi geliştirirkenki amacım öncelikli olarak bildiklerimi uygulamaya dökmekti. Şimdi ise bildiklerimi yazıya aktararak aslında bir yandan da tekrar yapmış oluyorum. Bunun haricinde bir de insanlara bir şey katabiliyorsam.. İşte o zaman keyfimden geçilmez :)"
  }

  static pages: IFooterPage[] = [
    {
      title: "Yazılar",
      path: "/yazilar",
      icon: "files_single-copy-04",
    },
    {
      title: "Projelerim",
      path: "/projelerim",
      icon: "education_atom",
    },
    {
      title: "Profilim",
      path: "/profilim",
      icon: "users_single-02",
    },
  ];

  standards: any = {
    evaluations: {
      imageAlt: 'yorum yapan kullanıcı profil fotoğrafı',
      imageSrc: '/img/user.png',
      maxChar: 142
    }
  }

  formatDate(date: string): string {
    if (!date) return ''
    const calcDate = new Date(date);
    return `${calcDate.getDate()} ${this.months[calcDate.getMonth()]} ${calcDate.getUTCFullYear()}, ${this.days[calcDate.getDay()]}`
  }

  startLoader(self: Vue): void {
    if (process.client && self.$nuxt.$loading) {
      self.$nextTick(() => {
        self.$nuxt.$loading.start()
      })
    }
  }

  finishLoader(self: Vue): void {
    if (process.client && self.$nuxt.$loading) {
      self.$nextTick(() => {
        self.$nuxt.$loading.finish()
      })
    }
  }

}
