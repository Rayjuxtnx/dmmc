import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart } from 'lucide-react';

export default function JesusPage() {
  const jesusImage = PlaceHolderImages.find(img => img.id === 'jesus-page-image');

  return (
    <div>
      <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
        {jesusImage && (
          <Image
            src={jesusImage.imageUrl}
            alt={jesusImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={jesusImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 p-4 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Jesus: The Center of It All</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life." - John 3:16
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/80">
            <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold">Who is Jesus?</h2>
            <p>
              We believe that Jesus Christ is the eternal Son of God. He is not a myth, a good teacher, or a religious leader among many. He is God in human flesh, who came to earth to reveal God to us and to provide the only way for us to have a relationship with God.
            </p>
            <h3 className="font-headline text-2xl md:text-3xl text-primary/90 font-bold">His Life</h3>
            <p>
              Jesus lived a sinless life, perfectly fulfilling God's law. He taught with authority, healed the sick, performed miracles, and showed unparalleled compassion for the broken and marginalized. His life is the ultimate example of how we are to live.
            </p>
            <h3 className="font-headline text-2xl md:text-3xl text-primary/90 font-bold">His Death</h3>
            <p>
              He voluntarily died on the cross as a substitute for sinful humanity. His death was not a tragedy but a triumph. It was the ultimate sacrifice, paying the penalty for our sins and satisfying the justice of God. Through His death, the barrier of sin that separated us from God was broken.
            </p>
            <h3 className="font-headline text-2xl md:text-3xl text-primary/90 font-bold">His Resurrection</h3>
            <p>
              Three days after His death, Jesus rose from the grave, conquering sin and death. His resurrection is the cornerstone of the Christian faith. It proves His identity as the Son of God and guarantees eternal life for all who believe in Him. He is alive today and reigns as Lord over all creation.
            </p>
          </div>
          <div className="mt-12 text-center p-8 bg-secondary rounded-lg">
            <Heart className="mx-auto h-12 w-12 text-primary"/>
            <h3 className="mt-4 font-headline text-2xl font-bold">A Relationship with Jesus</h3>
            <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">
              Knowing about Jesus is not the same as knowing Him personally. He invites each of us into a personal, life-transforming relationship with Him. This begins by acknowledging our need for a savior, repenting of our sins, and placing our faith in Him.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
