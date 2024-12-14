# 使い方
まず、このリポジトリをまるごとダウンロードしてください。
上のCodeボタンからZIPでダウンロードできます。
1. `lrcfixer.exe`があるディレクトリでターミナルを開く
2. ターミナルに`lrcfixer`と入力し、Enterを推す
3. `Paste target LRC filepath (with absolute path): `の表示が出たら、ここに変更したいLRCファイルの**絶対パス**を貼り付ける\
   - 絶対パスは、エクスプローラーでファイルを右クリックしたメニューに「パスのコピー」があるので、それを選択することでコピーできる
   - ターミナルへの貼り付けは右クリックでも可能（下手に Ctrl+V を使うと変な文字が入力されるかも）
   - コピーしたパスの初めと終わりにはダブルクォーテーションが含まれているので、貼り付けた時点で消しておく
4. 上記のことができたらEnterを押す
5. 何もエラーが無ければ処理が完了し、アプリが終了する
# 機能
歌詞メーカーはファイルのエンコード形式をUTF-16として保存しているので、それをUTF-8に変換します。
また、タイムラインが`00:00.000`表記だとWalkmanの音楽アプリが対応できないため、`00:00.00`表記に一括変更します。このとき、1ミリ秒（1000分の1秒）の位は四捨五入されます。
# 開発環境
- Node.js v20.12.2
  - nexe 4.0.0-rc.6
  - jschardet 3.1.4
  - iconv 3.0.1
