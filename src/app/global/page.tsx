"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Phone, Mail, MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Animate } from '@/components/ui/animate';
import Image from 'next/image';

const locations = [
  { country: 'Ghana', region: 'West Africa', count: 28 },
  { country: 'China', region: 'Asia', count: 5 },
  { country: 'Tahiti', region: 'Pacific', count: 1 },
  { country: 'United Kingdom', region: 'Europe', count: 32 },
  { country: 'Switzerland', region: 'Europe', count: 5 },
  { country: 'Sweden', region: 'Europe', count: 1 },
  { country: 'Portugal', region: 'Europe', count: 1 },
  { country: 'Ukraine', region: 'Europe', count: 2 },
  { country: 'USA', region: 'North America', count: 22 },
  { country: 'Canada', region: 'North America', count: 1 },
  { country: 'Dominica', region: 'Caribbean', count: 1 },
  { country: 'Guadeloupe', region: 'Caribbean', count: 1 },
  { country: 'Grenada', region: 'Caribbean', count: 1 },
  { country: 'Dominica republic', region: 'Caribbean', count: 1 },
  { country: 'Belize', region: 'Central America', count: 1 },
  { country: 'Sierra Leone', region: 'West Africa', count: 5 },
  { country: 'Nigeria', region: 'West Africa', count: 3 },
  { country: 'Liberia', region: 'West Africa', count: 2 },
  { country: 'Cape Verde', region: 'West Africa', count: 1 },
  { country: 'Guinea-Bissau', region: 'West Africa', count: 1 },
  { country: 'Botswana', region: 'Southern Africa', count: 12 },
  { country: 'Zambia', region: 'Southern Africa', count: 10 },
  { country: 'Seychelles', region: 'East Africa', count: 3 },
  { country: 'Uganda', region: 'East Africa', count: 1 },
  { country: 'Zimbabwe', region: 'Southern Africa', count: 4 },
  { country: 'Malawi', region: 'Southern Africa', count: 4 },
  { country: 'Cameroon', region: 'Central Africa', count: 1 },
  { country: 'Dr Congo', region: 'Central Africa', count: 4 },
  { country: 'Kenya', region: 'East Africa', count: 10 },
  { country: 'Philippines', region: 'Asia', count: 2 },
  { country: 'dubai', region: 'UAE', count: 2 },
];

const regions = [
  "All Regions",
  "Asia",
  "Caribbean",
  "Central Africa",
  "Central America",
  "East Africa",
  "Europe",
  "North America",
  "Pacific",
  "Southern Africa",
  "West Africa",
  "UAE",
];

const totalLocations = locations.reduce((sum, loc) => sum + loc.count, 0);
const totalCountries = locations.length;


export default function GlobalPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const heroImage = PlaceHolderImages.find(img => img.id === 'global-hero');

  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      const matchesRegion = selectedRegion === 'All Regions' || location.region === selectedRegion;
      const matchesSearch = location.country.toLowerCase().includes(searchTerm.toLowerCase()) || location.region.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [searchTerm, selectedRegion]);

  return (
    <div>
      <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && heroImage.imageUrl ? (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        ) : <div className="absolute inset-0 bg-primary" />}
        <div className="absolute inset-0 bg-primary/70" />
        <Animate className="relative z-10 p-4 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Global Presence</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            First Love Church is present in {totalCountries} countries with over {totalLocations} locations worldwide, spreading the message of Jesus Christ and making disciples of all nations.
          </p>
        </Animate>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Animate>
            <Card className="max-w-5xl mx-auto">
              <CardHeader>
                <CardTitle className="font-headline text-2xl md:text-3xl">Find  First Love Church Near You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search for a country or city..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="w-full md:w-[240px]">
                      <SelectValue placeholder="Filter by region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-8 text-sm text-muted-foreground">
                  <p>Found {filteredLocations.reduce((acc, loc) => acc + loc.count, 0)} locations in {filteredLocations.length} countries across {new Set(filteredLocations.map(l => l.region)).size} regions.</p>
                </div>

                <div className="max-h-[60vh] overflow-y-auto pr-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((location, index) => (
                        <Animate key={location.country} transition={{ delay: index * 0.05 }} className="p-4 rounded-lg border border-border/20 bg-card/50">
                          <h3 className="font-bold text-lg text-primary">{location.country}</h3>
                          <p className="text-sm text-muted-foreground">{location.region}</p>
                          <p className="mt-2 font-semibold">{location.count} {location.count > 1 ? 'locations' : 'location'}</p>
                        </Animate>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 font-headline text-2xl font-bold">No Locations Found</h3>
                        <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria.</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Animate>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <Animate className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold mb-8">Need Help Finding a Church?</h2>
             <div className="grid md:grid-cols-2 gap-8 text-left">
                 <Card>
                     <CardContent className="pt-6 flex items-start gap-4">
                        <Phone className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold">WhatsApp us for directions</h3>
                            <a href="https://wa.me/254733907339" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">+254 733 907 339</a>
                        </div>
                     </CardContent>
                 </Card>
                 <Card>
                     <CardContent className="pt-6 flex items-start gap-4">
                        <Mail className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold">Email Us</h3>
                            <a href="mailto:lcikenyahq@gmail.com" className="text-primary hover:underline break-all">lcikenyahq@gmail.com</a>
                        </div>
                     </CardContent>
                 </Card>
             </div>
             <p className="mt-8 text-foreground/80">
                Our team is available to help you find the nearest First Love Church location and provide any information you need about our services and activities.
             </p>
        </Animate>
      </section>
    </div>
  );
}
