"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search } from 'lucide-react';
import { Animate } from '@/components/ui/animate';

const allResources = [
  { title: "The Joy of Generosity", category: "Sermon", imageId: "resource-book", description: "A message on the blessings of a generous life." },
  { title: "Foundations of Faith", category: "Book", imageId: "resource-book", description: "A book exploring the core tenets of Christianity." },
  { title: "Parenting with Purpose", category: "Article", imageId: "resource-book", description: "Practical advice for raising children in faith." },
  { title: "Worship Hits Vol. 3", category: "Media", imageId: "resource-book", description: "The latest album from our worship team." },
  { title: "Walking Through Psalms", category: "Sermon", imageId: "resource-book", description: "A sermon series on finding hope in the Psalms." },
  { title: "Community Group Guide", category: "Article", imageId: "resource-book", description: "A guide to leading and participating in small groups." },
  { title: "The Gospel of John", category: "Book", imageId: "resource-book", description: "An in-depth study of the life of Christ." },
  { title: "Hope in Hard Times", category: "Sermon", imageId: "resource-book", description: "Finding God's presence in the midst of trials." },
];

const categories = ["All", "Sermon", "Book", "Article", "Media"];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredResources = useMemo(() => {
    return allResources.filter(resource => {
      const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <Animate className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Resources</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">Explore sermons, articles, and media to help you grow in your faith journey.</p>
        </Animate>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Animate className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => {
                const image = PlaceHolderImages.find(img => img.id === resource.imageId);
                return (
                  <Animate key={resource.title} transition={{ delay: index * 0.1 }}>
                    <Card className="overflow-hidden h-full">
                      {image && (
                        <div className="relative h-48 w-full">
                          <Image src={image.imageUrl} alt={resource.title} fill className="object-cover" data-ai-hint={image.imageHint} />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="font-headline text-xl">{resource.title}</CardTitle>
                          <Badge variant="secondary">{resource.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/80">{resource.description}</p>
                      </CardContent>
                    </Card>
                  </Animate>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 font-headline text-2xl font-bold">No Resources Found</h3>
                  <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
