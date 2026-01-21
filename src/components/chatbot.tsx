
"use client";

import { useState, useRef, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, X, Bot, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { generalChat } from '@/ai/flows/chatbot-flow';

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
    content: "Hi there! 👋 I'm the DMMC assistant. How can I help you today? Choose one of the topics below, or type your question.",
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
            <p>That's a great question! At DMMC, we see ourselves as a diverse family, all brought together by our shared love for Jesus Christ ❤️. Our main goal is to share His message of hope and create a welcoming community where everyone feels they truly belong.</p>
            <p className="mt-2">Would you like me to tell you more about our specific mission and vision?</p>
        </>
    ),
    options: [{ text: 'Yes, tell me more!', nextNode: 'aboutMore' }, { text: 'Back to topics', nextNode: 'start' }],
  },
  aboutMore: {
    sender: 'bot',
    content: (
      <>
        <p>Absolutely! Our core mission is to help people grow in their relationship with Jesus Christ. We do this by creating environments where people feel encouraged and equipped. For a deeper dive into our story, our core beliefs, and to meet the wonderful people on our team, I recommend visiting our 'Who We Are' page. It has all the details!</p>
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
        <p>There's always something wonderful happening at DMMC! We love getting together as a community. Here are a few of our regular events to give you an idea:</p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          {events.map(event => <li key={event.title}>{event.title} - {event.description}</li>)}
        </ul>
        <p className="mt-2">This is just a small sample, of course! For all the details, including dates, times, and locations for these and other special events, you'll want to check out our full events page.</p>
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
            <p>That's wonderful to hear! Music is a huge part of our worship experience. We are blessed with several amazing choirs, each with its own unique sound and style:</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
                {choirs.map(choir => <li key={choir}>{choir}</li>)}
            </ul>
            <p className="mt-2">They all contribute so much to our services. You can learn more about each one and find out how to get involved by visiting our ministries page.</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href="/get-involved">Join a Ministry</Link></Button>
        </>
    ),
    options: [{ text: 'Back to involvement types', nextNode: 'getInvolved' }, { text: 'Ask another question', nextNode: 'start' }]
  },
  getInvolved_dancing: {
    sender: 'bot',
    content: (
        <>
            <p>Fantastic! Our 'Dancing Stars' ministry is a vibrant group that expresses worship through the beautiful art of movement 🕺. They minister during services and special events, bringing so much energy and passion. If you have a heart for dance, it's a wonderful place to use your gift!</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href="/get-involved">Learn about Dancing Stars</Link></Button>
        </>
    ),
     options: [{ text: 'Back to involvement types', nextNode: 'getInvolved' }, { text: 'Ask another question', nextNode: 'start' }]
  },
   getInvolved_media: {
    sender: 'bot',
    content: (
        <>
            <p>Excellent choice! The Media team and our 'Air Posters' (the creatives) are absolutely vital to our mission 💻. They handle everything from camera operation and sound engineering to creating beautiful graphics for our events. They're the ones who make sure our services are accessible and look great, both in person and online.</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href="/get-involved">Join the Creative Team</Link></Button>
        </>
    ),
     options: [{ text: 'Back to involvement types', nextNode: 'getInvolved' }, { text: 'Ask another question', nextNode: 'start' }]
  },
   getInvolved_ushers: {
    sender: 'bot',
    content: (
        <>
            <p>That's such an important ministry! Our Ushers are often the very first friendly face that visitors and members see when they arrive 😊. They do an amazing job of creating a warm, welcoming atmosphere and helping services run smoothly. It's a truly crucial and rewarding role in our church family.</p>
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
            <p>Of course! Here's a little about our founder, {leaders.dag.name}:</p>
            <p className="mt-2">{leaders.dag.summary}</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href={leaders.dag.link}>Read His Full Story</Link></Button>
        </>
    ),
    options: [{ text: 'Learn about another leader', nextNode: 'ourLeaders'}, { text: 'Back to topics', nextNode: 'start' }],
  },
  leader_commey: {
    sender: 'bot',
    content: (
        <>
            <p>Certainly! Here is some information about {leaders.commey.name}:</p>
            <p className="mt-2">{leaders.commey.summary}</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href={leaders.commey.link}>Read His Full Story</Link></Button>
        </>
    ),
    options: [{ text: 'Learn about another leader', nextNode: 'ourLeaders'}, { text: 'Back to topics', nextNode: 'start' }],
  },
   leader_frantz: {
    sender: 'bot',
    content: (
        <>
            <p>I'd be happy to tell you about {leaders.frantz.name}:</p>
            <p className="mt-2">{leaders.frantz.summary}</p>
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
            <p>I'm so glad you're asking. It's the most important question anyone can explore. The Bible explains that we've all made mistakes, or 'sinned,' which separates us from God (Romans 3:23). But the amazing news is that God's love is so immense, He provided a way for us to be reconnected with Him forever through His son, Jesus.</p>
            <p className="mt-2">We've put together some more information about this incredible gift on our website, which I think you'll find helpful.</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2"><Link href="/jesus">Learn about salvation</Link></Button>
        </>
    ),
    options: [{ text: "I'm ready to pray now", nextNode: 'salvation_prayer' }, { text: 'Ask another question', nextNode: 'start' }],
  },
  unrecognized: {
    sender: 'bot',
    content: "I'm sorry, I'm still learning and didn't quite understand your request. Could you perhaps rephrase it? Or, you can choose from one of the main topics below, and I'll do my best to guide you.",
    options: [
      { text: 'About the Church', nextNode: 'about' },
      { text: 'Upcoming Events', nextNode: 'events' },
      { text: 'Get Involved', nextNode: 'getInvolved' },
      { text: 'Our Leaders', nextNode: 'ourLeaders' },
      { text: 'Know Jesus', nextNode: 'salvation' },
    ],
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
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [history, isThinking]);
  
  useEffect(() => {
    if (isOpen) {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }
  }, [isOpen]);

  const handleOptionSelect = (text: string, nextNodeId: string) => {
    const userMessage: Message = {
        id: Date.now() + 1,
        node: { id: `user-${Date.now()}`, sender: 'user', content: text },
    };

    const botResponse: Message = {
        id: Date.now() + 2,
        node: { ...conversationTree[nextNodeId], id: nextNodeId }
    };
    
    setHistory(prev => [...prev, userMessage, botResponse]);
  };

  const handleTextInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isThinking) return;

    const userMessage: Message = {
        id: Date.now(),
        node: { id: `user-${Date.now()}`, sender: 'user', content: text },
    };
    
    setHistory(prev => [...prev, userMessage]);
    setInputValue('');
    
    const lowerCaseInput = text.toLowerCase();
    let nextNodeId = 'unrecognized';

    if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
        nextNodeId = 'start';
    } else if (lowerCaseInput.includes('about') || (lowerCaseInput.includes('church') && !lowerCaseInput.includes('leader'))) {
        nextNodeId = 'about';
    } else if (lowerCaseInput.includes('event')) {
        nextNodeId = 'events';
    } else if (lowerCaseInput.includes('involved') || lowerCaseInput.includes('join')) {
        nextNodeId = 'getInvolved';
    } else if (lowerCaseInput.includes('leader') || lowerCaseInput.includes('bishop') || lowerCaseInput.includes('dag')) {
        nextNodeId = 'ourLeaders';
    } else if (lowerCaseInput.includes('jesus') || lowerCaseInput.includes('salvation') || lowerCaseInput.includes('pray')) {
        nextNodeId = 'salvation';
    } else if (lowerCaseInput.includes('sing') || lowerCaseInput.includes('choir')) {
        nextNodeId = 'getInvolved_singing';
    } else if (lowerCaseInput.includes('danc')) {
        nextNodeId = 'getInvolved_dancing';
    } else if (lowerCaseInput.includes('media') || lowerCaseInput.includes('creative') || lowerCaseInput.includes('poster')) {
        nextNodeId = 'getInvolved_media';
    } else if (lowerCaseInput.includes('usher') || lowerCaseInput.includes('greet')) {
        nextNodeId = 'getInvolved_ushers';
    }

    if (nextNodeId !== 'unrecognized') {
        const botResponse: Message = {
            id: Date.now() + 1,
            node: { ...conversationTree[nextNodeId], id: nextNodeId }
        };
        setHistory(prev => [...prev, botResponse]);
    } else {
        setIsThinking(true);
        try {
            const aiResponse = await generalChat(text);
            const botMessage: Message = {
                id: Date.now() + 1,
                node: {
                    id: `ai-${Date.now()}`,
                    sender: 'bot',
                    content: aiResponse,
                    options: [
                        { text: 'Ask another question', nextNode: 'start' }
                    ]
                }
            };
            setHistory(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error calling AI flow:", error);
            const errorMessage: Message = {
                id: Date.now() + 1,
                node: { ...conversationTree.unrecognized, id: 'unrecognized' }
            };
            setHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsThinking(false);
        }
    }
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
            {isBot && options && message.id === history[history.length-1]?.id && (
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

  const TypingIndicator = () => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-start"
    >
      <div className="flex items-end gap-2">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-bold font-headline text-sm"><Bot size={20} /></div>
        <div className="max-w-[85%] rounded-lg p-3 text-sm bg-secondary text-secondary-foreground">
           <div className="flex gap-1.5 items-center">
              <span className="h-2 w-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
              <span className="h-2 w-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="h-2 w-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/50 backdrop-blur-xl"
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
            <AnimatePresence>
                {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
            </AnimatePresence>
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
              {isThinking && <TypingIndicator />}
            </CardContent>
            <CardFooter className="p-4 border-t">
              <form onSubmit={handleTextInputSubmit} className="w-full flex items-center gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  autoComplete="off"
                  disabled={isThinking}
                />
                <Button type="submit" size="icon" aria-label="Send Message" disabled={isThinking}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    </>
  );
}
