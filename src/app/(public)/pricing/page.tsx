import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react"; // Added XCircle for features not included

export default function PricingPage() {
  const tiers = [
    { 
      name: "Starter", 
      price: "$99", 
      desc: "Get your foot in the door.",
      applications: "150 Job Applications",
      perks: [
        { text: "Free Resume Review", included: true },
        { text: "Custom Resume & Cover Letter", included: false },
        { text: "Dedicated Assistant", included: false },
        { text: "LinkedIn Profile Guidance", included: false },
      ],
      isPopular: false
    },
    { 
      name: "Pro", 
      price: "$299", 
      desc: "For a serious job search.",
      applications: "500 Job Applications",
      perks: [
        { text: "Free Resume Review", included: true },
        { text: "Custom Resume & Cover Letter", included: false }, // This line has been changed
        { text: "Dedicated Assistant", included: true },
        { text: "LinkedIn Profile Guidance", included: false },
      ],
      isPopular: true
    },
    { 
      name: "Premium", 
      price: "$499", 
      desc: "For a comprehensive career launch.",
      applications: "1000 Job Applications",
      perks: [
        { text: "Free Resume Review", included: true },
        { text: "Custom Resume & Cover Letter", included: true },
        { text: "Dedicated Assistant", included: true },
        { text: "LinkedIn Profile Guidance", included: true },
      ],
      isPopular: false
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="text-center space-y-3 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Application Packages
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          One-time purchases. No monthly subscriptions.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 items-center">
        {tiers.map((tier) => (
          <Card 
            key={tier.name} 
            className={`flex flex-col rounded-xl relative transition-all duration-300 ${
              tier.isPopular 
                ? 'border-green-500 shadow-lg shadow-green-500/20 scale-105' 
                : 'hover:scale-105 hover:shadow-lg'
            }`}
          >
            {tier.isPopular && (
              <div className="bg-green-600 text-white text-xs font-bold uppercase py-1.5 px-4 self-center -translate-y-4 rounded-full absolute top-0">
                Most Popular
              </div>
            )}
            <CardHeader className="text-center pt-10">
              <CardTitle className="text-2xl font-semibold">{tier.name}</CardTitle>
              <p className="text-muted-foreground h-10">{tier.desc}</p>
              <div className="text-5xl font-bold pt-4">{tier.price}</div>
              <p className="font-semibold">{tier.applications}</p>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <ul className="space-y-3 text-sm mb-8 flex-grow">
                {tier.perks.map(perk => (
                  <li key={perk.text} className="flex items-center gap-3 text-left">
                    {perk.included ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0"/>
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    )}
                    <span className={perk.included ? "text-foreground" : "text-muted-foreground"}>
                      {perk.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full mt-auto ${tier.isPopular ? 'bg-green-600 hover:bg-green-700' : ''}`}
                variant={tier.isPopular ? 'default' : 'outline'}
              >
                Purchase {tier.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
