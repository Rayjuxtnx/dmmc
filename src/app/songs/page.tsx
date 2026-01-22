import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Animate } from '@/components/ui/animate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music } from 'lucide-react';

const songs = [
    { title: "Amazing Grace", artist: "John Newton" },
    { title: "How Great Thou Art", artist: "Carl Boberg" },
    { title: "In Christ Alone", artist: "Keith Getty, Stuart Townend" },
    { title: "10,000 Reasons (Bless The Lord)", artist: "Matt Redman" },
    { title: "What A Beautiful Name", artist: "Hillsong Worship" },
    { title: "Way Maker", artist: "Sinach" },
];

export default function SongsPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'songs-hero');

  return (
    <div>
      <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
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
        <div className="absolute inset-0 bg-primary/70" />
        <Animate className="relative z-10 p-4 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Worship Songs</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">Lift your voice in praise. Here are some of the songs that are close to our hearts.</p>
        </Animate>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Animate as="h2" className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Our Favorite Hymns & Songs</Animate>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {songs.map((song, index) => (
              <Animate key={song.title} transition={{ delay: index * 0.1 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-3">
                        <Music className="h-6 w-6 text-primary"/>
                        {song.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">By {song.artist}</p>
                  </CardContent>
                </Card>
              </Animate>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
