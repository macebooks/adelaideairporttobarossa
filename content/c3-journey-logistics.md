# SDEP Output — Cluster C3: Journey Logistics & Planning Detail

Target URL: `/adelaide-airport-to-barossa-valley-distance-and-transfer-times/`
Status: **draft.** Three blocks are gated on operator answers and one of them is a safety issue, not
a copy issue. See the accessibility flag in section 4.

---

## ⚠️ Cannibalization: three pages now answer "how far is it"

This is the third cluster in a row where the real conflict is internal, and this one is the worst
because the overlapping question is the cluster's own parent keyword.

| Page | Currently answers distance/duration | After this ships |
|---|---|---|
| **Homepage `/`** | FAQ: "About one hour, roughly 75 km…", in `FAQPage` schema | **Keep the visible answer. Remove that question from `faqSchema`** and link here |
| **C2 comparison** | Answer target opens with 75 km / one hour, plus a FAQ | **Keep the opening line** (the comparison needs it). **Drop its distance FAQ entry from schema** |
| **C3, this page** | — | **Canonical owner.** Per-township table, both directions, in schema |

**One question, one schema owner.** Three `FAQPage` entries answering the same query across one
domain competes with itself for the snippet this cluster exists to win.

---

## ⚠️ The brief mis-tags half this cluster

`Adelaide Airport to Tanunda transfer` and `Adelaide Airport to Angaston transfer` are labelled
INFORMATIONAL. **They are transactional.** Nobody searches a township-plus-transfer string to learn
geography; they search it because that is where they are sleeping and they want a car.

**Consequence: this page must carry fares and a booking path**, not just distances. It is a hybrid,
and the per-township table below is built as one.

**Do not spin out six township pages.** `/adelaide-airport-to-tanunda-transfer/`,
`/…-to-angaston-transfer/` and so on would be near-identical thin pages differing by two numbers,
which is the textbook doorway pattern. **The table serves all six.** Revisit only if Search Console
later shows real standalone volume on a specific township, a check that cannot run until L14 is
done.

---

## 1. The Semantic Strategy Card

**Target Query:** `Adelaide Airport to Barossa Valley transfer duration`

**Primary Intent:** INFORMATIONAL, and specifically **anxiety-resolving**. This user has mostly
decided. They are looking for a reason not to.

**The Hidden Question:** *"What is the bit I have not thought of that will go wrong?"*

C3 searchers are running a pre-flight check on a decision, not researching a topic. Every query in
this cluster is a **specific worry with a specific shape**: will the driver find me, will the wine
fit, what happens to my kid's car seat, is my town even covered. A page that resolves worries in
the order they occur converts. A page that answers them in the order Google likes does not.

**Information Gain Angle (two locked frameworks):**

1. **The wine-home problem, end to end.** `can I bring wine on Adelaide Airport transfer` looks
   like a car question. **It is not.** The car is the easy part; the constraint is the flight, and
   nobody covers the chain. **A dozen bottles weighs about 16 kg, which is most of a standard 23 kg
   checked allowance.** That single number reframes the whole purchase decision at the cellar door,
   and it is the most useful thing this business can tell a visitor.
2. **Distance is not one number, it is six.** Every competitor publishes "about an hour". The
   townships range from **58 km to 80 km, and 50 minutes to 70**, which is a 38% spread the reader
   is actually trying to resolve because they are looking up their own accommodation. Publishing
   the per-township table wins the sub-town queries the brief correctly identifies as uncontested.

**Required Entities (NLP):** Adelaide Airport, ADL, Terminal 1, arrivals hall, baggage claim, name
sign, Barossa Valley, Tanunda, Lyndoch, Nuriootpa, Angaston, Greenock, Seppeltsfield, Gawler, Sturt
Highway, kilometres, drive time, flight number, flight tracking, checked baggage, carry-on, booster
seat, child restraint, cellar door, case of wine.

**E-E-A-T Persona:** The driver who has answered these questions at the kerb a thousand times, in
the order they get asked.

> **Deliberate constraint:** the wine section makes claims about airline rules. Those are sourced
> and dated in section 6, and **one widely repeated figure was investigated and rejected as
> probably wrong.** See the provenance table. Getting an airline rule wrong on a page that exists
> to reduce anxiety would be worse than not writing the section.

---

## 2. The Behavioral UX Card

**Hook Type:** Direct data. The distance table is the first thing on the page, because it is the
literal query.

**Pattern Interrupts Planned:**
- The six-township distance and fare table (snippet target)
- The arrivals-hall procedure as numbered steps
- The wine weight callout
- A "what to tell us when you book" checklist

**Skim-Path Logic:**
*58 to 80 km depending on your township → about an hour → met inside the arrivals hall after
baggage, with a name sign → your flight is tracked by number, so delays are our problem → a case of
wine is 16 kg, plan the flight home → tell us about seats and oversized bags when you book.*

**Anti-Bounce Mechanism:** Each section closes a specific worry and offers the next one, so the
reader keeps descending through their own checklist. **The CTA stays soft until the end**, because
this reader is validating, not buying, and a hard sell at the top reads as evasion of the question
they came for.

---

## 3. The Intent & Novelty Gate

| Check | Status |
|---|---|
| Exact search intent defined | ✅ Informational, anxiety-resolving, with transactional township tail |
| Hidden question identified | ✅ "What have I not thought of" |
| Information Gain locked | ✅ The wine-home chain + per-township distances |
| Answer Target formulated | ✅ 45 words, below |

**GATE: PASS**, with two corrections:

1. **Drop `HowTo`.** Deprecated by Google for rich results, and the pickup procedure is a
   description of a service, not a set of instructions the reader performs. `FAQPage` +
   `BreadcrumbList` is the right pair, same as C2.
2. **"Accessibility" cannot be written as specified.** See the flag in the draft. This is the one
   item in three clusters where guessing would be a safety failure rather than an SEO one.

---

## 4. The Optimized Content Draft

---

# Adelaide Airport to the Barossa Valley: distance, travel time and transfer logistics

**[ANSWER TARGET]**
The Barossa Valley is 58 to 80 km from Adelaide Airport depending on the township, or roughly 50 to
70 minutes by road. Lyndoch is the closest at about 58 km. Angaston is the furthest at about 80 km.
Tanunda, the most common destination, is about 70 km and one hour.

---

## How far is the Barossa Valley from Adelaide Airport?

**One hour is the short answer. Here is the one that matches your booking.**

| Township | Distance from ADL | Drive time | Sedan fare, each way |
|---|---|---|---|
| **Lyndoch** | ~58 km | ~50 min | $200 |
| **Tanunda** | ~70 km | ~60 min | $200 |
| **Seppeltsfield** | ~74 km | ~65 min | See note below |
| **Nuriootpa** | ~76 km | ~65 min | $200 |
| **Greenock** | ~78 km | ~65 min | $200 |
| **Angaston** | ~80 km | ~70 min | $200 |

**Fares are per car, each way, not per person.** A sedan carries up to 4, a Tarago up to 7 at $230,
and a 13-seat bus at $250. The same flat fare applies in both directions.

**Times are door to door in normal traffic**, measured from the arrivals hall rather than from the
airport boundary. An early-morning airport run adds nothing; a Friday evening departure out of
Adelaide can add fifteen minutes.

**[OPERATOR TO CONFIRM]** *Seppeltsfield is in the estimator and in the site's `areaServed` schema
at the standard fare, but it is **not** in the owner's list of central townships. The site
contradicts itself on this today. Open item L13, and it must be settled before this table
publishes, because this page states it more plainly than anywhere else on the site.*

**[OPEN LOOP]** The distance is the easy part. The bit people actually worry about is the twenty
minutes before it.

---

## The route: what you pass on the way

**Out of the airport, north around the city, then up the Sturt Highway through Gawler and into the
vines.** No transfers, no changes, no waiting.

The road empties out past Gawler. **The last fifteen minutes are the good bit**: the suburbs stop,
the country opens up, and the vine rows start running away from the road in both directions. Most
people stop talking about the flight around there.

**[OPEN LOOP]** Assuming, of course, that somebody was there to collect you.

---

## Pickup at Adelaide Airport: exactly what happens

**Adelaide Airport runs domestic and international through one terminal**, so there is no wrong
building and no inter-terminal shuttle to work out.

1. **You land.** Nothing to do. We already have your flight number.
2. **You clear baggage.** Take your time. The driver is not on a meter.
3. **You walk into the arrivals hall.** Your driver is waiting with a **name sign**.
4. **You walk to the car and go.** Door to door, one flat fare, agreed before you flew.

**You do not need to call, message, or find a rideshare pin in a car park.** If something does go
wrong, the driver's direct number is on your confirmation.

**[OPERATOR TO CONFIRM]** *Name the exact meeting spot inside the arrivals hall, in the words a
tired traveller can follow. "By the information desk" or "at the end of the barrier, near the
coffee shop" is worth more than three paragraphs of reassurance, is a strong featured-snippet
target for `Adelaide Airport arrivals transfer meeting point`, and is currently the vaguest part of
the whole booking.*

**[OPEN LOOP]** And if the flight that was supposed to land at two o'clock lands at five?

---

## If your flight is delayed

**Nothing. That is the entire answer.**

**We track your flight by its number**, not by the schedule you booked. Land early, land late, get
diverted and come in three hours behind: the driver is working from your real arrival time.

- **You do not need to call from the plane.**
- **You do not lose the booking**, and the fare does not change because the aircraft did.
- **If your flight is cancelled and you rebook**, send the new flight number and the booking moves
  with it.

**[OPERATOR TO CONFIRM]** *The free waiting window and the fee beyond it (L4) belong here more than
anywhere else on the site. This section promises patience without quantifying it, which is exactly
the gap a careful reader notices.*

**[OPEN LOOP]** Which leaves the thing nobody thinks about until they are standing at a cellar door
holding a credit card.

---

## Wine, luggage and getting it all home

**The car is not your problem. The plane is.**

There is room for standard bags for every passenger, plus space for cases on the way back. Tell us
if you are travelling with something oversized, prams, golf clubs, instruments, and we bring the
right vehicle.

**Now the part almost nobody tells you before you buy:**

> ### **A dozen bottles of wine weighs about 16 kg.**
> ### **A standard checked bag allowance is 23 kg.**

**One case is most of your luggage allowance.** Two cases is an excess baggage fee, and you will be
finding this out at the check-in desk on your last morning.

**What actually works:**

| If you are buying | Do this |
|---|---|
| A few bottles | Pack them in checked luggage, wrapped in clothes, upright in the middle of the bag |
| Half a case or more | **Have the cellar door ship it.** Most Barossa wineries deliver anywhere in Australia |
| Anything, on a domestic flight | **Domestic flights within Australia have no liquid limits in the cabin**, so a bottle or two can travel with you. Airlines still cap the weight, and you cannot drink your own on board |
| **Connecting to an international flight** | **All of it goes in checked baggage.** The 100 ml liquid rule applies from international security, and wine will be taken off you |

**The practical version: taste widely, buy freely, and let the cellar door post the heavy part.**
Bring home the bottles you cannot get anywhere else and let the rest arrive next week.

**[E-E-A-T MARKER]** Airline allowances differ by carrier and fare type. Check yours before you buy
a case, and treat the 23 kg figure above as the common economy standard rather than a promise about
your ticket.

**[OPEN LOOP]** One more set of things to tell us, and two of them change which car turns up.

---

## Child seats, mobility and special requests

**Both infant restraints and booster seats are available on request**, so the whole family is
covered from the newborn to the nine-year-old who insists they do not need one.

**Tell us the children's ages when you book.** Australian road rules require a suitable restraint
for every child under seven, and which one is suitable depends on age and size. Give us the ages
and the right seat is fitted before pick-up, rather than negotiated at the kerb with a tired
toddler.

**[E-E-A-T MARKER]** This is worth checking with any operator you book, not just this one. **A
transfer that carries booster seats only cannot legally take a baby**, and families routinely find
that out at the airport. Ask the question before you land.

**[OPERATOR TO CONFIRM — DO NOT PUBLISH WITHOUT AN ANSWER]**

***Accessibility.** **The fleet is a Camry or Corolla, a Tarago and a HiAce Commuter. None of those
is a wheelchair-accessible vehicle as standard.** The brief asks for an accessibility section and
**it must not be written until the operator states plainly what can and cannot be accommodated** —
folding wheelchair in the boot, walking frame, assistance to the car, or nothing. A
mobility-impaired traveller who books on an implied promise is stranded in an arrivals hall. **Say
what is true, including "we cannot carry a powered wheelchair", which is a perfectly good answer
honestly given.***

**What to tell us when you book, in one list:**

- Flight number, date and arrival time
- Where you are staying, the actual address
- How many passengers, and the ages of any children
- Anything oversized, and anything you would rather we asked about than assumed

[**Get a flat fare for your flight →**](/#book)

---

## Quick answers

**How long does it take from Adelaide Airport to the Barossa Valley?**
About an hour to Tanunda. Around 50 minutes to Lyndoch and around 70 to Angaston.

**How many kilometres is Adelaide Airport to the Barossa Valley?**
Between 58 and 80 km depending on the township. Tanunda, the most common destination, is about
70 km.

**Where do I meet my driver at Adelaide Airport?**
Inside the arrivals hall, after you clear baggage. Your driver waits with a name sign. Adelaide
Airport has one terminal, so there is no other hall to find.

**Can I bring wine back in the transfer?**
Yes, there is boot space for cases. The constraint is the flight, not the car: a dozen bottles is
about 16 kg against a typical 23 kg checked allowance, so buy freely and have the cellar door ship
the bulk of it.

**What happens if my flight is delayed?**
We track your flight by its number and the driver works to your real arrival time. You keep the
booking and the fare does not change.

**Do you provide child seats?**
Yes. Both infant restraints and booster seats are available on request, so babies, toddlers and
older children are all covered. Give us the children's ages when you book and the right seat is
fitted before pick-up.

---

## 5. The Content Dominance Score

| Criterion | Available | Scored | Notes |
|---|---|---|---|
| Answer-First Hook | 15 | **15** | The distance table is the first element. The literal query is answered before a single sentence of prose |
| Information Gain | 20 | **17** | The 16 kg wine figure and the per-township spread are both genuinely absent from competing pages. Held back because one intended fact was rejected during verification (section 6) rather than published |
| Semantic Completeness | 15 | **15** | All six townships, both directions, terminal, restraints, allowances. The sub-town queries are covered as text and as table rows |
| Scannability (UX) | 20 | **20** | Three tables, numbered procedure, pull-quote, closing checklist. Nothing on this page is a wall |
| E-E-A-T Signals | 15 | **12** | Honest about the wine chain and about what the fleet is not. The child-restraint block now tells the reader to interrogate every operator, which is the strongest kind of trust signal. Capped by the missing reviews and the two open operator questions |
| Fluff Eradication | 15 | **15** | House style holds |
| **Total** | 100 | **94** | **Rank-1 candidate for the snippet**, once the two remaining flags are cleared |

**Where this page earns its place:** it is the cheapest snippet capture in the whole set. "How far
is X from Y" is a question Google wants to answer in a box, competitors answer with one vague
number, and this page answers it six ways with a table.

---

## 6. Research provenance, including one rejected fact

Verified 2026-08-14.

| Claim | Status | Note |
|---|---|---|
| Per-township distances and times | **Verified against the site's own estimator** | `src/pages/index.astro` ~line 1430 |
| Domestic Australian flights have no cabin liquid limits | **Verified** | Applies to domestic sectors only |
| International connection reimposes the 100 ml rule | **Verified** | From international security onward |
| A dozen bottles ≈ 16 kg | **Arithmetic, sound** | ~1.25 kg per filled 750 ml bottle plus carton |
| 23 kg standard checked allowance | **Common economy standard, not universal** | Written on the page as exactly that |
| Cellar doors ship interstate | **Verified in general** | Written as "most", not "all" |
| Restraint required for every child under seven | **Australian Road Rules, well established** | Spot-check the wording before publishing; it is stated as the reason we ask for ages, not as legal advice |
| Infant restraints **and** boosters both available | **Confirmed by the operator 2026-08-14** | Clears L12 |
| ~~"Qantas and Virgin cap alcohol at 5 L per person"~~ | **❌ REJECTED. Do not publish.** | Widely repeated, but the 5 L cap in dangerous-goods rules applies to beverages **above 24% ABV**. Wine is around 14%, so it is very likely not caught by it. Publishing it would invent a restriction that does not exist and talk customers out of buying wine. **The real constraint is weight**, which is what the page says |

**That rejection is why the section is worth writing.** The 5 L figure is the first thing a
traveller finds when they search this, it is probably wrong for wine, and a page that quietly gets
it right is doing something no competitor is.

---

## 7. Suggested Next Steps

**Meta title** (64 chars)
`Adelaide Airport to Barossa Valley: Distance, Time & Transfers`

**Meta description** (151 chars)
`Adelaide Airport to the Barossa is 58 to 80 km, 50 to 70 minutes by township. Pickup procedure, flight delays, luggage and how to get your wine home.`

**URL slug**
`/adelaide-airport-to-barossa-valley-distance-and-transfer-times/`

**Schema:** `FAQPage` + `BreadcrumbList`. **No `HowTo`.** This page becomes the **canonical schema
owner of the distance and duration questions**; remove the duplicate entries from the homepage and
C2 as set out at the top.

**Internal links.**
- This page → `/#book` from the township table and the closing checklist.
- This page → C2 comparison from the route section, for readers still deciding on a mode.
- This page → C5 group page from the "how many passengers" line.
- **Homepage FAQ → this page** on the distance answer. That is the link that makes the schema
  handover coherent rather than just a deletion.

**Implementation notes.**
- Add to `ROUTES` in `src/pages/sitemap.xml.ts`.
- **The township table must be generated**, from the estimator's destination object for distances
  and from the `fleet` array for fares. Both already exist in `index.astro`. Typing this table by
  hand creates a third place for the Seppeltsfield contradiction to live.
- Lifting the estimator's destination data into the same shared module as `fleet` is now overdue.
  Three pages need it.

**Priority.** Build **after** C2 and the C1 homepage work. It is the lowest-difficulty page in the
set and the highest snippet-capture rate, but it is a supporting page: it converts readers who
already found the site, so it compounds rather than acquires.

**The two answers this page is waiting on:**
1. **Accessibility.** Not an SEO item. Nothing about mobility publishes until the operator states
   what the fleet can carry.
2. **The Seppeltsfield ruling** (L13), which now blocks a table rather than a sentence.

**Cleared 2026-08-14: L12.** Infant restraints and boosters are both available. **This changes live
site copy, not just this draft.** The homepage says "Booster seats on request" in `#included` and
its FAQ asks "Can you fit a child booster seat?", both of which now understate the service and both
of which are in `faqSchema`. Update all three, and mark L12 resolved in
`DEFINITION-OF-DONE.md`.

Plus one new and cheap: **name the meeting spot in the arrivals hall.** One sentence from the
operator, and it is the best trust signal available on this page.

---

Sources verified 2026-08-14:

- [Qantas Travel Insider: carry-on baggage rules](https://www.qantas.com/travelinsider/en/travel-tips/carry-on-luggage-rules.html)
- [Traveloka: Australian domestic flight restrictions 2026](https://www.traveloka.com/en-au/explore/tips/domestic-flight-restrictions-australia-trp/530992)
- [Australian Frequent Flyer: alcohol in checked baggage](https://www.australianfrequentflyer.com.au/community/threads/new-alcohol-restrictions-in-checked-baggage.79208/) — source of the rejected 5 L claim
- [Barossa Australia: wineries and cellar doors](https://www.barossa.com/visit/food-drink/wineries/)
