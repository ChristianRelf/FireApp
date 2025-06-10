import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="w-full max-w-[1920px] mx-auto px-8 lg:px-16 xl:px-24">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left max-w-6xl mx-auto">
            <div className="space-y-3">
              <h3 className="font-semibold">Your App Name</h3>
              <p className="text-sm text-muted-foreground">
                Replace this with your app description and branding information.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Connect</h4>
              <div className="flex space-x-3 justify-center md:justify-start">
                <Link 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2024 Your App Name. Built with this template.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}