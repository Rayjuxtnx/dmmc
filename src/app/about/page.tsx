import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Animate } from '@/components/ui/animate';

const beliefs = [
    "We believe the Bible is the inspired and infallible Word of God.",
    "We believe in one God, eternally existent in three persons: Father, Son, and Holy Spirit.",
    "We believe in the deity of our Lord Jesus Christ, in His virgin birth, and in His sinless life.",
    "We believe in the resurrection of both the saved and the lost.",
    "We believe in the spiritual unity of believers in our Lord Jesus Christ."
]

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us-leadership');
  const heroImage = PlaceHolderImages.find(img => img.id === 'about-hero');

  return (
    <div>
      <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && heroImage.imageUrl ? (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        ) : <div className="absolute inset-0 bg-primary" />}
        <div className="absolute inset-0 bg-primary/70" />
        <Animate className="relative z-10 p-4 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">About DMMC</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">Get to know our story, our mission, and the people who lead our church family.</p>
        </Animate>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {aboutImage && aboutImage.imageUrl && (
              <Animate variant="fadeInLeft" className="w-full h-80 relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              </Animate>
            )}
            <Animate variant="fadeInRight" className="space-y-4">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Our Mission & Vision</h2>
              <p className="text-lg text-foreground/80">
                Our mission is to lead people into a growing relationship with Jesus Christ. We exist to create environments where people are encouraged and equipped to pursue intimacy with God, community with insiders, and influence with outsiders.
              </p>
              <p className="text-foreground/70">
                We envision being a multicultural, multi-generational church that is passionately reaching our city and world with the life-changing message of Jesus.
              </p>
            </Animate>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <Animate className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">What We Believe</h2>
                <p className="mt-4 text-lg text-foreground/80">
                    Our beliefs are rooted in the historic Christian faith and the authority of the Bible.
                </p>
            </Animate>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-4xl mx-auto">
                {beliefs.map((belief, index) => (
                    <Animate key={index} transition={{ delay: index * 0.1 }} className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground/80">{belief}</p>
                    </Animate>
                ))}
            </div>
          </div>
      </section>
    </div>
  );
}
