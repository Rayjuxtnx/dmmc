"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MessageSquare, X } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

type Message = {
  id: number;
  sender: 'bot' | 'user';
  content: React.ReactNode;
};

const topics = {
  about: {
    question: 'Tell me about DMMC',
    answer: (
      <>
        <p>At PRINCE OF PEACE CATHEDRAL NAIROBI, we are a diverse family united by our love for Jesus. We are passionate about sharing His message of hope and building a community where everyone feels they belong.</p>
        <Button asChild variant="link" className="p-0 h-auto mt-2">
          <Link href="/about">Learn More About Us</Link>
        </Button>
      </>
    ),
  },
  events: {
    question: 'What events are happening?',
    answer: (
      <>
        <p>We have many exciting events throughout the year. You can find a full list on our events page.</p>
        <Button asChild variant="link" className="p-0 h-auto mt-2">
          <Link href="/events">View All Events</Link>
        </Button>
      </>
    ),
  },
  involved: {
    question: 'How can I get involved?',
    answer: (
      <>
        <p>We have many creative ministries where you can use your talents to serve God, from dance and choir to media and design.</p>
        <Button asChild variant="link" className="p-0 h-auto mt-2">
          <Link href="/get-involved">See all ministries</Link>
        </Button>
      </>
    ),
  },
  salvation: {
    question: 'What is salvation?',
    answer: (
      <>
        <p>The great love of God will change your life forever. When you open up your heart to receive this great love, you will be Born Again.</p>
        <Button asChild variant="link" className="p-0 h-auto mt-2">
          <Link href="/jesus">Learn about salvation</Link>
        </Button>
      </>
    ),
  },
  location: {
    question: 'Where are you located?',
    answer: (
      <>
        <p>Our main campus is located Off Jogoo Road, near Aquinas High School, Nairobi. We also have a global presence!</p>
        <Button asChild variant="link" className="p-0 h-auto mt-2">
          <Link href="/connect">Get Directions</Link>
        </Button>
      </>
    ),
  },
};

const TopicSelector = ({ onSelectTopic }: { onSelectTopic: (topicId: keyof typeof topics) => void }) => (
  <div className="flex flex-col gap-2">
    {Object.entries(topics).map(([id, { question }]) => (
      <Button key={id} variant="outline" onClick={() => onSelectTopic(id as keyof typeof topics)}>
        {question}
      </Button>
    ))}
  </div>
);

const initialBotMessage: Message = {
  id: 0,
  sender: 'bot',
  content: (
    <>
      <p className="font-medium">Welcome to DMMC! I'm here to help. What can I assist you with today?</p>
    </>
  ),
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [showTopics, setShowTopics] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSelectTopic = (topicId: keyof typeof topics) => {
    const topic = topics[topicId];
    const userMessage: Message = {
      id: messages.length,
      sender: 'user',
      content: <p>{topic.question}</p>,
    };
    const botResponse: Message = {
      id: messages.length + 1,
      sender: 'bot',
      content: topic.answer,
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setShowTopics(false);
  };

  const handleRestart = () => {
    setMessages([initialBotMessage]);
    setShowTopics(true);
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/10 backdrop-blur-md"
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
          className="w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] p-0 border-none shadow-2xl mr-4 mb-2"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between border-b">
              <div>
                <CardTitle className="font-headline">DMMC Assistant</CardTitle>
                <CardDescription>Ask me anything about our church!</CardDescription>
              </div>
               <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                  <X className="h-4 w-4" />
               </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollAreaRef}>
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : ''}`}
                  >
                    {message.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-bold font-headline text-sm">D</div>}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 text-sm ${
                        message.sender === 'bot'
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {showTopics && (
                  <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: messages.length * 0.1 }}
                  >
                      <TopicSelector onSelectTopic={handleSelectTopic} />
                  </motion.div>
              )}
            </CardContent>
              {!showTopics && (
                  <CardFooter className="border-t pt-4">
                      <Button onClick={handleRestart} className="w-full">Ask another question</Button>
                  </CardFooter>
              )}
          </Card>
        </PopoverContent>
      </Popover>
    </>
  );
}
