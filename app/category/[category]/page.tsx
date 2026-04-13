import { getAllPosts } from '../../../lib/posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ category: string }> }

const CATEGORY_MAP: Record<string, { label: string; desc: string; keywords: string[] }> = {
  'online-courses':      { label: 'Online Courses',         desc: 'Best Udemy, Coursera & online learning platforms',        keywords: ['udemy','coursera','online course','edx','skillshare'] },
  'lms':                 { label: 'LMS Software',            desc: 'Best Moodle, Canvas & learning management systems',       keywords: ['lms','moodle','canvas','blackboard','talentlms','docebo'] },
  'video-platforms':     { label: 'Video Platforms',         desc: 'Best video hosting and streaming platforms for education', keywords: ['video','vimeo','wistia','loom','youtube','streaming'] },
  'assessment':          { label: 'Quiz & Testing',          desc: 'Best quiz builders and assessment tools for educators',   keywords: ['quiz','test','assessment','kahoot','typeform','google forms'] },
  'certifications':      { label: 'Certifications',          desc: 'Best online certifications for career growth',            keywords: ['certification','certificate','aws','google','comptia','pmp'] },
  'ai-learning':         { label: 'AI for Learning',         desc: 'Best AI tutors and adaptive learning platforms',          keywords: ['ai','adaptive','tutor','khanmigo','chatgpt','personalized'] },
  'course-creation':     { label: 'Course Creation',         desc: 'Best platforms to create and sell online courses',        keywords: ['teachable','thinkific','kajabi','podia','course creation','learnworlds'] },
  'language-learning':   { label: 'Language Learning',       desc: 'Best language learning apps for any language',            keywords: ['duolingo','babbel','italki','language','pimsleur','rosetta'] },
  'coding-bootcamps':    { label: 'Coding Bootcamps',        desc: 'Best coding bootcamps to launch a tech career',           keywords: ['bootcamp','coding','flatiron','app academy','hack reactor','codesmith'] },
  'virtual-classroom':   { label: 'Virtual Classroom',       desc: 'Best virtual classroom tools for teachers and students',  keywords: ['virtual classroom','google classroom','nearpod','zoom','teams','kahoot'] },
  'webinars':            { label: 'Webinar Platforms',       desc: 'Best webinar and online event platforms for 2025',        keywords: ['webinar','zoom','demio','webinarjam','streamyard','bigmarker'] },
  'flashcards':          { label: 'Flashcard Apps',          desc: 'Best flashcard and spaced repetition apps for studying',  keywords: ['flashcard','anki','quizlet','brainscape','memrise','spaced repetition'] },
  'skill-development':   { label: 'Skill Development',       desc: 'Best online platforms for professional skill development', keywords: ['linkedin learning','pluralsight','udemy','skill','coursera','edx'] },
  'kids-learning':       { label: "Children's Learning",     desc: 'Best educational apps for kids that actually work',       keywords: ['kids','children','abc','prodigy','khan academy kids','scratch','starfall'] },
  'tutoring':            { label: 'Online Tutoring',         desc: 'Best online tutoring platforms for any subject',          keywords: ['tutor','wyzant','tutor.com','italki','preply','chegg'] },
  'microlearning':       { label: 'Microlearning',           desc: 'Best microlearning platforms for bite-sized education',   keywords: ['microlearning','blinkist','axonify','edapp','bite-sized','headway'] },
  'corporate-training':  { label: 'Corporate Training',      desc: 'Best corporate LMS and employee training platforms',      keywords: ['corporate training','talentlms','docebo','cornerstone','udemy business','360learning'] },
  'edtech-tools':        { label: 'EdTech Tools',            desc: 'Best classroom technology tools for teachers',            keywords: ['edtech','padlet','nearpod','kahoot','pear deck','flipgrid','desmos'] },
  'learning-community':  { label: 'Learning Communities',    desc: 'Best online study groups and peer learning networks',     keywords: ['learning community','discord','study','reddit','maven','circle','stack overflow'] },
  'instructional-design':{ label: 'Instructional Design',    desc: 'Best eLearning authoring and instructional design tools', keywords: ['instructional design','articulate','storyline','captivate','ispring','camtasia'] },
  'audio-learning':      { label: 'Audio Learning',          desc: 'Best audio learning apps and educational podcasts',       keywords: ['audio','podcast','audible','pimsleur','blinkist','audiobook'] },
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = CATEGORY_MAP[category]
  if (!cat) return {}
  return {
    title: `Best ${cat.label} 2025 — eLearning Tools`,
    description: cat.desc,
    alternates: { canonical: `/category/${category}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = CATEGORY_MAP[category]
  if (!cat) notFound()

  const all = getAllPosts()
  const kw = cat.keywords
  const matched = all.filter((p) => {
    const text = ((p.keyword || '') + ' ' + (p.title || '') + ' ' + (p.slug || '')).toLowerCase()
    return kw.some((k) => text.includes(k))
  })
  const posts = matched.length > 0 ? matched : all

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#07090f;--surface:#0d1117;--border:#1a2030;--text:#e4e8f4;--muted:#7a82a0;--accent:#4f8ef7;--accent2:#a78bfa;--radius:12px}
        body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.6}
        a{text-decoration:none;color:inherit}
        .container{max-width:1100px;margin:0 auto;padding:0 24px}
        .cat-hero{padding:60px 24px 48px;text-align:center;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(79,142,247,0.13) 0%,transparent 70%)}
        .cat-badge{display:inline-block;padding:5px 16px;border-radius:20px;background:rgba(79,142,247,0.12);border:1px solid rgba(79,142,247,0.3);color:var(--accent);font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:16px}
        .cat-hero h1{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;letter-spacing:-0.03em;margin-bottom:12px}
        .cat-hero p{color:var(--muted);font-size:1rem;max-width:560px;margin:0 auto 24px}
        .breadcrumb{display:flex;align-items:center;gap:8px;font-size:0.8rem;color:var(--muted);justify-content:center;margin-bottom:32px}
        .breadcrumb a{color:var(--accent)}
        .post-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;padding-bottom:80px}
        .post-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:28px;display:flex;flex-direction:column;transition:border-color 0.15s,transform 0.15s}
        .post-card:hover{border-color:var(--accent);transform:translateY(-2px)}
        .post-tag{display:inline-block;padding:3px 10px;border-radius:20px;background:rgba(79,142,247,0.1);border:1px solid rgba(79,142,247,0.2);color:var(--accent2);font-size:0.68rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:12px}
        .post-card h2{font-size:1rem;font-weight:700;line-height:1.4;margin-bottom:10px}
        .post-card h2 a:hover{color:var(--accent)}
        .post-card p{color:var(--muted);font-size:0.87rem;line-height:1.65;flex:1;margin-bottom:18px}
        .post-footer{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid var(--border)}
        .post-date{font-size:0.72rem;color:var(--muted)}
        .post-link{font-size:0.82rem;color:var(--accent);font-weight:600}
        .empty{text-align:center;padding:80px 0;color:var(--muted)}
        @media(max-width:600px){.post-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="cat-hero">
        <div className="cat-badge">Category</div>
        <h1>{cat.label}</h1>
        <p>{cat.desc}</p>
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>{cat.label}</span>
        </div>
      </div>

      <div className="container">
        {posts.length === 0 ? (
          <p className="empty">No articles yet — check back soon!</p>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <article className="post-card" key={post.slug}>
                {post.keyword && <span className="post-tag">{post.keyword}</span>}
                <h2><a href={`/${post.slug}`}>{post.title}</a></h2>
                <p>{post.description}</p>
                <div className="post-footer">
                  <span className="post-date">{post.date}</span>
                  <a href={`/${post.slug}`} className="post-link">Read →</a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
