import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Events, type Event } from '@/lib/events';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Shirt } from 'lucide-react';
import { Animate } from '@/components/ui/animate';

export default function EventsPage() {

  const eventsWithImages = Events.map(event => {
    return {
        ...event,
        image: PlaceHolderImages.find(img => img.id === event.imageId)
    }
  })

  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <Animate className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Church Events</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">There's always something happening at DMMC. Find your place to connect and grow.</p>
        </Animate>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Animate as="h2" className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Upcoming Events</Animate>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsWithImages.map((event, index) => (
              <Animate key={event.title} transition={{ delay: index * 0.1 }}>
                <Card className="flex flex-col">
                  {event.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={event.image.imageUrl}
                        alt={event.image.description}
                        fill
                        className="object-cover rounded-t-lg"
                        data-ai-hint={event.image.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
                    <div className="text-sm text-muted-foreground space-y-1 pt-2">
                      <p className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {event.date} at {event.time}</p>
                      <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {event.location}</p>
                      {event.dressCode && (
                        <p className="flex items-center gap-2"><Shirt className="h-4 w-4" /> {event.dressCode}</p>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-foreground/80">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Learn More & Register
                    </Button>
                  </CardFooter>
                </Card>
              </Animate>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
