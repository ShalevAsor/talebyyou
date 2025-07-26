// src/components/home/HeroStats.tsx
import { BookOpen, Heart, Leaf, Sparkles } from "lucide-react";
import React from "react";

const HeroStats: React.FC = () => {
  const stats = [
    {
      icon: BookOpen,
      value: "15+",
      label: "Story Templates",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      icon: Heart,
      value: "100%",
      label: "Personalized",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      icon: Sparkles,
      value: "Premium",
      label: "Quality",
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-rose-50",
      textColor: "text-rose-600",
    },
    {
      icon: Leaf,
      value: "Eco",
      label: "Friendly",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className={`${stat.bgColor} rounded-xl p-4 text-center relative overflow-hidden group hover:scale-105 transition-all duration-200 border border-white/50 shadow-sm`}
          >
            {/* Gradient overlay on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-200`}
            />

            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-200`}
            >
              <IconComponent className="h-4 w-4 text-white" />
            </div>

            {/* Value */}
            <div
              className={`font-bold ${stat.textColor} text-xl mb-1 group-hover:scale-105 transition-transform duration-200`}
            >
              {stat.value}
            </div>

            {/* Label */}
            <div className="text-slate-700 text-sm font-medium">
              {stat.label}
            </div>

            {/* Subtle shine effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </div>
        );
      })}
    </div>
  );
};

export default HeroStats;
