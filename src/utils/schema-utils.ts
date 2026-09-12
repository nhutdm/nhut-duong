import type {
  BlogPosting,
  Person,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";
import siteConfig from "@/data/site-config";
import type { BlogPost } from "@/types";

function getSiteUrl(fallbackOrigin?: string): string {
  const site = import.meta.env.SITE;
  if (site) {
    return site.endsWith("/") ? site : `${site}/`;
  }
  return fallbackOrigin || "https://nhutduong.com/";
}

export function createWebSiteSchema(url: string): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    description: siteConfig.description,
    url: url,
    author: {
      "@type": "Person",
      name: siteConfig.author,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
    },
  };
}

export function createPersonSchema(): WithContext<Person> {
  const socialLinks = siteConfig.socialLinks || [];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    jobTitle: "Full Stack Developer and Consultant",
    worksFor: {
      "@type": "Organization",
      name: "Bosch Digital",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ho Chi Minh City",
      addressCountry: "Vietnam",
    },
    url: new URL("about", getSiteUrl()).toString(),
    sameAs: socialLinks.map((link) => link.href),
    description:
      "I'm a full stack developer and consultant based in Ho Chi Minh City, Vietnam, obsessed with crafting seamless, impactful digital solutions.",
    knowsAbout: [
      "Full Stack Development",
      "Web Development",
      "Frontend Development",
      "Backend Development",
      "Software Engineering",
      "Technical Consulting",
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Astro",
    ],
  };
}

export function createWebPageSchema(
  url: string,
  title: string,
  description: string,
  dateModified?: Date,
): WithContext<WebPage> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    ...(dateModified ? { dateModified: dateModified.toISOString() } : {}),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.title,
      url: getSiteUrl(url),
    },
  };
}

export function createBlogPostingSchema(
  post: BlogPost,
  url: string,
  authorSchema: WithContext<Person>,
): WithContext<BlogPosting> {
  const { title, excerpt, publishDate, updatedDate, tags = [] } = post.data;

  const blogUrl = url.startsWith("http")
    ? url
    : new URL(url, getSiteUrl()).toString();
  const blogBaseUrl = new URL("blog", getSiteUrl()).toString();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    url: blogUrl,
    datePublished: publishDate.toISOString(),
    dateModified: (updatedDate || publishDate).toISOString(),
    author: authorSchema,
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
    },
    isPartOf: {
      "@type": "Blog",
      name: `${siteConfig.title} Blog`,
      url: blogBaseUrl,
    },
    keywords: tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogUrl,
    },
  };
}
