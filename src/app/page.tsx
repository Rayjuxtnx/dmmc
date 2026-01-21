import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, CalendarDays, BookOpen, HeartHandshake } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-home');

  const events = [
    {
      title: "Sunday Worship",
      date: "Every Sunday, 10:00 AM",
      description: "Join us for a time of worship, prayer, and teaching.",
    },
    {
      title: "Mid-week Bible Study",
      date: "Every Wednesday, 7:00 PM",
      description: "Dive deeper into the Word with our community.",
    },
    {
      title: "Youth Night",
      date: "Every Friday, 6:30 PM",
      description: "A fun and engaging night for teens.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 p-4 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Welcome to DMMC Connect
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            A place to find hope, community, and purpose. We're so glad you're here.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/connect">Plan Your Visit</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/about">I'm New Here</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">A Church That Feels Like Family</h2>
              <p className="mt-4 text-lg text-foreground/80">
                At Double Mega Missionary Church, we are a diverse family united by our love for Jesus. We are passionate about sharing His message of hope and building a community where everyone feels they belong.
              </p>
              <Button asChild className="mt-6">
                <Link href="/about">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline text-xl">
                    <CalendarDays className="h-6 w-6 text-primary" />
                    Our Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Discover community gatherings, worship nights, and more.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline text-xl">
                    <BookOpen className="h-6 w-6 text-primary" />
                    Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Explore sermons, books, and articles to help you grow.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Upcoming Events</h2>
          <p className="mt-2 text-lg max-w-2xl mx-auto text-foreground/80">Join us and get connected with the community.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {events.map((event, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline">{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button asChild className="mt-12">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </section>

      {/* Giving Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
           <div className="text-center max-w-3xl mx-auto">
             <HeartHandshake className="mx-auto h-12 w-12 text-primary" />
             <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">Partner With Us</h2>
             <p className="mt-4 text-lg text-foreground/80">
              Your generosity fuels our mission to spread the love of Jesus in our city and around the world. Every gift makes a difference.
             </p>
             <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
               <Link href="/give">Give Online</Link>
             </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
