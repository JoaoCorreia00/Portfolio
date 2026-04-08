import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#12181f] border-t border-[#1a1a1a] py-13">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[#888] text-m">
          © {new Date().getFullYear()} João Correia. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/JoaoCorreia00"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#888] hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={25} />
          </a>
          <a
            href="https://linkedin.com/in/joaocorreia00"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#888] hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={25} />
          </a>
          <a
            href="mailto:JCorreia_jpbc@hotmail.com"
            className="text-[#888] hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={25} />
          </a>
          <a
            href="https://www.instagram.com/joao.correia.14/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#888] hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={25} />
          </a>
        </div>
      </div>
    </footer>
  );
}