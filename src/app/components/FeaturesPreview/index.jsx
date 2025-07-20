"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Users, BarChart3, History, Radio } from "lucide-react";

function FeatureCard({ Icon, title, desc, bg, color }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
      <div
        className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}
      >
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}

const features = [
  {
    Icon: Users,
    title: "Multiplayer Games",
    desc: "Play with friends & family",
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    Icon: BarChart3,
    title: "Smart Analytics",
    desc: "Track wins & performance",
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    Icon: History,
    title: "Game History",
    desc: "Never lose track of games",
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    Icon: Radio,
    title: "Live watching",
    desc: "Watch games in real-time",
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
];

export default function FeaturesPreview() {
  return (
    <div className="w-full max-w-sm space-y-3 mb-8 overflow-hidden">
      {/* Desktop static view */}
      <div className="hidden md:flex flex-col space-y-3">
        {features.map((feat) => (
          <FeatureCard key={feat.title} {...feat} />
        ))}
      </div>

      {/* Mobile carousel */}
      <div className="flex md:hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            perView: 1,
            gap: 16,
            active: true,
            breakpoints: { "(min-width: 768px)": { active: false } },
          }}
          plugins={[Autoplay({ delay: 3000 })]}
        >
          <CarouselContent>
            {features.map((feat) => (
              <CarouselItem key={feat.title} className="basis-full">
                <FeatureCard {...feat} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
