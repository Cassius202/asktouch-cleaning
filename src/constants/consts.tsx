import { Home, Briefcase, Info, Star } from 'lucide-react';

export const companyLogos = [
  {
    name: "Hisense",
    src: "/companies/hisense.png",
  },
  {
    name: "Item7 go",
    src: "/companies/item7.png",
  },
  {
    name: "Goodman",
    src: "/companies/69ade2a8485be40d99ad66583e19981b.png",
  },
  {
    name: "Carrier",
    src: "/companies/7d4509d5416eece6955b75b106db00fb.png",
  },
  {
    name: "Samsung",
    src: "/companies/samsung.png",
  },
  {
    name: "LG",
    src: "/companies/lg-electronics-seeklogo.png",
  },
  {
    name: "Dettol",
    src: "/companies/dettol.png",
  },
  {
    name: "Opay",
    src: "/companies/opay-new-2023-seeklogo-2.svg",
  },
];

export const navLinks = [
  { label: 'Home', href: '/', icon: Home },
  {
    label: 'Services',
    href: '/services',
    icon: Briefcase,
    dropDown: [
      { label: 'General Services', href: '/services' },
      { label: 'Residential & Office Cleaning', href: '/services/residential-and-office-cleaning' },
      { label: 'Pest Control & Fumigation', href: '/services/pest-control-and-fumigation' },
      { label: 'Healthy & Pest-Free Spaces', href: '/services/healthy-and-pest-free-spaces' }
    ]
  },
  {
    label: 'About',
    href: '/about',
    icon: Info
  },
  {
    label: 'Reviews',
    href: '/reviews',
    icon: Star
  }
]

export const calendlyLink=""