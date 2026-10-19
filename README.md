# Yu Wang — Academic Homepage

Personal academic homepage of Yu Wang, a Ph.D. student at Hefei University of Technology.

## Website

GitHub Pages address after deployment: https://wangyu0627.github.io/

This is a static HTML, CSS and JavaScript website. No build step or external dependencies are required.

## Publish with GitHub Pages

Create a public repository named `wangyu0627.github.io` under the `wangyu0627` account, and upload the contents of this folder to its `main` branch. The `index.html` file must be at the repository root.

Upload all website files, including the hidden `.github/` folder, `scripts/`, `tests/`, and `scholar-stats.js`.

In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**. The included workflow publishes on pushes to `main`, on a daily schedule, and when run manually from **Actions → Update Scholar statistics and deploy Pages → Run workflow**.

See the [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart).

## Update content

- Biography, education, honors, service, and advisor links: `index.html`.
- Publication metadata: `publications.js`.
- Layout and responsive styles: `styles.css`.
- Publication rendering and filtering: `app.js`.
- Portrait and favicon: `assets/`.
- Cached Google Scholar citations and h-index: `scholar-stats.js` (updated automatically).

## Google Scholar statistics

The workflow requests the public profile `3ZhIpB0AAAAJ` daily at 09:23 China time (01:23 UTC), reads the all-time citations and h-index, saves the successful snapshot, and deploys the site. Scheduled runs may be delayed by GitHub. The page shows the last successful update date. `Works` counts entries in `publications.js`, not Google Scholar records.

If Scholar returns a CAPTCHA, rate limit, network error, or unexpected HTML, the workflow keeps and publishes the previous snapshot without changing its date. No API key is required. Google Scholar may restrict automated requests, so daily freshness is not guaranteed.

The workflow needs permission to write the snapshot to the repository. If your repository policy blocks it, allow **Read and write permissions** under **Settings → Actions → General → Workflow permissions**. Branch protection rules may also block the bot's commit. GitHub can disable scheduled workflows in inactive public repositories after 60 days; re-enable the workflow in Actions if this happens.

Local checks with Node.js 22 or newer:

```sh
node --test tests/scholar-stats.test.mjs
node scripts/update-scholar-stats.mjs
```

The update command requires network access to Google Scholar. Refresh `index.html` afterward to see the cached values; no local web server is required.

For duplicate author names, set `selfAuthorIndex` in a publication to your zero-based author position (`1` means second author). This highlights only your name. `second: true` records second authorship; only papers also marked `advisorFirst: true` enter the advisor-led group.

The first publication group includes personal first-authored work and work where an advisor is first author and Yu Wang is second author. All other work is listed in the co-authored group. Both groups preserve publication years.
