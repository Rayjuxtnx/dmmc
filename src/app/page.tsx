
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CalendarDays, BookOpen, HeartHandshake } from 'lucide-react';
import { Animate } from '@/components/ui/animate';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
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

  const activityImages = [
    PlaceHolderImages.find(img => img.id === 'activity-1'),
    PlaceHolderImages.find(img => img.id === 'activity-2'),
    PlaceHolderImages.find(img => img.id === 'activity-3'),
    PlaceHolderImages.find(img => img.id === 'activity-4'),
    PlaceHolderImages.find(img => img.id === 'activity-5'),
    PlaceHolderImages.find(img => img.id === 'activity-6'),
  ].filter(Boolean);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
          <iframe
            src="https://www.youtube.com/embed/L58jjTB_4to?autoplay=1&mute=1&loop=1&playlist=L58jjTB_4to&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&autohide=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 w-screen min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
            title="background-video"
          ></iframe>
        </div>
        <div className="absolute inset-0 bg-primary/60" />
        <Animate className="relative z-10 p-4 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Welcome to DMMC
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            A place to find hope, community, and purpose. We're so glad you're here.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/connect">Plan Your Visit</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="https://youtu.be/L58jjTB_4to" target="_blank" rel="noopener noreferrer">Watch Live</Link>
            </Button>
          </div>
        </Animate>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Animate variant="fadeInLeft">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">A Church That Feels Like Family</h2>
              <p className="mt-4 text-lg text-foreground/80">
                At PRINCE OF PEACE CATHEDRAL NAIROBI, we are a diverse family united by our love for Jesus. We are passionate about sharing His message of hope and building a community where everyone feels they belong.
              </p>
              <Button asChild className="mt-6">
                <Link href="/about">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Animate>
            <Animate variant="fadeInRight" className="grid grid-cols-1 gap-4">
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
            </Animate>
          </div>
        </div>
      </section>
      
      {/* Activity Gallery Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Animate>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {activityImages.map((image, index) => (
                image && (
                  <div key={index} className="relative overflow-hidden rounded-lg shadow-lg aspect-[3/2]">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      data-ai-hint={image.imageHint}
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                )
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <Animate>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Upcoming Events</h2>
            <p className="mt-2 text-lg max-w-2xl mx-auto text-foreground/80">Join us and get connected with the community.</p>
          </Animate>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {events.map((event, index) => (
              <Animate key={index} transition={{ delay: index * 0.1 }}>
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="font-headline">{event.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{event.description}</p>
                  </CardContent>
                </Card>
              </Animate>
            ))}
          </div>
          <Animate>
            <Button asChild className="mt-12">
              <Link href="/events">View All Events</Link>
            </Button>
          </Animate>
        </div>
      </section>

      {/* Giving Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
           <Animate className="text-center max-w-3xl mx-auto">
             <HeartHandshake className="mx-auto h-12 w-12 text-primary" />
             <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">Partner With Us</h2>
             <p className="mt-4 text-lg text-foreground/80">
              Your generosity fuels our mission to spread the love of Jesus in our city and around the world. Every gift makes a difference.
             </p>
             <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
               <Link href="/give">Give Online</Link>
             </Button>
           </Animate>
        </div>
      </section>
    </div>
  );
}
