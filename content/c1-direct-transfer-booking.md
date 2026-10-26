# SDEP Output — Cluster C1: Direct Transfer Booking Intent

Target URL: **`/` (the existing homepage).**
Status: **optimization spec, not a new page.** New and revised copy blocks are drafted below and
mapped to the sections already live in `src/pages/index.astro`.

---

## ⚠️ The one structural correction, before anything else

**Do not build `/adelaide-airport-barossa-valley-transfer/`. C1 is already the homepage.**

The brief correctly flags HIGH cannibalization risk *inside* the cluster, then misses the larger
one: `/` already holds the entire C1 asset. It carries the exact title tag
(`Adelaide Airport to Barossa Valley Transfers | Private Car ADL to the Barossa`), the fare cards,
the live estimator, the booking form, the `TravelAgency` schema with a populated `hasOfferCatalog`,
the `FAQPage` schema, and every internal link and external signal the site has.

A second URL on the head term would split that in half and hand the win to whichever aggregator is
currently holding the snippet. It is also the one page whose canonical is already self-referencing
and already in the sitemap.

**The correct move is to upgrade `/`, which is what this document specifies.** A separate URL
would only make sense if the homepage were brand-led and not transactional. It is neither.

**C5 (group transfers) remains a genuinely separate page.** That cluster has its own intent, its
own vehicles, its own lead times and a quote-based price model. C1 is the head; C5 is a spoke.

---

## 1. The Semantic Strategy Card

**Target Query:** `Adelaide Airport to Barossa Valley transfer`

**Primary Intent:** TRANSACTIONAL, decision stage. The searcher has already decided they are not
driving themselves. They are choosing an operator.

**The Hidden Question:** *"I land tired, in a city I do not know, an hour from where I am sleeping.
Will someone actually be there, and will the price be the price?"*

The C1 searcher is not comparing features. They are pricing **risk**: the risk of standing in an
arrivals hall with no driver, and the risk of a meter running for an hour up the Sturt Highway.
Every competitor sells comfort. The winning page sells **certainty**, and proves it with a number
agreed in advance.

**Information Gain Angle (two locked frameworks):**

1. **The break-even seat count.** The `shared shuttle` child keywords are price-motivated: the
   searcher assumes private costs more per head. **At one or two passengers they are right. From
   four, a private car at $50 a head beats most shared seats and skips the wait for the van to
   fill.** Publishing that arithmetic, including the part where the shared option wins, converts
   the query and buys credibility for everything else on the page. No competitor publishes it,
   because it means admitting the cases where you are not the answer.
2. **Cost-when-it-goes-wrong, not cost.** Every operator page compares itself to taxis and
   rideshare on price, which invites a price fight it cannot win on a good day. Reframe on
   **failure modes**: a metered fare has no agreed number, a rideshare has no one tracking your
   flight, and a hire car means somebody in your party is not drinking at the cellar doors. That
   last one decides the whole category on this specific route and almost nobody says it out loud.

**Required Entities (NLP):** Adelaide Airport, ADL, Terminal 1, arrivals hall, Barossa Valley,
Sturt Highway, Northern Expressway, Gawler, Tanunda, Lyndoch, Nuriootpa, Greenock, Angaston, Seppeltsfield, private
transfer, shared shuttle, chauffeur, meet and greet, flight tracking, flat fare, per car, cellar
door, booster seat, accredited driver, door to door.

**E-E-A-T Persona:** The operator who drives the road. Declarative, specific, willing to name the
case where the customer should choose something else.

> **Deliberate constraint:** no invented reviews and no invented competitor prices. The alternatives
> section below compares **structures**, not dollar figures, because taxi and rideshare fares on
> this route are variable and unverifiable from here. Naming a competitor's price we have not
> measured would be the same failure as the testimonials removed under L1.

---

## 2. The Behavioral UX Card

**Hook Type:** Unchanged. The existing hero (`Land in Adelaide. Arrive in the Barossa relaxed.`
with the booking docket beside it) is already an answer-first, conversion-first hero and should not
be rebuilt.

**Pattern Interrupts Added:**
- The per-person break-even table (new)
- The alternatives comparison table (new)
- The pickup and drop-off coverage list (new)

**Skim-Path Logic (additions):**
*Private car, not a shared shuttle → from four people it costs the same or less per head → we are
the only fixed number in the comparison → met inside the arrivals hall by name → these five
townships, and tell us if you are outside them.*

**Anti-Bounce Mechanism:** Already strong. The booking docket sits in the hero, so the conversion
path never requires a scroll. The additions are built to catch the readers who scroll *past* it to
justify the decision, and every one of them ends by pointing back at `#book`.

---

## 3. The Intent & Novelty Gate

| Check | Status |
|---|---|
| Exact search intent defined | ✅ Transactional, operator selection |
| Hidden question identified | ✅ "Will someone be there, and will the price hold" |
| Information Gain locked | ✅ Break-even seat count + failure-mode comparison |
| Answer Target formulated | ✅ Already live in the meta description and hero lead |

**GATE: PASS**, with three brief-level corrections:

1. **"Choose Your Transfer Type (Private / Shared / Chauffeur)" is not deliverable as written.**
   There is no shared shuttle product and "private" and "chauffeur" are the same thing here. A tab
   set offering three choices where one exists is a bounce. **Replaced with an honest answer block
   that captures the `shared shuttle` queries by resolving them.**
2. **`LocalBusiness` is already present, as `TravelAgency`**, which is a subtype and the more
   specific of the two. Do not add a second business node. Do not duplicate the `@id`.
3. **`Offer` is already present** inside `hasOfferCatalog`, generated from the `fleet` array. No new
   offer markup is needed for C1.

---

## 4. The Optimized Content Draft

### Mapping against what is already live

| Brief's requested H2 | Status on `/` | Action |
|---|---|---|
| Choose Your Transfer Type | Partially, as `A quiet white chauffeur car, not a shared shuttle.` | **REVISE** — currently positioning, not an answer |
| Pricing & Inclusions | `#fares` + `#included` | **KEEP.** Already strong |
| Pickup & Drop-off Locations | Scattered across the estimator and the FAQ | **NEW SECTION** — the real gap |
| What's Included | `#included`, six items | **KEEP** |
| How to Book | `#how`, four steps | **KEEP** |
| FAQ | 11 questions, schema-backed | **KEEP + 3 additions** |
| *(not in brief)* | — | **NEW** — the alternatives comparison |
| Reviews / trust signals | `#reviews`, conditional, currently empty | **BLOCKED** — L1 |

Everything marked KEEP is genuinely good and is not rewritten here. The rest follows.

---

### REVISE — the shared-shuttle section

Replaces the body copy under `A quiet white chauffeur car, not a shared shuttle.` (line ~1009).
Keep the H2, keep the spec list beneath it, keep the markings disclosure. Change the paragraph.

> ## A quiet white chauffeur car, not a shared shuttle.
>
> You have just done a flight. The last thing you want is to wait for a van to fill, then stop
> four times before yours.
>
> **So here is the arithmetic, including the part where a shared seat wins.** Our fare is per car,
> not per person, which means the more of you there are, the less each seat costs:
>
> | Travelling | Private car | Per person |
> |---|---|---|
> | 1 | $200 | $200.00 |
> | 2 | $200 | $100.00 |
> | 3 | $200 | $66.67 |
> | **4** | **$200** | **$50.00** |
> | 7 | $230 (Tarago) | $32.86 |
> | 13 | $250 (HiAce) | **$19.23** |
>
> **Alone or as a couple, a shared seat will be cheaper if one is running on your date.** From
> three people the gap closes quickly, and from four it is usually gone. At that point you are
> choosing between the same money in a car of your own, and the same money in a van that leaves
> when it is full.
>
> **Everything else stays the same regardless of how many of you there are:** flight tracked, met
> by name in arrivals, one price agreed before you fly, door to door.
>
> [Get your flat fare →](#book)

**[INFORMATION GAIN]** The table is the asset. It answers `shared shuttle`, `private transfer` and
`per person` intent in one object, and it concedes the two-passenger case, which is what makes the
rest of the page believable.

---

### NEW — the alternatives comparison

Place after the fares section, before the FAQ. This is the section that catches readers who have
scrolled past the booking form to justify the decision.

> ## Transfer, taxi, rideshare or hire car?
>
> Four ways to cover the same 75 km. They differ less on price than on **what happens when
> something goes wrong**, which on an arrival day is the part that actually costs you.
>
> | | **Private transfer** | **Taxi** | **Rideshare** | **Hire car** |
> |---|---|---|---|---|
> | **Price known before you fly** | **Yes, in writing** | No, metered | No, varies with demand | Yes, plus fuel and tolls |
> | **If your flight is late** | Tracked by flight number, driver adjusts | Rank is first come, first served | You book on landing, or you do not | Desk hours apply |
> | **Someone waiting for you** | **Yes, by name, inside arrivals** | No | No | No |
> | **Cellar doors that day** | Everyone can drink | Everyone can drink | Everyone can drink | **Someone is driving** |
> | **Luggage and wine cases** | Sized to your party | Whatever turns up | Whatever turns up | Your problem on the way back |
>
> **The hire car line is the one that decides it for most people.** A car at the airport looks like
> the cheapest option until you work out who in your group is not drinking at Seppeltsfield, and
> then who drives it back to the airport on the last morning.
>
> **The rest is about the arrival hour.** After a long flight, the difference between a name on a
> sign and a rank queue is worth more than the fare difference, which is usually smaller than
> people expect once there are three or four of you.
>
> [See the flat fares →](#fares)

**[E-E-A-T MARKER]** No competitor dollar figures appear here, deliberately. Metered and surge
fares are not fixed, so quoting them would be a number this business cannot stand behind. The
comparison runs on structure, which is verifiable.

---

### NEW — pickup and drop-off coverage

The real gap. Right now the townships live inside an estimator dropdown and one FAQ answer, which
is invisible to a crawler reading for entity coverage and to a reader checking whether their
accommodation qualifies.

> ## Where we pick you up, and where we drop you
>
> ### At Adelaide Airport
>
> **Inside the arrivals hall, after you clear baggage.** Adelaide Airport runs domestic and
> international through the one terminal, so there is no wrong building to walk to. Your driver is
> waiting with a name sign, and full meeting details come with your confirmation.
>
> **Flying out instead?** The run works the same in reverse, to the departures level, timed back
> from your flight. Same flat fare, same car.
>
> ### In the Barossa
>
> **The flat fare covers door-to-door service in the five central townships:**
>
> - **Lyndoch**, the closest at about 58 km and 50 minutes
> - **Tanunda**, about 70 km and an hour
> - **Seppeltsfield**, about 74 km
> - **Nuriootpa**, about 76 km
> - **Greenock**, about 78 km
> - **Angaston**, the furthest at about 80 km and 70 minutes
>
> **Door to door means the actual door:** your hotel, your rental, a cellar door, or a private
> address on a side road with no number on the gate. Give us the address and that is where you are
> dropped.
>
> **Headed somewhere outside those towns?** Say where on your booking. It may be quoted higher, and
> you will be told the number before you fly rather than after you land.
>
> [Check your fare →](#book)

**[OPERATOR TO CONFIRM]** *Seppeltsfield is listed above at the flat fare because the estimator and
the `areaServed` schema already treat it as covered, but it is **not** in the owner's list of
central townships. This is open item L13 and it is a live contradiction on the site today: the
estimator quotes it at $200 while the FAQ names five towns that exclude it. **Get the ruling before
publishing this section**, then make the estimator, the FAQ and this list agree.*

---

### KEEP + ADD — FAQ

The 11 live questions stay. Three additions, all C1 intent, none duplicating an existing one:

**Is there a shared shuttle from Adelaide Airport to the Barossa Valley?**
We run private vehicles only, priced per car rather than per seat. For one or two passengers a
shared seat will be cheaper if one is running; from about four people a private car works out to
around $50 each or less, and it leaves when you land rather than when it fills.

**Can I book a transfer back to Adelaide Airport?**
Yes. The fare is the same flat price per car in both directions, timed back from your flight.
Book both legs at once and it is one arrangement rather than two.

**Do I pay per person or per car?**
Per car. A sedan is $200 whether one person or four is in it, which is why the per-head cost falls
as your party grows.

---

## 5. The Content Dominance Score

Scored as the homepage would stand **with** these changes applied.

| Criterion | Available | Scored | Notes |
|---|---|---|---|
| Answer-First Hook | 15 | **15** | Already live. Booking docket in the hero, flat fare in the lead, no scroll required to convert |
| Information Gain | 20 | **18** | Break-even table and failure-mode comparison are both absent from the SERP. Capped short of 20 because the comparison runs on structure rather than measured competitor pricing |
| Semantic Completeness | 15 | **15** | The new coverage section closes the last real gap. All five townships, both directions, terminal, and `shared shuttle` now appear as text rather than as dropdown options |
| Scannability (UX) | 20 | **19** | Existing page is already well-formatted. Three new tables added, no new walls of text |
| E-E-A-T Signals | 15 | **9** | **Capped by reality.** Accreditation, SA mechanical inspection and the markings disclosure are genuine and rare. **Zero reviews, no Business Profile.** This is the whole gap |
| Fluff Eradication | 15 | **15** | House style holds: no em dashes, short paragraphs, active voice |
| **Total** | 100 | **91** | **Rank-1 candidate on-page.** The remaining nine points are not writing |

**The honest read, and it is blunt:** for C1 specifically, **the page is no longer the constraint.**
The head term is a local-pack query. L15 records four operators in the Maps pack for this route,
the leader holding **519 reviews at 4.6**, and this business appearing in none of them. No amount
of on-page work outranks that. **The Business Profile is the C1 strategy; this document is the
support act.**

---

## 6. Suggested Next Steps

**Meta title** — unchanged, already correct (78 chars, may truncate, acceptable):
`Adelaide Airport to Barossa Valley Transfers | Private Car ADL to the Barossa`

**Meta description** — unchanged, already correct at 152 chars.

**URL slug** — `/`. **No new page.** See the correction at the top.

**Schema.** No new types. Three refinements to what is already there:
- Add the three new FAQ questions to the existing `faqSchema`, keeping the page copy and the schema
  text identical, as the file already does.
- Consider `areaServed` alignment once L13 is ruled on. Seppeltsfield currently sits in
  `areaServed` and in the estimator but not in the owner's covered list.
- **Do not add `Review` or `AggregateRating` until real reviews exist** (L1). This is the schema
  most likely to win the C1 snippet and the one that must not be faked.

**Internal links.**
- The `Commuter bus` line in the fleet spec and the HiAce fare card → **C5**, the group page. This
  is the single highest-value internal link on the site and it does not exist yet.
- The new alternatives section → `#fares`, and the coverage section → `#book`. Both already
  drafted with those anchors.
- The day-tour section → a future C4 page when it exists. Leave the anchor as `#book` until then.

**Live copy correction, added 2026-08-14 (clears L12).** The operator confirms **both infant
restraints and booster seats** are available. The homepage currently understates this in three
places, all of which need updating together:
- `#included`, the card reading **"Booster seats on request"** → cover both.
- The FAQ question **"Can you fit a child booster seat?"** → rewrite as a child-seat question.
- The matching entry in `faqSchema`, which must stay identical to the visible answer.

Families with a baby check this before booking, and "booster seats" reads as "we cannot take an
infant". This is a small edit that removes a real booking blocker.

**Implementation notes.**
- All three new blocks are additions to `index.astro`. The `hasTestimonials` pattern shows the
  established way to gate a section; nothing here needs gating except the Seppeltsfield line.
- The per-person table must be **generated from the `fleet` array**, not typed. It is derived data
  (`fare / seats`), which is exactly the class of number that drifts. Same rule as L2.
- The coverage distances come from the estimator's own destination table
  (`tanunda: {km:70}`, etc., around line 1430). **Read them from there rather than retyping**, or
  the list and the estimator will disagree within one edit.
- `#reviews` already exists as a conditional section and needs no work. It switches itself on the
  day the `testimonials` array has entries.

**Priority order for C1, highest leverage first.**
1. **Google Business Profile (L15).** Not a content task. It is the C1 ranking factor and everything
   below is worth less until it exists.
2. **Search Console property (L14).** Without it there is no way to know whether any of this
   worked, and no way to see whether the head term is even being served.
3. **The Seppeltsfield ruling (L13).** The site currently contradicts itself on a fare. Fix before
   adding a third place that states the coverage.
4. **The three new blocks above.** A day's work, and the break-even table is the highest-return
   single object on the page.
5. **First real review.** Worth six points of the score and considerably more than that in the pack.

**Do not touch the H1.** `Land in Adelaide. Arrive in the Barossa relaxed.` carries no head-term
keyword, and the instinct is to force one in. The exact phrase is already in the title tag, the
eyebrow, the lead sentence, the FAQ and the schema, and exact-match H1 is a weak signal against the
conversion cost of replacing a hook that works. **Revisit only if Search Console later shows
impressions on the head term with a poor average position**, which is a check that cannot be run
until L14 is done.
