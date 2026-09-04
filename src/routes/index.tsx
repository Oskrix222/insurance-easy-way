import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { Menu, X, ChevronDown, Shield, Heart, Home, Plane, Building2, Clock, Phone, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitLead, leadSchema, type LeadFormData } from "@/lib/leads.functions";
import heroImage from "@/assets/hero-family.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KAMIEŃ — Ubezpieczenia dla Ciebie i Twojej rodziny" },
      { name: "description", content: "KAMIEŃ — ubezpieczenia na życie, mieszkania, turystyczne i dla firm. Zostaw kontakt, a doradca przygotuje najlepszą ofertę w ciągu 24h." },
      { property: "og:title", content: "KAMIEŃ — Ubezpieczenia dla Ciebie i Twojej rodziny" },
      { property: "og:description", content: "Zostaw kontakt, a doradca przygotuje najlepszą ofertę ubezpieczenia w ciągu 24h." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navItems = [
  { label: "Na życie", href: "#ubezpieczenia" },
  { label: "Dom / mieszkanie", href: "#ubezpieczenia" },
  { label: "Turystyczne", href: "#ubezpieczenia" },
  { label: "Dla firm", href: "#ubezpieczenia" },
];

const insuranceTypes = [
  { value: "life", label: "Na życie", icon: Heart },
  { value: "home", label: "Dom / mieszkanie", icon: Home },
  { value: "travel", label: "Turystyczne", icon: Plane },
  { value: "business", label: "Dla firm", icon: Building2 },
];

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sendLead = useServerFn(submitLead);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      insuranceType: "",
      message: "",
    },
  });

  const selectedType = watch("insuranceType");

  const onSubmit = async (data: LeadFormData) => {
    try {
      await sendLead({ data });
      toast.success("Zgłoszenie wysłane! Doradca skontaktuje się z Tobą w ciągu 24h.");
      reset();
    } catch {
      toast.error("Nie udało się wysłać zgłoszenia. Spróbuj ponownie później.");
    }
  };

  const scrollToForm = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-display text-2xl tracking-tight text-foreground">
            KAMIEŃ
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-md px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <Button onClick={scrollToForm} size="sm" className="ml-4">
              Zostaw kontakt
            </Button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border/50 bg-background px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-md px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button onClick={scrollToForm} className="mt-2 w-full">
                Zostaw kontakt
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero — wireframe layout */}
      <section className="relative min-h-screen pt-16">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 gap-0 lg:grid-cols-12">
          {/* Left column */}
          <div className="relative flex flex-col justify-between px-4 py-12 sm:px-6 lg:col-span-5 lg:px-8 lg:py-16">
            {/* Top hook bar */}
            <div className="animate-slide opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                <Shield className="h-4 w-4 text-terracotta" />
                <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Ubezpieczenia dla całej rodziny
                </span>
              </div>
            </div>

            {/* Main motto block */}
            <div className="my-auto py-12">
              <h1 className="animate-rise font-display text-5xl leading-[0.95] text-foreground opacity-0 sm:text-6xl lg:text-7xl" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
                SPOKÓJ,
                <br />
                <span className="text-terracotta">KTÓREGO</span>
                <br />
                NIE DA SIĘ
                <br />
                WYCENIĆ
              </h1>
              <p className="animate-rise mt-6 max-w-md text-base leading-relaxed text-muted-foreground opacity-0" style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}>
                Doradztwo ubezpieczeniowe, które stawia ludzi ponad polisami. Porównujemy oferty,
                tłumaczymy drobny druk i pomagamy wybrać ochronę dopasowaną do Twojego życia.
              </p>
              <div className="animate-rise mt-8 flex flex-wrap gap-4 opacity-0" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
                <Button onClick={scrollToForm} size="lg" className="h-12 px-8 text-base">
                  Bezpłatna wycena
                </Button>
                <a
                  href="#o-nas"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-base font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Dowiedz się więcej
                </a>
              </div>
            </div>

            {/* Stats row */}
            <div className="animate-rise grid grid-cols-3 gap-4 border-t border-border pt-8 opacity-0" style={{ animationDelay: "0.65s", animationFillMode: "forwards" }}>
              <div>
                <p className="font-display text-3xl text-foreground">12k+</p>
                <p className="mt-1 text-xs text-muted-foreground">zabezpieczonych rodzin</p>
              </div>
              <div>
                <p className="font-display text-3xl text-foreground">24h</p>
                <p className="mt-1 text-xs text-muted-foreground">czas odpowiedzi</p>
              </div>
              <div>
                <p className="font-display text-3xl text-foreground">98%</p>
                <p className="mt-1 text-xs text-muted-foreground">polecają znajomym</p>
              </div>
            </div>
          </div>

          {/* Right column — image */}
          <div className="relative lg:col-span-7">
            <div className="relative h-[60vh] overflow-hidden lg:h-full">
              <img
                src={heroImage}
                alt="Rodzina w przytulnym salonie — ubezpieczenia KAMIEŃ"
                className="h-full w-full object-cover"
                width={1280}
                height={1024}
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent lg:from-transparent lg:to-transparent" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToForm}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground lg:flex"
          aria-label="Przewiń do formularza"
        >
          <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="animate-float h-5 w-5" />
        </button>
      </section>

      {/* Frame 2 — value props + form */}
      <section id="o-nas" className="border-t border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-terracotta">
                Dlaczego KAMIEŃ
              </span>
              <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                UBEZPIECZENIA,
                <br />
                KTÓRE ROZUMIESZ
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                Nie wciskamy gotowych produktów. Najpierw słuchamy, potem dopasowujemy ochronę do
                Twoich realnych potrzeb — bez nadmiarowych klauzul i ukrytych wykluczeń.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-6">
                  <Clock className="h-6 w-6 text-terracotta" />
                  <h3 className="mt-4 font-display text-xl">Oszczędzasz czas</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Porównujemy oferty wielu towarzystw w jednym miejscu.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <Phone className="h-6 w-6 text-terracotta" />
                  <h3 className="mt-4 font-display text-xl">Masz opiekuna</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Jeden doradca prowadzi Twoje sprawy od pierwszego kontaktu po wypłatę.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <CheckCircle2 className="h-6 w-6 text-terracotta" />
                  <h3 className="mt-4 font-display text-xl">Wiesz, co kupujesz</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Tłumaczymy polisę prostym językiem — bez marketingowego bełkotu.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <Shield className="h-6 w-6 text-terracotta" />
                  <h3 className="mt-4 font-display text-xl">Jesteś chroniony</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Pomagamy też przy likwidacji szkód i kontakcie z ubezpieczycielem.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div id="kontakt" className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-terracotta">
                Formularz kontaktowy
              </span>
              <h3 className="mt-3 font-display text-3xl text-foreground">ZOSTAW KONTAKT</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Wypełnij dane — doradca przygotuje ofertę i oddzwoni w ciągu 24h.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Imię i nazwisko *</Label>
                  <Input
                    id="name"
                    placeholder="Jan Kowalski"
                    {...register("name")}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+48 123 456 789"
                      {...register("phone")}
                      aria-invalid={errors.phone ? "true" : "false"}
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jan@example.com"
                      {...register("email")}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rodzaj ubezpieczenia *</Label>
                  <Select
                    value={selectedType}
                    onValueChange={(value) => setValue("insuranceType", value, { shouldValidate: true })}
                  >
                    <SelectTrigger aria-invalid={errors.insuranceType ? "true" : "false"}>
                      <SelectValue placeholder="Wybierz rodzaj ubezpieczenia" />
                    </SelectTrigger>
                    <SelectContent>
                      {insuranceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.insuranceType && (
                    <p className="text-xs text-destructive">{errors.insuranceType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Wiadomość</Label>
                  <Textarea
                    id="message"
                    placeholder="Napisz, czego potrzebujesz — np. wiek, stan zdrowia, wartość mieszkania..."
                    rows={4}
                    {...register("message")}
                    aria-invalid={errors.message ? "true" : "false"}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Wysyłając formularz, zgadzasz się na kontakt w sprawie oferty ubezpieczenia.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance types grid */}
      <section id="ubezpieczenia" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-terracotta">
              Oferta
            </span>
            <h2 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
              WYBIERZ SWOJE OCHRONĘ
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {insuranceTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.value}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-terracotta/30 hover:bg-secondary/30"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10">
                    <Icon className="h-6 w-6 text-terracotta" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground">{type.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {type.value === "life" && "Ochrona życia i zdrowia dla Ciebie i najbliższych na wypadek choroby czy wypadku."}
                    {type.value === "home" && "Pakiet dla właścicieli mieszkań i domów — od ognia i zalania po kradzież."}
                    {type.value === "travel" && "Polisa na każdą podróż: leczenie, bagaż, odwołanie lotu i assistance 24/7."}
                    {type.value === "business" && "Odpowiedzialność cywilna, mienie firmowe i zdrowie pracowników w jednym miejscu."}
                  </p>
                  <button
                    onClick={() => {
                      setValue("insuranceType", type.value, { shouldValidate: true });
                      scrollToForm();
                    }}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-terracotta transition-colors hover:underline"
                  >
                    Poproś o wycenę
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-foreground py-16 text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-display text-2xl">KAMIEŃ</p>
              <p className="mt-4 text-sm leading-relaxed text-background/70">
                Doradztwo ubezpieczeniowe z ludzkim podejściem. Pomagamy wybrać ochronę, która
                ma sens.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-background/50">
                Oferta
              </p>
              <ul className="mt-4 space-y-2 text-sm text-background/80">
                <li>Ubezpieczenia na życie</li>
                <li>Dom i mieszkanie</li>
                <li>Turystyczne</li>
                <li>Dla firm</li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-background/50">
                Kontakt
              </p>
              <ul className="mt-4 space-y-2 text-sm text-background/80">
                <li>ul. Przykładowa 12</li>
                <li>00-000 Warszawa</li>
                <li>kontakt@kamien.pl</li>
                <li>+48 123 456 789</li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-background/50">
                Godziny
              </p>
              <ul className="mt-4 space-y-2 text-sm text-background/80">
                <li>Pon–Pt: 9:00–17:00</li>
                <li>Sob: 10:00–14:00</li>
                <li>Nd: nieczynne</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 sm:flex-row">
            <p className="text-xs text-background/50">
              © {new Date().getFullYear()} KAMIEŃ. Wszelkie prawa zastrzeżone.
            </p>
            <p className="text-xs text-background/50">
              Strona ma charakter informacyjny i nie stanowi oferty w rozumieniu Kodeksu cywilnego.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
