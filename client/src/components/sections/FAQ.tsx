import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "What exactly is Zatch?",
      answer: "Zatch is a live and video shopping platform where sellers showcase products through live streams and short videos, and buyers can interact, negotiate, and purchase instantly inside the app."
    },
    {
      question: "What is “Zatching”?",
      answer: "Zatching is our structured bargaining system. Buyers can send an offer on a product. Sellers can accept, reject, or counter once. When both agree, the deal is locked."
    },
    {
      question: "Is it safe to buy on Zatch?",
      answer: "Yes. Payments are secured through trusted gateways. Sellers are verified. Orders are tracked. Support is available if needed. Interactive does not mean unsafe. It means transparent."
    },
    {
      question: "How do payments work?",
      answer: "Buyers can pay using UPI and supported payment methods inside the app. For certain negotiated or high-value deals, a small token amount may be required to reserve the order."
    },
    {
      question: "Do I need a website to sell on Zatch?",
      answer: "No. Zatch gives you your own digital storefront, live selling tools, video uploads, payment collection, and order management inside one app."
    },
    {
      question: "How much commission does Zatch charge?",
      answer: "Zatch operates on a low commission model designed to help sellers keep more of their margins. Exact rates are transparent inside the seller dashboard before you go live."
    },
    {
      question: "Do I need to run ads to get sales?",
      answer: "No. Zatch focuses on organic discovery through live sessions and video content. Visibility is driven by engagement, not ad spend."
    },
    {
      question: "Can I sell in my own language?",
      answer: "Yes. Sellers can go live and create content in Hindi, Telugu, English, and other supported regional languages."
    },
    {
      question: "How is Zatch different from Instagram or traditional marketplaces?",
      answer: "Instagram requires manual DMs, separate payment collection, and manual order tracking. Traditional marketplaces rely on static listings and fixed pricing. Zatch combines live selling, short video shopping, built-in negotiation, and instant checkout in one system."
    },
    {
      question: "Who is Zatch for?",
      answer: "Buyers who want interactive shopping. Sellers who want to monetize content and close deals faster."
    }
  ];

  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-bold font-display tracking-tight mb-12 text-center">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 rounded-lg bg-white/5 px-6 data-[state=open]:bg-white/10 transition-colors">
              <AccordionTrigger className="text-lg font-medium hover:no-underline text-white py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
