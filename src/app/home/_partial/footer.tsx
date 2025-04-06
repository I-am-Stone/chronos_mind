import { Card, CardContent } from '@/components/ui/card';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer = () => {
  const footerSections: FooterSection[] = [
    {
      title: "About",
      links: [
        { label: "Company", href: "#" },
        { label: "Team", href: "#" },
        { label: "Careers", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "#" },
        { label: "Guide", href: "#" },
        { label: "Help Center", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Security", href: "#" }
      ]
    },
    {
      title: "Connect",
      links: [
        { label: "Twitter", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Facebook", href: "#" }
      ]
    }
  ];

  return (
    <Card className="relative bg-gradient-to-b from-white-900 to-white-900 text-gray-300 rounded-none pt-8 shadow-lg overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(255,255,255,0.05),transparent)]" />
      <CardContent className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index} className="relative group">
              <h3 className="text-black font-semibold mb-4 relative inline-block font-cabinet-grotesk">
                {section.title}
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-orange-500/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </h3>
              <ul className="space-y-2 font-plus-jakarta">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className=" text-black relative inline-block hover:text-orange-500 transition-colors duration-200 group/link"
                    >
                      <span className="relative z-10 group-hover/link:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover/link:opacity-100 -skew-x-12 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="relative border-t border-gray-800/80 mt-12 pt-8 text-center">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/10 to-transparent" />
          <p className="text-black font-plus-jakarta hover:text-gray-300 transition-colors duration-300">
            &copy; {new Date().getFullYear()} Mind. All rights reserved.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Footer;