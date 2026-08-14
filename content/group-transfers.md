# SDEP Output — Cluster C5: Group & Event Transfer Intent

Target URL: `/group-transfers-adelaide-airport-barossa-valley/`
Status: **draft, not published.** Blocks marked `[OPERATOR TO CONFIRM]` are gated on answers the
operator has not yet given. Do not ship those as written.

Revision notes:
1. Capacity corrected on operator advice: **up to 50 seats when booked in advance.**
2. Pricing model corrected on operator advice: **published fares stop at the owned fleet. Coach
   charter and anything above 26 passengers is quoted on request.** No invented coach rate appears
   anywhere on this page.
3. Lead time supplied by the operator: **one to three weeks in advance for groups above 13.** The
   "book early" placeholder is gone and the page now gives an instruction instead of advice.
4. Phone number resolved: the page uses **0447 958 346**, the same number as the homepage,
   `/terms` and the `TravelAgency` schema `telephone`. `0400 631 631` was briefly drafted in and
   has been removed. **One number sitewide, which is the correct outcome for local search.**

---

## 1. The Semantic Strategy Card

**Target Query:** `group transfer Adelaide Airport to Barossa Valley`

**Primary Intent:** TRANSACTIONAL, gated by a consultation step. The user cannot self-serve a
price because their party does not fit one vehicle. They are not shopping, they are trying to
de-risk a decision they have already made.

**The Hidden Question:** *"I am responsible for getting other people somewhere, and if it goes
wrong it is my fault. Can you actually fit us, and what will it cost before I commit?"*

The searcher is almost never the passenger. They are the best man, the EA, the maid of honour, the
eldest sibling. Their real fear is not price, it is **being the person who stranded forty people at
an airport**. Every competitor page answers "we do groups". None answers "here is exactly what
happens to a party of your size".

**Information Gain Angle (three locked frameworks):**

1. **The 13th Seat Rule.** Group transfer pricing is not linear per head, it is a **step function**.
   No competitor publishes a party-size-to-total-fare table because no competitor publishes flat
   per-vehicle fares. This operator does, so the table can be computed and printed up to the point
   where quoting takes over. The payload: **13 and 26 passengers both cost exactly $19.23 a head,
   the two cheapest numbers on the page, and the 14th guest costs $200.**
2. **Capacity is a notice problem, not a vehicle problem.** Above 13 seats the binding constraint
   is not what exists, it is how much warning the operator gets. Every competitor treats large
   capacity as an inventory claim ("we have a fleet"). Framing it as a **lead-time product** is
   both truer and more useful, and it converts the reader's vague anxiety into one concrete action:
   book earlier.
3. **The Split-Arrival Problem.** Group transfer content universally assumes the group arrives on
   one flight. Real groups converge from Sydney, Melbourne, Perth and Singapore across a
   three-hour window. The genuine decision is **single sweep versus staged pick-up**, and it is a
   cost decision, not a logistics detail. Nobody frames it.

**The published-then-quoted structure is itself a conversion asset.** Competitor pages are quote-only
from the first pixel, which reads as *"we will not tell you"*. This page pays out real numbers for
the bands it can, which earns the right to ask for the enquiry on the band it cannot. The reader
reaches the quote form already believing the price will be straight.

**Required Entities (NLP):** Adelaide Airport (ADL), Barossa Valley, Toyota HiAce Commuter, Toyota
Tarago, Sturt Highway, Gawler, Tanunda, Lyndoch, Nuriootpa, Angaston, Greenock, arrivals hall,
flight number, passenger transport vehicle accreditation, cellar door, minibus, coach, charter,
per vehicle fare, seats, wedding transfer, corporate transfer, lead time, quote.

**E-E-A-T Persona:** The operator, not a copywriter. Voice is the person who drives the road and
owns the liability: declarative, specific about capacity and law, willing to state what the
business *cannot* do. Proof is operational, not anecdotal (accreditation, SA mechanical
inspection, per-flight-number tracking, honest disclosure of vehicle markings).

> **Deliberate constraint:** no invented experience and no invented prices. This draft contains
> **zero** fabricated anecdotes, testimonials or coach rates. L1 in `DEFINITION-OF-DONE.md` removed
> three invented quotes on ACCC grounds; inventing "$1,000 for 50 seats" is the same breach in a
> different costume, and it would also be a number the operator then has to honour.

---

## 2. The Behavioral UX Card

**Hook Type:** Data-led direct answer. The fare table appears above the fold, before any prose
about why the service is good.

**Pattern Interrupts Planned:**
- Party-size fare matrix, priced to 26 and quoted beyond (the page's centre of gravity)
- The 13th Seat Rule pull-quote
- Efficient-numbers table
- Split-arrival decision table
- Coach-versus-convoy comparison
- Honest-disclosure callout on vehicle markings

**Skim-Path Logic:** Bolded words alone must deliver the whole argument:
*One flat fare per vehicle → up to 13 passengers per vehicle → the fourteenth guest costs $200 →
up to 50 seats → above 26 we quote it → book one to three weeks ahead → we track each flight number
separately → alcohol is not consumed in the vehicle → send the number and the flights → we quote in
writing.*

**Anti-Bounce Mechanism:** The fare table answers the price question the SERP sent them for, which
kills the pogo-stick, then the 13th Seat Rule creates a reason to keep reading (*"wait, does my
group cross a cliff?"*). Every large-group path terminates at the quote form, and the form is
positioned as free and non-committal so a reader without a final headcount still converts.

---

## 3. The Intent & Novelty Gate

| Check | Status |
|---|---|
| Exact search intent defined | ✅ Transactional, consultation-gated |
| Hidden question identified | ✅ "Can you fit us, and will it be my fault if it fails" |
| Information Gain locked | ✅ The 13th Seat Rule + capacity-as-lead-time + Split-Arrival |
| Answer Target formulated | ✅ 42 words, below |

**GATE: PASS.**

**Brief-level corrections applied before drafting:**

1. **`Event` schema removed from the recommended types.** No event is hosted or ticketed here.
   `Event` on a transfer service page is a structured-data misrepresentation and a manual-action
   risk. Shipping `Service` + `FAQPage` + a reference to the existing `TravelAgency` `@id`.
2. **Testimonials section from the brief: BLOCKED, not written.** See L1. The section stays absent
   from the HTML until real consented reviews exist, exactly as the homepage handles it.
3. **The brief's "4–50+ passengers" heading is deliverable and is now the page's spine.** The
   `50+` is not: 50 seats is the stated ceiling, so the page says 50 and stops.
4. **No price is published above 26 passengers.** Beyond the owned fleet the job is quoted, so the
   page asks rather than guesses. `Offer` schema is likewise capped at the published fares.

---

## 4. The Optimized Content Draft

---

# Group Transfers: Adelaide Airport to the Barossa Valley

**[ANSWER TARGET]**
Groups of up to 13 travel from Adelaide Airport to the Barossa Valley in one vehicle for a flat
$250 one way. Up to 26 passengers is priced from the published per-vehicle fares. Larger parties,
to 50 seats, are quoted on request.

**One flat fare per vehicle.** No per-head pricing, no surge on a Saturday, no separate charge for
luggage. You are told the total before you commit, in writing.

---

## Vehicle options by group size, 4 to 50 passengers

The Barossa run is about **one hour and 75 km** north up the Sturt Highway through Gawler. The fare
covers the central townships: **Tanunda, Lyndoch, Nuriootpa, Greenock and Angaston**.

Every fare below is **one way, per vehicle**, and applies in both directions.

| Party size | Vehicles | One-way total | Per person, at the top of the band |
|---|---|---|---|
| 1–4 | Sedan (Camry Hybrid or Corolla) | **$200** | $50.00 |
| 5–7 | Toyota Tarago people mover | **$230** | $32.86 |
| 8–13 | Toyota HiAce Commuter | **$250** | **$19.23** |
| 14–17 | HiAce + sedan | **$450** | $26.47 |
| 18–20 | HiAce + Tarago | **$480** | $24.00 |
| 21–26 | 2 × HiAce | **$500** | **$19.23** |
| **27–50** | **Multiple vehicles, or a chartered coach** | **Quoted on request** | Send us the number |

**[E-E-A-T MARKER]** The single-vehicle fares are published prices. Combinations up to 26 are those
same published fares added together, which is how your quote is built, and a convoy is confirmed
against the vehicles available on your date. Above 26 the job is scheduled and priced as one
operation, so it is quoted rather than guessed at on a web page.

**A weekend is two of these.** A party of 26 in and out of the Barossa is $500 each way, $1,000
return. Budget the return leg now rather than discovering it on the Sunday.

**[OPEN LOOP]** Look at the per-person column again. It falls, jumps, then falls back to **exactly
the same $19.23**. That is not a coincidence, and it is the single most useful thing on this page.

---

## The 13th Seat Rule

Group transfer pricing is not a smooth curve. It is a **staircase**, and every vehicle is a step.

Because you pay per vehicle rather than per head, **an empty seat costs you nothing and one extra
passenger can cost you $200**. The two cheapest per-person prices on this page are the two numbers
that fill a bus exactly.

> ### **Twelve travelling? The thirteenth guest is free.**
> ### **Thirteen travelling? The fourteenth costs $200.**

**[INFORMATION GAIN] The efficient numbers.** These are the party sizes where nothing is wasted:

| Party size | Vehicles | One-way total | Per person |
|---|---|---|---|
| **13** | 1 × HiAce | $250 | **$19.23** |
| **26** | 2 × HiAce | $500 | **$19.23** |

Land on one of those and you are paying the lowest per-head rate available. Land one passenger
past it and you have bought a whole extra vehicle.

**What to do with this.** If your party is sitting at 14, or at 27, the number is worth a second
look before you book. Two people driving themselves, or one guest arriving a day earlier, can
remove an entire vehicle from the bill.

**And the inverse.** If you are at 23 and debating whether to invite three more, the transfer cost
of those three people is **zero**. Groups routinely leave that on the table because every other
operator quotes per head and trains you to think per head.

**The same logic runs past 26**, which is exactly why a large quote starts with your number rather
than a price list. Give us the headcount and you will be told where the nearest efficient number
sits, including when it is worth moving one person to save a vehicle.

**[OPEN LOOP]** All of this assumes the vehicles are there on your date. Above 13 seats, that is
the part you control.

---

## Above 13 seats, book one to three weeks ahead

**Capacity here is a notice problem, not a vehicle problem.**

One HiAce is an everyday booking. **Fifty seats is a scheduled operation**: the vehicles are
committed to your date, the drivers are rostered to it, and the whole movement is planned as one
job rather than assembled on the morning. That planning is what the notice buys.

**The number to work to: one to three weeks.** Lean toward one week for a second vehicle, and
toward three for 40 seats, a coach, or a wedding weekend with several movements in it.

| Party size | Book at least |
|---|---|
| Up to 13 | Short notice is fine |
| 14–26 | **About a week** |
| 27–50, or a coach | **Up to three weeks** |

**Two things worth knowing:**

- **A provisional number is enough to start.** You do not need a final headcount to ask, and
  firming it up later is a normal part of a group booking.
- **Inside a week on a large party is not an automatic no.** It becomes a question of what is
  free rather than a plan, so call rather than assume.

**[OPEN LOOP]** Notice solves capacity. It does not solve the problem that groups almost never
arrive together.

---

## The split-arrival problem

Groups do not arrive on one flight. A wedding party converges from Sydney, Melbourne, Perth and
sometimes Singapore across a three-hour window, and the person who booked the transfer is the one
holding four different flight numbers.

**We track flights individually, by flight number.** Give us every flight number in the party and
each is tracked against its real arrival time, not the schedule.

That leaves you one genuine decision:

| | **Single sweep** | **Staged pick-up** |
|---|---|---|
| **How it works** | Everyone leaves together on the last arrival | Separate vehicles per flight group |
| **You pay** | One set of vehicle fares | One fare per vehicle dispatched |
| **Early arrivals** | Wait at the airport | Leave on landing |
| **Best when** | Arrivals are tightly clustered | Arrivals are hours apart, or a flight is interstate-late |

**The rule of thumb:** the tighter your arrival spread, the more a single sweep wins. Once the gap
between the first and last landing stretches into hours, you are paying full vehicle fares to make
people sit in a terminal, and a second run usually costs less than the goodwill does.

**Send every flight number with your enquiry** and this gets worked out for you before you have to
think about it.

**[OPERATOR TO CONFIRM]** *This section needs the free-waiting-time window and the fee beyond it
before publication. `/terms` currently carries an unfilled placeholder (L4). Until that number
exists, the sweep-versus-staged advice above cannot be made specific and this block must not go
live.*

**[OPEN LOOP]** Arrival timing is the general case. Weddings add a problem no other group has.

---

## Wedding transfers to the Barossa Valley

Wedding transport fails in a specific way: the guests arrive fine and the **schedule** breaks.
Ceremony at four, guests landing at two, one vehicle doing three runs it was never quoted for.

**Book the movements, not the day.** The airport run, the accommodation-to-venue run and the
end-of-night run are three separate jobs. Tell us all three at quote stage and they are priced
together, rather than as three panicked phone calls.

**Fifty seats covers most Barossa weddings outright.** If your guest list travels as one group, it
moves on one schedule and arrives together.

**Bring the family, including the very small ones.** Both infant restraints and booster seats are
available on request. Tell us the children's ages on the booking and the right seats are fitted
before pick-up, which on a wedding morning is one less thing.

> **[E-E-A-T MARKER] Worth knowing before your photographer arrives.**
> The cars are white, discreet and carry minimal markings. **The 13-seat buses carry more
> signage than the cars do.** If the vehicle appears in your photographs, put the party in the
> cars and the guests in the buses. Most operators will let you find this out on the day.

**[OPERATOR TO CONFIRM]** *A wedding page converts on proof. One consented sentence from a real
couple, with a first name and the township, is worth more than everything above it. Section stays
out of the HTML until that exists (L1).*

**[OPEN LOOP]** Corporate groups have the opposite problem: nobody cares how it looks, everybody
cares whether it is on time and who it invoices to.

---

## Corporate and conference transport

Conference and incentive groups need three things: the vehicles are there, the drivers are
accredited, and finance gets a document.

- **Every driver is accredited** in line with South Australian government regulations for passenger
  transport vehicles.
- **Every vehicle has passed its SA Government mechanical inspection.**
- **Regular and corporate clients can be invoiced by arrangement**, so nobody is expensing a cash
  fare from an airport rank.
- **Your people are met inside the arrivals hall with a name sign**, after baggage. No kerbside
  phone calls, no rideshare pin dropped in the wrong car park.

**Fifty seats is a conference-sized movement**, which is exactly the booking that needs the most
notice. Delegate numbers firm up late; the vehicles do not have to wait for them.

**Recurring runs are worth flagging.** If the same transfer repeats across a season of visits, say
so at quote stage and it is set up once rather than rebooked every time.

**[OPEN LOOP]** One more group type, and it comes with a rule people would rather hear now than at
the kerb.

---

## Hens, bucks and celebration groups

The 13-seat bus is the natural vehicle for a hens or bucks weekend: one flat $250 to the central
Barossa, $19.23 a head at capacity, everybody in one place. Bigger celebrations scale in exactly
the same units.

**One rule, stated plainly: alcohol is not consumed in the vehicle.** Water and soft drinks are
welcome and we would rather you drank them, especially on a wine-country day.

**Your purchases travel fine.** Sealed bottles and cases bought at a cellar door go in the boot
without any problem, which is what the buses have luggage space for.

**Nobody is trying to spoil the weekend.** The transfer is how the weekend starts safely and how
everybody gets back. The celebration happens at the cellar door.

**[OPEN LOOP]** If your group is large enough, you have a choice to make about what shows up.

---

## Coach hire, or a convoy?

**Both are available up to 50 seats, booked in advance, and both are quoted on your specific job.**
The question is which shape suits the trip, and for the Barossa it is worth thinking about rather
than defaulting to the biggest vehicle available.

**A convoy of 13-seaters wins when the day has more than one plan:**

- **It splits.** Several buses can run several itineraries, then reunite for dinner. One coach
  cannot, so the whole group moves at the speed of its slowest member all day.
- **It fits.** Access and parking for a full-size coach is not a given at every cellar door.
  Thirteen-seat buses park where a car parks.
- **It fails smaller.** One coach with a problem strands the entire party. One vehicle in a convoy
  strands a fraction of it.
- **The photos are cleaner.** For a wedding, the party rides in the discreet white cars while the
  guests follow in the buses.

**A chartered coach wins when the group genuinely moves as one block:** one arrival, one
destination, one departure, and nobody peeling off.

**Why there is no coach price on this page.** A charter is priced against your date, your itinerary
and how much notice we have, so a headline number on a web page would be either wrong or padded
enough to always be safe. **You get the real one by asking**, and it comes back in writing.

**Tell us the number and the shape of the day** and you will get a straight recommendation, not
whichever option happens to be sitting in the yard. Coach and large-convoy dates are worth locking
in **up to three weeks out**; call **0447 958 346** or send the enquiry below.

---

## How to request a group quote

Send four things and the quote comes back in writing:

1. **Number of passengers**, your best current count. A provisional number is fine.
2. **Every flight number**, plus the date and direction.
3. **The drop-off township** (Tanunda, Lyndoch, Nuriootpa, Greenock or Angaston, or tell us where
   if it is outside those).
4. **Anything oversized**: prams, golf clubs, instruments, wedding dresses, booster seats and the
   children's ages.

**Nothing is charged when you lodge a request**, and asking does not commit you to anything. You
receive a flat fare per vehicle, and payment is arranged only once you confirm. Visa, Mastercard,
bank transfer, or cash to the driver.

**If the party is over 13, send it one to three weeks out.** Capacity to 50 seats is there when it
is booked ahead, and the enquiry costs you nothing to lodge before your numbers are final.

**[CTA] Request a group quote →**
Or call **0447 958 346** if it is faster to explain out loud. Numbers that sit near a cliff are
usually a two-minute conversation.

---

## Group booking questions

**What is the largest group you can carry?**
Up to 50 seats, booked in advance. Up to 13 passengers travel in one vehicle, a Toyota HiAce
Commuter; larger parties travel as a convoy or a chartered coach, scheduled as a single job.

**Do you charge per person or per vehicle?**
Per vehicle. A sedan is $200 whether one person or four is in it, and a HiAce is $250 whether it
carries eight or 13.

**How much is a transfer for 30 or 40 people?**
That is quoted on request. Above 26 passengers the job is scheduled and priced as one operation
against your date and itinerary, so send the headcount and the date and the figure comes back in
writing.

**Why is there no price listed for a coach?**
Because a charter is priced on your specific job, and any headline number would be either wrong or
padded to cover every case. Everything up to 26 passengers is published on this page; above that,
you get the real figure by asking.

**How far ahead do we need to book for a large group?**
One to three weeks for anything above 13 passengers: about a week for a second vehicle, and up to
three weeks for 40 seats, a coach, or a wedding weekend with several movements. Up to 13
passengers can be booked at short notice.

**Will all the vehicles arrive at the same time?**
That is the intention and it is how a convoy is scheduled. Where a party arrives on flights hours
apart, staged pick-ups are often the better and cheaper arrangement.

**What happens if one flight in our group is delayed?**
Each flight is tracked by its own flight number, so a late inbound leg adjusts on our side. You do
not need to call from the plane.

**Can we drink on the way to the Barossa?**
Non-alcoholic drinks yes, alcohol no. Sealed bottles and cases bought at a cellar door travel in
the boot without any problem.

**Can you invoice our company?**
Regular and corporate clients can be invoiced by arrangement. Raise it when you request the quote.

**Can you fit child seats for a family group?**
Yes. Both infant restraints and booster seats are available on request, so a group travelling with
babies and older children is covered. Tell us the children's ages on the booking and the right
seats are fitted before pick-up.

**Does the fare cover the return trip?**
No. Fares are one way, per vehicle, and apply in both directions. A return weekend is two fares.

---

## 5. The Content Dominance Score

| Criterion | Available | Scored | Notes |
|---|---|---|---|
| Answer-First Hook | 15 | **15** | Fare table above the fold, 42-word answer target, price question resolved before any persuasion |
| Information Gain | 20 | **20** | Three frameworks absent from the SERP. The fare matrix is computable only because this operator publishes flat per-vehicle fares, and "why there is no coach price" is itself an answer no competitor gives |
| Semantic Completeness | 15 | **15** | All target entities native, including `coach hire` and `minibus`, answered on the merits rather than deflected |
| Scannability (UX) | 20 | **19** | Five tables, pull-quote, callout, bolded skim path. Page is long, which the table structure carries |
| E-E-A-T Signals | 15 | **10** | **Capped by reality.** Accreditation, inspection, markings disclosure and the coach-versus-convoy honesty are genuine. First-hand group experience and consented reviews do not exist yet, and were not invented |
| Fluff Eradication | 15 | **15** | No LLM-isms, no em dashes (house style), max three sentences per paragraph, active voice throughout |
| **Total** | 100 | **94** | **Rank-1 candidate**, reaching 99 the day one real group review lands |

**The honest read:** the ceiling on this page is not writing, it is proof. The 10/15 on E-E-A-T is
purchasable for the price of one email to a past group asking for a sentence and permission to
publish it.

---

## 6. Suggested Next Steps

**Meta title** (51 chars)
`Group Transfers: Adelaide Airport to Barossa Valley`

**Meta description** (153 chars)
`Group transfers from Adelaide Airport to the Barossa Valley. Flat fare per vehicle: 13 seat bus $250, 7 seat $230, sedan $200. Up to 50 seats, quoted free.`

**URL slug**
`/group-transfers-adelaide-airport-barossa-valley/`

**Schema types:** `Service` (with `provider` pointing at the existing `{site}/#business` `@id`,
never redefining the business) + `FAQPage`. **No `Event`.** Expose only the questions above that
have final answers, matching the discipline already used in `index.astro`.

**Schema note on the quoted band.** Do not emit an `Offer` with a `price` for the 27–50 band. Use
the published per-vehicle offers only, and represent the large-group service as a `Service` with no
`price`. A fabricated `price` for a quoted job is the same misrepresentation as printing it in the
body copy, and it is the version Google reads first.

**Cannibalization control.** The homepage owns `Adelaide Airport to Barossa Valley transfer`. This
page must own `group / minibus / coach / wedding / corporate`. Two rules:
1. **Do not repeat a homepage FAQ question verbatim in this page's `FAQPage` schema.** The
   homepage already holds the fare and the drive-time questions. Every question above is
   group-specific by design; keep it that way.
2. The homepage H1 keeps the head term. This page's H1 leads with **Group Transfers**.

**Internal links.**
- Homepage HiAce fare card ("Weddings, corporate groups, wine tours") → this page. Highest-value
  link on the site, it sits on the exact intent. **The card should also gain a "groups to 50
  seats, quoted" line**, since the homepage currently implies 13 is the ceiling.
- This page → `/terms` from the payment and cancellation lines.
- This page → homepage from the first fare-table mention, anchored on the single-passenger case.

**Implementation notes for this repo.**
- New route means a new line in `ROUTES` in `src/pages/sitemap.xml.ts`, or the page ships without
  a `lastmod` entry.
- **Fares must not be retyped.** Import or re-derive from the `fleet` array in `index.astro`
  frontmatter, per the single-source-of-truth rule that L2 established. A hardcoded `$250` on this
  page is the drift the fleet array exists to prevent. Lift `fleet` into a shared module first,
  and generate the party-size table from it rather than hand-maintaining the rows.
- **The group form needs more fields than `/api/booking` accepts.** Current payload is
  `{name,email,phone,flight?,date,passengers?,dropoff?,notes?}`, a single `flight` string, and the
  `passengers` field is unlikely to offer 50. Group enquiries carry several flight numbers, a
  headcount up to 50 and an event type. **Extend the Worker validator rather than routing it all
  through `notes`** — the whole page funnels the high-value bookings into this one endpoint, so a
  party of 40 that cannot state 40 in the form is the most expensive bug on the site.
- **Route large enquiries so they are visibly large.** A 40-seat request and a solo airport pick-up
  currently arrive as the same email. Flag headcount over 13 in the subject line so the notice the
  page keeps promising actually starts on receipt.
- **The `was/now` strike-throughs (L11) do not appear on this page.** Multi-vehicle totals built
  from unsubstantiated "was" prices would compound an open ACCC exposure across a second URL.
- **`DEFINITION-OF-DONE.md` needs a capacity correction.** L3 records the fleet as topping out at
  13, which is the single-vehicle ceiling, not the service ceiling.

**Blocking questions for the operator, in priority order.**
1. **Can two HiAces run simultaneously?** Rows 14–26 assume it. If not, the published table stops
   at 13 and the quoted band starts there instead. Everything else on the page survives either way.
2. **Free waiting time and the fee beyond it** (L4, already open). The split-arrival section is
   unpublishable without it.
3. **Is a coach quote turned around same-day, or does it take longer?** If there is a normal
   response time, saying it ("quoted within one business day") lifts form completion more than any
   other single sentence available here.
4. **One consented group review.** The cheapest available point on the score.

**NAP consistency: resolved, and worth keeping that way.**

The page carries **`0447 958 346` only**, matching the homepage, `/terms` and the schema
`telephone`. That is the right call and not merely a tidiness one: **name, address and phone
consistency is a direct local-ranking input**, and L15 records this business as absent from a
four-operator Maps pack. A second number introduced now would have been baked in at exactly the
moment the Business Profile is created, and then cross-checked against it by Google.

**Use this same number when the Business Profile is claimed (L15).** One number, one source of
truth, everywhere the business appears.

**Lead-time interpretation, worth a sanity check.** The operator gave "1 to 3 weeks". The page
graduates that by party size: about a week at 14–26, up to three weeks at 27–50 or for a coach.
That is the natural reading and it is more useful to a reader than a bare range, **but it is an
interpretation.** If the range is actually driven by season rather than size (vintage, harvest,
long weekends), the table needs rewriting around months instead.
