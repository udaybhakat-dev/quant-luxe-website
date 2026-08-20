import { useSeo } from "../hooks/useSeo";
import { Hero } from "../components/sections/Hero";
import { BrandManifesto } from "../components/sections/BrandManifesto";
import { SignatureScents } from "../components/sections/SignatureScents";
import { TheCraft } from "../components/sections/TheCraft";
import { SocialProof } from "../components/sections/SocialProof";
import { FindYourScent } from "../components/sections/FindYourScent";
import { JournalPreview } from "../components/sections/JournalPreview";

export function HomePage() {
  useSeo({
    title: "Eleganz | Luxury Perfume for Men by Quant Luxe",
    description:
      "Eleganz is a luxury perfume for men by Quant Luxe Lifestyle. Discover Solaris — a long-lasting, fresh-woody fragrance crafted for Indian summers.",
    path: "/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Eleganz",
      brand: "Eleganz",
      parentOrganization: {
        "@type": "Organization",
        name: "Quant Luxe Lifestyle Pvt. Ltd.",
      },
    },
  });

  return (
    <>
      <Hero />
      <BrandManifesto />
      <SignatureScents />
      <TheCraft />
      <SocialProof />
      <FindYourScent />
      <JournalPreview />
    </>
  );
}
