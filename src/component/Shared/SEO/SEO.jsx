import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "ABADIQ Medical Billing | Healthcare Revenue Cycle Management",
  description = "ABADIQ is a trailblazing leader in modern medical billing services, dedicated to revolutionizing the financial health of healthcare providers. We bring a synergy of cutting-edge technology, expert professionals, and unmatched commitment to every aspect of the billing journey.",
  keywords = "medical billing, healthcare billing, medical coding, RCM, revenue cycle management, healthcare services, medical billing company, ABADIQ",
  canonicalUrl = "",
  ogType = "website",
  ogImage = "/logo.png",
  twitterCard = "summary_large_image",
}) => {
  const site = "https://abadiq.com";
  const canonical = canonicalUrl ? `${site}${canonicalUrl}` : site;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${site}${ogImage}`} />
      <meta property="og:site_name" content="ABADIQ Medical Billing" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${site}${ogImage}`} />

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ABADIQ Medical Billing",
          url: site,
          logo: `${site}/logo.png`,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-800-123-4567",
            contactType: "customer service",
          },
          description:
            "ABADIQ is a leading provider of medical billing services for healthcare providers.",
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
