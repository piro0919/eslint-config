/**
 * 名前の無い数字を落とす（@typescript-eslint/no-magic-numbers）。
 * 同じ値をあちこちに書き写すと、少しずつずれていく。数字には名前を付けて1か所に置く。
 *
 * 数字のまま書いてよいのは、0・1・2・-1、単位の換算（100・1000・60・24・255・360）、HTTP の状態だけ。
 * @typescript-eslint のプラグインは使う側で読み込んでおく（eslint-config-next/typescript や typescript-eslint の設定が読み込む）
 *
 * @param {{ level?: 'warn' | 'error', files?: string[], ignores?: string[], allow?: number[] }} [options]
 *   level: 最初は 'warn' で入れ、直し終えたら 'error' にする。
 *   ignores: 番号の表など、数字そのものが中身のファイル。
 *   allow: そのプロジェクトで数字のまま書いてよい値を足す
 */
export default function magicNumbers({
  level = "warn",
  files = ["**/*.{ts,tsx}"],
  ignores = [],
  allow = [],
} = {}) {
  return [
    {
      files,
      ignores,
      rules: {
        "no-magic-numbers": "off",
        "@typescript-eslint/no-magic-numbers": [
          level,
          {
            ignore: [
              -1,
              0,
              1,
              2,
              100,
              1000,
              60,
              24,
              255,
              360,
              200,
              204,
              400,
              401,
              403,
              404,
              ...allow,
            ],
            ignoreArrayIndexes: true,
            ignoreDefaultValues: true,
            ignoreEnums: true,
            ignoreNumericLiteralTypes: true,
            ignoreReadonlyClassProperties: true,
            ignoreTypeIndexes: true,
            ignoreClassFieldInitialValues: true,
            detectObjects: false,
          },
        ],
      },
    },
  ];
}
