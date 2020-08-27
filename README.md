# CSS Audit Reports

## Instructions

1. Clone the repository.
2. Run `npm install` or `yarn`.
3. Checkout to `feature/premier-league` branch.
4. Edit `script/sites.json` and add every site information.
5. Run the script `node script/index.js`.
6. Open and copy the content of the generated CSS file (`reports/:category:/:year:/:month:/:title:/style.css`), where :category:, :year:, :month:, and :title: match data stored in `script/sites.json` file for each site.
7. Go to [Specificity Graph Generator](https://jonassebastianohlsson.com/specificity-graph/).
8. Paste the content.
9. Run the tool.
10. Make a screenshot. Example file: `reports/premier-league/2020/09/afc-bournemouth/specificity1.png`.
11. Go to [Specificity visualized site](https://isellsoap.github.io/specificity-visualizer/).
12. Paste the content.
13. Run the tool.
14. Make two separate screenshots. Example files: `reports/premier-league/2020/09/afc-bournemouth/specificity2a.png`, `reports/premier-league/2020/09/afc-bournemouth/specificity2b.png`.
15. Open the site in the Incognito mode.
16. Open DevTools.
17. Go to Coverage tab (open command palette by pressing `CMD + Shift + p` and type `Coverage`).
18. Filter CSS files.
19. Make a screenshot. Example file: `reports/premier-league/2020/09/afc-bournemouth/coverage.png`.
20. Go to CSS Overivew tab (open command palette by pressing `CMD + Shift + p` and type `CSS Overview`). Note that you should enable the
21. Make 5 screenshots. Example files: `reports/premier-league/2020/09/afc-bournemouth/css-overview-summary.png`, `reports/premier-league/2020/09/afc-bournemouth/css-overview-colors.png`, `reports/premier-league/2020/09/afc-bournemouth/css-overview-fonts.png`, `reports/premier-league/2020/09/afc-bournemouth/css-overview-media-queries.png` and `reports/premier-league/2020/09/afc-bournemouth/css-overview-unused-declarations.png`.
22. Open the terminal.
23. Install Wallace CLI globally `npm install -g wallace-cli` ([see GitHub repository](https://github.com/bartveneman/wallace-cli)).
24. Run `wallace :url:`, where :url: match data stored in `script/sites.json` file for each site.
25. Make screenshot. Example file: `reports/premier-league/2020/09/afc-bournemouth/wallace.png`.


