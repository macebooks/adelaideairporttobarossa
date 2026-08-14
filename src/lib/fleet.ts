/* ---------------------------------------------------------------------------
   Single source of truth for the operator's fares, vehicles and the ground the
   flat fare covers.

   This lived in the homepage frontmatter until five things needed it: the fare
   cards, the estimator, the Offer schema, the journey-logistics page and the
   township pages. Every copy of "$200" or "70 km" outside this file is a future
   contradiction — the Seppeltsfield one below started exactly that way.

   Fares are per car, each way, for the central townships. Supplied by the
   operator; do not adjust them to match a page.
--------------------------------------------------------------------------- */

export interface Vehicle {
  id: string;
  tier: string;
  vehicle: string;
  seats: number;
  was: number;
  now: number;
  featured: boolean;
  points: string[];
}

export const fleet: Vehicle[] = [
  {
    id: 'sedan',
    tier: 'Sedan',
    vehicle: 'Toyota Camry Hybrid or Corolla',
    seats: 4,
    was: 245,
    now: 200,
    featured: true,
    points: [
      'Up to 4 passengers plus luggage',
      'Met in the arrivals hall, flight tracked',
      'White and discreet, minimal markings',
    ],
  },
  {
    id: 'tarago',
    tier: 'People mover',
    vehicle: 'Toyota Tarago',
    seats: 7,
    was: 275,
    now: 230,
    featured: false,
    points: [
      'Up to 7 passengers plus luggage',
      'Room for the group and the wine cases',
      'White and discreet, minimal markings',
    ],
  },
  {
    id: 'hiace',
    tier: 'Commuter bus',
    vehicle: 'Toyota HiAce Commuter',
    seats: 13,
    was: 300,
    now: 250,
    featured: false,
    points: [
      'Up to 13 passengers plus luggage',
      'Weddings, corporate groups, wine tours',
      'Buses do carry more markings than the cars',
    ],
  },
];

// The townships the flat fare covers. Anything outside these may be quoted higher.
export const centralTowns = ['Tanunda', 'Lyndoch', 'Nuriootpa', 'Greenock', 'Angaston'];

/* Approximate driving distances and times from the ADL terminal.
   NOTE: Seppeltsfield is quoted here and in the schema's `areaServed` at the standard
   fare, but it is NOT in `centralTowns` above, because the operator's covered list does
   not include it. That is open item L13 and it is a live contradiction, not a typo.
   Resolve it in one place: either add Seppeltsfield to `centralTowns` or price it
   separately here. Do not paper over it on a page. */
export interface Destination {
  name: string;
  km: number;
  min: number;
}

export const destinations: Record<string, Destination> = {
  tanunda: { name: 'Tanunda', km: 70, min: 60 },
  nuriootpa: { name: 'Nuriootpa', km: 76, min: 65 },
  angaston: { name: 'Angaston', km: 80, min: 70 },
  greenock: { name: 'Greenock', km: 78, min: 65 },
  seppeltsfield: { name: 'Seppeltsfield', km: 74, min: 65 },
  lyndoch: { name: 'Lyndoch', km: 58, min: 50 },
};

/* Handed to the estimator script via define:vars, so the rate the estimator quotes is
   literally the rate on the card above it. `size` is the capacity order used to
   auto-upgrade the vehicle when a bigger party is chosen. */
export const estCars = Object.fromEntries(
  fleet.map((f, i) => [f.id, { fare: f.now, seats: f.seats, size: i + 1 }])
);
