import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  const tiers = [
    { 
      name: "Lite", 
      price: "$149", 
      desc: "For a focused job search.",
      applications: "30 applications / month",
      perks: ["Tailored resume + CL", "Assistant submission", "Dashboard tracking"],
      isPopular: false
    },
    { 
      name: "Pro", 
      price: "$399", 
      desc: "For an accelerated job search.",
      applications: "100 applications / month",
      perks: ["Everything in Lite, plus:", "Priority queue", "ATS coverage report", "Email notifications"],
      isPopular: true
    },
    { 
      name: "Premium", 
      price: "$899", 
      desc: "For a full concierge experience.",
      applications: "Unlimited applications",
      perks: ["Everything in Pro, plus:", "Dedicated assistant", "Weekly strategy call", "24h turnaround"],
      isPopular: false
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="text-center space-y-3 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Find the Plan That&apos;s Right for You
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Simple, transparent pricing. Cancel anytime.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <Card 
            key={tier.name} 
            className={`flex flex-col rounded-xl relative ${tier.isPopular ? 'border-green-500 shadow-lg shadow-green-500/10' : ''}`}
          >
            {tier.isPopular && (
              <div className="bg-green-600 text-white text-xs font-bold uppercase py-1 px-4 self-center -translate-y-4 rounded-full absolute top-0">
                Most Popular
              </div>
            )}
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl font-semibold">{tier.name}</CardTitle>
              <p className="text-muted-foreground">{tier.desc}</p>
              <div className="text-4xl font-bold pt-4">{tier.price}<span className="text-base font-normal text-muted-foreground">/mo</span></div>
              <p className="font-semibold">{tier.applications}</p>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <ul className="space-y-3 text-sm mb-8 flex-grow">
                {tier.perks.map(perk => (
                  <li key={perk} className="flex items-center gap-3 text-left">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0"/>
                    <span className="text-muted-foreground">{perk}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full mt-auto" 
                variant={tier.isPopular ? 'default' : 'outline'}
                style={tier.isPopular ? { backgroundColor: 'hsl(142.1 76.2% 41.2%)' } : {}}
              >
                Choose {tier.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}