<template>
  <SubBase class="privacy" :textData="textData" />
</template>

<script>
import SubBase from "./../components/SubBase";

export default {
  name: "Privacy",
  components: {
    SubBase
  },
  data() {
    return {
      textData: {
        title: "プライバシーポリシー",
        lead:
          "本サービス制作者は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。",
        textList: [
          {
            header: "1. 個人情報",
            description:
              "個人情報とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、特定の個人を識別できる情報を指します。"
          },
          {
            header: "2. 取得する個人情報",
            description: "本サービスにおいて取得する情報は以下のとおりです。",
            numList: [
              "本サービス利用者から提供される情報<br>ログインする際に使用するメールアドレス、パスワードのほか、ソーシャルログイン機能を利用してログインされる場合該当するソーシャルメディアのアカウント情報及び当該ソーシャルメディアから開示される個人情報等（ソーシャルログインをされる際に、当該ソーシャルメディアに登録している個人情報の開示、共有に同意されたものといたします。）",
              "自動的に受け取る情報<br>本サービス利用者のコンピュータがインターネットに接続する際に使用されるIPアドレス、接続情報、本サービスへのアクセス、本サービスからのアクセス、本サービスを介したアクセスに関するアクセス先のURL・日付・時間等の情報等"
            ]
          },
          {
            header: "3. 個人情報を収集・利用する目的",
            description:
              "本サービス制作者は、取得した個人情報を安全に管理し、次の目的のために個人情報を利用できるものとし、ユーザーはこれに同意します。",
            numList: [
              "本サービスの利用状況の管理",
              "本サービスの品質向上や企画・開発等"
            ]
          },
          {
            header: "4. 個人情報の第三者提供",
            description:
              "本サービス制作者は、取得したユーザー情報について、以下の場合第三者に提供することがあります。",
            itemList: [
              "統計的なデータなどユーザーを識別することができない状態で提供する場合",
              "法令に基づき開示・提供を求められた場合"
            ]
          },
          {
            header: "5. 個人情報の開示、訂正、追加、削除、利用停止",
            description:
              "ご本人からの個人データの開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。"
          },
          {
            header: "6. 外部送信・情報収集モジュールの有無",
            description:
              "本サービスは、ユーザーの利用状況調査等のために「Firebase」「GoogleAnalytics」を用い、統計的な利用情報を取得しています。Firebase及びGoogleAnalyticsでは、クッキー（Cookie）を使用して個人を識別する情報を含まないユーザー情報を収集します。収集されたユーザー情報の使用等に関する詳細については、こちらをご確認ください。",
            itemList: [
              "Firebase公式Webサイト<br><a href='https://firebase.google.com/' target='_blank'>https://firebase.google.com/</a>",
              "GoogleAnalytics公式Webサイト<br><a href='http://www.google.com/analytics/' target='_blank'>http://www.google.com/analytics/</a>"
            ]
          },
          {
            header: "7. プライバシーポリシーに関するお問い合わせ",
            description:
              "本サービスのプライバシーポリシーに関する質問やお問い合わせは、メール（karuta.develop.miya@gmail.com）にご連絡ください。"
          },
          {
            header: "8. 規約の変更",
            itemList: [
              "本サービス制作者は、ユーザーの承諾を得ることなく、いつでも、本規約の内容を改定することができるものとし、ユーザーはこれを異議なく承諾するものとします。",
              "本サービス制作者は、本規約を改定するときは、その内容について本サービス制作者所定の方法によりユーザーに通知します。",
              "前本規約の改定の効力は、本サービス制作者が前項により通知を行った時点から生じるものとします。",
              "ユーザーは、本規約変更後、本サービスを利用した時点で、変更後の本利用規約に異議なく同意したものとみなされます。"
            ]
          }
        ],
        effectiveDate: "2020年6月1日施行"
      }
    };
  }
};
</script>