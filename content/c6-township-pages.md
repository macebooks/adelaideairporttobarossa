# SDEP Output — Township transfer pages (Tanunda, Nuriootpa, Seppeltsfield)

Status: **two drafts ready, one reshaped and held.** Research verified 2026-08-14.

I argued against township pages in `c3-journey-logistics.md`. That objection was to **six**
near-identical pages differing by two numbers. Three, with real local content and a hard test
applied, is a different proposition and the two priority pages clear it. The third does not, for
reasons that turned out to have nothing to do with SEO. See the reassessment below.

---

## The doorway test, applied before drafting

Google's doorway policy targets pages "created to funnel visitors into the actual usable or
relevant portion of your site" that are substantially similar to each other. Three transfer pages
whose only differences are `70 km` versus `76 km` are exactly that.

**The rule these pages are built to, and it is not negotiable:**

> **Sixty percent of each page must be content that would be false, or meaningless, on the other
> two.** If a township cannot carry 400 words that are true only of it, it does not get a page. It
> gets a row in the C3 table.

Applied honestly, that is a pass, a pass and a fail.

| Page | Unique content available | Verdict |
|---|---|---|
| Tanunda | The valley's visitor base: most accommodation and dining, central enough to avoid backtracking | **Build.** Priority 1 confirmed |
| Nuriootpa | The working town: shops, pubs, bakeries, and the big-name cellar doors on its doorstep | **Build.** Priority 2 confirmed |
| Seppeltsfield | A locality of **144 people**, an 1850s stables craft studio, a five-kilometre palm avenue, and two boutique properties | **Hold and reshape.** Priority 3 rejected as specified |

---

## ⚠️ Seppeltsfield: three reasons the brief's priority 3 is wrong

The rationale given is *"high-profile luxury destination. Premium audience = high booking value."*
**The premium-audience half is correct.** The page as specified is still the wrong build.

**1. It is not a township. It is a locality of 144 people.** Tanunda and Nuriootpa are towns with
streets of accommodation. Seppeltsfield has The Lodge, The Cottage, and a scatter of properties
along Seppeltsfield Road. The addressable market for *"transfer from the airport to where I am
sleeping in Seppeltsfield"* is a handful of beds, not a town.

**2. Most people going to Seppeltsfield are not staying there.** They are visiting the winery, the
palm avenue and JamFactory **for the day, from Tanunda or Nuriootpa**. That is a different product.
An airport transfer page sells them the wrong thing, and the thing they actually want, a
cellar-door day with a driver, already exists on the homepage as the day-tour offer.

**3. The fare is unknown, and the site currently contradicts itself.** Seppeltsfield is in the
estimator and in `areaServed` at the standard fare, but **not** in the owner's list of central
townships. That is open item L13. **A whole page priced on an unconfirmed fare is worse than no
page**, because it is a published promise rather than a stale dropdown option.

**What to build instead, once L13 is answered:** a page pitched at the day visit, not the airport
run. `/seppeltsfield-cellar-door-transfers/` or a section on the future day-tour page, targeting
"getting to Seppeltsfield" from *inside* the valley as well as from the airport. The premium
audience is real. The intent is just not transactional-airport.

**Priority order, revised: Tanunda, Nuriootpa, then the day-tour page. Seppeltsfield rides on that.**

---

## Shared architecture (build this first, or the pages drift)

**One component, three pages.** The fare table, the vehicle list and the booking CTA are identical
by design and must be a single shared component reading from the `fleet` array, which is now
overdue to move out of `index.astro` frontmatter into `src/lib/fleet.ts` alongside the estimator's
destination distances.

**Four consumers now need that module:** the homepage, C3, and these two pages. Hand-typing `$200`
a fourth and fifth time is how the Seppeltsfield contradiction happened in the first place.

**Schema, per page:** `Service` + `BreadcrumbList`, with `provider` referencing the existing
`{site}/#business` `@id`. **`FAQPage` only where the questions are township-specific.** Three pages
carrying "how long does the drive take" in schema is the cannibalization C3 was made canonical to
prevent.

**`areaServed` on the Service node names the one township**, not the valley. That is the entity
signal these pages exist to send.

**Internal links, hub and spoke:**
- C3's township table rows → these pages. That is the hub, and it is what stops them reading as
  orphans.
- Each page → `/#book` (primary), → C3 (full distance table), → C2 (still choosing a mode), → C5
  (groups over 4).
- **Each page → the other township page**, on the "not sure where to stay" line. Two pages that
  link to each other on a genuine reader question are a cluster. Two that do not are doorways.

---

# Page 1 — Tanunda

**URL:** `/adelaide-airport-to-tanunda-transfer/`
**Meta title** (59): `Adelaide Airport to Tanunda Transfer | $200 Flat, 1 Hour`
**Meta description** (149): `Private transfer from Adelaide Airport to Tanunda. $200 flat per car, about 70 km and one hour, flight tracked and met in arrivals. Book both legs.`

## Adelaide Airport to Tanunda transfers

**[ANSWER TARGET]**
Tanunda is about 70 km from Adelaide Airport, roughly one hour by road. A private transfer is $200
flat per car for up to four passengers, each way, with the driver meeting you inside the arrivals
hall. Larger vehicles carry seven and thirteen.

**Tanunda is the Barossa township most visitors book**, and the one most airport transfers run to.
If your accommodation is on or near the main street, this is your page.

---

### Why most people end up in Tanunda

**It is the valley's visitor town.** More places to stay and more places to eat than anywhere else
in the Barossa, which is why first-time visitors gravitate to it without quite knowing why.

**It is also the practical choice**, and this is the part nobody explains: Tanunda sits central
enough that a day of cellar doors does not become a day of backtracking. From here the valley opens
in both directions.

**What that means for your transfer:** you are almost certainly going to a street address rather
than a resort gate. Give us the address on the booking, including the property name if it is a
cottage or a rental, and that is where you are dropped. Not the main street, not "near enough".

**[OPEN LOOP]** The drive itself is the easy hour. It is the last twenty minutes that people
remember.

---

### The drive: about an hour, and the good part is at the end

Out of the airport, north around the city and up the **Sturt Highway through Gawler**. That stretch
is ordinary and it is most of the trip.

**Then the suburbs stop.** Past Gawler the country opens, and the run in through Lyndoch and
Rowland Flat is the one that tells you the holiday has started. Vine rows running away from the
road on both sides, and about ten minutes later you are on Tanunda's main street.

**About 70 km, about 60 minutes**, door to door in normal traffic. Tanunda is the second-closest of
the central townships, so it is a shorter run than Nuriootpa or Angaston.

**[OPEN LOOP]** One hour assuming somebody is actually there when you land.

---

### What the $200 covers

**One flat fare per car, each way.** Not per person, not metered, and the same price whether you
land at 6am or 11pm.

[SHARED COMPONENT: fare table from `fleet`, sedan $200 / Tarago $230 / HiAce $250, with the
per-person column]

**Your flight is tracked by its number**, so a late arrival moves the pick-up rather than costing
you the booking. You are met inside the arrivals hall with a name sign, after baggage.

**Book the return at the same time.** The fare is identical in the other direction and it is one
arrangement rather than two, which matters more than it sounds like on a Sunday morning with cases
of wine.

---

### Staying in Tanunda or Nuriootpa?

**A common question, and worth answering before you book anything.** Tanunda is the visitor town:
more to eat, more to walk to, more choice of where to sleep. **Nuriootpa is the working town**,
with the supermarkets, the bakeries and the practical end of the valley, and the big-name cellar
doors close by.

**The transfer barely changes.** Nuriootpa is 76 km against Tanunda's 70, about five minutes
further, and the fare is the same $200. Choose on the town, not the trip.

[→ Adelaide Airport to Nuriootpa transfers](/adelaide-airport-to-nuriootpa-transfer/)

---

### Tanunda transfer questions

**How long is the transfer from Adelaide Airport to Tanunda?**
About one hour door to door, roughly 70 km north up the Sturt Highway through Gawler.

**How much is a transfer from Adelaide Airport to Tanunda?**
$200 flat per car for up to four passengers, each way. $230 for the seven-seat people mover and
$250 for the thirteen-seat bus.

**Will you drop me at my accommodation, or in the town centre?**
At the address you give us. Cottages and rentals on side roads are normal here, so include the
property name if there is one.

**Can you pick me up in Tanunda for a flight home?**
Yes, same flat fare, timed back from your departure. Booking both legs together is one
arrangement.

[**Get your Tanunda transfer →**](/#book)

---

# Page 2 — Nuriootpa

**URL:** `/adelaide-airport-to-nuriootpa-transfer/`
**Meta title** (62): `Adelaide Airport to Nuriootpa Transfer | $200 Flat, 65 Minutes`
**Meta description** (151): `Private transfer from Adelaide Airport to Nuriootpa. $200 flat per car, about 76 km and 65 minutes, flight tracked, met in arrivals. Corporate accounts.`

## Adelaide Airport to Nuriootpa transfers

**[ANSWER TARGET]**
Nuriootpa is about 76 km from Adelaide Airport, roughly 65 minutes by road. A private transfer is
$200 flat per car for up to four passengers, each way. It is the furthest of the four main
townships bar Angaston, and the fare is the same.

**Nuriootpa is the Barossa's working town**, and if you are here for a conference, a supplier visit
or a stay with the shops in walking distance, this is your page.

---

### Nuriootpa is the practical Barossa

**Tanunda is where the valley entertains. Nuriootpa is where it works.** Supermarkets, pubs,
bakeries and cafes, and the ordinary infrastructure a town needs when it is not performing for
visitors.

**That makes it the better base for some trips and the wrong one for others.** If you want to walk
out of your accommodation into a restaurant strip, Tanunda. **If you want a straightforward base
with everything open and the big cellar doors on your doorstep, Nuriootpa.**

**Penfolds, Wolf Blass and Elderton are all close by**, which is why a lot of trade and corporate
visits base here rather than in the prettier town five minutes south.

**[OPEN LOOP]** Which also changes what people need from the transfer itself.

---

### Built for the business trip as much as the weekend

**Corporate and trade visitors are a real share of the Nuriootpa run**, and they need different
things from a couple on a wine weekend:

- **Invoicing by arrangement** for regular and corporate clients, so nobody expenses a cash fare
  from an airport rank.
- **Every driver accredited** under South Australian passenger transport regulations, and every
  vehicle through its SA Government mechanical inspection.
- **Met inside the arrivals hall with a name sign.** No kerbside phone calls between a delayed
  flight and a first meeting.
- **Recurring runs set up once**, if the same visit repeats across a season.

**Bringing a team?** Seven travel in the Tarago at $230 and thirteen in the HiAce at $250, per car,
which for a group is well under any per-head arrangement.

[→ Group and conference transfers](/group-transfers-adelaide-airport-barossa-valley/)

---

### The drive: 76 km, about 65 minutes

North up the **Sturt Highway through Gawler**, into the valley, then on through Tanunda and about
six kilometres further north.

**Nuriootpa is roughly five minutes further than Tanunda and costs exactly the same $200.** The
flat fare covers the central townships without grading them by distance, so being at the top of the
valley costs you nothing.

[SHARED COMPONENT: fare table from `fleet`]

**Flight tracked by number, met in arrivals, one price agreed before you fly.**

---

### Nuriootpa or Tanunda?

**Nuriootpa for convenience and the working town. Tanunda for the visitor experience.** Five
minutes and no difference in fare separate them, so pick the town that suits the trip rather than
the one that shortens the drive.

[→ Adelaide Airport to Tanunda transfers](/adelaide-airport-to-tanunda-transfer/)

---

### Nuriootpa transfer questions

**How long is the transfer from Adelaide Airport to Nuriootpa?**
About 65 minutes door to door, roughly 76 km, north up the Sturt Highway through Gawler and on
past Tanunda.

**How much is a transfer from Adelaide Airport to Nuriootpa?**
$200 flat per car for up to four passengers, each way. The same flat fare as the closer townships.

**Can you invoice my company?**
Regular and corporate clients can be invoiced by arrangement. Raise it when you book.

**Can you collect a group from several flights?**
Yes. Each flight is tracked by its own number, and parties above four are quoted across the right
combination of vehicles.

[**Get your Nuriootpa transfer →**](/#book)

---

# Page 3 — Seppeltsfield: HELD

**Do not build `/adelaide-airport-to-seppeltsfield-transfer/` as specified.** See the reassessment
above. Three blockers, in order:

1. **L13 is unanswered.** The fare is genuinely unknown and the site already contradicts itself.
2. **The intent is day-visit, not airport transfer.** Population 144.
3. **The right page is a different page.** Cellar-door and day-tour framing, reachable from inside
   the valley as well as from the airport.

**When L13 clears, the material is genuinely strong and it is worth doing properly.** Verified and
ready to use:

- **The Avenue of Palms.** Around 2,000 heritage-listed Canary Island date palms along
  Seppeltsfield Road, planted by Seppeltsfield workers during the Great Depression, running about
  five kilometres. **The arrival is the attraction**, which no transfer page anywhere is using.
- **JamFactory at Seppeltsfield.** Craft and design studios, gallery and shop in a renovated 1850s
  stables building, with a walkway that lets visitors watch the makers work.
- **The Lodge at Seppeltsfield**, a boutique heritage guest house built in 1903 by Udo Waldemar
  Seppelt, and The Cottage at Seppeltsfield, sleeping four.

**The hook writes itself and it is a day-tour hook, not a transfer one:** *most people's transfer
ends at a driveway; this one ends by driving five kilometres through a palm avenue somebody planted
by hand in the Depression.* Sell the arrival, to a premium audience, on the right page.

---

## Content Dominance Scores

| | Tanunda | Nuriootpa |
|---|---|---|
| Answer-First Hook | **15** | **15** |
| Information Gain | **14** | **15** |
| Semantic Completeness | **14** | **14** |
| Scannability | **18** | **18** |
| E-E-A-T | **9** | **9** |
| Fluff Eradication | **15** | **15** |
| **Total** | **85** | **86** |

**Both land below the other pages in this project, and that is the honest number.** A township
transfer page has a low ceiling: the fare, the vehicles and the meeting procedure are the same
facts the homepage already carries, so only the "which town is this and who stays here" material is
genuinely new. **85 is enough to win an uncontested slug** and it is not enough to carry a page
that has to fight for anything.

**The scores go up when reviews land**, and specifically when a review can be attributed to a
township: a guest quote that mentions Tanunda is worth more on the Tanunda page than three
paragraphs of copy.

---

## Implementation checklist

1. **Move `fleet` and the estimator's destination distances into `src/lib/`.** Five consumers now.
   Do this before writing either page.
2. Build the shared fare-and-CTA component against that module.
3. Add both slugs to `ROUTES` in `src/pages/sitemap.xml.ts`.
4. Link C3's township table rows out to the two new pages, and both new pages back to C3.
5. `Service` + `BreadcrumbList` per page. `areaServed` names the single township. Township-specific
   FAQs only.
6. Re-run `npm run audit`. Two new routes and a new shared component is exactly what it is for.

**Waiting on the operator:** L13 for Seppeltsfield, and a review that names a township for either
page.

---

Sources verified 2026-08-14:

- [Barossa Australia: Seppeltsfield](https://www.barossa.com/visit/towns/seppeltsfield/)
- [Seppeltsfield, South Australia (locality and population)](https://en.wikipedia.org/wiki/Seppeltsfield,_South_Australia)
- [JamFactory at Seppeltsfield](https://seppeltsfield.com.au/jam-factory-at-seppeltsfield/)
- [The Lodge at Seppeltsfield](https://www.thelodgeatseppeltsfield.com.au/)
- [Seppeltsfield Road: Avenue of Palms](https://www.seppeltsfieldroad.com/)
- [Australian Traveller: Barossa accommodation by town](https://www.australiantraveller.com/sa/barossa-valley/barossa-valley-accommodation/)
- Distances and drive times: the estimator's own destination table in `src/pages/index.astro`
