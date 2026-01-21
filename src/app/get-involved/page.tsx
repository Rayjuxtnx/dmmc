
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Music, Video, Hand, Paintbrush } from 'lucide-react';
import { Animate } from '@/components/ui/animate';

const ministries = [
  {
    name: "Dancing Stars",
    description: "Express worship through movement and join a vibrant team of dancers who minister during services and special events.",
    images: [
        PlaceHolderImages.find(img => img.id === 'ministry-dance-1'),
        PlaceHolderImages.find(img => img.id === 'ministry-dance-2'),
        PlaceHolderImages.find(img => img.id === 'ministry-dance-3'),
    ],
    icon: Users
  },
  {
    name: "Doxa Chorus",
    description: "A dynamic vocal group known for their energetic praise and worship that uplifts the congregation.",
    images: [
        PlaceHolderImages.find(img => img.id === 'ministry-choir-1'),
        PlaceHolderImages.find(img => img.id === 'ministry-choir-2'),
        PlaceHolderImages.find(img => img.id === 'ministry-choir-3'),
    ],
    icon: Music
  },
  {
    name: "Hallelujah Chorus",
    description: "A classic choir that brings powerful and traditional choral music to our worship services.",
    images: [
        { imageUrl: "https://picsum.photos/seed/HC1/400/400", description: "choir", imageHint: "choir singing" },
        { imageUrl: "https://picsum.photos/seed/HC2/400/400", description: "choir", imageHint: "choir members" },
        { imageUrl: "https://picsum.photos/seed/HC3/400/400", description: "choir", imageHint: "church choir" },
    ],
    icon: Music
  },
  {
    name: "Glorious Choir - No Ordinary Water",
    description: "This choir is known for their soulful renditions and contemporary gospel sound.",
    images: [
        { imageUrl: "https://picsum.photos/seed/GC1/400/400", description: "choir", imageHint: "gospel choir" },
        { imageUrl: "https://picsum.photos/seed/GC2/400/400", description: "choir", imageHint: "singers" },
        { imageUrl: "https://picsum.photos/seed/GC3/400/400", description: "choir", imageHint: "worship service" },
    ],
    icon: Music
  },
  {
    name: "Greater Love Choir",
    description: "A choir focused on sharing the message of God's love through heartfelt song and worship.",
    images: [
        { imageUrl: "https://picsum.photos/seed/GLC1/400/400", description: "choir", imageHint: "love worship" },
        { imageUrl: "https://picsum.photos/seed/GLC2/400/400", description: "choir", imageHint: "community singing" },
        { imageUrl: "https://picsum.photos/seed/GLC3/400/400", description: "choir", imageHint: "praise team" },
    ],
    icon: Music
  },
  {
    name: "Media",
    description: "From camera operation to sound engineering and live streaming, the media team makes our services accessible to all.",
    images: [
        PlaceHolderImages.find(img => img.id === 'ministry-media-1'),
        PlaceHolderImages.find(img => img.id === 'ministry-media-2'),
        PlaceHolderImages.find(img => img.id === 'ministry-media-3'),
    ],
    icon: Video
  },
  {
    name: "Ushers",
    description: "Be the first friendly face visitors see. Our ushers create a welcoming atmosphere and assist with the service flow.",
    images: [
        PlaceHolderImages.find(img => img.id === 'ministry-usher-1'),
        PlaceHolderImages.find(img => img.id === 'ministry-usher-2'),
        PlaceHolderImages.find(img => img.id === 'ministry-usher-3'),
    ],
    icon: Hand
  },
  {
    name: "Air Posters (Creatives)",
    description: "Use your design and marketing skills to create compelling visuals that promote our church's message and events.",
    images: [
        PlaceHolderImages.find(img => img.id === 'ministry-design-1'),
        PlaceHolderImages.find(img => img.id === 'ministry-design-2'),
        PlaceHolderImages.find(img => img.id === 'ministry-design-3'),
    ],
    icon: Paintbrush
  },
];

export default function GetInvolvedPage() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <Animate className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Get Involved</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">Join our creative ministries and use your talents to serve God. Whether you dance, sing, or create visual content, there's a place for you in our community.</p>
        </Animate>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16">
            {ministries.map((ministry, index) => (
              <Animate key={ministry.name} transition={{ delay: index * 0.15 }}>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl md:text-3xl flex items-center gap-4">
                        <ministry.icon className="h-8 w-8 text-primary" />
                        {ministry.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-foreground/80">{ministry.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {ministry.images.map((image, imgIndex) => (
                        image && (
                           <div key={imgIndex} className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                fill
                                className="object-cover"
                                data-ai-hint={image.imageHint}
                            />
                           </div>
                        )
                      ))}
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/connect">Be part of this</Link>
                    </Button>
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
