export type Image = {
  src: string;
  alt?: string;
};

export type Link = {
  text: string;
  href: string;
};

export type SocialLink = Link & {
  icon: "github" | "linkedin" | "rss" | "x";
};

export type Hero = {
  title?: string;
  text?: string;
  cta?: Link[];
};

export type SiteConfig = {
  title: string;
  titleSeparator: string;
  description: string;
  author: string;
  twitter: string;
  image?: Image;
  primaryNavLinks?: Link[];
  socialLinks?: SocialLink[];
  hero?: Hero;
};

const siteUrl = (import.meta.env.SITE ?? "https://nhutduong.com").replace(
  /\/$/,
  "",
);

const siteConfig: SiteConfig = {
  title: "Nhut Duong",
  titleSeparator: "|",
  description:
    "I'm a full stack developer and consultant based in Ho Chi Minh City, Vietnam, obsessed with crafting seamless, impactful digital solutions.",
  author: "Nhut Duong",
  twitter: "@nhutdm",
  image: {
    src: "/og.png",
    alt: "Nhut Duong - Full Stack Developer and Consultant in Ho Chi Minh City, Vietnam",
  },
  primaryNavLinks: [
    {
      text: "About",
      href: "/about",
    },
    {
      text: "Blog",
      href: "/blog",
    },
  ],
  socialLinks: [
    {
      text: "RSS",
      href: `${siteUrl}/rss.xml`,
      icon: "rss",
    },
    {
      text: "X",
      href: "https://x.com/nhutdm",
      icon: "x",
    },
    {
      text: "GitHub",
      href: "https://github.com/nhutdm",
      icon: "github",
    },
    {
      text: "LinkedIn",
      href: "https://www.linkedin.com/in/nhutdm/",
      icon: "linkedin",
    },
  ],
  hero: {
    title: "Hey, I'm Nhut.",
    text: "I'm a full stack developer and consultant based in Ho Chi Minh City, Vietnam, obsessed with creating innovative digital solutions. I blend sleek front-end design with robust back-end development to build seamless, impactful experiences.",
    cta: [
      {
        text: "Read the Blog",
        href: "/blog",
      },
      {
        text: "About Me",
        href: "/about",
      },
    ],
  },
};

export default siteConfig;
