import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Handshake, Mail } from 'lucide-react';

const missionPartners = [
  { name: 'Hope for Nations', location: 'East Asia', focus: 'Community Development' },
  { name: 'Living Water Intl.', location: 'Sub-Saharan Africa', focus: 'Clean Water Projects' },
  { name: 'Frontier Missions', location: 'South America', focus: 'Church Planting' },
]

export default function GlobalPage() {
  const outreachImage = PlaceHolderImages.find(img => img.id === 'global-outreach');

  return (
    <div>
      <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
        {outreachImage && (
          <Image
            src={outreachImage.imageUrl}
            alt={outreachImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={outreachImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 p-4 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Global Outreach</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Impacting the world with the love and message of Jesus Christ.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
              <Globe className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">Our Global Vision</h2>
              <p className="mt-4 text-lg text-foreground/80">
                We are committed to fulfilling the Great Commission by taking the gospel to all nations. We partner with missionaries and organizations around the world to bring hope, share the gospel, and meet practical needs in underserved communities.
              </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Our Mission Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {missionPartners.map(partner => (
                <Card key={partner.name}>
                  <CardHeader>
                    <Handshake className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="font-headline text-xl">{partner.name}</CardTitle>
                    <p className="text-sm font-semibold text-primary">{partner.location}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80"><strong>Focus:</strong> {partner.focus}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
           <div className="text-center max-w-3xl mx-auto">
             <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">How You Can Get Involved</h2>
             <p className="mt-4 text-lg text-foreground/80">
              There are many ways to be a part of our global mission. You can pray, give, or go.
             </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                    <h3 className="font-headline text-2xl font-semibold">Pray</h3>
                    <p className="text-foreground/70">Commit to praying regularly for our missionaries and the people they serve.</p>
                </div>
                <div className="space-y-2">
                    <h3 className="font-headline text-2xl font-semibold">Give</h3>
                    <p className="text-foreground/70">Financially support our global partners and short-term mission trips.</p>
                </div>
                <div className="space-y-2">
                    <h3 className="font-headline text-2xl font-semibold">Go</h3>
                    <p className="text-foreground/70">Join one of our short-term mission trips to serve on the field.</p>
                </div>
            </div>
             <Button asChild size="lg" className="mt-12">
               <a href="mailto:missions@dmmc.org">
                <Mail className="mr-2 h-4 w-4"/> Contact our Missions Team
               </a>
             </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
