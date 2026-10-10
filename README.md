# eslint-config

Shared ESLint rules for `piro0919` repositories. Biome のリポジトリは [biome-config](https://github.com/piro0919/biome-config) を使う。

数字や Tailwind の値をその場で書くと、同じ寸法や長さがあちこちで少しずつずれていく。値には名前を付けて1か所に置き、
名前を通さずに書いたら lint で落とす。

## Usage

```bash
pnpm add -D github:piro0919/eslint-config#v1.1.0
```

```js
// eslint.config.mjs
import magicNumbers from "@piro0919/eslint-config";
import tailwind from "@piro0919/eslint-config/tailwind";

export default defineConfig([
  ...nextVitals,
  ...nextTs, // @typescript-eslint のプラグインを読み込む設定の後に置く
  ...magicNumbers(),
  ...tailwind({ cssConfigPath: "src/app/globals.css" }), // Tailwind を使うリポジトリだけ
]);
```

最初は警告（`warn`）で入れる。警告を直し終えたら `{ level: 'error' }` にして、落とす形に切り替える。

## What it does

- `magicNumbers()` — 名前の無い数字を落とす（`@typescript-eslint/no-magic-numbers`）。0・1・2・-1、単位の換算、HTTP の状態は数字のまま書いてよい。テストのファイル（`*.test.*`・`test/` など）は対象の外（期待値に名前を付けると読みにくくなるため）。`ignores` で番号の表などのファイルを外し、`allow` で値を足す
- `tailwind({ cssConfigPath })` — `[...]` に値をじかに書くのを落とす（`no-arbitrary-value`）。決まりに無いクラス名も落とす（`no-custom-classname`。自前の CSS のクラスは `whitelist` に足す）

## Release

タグ（`v1.0.0` など）を打って push する。使う側は Renovate がタグの更新を PR で出す。
