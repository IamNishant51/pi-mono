/**
 * Nami default pink theme
 *
 * All theme objects are ready to pass directly to the corresponding TUI
 * components (Markdown, Editor, SelectList, SettingsList, Image, Loader).
 */

import chalk from "chalk";
import type { EditorTheme } from "./components/editor.js";
import type { ImageTheme } from "./components/image.js";
import type { MarkdownTheme } from "./components/markdown.js";
import type { SelectListTheme } from "./components/select-list.js";
import type { SettingsListTheme } from "./components/settings-list.js";

// ---------------------------------------------------------------------------
// Palette – hot pink / rose tones
// ---------------------------------------------------------------------------

/** Primary accent: hot pink */
const pink = (s: string) => chalk.hex("#FF69B4")(s);
/** Lighter pink for subtle accents */
const lightPink = (s: string) => chalk.hex("#FFB6C1")(s);
/** Deep magenta for headings */
const deepPink = (s: string) => chalk.hex("#FF1493")(s);
/** Rose for borders and dividers */
const rose = (s: string) => chalk.hex("#FF007F")(s);
/** Dim muted rose for secondary text */
const mutedRose = (s: string) => chalk.hex("#C06080").dim(s);
/** White-ish for default body text (keeps readability) */
const body = (s: string) => chalk.white(s);

// ---------------------------------------------------------------------------
// Markdown theme
// ---------------------------------------------------------------------------

export const namiMarkdownTheme: MarkdownTheme = {
	heading: (s) => deepPink(chalk.bold(s)),
	link: (s) => pink(chalk.underline(s)),
	linkUrl: (s) => mutedRose(s),
	code: (s) => lightPink(s),
	codeBlock: (s) => body(s),
	codeBlockBorder: (s) => rose(s),
	quote: (s) => lightPink(s),
	quoteBorder: (s) => pink(s),
	hr: (s) => rose(s),
	listBullet: (s) => pink(s),
	bold: (s) => chalk.bold(s),
	italic: (s) => chalk.italic(s),
	strikethrough: (s) => chalk.strikethrough(s),
	underline: (s) => chalk.underline(s),
	codeBlockIndent: "  ",
};

// ---------------------------------------------------------------------------
// SelectList theme
// ---------------------------------------------------------------------------

export const namiSelectListTheme: SelectListTheme = {
	selectedPrefix: (s) => pink(s),
	selectedText: (s) => chalk.bold(pink(s)),
	description: (s) => mutedRose(s),
	scrollInfo: (s) => mutedRose(s),
	noMatch: (s) => mutedRose(s),
};

// ---------------------------------------------------------------------------
// Editor theme
// ---------------------------------------------------------------------------

export const namiEditorTheme: EditorTheme = {
	borderColor: rose,
	selectList: namiSelectListTheme,
};

// ---------------------------------------------------------------------------
// SettingsList theme
// ---------------------------------------------------------------------------

export const namiSettingsListTheme: SettingsListTheme = {
	cursor: pink("❯ "),
	label: (s, selected) => (selected ? chalk.bold(pink(s)) : body(s)),
	value: (s, selected) => (selected ? chalk.bold(lightPink(s)) : lightPink(s)),
	description: (s) => mutedRose(s),
	hint: (s) => mutedRose(s),
};

// ---------------------------------------------------------------------------
// Image theme
// ---------------------------------------------------------------------------

export const namiImageTheme: ImageTheme = {
	fallbackColor: mutedRose,
};

// ---------------------------------------------------------------------------
// Loader spinner / message color functions
// ---------------------------------------------------------------------------

/** Spinner color function for use with `new Loader(...)` */
export const namiSpinnerColor = pink;
/** Message color function for use with `new Loader(...)` */
export const namiMessageColor = lightPink;
