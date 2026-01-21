
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Animate } from "@/components/ui/animate";
import { ArrowRight } from 'lucide-react';

export default function StoriesPage() {
  const dagImage = PlaceHolderImages.find(img => img.id === 'dag-heward-mills-portrait');
  const bishopImage = PlaceHolderImages.find(img => img.id === 'bishop-ob-commey-portrait');
  const frantzImage = PlaceHolderImages.find(img => img.id === 'bishop-augustine-frantz-portrait');

  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <Animate className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Our Stories</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">Read about the incredible journeys of our leaders.</p>
        </Animate>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl space-y-16">
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
            <Animate>
                <Card className="overflow-hidden">
                    <div className="md:flex md:gap-8">
                        <div className="md:w-1/3 p-6 flex items-center justify-center">
                            {bishopImage && (
                                <div className="relative w-64 h-64">
                                    <Image
                                        src={bishopImage.imageUrl}
                                        alt="Bishop OB Commey"
                                        fill
                                        className="rounded-full shadow-lg object-cover"
                                        data-ai-hint={bishopImage.imageHint}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="md:w-2/3">
                            <CardHeader>
                                <CardTitle className="font-headline text-3xl">Bishop Isaac OB Commey</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-foreground/80">
                                <p>Bishop Isaac OB Commey is a high-ranking minister within the United Denominations Originating from the Lighthouse Group of Churches (UD-OLGC). His ministry began as a missionary and has expanded into senior leadership roles across Africa.</p>
                                
                                <h3 className="font-bold text-lg text-foreground/90 pt-2">Ministry Timeline and Roles</h3>
                                <p><strong>Early Ministry and Missionary Work:</strong> Most bishops in the UD-OLGC, including Bishop Commey, began their service as students and rose through the ranks. He served as a missionary in various African nations, contributing to the "church planting" mandate of the UD-OLGC.</p>
                                <p><strong>Ghana Roots:</strong> Before moving to East Africa, he was established in the core ministry in Ghana, where the Lighthouse Group of Churches was founded by Bishop Dag Heward-Mills.</p>
                                <p><strong>Leadership in Kenya:</strong> He currently serves as a presiding bishop in Nairobi, Kenya. He leads the First Love Church Kenya, headquartered at The Prince of Peace Cathedral (formerly Lighthouse Chapel International Nairobi).</p>
                                <p><strong>Consecration:</strong> He was formally consecrated as a Bishop in the UD-OLGC, a role that involves overseeing multiple congregations and mentoring junior pastors.</p>
                                
                                <h3 className="font-bold text-lg text-foreground/90 pt-2">Core Ministerial Focus</h3>
                                <p><strong>Mentorship (Hequip):</strong> A central part of his current work is the Hequip Mentorship Forum, through which he provides structured training and spiritual guidance for young leaders and professionals.</p>
                                <p><strong>Teaching and Outreach:</strong> His ministry is characterized by an emphasis on Wisdom and Leadership. He hosts a podcast series including titles such as "How to Get Wisdom" and "The Art of Leadership".</p>
                                <p><strong>Evangelistic Events:</strong> He frequently organizes and presides over major events like "Swollen Saturday" and "Attempt Great Things" Sundays, which focus on spiritual growth and church expansion.</p>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </Animate>
            <Animate>
                <Card className="overflow-hidden">
                    <div className="md:flex md:gap-8">
                        <div className="md:w-1/3 p-6 flex items-center justify-center">
                            {frantzImage && (
                                <div className="relative w-64 h-64">
                                    <Image
                                        src={frantzImage.imageUrl}
                                        alt="Bishop Augustine Frantz"
                                        fill
                                        className="rounded-full shadow-lg object-cover"
                                        data-ai-hint={frantzImage.imageHint}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="md:w-2/3">
                            <CardHeader>
                                <CardTitle className="font-headline text-3xl">Bishop Augustine Frantz</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-foreground/80">
                                <p>Bishop Augustine Frantz is a prominent religious leader and the presiding Bishop of the Double Mega Missionary Church - Nairobi Aparche, a ministry based in the City Estate area of Kenya. His work is deeply influenced by the teachings of Bishop Dag Heward-Mills, specifically the vision of establishing "Double Mega Missionary" churches characterized by rapid expansion, missionary zeal, and significant community impact.</p>
                                
                                <h3 className="font-bold text-lg text-foreground/90 pt-2">Ministerial Career and Leadership</h3>
                                <p>Bishop Frantz’s ministry reached a significant milestone in October 2023 when he was formally consecrated as a Bishop. Since then, he has served as the lead pastor of the Nairobi Aparche branch, steering the church through several key ministerial phases:</p>
                                <p><strong>Evangelical Outreach:</strong> He leads the Miracle Encounter Services, which serve as the central hub for his ministry’s spiritual activities. These services focus on prophetic ministry, atmospheric worship, and divine healing.</p>
                                <p><strong>The "Double Mega" Experience:</strong> In 2026, he remains at the forefront of the "Double Mega Experience," a spiritual initiative aimed at "doubling" the church's reach, grace, and testimonies within the Nairobi region.</p>
                                <p><strong>Missionary Focus:</strong> True to the "Missionary" title of his church, Bishop Frantz prioritizes International Missions Sundays and global missionary campaigns, often collaborating with other leaders within the United Denominations Originating from the Lighthouse Group of Churches (UD-OLGC).</p>
                                <p><strong>Apostolic Influence:</strong> He is known for hosting apostolic encounters, such as the Phanerosis Convention and various "Swollen Sunday" campaigns designed to drive church growth and member engagement.</p>
                                
                                <h3 className="font-bold text-lg text-foreground/90 pt-2">Ministry Philosophy</h3>
                                <p>Bishop Frantz’s ministry is defined by a commitment to the "Season of Withdrawal"—dedicated periods of prayer and fasting—and a focus on "Attempting Great Things for God". His teaching frequently emphasizes church growth strategies, spiritual warfare, and the "Soul Winning" campaign to ensure the church remains a vibrant, missionary-minded institution in East Africa.</p>
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

    
