import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Menu, X, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import './styles.css';
import Football from './components/Football.jsx';
import { useRef } from 'react';

const IMG='/images/';
const founderScenes=['founder-walk.webp','sports-field.webp','students.webp','founder-stage.webp','founder-speaking.webp'];
const contact={email:'info@folasadeqhwesha.org',phone:'076 017 8897',address:'6830 Waterberg Drive, Kosmosdal, Centurion 0157'};
const areas=[['Eastern Cape','Lusikisiki — beginning with Toli Senior Secondary School'],['North West','Townships and informal settlements of Rustenburg'],['Limpopo','Schools reached through existing relationships']];
const programs=[
  {n:'01',name:'The Dignity Fund',tag:'Essential needs',desc:'Uniforms, shoes and school essentials for identified learners, provided privately and with dignity.',img:'students.webp'},
  {n:'02',name:'Room to Learn',tag:'Learning environments',desc:'Community co-investment to address overcrowded classrooms and strengthen spaces where learning happens.',img:'community.webp'},
  {n:'03',name:'Bridge to Somewhere',tag:'Education access',desc:'Career guidance, university and TVET applications, access to bursaries, devices, data and first-year mentoring.',img:'graduates.webp'},
  {n:'04',name:'Barefoot to Boots',tag:'Sport and development',desc:'Equipping aspiring players with boots and kit while connecting them to coaching, competition and bursary opportunities.',img:'sports-field.webp'},
  {n:'05',name:'Crown Skills',tag:'Financial and digital skills',desc:'Practical financial literacy, digital capabilities and exposure to careers requiring scarce skills.',img:'founder-event.webp'},
  {n:'06',name:'Global Gateway',tag:'Exposure and leadership',desc:'Access to mentors, leadership development and opportunities across Africa and the world.',img:'founder-speaking.webp'}
];
const targets=[['100','Partner schools'],['5,000','Learners reached through educational guidance'],['3,000','University admissions'],['1,000','Young players equipped'],['50','Classrooms and laboratories'],['2,500','Dignity Fund beneficiaries']];
function ScrollReset(){const {pathname,hash}=useLocation();useEffect(()=>{document.title=(pathname==='/'?'Home':pathname.replace('/','').replaceAll('-',' '))+' | Folasade Qhwesha Foundation';if(!hash){window.scrollTo({top:0,behavior:'instant'});return;}const id=decodeURIComponent(hash.slice(1));const t=requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'}));return ()=>cancelAnimationFrame(t)},[pathname,hash]);return null}
function Logo(){return <Link className="identity" to="/" aria-label="Folasade Qhwesha Foundation home"><span className="identity-symbol"><img src={IMG+'fqf-official-logo.webp'} alt="" /></span><span className="identity-name">FOLASADE<br/>QHWESHA <b>FOUNDATION</b></span></Link>}
function Header(){const [open,setOpen]=useState(false);const {pathname}=useLocation();useEffect(()=>setOpen(false),[pathname]);useEffect(()=>{if(!open)return;const close=e=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',close);return ()=>window.removeEventListener('keydown',close)},[open]);return <header className="site-header"><div className="header-inner"><Logo/><nav className={open?'navigation open':'navigation'} id="main-navigation" aria-label="Main navigation"><NavLink to="/our-story">About us</NavLink><NavLink to="/programmes">Programmes</NavLink><NavLink to="/our-ambition">Our ambition</NavLink><NavLink to="/leadership">People</NavLink><Link className="mobile-contact" to="/contact">Get involved</Link></nav><div className="header-actions"><Link className="header-contact" to="/contact">Get involved <ArrowUpRight size={17}/></Link><button className="menu-button" onClick={()=>setOpen(!open)} aria-label={open?'Close navigation':'Open navigation'} aria-controls="main-navigation" aria-expanded={open}>{open?<X/>:<Menu/>}</button></div></div></header>}
function ArrowLink({to,children,inverse=false}){return <Link to={to} className={'arrow-link '+(inverse?'inverse':'')}>{children}<span><ArrowUpRight size={18}/></span></Link>}
function Eyebrow({number,children}){return <div className="eyebrow"><span>{number}</span>{children}</div>}
function PageBanner({index,label,title,description,image}){return <section className="page-banner"><div className="shell page-banner-grid"><div className="page-banner-copy"><Eyebrow number={index}>{label}</Eyebrow><h1>{title}</h1><p>{description}</p></div><div className="page-banner-image"><img src={IMG+image} alt="Foundation outreach activity" /></div></div></section>}
const slides=[
 {id:'01',label:'OUR PURPOSE',headline:['Talent is everywhere.','Access is not.'],description:'Creating pathways for young people in South Africa’s rural and township communities.',image:'school-assembly.webp',alt:'FQF outreach gathering with school learners',cta:'Explore our mission',href:'/our-story'},
 {id:'02',label:'EDUCATION & OPPORTUNITY',headline:['A future should not','depend on a postcode.'],description:'From classrooms to career guidance, the right support can change what comes next.',image:'students.webp',alt:'Students participating in a foundation engagement',cta:'Explore our programmes',href:'/programmes'},
 {id:'03',label:'THE FOUNDER’S STORY',headline:['From playing barefoot','to opening doors.'],description:'The experience behind a foundation committed to dignity, achievement and opportunity.',image:'founder-speaking.webp',alt:'Founder speaking to young learners at an outreach event',cta:'Meet the foundation',href:'/our-story'}
];
const accessBarriers = [
  {name:'Equipment', emphasis:'The essentials to take part.', explanation:'Boots, school uniforms, devices and data should not determine who gets to participate.'},
  {name:'Space', emphasis:'Room to learn.', explanation:'Overcrowded classrooms can limit the environment in which young people learn and grow.'},
  {name:'Information', emphasis:'Knowing what comes next.', explanation:'Career choices, applications, bursaries and deadlines are opportunities only when young people know about them.'},
  {name:'Skills', emphasis:'The confidence to compete.', explanation:'Financial capability, digital skills and professional readiness help turn potential into progress.'},
  {name:'Exposure', emphasis:'A wider world of possibility.', explanation:'Mentors, networks and opportunities beyond a local community can change the path ahead.'}
];
function PurposeChapter(){
  const [selected,setSelected] = useState(0);
  const active = accessBarriers[selected];
  return <section className="purpose24" aria-labelledby="purpose24-title">
    <div className="purpose24-inner">
      <div className="purpose24-left">
        <div className="purpose24-overline"><span className="purpose24-mark" aria-hidden="true"/> THE REASON WE EXIST</div>
        <h2 id="purpose24-title">Potential exists.<span>Barriers persist.</span></h2>
        <p className="purpose24-statement">The difference is often not ability. It is opportunity.</p>
        <p className="purpose24-body">The Folasade Qhwesha Foundation works alongside rural and township communities to remove the practical barriers standing between young people and opportunity.</p>
        <Link to="/our-story" className="purpose24-link">Discover our purpose</Link>
      </div>
      <div className="purpose24-right">
        <div className="purpose24-right-head"><span>THE ACCESS GAP</span><span>FIVE BARRIERS. ONE PURPOSE.</span></div>
        <div className="purpose24-display" id="purpose24-detail" aria-live="polite" aria-atomic="true">
          <div className="purpose24-context">A CLOSER LOOK AT THE BARRIERS</div>
          <h3 key={active.name}>{active.emphasis}</h3>
          <p key={active.explanation}>{active.explanation}</p>
        </div>
        <div className="purpose24-tabs" role="group" aria-label="Explore the five barriers to opportunity">
          {accessBarriers.map((barrier,i)=><button key={barrier.name}
            className={'purpose24-tab'+(i===selected?' is-active':'')}
            type="button" aria-pressed={i===selected} aria-controls="purpose24-detail" onClick={()=>setSelected(i)}>
            {barrier.name}
          </button>)}
        </div>
      </div>
    </div>
    <div className="purpose24-bottom"><span>FOLASADE QHWESHA FOUNDATION</span><span>EVERY YOUNG PERSON DESERVES A FAIR CHANCE</span></div>
  </section>;
}

function Home(){const [current,setCurrent]=useState(0);const [paused,setPaused]=useState(false);const slide=slides[current];useEffect(()=>{if(paused||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const advance=()=>{if(!document.hidden)setCurrent(n=>(n+1)%slides.length)};const i=setInterval(advance,8000);return ()=>clearInterval(i)},[paused]);const prev=()=>{setCurrent(n=>(n+slides.length-1)%slides.length);setPaused(true)},next=()=>{setCurrent(n=>(n+1)%slides.length);setPaused(true)};return <>
<section className="feature-hero" aria-label="Featured foundation stories"><div className="hero-frames">{slides.map((s,i)=><img key={s.id} className={'hero-frame '+(i===current?'is-active':'')} src={IMG+s.image} alt={i===current?s.alt:''} aria-hidden={i!==current} fetchPriority={i===0?'high':'auto'}/>)}</div><div className="hero-shade"/><div className="hero-content" key={slide.id}><span className="hero-kicker">FOLASADE QHWESHA FOUNDATION <span className="hero-kicker-divider"/> {slide.label}</span><h1>{slide.headline[0]}<br/>{slide.headline[1]}</h1><p>{slide.description}</p><Link className="hero-link" to={slide.href}>{slide.cta}<ArrowUpRight size={22}/></Link></div><div className="hero-bottom"><div className="hero-caption"><span>{slide.id} / 0{slides.length}</span><strong>{slide.label}</strong></div><div className="hero-controls"><button onClick={prev} aria-label="Previous featured story"><ArrowRight className="left-arrow" size={22}/></button><button onClick={()=>setPaused(v=>!v)} aria-label={paused?'Play automatic slideshow':'Pause automatic slideshow'}>{paused?<span className="play-glyph">▶</span>:<span className="pause-glyph">Ⅱ</span>}</button><button onClick={next} aria-label="Next featured story"><ArrowRight size={22}/></button></div></div><div className="hero-progress" aria-hidden="true">{slides.map((s,i)=><button key={s.id} className={i===current?'active':''} onClick={()=>{setCurrent(i);setPaused(true)}} aria-label={'Show featured story '+(i+1)} aria-current={i===current?'true':undefined} />)}</div></section>
<PurposeChapter/>
<section className="v11-work" aria-labelledby="v11-work-title">
  <div className="v11-wrap">
    <div className="v11-work-top"><div><div className="v11-section-label">WHAT WE DO</div><h2 id="v11-work-title">Six ways to move<br/>forward.</h2></div><p>From the essentials needed for school to the connections that open a career. Each programme addresses a different barrier to opportunity.</p></div>
    <div className="v11-work-layout">
      <Link className="v11-photo-feature v11-feature-a" to="/programmes"><img src={IMG+'students.webp'} alt="School learners participating in a foundation outreach programme" loading="lazy"/><span className="v11-photo-scrim"/><div className="v11-photo-top"><span>EDUCATION & DIGNITY</span><ArrowUpRight size={21}/></div><div className="v11-photo-copy"><h3>The Dignity Fund</h3><p>School essentials, provided privately and with respect.</p></div></Link>
      <Link className="v11-photo-feature v11-feature-b" to="/programmes"><img src={IMG+'sports-field.webp'} alt="Young people engaged in sporting activities" loading="lazy"/><span className="v11-photo-scrim"/><div className="v11-photo-top"><span>SPORT & POSSIBILITY</span><ArrowUpRight size={21}/></div><div className="v11-photo-copy"><h3>Barefoot to Boots</h3><p>Equipping talent to take its next step.</p></div></Link>
      <div className="v11-more-work"><div className="v11-more-title">ALSO PART OF OUR WORK</div>{[programs[1],programs[2],programs[4],programs[5]].map(p=><Link key={p.n} to={"/programmes#programme-"+p.n} className="v11-more-row"><strong>{p.name}</strong></Link>)}<Link className="v11-all-work" to="/programmes">See all six programmes</Link></div>
    </div>
  </div>
</section>
<FounderJourney/>
<section className="v11-location" aria-labelledby="v11-location-title"><div className="v11-wrap"><div className="v11-location-head"><div className="v11-section-label">WHERE WE BEGIN</div><h2 id="v11-location-title">Rooted in communities.<br/>Focused on futures.</h2></div><div className="v11-region-row">{areas.map(([name,desc],i)=><div className="v11-region" key={name}><h3>{name}</h3><p>{desc}</p></div>)}</div><div className="v11-location-bottom"><p>Working alongside existing schools and local structures, with ambitions to reach further over time.</p><Link className="v11-inline-link" to="/our-ambition">Explore our ambition <ArrowUpRight size={19}/></Link></div></div></section>

</>}
const journeyChapters=[
 {tag:'THE BEGINNING',title:'A childhood between two worlds.',body:'From the rural villages of Lusikisiki to the townships of Rustenburg, Vuyo Qhwesha grew up knowing that ability and opportunity are not always found in the same place.',detail:'Lusikisiki · Rustenburg'},
 {tag:'THE FOOTBALL FIELD',title:'The only player without boots.',body:'He played barefoot alongside teammates who had boots. The experience stayed with him—not as a story about lacking talent, but about the simple things that allow talent to compete.',detail:'Mahobe Young Stars FC · Bongweni FC'},
 {tag:'THE CLASSROOM',title:'Education opened a different field.',body:'School leadership and academic achievement took him to the University of the Witwatersrand, and ultimately to qualifying as a Chartered Accountant.',detail:'Learner leadership · Wits · CA(SA)'},
 {tag:'BEYOND BORDERS',title:'From South Africa to the world.',body:'Professional experience at BDO South Africa and Deloitte in the Cayman Islands brought exposure to people and institutions across borders.',detail:'BDO South Africa · Deloitte Cayman Islands'},
 {tag:'THE FOUNDATION',title:'Now, he is reaching back.',body:'The Folasade Qhwesha Foundation exists to help young people access the equipment, information, mentorship and opportunities that allow their ability to be seen.',detail:'Honour earns a crown.'}
];
function FounderJourney(){
 const section=useRef(null),ring=useRef(null),progress=useRef(0);
 const [current,setCurrent]=useState(0);
 useEffect(()=>{
   let raf=0;
   const update=()=>{
     raf=0;
     const el=section.current;if(!el)return;
     const r=el.getBoundingClientRect();
     const distance=Math.max(1,r.height-window.innerHeight);
     const p=Math.max(0,Math.min(1,-r.top/distance));
     progress.current=p;
     if(ring.current) ring.current.style.setProperty('--ring-rotation', `${(p * -110).toFixed(2)}deg`);
     const n=Math.min(4,Math.floor(p*5));
     setCurrent(old=>old===n?old:n);
   };
   const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
   window.addEventListener('scroll',onScroll,{passive:true});
   window.addEventListener('resize',onScroll,{passive:true});
   update();
   return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);cancelAnimationFrame(raf)};
 },[]);
 const ringText='ORIGIN  •  BAREFOOT  •  EDUCATION  •  THE WORLD  •  REACHING BACK  •  '; 
 return <section className="fqf-orbit-story" ref={section} aria-labelledby="fqf-orbit-heading">
   <div className="fqf-orbit-sticky">
     <div className="fqf-orbit-visual">
       <div className="fqf-orbit-photo" aria-hidden="true">{founderScenes.map((img,i)=><img key={img} src={IMG+img} className={i===current?'is-current':''} alt="" loading="lazy"/>)}</div>
       <div className="fqf-orbit-photo-shade" aria-hidden="true"/>
       <div className="fqf-orbit-stage-glow" aria-hidden="true"/>
       <div className="fqf-orbit-ball-zone">
         <div className="fqf-orbit-ring" ref={ring} aria-hidden="true">
           <svg viewBox="0 0 620 620" role="presentation">
             <defs><path id="fqf-ring-path" d="M 310,310 m -238,0 a 238,238 0 1,1 476,0 a 238,238 0 1,1 -476,0" /></defs>
             <text textLength="1495" lengthAdjust="spacing" aria-hidden="true">
               <textPath href="#fqf-ring-path" startOffset="0%">{ringText.repeat(2)}</textPath>
             </text>
           </svg>
         </div>
         <Football progressRef={progress} activeChapter={current}/>
         <div className="fqf-orbit-shadow" aria-hidden="true"/>
       </div>
       <div className="fqf-orbit-stamp" aria-hidden="true">HONOUR EARNS A CROWN<span>FOLASADE QHWESHA FOUNDATION</span></div>
       <div className="fqf-orbit-meta"><span>THE FOUNDER’S JOURNEY</span><span>SCROLL TO EXPLORE</span></div>
     </div>
     <div className="fqf-orbit-copy" aria-live="off">
       <div className="fqf-orbit-copy-card">
         <div className="fqf-orbit-topline">THE STORY BEHIND THE FOUNDATION <span>{String(current+1).padStart(2,'0')} / 05</span></div>
         <div className="fqf-orbit-chapter" key={current}>
           <div className="fqf-orbit-tag">{journeyChapters[current].tag}</div>
           <h2 id="fqf-orbit-heading">{journeyChapters[current].title}</h2>
           <p>{journeyChapters[current].body}</p>
           <div className="fqf-orbit-detail">{journeyChapters[current].detail}</div>
         </div>
         <Link className="fqf-orbit-link" to="/our-story">Explore the founder's story</Link>
         <div className="fqf-orbit-progress" aria-label="Story progress">{journeyChapters.map((c,i)=><span key={c.tag} className={i<=current?'active':''} aria-hidden="true"/>)}</div>
       </div>
     </div>
   </div>
   <div className="fqf-orbit-stages" aria-hidden="true">{journeyChapters.map(c=><div key={c.tag}/>)}</div>
   <div className="fqf-orbit-accessible">
     {journeyChapters.map(c=><article key={c.tag}><small>{c.tag}</small><h3>{c.title}</h3><p>{c.body}</p></article>)}
     <Link to="/our-story">Explore the founder's story</Link>
   </div>
 </section>;
}
function InnerIntro({label,title,description,theme='cream',note}){return <section className={'in27-hero in27-hero-'+theme}><div className="in27-wrap"><div className="in27-kicker"><span className="in27-dot"/> FOLASADE QHWESHA FOUNDATION <span className="in27-kicker-slash">/</span> {label}</div><div className="in27-hero-grid"><h1>{title}</h1><div className="in27-hero-aside"><p>{description}</p>{note&&<span className="in27-hero-note">{note}</span>}</div></div></div></section>}
function InnerNext({eyebrow,title,body,to,action}){return <section className="in27-next"><div className="in27-wrap in27-next-grid"><div><span className="in27-micro">{eyebrow}</span><h2>{title}</h2></div><div><p>{body}</p><Link to={to} className="in27-outline-link">{action}<ArrowUpRight size={20}/></Link></div></div></section>}
function Story(){return <div className="in27">
 <InnerIntro label="ABOUT US" title={<>A foundation built on <em>possibility.</em></>} description="We believe a young person's circumstances should never determine the limits of their future." note="OUR PURPOSE · OUR ROOTS · OUR VALUES"/>
 <section className="in27-story-opening"><div className="in27-wrap in27-split"><div className="in27-micro">01 / WHY WE EXIST</div><div><h2>Potential does not need permission to exist. <span>Opportunity does.</span></h2><p>Across rural and township communities, young people hold talent and ambition. What is often missing is access: to resources, guidance, spaces to learn and people who can open doors.</p><p>The Folasade Qhwesha Foundation exists to work alongside schools and communities to help close that gap with practical, respectful support.</p></div></div></section>
 <section className="in27-story-roots"><div className="in27-wrap in27-roots-grid"><div className="in27-roots-image"><img src={IMG+'founder-walk.webp'} alt="Vuyo Qhwesha during community outreach" loading="lazy"/><span>FROM THE FOUNDER'S JOURNEY</span></div><div className="in27-roots-copy"><span className="in27-micro">02 / WHERE IT BEGINS</span><h2>From playing barefoot to opening doors.</h2><p>Founder Vuyo Qhwesha grew up between Lusikisiki in the Eastern Cape and Rustenburg in the North West. As a young footballer, he played without boots. Later, education and opportunity helped open a different path.</p><p>His journey through the University of the Witwatersrand and a career as a Chartered Accountant informs the foundation's commitment to access with dignity.</p><Link to="/leadership" className="in27-text-link">Meet the people behind FQF <ArrowUpRight size={19}/></Link></div></div></section>
 <section className="in27-values"><div className="in27-wrap"><div className="in27-values-head"><span className="in27-micro">03 / WHAT GUIDES US</span><h2>Our values are not decoration.<br/>They shape the work.</h2></div><div className="in27-value-grid">{[['Character','Integrity, honesty and accountability.'],['Rootedness','Pride in rural and township identity.'],['Ownership','Working together and taking action.'],['Wisdom & excellence','High standards in everything we do.'],['Nurture with dignity','Helping without shaming.']].map(([title,body])=><article key={title}><span className="in27-value-symbol" aria-hidden="true">✳</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
 <InnerNext eyebrow="CONTINUE THE STORY" title="Purpose becomes meaningful through action." body="Explore the six programmes designed to help young people move from potential to possibility." to="/programmes" action="Explore our programmes"/>
 </div>}
function Programs(){const [active,setActive]=useState('all');const shown=active==='all'?programs:programs.filter(p=>active==='education'?['01','02','03'].includes(p.n):active==='sport'?p.n==='04':['05','06'].includes(p.n));return <div className="in27">
 <InnerIntro label="OUR PROGRAMMES" theme="dark" title={<>Six ways to <em>open doors.</em></>} description="Practical, interconnected programmes addressing the barriers between young people's ability and their opportunities." note="PROGRAMME CONCEPTS · DELIVERY DETAILS TO BE CONFIRMED"/>
 <section className="in27-programmes"><div className="in27-wrap"><div className="in27-programme-head"><div><span className="in27-micro">WHERE OUR WORK TAKES SHAPE</span><h2>Support that meets people where they are.</h2></div><p>From basic essentials to mentorship and global exposure, each programme addresses a different barrier to opportunity.</p></div><div className="in27-filters" role="group" aria-label="Filter programmes">{[['all','All programmes'],['education','Education & dignity'],['sport','Sport'],['future','Skills & exposure']].map(([id,label])=><button type="button" key={id} className={active===id?'is-active':''} aria-pressed={active===id} onClick={()=>setActive(id)}>{label}</button>)}</div><div className="in27-programme-grid">{shown.map(p=><article className="in27-programme-card" key={p.n}><div className="in27-programme-card-top"><span>{p.n} / 06</span><span>{p.tag.toUpperCase()}</span></div><div className="in27-programme-card-mid"><h3>{p.name}</h3><p>{p.desc}</p></div><div className="in27-programme-card-foot"><span>FQF PROGRAMME</span><ArrowUpRight size={21}/></div></article>)}</div><p className="in27-footnote">Programme descriptions reflect the foundation's draft profile and should be confirmed before public launch.</p></div></section>
 <section className="in27-programme-statement"><div className="in27-wrap"><span className="in27-micro">THE COMMON THREAD</span><p>Not charity for its own sake.<br/><strong>Access that changes what comes next.</strong></p></div></section>
 <InnerNext eyebrow="PARTNERSHIPS" title="The work is stronger together." body="Schools, communities, mentors and organisations can help make these programmes possible." to="/contact" action="Start a conversation"/>
 </div>}
function Ambition(){return <div className="in27">
 <InnerIntro label="OUR AMBITION" title={<>A future we can <em>measure.</em></>} description="We are setting a clear direction for impact—and committing to distinguish goals from results." note="THE FIGURES BELOW ARE ASPIRATIONAL TARGETS, NOT ACHIEVEMENTS"/>
 <section className="in27-ambition-statement"><div className="in27-wrap in27-split"><span className="in27-micro">01 / THE COMMITMENT</span><div><h2>Impact is more than the number of activities we run.</h2><p>It is about whether a learner stays in school, finds the next opportunity, gains confidence or gets the support needed to move forward. Transparent measurement will help the foundation and its partners learn what works.</p></div></div></section>
 <section className="in27-targets"><div className="in27-wrap"><div className="in27-targets-head"><span className="in27-micro">02 / LONG-TERM ASPIRATIONS</span><span className="in27-target-badge">TARGETS · NOT CURRENT RESULTS</span></div><div className="in27-target-grid">{[...targets,['3,000','Young people trained in financial literacy'],['2,500','Young people paired with mentors']].map(([num,label])=><article key={label}><strong>{num}</strong><span>{label}</span></article>)}</div><p className="in27-footnote">Targets are drawn from the foundation's draft 2026 profile. Timelines, methodologies and verified achievements must be established before reporting progress.</p></div></section>
 <section className="in27-geographies"><div className="in27-wrap"><div className="in27-geographies-head"><span className="in27-micro">03 / WHERE THE WORK BEGINS</span><h2>Grounded locally.<br/><em>Thinking beyond borders.</em></h2></div><div className="in27-place-grid">{areas.map(([name,desc])=><div key={name}><h3>{name}</h3><p>{desc}</p></div>)}</div></div></section>
 <InnerNext eyebrow="WORK WITH US" title="Good intentions need good partners." body="We welcome conversations with institutions and individuals who share a commitment to dignity and access." to="/contact" action="Get in touch"/>
 </div>}
function Leadership(){return <div className="in27">
 <InnerIntro label="PEOPLE" theme="dark" title={<>People who believe <em>in possibility.</em></>} description="Professional experience brought into service of communities, young people and long-term opportunity." note="LEADERSHIP DETAILS SUBJECT TO FINAL CONFIRMATION"/>
 <section className="in27-team"><div className="in27-wrap"><div className="in27-team-intro"><span className="in27-micro">THE PEOPLE BEHIND THE PURPOSE</span><h2>Experience with a reason.</h2></div><article className="in27-person in27-person-primary"><div className="in27-person-image"><img src={IMG+'founder-stage.webp'} alt="Vuyo Qhwesha at an event" loading="lazy"/></div><div className="in27-person-text"><span className="in27-micro">FOUNDER · CA(SA)</span><h3>Vuyo<br/>Qhwesha</h3><p>A Chartered Accountant whose journey spans rural and township South Africa, education at the University of the Witwatersrand and professional experience in South Africa and internationally.</p><p>His experience informs a commitment to access, dignity and opportunities for the next generation.</p></div></article><article className="in27-person in27-person-secondary"><div className="in27-person-image"><img src={IMG+'nondumiso.webp'} alt="Nondumiso Blose" loading="lazy"/></div><div className="in27-person-text"><span className="in27-micro">PROFILED LEADERSHIP · CA(SA)</span><h3>Nondumiso<br/>Blose</h3><p>A finance professional with experience spanning financial management, valuation, reporting and banking, with academic qualifications from the University of the Witwatersrand.</p><p>Her profile reflects the professional knowledge that can support organisations with enduring social purpose.</p></div></article><p className="in27-footnote">Leadership titles, board appointments, photographs and roles require final approval from the foundation before publication.</p></div></section>
 <InnerNext eyebrow="THE PURPOSE" title="The work is bigger than any one person." body="The foundation's mission comes to life through schools, communities, supporters and young people themselves." to="/our-story" action="Read our story"/>
 </div>}
const enquiryTypes = [
  ['Corporate partnership','Corporate partnership'],
  ['School or community','School or community collaboration'],
  ['Volunteer or mentor','Volunteering or mentoring'],
  ['Programme enquiry','Programme enquiry'],
  ['General enquiry','General enquiry']
];
function EnquiryForm(){
 const [values,setValues]=useState({name:'',organisation:'',email:'',phone:'',interest:'',message:'',consent:false,website:''});
 const [notice,setNotice]=useState('');
 const update=(field,value)=>{setValues(v=>({...v,[field]:value}));if(notice)setNotice('')};
 const submit=(event)=>{
  event.preventDefault();
  if(values.website)return;
  const clean=key=>values[key].trim();
  if(!clean('name')||!clean('email')||!clean('interest')||!clean('message')||!values.consent){setNotice('Complete the required fields and privacy acknowledgement.');return;}
  const subject='FQF website enquiry — '+clean('interest');
  const body=[
   'FOLASADE QHWESHA FOUNDATION — WEBSITE ENQUIRY','',
   'Name: '+clean('name'),
   'Organisation: '+(clean('organisation')||'Not provided'),
   'Email: '+clean('email'),
   'Phone: '+(clean('phone')||'Not provided'),
   'Enquiry type: '+clean('interest'),'',
   'Message:',clean('message'),'',
   'Sent from the Get Involved page. Please respond to the email address above.'
  ].join('\n');
  const href='mailto:'+contact.email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  setNotice('Your email app should open with the message. Please press Send there to complete your enquiry. If it does not open, email us directly using the address shown below.');
  window.location.href=href;
 };
 return <section className="in28-enquiry" id="enquiry-form" aria-labelledby="in28-form-title">
  <div className="in27-wrap in28-enquiry-grid">
   <div className="in28-enquiry-intro"><span className="in27-micro">SEND AN ENQUIRY</span><h2 id="in28-form-title">Start something <em>meaningful.</em></h2><p>Tell us who you are and how you would like to connect. We welcome thoughtful approaches from schools, businesses, communities and potential mentors.</p><div className="in28-form-meta"><span>01 / YOUR DETAILS</span><span>02 / YOUR MESSAGE</span><span>03 / REVIEW & SEND</span></div><div className="in28-form-note"><strong>Prefer email?</strong><a href={'mailto:'+contact.email}>{contact.email}</a></div></div>
   <form className="in28-form" onSubmit={submit}>
    <div className="in28-form-top"><span>PARTNERSHIP & GENERAL ENQUIRIES</span><span>* REQUIRED</span></div>
    <div className="in28-form-fields">
     <label>Full name <span>*</span><input name="name" type="text" autoComplete="name" required maxLength={100} placeholder="Your full name" value={values.name} onChange={e=>update('name',e.target.value)}/></label>
     <label>Organisation / company<input name="organisation" type="text" autoComplete="organization" maxLength={120} placeholder="If applicable" value={values.organisation} onChange={e=>update('organisation',e.target.value)}/></label>
     <label>Email address <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={160} placeholder="you@example.com" value={values.email} onChange={e=>update('email',e.target.value)}/></label>
     <label>Contact number<input name="phone" type="tel" autoComplete="tel" maxLength={35} placeholder="Optional" value={values.phone} onChange={e=>update('phone',e.target.value)}/></label>
     <label className="in28-wide">I am interested in <span>*</span><select name="interest" required value={values.interest} onChange={e=>update('interest',e.target.value)}><option value="">Select an enquiry type</option>{enquiryTypes.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
     <label className="in28-wide">Your message <span>*</span><textarea name="message" rows={6} minLength={10} maxLength={2500} required placeholder="Tell us a little about your idea, organisation or the support you're looking for..." value={values.message} onChange={e=>update('message',e.target.value)}/></label>
    </div>
    <div className="in28-hp" aria-hidden="true"><label>Leave this blank<input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={e=>update('website',e.target.value)}/></label></div>
    <label className="in28-consent"><input type="checkbox" required checked={values.consent} onChange={e=>update('consent',e.target.checked)}/><span>I agree that the contact details I provide may be used by the foundation to respond to this enquiry. <strong>*</strong></span></label>
    <button className="in28-send" type="submit">Prepare email enquiry <ArrowUpRight size={20}/></button>
    <p className="in28-form-disclosure">This form prepares an email in your email application. Your enquiry is not delivered until you send that email. No information is stored on this website.</p>
    {notice&&<p className="in28-form-notice" role="status">{notice}</p>}
   </form>
  </div>
 </section>;
}
function Contact(){return <div className="in27">
 <InnerIntro label="GET INVOLVED" title={<>Let's make <em>access possible.</em></>} description="The strongest partnerships begin with a conversation. Tell us what you'd like to help build." note="PARTNERSHIPS · SCHOOLS · COMMUNITY COLLABORATION"/>
 <section className="in27-contact"><div className="in27-wrap in27-contact-grid"><div><span className="in27-micro">START A CONVERSATION</span><h2>There is more than one way to contribute.</h2><p>Whether you represent a school, a business, a community organisation or simply want to explore a collaboration, we'd be glad to hear from you.</p><div className="in27-contact-actions"><a className="in27-contact-primary" href={'mailto:'+contact.email+'?subject=FQF%20Partnership%20Enquiry'}>Email the foundation <ArrowUpRight size={20}/></a><a href={'tel:+27760178897'} className="in27-contact-secondary">Call the foundation <ArrowUpRight size={19}/></a></div></div><div className="in27-contact-details"><div><span>EMAIL ENQUIRIES</span><a href={'mailto:'+contact.email}>{contact.email}</a></div><div><span>TELEPHONE</span><a href="tel:+27760178897">{contact.phone}</a></div><div><span>REGISTERED CONTACT ADDRESS</span><p>{contact.address}</p></div><div className="in27-contact-note"><span>IMPORTANT</span><p>Donations and tax deductibility should not be represented as section 18A eligible unless the foundation's approval is verified.</p></div></div></div></section>
 <section className="in27-ways"><div className="in27-wrap"><span className="in27-micro">WAYS TO CONNECT</span><div className="in27-way-grid">{[['01','Schools & communities','Share challenges or discuss practical programme partnerships.'],['02','Corporate partners','Explore structured support for education, skills or sport.'],['03','Mentors & collaborators','Offer knowledge, experience and connections to young people.']].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
 <EnquiryForm/>
 </div>}
function Footer(){return <footer className="footer footer-nav-style" aria-label="Foundation footer">
  <div className="footer-nav-primary">
    <div className="footer-nav-shell">
      <div className="footer-nav-brand"><Logo/></div>
      <nav className="footer-nav-links" aria-label="Footer navigation">
        <Link to="/our-story">About us</Link>
        <Link to="/programmes">Programmes</Link>
        <Link to="/our-ambition">Our ambition</Link>
        <Link to="/leadership">People</Link>
      </nav>
      <Link className="footer-nav-cta" to="/contact">Get involved <ArrowUpRight aria-hidden="true" size={19}/></Link>
    </div>
  </div>
  <div className="footer-nav-detail">
    <div className="footer-nav-detail-inner">
      <div className="footer-nav-description">
        <span className="footer-nav-label">FOLASADE QHWESHA FOUNDATION NPC</span>
        <p>Working with communities to expand access to education, sport, skills and opportunity.</p>
      </div>
      <div className="footer-nav-contact">
        <span className="footer-nav-label">CONTACT</span>
        <a href={'mailto:'+contact.email}>{contact.email}</a>
        <a href="tel:+27760178897">{contact.phone}</a>
      </div>
      <div className="footer-nav-address">
        <span className="footer-nav-label">SOUTH AFRICA</span>
        <address>{contact.address}</address>
      </div>
    </div>
  </div>
  <div className="footer-nav-legal">
    <div className="footer-nav-legal-inner">
      <span>© {new Date().getFullYear()} Folasade Qhwesha Foundation NPC</span>
      <a href={'mailto:'+contact.email}>Enquiries <ArrowUpRight size={14} aria-hidden="true"/></a>
    </div>
  </div>
</footer>}

function App(){return <BrowserRouter><ScrollReset/><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/our-story" element={<Story/>}/><Route path="/programmes" element={<Programs/>}/><Route path="/our-ambition" element={<Ambition/>}/><Route path="/leadership" element={<Leadership/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Home/>}/></Routes></main><Footer/></BrowserRouter>}
createRoot(document.getElementById('root')).render(<App/>);
