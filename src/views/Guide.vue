<template>
  <div class="terms">
    <Header />

    <v-content>
      <v-container>
        <v-card flat class="pb-12">
          <h2 class="mb-2 text-center">機能一覧</h2>
          <h3 class="subtitle-1 mb-4">本アプリの機能を紹介します。</h3>

          <v-expansion-panels accordion focusable flat class="mb-4">
            <v-expansion-panel>
              <v-expansion-panel-header>トップ</v-expansion-panel-header>
              <v-expansion-panel-content>
                <dl>
                  <dt class="mt-4">
                    <b>ログイン</b>
                  </dt>
                  <dd>
                    メールアドレスやGoogleアカウント、Twitterアカウントを使用することで、ログインし、本アプリを使用できます。
                    <br />「ゲストとして続行」すると、アカウント不要で使用できます。
                    <br />しかし、一度ログアウトしてしまうと、作成したデータが消えてしまうのでご注意ください。
                  </dd>
                </dl>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>一覧画面</v-expansion-panel-header>
              <v-expansion-panel-content>
                <dl>
                  <dt class="mt-4">
                    <b>一覧表示</b>
                  </dt>
                  <dd>「定位置」と「試合」のタブを切り替えると、それぞれのデータ一覧が表示されます。</dd>

                  <dt class="mt-4">
                    <b>検索</b>
                  </dt>
                  <dd>検索窓から「タイトル」「日付」「選手名（※試合データのみ）」を入力すると、データの絞り込みができます。</dd>

                  <dt class="mt-4">
                    <b>作成</b>
                  </dt>
                  <dd>
                    「作成」ボタンをタップすると、「定位置」もしくは「試合」の新規データを作成できます。
                    <br />「コード入力」を選択すると、配置コードを使って、元データのコピーを作成できます。
                    <br />★他のユーザーが作ったデータを再現する時に役立ちます。
                  </dd>

                  <dt class="mt-4">
                    <b>編集</b>
                  </dt>
                  <dd>データをタップすると、データを編集できます。</dd>

                  <dt class="mt-4">
                    <b>アイテムメニュー</b>
                  </dt>
                  <dd>
                    <v-btn text icon small>
                      <v-icon dark>mdi-dots-horizontal</v-icon>
                    </v-btn>をタップすると、「複製」や「削除」、「コードのコピー」などのメニューが表示されます。
                  </dd>

                  <dt class="mt-4">
                    <b>複製</b>
                  </dt>
                  <dd>「複製」をタップすると、データを複製できます。</dd>

                  <dt class="mt-4">
                    <b>削除</b>
                  </dt>
                  <dd>「削除」をタップすると、データを削除できます。</dd>

                  <dt class="mt-4">
                    <b>コードをコピー</b>
                  </dt>
                  <dd>「コードをコピー」をタップすると、配置コードをコピーできます。</dd>

                  <dt class="mt-4">
                    <b>メニュー</b>
                  </dt>
                  <dd>
                    <v-btn text icon small>
                      <v-icon dark>mdi-menu</v-icon>
                    </v-btn>をタップすると、「設定」や「使い方」、「ログアウト」などのメニューが表示されます。
                  </dd>

                  <dt class="mt-4">
                    <b>設定</b>
                  </dt>
                  <dd>「設定」をタップすると、ユーザーの設定を変更できます。</dd>

                  <dt class="mt-4">
                    <b>旧仮名遣い表記</b>
                  </dt>
                  <dd>
                    「旧仮名遣い表記」にチェックを入れると、新規作成・編集画面や確認画面で表示される表記が旧仮名遣いになります。
                    <br />（例）あい→あひ、おおこ→あふこ
                  </dd>

                  <dt class="mt-4">
                    <b>機能一覧</b>
                  </dt>
                  <dd>「機能一覧」をタップすると、機能一覧画面に遷移します。</dd>

                  <dt class="mt-4">
                    <b>ログアウト</b>
                  </dt>
                  <dd>「ログアウト」をタップすると、ログアウトできます。</dd>
                </dl>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>新規作成・編集画面</v-expansion-panel-header>
              <v-expansion-panel-content>
                <dl>
                  <dt class="mt-4">
                    <b>配置移動</b>
                  </dt>
                  <dd>
                    決まり字をドラッグすることで配置を移動できます。
                    <br />（※各段の移動させたい端にくっつけるようにドラッグする必要があります。）
                    <br />タブを切り替えると、配置する選手を変更できます。（※試合データのみ）
                    <br />★定位置データの場合は、画面を横向けにして使用することをおすすめします。
                  </dd>

                  <dt class="mt-4">
                    <b>決まり字の色付け</b>
                  </dt>
                  <dd>決まり字をタップすると、色付け（文字が赤色に変化）できます。</dd>

                  <dt class="mt-4">
                    <b>表示間隔の変更</b>
                  </dt>
                  <dd>
                    各段の個数表示箇所をタップすると、表示間隔を変更できます。
                    <br />通常、決まり字同士の間は詰まって表示されますが、タップすると色が濃くなり、札間隔を広げることができます。
                    <br />もう一度、タップすることで元に戻ります。
                    <br />浮札のみデフォルトで間隔が広がるように設定されています。
                  </dd>

                  <dt class="mt-4">
                    <b>入力選手切り替え（※試合データのみ）</b>
                  </dt>
                  <dd>選手名のタブを切り替えると、入力する選手を切り替えることができます。</dd>

                  <dt class="mt-4">
                    <b>選手名入力（※試合データのみ）</b>
                  </dt>
                  <dd>
                    選手名を入力できます。
                    <br />選手名が入力されていない場合は、「選手1」「選手2」で保存されます。
                  </dd>

                  <dt class="mt-4">
                    <b>検索</b>
                  </dt>
                  <dd>
                    検索窓から決まり字を入力すると、決まり字の背景が黄色く表示されます。
                    <br />検索方法は3通りあり、「ひらがな」「ローマ字（訓令式・ヘボン式）」「数字」が使用できます。
                    <br />検索ワードの間に全角・半角スペースを挟むことで、一度に複数検索できます。
                    <br />一覧画面の設定で、「旧仮名遣い表記」にチェックが入っている場合は、その表記で検索することもできます。
                  </dd>

                  <dt class="mt-4">
                    <b>ヘルプ</b>
                  </dt>
                  <dd>
                    <v-btn text icon small depressed>
                      <v-icon>mdi-help-circle-outline</v-icon>
                    </v-btn>をタップすると、新規作成・編集画面の機能を順番に説明します。
                  </dd>

                  <dt class="mt-4">
                    <b>確認</b>
                  </dt>
                  <dd>「確認」ボタンをタップすると、全ての段が一列になった状態で確認できます。</dd>

                  <dt class="mt-4">
                    <b>スクロール固定</b>
                  </dt>
                  <dd>
                    「スクロール固定」ボタンをタップすると、画面スクロールを無効化できます。
                    <br />「固定解除」ボタンをタップすると、画面スクロールを有効化できます。
                    <br />★決まり字を動かす時に、余計なスクロールを防止するのに役立ちます。
                  </dd>
                </dl>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>確認画面</v-expansion-panel-header>
              <v-expansion-panel-content>
                <dl>
                  <dt class="mt-4">
                    <b>配置確認</b>
                  </dt>
                  <dd>
                    作成した配置を確認できます。
                    <br />全ての段が一列になった状態で確認できます。
                    <br />横幅が画面サイズをオーバーする場合は、横スクロールで確認できます。
                    <br />新規作成・編集画面で色付けした決まり字は赤字で表示されます。
                  </dd>

                  <dt class="mt-4">
                    <b>タイトル入力</b>
                  </dt>
                  <dd>
                    タイトルを入力できます。
                    <br />タイトルが入力されていない場合は、「タイトルなし」で保存されます。
                  </dd>

                  <dt class="mt-4">
                    <b>データ画像化・ダウンロード</b>
                  </dt>
                  <dd>
                    <v-btn text icon small>
                      <v-icon dark>mdi-arrow-down-bold-circle-outline</v-icon>
                    </v-btn>をタップすると、データをダウンロードできます。
                    <br />ダウンロード後、ダウンロードしたデータを開き、画像として保存できます。
                    <br />ダウンロードが失敗する場合は、画面に保存用の画像が表示されるので、そちらから保存することができます。
                  </dd>

                  <dt class="mt-4">
                    <b>保存</b>
                  </dt>
                  <dd>「保存」ボタンをタップすると、データを保存できます。</dd>
                </dl>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <BtnWindowClose />
        </v-card>
      </v-container>
    </v-content>

    <Footer />
  </div>
</template>

<script>
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import BtnWindowClose from "./../components/BtnWindowClose";

export default {
  name: "Guide",
  components: {
    Header,
    Footer,
    BtnWindowClose
  }
};
</script>
