# Next.js + Firebase Starter Template

A production-ready starter template for building modern web applications with Next.js 14, Firebase, and TypeScript. This template provides a solid foundation with authentication, database, storage, and beautiful UI components.

## 🚀 Quick Start

1. **Clone and Install**:
```bash
git clone https://github.com/ChristianRelf/FireApp
cd your-project-name
npm install
```

2. **Run in Demo Mode** (no setup required):
```bash
npm run dev
```

3. **Configure for Production** (optional):
   - Set up Firebase project
   - Add environment variables
   - Customize branding and content

## 🛠️ What's Included

### Core Features
- **🔐 Authentication System**: Multi-provider auth (Email, Google, GitHub)
- **📊 Real-time Database**: Firestore integration with live updates
- **📁 File Storage**: Secure file uploads with Firebase Storage
- **🛡️ Protected Routes**: Route protection middleware
- **🎨 Modern UI**: shadcn/ui components with Tailwind CSS
- **📱 Responsive Design**: Mobile-first responsive layout
- **⚡ TypeScript**: Full type safety throughout

### Template Pages
- **Landing Page**: Hero section, features, and CTA templates
- **Dashboard**: Stats cards, action panels, and content areas
- **Authentication**: Sign in/up forms with social providers
- **Profile Management**: User profile with image upload
- **Layout Components**: Header and footer templates

## 🎯 Template Customization

### 1. Branding
Replace placeholder content in:
- `app/page.tsx` - Landing page content
- `components/layout/header.tsx` - App name and navigation
- `components/layout/footer.tsx` - Company information
- `app/layout.tsx` - Meta tags and SEO

### 2. Styling
- Modify `app/globals.css` for custom CSS variables
- Update `tailwind.config.ts` for theme customization
- Replace color scheme in shadcn/ui components

### 3. Features
- Add new pages in the `app/` directory
- Create custom components in `components/`
- Extend database operations in `lib/firestore.ts`
- Add new authentication providers in `lib/auth.ts`

## 🔧 Firebase Setup (Production)

### 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create new project
- Enable Authentication, Firestore, and Storage

### 2. Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Security Rules
Deploy the included security rules:
- `firestore.rules` for database security
- `storage.rules` for file storage security

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard template
│   ├── login/            # Authentication pages
│   ├── profile/          # User profile management
│   └── page.tsx          # Landing page template
├── components/           # Reusable components
│   ├── auth/            # Authentication components
│   ├── layout/          # Header and footer templates
│   └── ui/              # shadcn/ui components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and Firebase config
│   ├── auth.ts         # Authentication functions
│   ├── firebase.ts     # Firebase configuration
│   ├── firestore.ts    # Database operations
│   └── storage.ts      # File upload functions
└── types/              # TypeScript definitions
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
- Netlify
- Railway
- Digital Ocean App Platform
- AWS Amplify

## 🔒 Security Features

- Route protection with middleware
- Input validation with Zod schemas
- Firebase security rules
- File upload validation
- XSS protection

## 📖 Development Guide

### Adding New Pages
```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">New Page</h1>
      {/* Your content */}
    </div>
  );
}
```

### Database Operations
```typescript
import { createDocument, getDocuments } from '@/lib/firestore';

// Create data
await createDocument('collection', data);

// Fetch data
const items = await getDocuments('collection');
```

### File Uploads
```typescript
import { uploadImage } from '@/lib/storage';

const result = await uploadImage(file, userId);
console.log(result.url); // Download URL
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Built With

- [Next.js](https://nextjs.org/) - React framework
- [Firebase](https://firebase.google.com/) - Backend services
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---

**Ready to build your app?** Start customizing this template for your specific needs. The foundation is ready - focus on what makes your application unique! 🚀
