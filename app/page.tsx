import { getAllPosts } from "../lib/posts";
import type { Metadata } from "next";
import NewsletterForm from '../components/NewsletterForm'

export const metadata: Metadata = {
  title: "Best eLearning Platforms & Tools 2025 — Expert Reviews",
  description: "Find the best online learning platforms, LMS software and course creation tools. Compare features and pricing.",
  alternates: { canonical: "https://www.elearning-tools.com" },
};

const STARS = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);


function isNew(dateStr?: string): boolean {
  if (!dateStr) return false;
  const diff = Date.now() - new Date(dateStr).getTime();
  return diff < 1000 * 60 * 60 * 24 * 30; // 30 days
}

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0] ?? null;
  const recent = posts.slice(1, 7);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #080b14; --surface: #0f1420; --surface2: #141926;
          --border: #1e2535; --border2: #252d40;
          --text: #e4e8f4; --muted: #7a82a0;
          --accent: #6366f1; --accent2: #8b5cf6;
          --radius: 12px; --radius-sm: 8px;
        }
        body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; }
        a { text-decoration: none; color: inherit; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

        /* Hero */
        .hero { position: relative; overflow: hidden; padding: 100px 24px 90px; text-align: center; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139,92,246,0.12) 0%, transparent 60%); pointer-events: none; }
        .hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 18px; border-radius: 20px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: var(--accent); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 28px; }
        .hero-badge::before { content: '●'; color: #2ecc71; font-size: 0.55rem; }
        .hero h1 { font-size: clamp(2.4rem, 5.5vw, 4rem); font-weight: 900; line-height: 1.12; letter-spacing: -0.035em; margin-bottom: 22px; background: linear-gradient(135deg, #ffffff 25%, var(--accent) 65%, var(--accent2) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero p { font-size: clamp(1rem, 2vw, 1.2rem); color: var(--muted); max-width: 640px; margin: 0 auto 40px; line-height: 1.8; }
        .hero-ctas { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .hero-cta-primary { display: inline-flex; align-items: center; gap: 8px; padding: 15px 34px; border-radius: 50px; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-weight: 700; font-size: 1rem; transition: opacity 0.2s, transform 0.2s; box-shadow: 0 0 40px rgba(79,139,255,0.25); }
        .hero-cta-primary:hover { opacity: 0.9; transform: translateY(-2px); }
        .hero-cta-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 15px 34px; border-radius: 50px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: var(--text); font-weight: 600; font-size: 1rem; transition: background 0.2s; }
        .hero-cta-secondary:hover { background: rgba(255,255,255,0.1); }

        /* Stats */
        .stats-bar { display: flex; flex-wrap: wrap; margin-top: 64px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; background: var(--surface); max-width: 800px; margin-left: auto; margin-right: auto; }
        .stat-item { flex: 1; min-width: 130px; padding: 24px 16px; text-align: center; border-right: 1px solid var(--border); position: relative; }
        .stat-item:last-child { border-right: none; }
        .stat-value { font-size: 1.8rem; font-weight: 900; color: var(--accent); display: block; letter-spacing: -0.03em; }
        .stat-label { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; margin-top: 4px; display: block; }

        /* Section */
        .section { padding: 70px 0; }
        .section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 36px; }
        .section-title { font-size: 1.6rem; font-weight: 800; letter-spacing: -0.025em; }
        .section-link { font-size: 0.85rem; color: var(--accent); }
        .section-link:hover { text-decoration: underline; }
        .section-eyebrow { font-size: 0.72rem; color: var(--accent); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }

        /* Trending */
        .trending-row { display: flex; flex-wrap: wrap; gap: 10px; }
        .trending-pill { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 50px; background: var(--surface); border: 1px solid var(--border); font-size: 0.82rem; color: var(--muted); transition: border-color 0.15s, color 0.15s; }
        .trending-pill:hover { border-color: var(--accent); color: var(--accent); }
        .trending-pill-hot { border-color: rgba(239,68,68,0.3); color: #f87171; background: rgba(239,68,68,0.06); }

        /* Top 3 picks */
        .picks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .pick-card { padding: 28px 24px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); position: relative; transition: border-color 0.15s, transform 0.15s; }
        .pick-card:hover { border-color: var(--accent); transform: translateY(-3px); }
        .pick-card--featured { border-color: var(--accent); background: linear-gradient(145deg, var(--surface), rgba(79,139,255,0.05)); }
        .pick-badge { position: absolute; top: -12px; left: 24px; padding: 4px 14px; border-radius: 20px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; }
        .pick-badge--gold { background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; }
        .pick-badge--silver { background: linear-gradient(135deg, #94a3b8, #64748b); color: #fff; }
        .pick-badge--bronze { background: linear-gradient(135deg, #b45309, #92400e); color: #fff; }
        .pick-icon { font-size: 2.4rem; margin-bottom: 16px; display: block; }
        .pick-title { font-size: 1.1rem; font-weight: 800; margin-bottom: 8px; }
        .pick-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.6; margin-bottom: 14px; }
        .pick-rating { color: #f59e0b; font-size: 0.9rem; margin-bottom: 4px; letter-spacing: 2px; }
        .pick-rating-text { font-size: 0.75rem; color: var(--muted); }
        .pick-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; font-size: 0.83rem; color: var(--accent); font-weight: 600; }
        .pick-link:hover { text-decoration: underline; }

        /* Category grid */
        .category-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 14px; }
        .category-card { padding: 26px 20px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s; display: block; }
        .category-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.3); }
        .category-icon { font-size: 2rem; margin-bottom: 12px; display: block; }
        .category-label { font-weight: 700; font-size: 0.95rem; margin-bottom: 5px; color: var(--text); }
        .category-desc { font-size: 0.78rem; color: var(--muted); line-height: 1.5; }

        /* How it works */
        .how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; position: relative; }
        .how-grid::before { content: ''; position: absolute; top: 36px; left: calc(33.33% - 20px); right: calc(33.33% - 20px); height: 1px; background: linear-gradient(90deg, var(--accent), var(--accent2)); opacity: 0.3; }
        .how-card { padding: 32px 24px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); text-align: center; }
        .how-num { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-weight: 900; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; }
        .how-title { font-weight: 700; font-size: 1rem; margin-bottom: 10px; }
        .how-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.65; }

        /* Featured */
        .featured-card { display: grid; grid-template-columns: 1fr 1fr; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: border-color 0.15s; }
        .featured-card:hover { border-color: var(--accent); }
        .featured-visual { display: flex; align-items: center; justify-content: center; min-height: 300px; font-size: 6rem; background: linear-gradient(135deg, rgba(79,139,255,0.1), rgba(124,92,252,0.08)); position: relative; overflow: hidden; }
        .featured-visual::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(255,255,255,0.04), transparent 70%); }
        .featured-content { padding: 44px 40px; display: flex; flex-direction: column; justify-content: center; }
        .featured-badge { display: inline-block; padding: 5px 14px; border-radius: 20px; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 18px; width: fit-content; }
        .featured-content h2 { font-size: 1.65rem; font-weight: 900; line-height: 1.25; margin-bottom: 14px; letter-spacing: -0.025em; }
        .featured-content p { color: var(--muted); font-size: 0.92rem; line-height: 1.8; margin-bottom: 22px; }
        .featured-meta { font-size: 0.75rem; color: var(--muted); margin-bottom: 22px; display: flex; gap: 14px; }
        .read-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 26px; border-radius: 10px; background: var(--accent); color: #fff; font-weight: 700; font-size: 0.9rem; transition: opacity 0.15s; width: fit-content; }
        .read-btn:hover { opacity: 0.85; }

        /* Why trust us */
        .why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .why-card { padding: 28px 20px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); text-align: center; }
        .why-icon { font-size: 2rem; margin-bottom: 14px; display: block; }
        .why-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 8px; }
        .why-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.6; }

        /* Post grid */
        .post-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 20px; }
        .post-card { padding: 28px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); transition: border-color 0.15s, transform 0.15s; display: flex; flex-direction: column; }
        .post-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .post-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .post-tag { display: inline-block; padding: 3px 10px; border-radius: 20px; background: rgba(124,92,252,0.1); border: 1px solid rgba(124,92,252,0.2); color: var(--accent2); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
        .post-read-time { font-size: 0.72rem; color: var(--muted); }
        .post-card h3 { font-size: 1.02rem; font-weight: 700; line-height: 1.4; margin-bottom: 10px; }
        .post-card h3 a:hover { color: var(--accent); }
        .post-card p { color: var(--muted); font-size: 0.87rem; line-height: 1.65; flex: 1; margin-bottom: 18px; }
        .post-cover-img{width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:16px;display:block;flex-shrink:0}
        .post-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--border); }
        .post-date { font-size: 0.72rem; color: var(--muted); }
        .post-link { font-size: 0.82rem; color: var(--accent); font-weight: 600; }
        .post-new-badge { display: inline-block; padding: 2px 8px; border-radius: 20px; background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; margin-left: 8px; vertical-align: middle; }

        /* FAQ */
        .faq-list { display: flex; flex-direction: column; gap: 12px; }
        .faq-item { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
        .faq-q { padding: 20px 24px; font-weight: 600; font-size: 0.95rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
        .faq-q::after { content: '+'; font-size: 1.4rem; color: var(--accent); font-weight: 300; flex-shrink: 0; margin-left: 16px; }
        .faq-a { padding: 0 24px 20px; font-size: 0.88rem; color: var(--muted); line-height: 1.75; }

        /* Newsletter */
        .newsletter-section { padding: 60px 40px; background: linear-gradient(135deg, var(--surface), rgba(79,139,255,0.06)); border: 1px solid var(--border); border-radius: var(--radius); text-align: center; margin: 0 0 20px; }
        .newsletter-section h2 { font-size: 1.7rem; font-weight: 800; margin-bottom: 10px; letter-spacing: -0.02em; }
        .newsletter-section p { color: var(--muted); margin-bottom: 28px; font-size: 1rem; }
        .newsletter-form { display: flex; gap: 12px; max-width: 460px; margin: 0 auto; }
        .newsletter-input { flex: 1; padding: 13px 18px; border-radius: 50px; background: var(--bg); border: 1px solid var(--border2); color: var(--text); font-size: 0.92rem; }
        .newsletter-input:focus { outline: none; border-color: var(--accent); }
        .newsletter-btn { padding: 13px 28px; border-radius: 50px; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-weight: 700; font-size: 0.9rem; border: none; cursor: pointer; white-space: nowrap; }

        /* CTA */
        .cta-section { margin: 20px 0 70px; padding: 70px 40px; background: linear-gradient(135deg, var(--surface), rgba(79,139,255,0.06)); border: 1px solid var(--border); border-radius: var(--radius); text-align: center; }
        .cta-section h2 { font-size: 2rem; font-weight: 900; margin-bottom: 14px; letter-spacing: -0.025em; }
        .cta-section p { color: var(--muted); margin-bottom: 32px; font-size: 1.05rem; max-width: 520px; margin-left: auto; margin-right: auto; }
        .cta-btn { display: inline-flex; align-items: center; gap: 8px; padding: 16px 36px; border-radius: 50px; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-weight: 700; font-size: 1rem; transition: opacity 0.2s, transform 0.2s; box-shadow: 0 0 40px rgba(79,139,255,0.2); }
        .cta-btn:hover { opacity: 0.88; transform: translateY(-2px); }

        .empty-state { text-align: center; padding: 80px 0; color: var(--muted); }

        @media (max-width: 900px) {
          .picks-grid { grid-template-columns: 1fr; }
          .why-grid { grid-template-columns: repeat(2, 1fr); }
          .how-grid { grid-template-columns: 1fr; }
          .how-grid::before { display: none; }
          .featured-card { grid-template-columns: 1fr; }
          .featured-visual { min-height: 160px; font-size: 4rem; }
          .featured-content { padding: 28px 24px; }
        }
        @media (max-width: 600px) {
          .hero { padding: 60px 20px 50px; }
          .cta-section, .newsletter-section { padding: 40px 20px; }
          .newsletter-form { flex-direction: column; }
          .why-grid { grid-template-columns: 1fr 1fr; }
          .stat-item { min-width: 100px; padding: 18px 10px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-dots" />
        <div className="hero-badge">Learning Intelligence</div>
        <h1 dangerouslySetInnerHTML={{ __html: "Find the Best Tools<br />to Learn & Teach Online" }} />
        <p>Expert comparisons of online course platforms, LMS software, video tools and certification programs. Make smarter learning investments in 2025.</p>
        <div className="hero-ctas">
          <a href="/platform-comparison" className="hero-cta-primary">Compare Platforms →</a>
          <a href="/categories" className="hero-cta-secondary">Browse Categories →</a>
        </div>
        <div className="stats-bar">
          {([{"v":"200+","l":"Platforms Reviewed"},{"v":"40+","l":"Categories"},{"v":"80K+","l":"Monthly Readers"},{"v":"2025","l":"Up-to-date"}] as {v:string,l:string}[]).map((st) => (
            <div className="stat-item" key={st.l}>
              <span className="stat-value">{st.v}</span>
              <span className="stat-label">{st.l}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="container">

        {/* ── TRENDING ── */}
        <section className="section" style={{ paddingBottom: 40 }}>
          <div className="section-eyebrow">Trending Now</div>
          <div className="trending-row">
            {([{"label":"Udemy vs Coursera","hot":true,"href":"/udemy-vs-coursera"},{"label":"Best Free LMS","href":"/best-free-lms"},{"label":"AI Tutoring Tools","hot":true,"href":"/ai-tutoring-tools"},{"label":"Best for Coding","href":"/best-coding-platforms"},{"label":"Course Creation Tools","hot":true,"href":"/best-course-creation-tools"},{"label":"Corporate Training LMS","href":"/corporate-lms"}] as {label:string,hot?:boolean,href:string}[]).map((t) => (
              <a key={t.label} href={t.href} className={"trending-pill" + (t.hot ? " trending-pill-hot" : "")}>
                {t.hot && "🔥 "}{t.label}
              </a>
            ))}
          </div>
        </section>

        {/* ── TOP 3 PICKS ── */}
        <section className="section" style={{ paddingTop: 20 }}>
          <div className="section-eyebrow">Expert Picks</div>
          <div className="section-header">
            <h2 className="section-title">Top eLearning Platforms 2025</h2>
          </div>
          <div className="picks-grid">
            {([{"badge":"Best Overall","badgeType":"gold","icon":"🏫","title":"Coursera","desc":"University-grade courses with verifiable certificates from top global institutions.","rating":5,"href":"/coursera-review"},{"badge":"Best LMS","badgeType":"silver","icon":"⚙️","title":"Teachable","desc":"The most creator-friendly platform to build, sell and scale your own online courses.","rating":5,"href":"/teachable-review"},{"badge":"Best Value","badgeType":"bronze","icon":"💰","title":"Udemy","desc":"Thousands of affordable courses across every skill — best for practical skill building.","rating":4,"href":"/udemy-review"}] as {badge:string,badgeType:string,icon:string,title:string,desc:string,rating:number,href:string}[]).map((p, i) => (
              <div key={p.title} className={"pick-card" + (i === 0 ? " pick-card--featured" : "")}>
                <span className={"pick-badge pick-badge--" + p.badgeType}>{p.badge}</span>
                <span className="pick-icon">{p.icon}</span>
                <div className="pick-title">{p.title}</div>
                <div className="pick-desc">{p.desc}</div>
                <div className="pick-rating">{STARS(p.rating)}</div>
                <div className="pick-rating-text">{p.rating}.0 / 5.0 — Expert Score</div>
                <a href={p.href} className="pick-link">Read Full Review →</a>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="section">
          <div className="section-eyebrow">Our Process</div>
          <div className="section-header">
            <h2 className="section-title">How We Evaluate Learning Tools</h2>
          </div>
          <div className="how-grid">
            {([{"num":"01","title":"We Enroll & Learn","desc":"We actually take courses and use platforms as real students and creators, not just demo accounts."},{"num":"02","title":"We Score on 12 Criteria","desc":"Content quality, UX, pricing, certificates, support, mobile app and more — all objectively scored."},{"num":"03","title":"You Learn with Confidence","desc":"Our detailed breakdowns help you find the platform that matches your goals and budget perfectly."}] as {num:string,title:string,desc:string}[]).map((h) => (
              <div key={h.num} className="how-card">
                <div className="how-num">{h.num}</div>
                <div className="how-title">{h.title}</div>
                <div className="how-desc">{h.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <h2 className="section-title">Browse by Category</h2>
            <a href="/categories" className="section-link">View all →</a>
          </div>
          <div className="category-grid">
            {([{"icon":"🏫","label":"Online Courses","desc":"Udemy, Coursera & alternatives","href":"/category/online-courses"},{"icon":"⚙️","label":"LMS Software","desc":"Moodle, Canvas & modern LMS","href":"/category/lms"},{"icon":"🎬","label":"Video Platforms","desc":"Hosting, streaming & live tools","href":"/category/video-platforms"},{"icon":"📝","label":"Quiz & Testing","desc":"Assessment and quiz builders","href":"/category/assessment"},{"icon":"🏆","label":"Certifications","desc":"Best certs for career growth","href":"/category/certifications"},{"icon":"🤖","label":"AI for Learning","desc":"AI tutors & adaptive learning","href":"/category/ai-learning"},{"icon":"🎓","label":"Course Creation","desc":"Teachable, Thinkific & Kajabi","href":"/category/course-creation"},{"icon":"🌍","label":"Language Learning","desc":"Duolingo, Babbel & iTalki","href":"/category/language-learning"},{"icon":"💻","label":"Coding Bootcamps","desc":"Best programs to break into tech","href":"/category/coding-bootcamps"},{"icon":"🖥️","label":"Virtual Classroom","desc":"Google Classroom, Zoom & Nearpod","href":"/category/virtual-classroom"},{"icon":"📡","label":"Webinar Platforms","desc":"Demio, Zoom & StreamYard","href":"/category/webinars"},{"icon":"🃏","label":"Flashcard Apps","desc":"Anki, Quizlet & spaced repetition","href":"/category/flashcards"},{"icon":"📈","label":"Skill Development","desc":"LinkedIn Learning & Pluralsight","href":"/category/skill-development"},{"icon":"👧","label":"Children's Learning","desc":"Khan Academy Kids & ABCmouse","href":"/category/kids-learning"},{"icon":"🧑‍🏫","label":"Online Tutoring","desc":"Wyzant, Tutor.com & iTalki","href":"/category/tutoring"},{"icon":"⚡","label":"Microlearning","desc":"Blinkist, Axonify & EdApp","href":"/category/microlearning"},{"icon":"🏢","label":"Corporate Training","desc":"TalentLMS, Docebo & 360Learning","href":"/category/corporate-training"},{"icon":"🛠️","label":"EdTech Tools","desc":"Padlet, Nearpod & Kahoot","href":"/category/edtech-tools"},{"icon":"👥","label":"Learning Communities","desc":"Discord, Reddit & Maven","href":"/category/learning-community"},{"icon":"🎨","label":"Instructional Design","desc":"Articulate, Captivate & iSpring","href":"/category/instructional-design"},{"icon":"🎧","label":"Audio Learning","desc":"Audible, Pimsleur & Blinkist","href":"/category/audio-learning"}] as {icon:string,label:string,desc:string,href:string}[]).map((c) => (
              <a href={c.href} className="category-card" key={c.label}>
                <span className="category-icon">{c.icon}</span>
                <div className="category-label">{c.label}</div>
                <div className="category-desc">{c.desc}</div>
              </a>
            ))}
          </div>
        </section>

        {/* ── FEATURED ── */}
        {featured && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-header">
              <h2 className="section-title">Featured Article</h2>
            </div>
            <a href={`/${featured.slug}`} className="featured-card">
              <div className="featured-visual">🎓</div>
              <div className="featured-content">
                <span className="featured-badge">⭐ Editor's Choice</span>
                <h2>{featured.title}</h2>
                <p>{featured.description || "Read our comprehensive in-depth review and expert verdict."}</p>
                <div className="featured-meta">
                  {featured.date && <span>📅 {featured.date}</span>}
                  <span>⏱ 8 min read</span>
                </div>
                <span className="read-btn">Read Full Article →</span>
              </div>
            </a>
          </section>
        )}

        {/* ── LATEST ARTICLES ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <h2 className="section-title">Latest Articles</h2>
            <a href="/all-articles" className="section-link">View all →</a>
          </div>
          {posts.length === 0 ? (
            <p className="empty-state">No articles yet — check back soon!</p>
          ) : (
            <div className="post-grid">
              {(featured ? recent : posts.slice(0, 6)).map((post) => (
                <article className="post-card" key={post.slug}>
                  {post.coverImage && <img src={post.coverImage} alt={post.title} className="post-cover-img" />}
                  <div className="post-card-top">
                    {post.keyword && <span className="post-tag">{post.keyword}</span>}
                  {isNew(post.date) && <span className="post-new-badge">New</span>}
                    <span className="post-read-time">⏱ 6 min</span>
                  </div>
                  <h3><a href={`/${post.slug}`}>{post.title}</a></h3>
                  <p>{post.description || "Read our expert analysis and verdict."}</p>
                  <div className="post-card-footer">
                    <span className="post-date">{post.date}</span>
                    <a href={`/${post.slug}`} className="post-link">Read →</a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ── WHY TRUST US ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-eyebrow">Why Choose Us</div>
          <div className="section-header">
            <h2 className="section-title">Why Readers Trust eLearning Tools</h2>
          </div>
          <div className="why-grid">
            {([{"icon":"🎓","title":"We Actually Enroll","desc":"Our reviewers complete real courses and use platforms as paying students — not just observers."},{"icon":"📊","title":"Data-Driven Scores","desc":"12-point scoring framework covering UX, content quality, value, support and completion rates."},{"icon":"🔄","title":"Updated Quarterly","desc":"Platform pricing and features change fast. We update every review at least quarterly."},{"icon":"🌍","title":"All Learning Styles","desc":"From self-paced to cohort-based, video to text — we cover every format and modality."}] as {icon:string,title:string,desc:string}[]).map((w) => (
              <div key={w.title} className="why-card">
                <span className="why-icon">{w.icon}</span>
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-eyebrow">Common Questions</div>
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {([{"q":"What is the best online learning platform in 2025?","a":"Coursera is best for accredited, career-relevant certificates. Udemy offers the best value for practical skills. Teachable is the top choice for course creators."},{"q":"Is a Coursera certificate worth it?","a":"Yes — especially Google, IBM and university-backed certificates. Many are recognized by employers and can be completed in 3-6 months."},{"q":"What is the best free LMS for small businesses?","a":"Moodle and Google Classroom are both excellent free options. We have a detailed comparison of free LMS platforms for small teams."},{"q":"How do I choose between self-paced and live courses?","a":"Self-paced suits busy schedules and independent learners. Live/cohort courses provide accountability and community — ideal if you struggle with motivation."},{"q":"Can I make money selling courses online?","a":"Yes — platforms like Teachable and Kajabi make it straightforward. Our guide covers how to price, market and scale your online course business."}] as {q:string,a:string}[]).map((f) => (
              <div key={f.q} className="faq-item">
                <div className="faq-q">{f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <div className="newsletter-section">
          <h2>Level Up Your Learning in 2025</h2>
          <p>Get the best platform deals, new course releases and career-boosting certifications each week.</p>
          <NewsletterForm />
        </div>

        {/* ── CTA ── */}
        <div className="cta-section">
          <h2>Invest in the Right Learning Tools</h2>
          <p>Unbiased reviews and feature comparisons to help you choose the perfect platform for your learning goals.</p>
          <a href="/platform-comparison" className="cta-btn">Browse All Reviews →</a>
        </div>

      </div>
    </>
  );
}
