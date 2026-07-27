import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { Features } from "@/components/landing/features";
import { Courses } from "@/components/landing/courses";
import { QuestionBank } from "@/components/landing/question-bank";
import { AiLearning } from "@/components/landing/ai-learning";
import { LearningPath } from "@/components/landing/learning-path";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <QuestionBank />
        <Courses />
        <AiLearning />
        <LearningPath />
        <Testimonials />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
