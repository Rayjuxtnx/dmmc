"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Music, Video, Hand, Paintbrush } from 'lucide-react';
import { Animate } from '@/components/ui/animate';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

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
        { imageUrl: "", description: "choir", imageHint: "choir singing" },
        { imageUrl: "", description: "choir", imageHint: "choir members" },
        { imageUrl: "", description: "choir", imageHint: "church choir" },
    ],
    icon: Music
  },
  {
    name: "Glorious Choir - No Ordinary Water",
    description: "This choir is known for their soulful renditions and contemporary gospel sound.",
    images: [
        { imageUrl: "", description: "choir", imageHint: "gospel choir" },
        { imageUrl: "", description: "choir", imageHint: "singers" },
        { imageUrl: "", description: "choir", imageHint: "worship service" },
    ],
    icon: Music
  },
  {
    name: "Greater Love Choir",
    description: "A choir focused on sharing the message of God's love through heartfelt song and worship.",
    images: [
        { imageUrl: "", description: "choir", imageHint: "love worship" },
        { imageUrl: "", description: "choir", imageHint: "community singing" },
        { imageUrl: "", description: "choir", imageHint: "praise team" },
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


const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
  location: z.string().min(2, "Please enter your location."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal('')),
  ministry: z.string(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

function MinistrySignupForm({ ministryName }: { ministryName: string }) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      location: '',
      email: '',
      ministry: ministryName,
    },
  });

  async function onSubmit(values: SignupFormValues) {
    try {
      const response = await fetch("https://formspree.io/f/xaqqkgvr", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: 'Registration Submitted!',
          description: `Thanks for your interest in the ${ministryName} ministry. We'll be in touch!`,
        });
        form.reset();
        setIsSubmitted(true);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: 'Could not submit your registration. Please try again.',
      });
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <h3 className="font-bold text-lg mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          Your registration for the {ministryName} ministry has been received. Someone from our team will be in touch with you soon.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="ministry"
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+254 7XX XXX XXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City / Country</FormLabel>
              <FormControl>
                <Input placeholder="Nairobi, Kenya" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address (Optional)</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}


export default function GetInvolvedPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'get-involved-hero');

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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Be part of this</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Join the {ministry.name} Ministry</DialogTitle>
                          <DialogDescription>
                            Fill out the form below to express your interest. We'll get back to you soon!
                          </DialogDescription>
                        </DialogHeader>
                        <MinistrySignupForm ministryName={ministry.name} />
                      </DialogContent>
                    </Dialog>
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
