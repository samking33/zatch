import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const sections = [
  {
    title: "1. Scope of Service",
    content:
      "Zatch™ serves exclusively as a digital marketplace and live-streaming technology provider. We provide the infrastructure that allows independent sellers and creators to showcase products and interact with you in real-time. It is important to understand that we do not own, sell, or ship any products featured on the Platform. When you make a purchase, the contract for sale is strictly between you and the Seller. Consequently, our collection of your data is primarily to facilitate this introduction and ensure the technical stability of the live-streaming environment.",
  },
  {
    title: "2. Seller-Led Fulfillment and Data Sharing",
    content:
      "Since Sellers ship products themselves, we must share your delivery information (such as name, shipping address, and contact number) directly with the respective Seller once a purchase is confirmed. From the moment the Seller receives this information, they become an independent \"Data Fiduciary\" for the purpose of fulfillment. While we require our Sellers to respect your privacy, Zatch™ does not control how Sellers manage their independent logistics or their internal data storage. We encourage you to review the specific return and privacy terms provided by each Seller on their profile page before completing a transaction.",
  },
  {
    title: "3. Limitation of Liability and Disclaimer",
    content:
      "We provide the Platform on an \"as-is\" and \"as-available\" basis. Because we do not handle the physical inventory or the shipping process, Zatch™ is not liable for any discrepancies in shipping, lost packages, or damages occurring during transit. Our liability is limited strictly to the processing of your data on our digital interface. We are not responsible for the privacy practices of Sellers once your data has been shared with them for the purpose of shipping your order. Any disputes regarding product quality or delivery timelines must be resolved directly with the Seller through the contact information provided in your order summary.",
  },
  {
    title: "4. Collection of Interaction and Transactional Data",
    content:
      "To provide a seamless live-shopping experience, we collect data related to your interactions during a broadcast. This includes your live chat messages, questions asked to the host, and your \"click-through\" actions on featured product pins. We use this data to improve the streaming quality and to provide Sellers with anonymized analytics about the popularity of their products. By participating in a live session, you acknowledge that your public comments and username are visible to the Seller and other viewers, and we are not liable for how other users may interpret or react to your public interactions.",
  },
  {
    title: "5. Third-Party Links and External Logistics",
    content:
      "Our Platform may contain links to the Seller's own websites or third-party tracking portals provided by their chosen courier services. If you leave our app to track a package or view a Seller's external catalog, you are no longer governed by this Privacy Policy. We do not endorse or assume responsibility for the security or content of these external sites. We strongly recommend exercising caution and reviewing the privacy notices of any external logistics provider or Seller-owned platform you interact with.",
  },
  {
    title: "6. Data Retention and Order History",
    content:
      "While we do not ship the products, we do retain a record of your transactions and the data shared with Sellers for a period required by Indian law (such as for tax and audit purposes). This allows you to access your order history and facilitates our dispute resolution mechanism should you need to report a Seller. Once the statutory period for data retention expires, or when the data is no longer necessary to facilitate your relationship with the Seller, we will anonymize or delete your information in accordance with our internal data lifecycle policies.",
  },
  {
    title: "7. Communications",
    content:
      "When You use the Platform or send emails or other data, information or communication to us, You agree and understand that You are communicating with Us through electronic records and You consent to receive communications via electronic records from Us periodically and as and when required. We may communicate with you by email or by such other mode of communication, electronic or otherwise.",
  },
  {
    title: "8. Account and Registration Obligations",
    paragraphs: [
      "If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete or We have reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, or not in accordance with the Terms of Use, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform and refuse to provide You with access to the Platform.",
      "Your mobile phone number and/or e-mail address is treated as Your primary identifier on the Platform. It is your responsibility to ensure that Your mobile phone number and your email address is up to date on the Platform at all times. You agree to notify Us promptly if your mobile phone number or e-mail address changes by updating the same on the Platform through a one-time password verification.",
      "You agree that Zatch™ shall not be liable or responsible for the activities or consequences of use or misuse of any information that occurs under your Account in cases, including, where You have failed to update Your revised mobile phone number and/or e-mail address on the Platform.",
      "If You share or allow others to have access to Your account on the Platform (\"Account\"), by creating separate profiles under Your Account, or otherwise, they will be able to view and access Your Account information. You shall be solely liable and responsible for all the activities undertaken under Your Account, and any consequences therefrom.",
    ],
  },
  {
    title: "9. Data Storage & Usage Disclaimer",
    paragraphs: [
      "The Company does not store, process, or retain sensitive financial information, including credit or debit card numbers, CVV codes, banking passwords, UPI PINs, or account login credentials. All such information is collected and processed directly by secure third-party payment gateway providers in accordance with their own privacy and security standards.",
      "The Company may store limited personal and usage information such as name, contact details, device data, transaction references, and interaction history for the purpose of platform operations, analytics, service improvement, fraud prevention, and user experience optimization.",
      "Such information is used only in aggregated or anonymized form for insights and internal analysis and is not sold, rented, or traded to third parties for advertising or commercial purposes.",
      "The Company is committed to protecting personal data and processes such data in accordance with applicable data protection laws, including, where applicable, the General Data Protection Regulation (GDPR) and the Central Consumer Privacy Act (CCPA), in addition to all relevant Indian data protection laws.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      <main className="pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div {...fadeUp} className="mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display tracking-tighter mb-5 md:mb-6 text-white">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed">
              Your privacy matters to us. This policy explains how Zatch™ collects, uses, and protects your information.
            </p>
          </motion.div>

          <div className="space-y-10 md:space-y-12">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="border-b border-white/5 pb-10 md:pb-12"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{section.title}</h2>
                {section.content && (
                  <p className="text-white/50 text-sm sm:text-base leading-7">{section.content}</p>
                )}
                {section.paragraphs &&
                  section.paragraphs.map((p, j) => (
                    <p key={j} className="text-white/50 text-sm sm:text-base leading-7 mb-4 last:mb-0">
                      {p}
                    </p>
                  ))}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
