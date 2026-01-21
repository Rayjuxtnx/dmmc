"use client";

import { useState, useRef, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, X, Bot } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Data from the site, centralized for the chatbot
const events = [
  {
    title: "Annual Summer Picnic 🧺",
    description: "Join us for a day of fun, food, and fellowship!",
  },
  {
    title: "Bible Study: The Book of Romans 📖",
    description: "Dive deep into Paul's letter to the Romans.",
  },
  {
    title: "Worship & Prayer Night 🙏",
    description: "An evening dedicated to worship and prayer.",
  },
];

const leaders = {
    dag: {
        name: "Dag Heward-Mills",
        summary: "Our founder, Dag Heward-Mills, is a mega-church pastor who oversees over 3000 churches globally. He's also a best-selling author and leads the Healing Jesus Campaigns across Africa.",
        link: "/stories"
    },
    commey: {
        name: "Bishop Isaac OB Commey",
        summary: "Bishop OB Commey leads our church here in Kenya. He is passionate about mentorship through the Hequip Mentorship Forum and teaches on Wisdom and Leadership.",
        link: "/stories"
    },
    frantz: {
        name: "Bishop Augustine Frantz",
        summary: "Bishop Augustine Frantz presides over the Double Mega Missionary Church. His ministry focuses on evangelical outreach, missionary work, and spiritual growth through initiatives like the 'Double Mega Experience'.",
        link: "/stories"
    }
}

const choirs = [
    "Dancing Stars ✨",
    "Doxa Chorus 🎶",
    "Hallelujah Chorus 🙌",
    "Glorious Choir 🕊️",
    "Greater Love Choir ❤️"
];

// --- Conversation Tree ---
type ConversationNode = {
  id: string;
  sender: 'bot' | 'user';
  content: React.ReactNode;
  options?: { text: string; nextNode: string }[];
  isInput?: boolean;
};

const conversationTree: { [key: string]: Omit<ConversationNode, 'id'> } = {
  start: {
    sender: 'bot',
    content: "Hi there! 👋 I'm the DMMC assistant. How can I help you today? Choose one of the topics below.",
    options: [
      { text: 'Tell me about the church', nextNode: 'about' },
      { text: 'Upcoming Events', nextNode: 'events' },
      { text: 'How to Get Involved', nextNode: 'getInvolved' },
      { text: 'Our Leaders', nextNode: 'ourLeaders' },
      { text: 'I want to know Jesus', nextNode: 'salvation' },
    ],
  },
  // About branch
  about: {
    sender: 'bot',
    content: (
        <>
            <p>We are a diverse family united by our love for Jesus! ❤️ We are passionate about sharing His message of hope and building a community where everyone feels they belong.</p>
            <p className="mt-2">Would you like to know more about our mission and vision?</p>
        </>
    ),
    options: [{ text: 'Yes, tell me more!', nextNode: 'aboutMore' }, { text: 'Back to topics', nextNode: 'start' }],
  },
  aboutMore: {
    sender: 'bot',
    content: (
      <>
        <p>Our mission is to lead people into a growing relationship with Jesus Christ. You can read all about our story, our beliefs, and meet the team on our 'Who We Are' page!</p>
        <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href="/about">Learn More About Us</Link></Button>
      </>
    ),
    options: [{ text: 'Ask another question', nextNode: 'start' }],
  },

  // Events branch
  events: {
    sender: 'bot',
    content: (
      <>
        <p>We've always got something exciting happening! Here's a peek at what's coming up:</p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          {events.map(event => <li key={event.title}>{event.title} - {event.description}</li>)}
        </ul>
        <p className="mt-2">For dates, times, and more details, check out our full events calendar!</p>
        <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href="/events">View All Events</Link></Button>
      </>
    ),
    options: [{ text: 'Ask another question', nextNode: 'start' }],
  },

  // Get Involved branch
  getInvolved: {
    sender: 'bot',
    content: "That's wonderful! 🙌 There are so many ways to use your talents for God. What are you passionate about?",
    options: [
        { text: "Singing / Music 🎤", nextNode: 'getInvolved_singing' },
        { text: "Dancing 💃", nextNode: 'getInvolved_dancing' },
        { text: "Media / Creative 🎨", nextNode: 'getInvolved_media' },
        { text: "Greeting / Ushering 🙏", nextNode: 'getInvolved_ushers' },
    ]
  },
  getInvolved_singing: {
    sender: 'bot',
    content: (
        <>
            <p>Our choirs are the heart of our worship! We have several amazing groups:</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
                {choirs.map(choir => <li key={choir}>{choir}</li>)}
            </ul>
            <p className="mt-2">Each has a unique style. Find out more and how to join on our ministries page!</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href="/get-involved">Join a Ministry</Link></Button>
        </>
    ),
    options: [{ text: 'Back to involvement types', nextNode: 'getInvolved' }, { text: 'Ask another question', nextNode: 'start' }]
  },
  getInvolved_dancing: {
    sender: 'bot',
    content: (
        <>
            <p>Our 'Dancing Stars' ministry expresses worship through movement! 🕺 They minister during services and special events. If you love to dance, this is the place for you!</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href="/get-involved">Learn about Dancing Stars</Link></Button>
        </>
    ),
     options: [{ text: 'Back to involvement types', nextNode: 'getInvolved' }, { text: 'Ask another question', nextNode: 'start' }]
  },
   getInvolved_media: {
    sender: 'bot',
    content: (
        <>
            <p>The Media and 'Air Posters' (Creatives) teams are vital! 💻 From camera operation and sound engineering to graphic design for events, they make our services accessible and beautiful.</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href="/get-involved">Join the Creative Team</Link></Button>
        </>
    ),
     options: [{ text: 'Back to involvement types', nextNode: 'getInvolved' }, { text: 'Ask another question', nextNode: 'start' }]
  },
   getInvolved_ushers: {
    sender: 'bot',
    content: (
        <>
            <p>Our Ushers are the first friendly face visitors see! 😊 They create a welcoming atmosphere and assist with the service flow. It's a crucial and rewarding role.</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href="/get-involved">Become an Usher</Link></Button>
        </>
    ),
     options: [{ text: 'Back to involvement types', nextNode: 'getInvolved' }, { text: 'Ask another question', nextNode: 'start' }]
  },

  // Our Leaders branch
  ourLeaders: {
    sender: 'bot',
    content: 'Our church is blessed with incredible leaders. Who would you like to learn more about?',
    options: [
        { text: leaders.dag.name, nextNode: 'leader_dag' },
        { text: leaders.commey.name, nextNode: 'leader_commey' },
        { text: leaders.frantz.name, nextNode: 'leader_frantz' },
    ]
  },
  leader_dag: {
    sender: 'bot',
    content: (
        <>
            <p>{leaders.dag.summary}</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href={leaders.dag.link}>Read His Full Story</Link></Button>
        </>
    ),
    options: [{ text: 'Learn about another leader', nextNode: 'ourLeaders'}, { text: 'Back to topics', nextNode: 'start' }],
  },
  leader_commey: {
    sender: 'bot',
    content: (
        <>
            <p>{leaders.commey.summary}</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href={leaders.commey.link}>Read His Full Story</Link></Button>
        </>
    ),
    options: [{ text: 'Learn about another leader', nextNode: 'ourLeaders'}, { text: 'Back to topics', nextNode: 'start' }],
  },
   leader_frantz: {
    sender: 'bot',
    content: (
        <>
            <p>{leaders.frantz.summary}</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href={leaders.frantz.link}>Read His Full Story</Link></Button>
        </>
    ),
    options: [{ text: 'Learn about another leader', nextNode: 'ourLeaders'}, { text: 'Back to topics', nextNode: 'start' }],
  },

  // Salvation branch
  salvation: {
    sender: 'bot',
    content: (
        <>
            <p>Receiving Jesus is the most important decision you can ever make. It's about accepting His great love and starting a new life. ❤️</p>
            <p className="mt-2">Are you ready to take this step?</p>
        </>
    ),
    options: [{ text: "Yes, I'm ready", nextNode: 'salvation_prayer' }, { text: 'I have some questions', nextNode: 'salvation_moreInfo' }],
  },
  salvation_prayer: {
    sender: 'bot',
    content: (
        <>
            <p>That's amazing news! Pray this from your heart:</p>
            <blockquote className="mt-2 border-l-2 border-primary pl-2 italic text-sm">
                Lord Jesus, I come to you today, just as I am. I am a Sinner. Please forgive me of all my Sins. Please write my name in the Book of Life. From today, I belong to you. I will love you. I will serve you, All the days of my life! I love you Jesus! Thank you for saving my soul!
            </blockquote>
            <p className="mt-2">If you prayed that prayer, welcome to the family of God! We'd love to connect with you. Please let us know on our 'Jesus' page.</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href="/jesus">I Have Prayed</Link></Button>
        </>
    ),
    options: [{ text: 'Ask another question', nextNode: 'start' }],
  },
  salvation_moreInfo: {
    sender: 'bot',
    content: (
        <>
            <p>It's great that you're seeking. The Bible says in Romans 3:23 that "all have sinned and fall short of the glory of God," but God's love is so great He made a way for us to be with Him forever through Jesus.</p>
            <p className="mt-2">We have more information about this incredible gift on our website.</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href="/jesus">Learn about salvation</Link></Button>
        </>
    ),
    options: [{ text: "I'm ready to pray now", nextNode: 'salvation_prayer' }, { text: 'Ask another question', nextNode: 'start' }],
  },

};

type Message = {
  id: number;
  node: ConversationNode;
};

// --- Component ---
export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<Message[]>([
      { id: 0, node: { ...conversationTree.start, id: 'start' } }
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const latestMessageId = history[history.length - 1]?.id ?? 0;

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [history]);

  const handleOptionSelect = (text: string, nextNode: string) => {
    const userMessage: Message = {
        id: history.length,
        node: { id: `user-${history.length}`, sender: 'user', content: text },
    };

    const botResponse: Message = {
        id: history.length + 1,
        node: { ...conversationTree[nextNode], id: nextNode }
    };
    
    setHistory(prev => [...prev, userMessage, botResponse]);
  };

  const ChatBubble = ({ message, onSelect }: { message: Message, onSelect: (text: string, nextNode: string) => void }) => {
    const { sender, content, options } = message.node;
    const isBot = sender === 'bot';

    return (
        <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
            <div className={`flex items-end gap-2 ${isBot ? '' : 'flex-row-reverse'}`}>
                {isBot && <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-bold font-headline text-sm"><Bot size={20} /></div>}
                <div
                    className={`max-w-[85%] rounded-lg p-3 text-sm ${
                        isBot
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                >
                    {content}
                </div>
            </div>
            {isBot && options && (
                <div className="flex flex-col gap-2 mt-3 pl-10 w-full">
                    {options.map((option, index) => (
                        <Button key={index} variant="outline" size="sm" className="justify-start h-auto py-2" onClick={() => onSelect(option.text, option.nextNode)}>
                            {option.text}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/50 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg z-50 bg-primary hover:bg-primary/90 text-primary-foreground"
            aria-label="Open Chat"
          >
            <MessageSquare className="h-8 w-8" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          className="w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[80vh] p-0 border-none shadow-2xl mr-4 mb-2"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Card className="h-full flex flex-col bg-card/80">
            <CardHeader className="flex flex-row items-center justify-between border-b">
              <div>
                <CardTitle className="font-headline">DMMC Assistant</CardTitle>
                <CardDescription>Your friendly guide to our church!</CardDescription>
              </div>
               <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                  <X className="h-4 w-4" />
               </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollAreaRef}>
              <AnimatePresence initial={false}>
                {history.map((message) => (
                  <motion.div
                    key={message.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                      <ChatBubble message={message} onSelect={handleOptionSelect} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </>
  );
}
