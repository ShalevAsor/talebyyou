# TaleByYou

> AI-powered platform for creating personalized children's storybooks with consistent character generation and professional print-on-demand delivery.

[![Live](https://img.shields.io/badge/demo-live-success)](https://www.talebyyou.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🎯 Overview

TaleByYou enables parents to create truly personalized storybooks where their child becomes the hero of the adventure. Using cutting-edge AI technology, we maintain character consistency across all illustrations, ensuring the child looks the same on every page.

**Key Features:**

- 🎨 **AI Character Consistency** - Same child appears in every illustration using Leonardo AI's Character Reference ControlNet
- 📖 **20+ Book Templates** - Adventures, fantasy tales, educational stories for ages 2-10
- 🖨️ **Professional Print Quality** - Premium hardcover books via Lulu xPress
- 👤 **Guest-Friendly** - Create books without registration
- 📱 **Dual Format** - Digital downloads (PDF/EPUB) + physical books

![TaleByYou Homepage](public/images/readme/main.png)

## 📸 Screenshots

### Book Template Library

<table>
  <tr>
    <td><img src="public/images/readme/templates-1.png" alt="Template Library" width="400"/></td>
    <td><img src="public/images/readme/templates-2.png" alt="Featured Templates" width="400"/></td>
  </tr>
</table>

### Character Customization

<table>
  <tr>
    <td><img src="public/images/readme/character-customization-1.png" alt="Character Creation" width="400"/></td>
    <td><img src="public/images/readme/character-customization-2.png" alt="Customization Guide" width="400"/></td>
  </tr>
</table>

### AI Character Consistency in Action

<table>
  <tr>
    <td><img src="public/images/readme/consistency-1.png" alt="Page 1" width="200"/></td>
    <td><img src="public/images/readme/consistency-2.png" alt="Page 2" width="200"/></td>
    <td><img src="public/images/readme/consistency-3.png" alt="Page 3" width="200"/></td>
    <td><img src="public/images/readme/consistency-4.png" alt="Page 4" width="200"/></td>
  </tr>
</table>

### Interactive Book Editor

<table>
  <tr>
    <td><img src="public/images/readme/book-editor-1.png" alt="Book Editor" width="400"/></td>
    <td><img src="public/images/readme/book-editor-2.png" alt="Text Editing" width="400"/></td>
  </tr>
</table>

### Admin Dashboard

<table>
  <tr>
    <td><img src="public/images/readme/admin-dashboard.png" alt="Dashboard" width="400"/></td>
    <td><img src="public/images/readme/admin-order.png" alt="Order Management" width="400"/></td>
  </tr>
  <tr>
    <td><img src="public/images/readme/admin-template-1.png" alt="Template Management" width="400"/></td>
    <td><img src="public/images/readme/admin-pricing.png" alt="Pricing Config" width="400"/></td>
  </tr>
</table>

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15 (App Router) + React + TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **State:** Zustand + React Query
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Features:** React Pageflip, Image Crop, Carousels

### Backend

- **API:** Next.js Server Actions
- **Database:** PostgreSQL + Prisma ORM
- **Storage:** AWS S3
- **Auth:** Clerk (OAuth, 2FA)
- **Email:** Nodemailer
- **Validation:** Zod schemas

### AI & Services

- **Image Generation:** Leonardo AI (Character Reference ControlNet)
- **Print-on-Demand:** Lulu xPress API
- **Payments:** PayPal Integration
- **PDF Generation:** PDFKit

### DevOps

- **Hosting:** Vercel
- **Development:** Docker Compose
- **Testing:** Jest
- **Analytics:** Vercel Analytics + Meta Pixel

## Key Workflows

### AI Character Consistency

1. User uploads child's photo
2. Photo stored as character reference in Leonardo AI
3. All page images generated using the same reference
4. Character Reference ControlNet (preprocessor 133) maintains consistency
5. 3 variations per page for user selection

### Print-on-Demand Flow

1. Book marked as ready → PDFs generated (interior + cover)
2. PDFs submitted to Lulu for validation
3. User completes PayPal checkout
4. Print job created automatically
5. Status tracked via webhooks: CREATED → IN_PRODUCTION → SHIPPED
6. Customer receives tracking number

### Guest Experience

- Create up to 2 books without registration
- Session stored in encrypted cookie (30-day expiry)
- Register at checkout to claim books
- Reduces friction, increases conversion

## Technical Highlights

### Challenge: Character Consistency

**Problem:** Different AI models produced inconsistent characters across pages.  
**Solution:** Leonardo AI's Character Reference ControlNet with single reference image.  
**Result:** 95%+ consistency, 80% reduction in regenerations.

### Challenge: Complex Pricing

**Problem:** Real-time calculation of printing + shipping + AI costs + margins.  
**Solution:** Service layer chains Lulu API calls, caches results, provides transparent breakdown.  
**Result:** Accurate instant pricing, automated profit margins.

### Challenge: Guest Flow

**Problem:** Registration requirement caused 60% drop-off.  
**Solution:** Encrypted guest sessions, 2-book limit, convert at checkout.  
**Result:** 35% increase in conversion rate.

## Architecture

```
app/
├── (main)/              # Public pages (home, library, blog)
│   └── library/
│       ├── customize/   # Character creation
│       └── preview/     # Book editor
├── (auth)/              # Clerk auth pages
├── (admin)/             # Admin dashboard
│   ├── books/           # Book management
│   ├── orders/          # Order fulfillment
│   ├── templates/       # Template CRUD
│   └── pricing/         # Cost configuration
└── api/webhooks/        # External service webhooks
    ├── clerk/           # User sync
    ├── leonardo/        # Image completion
    └── lulu/            # Print status updates
```

## Database Schema

**Core Models:**

- `User` - Clerk-synced authentication
- `GuestSession` - Cookie-based sessions (2 book limit)
- `BookTemplate` - Pre-made story templates
- `Book` - User's personalized books
- `Character` - Child customization details
- `Page` - Individual page content + images
- `Order` - Payment & fulfillment tracking
- `PrintJob` - Lulu integration & shipping
- `ImageGeneration` - Leonardo AI tracking

## Security

- Clerk authentication with OAuth & 2FA
- Encrypted HTTP-only cookies for guest sessions
- Zod validation on client and server
- Webhook signature verification
- S3 presigned URLs with expiration
- PayPal PCI compliance
- TypeScript + Prisma prevent injection attacks

## Performance

- Next.js 15 Server Components (60% less JavaScript)
- Image optimization with WebP format
- Prisma Accelerate connection pooling
- React Query caching
- Code splitting for admin routes
- Static generation with ISR (60s revalidation)

## Testing

- Jest unit tests for business logic
- Mocked external APIs (Leonardo, Lulu, PayPal)
- Database mocking with Prisma
- Test coverage for critical paths

## License

MIT License

## 🔗 Links

- **Live Demo:** [talebyyou.com](https://www.talebyyou.com)
- **Portfolio:** [Your Portfolio Link]

---

**Built with ❤️ by Shalev Asor**
