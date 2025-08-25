"use client";
import { motion } from 'framer-motion';

const logos = [
  { name: 'Google', src: '/logos/google.png' },
  { name: 'Meta', src: '/logos/meta.svg' },
  { name: 'Amazon', src: '/logos/amazon.png' },
  { name: 'Netflix', src: '/logos/netflix.png' },
  { name: 'Stripe', src: '/logos/stripe.webp' },
  { name: 'Microsoft', src: '/logos/microsoft.png' },
];

export function LogoCloud() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-sm text-muted-foreground font-semibold tracking-widest uppercase">
        Helping Professionals Land Interviews At
      </p>
      <div className="mt-6 flex justify-center items-center gap-x-8 gap-y-4 flex-wrap">
        {logos.map((logo) => (
          <img
            key={logo.name}
            className="h-7 w-auto transition-all duration-300 opacity-100 hover:opacity-100 dark:invert"
            src={logo.src}
            alt={logo.name}
          />
        ))}
      </div>
    </motion.div>
  );
}