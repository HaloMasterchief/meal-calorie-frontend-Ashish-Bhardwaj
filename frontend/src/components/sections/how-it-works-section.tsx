export function HowItWorksSection() {
  const stepData = [
    {
      num: "1",
      heading: "Enter Your Dish",
      desc: "Simply type in the name of the dish you want to calculate calories for.",
    },
    {
      num: "2",
      heading: "Specify Servings",
      desc: "Tell us how many servings you plan to eat for accurate calorie calculation.",
    },
    {
      num: "3",
      heading: "Get Instant Results",
      desc: "Receive accurate calorie information instantly using our AI-powered system.",
    },
    {
      num: "4",
      heading: "Track Your Progress",
      desc: "Save your meals and monitor your calorie intake over time.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get started in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {stepData.map((item, idx) => (
            <div key={item.num} className="text-center relative">
              {idx < stepData.length && (
                <div className="hidden lg:block absolute top-6 left-0 w-full h-0.5 bg-gray-300 transform " />
              )}
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full text-lg font-bold mb-4 relative z-10">
                {item.num}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.heading}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
