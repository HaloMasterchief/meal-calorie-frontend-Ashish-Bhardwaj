import { Calculator, History, TrendingUp, Shield } from "lucide-react";

export function FeaturesSection() {
  const featureList = [
    {
      icon: Calculator,
      title: "Instant Calorie Calculation",
      desc: "Get accurate calorie counts for any dish in seconds using our advanced AI technology.",
    },
    {
      icon: History,
      title: "Meal History Tracking",
      desc: "Keep track of all your meals and view your eating patterns over time.",
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      desc: "Visualize your calorie intake with detailed charts and progress reports.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      desc: "Your data is encrypted and secure. We never share your personal information.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose CalorieTracker?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to track your nutrition journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featureList.map((feat, i) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={i}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
