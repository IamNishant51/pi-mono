# nami-tui

Nami TUI is a pink-themed Terminal User Interface library with differential rendering, forked from [pi-tui](../tui).

## Features

- Differential rendering – only changed lines are redrawn, minimising flicker
- Hardware-cursor positioning for IME support
- Kitty keyboard protocol support (disambiguated escape codes, key-release events)
- Bracketed paste handling with large-paste markers
- Overlay / modal system with anchor-based positioning
- Built-in components: Editor, Markdown, SelectList, SettingsList, Loader, Image, …
- **Pink default theme** (`namiMarkdownTheme`, `namiEditorTheme`, `namiSelectListTheme`, …)

## Usage

```typescript
import { ProcessTerminal, TUI, Editor, Markdown } from "nami-tui";
import {
  namiEditorTheme,
  namiMarkdownTheme,
  namiSpinnerColor,
  namiMessageColor,
} from "nami-tui";

const terminal = new ProcessTerminal();
const tui = new TUI(terminal);

const editor = new Editor(tui, namiEditorTheme);
editor.onSubmit = (text) => { /* handle input */ };
tui.addChild(editor);

tui.start(terminal);
```

## Environment variables

| Variable | Fallback | Description |
|---|---|---|
| `NAMI_HARDWARE_CURSOR` | `PI_HARDWARE_CURSOR` | Set to `1` to enable hardware cursor |
| `NAMI_CLEAR_ON_SHRINK` | `PI_CLEAR_ON_SHRINK` | Set to `1` to clear rows when content shrinks |
| `NAMI_DEBUG_REDRAW` | `PI_DEBUG_REDRAW` | Set to `1` to log redraws to `~/.nami/agent/nami-debug.log` |
| `NAMI_TUI_DEBUG` | `PI_TUI_DEBUG` | Set to `1` to write render snapshots to `/tmp/tui/` |
| `NAMI_TUI_WRITE_LOG` | `PI_TUI_WRITE_LOG` | Path or directory for raw terminal-write log |

## License

MIT
