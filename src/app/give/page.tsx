"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import { toast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartHandshake } from "lucide-react"
import { Animate } from "@/components/ui/animate"

const formSchema = z.object({
  amount: z.coerce.number().min(1, "Please enter an amount greater than 0."),
  frequency: z.enum(["one-time", "monthly"], {
    required_error: "Please select a frequency.",
  }),
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email."),
  phoneNumber: z.string().optional(),
})

export default function GivePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 50,
      frequency: "one-time",
      name: "",
      email: "",
      phoneNumber: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Thank You For Your Gift!",
      description: `Your ${values.frequency} donation of $${values.amount} has been processed. A receipt has been sent to ${values.email}.`,
    })
    form.reset()
  }

  return (
    <div>
      <Animate>
        <section className="bg-primary text-primary-foreground py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="font-headline text-4xl md:text-6xl font-bold">Give Generously</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">Your faithfulness helps us continue our mission of sharing the love of Christ.</p>
          </div>
        </section>
      </Animate>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                <Animate variant="fadeInLeft" className="space-y-6">
                    <div className="flex justify-center lg:justify-start">
                        <HeartHandshake className="h-16 w-16 text-primary" />
                    </div>
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">Partner with our Mission</h2>
                    <p className="text-foreground/80">
                        Generosity is a fundamental part of our faith journey. Your giving supports our local ministries, community outreach, global missions, and the operational needs of our church. Thank you for partnering with us to make a lasting impact.
                    </p>
                    <Card className="bg-secondary">
                        <CardHeader>
                            <CardTitle className="font-headline">Other Ways to Give</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p><span className="font-semibold">In Person:</span> You can give during our Sunday services.</p>
                            <p><span className="font-semibold">By Mail:</span> Send checks to PRINCE OF PEACE CATHEDRAL NAIROBI, Off Jogoo Road, near Aquinas High School, Nairobi.</p>
                        </CardContent>
                    </Card>
                </Animate>
                <Animate variant="fadeInRight">
                  <Card>
                      <CardHeader>
                          <CardTitle className="font-headline text-2xl">Secure Online Giving</CardTitle>
                      </CardHeader>
                      <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Amount ($)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="50" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Frequency</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-4"
                                  >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="one-time" />
                                      </FormControl>
                                      <FormLabel className="font-normal">One-Time</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="monthly" />
                                      </FormControl>
                                      <FormLabel className="font-normal">Monthly</FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
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
                                <FormLabel>Email for Receipt</FormLabel>
                                <FormControl>
                                  <Input placeholder="you@example.com" {...field} />
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
                                <FormLabel>Phone Number (Optional)</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="(123) 456-7890" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">Give Now</Button>
                        </form>
                      </Form>
                      </CardContent>
                  </Card>
                </Animate>
            </div>
        </div>
      </section>
    </div>
  )
}
