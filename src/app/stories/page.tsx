"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle } from "lucide-react";

const testimonials = [
  {
    name: "Sarah L.",
    story: "Finding DMMC was like coming home. The community is so welcoming, and the teachings have truly deepened my faith. I've found purpose and lifelong friends here.",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1'),
  },
  {
    name: "Michael B.",
    story: "I was in a dark place before I came to this church. Through the support of the pastoral team and my small group, I've experienced incredible healing and restoration.",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-2'),
  },
   {
    name: "The Chen Family",
    story: "As a family, we've grown so much closer to God and to each other through DMMC. The kids' ministry is fantastic, and we love serving together as a family.",
    image: { imageUrl: "https://picsum.photos/seed/T3/400/400", description: "A happy family", imageHint: "family portrait"}
  },
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  story: z.string().min(20, "Your story must be at least 20 characters long."),
})

export default function StoriesPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", email: "", story: "" },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        toast({
        title: "Story Submitted!",
        description: "Thank you for sharing your story with us. We'll review it shortly.",
        })
        form.reset()
    }

  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Stories of Transformation</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">Read about the incredible things God is doing in the lives of people at DMMC.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="break-inside-avoid">
                <CardHeader className="flex-row items-center gap-4">
                  {testimonial.image && (
                     <Avatar className="h-16 w-16">
                        <Image src={testimonial.image.imageUrl} alt={testimonial.name} width={64} height={64} className="object-cover" data-ai-hint={testimonial.image.imageHint}/>
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <h3 className="font-headline text-xl font-semibold">{testimonial.name}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">"{testimonial.story}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center">
                <MessageCircle className="mx-auto h-12 w-12 text-primary" />
                <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">Share Your Story</h2>
                <p className="mt-4 text-lg text-foreground/80">
                    Has God worked in your life through this community? We'd love to hear about it. Your story could be an encouragement to others.
                </p>
            </div>
            <Card className="mt-12">
                <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl><Input placeholder="John D." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address (kept private)</FormLabel>
                          <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="story"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Story</FormLabel>
                          <FormControl><Textarea placeholder="Tell us what God has done..." className="min-h-[150px]" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">Submit My Story</Button>
                  </form>
                </Form>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
