import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface FloatingCard {
  id: number;
  title: string;
  excerpt: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  delay: number;
}

const generateCards = (): FloatingCard[] => {
  const cards = [
    { title: 'RAG Best Practices', excerpt: 'Optimizing retrieval-augmented generation systems for production...' },
    { title: 'Document Parsing', excerpt: 'Advanced techniques for PDF and document extraction...' },
    { title: 'Vector Databases', excerpt: 'Comparing embedding storage solutions for AI applications...' },
    { title: 'Chunking Strategies', excerpt: 'Optimal text segmentation for knowledge base creation...' },
    { title: 'LLM Integration', excerpt: 'Connecting multiple language models for enhanced workflows...' },
    { title: 'Agent Workflows', excerpt: 'Building autonomous AI agents with RAGFlow...' },
    { title: 'Knowledge Graphs', excerpt: 'Representing relationships in document collections...' },
    { title: 'Multi-modal RAG', excerpt: 'Processing images, audio, and text in unified systems...' },
  ];

  return cards.map((card, index) => ({
    id: index,
    title: card.title,
    excerpt: card.excerpt,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotate: (Math.random() - 0.5) * 15,
    scale: 0.8 + Math.random() * 0.4,
    delay: index * 0.2,
  }));
};

export const FloatingBackground = () => {
  const [cards, setCards] = useState<FloatingCard[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCards(generateCards());
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white" />
      
      {/* Floating cards */}
      {cards.map((card, index) => {
        // Position cards in corners and edges
        const position = index % 8;
        let left, top;
        
        switch (position) {
          case 0: left = '5%'; top = '10%'; break;
          case 1: left = '80%'; top = '5%'; break;
          case 2: left = '85%'; top = '25%'; break;
          case 3: left = '2%'; top = '30%'; break;
          case 4: left = '88%'; top = '60%'; break;
          case 5: left = '3%'; top = '65%'; break;
          case 6: left = '75%'; top = '80%'; break;
          case 7: left = '8%'; top = '85%'; break;
          default: left = '50%'; top = '50%';
        }

        return (
          <motion.div
            key={card.id}
            className="absolute w-48 p-4 bg-white rounded-lg shadow-lg border border-gray-100"
            style={{
              left,
              top,
              transform: `rotate(${card.rotate}deg) scale(${card.scale})`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 0.6,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: card.delay },
              y: {
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.delay,
              }
            }}
          >
            {/* Card header with icon */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="h-2 w-16 bg-gray-200 rounded" />
            </div>
            
            {/* Card title */}
            <div className="h-3 w-24 bg-gray-800 rounded mb-2" />
            
            {/* Card excerpt lines */}
            <div className="space-y-1.5">
              <div className="h-1.5 w-full bg-gray-100 rounded" />
              <div className="h-1.5 w-4/5 bg-gray-100 rounded" />
              <div className="h-1.5 w-3/5 bg-gray-100 rounded" />
            </div>

            {/* Decorative elements */}
            <div className="mt-3 flex gap-1">
              <div className="h-1.5 w-8 bg-teal-100 rounded" />
              <div className="h-1.5 w-6 bg-cyan-100 rounded" />
            </div>
          </motion.div>
        );
      })}

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #171717 1px, transparent 1px),
            linear-gradient(to bottom, #171717 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient fade at edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-60" />
    </div>
  );
};

export default FloatingBackground;
