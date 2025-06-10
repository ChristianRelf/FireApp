'use client';

import Link from 'next/link';
import { Shield, Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-white">
      <div className="w-full max-w-[1920px] mx-auto px-8 lg:px-16 xl:px-24">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left max-w-6xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl">JROTC Command</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Excellence in leadership training and character development. Building tomorrow's leaders today.
              </p>
              <div className="flex space-x-3 justify-center md:justify-start">
                <Link 
                  href="#" 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link 
                  href="#" 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link 
                  href="#" 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Program</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/cadets" className="text-slate-300 hover:text-white transition-colors">
                    Cadet Management
                  </Link>
                </li>
                <li>
                  <Link href="/units" className="text-slate-300 hover:text-white transition-colors">
                    Unit Organization
                  </Link>
                </li>
                <li>
                  <Link href="/awards" className="text-slate-300 hover:text-white transition-colors">
                    Awards System
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-slate-300 hover:text-white transition-colors">
                    Events & Training
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-slate-300 hover:text-white transition-colors">
                    Training Materials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-300 hover:text-white transition-colors">
                    Regulations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-300 hover:text-white transition-colors">
                    Forms & Documents
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-300 hover:text-white transition-colors">
                    Support Center
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Contact</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@jrotccommand.edu</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>123 Academy Drive</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-slate-400">
                &copy; 2024 JROTC Command System. Building leaders of character.
              </p>
              <div className="flex space-x-6 text-sm text-slate-400">
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}