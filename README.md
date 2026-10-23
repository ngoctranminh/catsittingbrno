# Catsitting Brno 🐾

Hotový web pro službu hlídání koček v Brně. Je ve dvou jazycích: čeština na hlavní adrese (`/`) a angličtina na `/en`.

Obsahuje tyto stránky: úvod, o nás, služby, ceník, jak to funguje, galerie, kontakt s poptávkovým formulářem, ochrana osobních údajů a obchodní podmínky.

**Použité technologie:** Next.js 16 · TypeScript · Tailwind CSS 4 · shadcn/ui · Framer Motion · Zod. Web běží na Cloudflare Workers.

---

## 1. Spuštění na vlastním počítači

Budete potřebovat **Node.js 20.9 nebo novější** ([nodejs.org](https://nodejs.org)).

```bash
npm install      # stáhne potřebné balíčky (stačí jednou)
npm run dev      # spustí web na http://localhost:3000
```

Když v kódu něco změníte, web se v prohlížeči sám obnoví.

Další užitečné příkazy:

```bash
npm run lint         # kontrola kódu
npx tsc --noEmit     # kontrola typů
npm run build        # zkušební sestavení webu
```

---

## 2. Co upravit, než web spustíte

Všechny texty a údaje jsou na několika místech. Programovat nemusíte, stačí přepsat hodnoty v uvozovkách.

| Co | Kde |
| --- | --- |
| Název firmy, logo, telefon, e-mail, adresa, IČO, otevírací doba, Instagram, Facebook | `src/config/site.ts` |
| Texty v češtině | `src/content/cs.ts` |
| Texty v angličtině | `src/content/en.ts` |
| Ceník | `src/content/cs.ts` a `src/content/en.ts`, část `pricing` |
| Recenze zákazníků | `src/content/testimonials.ts` (když je vyplníte, na úvodní stránce se samy zobrazí) |
| Fotky | soubory dejte do `public/images/` a zapište je do `src/lib/images.ts` a `src/content/gallery.ts` |
| Barvy webu | proměnné na začátku souboru `src/app/globals.css` |

**Dobré vědět:**

- Když v `site.ts` necháte hodnotu `null`, web ji skryje nebo napíše „Doplníme brzy". Nic si nevymýšlí.
- Stránka **Obchodní podmínky** je zatím jen „připravujeme" a vyhledávače ji neindexují. Až budete mít skutečné podmínky, upravte `src/components/pages/terms-page.tsx`, odstraňte `noIndex` ve dvou souborech stránky a smažte `"terms"` ze seznamu `EXCLUDED` v `src/app/sitemap.ts`.
- Texty o **ochraně osobních údajů (GDPR)** a obchodní podmínky doporučujeme před spuštěním nechat zkontrolovat právníkem.

---

## 3. Nastavení (proměnné prostředí)

Zkopírujte soubor `.env.example` jako `.env.local` a doplňte hodnoty:

```
NEXT_PUBLIC_SITE_URL=https://www.vase-domena.cz
RESEND_API_KEY=re_...
INQUIRY_TO_EMAIL=vy@vase-domena.cz
INQUIRY_FROM_EMAIL="Catsitting Brno <poptavky@vase-domena.cz>"
```

| Proměnná | K čemu slouží |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | adresa vašeho webu (pro Google, sitemapu a náhledy při sdílení) |
| `RESEND_API_KEY` | klíč ze služby [Resend](https://resend.com), přes kterou se posílají e-maily |
| `INQUIRY_TO_EMAIL` | kam mají chodit poptávky (víc adres oddělte čárkou) |
| `INQUIRY_FROM_EMAIL` | odesílatel e-mailu. Doména musí být ověřená v Resendu. |

Soubor `.env.local` se nenahrává na GitHub, takže vaše hesla zůstanou jen u vás.

---

## 4. Poptávkový formulář

- Zákazník vyplní formulář a vám přijde e-mail.
- Dokud nejsou nastavené všechny tři e-mailové proměnné, formulář napíše „Formulář zatím není aktivní" a nic neodešle. Nepředstírá, že zpráva odešla.
- **Ochrana proti spamu:** skryté pole pro roboty, minimální doba vyplnění 3 sekundy a nejvýš 5 odeslání za 10 minut z jedné IP adresy.

---

## 5. Zveřejnění na internetu (Cloudflare)

Web je připravený pro [Cloudflare Workers](https://workers.cloudflare.com). Základní tarif je zdarma.

1. Založte si účet na Cloudflare.
2. Přihlaste se v terminálu:
   ```bash
   npx wrangler login
   ```
3. Uložte tajné údaje přímo do Cloudflare (každý příkaz se zeptá na hodnotu):
   ```bash
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put INQUIRY_TO_EMAIL
   npx wrangler secret put INQUIRY_FROM_EMAIL
   ```
4. Ověřte, že máte v `.env.local` správnou `NEXT_PUBLIC_SITE_URL`. Načítá se při sestavení webu.
5. Nahrajte web:
   ```bash
   npm run deploy
   ```
6. V Cloudflare k webu připojte svou doménu (Workers → váš worker → Settings → Domains & Routes).

Pokud chcete web před zveřejněním vyzkoušet tak, jak poběží na Cloudflare, použijte `npm run preview`.

Název workeru je `catsittingbrno` a najdete ho v souboru `wrangler.jsonc`. Pokud ho změníte, upravte ho tam na obou místech (`name` a `service`).

---

## 6. SEO (vyhledávače)

O základní SEO je postaráno:

- každá stránka má vlastní název a popis, správné odkazy mezi českou a anglickou verzí a náhled pro sdílení na sociálních sítích;
- `sitemap.xml`, `robots.txt` a manifest se vytvoří samy;
- údaje o firmě pro Google (`LocalBusiness`) se zobrazí, jakmile v `site.ts` vyplníte telefon nebo e-mail **a** celou adresu;
- všechny stránky se připraví předem, takže se načítají velmi rychle;
- fotky se automaticky zmenšují a převádějí do formátu WebP.

---

## 7. Cookies

Web nepoužívá žádné sledovací cookies ani analytiku, proto **nepotřebuje cookie lištu**. Pokud později přidáte třeba Google Analytics nebo Meta Pixel, budete muset přidat lištu se souhlasem.

---

## 8. Fotky

Ukázkové fotky koček jsou z [Unsplash](https://unsplash.com) a podle jeho licence je smíte použít i komerčně. V galerii je uvedeno, že jde o ilustrační fotky. Fotky koček svých zákazníků zveřejňujte jen s jejich souhlasem.

---

## 9. Struktura projektu

```
src/
  app/
    (cs)/…          české stránky: /, /o-nas, /sluzby, /cenik, /jak-to-funguje, /galerie, /kontakt …
    (en)/en/…       anglické stránky: /en, /en/about, /en/services …
    actions/        odeslání formuláře
    globals.css     barvy a styly
  components/
    pages/          obsah jednotlivých stránek (společný pro oba jazyky)
    sections/       bloky stránek (úvodní banner, služby, postup, FAQ …)
    contact/ gallery/ site/ motion/ ui/
  config/site.ts    údaje o firmě
  content/          všechny texty (cs.ts, en.ts), galerie, recenze
  lib/              jazyky, SEO, kontrola formuláře, e-maily, ochrana proti spamu
public/             obrázky, logo, ikona
```
