# shivrajbakare.github.io

Personal portfolio of Shivraj Bakare: a single `index.html`, with no build step.

## Deploy

Upload both files to the root of the `shivrajbakare.github.io` repo:

- `index.html`
- `shivraj-bakare-resume.pdf`: the Résumé buttons link to this exact filename

GitHub Pages serves the new version within a minute or two.

## What's inside

- **Two themes:** warm *Night* (default) and paper *Day*. The toggle is in the nav and the choice is remembered.
- **Hero lattice:** the heat slider shifts the atoms' colour like real blackbody radiation. Past about 800 K the lattice starts to melt, and the cursor adds local heat.
- **Debug the Web:** the small *Play* pill next to the heat slider turns the hero lattice into a game. Steer a spider along the strands to squash software bugs (NaN, OOM, segfault, CORS…) before they chew through the web. The pill becomes *End* while playing, and Esc also quits.
- **Off the clock:** four live toys instead of static drawings:
  - a dancer with light trails (tap for the next move)
  - an acrylic canvas you can paint on
  - a real GLSL ray-marching shader (the pointer steers the light, and "view shader" shows the code)
  - a gravity sim where a tap launches satellites into orbit
- **Statement:** a large serif paragraph whose words light up as you scroll.
- **The road so far:** a horizontal timeline from 2017 to now. Vertical scroll drives it on desktop, and it swipes on phones.
- **The work, in numbers:** count-up figures from the projects.
- **Details:**
  - a cursor ring with context labels and magnetic buttons (desktop only)
  - section labels that decode as they appear
  - a spotlight hover on tiles
  - a reading-progress line
  - a tab-title easter egg and a console greeting
- **Projects:** each card has its own diagram and a GitHub link where the code is public.
- **Tech stack:** physics balls, colour-coded by category.
- **Defect Hunter:** a 40-second mini-game in the About section. Find vacancies, interstitials and substitutions in a crystal lattice before it heats up. Works with mouse, touch or keyboard (arrows + Enter), and keeps a best score on the device.
- **Accessibility:** respects `prefers-reduced-motion`.

No external scripts: only fonts come from Google Fonts.
