import { Trophy } from "lucide-react";

import FeaturesPreview from "@/app/components/FeaturesPreview";
import SignInSection from "@/app/components/SignInSection";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      {/* Header Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* App Logo/Icon */}
        <div className="mb-8 flex justify-center items-center flex-row gap-4">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center shadow-lg">
            <Trophy className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </div>
          <div className="text-start">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Uno Scorer
            </h1>
            <p className="text-sm md:text-lg text-gray-600">
              Track your games with friends
            </p>
          </div>
        </div>

        {/* Features Preview */}
        <FeaturesPreview />

        {/* Separator */}
        <SignInSection />
      </div>
    </>
  );
}
