# Catsitting Brno 🐾

Website giới thiệu dịch vụ hlídání koček (trông mèo tại nhà) ở Brno. Tiếng Séc là ngôn ngữ chính (`/`), tiếng Anh ở `/en`.

**Công nghệ:** Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · shadcn/ui (Base UI) · Lucide · Framer Motion · Zod

## Chạy dự án

```bash
npm install
npm run dev          # http://localhost:3000
npx tsc --noEmit     # typecheck
npm run lint
npm run build && npm start
```

Yêu cầu Node.js 20.9 trở lên.

## Cần làm trước khi công bố

| Việc | Ở đâu |
| --- | --- |
| Tên công ty, logo | `src/config/site.ts` → `name`, `logo` (đặt file vào `public/`, ví dụ `"/logo.svg"`) |
| Điện thoại, email, địa chỉ, IČO, giờ làm việc, mạng xã hội | `src/config/site.ts` – mọi giá trị `null` sẽ hiện "Doplníme brzy" hoặc bị ẩn |
| Tên miền | biến `NEXT_PUBLIC_SITE_URL` (canonical, sitemap, Open Graph) |
| Gửi form qua email | biến `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL` (xem dưới) |
| Bảng giá | `src/content/cs.ts` + `en.ts` → `pricing` (hiện là "Cena na vyžádání") |
| Dịch vụ, văn bản | `src/content/cs.ts` (tiếng Séc) và `src/content/en.ts` (tiếng Anh) |
| Đánh giá khách hàng thật | `src/content/testimonials.ts` – khi danh sách có dữ liệu, trang chủ tự hiện mục Reference |
| Ảnh thật của bạn | thêm vào `public/images/`, khai báo trong `src/lib/images.ts`, `src/content/gallery.ts` |
| Ochrana osobních údajů | rà soát lại văn bản trong `cs.ts`/`en.ts` → `privacy` (thời hạn lưu 12 tháng là đề xuất) |
| Obchodní podmínky | hiện là trang "đang chuẩn bị" (`noindex`, không có trong sitemap). Khi có điều khoản chính thức: sửa `src/components/pages/terms-page.tsx`, bỏ `noIndex` trong 2 file route và bỏ `"terms"` khỏi `EXCLUDED` trong `src/app/sitemap.ts` |

Nên nhờ luật sư kiểm tra trang GDPR và điều khoản dịch vụ trước khi công bố.

## Form đặt lịch (poptávka)

- Kiểm tra dữ liệu bằng cùng một schema Zod ở trình duyệt và trên server (`src/lib/inquiry.ts`).
- Chống spam: ô honeypot ẩn, thời gian điền tối thiểu 3 giây, giới hạn 5 lần gửi / 10 phút / IP (`src/lib/rate-limit.ts`, lưu trong bộ nhớ của từng instance; nếu chạy nhiều instance nên dùng Redis, ví dụ Upstash).
- Gửi email qua [Resend](https://resend.com). Khi **chưa** cấu hình đủ 3 biến, form báo rõ "Formulář zatím není aktivní" và **không** giả vờ đã gửi.

Cấu hình: sao chép `.env.example` thành `.env.local` rồi điền:

```
NEXT_PUBLIC_SITE_URL=https://www.ten-mien.cz
RESEND_API_KEY=re_...
INQUIRY_TO_EMAIL=ban@ten-mien.cz
INQUIRY_FROM_EMAIL="Catsitting Brno <poptavky@ten-mien.cz>"   # tên miền phải được xác minh trong Resend
```

## SEO

- Meta title/description, canonical, hreflang (`cs`, `en`, `x-default`), Open Graph, Twitter card cho từng trang (`src/lib/seo.ts`).
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest` sinh tự động.
- JSON-LD `LocalBusiness` chỉ được xuất ra khi đã có điện thoại/email **và** địa chỉ đầy đủ trong `site.ts` (`src/lib/structured-data.ts`).
- Tất cả trang được prerender tĩnh; ảnh được tối ưu bằng `next/image` (AVIF/WebP, blur placeholder); hiệu ứng xuất hiện khi cuộn dùng CSS thuần nên nội dung luôn có sẵn trong HTML.

## Cookie

Website không dùng cookie theo dõi hay analytics nên **không cần** cookie banner. Nếu sau này thêm Google Analytics, Meta Pixel…, cần thêm banner xin đồng ý trước khi tải các script đó.

## Ảnh

Ảnh minh họa lấy từ Unsplash (Unsplash License – được dùng thương mại). Trang Galerie ghi rõ đây là ảnh minh họa, không phải khách hàng thật. Chỉ đăng ảnh mèo của khách khi có sự đồng ý của chủ nuôi.

## Cấu trúc

```
src/
  app/
    (cs)/…            các trang tiếng Séc: /, /o-nas, /sluzby, /cenik, /jak-to-funguje, /galerie, /kontakt, …
    (en)/en/…         các trang tiếng Anh: /en, /en/about, /en/services, …
    actions/          server action gửi form
    global-not-found.tsx, sitemap.ts, robots.ts, manifest.ts, icon.svg, globals.css (bảng màu)
  components/
    pages/            nội dung từng trang (dùng chung cho 2 ngôn ngữ)
    sections/         các khối giao diện (hero, dịch vụ, quy trình, CTA, FAQ…)
    contact/ gallery/ site/ motion/ ui/
  config/site.ts      thông tin doanh nghiệp
  content/            toàn bộ văn bản (cs.ts, en.ts), ảnh gallery, đánh giá
  lib/                i18n, SEO, validation, email, rate limit
```

Đổi bảng màu: sửa biến CSS ở đầu `src/app/globals.css`.
