/**
 * Class taxonomy — used by the Homework / Study Material pages.
 *
 * `legacyDCatId` preserves the legacy site's `DCatId` so we can map redirects
 * from `/homeworklist.php?DCatId=N` to the new clean URLs. The legacy map:
 *   DCatId 1..12 -> Class 1..12
 *   DCatId 13    -> Nursery
 *   DCatId 14    -> LKG
 *   DCatId 15    -> UKG
 */

export interface ClassDef {
  slug: string;
  name: string;
  order: number;
  /** Legacy `DCatId` from the PHP site, for URL redirects. */
  legacyDCatId: number;
}

export const classes: ClassDef[] = [
  { slug: "nursery", name: "Nursery", order: 1, legacyDCatId: 13 },
  { slug: "lkg", name: "LKG", order: 2, legacyDCatId: 14 },
  { slug: "ukg", name: "UKG", order: 3, legacyDCatId: 15 },
  { slug: "class-1", name: "Class I", order: 4, legacyDCatId: 1 },
  { slug: "class-2", name: "Class II", order: 5, legacyDCatId: 2 },
  { slug: "class-3", name: "Class III", order: 6, legacyDCatId: 3 },
  { slug: "class-4", name: "Class IV", order: 7, legacyDCatId: 4 },
  { slug: "class-5", name: "Class V", order: 8, legacyDCatId: 5 },
  { slug: "class-6", name: "Class VI", order: 9, legacyDCatId: 6 },
  { slug: "class-7", name: "Class VII", order: 10, legacyDCatId: 7 },
  { slug: "class-8", name: "Class VIII", order: 11, legacyDCatId: 8 },
  { slug: "class-9", name: "Class IX", order: 12, legacyDCatId: 9 },
  { slug: "class-10", name: "Class X", order: 13, legacyDCatId: 10 },
  { slug: "class-11", name: "Class XI", order: 14, legacyDCatId: 11 },
  { slug: "class-12", name: "Class XII", order: 15, legacyDCatId: 12 },
];

export const classBySlug = new Map(classes.map((c) => [c.slug, c] as const));
export const classByDCatId = new Map(classes.map((c) => [c.legacyDCatId, c] as const));
