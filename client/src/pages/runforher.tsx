import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  User,
  Mail,
  MessageCircle,
  Calendar,
  Users,
  Phone,
  Droplet,
  HeartPulse,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useSEO } from "@/lib/seo";

const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];
const RUN_CATEGORY_OPTIONS = ["3K Run", "5K Run"];
const HEAR_ABOUT_OPTIONS = [
  "Social Media",
  "Friend/Family",
  "WhatsApp Group",
  "Lakshya For Needy Network",
  "Other",
];
const BLOOD_GROUP_OPTIONS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const WAIVER_TEXT = "I agree to the terms and conditions";

function PillGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              active
                ? "bg-primary text-black border-primary"
                : "bg-white/[0.04] text-white/60 border-white/10 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-white/60 mb-2">
      {children}
      {required && <span className="text-primary ml-1">*</span>}
    </label>
  );
}

export default function RunForHerPage() {
  useSEO({
    title: "Run for Her Dignity | Register for the Zatch Run Event",
    description:
      "Register for Run for Her Dignity: 3K and 5K runs on Sunday, 27th September at Kshana Coffee, Durgam Cheruvu.",
    canonical: "/runforher",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": "https://zatch.shop/runforher",
      "name": "Run for Her Dignity - Registration",
      "description": "Register for Run for Her Dignity: 3K and 5K runs on Sunday, 27th September at Kshana Coffee, Durgam Cheruvu.",
      "isPartOf": { "@id": "https://zatch.shop/#website" },
    },
  });

  const [, setLocation] = useLocation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [runCategory, setRunCategory] = useState("");
  const [hearAbout, setHearAbout] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [waiverChecked, setWaiverChecked] = useState(false);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
      return;
    }
    setLocation("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gender) {
      setStatus("error");
      setErrorMsg("Please select your gender.");
      return;
    }
    if (!runCategory) {
      setStatus("error");
      setErrorMsg("Please select a run category.");
      return;
    }
    if (!waiverChecked) {
      setStatus("error");
      setErrorMsg("Please agree to the medical and liability waiver to continue.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/google-form/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "runforher",
          fields: {
            fullName,
            email,
            whatsapp,
            age,
            gender,
            runCategory,
            hearAbout,
            emergencyName,
            emergencyContact,
            bloodGroup,
            medicalConditions,
            waiverAgreed: waiverChecked ? WAIVER_TEXT : "",
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to submit. Please try again.");
    }
  };

  const inputClass =
    "w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20 md:pb-16 min-h-[calc(100dvh-96px)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-lg mx-auto w-full mb-6">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-white mb-4 text-center">
              Run for <span className="text-primary">Her Dignity</span>
            </h1>
            <p className="text-white/50 text-base sm:text-lg text-center mb-4 max-w-lg mx-auto">
              Please fill out the details below to register for the run event.
            </p>
            <p className="text-white/80 text-base sm:text-lg text-center mb-8 md:mb-10 max-w-lg mx-auto">
              <span className="font-semibold text-primary">3K &amp; 5K</span>
              {" · Sunday, 27th September"}
              <br />
              Kshana Coffee, Durgam Cheruvu
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-lg mx-auto w-full"
          >
            {status === "success" ? (
              <div className="rounded-2xl bg-white/5 border border-primary/20 p-10 text-center">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2 font-display">You're Registered!</h2>
                <p className="text-white/50">
                  Thanks for signing up for Run for Her Dignity. See you at the starting line.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 md:p-10 space-y-6">
                <div>
                  <FieldLabel required>Full Name</FieldLabel>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel required>Email Address</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel required>WhatsApp Number</FieldLabel>
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="Enter your WhatsApp number"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel required>Age on Race Day</FieldLabel>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="number"
                      min={1}
                      max={120}
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter your age"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel required>Gender</FieldLabel>
                  <PillGroup options={GENDER_OPTIONS} value={gender} onChange={setGender} />
                </div>

                <div>
                  <FieldLabel required>Select Your Run Category</FieldLabel>
                  <PillGroup options={RUN_CATEGORY_OPTIONS} value={runCategory} onChange={setRunCategory} />
                </div>

                <div>
                  <FieldLabel>How did you hear about this event?</FieldLabel>
                  <PillGroup options={HEAR_ABOUT_OPTIONS} value={hearAbout} onChange={setHearAbout} />
                </div>

                <div className="pt-2 border-t border-white/10">
                  <p className="text-sm font-semibold text-white/80 mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Emergency Contact
                  </p>

                  <div className="space-y-6">
                    <div>
                      <FieldLabel required>Emergency Contact Name</FieldLabel>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="text"
                          required
                          value={emergencyName}
                          onChange={(e) => setEmergencyName(e.target.value)}
                          placeholder="Enter emergency contact's name"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <FieldLabel required>Emergency Contact Number</FieldLabel>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="tel"
                          required
                          value={emergencyContact}
                          onChange={(e) => setEmergencyContact(e.target.value)}
                          placeholder="Enter emergency contact's number"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <FieldLabel>Blood Group</FieldLabel>
                  <div className="relative">
                    <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-background">
                        Select your blood group
                      </option>
                      {BLOOD_GROUP_OPTIONS.map((bg) => (
                        <option key={bg} value={bg} className="bg-background">
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <FieldLabel>Any pre-existing medical conditions we should be aware of?</FieldLabel>
                  <div className="relative">
                    <HeartPulse className="absolute left-4 top-4 w-4 h-4 text-white/30" />
                    <textarea
                      value={medicalConditions}
                      onChange={(e) => setMedicalConditions(e.target.value)}
                      placeholder="Optional - let us know if there's anything we should know"
                      rows={3}
                      className={`${inputClass} pt-3.5 resize-none`}
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 rounded-xl bg-white/[0.04] border border-white/10 p-4 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={waiverChecked}
                    onChange={(e) => setWaiverChecked(e.target.checked)}
                    className="mt-0.5 w-4 h-4 shrink-0 accent-primary"
                  />
                  <span className="text-sm text-white/60 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-primary inline-block mr-1.5 -mt-0.5" />
                    <span className="font-medium text-white/80">Medical and Liability Waiver:</span> I
                    confirm that I am physically fit to participate in this 3K/5K run. I assume all risks
                    associated with participating and release the organizers and volunteers from any
                    liability for injuries or damages.
                    <span className="text-primary ml-1">*</span>
                  </span>
                </label>

                {status === "error" && (
                  <p className="text-red-400 text-sm">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-black font-bold text-base hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Register Now
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
