# nami-tui

Nami TUI is a pink-themed Terminal User Interface library with differential rendering, forked from [pi-tui](../tui). Same engine, same API — just styled in pink because Nami is a girl.

## Features

- Differential rendering — only changed lines are redrawn, minimising flicker
- Hardware-cursor positioning for IME support
- Kitty keyboard protocol support (disambiguated escape codes, key-release events)
- Bracketed paste handling with large-paste markers
- Overlay / modal system with anchor-based positioning
- Built-in components: Editor, Markdown, SelectList, SettingsList, Loader, Image, …
- **Pink default theme** — `namiMarkdownTheme`, `namiEditorTheme`, `namiSelectListTheme`, and more, all ready to drop in

## Pink theme palette

| Role | Color | Hex |
|------|-------|-----|
| Headings | Deep pink | `#FF1493` |
| Borders / dividers | Rose | `#FF007F` |
| Selection / bullets / links | Hot pink | `#FF69B4` |
| Inline code / quotes | Light pink | `#FFB6C1` |
| Dim / secondary text | Muted rose | `#C06080` |

## Quick start

```bash
# From the repo root
npm install
cd packages/nami
npm run build
```

## Usage

```typescript
import { ProcessTerminal, TUI, Editor, Markdown } from "nami-tui";
import {
  namiEditorTheme,
  namiMarkdownTheme,
  namiSelectListTheme,
  namiSettingsListTheme,
  namiImageTheme,
  namiSpinnerColor,
  namiMessageColor,
} from "nami-tui";

const terminal = new ProcessTerminal();
const tui = new TUI(terminal);

// Pink editor with autocomplete
const editor = new Editor(tui, namiEditorTheme);
editor.onSubmit = (text) => {
  // handle submitted text
};
tui.addChild(editor);

// Pink markdown renderer
const md = new Markdown("**Hello Nami!**", 1, 0, namiMarkdownTheme);
tui.addChild(md);

// Pink spinner
const loader = new Loader(namiSpinnerColor, namiMessageColor, "Loading…");
tui.addChild(loader);

tui.start(terminal);
```

## How to test Nami

### 1. Install dependencies (repo root)

```bash
cd /path/to/pi-mono
npm install
```

### 2. Build the nami package

```bash
cd packages/nami
npm run build
```

This compiles TypeScript to `packages/nami/dist/`.

### 3. Run the unit tests

```bash
# From packages/nami
node --test --import tsx test/tui-render.test.ts
node --test --import tsx test/editor.test.ts
node --test --import tsx test/markdown.test.ts
node --test --import tsx test/keys.test.ts

# Or run the full suite at once:
npm test
```

### 4. Run an interactive demo

Create a quick demo script at `/tmp/nami-demo.mjs`:

```js
import { ProcessTerminal, TUI, Markdown, Text } from "./packages/nami/dist/index.js";
import { namiMarkdownTheme } from "./packages/nami/dist/index.js";

const terminal = new ProcessTerminal();
const tui = new TUI(terminal);

tui.addChild(new Markdown(
  "# Nami\n\nHello from the **pink TUI**! Press Ctrl+C to exit.",
  1, 0, namiMarkdownTheme
));

terminal.start(
  (data) => { if (data === "\x03") { terminal.stop(); process.exit(0); } },
  () => tui.requestRender()
);
tui.requestRender();
```

```bash
node /tmp/nami-demo.mjs
```

### 5. Verify the pink theme renders

Run the loader demo to see the hot-pink spinner:

```bash
node -e "
import('./packages/nami/dist/index.js').then(({ ProcessTerminal, TUI, Loader, namiSpinnerColor, namiMessageColor }) => {
  const t = new ProcessTerminal();
  const tui = new TUI(t);
  const loader = new Loader(namiSpinnerColor, namiMessageColor, 'Nami is loading...');
  tui.addChild(loader);
  loader.start(tui);
  t.start(() => {}, () => tui.requestRender());
  setTimeout(() => { loader.stop(); t.stop(); process.exit(0); }, 3000);
});
" --input-type=module
```

## Environment variables

| Variable | Fallback | Description |
|---|---|---|
| `NAMI_HARDWARE_CURSOR` | `PI_HARDWARE_CURSOR` | Set to `1` to enable hardware cursor |
| `NAMI_CLEAR_ON_SHRINK` | `PI_CLEAR_ON_SHRINK` | Set to `1` to clear rows when content shrinks |
| `NAMI_DEBUG_REDRAW` | `PI_DEBUG_REDRAW` | Set to `1` to log redraws to `~/.nami/agent/nami-debug.log` |
| `NAMI_TUI_DEBUG` | `PI_TUI_DEBUG` | Set to `1` to write render snapshots to `/tmp/tui/` |
| `NAMI_TUI_WRITE_LOG` | `PI_TUI_WRITE_LOG` | Path or directory for raw terminal-write log |

## Differences from pi-tui

| | pi-tui | nami-tui |
|---|---|---|
| Package name | `@mariozechner/pi-tui` | `nami-tui` |
| Cursor marker | `\x1b_pi:c\x07` | `\x1b_nami:c\x07` |
| Log directory | `~/.pi/agent/` | `~/.nami/agent/` |
| Env prefix | `PI_*` | `NAMI_*` (falls back to `PI_*`) |
| Default theme | (none shipped) | Pink — `namiMarkdownTheme`, `namiEditorTheme`, … |

## License

MIT
