"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from 'next/image';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Animate } from "@/components/ui/animate";

const formSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
  location: z.string().min(2, "Please enter your location."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal('')),
  hasPrayed: z.literal(true, {
    errorMap: () => ({ message: "Please check the box to confirm you've prayed." }),
  }),
});


export default function JesusPage() {
  const jesusImage = PlaceHolderImages.find(img => img.id === 'jesus-page-image');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      location: "",
      email: "",
      hasPrayed: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Welcome to the Family!",
      description: "We're so excited for you! Someone from our team will be in touch soon.",
    });
    form.reset();
  }

  return (
    <div>
      <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
        {jesusImage && jesusImage.imageUrl ? (
          <Image
            src={jesusImage.imageUrl}
            alt={jesusImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={jesusImage.imageHint}
          />
        ) : <div className="absolute inset-0 bg-primary" />}
        <div className="absolute inset-0 bg-primary/70" />
        <Animate className="relative z-10 p-4 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">SALVATION</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Who He is and What His Love means to us
          </p>
        </Animate>
      </section>

      <section className="py-16 md:py-24">
        <Animate className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/80">
            <p>
              "The great love of God will change your life forever. This love is greater than anything found on Earth... Your mother may love you, your father may love you, but none of them will die for you. Your boyfriend may love you, your girlfriend may love you, but none will die for you."
            </p>
            <p>
              What Jesus is, is the embodiment of unconditional, all consuming Love. The kind of love that assures that you will live forever. Jesus' love was so deep, that he sought to spend eternity being with us, but the Bible says in Romans 3:23, that ALL have sinned and come short of the Glory of God..." To remedy this, Jesus gave His life for us so we could have eternal life, and be with him forever.
            </p>
            <p>
              There is not a love, quantifiable, that exists on this earth, greater than the love of God that caused Him to sacrifice his only son for us. It cannot be topped.
            </p>
            <p>
              When you open up your heart to receive this great love, you will be Born Again. If you open up your heart to this great love from God, you will become a new creation and live a totally different life. If you open up your heart to this great love from God, you will escape your punishment in Hell.
            </p>
            <p>
              The love of Jesus has lasted throughout the centuries. It has persisted until it reached you and me.
            </p>
          </div>
          
          <Card className="mt-12 text-center bg-card/50">
            <CardHeader>
                <Heart className="mx-auto h-12 w-12 text-primary"/>
                <CardTitle className="font-headline text-2xl md:text-3xl font-bold">A new beginning...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">
                Jesus loves you, and He wants to spend eternity loving you. If you want to spend eternity with Him repeat this prayer, and believe it in your heart and you will be saved. Say:
                </p>

                <blockquote className="border-l-4 border-primary pl-4 italic text-left max-w-md mx-auto text-foreground/90">
                    <p>Lord Jesus,</p>
                    <p>I come to you today, just as I am.</p>
                    <p>I am a Sinner. Please forgive me of all my Sins.</p>
                    <p>Please write my name in the Book of Life.</p>
                    <p>From today, I belong to you. I will love you. I will serve you,</p>
                    <p>All the days of my life!</p>
                    <p>Satan! I will no longer serve you! I am not yours to command!</p>
                    <p>I love you Jesus!</p>
                    <p>Thank you for saving my soul!</p>
                </blockquote>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left max-w-md mx-auto">
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
                          <FormLabel>Email (Optional)</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hasPrayed"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I prayed this prayer
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" size="lg">I Have Prayed</Button>
                  </form>
                </Form>
            </CardContent>
          </Card>
        </Animate>
      </section>
    </div>
  );
}
