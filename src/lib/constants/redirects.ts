/**
 * Legacy URL redirect map — feeds `src/middleware.ts`. Every entry is a 301
 * (permanent) redirect so Google transfers link equity to the new URL.
 *
 * Parameterised legacy URLs (infrastructure.php?InfraId=N, etc.) are handled
 * in middleware by reading the query string and looking up the map.
 */

/** Static 1:1 redirects — legacy path -> new path. */
export const staticRedirects: Record<string, string> = {
  "/index.php": "/",
  "/aboutus.php": "/about",
  "/directormessage.php": "/about/director-message",
  "/principalmessage.php": "/about/principal-message",
  "/mission.php": "/about/mission",
  "/visionmission.php": "/about/vision",
  "/schoolmoto.php": "/about/motto",
  "/schoolsong.php": "/about/curriculum",
  "/cocurricularactivities.php": "/activities",
  "/photogallery.php": "/gallery",
  "/downloads.php": "/downloads",
  "/schoolinfo.php": "/school-info",
  "/enquiry.php": "/enquiry",
  "/contactus.php": "/contact",
  "/payfee.php": "/pay-fees",
  "/hwclass.php": "/academics/homework",
  "/verify-tc.php": "/verify-tc",
};

/** infrastructure.php?InfraId=N -> /facilities/<slug>. */
export const infrastructureSlugByInfraId: Record<string, string> = {
  "1": "library",
  "2": "labs",
  "3": "dance-room",
  "4": "music-room",
  "5": "activity-room",
  "6": "canteen",
  "9": "art-room",
  "12": "swimming-pool",
  "13": "playground",
};

/** homeworklist.php?DCatId=N -> /academics/homework/<slug>.
 *  Kept in sync with src/lib/constants/classes.ts. */
export const homeworkSlugByDCatId: Record<string, string> = {
  "1": "class-1",
  "2": "class-2",
  "3": "class-3",
  "4": "class-4",
  "5": "class-5",
  "6": "class-6",
  "7": "class-7",
  "8": "class-8",
  "9": "class-9",
  "10": "class-10",
  "11": "class-11",
  "12": "class-12",
  "13": "nursery",
  "14": "lkg",
  "15": "ukg",
};

/** gallery.php?GalleryCatId=N -> /gallery/<slug>.
 *  The slugs here must line up with src/content/scraped/gallery.ts. They are
 *  picked off during middleware execution. */
export const gallerySlugByGalleryCatId: Record<string, string> = {
  "1": "functions",
  "2": "image-gallery",
  "3": "news",
  "4": "results",
  "5": "toppers",
  // TODO: fill remaining IDs once gallery category slugs are finalised.
};
