# Image replacement guide

All files are in `assets/images/`. Keep these filenames when replacing them to avoid changing code. Use lowercase words separated by hyphens for additional images.

| Filename                        | Used for                            | Suggested replacement                                                                                                                                                                                                                                         |
| ------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `arcko-logo-wordmark.png`       | Header, footer, organisation schema | Final wide Arcko wordmark; transparent PNG preferred                                                                                                                                                                                                          |
| `arcko-logo-icon.png`           | Browser favicon                     | Final square Arcko mark                                                                                                                                                                                                                                       |
| `arcko-students-showcase.jpg`   | Class gallery                       | Landscape class photo, ideally 1600 × 1200; keep faces away from edges                                                                                                                                                                                        |
| `arcko-class-drawing.jpg`       | Class gallery                       | Children drawing or developing ideas; portrait source works in both crops                                                                                                                                                                                     |
| `arcko-student-sketches.jpg`    | Class gallery                       | Child showing their sketches                                                                                                                                                                                                                                  |
| `arcko-class-making.jpg`        | Class gallery                       | Hands-on making with students and staff                                                                                                                                                                                                                       |
| `arcko-class-exploration.jpg`   | Class gallery                       | Child exploring materials or ideas                                                                                                                                                                                                                            |
| `arcko-class-collaboration.jpg` | Partners and class gallery          | Group learning or collaboration                                                                                                                                                                                                                               |
| `programme-3d-printing.jpg`     | 3D Printing card/dialog             | Your own 3D printing class; landscape preferred                                                                                                                                                                                                               |
| `programme-idea-to-design.jpg`  | Idea to Design card/dialog          | Your own sketching/design thinking activity                                                                                                                                                                                                                   |
| `programme-product-design.jpg`  | Product Design card/dialog          | Your own prototype or product design activity                                                                                                                                                                                                                 |
| `programme-tech-toy-design.jpg` | Tech Toy Design card/dialog         | Your own interactive toy or electronics activity                                                                                                                                                                                                              |
| `programme-chess.jpg`           | Chess card/dialog                   | Your own chess class                                                                                                                                                                                                                                          |
| `programme-craft-club.jpg`      | Craft Club card/dialog              | Your own craft class                                                                                                                                                                                                                                          |
| `arcko-mascot-sketch.png`       | Mascot development area             | Hero and mascot development area; replace with the final mascot when approved. The animated hero currently inverts the black-and-white sketch into white linework; remove its CSS invert/blend settings when replacing it with a coloured transparent mascot. |

Gallery cards use consistent crops; clicking a photo shows the full image. Test both the card crop and full-size image after replacing. Avoid baking text into photographs. Keep most JPGs below about 250–350 KB when practical, without losing useful detail.

## Optional social sharing image

No social sharing image is included. If you add one, use `assets/images/arcko-social-preview.jpg` (1200 × 630 is a useful working size), set `socialImage` to that relative path in `site-settings.json`, then run `node scripts/configure.mjs`. The script only adds image metadata if the file exists.

## Current asset provenance

Class-gallery images came from the academy's existing website at `https://www.arc-international-edu.com/images/`. The logo and mascot reference were supplied by the academy. Programme images are temporary stock photos, as stated in the site's footer:

- 3D Printing: https://www.pexels.com/photo/3d-printer-24251727/
- Idea to Design: https://www.pexels.com/photo/kids-drawing-on-paper-6990597/
- Product Design: https://www.pexels.com/photo/boy-and-girl-playing-with-cardboard-7799577/
- Tech Toy Design: https://www.pexels.com/photo/children-playing-with-toys-and-learning-electronics-7869043/
- Chess: https://www.pexels.com/photo/a-boy-in-a-blue-shirt-playing-chess-8465434/
- Craft Club: https://www.pexels.com/photo/children-doing-crafting-7869798/

Update the footer's stock-photo note once all programme images are your own.
