import React, { useEffect, useState } from 'react';

import anniversaryImg from './assets/images/anniversary.jpg';
import birthdayImg from './assets/images/birthday.jpg';
import haldiImg from './assets/images/haldi.jpg';
import mandapImg from './assets/images/mandap.jpg';
import receptionImg from './assets/images/reception.jpg';
import stageImg from './assets/images/stage.jpg';

const WA = 'https://wa.me/918423848321';

const photos = {
  hero: receptionImg,
  mandap: mandapImg,
  stage: stageImg,
  reception: receptionImg,
  haldi: haldiImg,
  birthday: birthdayImg,
  anniversary: anniversaryImg,
  detail: stageImg
};

const services = [
  [
    'Wedding Decoration',
    'A grand celebration styled around your story, royal traditions and the breathtaking atmosphere you imagine.',
    '✧',
    photos.mandap
  ],
  [
    'Wedding Stage & Mandap',
    'A sacred centrepiece crafted with intricate floral carving, royal drapery and ambient illumination.',
    '❋',
    photos.stage
  ],
  [
    'Engagement & Reception',
    'Opulent floral arches, sparkling light canopies and exquisite banquet styling for every celebration.',
    '♡',
    photos.reception
  ],
  [
    'Haldi & Mehndi',
    'Vibrant yellow marigolds, festive floral swings and picture-perfect corners for pre-wedding rituals.',
    '✿',
    photos.haldi
  ],
  [
    'Birthday Decoration',
    'Personalised modern balloon installations, glowing neon signage and playful themed setups.',
    '✦',
    photos.birthday
  ],
  [
    'Anniversary & Custom Events',
    'Intimate candlelit dinners or grand milestones, brought to life with thoughtful, bespoke details.',
    '❀',
    photos.anniversary
  ]
];

const gallery = [
  { title: 'Royal Mandap Setting', type: 'Mandap', img: photos.mandap, size: 'tall' },
  { title: 'Haldi & Mehndi Swings', type: 'Haldi', img: photos.haldi },
  { title: 'Grand Reception Hall', type: 'Reception', img: photos.reception, size: 'wide' },
  { title: 'Luxury Floral Stage', type: 'Wedding', img: photos.stage },
  { title: 'Anniversary Courtyard', type: 'Anniversary', img: photos.anniversary },
  { title: 'Sacred Pheras Setup', type: 'Mandap', img: photos.mandap, size: 'tall' },
  { title: 'Milestone Birthday Party', type: 'Birthday', img: photos.birthday },
  { title: 'Crystal & Floral Detail', type: 'Floral', img: photos.stage }
];

function Arrow({ diagonal = false }) {
  return <span className="arrow-icon" aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z"/>
    </svg>
  );
}

function WhatsAppLink({ children, className = 'btn btn-gold', message }) {
  const href = message ? `${WA}?text=${encodeURIComponent(message)}` : WA;
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children || <>Enquire on WhatsApp <Arrow diagonal /></>}
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [form, setForm] = useState({ name: '', event: '', date: '', location: '', message: '' });
  const [formError, setFormError] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const filters = ['All', 'Wedding', 'Mandap', 'Reception', 'Haldi', 'Birthday', 'Anniversary'];
  const visibleGallery = gallery.filter(item => activeFilter === 'All' || item.type === activeFilter);

  // Scroll Progress and Header Elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [visibleGallery]);

  // Modal Overflow
  useEffect(() => {
    document.body.style.overflow = activePhoto ? 'hidden' : '';
    const onKey = e => { if (e.key === 'Escape') setActivePhoto(null); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [activePhoto]);

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });
  
  const submitEnquiry = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.event || !form.location.trim()) {
      setFormError('Please add your name, event type and event location.');
      return;
    }
    setFormError('');
    const message = `Hello Piyush Event & Decoration! I'd like to enquire about an event.\n\nName: ${form.name}\nEvent type: ${form.event}\nEvent date: ${form.date || 'Not decided'}\nLocation: ${form.location}\nMessage: ${form.message || 'Please share details and a custom quote.'}`;
    window.open(`${WA}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      <div className="announcement">
        <span className="announcement-pill">MADE FOR YOUR MOMENTS</span>
        <i></i>
        <span>Thoughtful styling. Beautiful celebrations.</span>
        <i></i>
        <a href="tel:+918423848321" className="announcement-link">ENQUIRE: +91 84238 48321</a>
      </div>

      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="brand" aria-label="Piyush Event and Decoration home">
          <span className="brand-mark">P<span>✧</span></span>
          <span className="brand-name">
            PIYUSH
            <small>EVENT & DECORATION</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          {['Home', 'About', 'Services', 'Gallery', 'Packages', 'Contact'].map(x => (
            <a key={x} href={`#${x.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {x}
            </a>
          ))}
          <WhatsAppLink className="nav-cta" message="Hello! I'd like to enquire about event decoration.">
            Let's Talk <Arrow diagonal />
          </WhatsAppLink>
        </nav>
      </header>

      <main>
        <section
          className="hero"
          id="home"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(22,13,15,.88) 0%, rgba(22,13,15,.65) 50%, rgba(22,13,15,.22) 100%), url(${photos.hero})`
          }}
        >
          <div className="hero-content hero-entrance">
            <div className="eyebrow light">
              <span /> THE ART OF CELEBRATION <span />
            </div>
            <h1>
              Creating magical<br />
              <em>celebrations,</em><br />
              making memories forever.
            </h1>
            <p>
              From royal weddings to charming family milestones, we turn your special moments into extraordinary experiences.
            </p>
            <div className="hero-actions">
              <a className="btn btn-gold" href="#gallery">
                Explore our work <Arrow diagonal />
              </a>
              <WhatsAppLink className="btn btn-outline" message="Hello! I'd like to discuss decoration for my upcoming event.">
                Enquire on WhatsApp <Arrow diagonal />
              </WhatsAppLink>
            </div>
            <div className="hero-foot">
              <span>WEDDINGS · CELEBRATIONS · ROYAL DETAILS</span>
              <span>01 — 06</span>
            </div>
          </div>
          <div className="hero-stamp hero-entrance">
            <span>YOUR DAY</span>
            <b>♡</b>
            <span>YOUR WAY</span>
          </div>
        </section>

        <section className="intro section-pad" id="about">
          <div className="intro-image reveal reveal-left">
            <img src={photos.mandap} alt="Royal Indian wedding mandap decoration" />
            <div className="image-note">
              <span>THE LITTLE DETAILS</span>
              <b>Make the<br />biggest memories.</b>
            </div>
          </div>
          <div className="intro-copy reveal reveal-right">
            <div className="eyebrow">
              <span /> A LITTLE ABOUT US
            </div>
            <h2>
              Every celebration<br />
              deserves to feel <em>extraordinary.</em>
            </h2>
            <p className="lead">
              At Piyush Event & Decoration, we believe the setting is part of the story.
            </p>
            <p>
              We bring ideas, vibrant colors, fragrant florals and thoughtful details together to create celebrations that feel distinctly personal. From an intimate Haldi ceremony to a grand royal wedding, our focus is on understanding your vision and bringing it to life beautifully.
            </p>
            <a className="text-link" href="#services">
              Discover what we do <Arrow diagonal />
            </a>
            <div className="intro-sign">
              <span>PIYUSH EVENT & DECORATION</span>
              <b>Celebrations, beautifully designed.</b>
            </div>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">
                <span /> WHAT WE CREATE
              </div>
              <h2>
                Made for moments<br />
                <em>that matter.</em>
              </h2>
            </div>
            <p>
              One special day, a hundred little details. Explore our bespoke decoration services, thoughtfully shaped around your occasion.
            </p>
          </div>
          <div className="service-grid stagger-grid">
            {services.map(([name, desc, icon, img], i) => (
              <article className="service-card reveal" key={name}>
                <div className="service-photo">
                  <img src={img} alt={`${name} decoration by Piyush Event & Decoration`} loading="lazy" />
                  <span className="service-number">0{i + 1}</span>
                  <span className="service-icon">{icon}</span>
                </div>
                <div className="service-info">
                  <h3>{name}</h3>
                  <p>{desc}</p>
                  <WhatsAppLink
                    className="mini-link"
                    message={`Hello! I'd like to enquire about ${name.toLowerCase()}.`}
                  >
                    Enquire <Arrow diagonal />
                  </WhatsAppLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="quote-band reveal">
          <div className="quote-ornament">✳</div>
          <p>
            “The best celebrations don't just look beautiful.<br />
            <em>They feel like you.”</em>
          </p>
          <span>PIYUSH EVENT & DECORATION</span>
        </section>

        <section className="gallery-section section-pad" id="gallery">
          <div className="section-heading gallery-heading reveal">
            <div>
              <div className="eyebrow">
                <span /> A GLIMPSE OF THE MAGIC
              </div>
              <h2>
                Scenes worth<br />
                <em>remembering.</em>
              </h2>
            </div>
            <p>
              Visual highlights of our curated event styling, mandap arrangements, and celebration themes.
            </p>
          </div>
          <div className="filters reveal" role="group" aria-label="Filter gallery">
            {filters.map(f => (
              <button
                key={f}
                className={activeFilter === f ? 'filter active' : 'filter'}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="gallery-grid stagger-grid">
            {visibleGallery.map(item => (
              <button
                key={item.title}
                className={`gallery-item ${item.size || ''} reveal`}
                onClick={() => setActivePhoto(item)}
                aria-label={`View ${item.title}`}
              >
                <img src={item.img} alt={item.title} loading="lazy" />
                <span className="gallery-overlay">
                  <small>{item.type}</small>
                  <b>{item.title}</b>
                  <i>↗</i>
                </span>
              </button>
            ))}
          </div>
          <div className="gallery-bottom reveal">
            <span>IMAGINE IT. WE'LL HELP CREATE IT.</span>
            <WhatsAppLink
              className="text-link"
              message="Hello! I'd like to discuss a custom event decoration setup."
            >
              Plan your celebration <Arrow diagonal />
            </WhatsAppLink>
          </div>
        </section>

        <section className="why section-pad">
          <div className="why-image reveal reveal-left">
            <img src={photos.stage} alt="Elegant Indian wedding floral decor" loading="lazy" />
            <div className="why-image-caption">A THOUGHTFUL TOUCH, IN EVERY CORNER.</div>
          </div>
          <div className="why-copy reveal reveal-right">
            <div className="eyebrow light">
              <span /> THE PIYUSH PROMISE
            </div>
            <h2>
              Beautiful by design.<br />
              <em>Personal by nature.</em>
            </h2>
            <p>
              We want every detail to feel considered, every setup to feel welcoming, and every celebration to feel unmistakably yours.
            </p>
            <div className="promise-list">
              <div>
                <b>01</b>
                <span>
                  <strong>Creative Concepts</strong>
                  <small>Fresh themes shaped around your personality and rituals.</small>
                </span>
              </div>
              <div>
                <b>02</b>
                <span>
                  <strong>Personalised Styling</strong>
                  <small>Floral selections and lighting details reflecting your taste.</small>
                </span>
              </div>
              <div>
                <b>03</b>
                <span>
                  <strong>Punctual & Careful Execution</strong>
                  <small>Hassle-free setup managed from blueprint to execution.</small>
                </span>
              </div>
              <div>
                <b>04</b>
                <span>
                  <strong>Options for Every Occasion</strong>
                  <small>Flexible packages and custom designs for all event scales.</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="packages section-pad" id="packages">
          <div className="center-heading reveal">
            <div className="eyebrow">
              <span /> YOUR CELEBRATION, YOUR WAY <span />
            </div>
            <h2>
              Find your kind<br />
              of <em>beautiful.</em>
            </h2>
            <p>
              Every event is different. Tell us what you have in mind and we'll help shape a decoration plan that feels right for you.
            </p>
          </div>
          <div className="package-grid stagger-grid">
            <article className="package-card reveal">
              <span className="package-kicker">01 / THE ESSENTIALS</span>
              <h3>
                Basic<br />
                <em>Celebration</em>
              </h3>
              <p>Thoughtful decoration for intimate gatherings and special family moments.</p>
              <ul>
                <li>Event-specific decoration concept</li>
                <li>Key photo-zone & backdrop styling</li>
                <li>Ambient lighting and floral touches</li>
              </ul>
              <WhatsAppLink
                className="package-link"
                message="Hello! I'd like a custom quote for the Basic Celebration package."
              >
                <span>Get a custom quote</span> <Arrow diagonal />
              </WhatsAppLink>
            </article>

            <article className="package-card featured reveal">
              <span className="package-ribbon">MOST POPULAR</span>
              <span className="package-kicker">02 / THE SIGNATURE</span>
              <h3>
                Premium<br />
                <em>Wedding</em>
              </h3>
              <p>A cohesive wedding look with considered details across your entire celebration.</p>
              <ul>
                <li>Personalised wedding theme styling</li>
                <li>Grand stage or mandap floral decoration</li>
                <li>Entrance walkway & welcome signage</li>
                <li>Coordinated guest table decor</li>
              </ul>
              <WhatsAppLink
                className="package-link"
                message="Hello! I'd like a custom quote for the Premium Wedding package."
              >
                <span>Get a custom quote</span> <Arrow diagonal />
              </WhatsAppLink>
            </article>

            <article className="package-card reveal">
              <span className="package-kicker">03 / THE GRAND AFFAIR</span>
              <h3>
                Royal Wedding<br />
                <em>Experience</em>
              </h3>
              <p>A royal celebration concept, tailored to your grandest scale and dreams.</p>
              <ul>
                <li>Custom event design direction & 3D planning</li>
                <li>Statement royal mandap & luxury chandelier stage</li>
                <li>Complete venue fairy lighting and floral canopies</li>
                <li>Dedicated on-site styling management</li>
              </ul>
              <WhatsAppLink
                className="package-link"
                message="Hello! I'd like a custom quote for the Royal Wedding Experience."
              >
                <span>Get a custom quote</span> <Arrow diagonal />
              </WhatsAppLink>
            </article>
          </div>
          <p className="package-note reveal">
            Custom quotes provided after understanding your venue, preferences, guest count, and location.
          </p>
        </section>

        <section className="testimonials section-pad">
          <div className="testimonial-mark reveal">“</div>
          <div className="eyebrow reveal">
            <span /> CLIENT APPRECIATION
          </div>
          <h2 className="reveal">
            Celebrations filled<br />
            with <em>joy & memories.</em>
          </h2>
          <div className="testimonial-cards stagger-grid">
            <div className="testimonial-bubble reveal">
              <p>“The mandap decoration for our wedding was beyond breathtaking. Every single guest complimented the fresh marigolds and royal lighting!”</p>
              <strong>— Priya & Rahul Sharma</strong>
              <small>Wedding Mandap & Stage Decor</small>
            </div>
            <div className="testimonial-bubble reveal">
              <p>“Piyush Event & Decoration created the most vibrant Haldi setup for our family. The floral swing was the highlight of the event photos!”</p>
              <strong>— Amit Verma</strong>
              <small>Haldi & Pre-Wedding Celebration</small>
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-left reveal reveal-left">
            <div className="eyebrow light">
              <span /> LET'S MAKE IT MEMORABLE
            </div>
            <h2>
              Have a date<br />
              in <em>mind?</em>
            </h2>
            <p>
              Tell us a little about your celebration. We'll connect with you directly to understand your vision and provide a transparent, personalized quote.
            </p>
            <div className="contact-details">
              <span>CALL OR WHATSAPP DIRECTLY</span>
              <a href="tel:+918423848321">
                +91 84238 48321 <Arrow diagonal />
              </a>
              <span>FAST RESPONSE · DIRECT OWNER COMMUNICATION</span>
            </div>
            <WhatsAppLink
              className="btn btn-gold"
              message="Hello Piyush Event & Decoration! I'd like to discuss an event enquiry."
            >
              Chat with us on WhatsApp <Arrow diagonal />
            </WhatsAppLink>
          </div>

          <form className="contact-form reveal reveal-right" onSubmit={submitEnquiry}>
            <div className="form-heading">
              <span>GET IN TOUCH</span>
              <h3>Start a conversation</h3>
              <p>Share your event basics and we'll reply right away.</p>
            </div>
            <label>
              Your Name *
              <input
                name="name"
                value={form.name}
                onChange={update}
                placeholder="How should we address you?"
                autoComplete="name"
                required
              />
            </label>
            <div className="form-row">
              <label>
                Event Type *
                <select name="event" value={form.event} onChange={update} required>
                  <option value="">Select event type</option>
                  {[
                    'Wedding Decoration',
                    'Wedding Stage & Mandap',
                    'Engagement & Reception',
                    'Haldi & Mehndi',
                    'Birthday Celebration',
                    'Anniversary & Private Gathering',
                    'Other Celebration'
                  ].map(v => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Event Date
                <input name="date" type="date" value={form.date} onChange={update} />
              </label>
            </div>
            <label>
              Event Location / Venue *
              <input
                name="location"
                value={form.location}
                onChange={update}
                placeholder="City or venue name"
                required
              />
            </label>
            <label>
              Tell us about your ideas
              <textarea
                name="message"
                value={form.message}
                onChange={update}
                rows="3"
                placeholder="Preferred colours, theme, estimated guest count or special requests..."
              />
            </label>
            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}
            <button className="btn btn-dark" type="submit">
              Send Enquiry on WhatsApp <Arrow diagonal />
            </button>
            <small className="privacy-note">
              Clicking send opens WhatsApp with your pre-filled inquiry. No data is stored on third-party servers.
            </small>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a href="#home" className="brand footer-brand">
            <span className="brand-mark">P<span>✧</span></span>
            <span className="brand-name">
              PIYUSH
              <small>EVENT & DECORATION</small>
            </span>
          </a>
          <p>
            Making your most meaningful moments<br />
            feel even more beautiful.
          </p>
          <a href="#home" className="back-top">
            BACK TO TOP ↑
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} PIYUSH EVENT & DECORATION</span>
          <span>WEDDINGS · RECEPTIONS · MANDAPS · CELEBRATIONS</span>
          <a href={WA} target="_blank" rel="noreferrer">
            WHATSAPP ↗
          </a>
        </div>
      </footer>

      {/* Modern WhatsApp Floating Action Button */}
      <a
        className="floating-wa"
        href={WA}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp with Piyush Event & Decoration"
        title="Chat on WhatsApp"
      >
        <span className="wa-pulse" aria-hidden="true" />
        <WhatsAppIcon size={32} />
      </a>

      {activePhoto && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setActivePhoto(null)}
        >
          <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Close image">
            ×
          </button>
          <img src={activePhoto.img} alt={activePhoto.title} onClick={e => e.stopPropagation()} />
          <div className="lightbox-caption">
            <span>{activePhoto.type}</span>
            <b>{activePhoto.title}</b>
          </div>
        </div>
      )}
    </>
  );
}
