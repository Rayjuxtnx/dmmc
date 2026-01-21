import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle } from 'lucide-react';
import { Animate } from '@/components/ui/animate';

const leadership = [
  { name: 'John Doe', role: 'Senior Pastor', avatar: 'https://picsum.photos/seed/L1/100/100' },
  { name: 'Jane Smith', role: 'Associate Pastor', avatar: 'https://picsum.photos/seed/L2/100/100' },
  { name: 'Peter Jones', role: 'Worship Leader', avatar: 'https://picsum.photos/seed/L3/100/100' },
  { name: 'Mary Williams', role: 'Youth Director', avatar: 'https://picsum.photos/seed/L4/100/100' },
];

const beliefs = [
    "We believe the Bible is the inspired and infallible Word of God.",
    "We believe in one God, eternally existent in three persons: Father, Son, and Holy Spirit.",
    "We believe in the deity of our Lord Jesus Christ, in His virgin birth, and in His sinless life.",
    "We believe in the resurrection of both the saved and the lost.",
    "We believe in the spiritual unity of believers in our Lord Jesus Christ."
]

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us-leadership');

  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <Animate className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">About DMMC</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">Get to know our story, our mission, and the people who lead our church family.</p>
        </Animate>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {aboutImage && (
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

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Animate>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Meet Our Leadership</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-foreground/80">
              Our team is dedicated to serving our community and guiding our church with wisdom and grace.
            </p>
          </Animate>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <Animate key={leader.name} transition={{ delay: index * 0.1 }}>
                <Card className="text-center">
                  <CardHeader>
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={leader.avatar} alt={leader.name} />
                      <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-xl">{leader.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary font-semibold">{leader.role}</p>
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
