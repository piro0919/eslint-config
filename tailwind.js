import tailwindPlugin from "eslint-plugin-tailwindcss";

/**
 * Tailwind のクラスの決まり。[...] に値をじかに書かず、CSS の @theme に名前を付けて使う（no-arbitrary-value）。
 * 決まりに無いクラス名の書き間違いも落とす（no-custom-classname）。
 * className に直接書いたものだけを見る。文字列の定数に入れたクラスは見ないので、要るならプロジェクトの検査で補う
 *
 * @param {{ cssConfigPath: string, whitelist?: string[], level?: 'warn' | 'error', files?: string[] }} options
 *   cssConfigPath: @theme を書いた CSS（src/app/globals.css など）。
 *   whitelist: その CSS に自前で書いたクラス。
 *   level: 最初は 'warn' で入れ、直し終えたら 'error' にする
 */
export default function tailwind({
  cssConfigPath,
  whitelist = [],
  level = "warn",
  files = ["**/*.{ts,tsx,js,jsx}"],
}) {
  return [
    {
      files,
      plugins: { tailwindcss: tailwindPlugin },
      settings: { tailwindcss: { cssConfigPath } },
      rules: {
        "tailwindcss/no-arbitrary-value": level,
        "tailwindcss/no-custom-classname": [level, { whitelist }],
      },
    },
  ];
}
