import { useEffect, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Search,
  IdCard,
  RotateCw,
  Moon,
  Sun,
  Clock,
  ShieldCheck,
  Gift,
  MapPin,
  Mail,
  Phone,
  Headphones,
  Globe,
  Send,
  Facebook,
  Instagram,
  Youtube,
  Info,
  X,
  AlertCircle, // Xatolik uchun ikonka qo'shildi
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroPattern } from "@/components/HeroPattern";
import { Flag } from "@/components/Flag";
import { translations, LANGS, HTML_LANG, type Lang } from "@/i18n";
import passportGuideUrl from "@/assets/passport-guide.png";

type Challenge = [number, number];

const dotsNoise: [number, number][] = [
  [14, 12],
  [30, 40],
  [22, 22],
  [60, 8],
  [75, 44],
  [104, 12],
  [120, 42],
  [134, 24],
  [150, 10],
  [28, 6],
  [90, 28],
  [142, 44],
  [10, 38],
  [48, 46],
  [160, 46],
];

function randomChallenge(prev?: Challenge): Challenge {
  let next: Challenge;
  do {
    next = [
      5 + Math.floor(Math.random() * 16),
      2 + Math.floor(Math.random() * 9),
    ];
  } while (prev && next[0] === prev[0] && next[1] === prev[1]);
  return next;
}

function readStored<T extends string>(
  key: string,
  allowed: readonly T[],
  fallback: T,
): T {
  try {
    const v = localStorage.getItem(key) as T | null;
    return v && allowed.includes(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

function Logo() {
  return (
    <span className="brand-logo" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

const socials = [
  {
    Icon: Send,
    name: "Telegram",
    brand: "telegram",
    href: "https://t.me/BaholashUz",
  },
  {
    Icon: Facebook,
    name: "Facebook",
    brand: "facebook",
    href: "https://www.facebook.com/dtmuzb",
  },
  {
    Icon: Instagram,
    name: "Instagram",
    brand: "instagram",
    href: "https://instagram.com/dtmuzb",
  },
  {
    Icon: Youtube,
    name: "YouTube",
    brand: "youtube",
    href: "https://www.youtube.com/dtmuzb",
  },
] as const;

export default function App() {
  const [lang, setLang] = useState<Lang>(() => readStored("lang", LANGS, "UZ"));
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [identifier, setIdentifier] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(false);
  const [challenge, setChallenge] = useState<Challenge>(() =>
    randomChallenge(),
  );

  const t = translations[lang];
  const [a, b] = challenge;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  const idError = submitted
    ? !identifier
      ? t.required
      : identifier.length !== 14
        ? t.invalidId
        : ""
    : "";

  // 2-talab: Tekshirish bosilmasdan ham javob xato bo'lsa ko'rsatish
  const answerError = answer && Number(answer) !== a + b ? t.invalidAnswer : "";

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    setResult(
      identifier.length === 14 &&
        answer.trim() !== "" &&
        Number(answer) === a + b,
    );
  }

  function clear() {
    setIdentifier("");
    setAnswer("");
    setSubmitted(false);
    setResult(false);
  }

  function refreshChallenge() {
    setChallenge(randomChallenge(challenge));
    setAnswer("");
    setSubmitted(false);
    setResult(false);
  }

  const featureIcons = [Clock, ShieldCheck, Gift];

  return (
    <div className={`app${dark ? " dark" : ""}`}>
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <Logo />
            <div className="brand-copy">
              <small>{t.ministry}</small>
              <strong>{t.agency}</strong>
            </div>
          </div>
          <div className="header-controls">
            <Button
              variant="ghost"
              size="icon"
              className="theme-button"
              onClick={() => setDark(!dark)}
              aria-label={dark ? "Light theme" : "Dark theme"}
              title={dark ? "Light theme" : "Dark theme"}
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <div className="languages" aria-label="Language">
              {LANGS.map((l) => (
                <Button
                  key={l}
                  variant="ghost"
                  className="language-button"
                  data-active={lang === l}
                  aria-label={l}
                  aria-pressed={lang === l}
                  onClick={() => setLang(l)}
                >
                  <Flag lang={l} />
                  <span className="lang-code">{l}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="intro">
          <HeroPattern />
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </section>

        <div className="content-area">
          <section className="verification-panel" aria-labelledby="form-title">
            <div className="form-heading">
              <span className="icon-tile">
                <Search size={18} />
              </span>
              <div>
                <h2 id="form-title">{t.formTitle}</h2>
                <p>{t.formText}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="field-block">
                <label className="field-label" htmlFor="identifier">
                  <span>
                    {t.id} <span className="required">*</span>
                  </span>
                  <span className="counter">{identifier.length}/14</span>
                </label>
                <div className="field-row">
                  <div className="input-wrap">
                    <Search size={16} />
                    <input
                      id="identifier"
                      className="field-input identifier-input"
                      placeholder={t.placeholder}
                      value={identifier}
                      inputMode="numeric"
                      autoComplete="off"
                      maxLength={14}
                      onChange={(e) => {
                        setIdentifier(
                          e.target.value.replace(/\D/g, "").slice(0, 14),
                        );
                        setResult(false);
                      }}
                      aria-invalid={Boolean(idError)}
                      aria-describedby={idError ? "id-error" : undefined}
                    />
                  </div>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button variant="secondary" className="passport-button">
                        <IdCard size={17} />
                        <span className="passport-label">{t.passport}</span>
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="passport-overlay" />
                      <Dialog.Content
                        className="passport-dialog"
                        aria-describedby="passport-description"
                      >
                        <div className="dialog-heading">
                          <Dialog.Title className="dialog-title">
                            {t.modal}
                          </Dialog.Title>
                          <Dialog.Close asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="dialog-close"
                              aria-label="Close"
                              title="Close"
                            >
                              <X size={18} />
                            </Button>
                          </Dialog.Close>
                        </div>
                        <div className="dialog-body">
                          <div className="passport-image-frame">
                            <img
                              src={passportGuideUrl}
                              alt="Biometrik pasport va ID kartada JSHSHIR raqamining joylashuvi"
                            />
                          </div>
                          <div
                            className="passport-notes"
                            id="passport-description"
                          >
                            {t.notes.map((note, i) => (
                              <p key={note}>
                                {i === 0 ? <Info /> : <IdCard />}
                                <span>{note}</span>
                              </p>
                            ))}
                          </div>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
                {idError && (
                  <p id="id-error" className="field-error">
                    {idError}
                  </p>
                )}
              </div>

              <div className="field-block">
                <label className="field-label" htmlFor="answer">
                  <span>
                    {t.solve} <span className="required">*</span>
                  </span>
                </label>
                <div className="field-row captcha-row">
                  <div className="input-wrap">
                    <input
                      id="answer"
                      className="field-input"
                      placeholder={t.answer}
                      value={answer}
                      inputMode="numeric"
                      autoComplete="off"
                      onChange={(e) => {
                        setAnswer(
                          e.target.value.replace(/\D/g, "").slice(0, 3),
                        );
                        setResult(false);
                      }}
                      aria-invalid={Boolean(answerError)}
                      aria-describedby={
                        answerError ? "answer-error" : undefined
                      }
                    />
                  </div>
                  <div className="captcha">
                    <svg
                      viewBox="0 0 190 50"
                      role="img"
                      aria-label={`${a} + ${b} = ?`}
                    >
                      {dotsNoise.map(([x, y], k) => (
                        <circle
                          key={k}
                          cx={x}
                          cy={y}
                          r=".9"
                          fill="#b8c4cc"
                          opacity=".6"
                        />
                      ))}
                      <path
                        d="M4 7 L148 34"
                        stroke="var(--captcha-line)"
                        strokeWidth="1.3"
                        fill="none"
                      />
                      <path
                        d="M3 33 L148 40"
                        stroke="var(--captcha-line)"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <text
                        x={`${a}+${b}=?`.length > 6 ? 30 : 47}
                        y="35"
                        fill="currentColor"
                        fontSize={`${a}+${b}=?`.length > 6 ? 23 : 26}
                        fontWeight="900"
                        stroke="currentColor"
                        strokeWidth=".6"
                        fontFamily="Inter, Arial Black, sans-serif"
                      >
                        {a}+{b}=?
                      </text>
                    </svg>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="captcha-refresh"
                      aria-label="Refresh challenge"
                      title="Refresh challenge"
                      onClick={refreshChallenge}
                    >
                      <RotateCw />
                    </Button>
                  </div>
                </div>
                {answerError && (
                  <p id="answer-error" className="field-error">
                    {answerError}
                  </p>
                )}
              </div>

              <div className="form-actions">
                <Button type="submit" className="verify-button">
                  {t.verify}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="reset-button"
                  onClick={clear}
                >
                  {t.clear}
                </Button>
              </div>

              {/* 1-talab: Xatolik bloki skrinshotdagidek */}
              {result && (
                <div role="alert" className="result-alert">
                  <AlertCircle className="alert-icon" />
                  <div className="alert-content">
                    <h3 className="alert-title">
                      {t.unavailableTitle || "Ma'lumot topilmadi"}
                    </h3>
                    <p className="alert-text">{t.unavailable}</p>
                  </div>
                </div>
              )}
            </form>
          </section>

          <section className="benefits">
            {t.features.map(([title, text], i) => {
              const Icon = featureIcons[i] ?? Clock;
              return (
                <article className="benefit" key={title}>
                  <span className="icon-tile">
                    <Icon size={17} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="brand">
              <Logo />
              <div>
                <strong>{t.agency}</strong>
                <p>{t.system}</p>
              </div>
            </div>
            <a
              href="https://uzbmb.uz"
              target="_blank"
              rel="noreferrer"
              className="contact-line official-link"
            >
              <Globe />
              <span>{t.official}: uzbmb.uz</span>
            </a>
          </div>

          <div>
            <h3 className="footer-title">{t.contact}</h3>
            <p className="contact-line">
              <MapPin />
              <span>{t.address}</span>
            </p>
            <a href="mailto:info@uzbmb.uz" className="contact-line">
              <Mail />
              <span>info@uzbmb.uz</span>
            </a>
            <p className="contact-line">
              <Clock />
              <span>{t.hours}</span>
            </p>
          </div>

          <div>
            <h3 className="footer-title">{t.helpline}</h3>
            {[
              "+998 71 235-19-14",
              "+998 71 234-71-84",
              "+998 95 199-19-14",
            ].map((n) => (
              <a
                className="contact-line"
                href={`tel:${n.replace(/[^+\d]/g, "")}`}
                key={n}
              >
                <Phone />
                <span>{n}</span>
              </a>
            ))}
            <a href="tel:1195" className="contact-line">
              <Headphones />
              <span>{t.call}: 1195</span>
            </a>
          </div>

          <div>
            <h3 className="footer-title">{t.social}</h3>
            <div className="social-links">
              {socials.map(({ Icon, name, brand, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  data-brand={brand}
                  aria-label={name}
                  title={name}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="copyright">
          © 2026 {t.agency}. {t.rights}
        </div>
      </footer>
    </div>
  );
}
