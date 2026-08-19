import { Navigation } from "./components/sections/Navigation";
import { Hero } from "./components/sections/Hero";
import { BrandManifesto } from "./components/sections/BrandManifesto";
import { SignatureScents } from "./components/sections/SignatureScents";
import { TheCraft } from "./components/sections/TheCraft";
import { SocialProof } from "./components/sections/SocialProof";
import { FindYourScent } from "./components/sections/FindYourScent";
import { JournalPreview } from "./components/sections/JournalPreview";
import { NewsletterFooter } from "./components/sections/NewsletterFooter";

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <BrandManifesto />
        <SignatureScents />
        <TheCraft />
        <SocialProof />
        <FindYourScent />
        <JournalPreview />
      </main>
      <NewsletterFooter />
    </>
  );
}

export default App;
