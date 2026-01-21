import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';

const events = [
  {
    title: "Annual Summer Picnic",
    date: "August 15, 2024",
    time: "12:00 PM - 4:00 PM",
    location: "Central Park",
    description: "Join us for a day of fun, food, and fellowship at our annual church picnic. All are welcome!",
    image: PlaceHolderImages.find(img => img.id === 'event-1'),
  },
  {
    title: "Bible Study: The Book of Romans",
    date: "Every Wednesday",
    time: "7:00 PM - 8:30 PM",
    location: "Fellowship Hall",
    description: "Dive deep into Paul's letter to the Romans in this engaging weekly study.",
    image: PlaceHolderImages.find(img => img.id === 'event-2'),
  },
  {
    title: "Worship & Prayer Night",
    date: "August 2, 2024",
    time: "7:30 PM",
    location: "Main Sanctuary",
    description: "An extended evening dedicated to worship, prayer, and seeking God's presence together.",
    image: PlaceHolderImages.find(img => img.id === 'hero-home'),
  },
  {
    title: "Youth Summer Camp",
    date: "August 19-23, 2024",
    time: "All Day",
    location: "Mountain View Camp",
    description: "An unforgettable week of faith, fun, and friendship for students in grades 6-12.",
    image: {
      imageUrl: "https://picsum.photos/seed/E4/600/400",
      description: "Teens around a campfire",
      imageHint: "youth camp"
    }
  },
];

export default function EventsPage() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Church Events</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">There's always something happening at DMMC. Find your place to connect and grow.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={event.title} className="flex flex-col">
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
