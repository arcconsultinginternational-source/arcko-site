# SEO and marketing setup

## Before launch

1. Confirm the real production domain in `site-settings.json`, then run `node scripts/configure.mjs`. Canonical, Open Graph URL, organisation schema, robots.txt and sitemap must point to the same domain.
2. Publish over HTTPS with public access. Private previews cannot be indexed by Google.
3. Verify the domain in Google Search Console. For HTML verification, paste only the verification token into `searchConsoleVerification`, then regenerate. Submit `/sitemap.xml` and inspect the homepage URL.
4. If needed, set `metaDomainVerification` to the Meta verification token and regenerate.
5. Add your own social preview image using the instructions in `IMAGES.md`.
6. When replacing the old site, preserve its useful programme/article URLs or implement permanent redirects at your host. This export contains one homepage, not the old site's separate pages. A redirect map depends on the final page structure.

The page uses natural references to creative classes, design thinking and 3D printing in Bangkok. No keyword-stuffing meta tag, invented reviews, ratings, street address or unsupported course schema is included. The visible FAQ is retained; FAQ rich-result eligibility is not assumed.

## Optional Google Tag Manager

`marketing.js` prepares event hooks but does not automatically load GTM. Set your own `GTM-...` ID in `site-settings.json` and regenerate first.

Configure consent defaults/updates and tag-specific consent checks in your GTM container/CMP. Have that integration call `window.ArckoMarketing.start()` only when loading the container is appropriate. It is safe to call more than once; the loader runs only once per page.

`window.ArckoMarketing.stopEvents()` stops this site's custom interaction events only. It does not unload third-party scripts or revoke their cookies; your CMP must update those tags' consent state. There is no consent banner or persistent consent storage bundled into this design.

Add GA4, Google Ads and Meta Pixel through your own container as needed. Do not add duplicate standalone tags. No external measurement happens until a real container is configured and started.

## Events ready for your container

Create Custom Event triggers and map these values to your GA4/advertising tags:

| Event                  | Parameters                                        | Meaning                                                 |
| ---------------------- | ------------------------------------------------- | ------------------------------------------------------- |
| `contact_click`        | `contact_method`: email, phone, line or instagram | A visitor clicked a contact action                      |
| `contact_options_view` | `contact_method`: line_unavailable                | LINE is not configured; fallback contact options opened |
| `programme_view`       | `programme_name`                                  | Programme details were opened                           |
| `programme_filter`     | `category`                                        | Programme category filter selected                      |

Contact clicks are enquiries of interest, not completed registrations or confirmed leads. Only record a confirmed enrolment from an actual registration/payment confirmation workflow. No form values, child names, email addresses or phone numbers are included in these event payloads. GTM tags can collect other data, so configure them separately and inspect the result.

Check events in GTM Preview/Tag Assistant and GA4 DebugView before spending on campaigns. The supplied LINE and Instagram URLs are already connected.

## Campaign links

Example using the current production domain:

`https://www.arc-international-edu.com/?utm_source=instagram&utm_medium=paid_social&utm_campaign=idea_to_design&utm_content=parent_video`

Use consistent names. Analytics can read these query parameters after your measurement setup is enabled. The source does not store UTMs or forward them into LINE automatically. Do not put personal information in campaign URLs.

## Search and social validation

After public deployment:

- Confirm a successful homepage response and correct canonical domain.
- Inspect Google Search Console URL indexing and sitemap status.
- Test structured data with Google's Rich Results Test; valid organisation data does not guarantee a rich result.
- Check the page in Facebook Sharing Debugger after adding the social image.
- Run PageSpeed Insights on the live mobile and desktop site.

References:

- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/tag-platform/tag-manager/datalayer
