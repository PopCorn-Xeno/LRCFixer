const fs = require("fs");
const reader = require("readline/promises").createInterface({
    input: process.stdin,
    output: process.stdout
});
const jschardet = require("jschardet");
const Iconv = require("iconv").Iconv;

/**
 * 非同期メイン関数
 */
async function main() {
    // 無限ループ
    while (true) {
        // LRCファイルのパスを入力させる
        let answer = await reader.question("Paste target LRC filepath (with absolute path): ");
        // ファイルの存在確認
        if (fs.existsSync(answer)) {
            // 拡張子が lrc なら
            if (/(.lrc)$/.test(answer)) {
                /** LRCファイルの中身のテキスト */
                let text = "";
                /** ファイルのテキストバッファ */
                let buffer = fs.readFileSync(answer);
                // もしエンコード形式が UTF-8以外 なら UTF-8 に変換
                // バッファを読み込んで文字列に変換する
                let encoding = jschardet.detect(buffer).encoding
                if (encoding != "UTF-8") {
                    console.warn("Converting UTF-8 now");
                    text = new Iconv(encoding, "UTF-8//TRANSLIT//IGNORE").convert(buffer).toString();
                }
                else {
                    text = buffer.toString("utf-8");
                }
                // `[00:00.000]` 表記を取得
                text = text.replace(/\[(\d{2}):(\d{2}).(\d{3})\]/g, (match, p1, p2, p3) => {
                    /* 1msを10ms単位に丸める
                     * 1. 1ms表記をfloatにパース
                     * 2. 10で割って小数第1位をつくる
                     * 3. 小数第1位を四捨五入する
                     * 4. 文字列に変換して、2桁目に値がない場合は0埋めする
                     */
                    return `[${p1}:${p2}.${Math.round(Number.parseFloat(p3) / 10).toString().padStart(2, "0")}]`
                });
                // ファイルの保存
                try {
                    fs.writeFileSync(answer, text, { encoding: "utf-8" });
                }
                catch (error) {
                    console.error(error);
                    continue;
                }

                console.info("The file has been fixed successfully");
                
            }
            // 拡張子がLRCでなかったらやり直させる
            else {
                console.error("Type of extension is not LRC");
                continue;
            }
            return;
        }
        // ファイルが見つからなかったらやり直させる
        else {
            console.error("Not found");
            continue;
        }
    }
}

// メイン関数を非同期で実行
main().then(() => process.exit());