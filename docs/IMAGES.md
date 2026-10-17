# Replace website images

All image files are in `assets/images/`. Replace an image with the same filename and format, then update its alt text and captions in `index.html` and `site.js` where applicable.

| Filename                            | Use                                                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `arcko-logo-icon.png`               | Browser favicon.                                                                                                          |
| `arcko-logo-lockup.png`             | Logo artwork; CSS displays portions of the supplied 1500×1500 lockup. Preserve this layout or adjust `.logo-crop` styles. |
| `arcko-spark-wave.png`              | Transparent Spark mascot in hero, mobile welcome and journey.                                                             |
| `arcko-class-exploration.jpg`       | Programme illustration / class gallery; match content to the filename.                                                    |
| `arcko-students-showcase.jpg`       | Programme illustration / class gallery; match content to the filename.                                                    |
| `arcko-student-sketches.jpg`        | Programme illustration / class gallery; match content to the filename.                                                    |
| `arcko-class-drawing.jpg`           | Programme illustration / class gallery; match content to the filename.                                                    |
| `arcko-class-collaboration.jpg`     | Programme illustration / class gallery; match content to the filename.                                                    |
| `arcko-class-making.jpg`            | Programme illustration / class gallery; match content to the filename.                                                    |
| `programme-3d-printing.jpg`         | Programme illustration / class gallery; match content to the filename.                                                    |
| `programme-tech-toy-design.jpg`     | Programme illustration / class gallery; match content to the filename.                                                    |
| `programme-digital-arts.jpg`        | Programme illustration / class gallery; match content to the filename.                                                    |
| `programme-product-design.jpg`      | Programme illustration / class gallery; match content to the filename.                                                    |
| `programme-chess.jpg`               | Programme illustration / class gallery; match content to the filename.                                                    |
| `programme-craft-club.jpg`          | Programme illustration / class gallery; match content to the filename.                                                    |
| `creative-learning-placeholder.jpg` | Programme illustration / class gallery; match content to the filename.                                                    |

The Digital Arts main card is typographic; its detail dialog uses the temporary drawing illustration. Programme photos are illustrative stock placeholders. Class photographs were sourced from Arcko’s previous website. Replace stock photographs with your own when ready and update the footer notice.

Gallery images use consistent crops and open full-size when tapped. Preview both crops after replacement. Keep photographs compressed, ideally under 350 KB when suitable, and retain image dimensions to reduce layout movement.

## Optional social preview

Add `assets/images/arcko-social-preview.jpg`, set `socialImage` in `site-settings.json` to that path, then run `node scripts/configure.mjs`. Suggested size: 1200×630. No social preview image is included yet.
