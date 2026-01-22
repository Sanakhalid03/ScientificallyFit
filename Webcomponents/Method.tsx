"use client";

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Zap, Users, Sun, Clock, RefreshCw } from "lucide-react";

const timelineData = [
  {
    id: 1,
    title: "Assess",
    content: "Take our science-based assessment to identify your current state and priorities.",
    icon: Zap,
  },
  {
    id: 2,
    title: "Stabilise",
    content: "Address immediate imbalances and create a foundation for sustainable change.",
    icon: Users,
  },
  {
    id: 3,
    title: "Build",
    content: "Implement targeted protocols and develop new capacities systematically.",
    icon: Sun,
  },
  {
    id: 4,
    title: "Track",
    content: "Monitor progress with objective metrics and subjective wellbeing indicators.",
    icon: Clock,
  },
  {
    id: 5,
    title: "Adapt",
    content: "Continuously refine your approach based on data and changing life circumstances.",
    icon: RefreshCw,
  },
];

export default function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline timelineData={timelineData } />;
}
