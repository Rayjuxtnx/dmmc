
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Animate } from "@/components/ui/animate";
import { ArrowRight } from 'lucide-react';

export default function StoriesPage() {
  const dagImage = PlaceHolderImages.find(img => img.id === 'dag-heward-mills-portrait');

  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <Animate className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">The Founder's Story</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">Read about the incredible journey of our founder, Dag Heward-Mills.</p>
        </Animate>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
            <Animate>
                <Card className="overflow-hidden">
                    <div className="md:flex md:gap-8">
                        <div className="md:w-1/3 p-6 flex items-center justify-center">
                            {dagImage && (
                                <div className="relative w-64 h-64">
                                    <Image
                                        src={dagImage.imageUrl}
                                        alt="Dag Heward-Mills"
                                        fill
                                        className="rounded-full shadow-lg object-cover"
                                        data-ai-hint={dagImage.imageHint}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="md:w-2/3">
                            <CardHeader>
                                <CardTitle className="font-headline text-3xl">Dag Heward-Mills</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-foreground/80">
                                <p>Dag Heward-Mills is a mega church pastor, and the founder of the United Denominations Originating from the Lighthouse Group of Churches. Spanning ten denominations, he oversees over 3000 churches on every continent of the globe. Amongst these denominations is the First Love Church.</p>
                                <p>He is also a prolific, best-selling author, with the best selling Makarios collection of 60 books. His writings have been translated into over 50 languages all over the world.</p>
                                <p>Dag Heward-Mills' Healing Jesus Campaigns holds large evangelistic crusades all over Africa and are among the largest evangelistic efforts on the continent.</p>
                                <p>Dag can be heard or watched ministering to millions on various television, radio and internet platforms.</p>
                                <div className="pt-4">
                                    <p className="font-semibold text-foreground">Click below to find out more about our leader!</p>
                                    <Button asChild className="mt-2">
                                        <Link href="https://daghewardmills.org/" target="_blank" rel="noopener noreferrer">
                                            Visit Website <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </Animate>
        </div>
      </section>
    </div>
  );
}
