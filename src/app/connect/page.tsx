"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, HeartHandshake } from "lucide-react"
import { Animate } from "@/components/ui/animate"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
  location: z.string().min(2, "Please enter your location."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal('')),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
})

const prayerFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    phoneNumber: z.string().min(10, "Please enter a valid phone number."),
    location: z.string().min(2, "Please enter your location."),
    email: z.string().email("Please enter a valid email address.").optional().or(z.literal('')),
    prayerRequest: z.string().min(10, "Prayer request must be at least 10 characters."),
});

export default function ConnectPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'connect-hero');

  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      location: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const prayerForm = useForm<z.infer<typeof prayerFormSchema>>({
    resolver: zodResolver(prayerFormSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      location: "",
      email: "",
      prayerRequest: "",
    },
  });

  async function onContactSubmit(values: z.infer<typeof contactFormSchema>) {
     try {
      const response = await fetch("https://formspree.io/f/xaqqkgvr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. We'll get back to you soon.",
        });
        contactForm.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Could not send your message. Please try again.",
      });
    }
  }

  async function onPrayerSubmit(values: z.infer<typeof prayerFormSchema>) {
     try {
      const response = await fetch("https://formspree.io/f/xaqqkgvr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Your prayer request has been received. We are praying for you.",
        });
        prayerForm.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Could not send your message. Please try again.",
      });
    }
  }

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
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Connect With Us</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">We'd love to hear from you. Let us know how we can help.</p>
        </Animate>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <Animate variant="fadeInLeft">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...contactForm}>
                    <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                      <FormField
                        control={contactForm.control}
                        name="name"
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
                        control={contactForm.control}
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
                        control={contactForm.control}
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
                        control={contactForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Question about..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Your message here..." className="min-h-[120px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </Animate>
            <Animate variant="fadeInRight" className="space-y-8">
              <div>
                <h2 className="font-headline text-3xl font-bold text-primary">Get in Touch</h2>
                <p className="mt-2 text-foreground/80">Find us, call us, or join us for a service. We look forward to connecting with you.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Our Location</h3>
                    <p className="text-foreground/80">Off Jogoo Road, near Aquinas High School, Nairobi</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Service Times</h3>
                    <p className="text-foreground/80">starts at 9:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-foreground/80">contact@dmmc.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-foreground/80">(123) 456-7890</p>
                  </div>
                </div>
              </div>
              <div className="h-80 rounded-lg overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.806612089408!2d36.85796258882583!3d-1.2933522355830962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11549f5d7533%3A0xd380a08ed803767e!2sDouble%20Mega%20Missionary%20Church%20Kenya%20HQ!5e0!3m2!1sen!2ske!4v1719503698748!5m2!1sen!2ske"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-2xl">
            <Animate>
                <Card>
                    <CardHeader className="text-center">
                        <HeartHandshake className="mx-auto h-12 w-12 text-primary" />
                        <CardTitle className="font-headline text-3xl">Request Prayer</CardTitle>
                        <p className="text-muted-foreground pt-2">Let us know how we can pray for you. All requests are kept confidential.</p>
                    </CardHeader>
                    <CardContent>
                        <Form {...prayerForm}>
                            <form onSubmit={prayerForm.handleSubmit(onPrayerSubmit)} className="space-y-6">
                                <FormField
                                    control={prayerForm.control}
                                    name="name"
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
                                    control={prayerForm.control}
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
                                    control={prayerForm.control}
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
                                    control={prayerForm.control}
                                    name="email"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address (Optional)</FormLabel>
                                        <FormControl>
                                        <Input placeholder="you@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={prayerForm.control}
                                    name="prayerRequest"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prayer Request</FormLabel>
                                        <FormControl>
                                        <Textarea placeholder="Please pray for..." className="min-h-[150px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">Submit Request</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </Animate>
        </div>
      </section>
    </div>
  )
}

    