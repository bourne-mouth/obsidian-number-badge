'use strict';

const { Plugin } = require('obsidian');

// "00 System" -> ["00", "System"]
const PREFIX_RE = /^(\d{1,3})\s+(.+)$/;

module.exports = class NumberBadgePlugin extends Plugin {
  onload() {
    this._timer = null;

    this._observer = new MutationObserver(() => this._schedule());
    this._observer.observe(document.body, { childList: true, subtree: true });

    this.registerEvent(this.app.workspace.on('layout-change', () => this._schedule()));
    this.registerEvent(this.app.workspace.on('file-open', () => this._schedule()));

    this.app.workspace.onLayoutReady(() => this._apply());
  }

  onunload() {
    if (this._observer) this._observer.disconnect();
    if (this._timer) clearTimeout(this._timer);

    document.querySelectorAll('.nav-file-title').forEach((title) => {
      const badge = title.querySelector('.nb-num-badge');
      if (badge) badge.remove();

      const content = title.querySelector('.nav-file-title-content');
      if (content && title.dataset.nbOrig) content.textContent = title.dataset.nbOrig;

      delete title.dataset.nbOrig;
      delete title.dataset.nbRest;
      delete title.dataset.nbApplied;
      delete title.dataset.nbPath;
    });
  }

  _schedule() {
    if (this._timer) clearTimeout(this._timer);
    this._timer = setTimeout(() => this._apply(), 80);
  }

  _apply() {
    document.querySelectorAll('.nav-file-title').forEach((title) => {
      const content = title.querySelector('.nav-file-title-content');
      if (!content) return;

      const current = content.textContent || '';
      const path = title.dataset.path || '';

      // Already processed — check whether the file was renamed.
      if (title.dataset.nbApplied === '1') {
        const sameName = current === title.dataset.nbRest;
        const samePath = path === title.dataset.nbPath;
        if (sameName && samePath) return;

        const old = title.querySelector('.nb-num-badge');
        if (old) old.remove();

        delete title.dataset.nbApplied;
        delete title.dataset.nbRest;
        delete title.dataset.nbOrig;
        delete title.dataset.nbPath;
      }

      const match = current.match(PREFIX_RE);
      if (!match) return;

      title.dataset.nbOrig = current;
      content.textContent = match[2];

      const badge = document.createElement('div');
      badge.className = 'nav-file-tag nb-num-badge';
      badge.textContent = match[1];
      title.appendChild(badge);

      title.dataset.nbApplied = '1';
      title.dataset.nbRest = match[2];
      title.dataset.nbPath = path;
    });
  }
};
