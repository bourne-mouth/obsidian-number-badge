# File Number Badge

An Obsidian plugin that turns leading digits in note names into a compact badge,
so names stay clean without losing the sorting trick.

`00 System` → `System` + badge `00`

![demo](demo.gif)

## Why

Many people prefix notes with numbers (`00`, `01`, ...) to force a custom order
in the file explorer. This plugin keeps that order but hides the digits from the
displayed name, showing them as a badge on the right — similar to the built-in
`BASE` tag.

## Features

- Leading numbers (1–3 digits followed by a space) move out of the displayed name
  into a badge.
- Sorting still uses real file names — nothing is renamed on disk.
- Works in the file explorer only.
- Disabling the plugin restores the original names.

## Installation

Manual installation:

1. Open the [latest release](../../releases/latest) and download
   `main.js`, `manifest.json` and `styles.css`.

   ⚠️ Do **not** use the green **Code → Download ZIP** button — that
   downloads the whole repository, which will not work as a plugin.

2. Create the folder `<your-vault>/.obsidian/plugins/num-badge/`.
3. Put the three files inside.
4. Reload Obsidian, enable **Number Badge** in
   Settings → Community plugins (turn off Restricted mode if asked).

## Limitations

- The plugin adjusts the file explorer DOM directly. A major Obsidian update
  may break it.
- Only the file explorer is affected. Tab titles and note content keep the
  original names.
- Files are never modified or renamed.

## Credits

Written with assistance from [Claude](https://claude.ai) (Anthropic).

## License

MIT
