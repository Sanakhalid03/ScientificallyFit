"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Brain, Heart, Leaf, Users, Check, ArrowRight, ArrowLeft } from "lucide-react";

interface Question {
  id: string;
  category: string;
  categoryIcon: typeof Brain;
  question: string;
  options: { label: string; value: string }[];
}

// Questions
const questions: Question[] = [
  {
    id: "focus",
    category: "Focus & Stress",
    categoryIcon: Brain,
    question: "How would you describe your ability to focus on demanding tasks?",
    options: [
      { label: "I can focus deeply for extended periods", value: "excellent" },
      { label: "I focus well but get distracted occasionally", value: "good" },
      { label: "I struggle to maintain focus for more than 30 minutes", value: "fair" },
      { label: "I find it very difficult to focus on anything", value: "poor" },
    ],
  },
  {
    id: "relationships",
    category: "Relationships",
    categoryIcon: Heart,
    question: "How satisfied are you with the quality of your close relationships?",
    options: [
      { label: "Very satisfied - deep, meaningful connections", value: "excellent" },
      { label: "Mostly satisfied with room for improvement", value: "good" },
      { label: "Somewhat dissatisfied - feeling disconnected", value: "fair" },
      { label: "Very dissatisfied - struggling with isolation", value: "poor" },
    ],
  },
  {
    id: "environment",
    category: "Modern Life Overload",
    categoryIcon: Leaf,
    question: "How well do you manage digital overwhelm and environmental stressors?",
    options: [
      { label: "Very well - I have clear boundaries and systems", value: "excellent" },
      { label: "Reasonably well - occasional struggles", value: "good" },
      { label: "Poorly - often overwhelmed by notifications/noise", value: "fair" },
      { label: "Very poorly - constantly stressed and reactive", value: "poor" },
    ],
  },
  {
    id: "family",
    category: "Family Routines",
    categoryIcon: Users,
    question: "How would you rate your household's daily routines and systems?",
    options: [
      { label: "Excellent - smooth, sustainable routines", value: "excellent" },
      { label: "Good - mostly functional with some chaos", value: "good" },
      { label: "Fair - routines often break down", value: "fair" },
      { label: "Poor - constant stress and disorganization", value: "poor" },
    ],
  },
];

// Module Recommendations
const moduleRecommendations = {
  mental: {
    title: "Mental Fitness",
    description:
      "Focusing on cognitive performance and stress management will have the biggest impact.",
    href: "/modules/mental",
  },
  social: {
    title: "Social & Relationship Fitness",
    description: "Investing in relationship skills and connection would be most beneficial.",
    href: "/modules/social",
  },
  environmental: {
    title: "Environmental Fitness",
    description: "Optimizing your environment appears to be a high-leverage area.",
    href: "/modules/environmental",
  },
  family: {
    title: "Family Fitness",
    description: "Creating sustainable family routines seems like the right starting point.",
    href: "/modules/family",
  },
};

// AnimatedButton
const AnimatedButton = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" }) => {
  const base =
    "px-6 py-3 rounded-xl font-semibold shadow-lg transition-all transform flex items-center justify-center gap-2 text-white cursor-pointer";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-indigo-500 to-cyan-500 hover:scale-105 hover:brightness-110 hover:shadow-xl"
      : "bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:to-gray-800 hover:scale-105 hover:shadow-lg";
  return (
    <button {...props} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
};

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (questionId: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

  const handleNext = () =>
    currentStep < questions.length - 1 ? setCurrentStep((prev) => prev + 1) : setIsComplete(true);

  const handleBack = () => currentStep > 0 && setCurrentStep((prev) => prev - 1);

  const currentQuestion = questions[currentStep];
  const hasCurrentAnswer = answers[currentQuestion.id];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const getRecommendedModule = (): keyof typeof moduleRecommendations => {
    const scores: Record<keyof typeof moduleRecommendations, number> = {
      mental: 0,
      social: 0,
      environmental: 0,
      family: 0,
    };
    const valueToScore: Record<string, number> = { excellent: 0, good: 1, fair: 2, poor: 3 };

    if (answers.focus) scores.mental += valueToScore[answers.focus] ?? 0;
    if (answers.relationships) scores.social += valueToScore[answers.relationships] ?? 0;
    if (answers.environment) scores.environmental += valueToScore[answers.environment] ?? 0;
    if (answers.family) scores.family += valueToScore[answers.family] ?? 0;

    return Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0] as keyof typeof moduleRecommendations;
  };

  return (
    <section className="min-h-[100svh] flex items-center justify-center bg-gradient-to-b from-indigo-50 via-white to-cyan-50 px-4 sm:px-8 py-12">
      <div className="w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="text-center mb-8 sm:mb-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-4xl font-extrabold mb-3 sm:mb-4 text-gray-800"
                >
                  Start Your Assessment
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm sm:text-lg text-gray-600 max-w-xl mx-auto"
                >
                  Answer a few questions to get your personalized module recommendation.
                </motion.p>
              </div>

              {/* Progress */}
              <div className="mb-6 sm:mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>
                    Question {currentStep + 1} of {questions.length}
                  </span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <currentQuestion.categoryIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-base sm:text-lg font-semibold">{currentQuestion.category}</span>
                  </div>

                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8">{currentQuestion.question}</h2>

                  <div className="grid gap-3 sm:gap-4">
                    {currentQuestion.options.map((option, idx) => (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleAnswer(currentQuestion.id, option.value)}
                        className={`w-full p-3 sm:p-4 rounded-xl border-2 text-left shadow-sm transition-all duration-200 ${
                          answers[currentQuestion.id] === option.value
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-300 hover:border-indigo-300 hover:bg-indigo-50/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              answers[currentQuestion.id] === option.value
                                ? "border-indigo-500 bg-indigo-500"
                                : "border-gray-300"
                            }`}
                          >
                            {answers[currentQuestion.id] === option.value && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-sm sm:text-base text-gray-700 font-medium">{option.label}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-10 gap-4">
                <AnimatedButton
                  onClick={handleBack}
                  className={currentStep === 0 ? "opacity-0 pointer-events-none" : ""}
                  variant="secondary"
                >
                  <ArrowLeft className="w-5 h-5 " /> Back
                </AnimatedButton>
                <AnimatedButton onClick={handleNext} disabled={!hasCurrentAnswer}>
                  {currentStep === questions.length - 1 ? "See Results" : "Next"}
                  <ArrowRight className="w-5 h-5 " />
                </AnimatedButton>
              </div>
            </motion.div>
          ) : (
            // Results
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg"
              >
                <Check className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </motion.div>

              <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 sm:mb-4 text-gray-800">Assessment Complete</h2>
              <p className="text-sm sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-xl mx-auto">
                Based on your responses, we recommend the module that will have the most impact on your wellbeing.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-xl mx-auto text-left"
              >
                <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">
                  Recommended Module
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold mt-2 mb-3">
                  {moduleRecommendations[getRecommendedModule()].title}
                </h3>
                <p className="text-gray-700 mb-6">
                  {moduleRecommendations[getRecommendedModule()].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={moduleRecommendations[getRecommendedModule()].href} className="flex-1">
                    <AnimatedButton className="w-full cursor-pointer">
                      Explore Module <ArrowRight className="w-5 h-5 ml-1" />
                    </AnimatedButton>
                  </Link>
                  <Link href="/modules" className="flex-1">
                    <AnimatedButton className="w-full cursor-pointer" variant="secondary">
                      View All Modules
                    </AnimatedButton>
                  </Link>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6 sm:mt-10">
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setAnswers({});
                    setIsComplete(false);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  Retake Assessment
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
