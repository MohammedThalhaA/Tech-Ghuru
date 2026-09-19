import { ServiceData } from "@/components/ServiceLandingPage";

export const servicesData: Record<string, ServiceData> = {
  "web-developing": {
    id: "web-developing",
    title: "Web Development Built for Speed and Growth",
    eyebrow: "Web Development",
    tagline: "Fast, responsive and scalable websites designed to turn visitors into customers and fuel business growth.",
    heroVisualType: "web",
    overview: {
      title: "Transform Your Digital Presence with Modern Web Architecture",
      paragraphs: [
        "In today's digital landscape, your website is the primary touchpoint for clients across the globe. At Tech Ghuru, we design and develop custom web solutions that go beyond visual elegance. We prioritize loading speeds, accessibility, and robust security frameworks.",
        "Whether you require a corporate portfolio, a heavy-traffic dynamic web application, or a multi-vendor e-commerce store, our engineering team implements clean, modular React and Next.js structures that scale seamlessly as your customer base expands."
      ],
      metric: {
        value: "99+ Performance",
        label: "Typical Google PageSpeed target score for launched platforms."
      }
    },
    features: [
      { icon: "fa-mobile-alt", title: "Responsive Layouts", desc: "Pixel-perfect rendering across all screen sizes, from mobile phones to high-resolution desktop screens." },
      { icon: "fa-bolt", title: "Blazing Speed", desc: "Static and server-rendered Next.js page optimizations to ensure load times under 1.5 seconds." },
      { icon: "fa-search", title: "SEO-Ready Core", desc: "Proper semantic HTML hierarchy, metadata layouts, and JSON-LD schema bindings for high search rankings." },
      { icon: "fa-cubes", title: "Modular Architecture", desc: "Component-driven React design system that makes future feature additions rapid and clean." },
      { icon: "fa-shield-alt", title: "Strict Security", desc: "Implementation of secure HTTPS configurations, modern route protections, and database validations." },
      { icon: "fa-database", title: "Data Integrations", desc: "Clean database integrations and third-party API configurations to automate your internal operations." }
    ],
    workflow: [
      { number: "01", title: "Discover", desc: "Analyzing your target audience, site goals, and core system requirements.", icon: "fa-search" },
      { number: "02", title: "Plan", desc: "Setting route architectures, content outlines, and design visual styleguides.", icon: "fa-map" },
      { number: "03", title: "Design", desc: "Creating UI wireframes and high-fidelity interactive Figma mockups for feedback.", icon: "fa-palette" },
      { number: "04", title: "Develop", desc: "Writing clean, type-checked Next.js code and configuring database setups.", icon: "fa-code" },
      { number: "05", title: "Test", desc: "Rigorous performance optimization, cross-device checks, and security audits.", icon: "fa-vial" },
      { number: "06", title: "Launch", desc: "Production compilation, deployment to cloud servers, and monitoring activation.", icon: "fa-rocket" }
    ],
    tools: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Node.js", "Prisma", "PostgreSQL", "MongoDB", "Figma", "Git"],
    whyChooseUs: [
      { icon: "fa-code-branch", title: "Performance First", desc: "We optimize all scripts, assets, and caching algorithms to guarantee maximum speed indices." },
      { icon: "fa-check-double", title: "Clean Codebase", desc: "We adhere strictly to modern coding standards, making your platform easy for other teams to maintain." },
      { icon: "fa-clock", title: "On-Time Delivery", desc: "We split execution milestones into weekly sprints to guarantee timely platform deployment." },
      { icon: "fa-headset", title: "Reliable Support", desc: "We provide post-launch optimization, security patches, and routine server updates." }
    ],
    outcomes: [
      { title: "Faster Loading Speeds", metric: "Designed to improve", desc: "Significantly lowers bounce rates by loading critical content in under 1.2s.", icon: "fa-bolt" },
      { title: "Higher Google Rankings", metric: "Designed to improve", desc: "Stricter semantic structure and speed scores result in organic search visibility gains.", icon: "fa-arrow-up" },
      { title: "Scalable Infrastructure", metric: "Typical project goal", desc: "Enables your web platform to comfortably host thousands of concurrent active visitors.", icon: "fa-server" }
    ],
    faqs: [
      { q: "How long does a typical web project take?", a: "A standard corporate or landing page project takes 3-4 weeks. Complex e-commerce systems or SaaS platforms usually take 6-10 weeks depending on custom features." },
      { q: "Will the website be fully mobile responsive?", a: "Yes, every website we design is fully optimized for mobile devices, tablets, and large screens, utilizing CSS grid and flexible layout adapters." },
      { q: "Do you integrate third-party APIs and payment systems?", a: "Yes, we regularly configure secure payment gateways (Razorpay, Stripe) and integrate external APIs (CRMs, email dispatchers, and tracking software)." }
    ],
    portfolio: [
      { title: "Universal Engineering Portal", desc: "Premium engineering website showcasing machinery portfolios and corporate assets.", category: "Corporate", img: "/img/portfolio pics/Universal Engineering.jpeg", link: "https://universalengineering.org.in/" },
      { title: "Travel Hassle Free", desc: "Modern dynamic travel agency portal featuring holiday packages and custom queries.", category: "E-Commerce", img: "/img/portfolio pics/travelhasslefree.com_.png", link: "https://travelhasslefree.com/" },
      { title: "Scissors Properties", desc: "Responsive corporate website showing real estate portfolios and property listings.", category: "Corporate", img: "/img/portfolio pics/React App (2).png", link: "http://scissorsproperties.com/" },
      { title: "Yakobu Website", desc: "Sleek responsive business website demonstrating custom architectural services.", category: "Corporate", img: "/img/portfolio pics/yakobu.png", link: "https://yakobu.in/" },
      { title: "Dhara Foundations", desc: "Dynamic charity community portal showcasing community welfare programs.", category: "Social Impact", img: "/img/portfolio pics/dharafoundations.com_.png", link: "https://dharafoundations.com/" },
      { title: "Ghurudev Academy", desc: "Advanced learning portal and educational asset database for students.", category: "Education", img: "/img/portfolio pics/ghrudev.png", link: "https://ghurudev.in/" }
    ]
  },
  "digital-marketing": {
    id: "digital-marketing",
    title: "Digital Marketing Built for Conversion and ROI",
    eyebrow: "Digital Marketing",
    tagline: "Result-driven digital marketing campaigns including SEO, paid ads, and social media funnels to scale your brand presence.",
    heroVisualType: "marketing",
    overview: {
      title: "Data-Driven Marketing to Grow Your Customer Base",
      paragraphs: [
        "In a highly competitive digital market, getting eyes on your platform is only half the battle. Tech Ghuru focuses on conversion rate optimization (CRO) and direct customer acquisition. We construct custom marketing funnels tailored to your exact industry metrics.",
        "We audit search console layouts, design optimized Google and Meta ad campaigns, and create engaging social copy that converts casual impressions into qualified sales opportunities."
      ],
      metric: {
        value: "5.8x ROI Target",
        label: "Typical return on ad spend (ROAS) targeted on optimized campaign systems."
      }
    },
    features: [
      { icon: "fa-chart-pie", title: "Search Engine Optimization", desc: "In-depth keyword targeting, on-page optimization, and authority building for organic ranking growth." },
      { icon: "fa-ad", title: "Paid Advertising", desc: "High-converting Google Search Ads, Display Networks, and Meta (Facebook/Instagram) targeting pipelines." },
      { icon: "fa-funnel-dollar", title: "Conversion Funnels", desc: "Setting up high-conversion landing page flows and exit-intent models to maximize leads." },
      { icon: "fa-share-alt", title: "Social Media Strategy", desc: "Designing structured organic posting calendars and creative assets to build community trust." },
      { icon: "fa-envelope-open-text", title: "Email Campaigns", desc: "Segmented email automation sequences and newsletters to retarget and retain customers." },
      { icon: "fa-analytics", title: "Metrics Audits", desc: "Routine performance reviews using Google Analytics 4, Tag Manager, and Search Console." }
    ],
    workflow: [
      { number: "01", title: "Analyze", desc: "Conducting in-depth competitor tracking and evaluating your current digital reach.", icon: "fa-microscope" },
      { number: "02", title: "Strategize", desc: "Defining clear target keywords, ad budgets, and creative messaging directions.", icon: "fa-route" },
      { number: "03", title: "Set Up", desc: "Configuring GA4 tracking tags, pixel metrics, and building dedicated ad landing pages.", icon: "fa-tools" },
      { number: "04", title: "Execute", desc: "Launching paid campaigns, activating organic search funnels, and dispatching ad creatives.", icon: "fa-paper-plane" },
      { number: "05", title: "Optimize", desc: "A/B testing ad headlines, adjusting keyword bidding, and scaling winning setups.", icon: "fa-sync-alt" },
      { number: "06", title: "Report", desc: "Providing granular weekly conversion, traffic source, and ROI breakdowns.", icon: "fa-chart-line" }
    ],
    tools: ["Google Analytics 4", "Google Ads", "Meta Ads Manager", "Google Search Console", "Ahrefs", "Semrush", "Tag Manager", "Mailchimp", "Figma"],
    whyChooseUs: [
      { icon: "fa-bullseye", title: "Targeted Audience", desc: "We focus on warm, high-intent audiences rather than wasting budgets on general views." },
      { icon: "fa-percentage", title: "Conversion Focus", desc: "Every campaign is optimized around a low cost-per-acquisition (CPA) and maximum conversions." },
      { icon: "fa-history", title: "Routine A/B Testing", desc: "We constantly test graphics, text overlays, and landing page elements to scale quality." },
      { icon: "fa-file-invoice-dollar", title: "Transparent Audits", desc: "Get direct, honest access to real spending logs and campaign conversion returns." }
    ],
    outcomes: [
      { title: "Increased Organic Traffic", metric: "Designed to improve", desc: "Ranks your business for high-volume keywords, generating persistent monthly search views.", icon: "fa-chart-line" },
      { title: "Lower Cost Per Acquisition", metric: "Typical project goal", desc: "Reduces your average cost to convert a new customer through stricter targeting metrics.", icon: "fa-wallet" },
      { title: "Verified Lead Pipelines", metric: "Target outcome", desc: "Maintains a steady flow of qualified business queries directly into your sales team inbox.", icon: "fa-envelope" }
    ],
    faqs: [
      { q: "What advertising channels do you specialize in?", a: "We specialize in Google Search, Display, Shopping, and YouTube Ads, as well as Meta Ads (Facebook & Instagram) and LinkedIn B2B campaigns." },
      { q: "How long before we start seeing organic SEO results?", a: "Organic SEO is a gradual process. While technical fixes show search improvements within weeks, major authority scaling and high-intent rankings typically take 3 to 6 months of persistent optimization." },
      { q: "Do you create the ad creatives and graphics?", a: "Yes, our product design and media teams design high-converting visual banners, overlay cards, and write all copywriting for the ads." }
    ],
    portfolio: [
      { title: "Sri Gnana Sai Baba Mandir", desc: "Expanded web reach, local SEO profiles, and social media trust vectors.", category: "Social Campaign", img: "/img/portfolio pics/srignanasaibabamandir.com_.png", link: "https://srignanasaibabamandir.com/" },
      { title: "Digital Ghuru Academy", desc: "Optimized paid ads campaign and lead capture flows to scale student admissions.", category: "Lead Gen", img: "/img/portfolio pics/digitalghru.png", link: "https://digitalghuru.in/" },
      { title: "Miniso Retail Ads", desc: "Targeted digital marketing campaign driving foot traffic and e-commerce conversions.", category: "Marketing", img: "/img/portfolio pics/mini so.png", link: "#" },
      { title: "Blessence Marketing Campaign", desc: "Social media marketing, targeted organic growth, and product launch funnel.", category: "Marketing", img: "/img/portfolio pics/blessence.png", link: "#" },
      { title: "Newsghuru Tamil SEO", desc: "Search engine optimization audit yielding massive organic search volume gains.", category: "Media Growth", img: "/img/portfolio pics/newsghuru.in_.png", link: "https://newsghuru.in/" },
      { title: "Newsghuru English SEO", desc: "Comprehensive on-page and off-page SEO strategy targeting international readers.", category: "Media Growth", img: "/img/portfolio pics/www.newsghuru.com_.png", link: "https://www.newsghuru.com/" }
    ]
  },
  "product-design": {
    id: "product-design",
    title: "Product Design Built for Clarity and Conversion",
    eyebrow: "Product Design",
    tagline: "Stunning user interfaces and deeply researched user experiences designed to align with user needs and simplify system controls.",
    heroVisualType: "design",
    overview: {
      title: "Shape How Users Interact with Your Product",
      paragraphs: [
        "Great design is not just how a system looks, but how effortlessly it operates. Tech Ghuru designs digital interfaces that make complex data structures feel natural and pleasant to navigate.",
        "We map out custom user journeys, construct atomic design libraries, and deliver high-fidelity interactive Figma prototypes that validate visual ideas prior to starting expensive backend coding passes."
      ],
      metric: {
        value: "+85% Usability",
        label: "Typical improvement in system task completion speeds for optimized layouts."
      }
    },
    features: [
      { icon: "fa-pen-nib", title: "Figma Prototyping", desc: "High-fidelity, interactive prototypes that demonstrate click pathways, menu structures, and animations." },
      { icon: "fa-users-cog", title: "UX Research", desc: "Studying user behavior patterns, compiling user personas, and executing layout usability tests." },
      { icon: "fa-sitemap", title: "User Flows & Sitemaps", desc: "Constructing logical layout structures to ensure clients complete checkout or signups with minimal clicks." },
      { icon: "fa-palette", title: "Design Systems", desc: "Establishing strict typography rules, reusable brand palettes, and component states for developers." },
      { icon: "fa-layer-group", title: "Atomic Design Principles", desc: "Modular interface building blocks ensuring consistency across web, dashboard, and mobile viewports." },
      { icon: "fa-exchange-alt", title: "Developer Hand-off", desc: "Clean layout specs, vector image structures, and CSS design tokens packaged for rapid code conversion." }
    ],
    workflow: [
      { number: "01", title: "Empathize", desc: "Interviewing stakeholders and collecting target audience behavior statistics.", icon: "fa-user-friends" },
      { number: "02", title: "Define", desc: "Structuring system requirements, core modules, and primary user objectives.", icon: "fa-bullseye" },
      { number: "03", title: "Ideate", desc: "Sketching quick wireframe options and reviewing dashboard layout directions.", icon: "fa-lightbulb" },
      { number: "04", title: "Prototype", desc: "Designing high-fidelity UI visual components and connecting interactive actions.", icon: "fa-desktop" },
      { number: "05", title: "Test", desc: "Testing interface click-paths with real users to flag layout friction areas.", icon: "fa-stethoscope" },
      { number: "06", title: "Deliver", desc: "Handing over structured Figma components and assets directly to developers.", icon: "fa-check-circle" }
    ],
    tools: ["Figma", "FigJam", "Adobe Photoshop", "Adobe Illustrator", "Design Systems", "Prototyping Tools", "Typography Systems"],
    whyChooseUs: [
      { icon: "fa-eye", title: "Visual Rigor", desc: "We craft clean, premium layouts utilizing precise grid alignments and modern color theory." },
      { icon: "fa-search-plus", title: "User-Centered Focus", desc: "Every menu placement and checkout state is mapped directly to minimize client cognitive load." },
      { icon: "fa-link", title: "Seamless Dev handoff", desc: "Our designers understand code, supplying assets inside structured CSS-style classes." },
      { icon: "fa-gem", title: "Modern Design Assets", desc: "We design brand custom icons, illustrative assets, and interactive hover feedback shapes." }
    ],
    outcomes: [
      { title: "Lower System Friction", metric: "Designed to improve", desc: "Reduces user navigation mistakes by organizing dashboard modules logically.", icon: "fa-chart-pie" },
      { title: "Accelerated Dev Hand-off", metric: "Typical project goal", desc: "Reduces front-end coding revisions by delivering strict component states in Figma.", icon: "fa-rocket" },
      { title: "Unified Brand Identity", metric: "Target outcome", desc: "Creates a consistent visual appearance across your public website, app, and newsletters.", icon: "fa-palette" }
    ],
    faqs: [
      { q: "What assets do you deliver at the end of the project?", a: "We deliver organized, editable Figma files containing atomic design components, responsive mobile/desktop UI mockups, connected interactive prototypes, and SVG asset exports." },
      { q: "Do you write front-end code for the designs?", a: "This service focuses on UI/UX research, wireframing, and design prototypes. However, our development team is ready to step in and code the designs into responsive Next.js platforms." },
      { q: "How do you ensure the design fits our brand?", a: "We build a mood board and visual style guide at the planning stage. We align on primary typography, button roundness, and brand themes before designing layout mockups." }
    ],
    portfolio: [
      { title: "Sivaji Sons Corporate Portal", desc: "Designed premium agricultural enterprise platform layout reflecting trust and legacy.", category: "UI/UX", img: "/img/portfolio pics/Sivaji sons.jpeg", link: "http://www.sivajison.com/" },
      { title: "Universal Engineering Prototypes", desc: "Designed intuitive wireframes and responsive layouts for complex engineering directories.", category: "UI/UX", img: "/img/portfolio pics/Universal Engineering.jpeg", link: "https://universalengineering.org.in/" },
      { title: "Prs Dental Care Layouts", desc: "Clean visual brand system, custom illustrations, and responsive booking pages.", category: "UI/UX", img: "/img/portfolio pics/Prs dentel.jpeg", link: "https://prsdentalcare.com/" },
      { title: "GJS Hospital Portal", desc: "User-friendly patient intake layout designed for quick access on mobile devices.", category: "UI/UX", img: "/img/portfolio pics/G.j Chid.jpeg", link: "https://gjshospitals.com/" }
    ]
  },
  "video-ads": {
    id: "video-ads",
    title: "Video Ads & Editing Built for High Engagement",
    eyebrow: "Video Ads & Editing",
    tagline: "High-impact video ads, promotional reels, and corporate motion graphics designed to capture attention in the first three seconds.",
    heroVisualType: "video",
    overview: {
      title: "Visual Storytelling that Drives Social Media Traction",
      paragraphs: [
        "Video is the most consumed format across the web. Tech Ghuru creates professional video ads, corporate explainers, and engaging social reels that highlight your product values instantly.",
        "We structure the edits, apply professional color grading, mix precise sound effects, and design custom motion graphic overlays to deliver high-converting social campaigns."
      ],
      metric: {
        value: "3x Engagement",
        label: "Typical lift in click-through rates when deploying optimized motion assets over static posts."
      }
    },
    features: [
      { icon: "fa-film", title: "Video Ads", desc: "High-converting short ad spots designed specifically for Meta, YouTube, and TikTok formats." },
      { icon: "fa-magic", title: "Motion Graphics", desc: "Custom designed visual overlays, animated typography, and intro/outro logo cards." },
      { icon: "fa-music", title: "Sound Design", desc: "Mixing precise background tracks, sound effects, and volume levels for maximum impact." },
      { icon: "fa-sliders-h", title: "Color Grading", desc: "Professional color matching, style grading, and contrast settings using DaVinci Resolve." },
      { icon: "fa-closed-captioning", title: "Caption Typography", desc: "Sleek, readable dynamic captions to ensure ad retention even when muted." },
      { icon: "fa-video", title: "Asset Packaging", desc: "Formatting deliverables in multiple aspect ratios (9:16 vertical, 16:9 widescreen, 1:1 square)." }
    ],
    workflow: [
      { number: "01", title: "Script & Storyboard", desc: "Writing the ad hooks, dialog outlines, and pacing structure of each frame.", icon: "fa-edit" },
      { number: "02", title: "Assemble", desc: "Selecting the best raw video clips and arranging them on the editor timeline.", icon: "fa-layer-group" },
      { number: "03", title: "Animate", desc: "Adding custom text animations, logo intros, and layout transitions.", icon: "fa-play" },
      { number: "04", title: "Audio & Effects", desc: "Layering background audio, applying voiceovers, and dynamic sound effects.", icon: "fa-volume-up" },
      { number: "05", title: "Color Grade", desc: "Grading raw clips to match your brand color palette and visual tone.", icon: "fa-paint-brush" },
      { number: "06", title: "Export", desc: "Rendering final assets in high-definition formats optimized for social networks.", icon: "fa-check-circle" }
    ],
    tools: ["Adobe Premiere Pro", "Adobe After Effects", "DaVinci Resolve", "Adobe Photoshop", "Adobe Audition", "CapCut Pro", "Motion Graphics libraries"],
    whyChooseUs: [
      { icon: "fa-bolt", title: "First 3s Retention", desc: "We write video hooks specifically designed to stop users from scrolling past your ads." },
      { icon: "fa-compress-arrows-alt", title: "Multi-Format Exports", desc: "Get ad files optimized for widescreen YouTube spots, vertical reels, and square feeds." },
      { icon: "fa-compact-disc", title: "Dynamic Sound Mix", desc: "We implement premium audio effects to build a cinematic feel that holds attention." },
      { icon: "fa-film", title: "Custom Overlays", desc: "We never use generic templates; every graphic is custom designed to match your brand." }
    ],
    outcomes: [
      { title: "Higher Video Retention", metric: "Designed to improve", desc: "Keeps users watching longer by utilizing dynamic subtitle effects and pacing edits.", icon: "fa-hourglass-half" },
      { title: "Increased Click Rates", metric: "Typical project goal", desc: "Clear call-to-action cards at the end of the video drive viewers directly to your landing pages.", icon: "fa-mouse-pointer" },
      { title: "Professional Video Assets", metric: "Target outcome", desc: "Supplies a library of high-end promotional videos for websites, ads, and presentations.", icon: "fa-video" }
    ],
    faqs: [
      { q: "What aspect ratios do you deliver?", a: "We deliver three standard formats: 9:16 vertical (for Instagram Reels, TikTok, YouTube Shorts), 16:9 widescreen (for YouTube, websites, TV screens), and 1:1 square (for Facebook/Instagram feeds)." },
      { q: "Do you supply the background music and voiceover?", a: "Yes, we handle sourcing license-free premium audio tracks and can configure high-quality AI or professional human voiceovers based on your script direction." },
      { q: "How many edits/revisions do we get?", a: "We include 2 rounds of structural changes at the rough-cut stage, and 1 final round of minor revisions (such as typography corrections or swap clips) to ensure satisfaction." }
    ],
    portfolio: [
      { title: "Blessence Brand Spot", desc: "Elegant lifestyle branding video detailing natural ingredient formulation.", category: "Promo Spot", img: "/img/portfolio pics/blessence.png", link: "#" },
      { title: "Miniso Promo Reels", desc: "Dynamic video advertisements highlighting store layouts and custom products.", category: "Social Reel", img: "/img/portfolio pics/mini so.png", link: "#" },
      { title: "Sivaji Sons Corporate Video", desc: "Corporate storytelling video explaining legacy and operational reach.", category: "Corporate Film", img: "/img/portfolio pics/Sivaji sons.jpeg", link: "http://www.sivajison.com/" }
    ]
  },
  "content-writing": {
    id: "content-writing",
    title: "Content Writing Built for SEO and Authority",
    eyebrow: "Content Writing",
    tagline: "High-value articles, technical blog writing, and landing page copy written to rank on Google and establish industry leadership.",
    heroVisualType: "content",
    overview: {
      title: "Content that Ranks on Search and Earns Reader Trust",
      paragraphs: [
        "Search engines reward original, valuable content. Tech Ghuru writes articles and website copy that solve actual user questions, rather than just filling pages with generic paragraphs.",
        "We research keywords, compile search intent briefs, outline headings logically, and edit copy to make it clear, engaging, and fully optimized for digital search indexing systems."
      ],
      metric: {
        value: "+120% Keyword Reach",
        label: "Typical increase in organic ranking terms with a structured content strategy."
      }
    },
    features: [
      { icon: "fa-keyboard", title: "SEO Blog Articles", desc: "Engaging blog writing optimized around primary, secondary, and long-tail target keywords." },
      { icon: "fa-bullseye", title: "Copywriting", desc: "Persuasive landing page sales copy written to drive button clicks and account signups." },
      { icon: "fa-feather-alt", title: "Technical Writing", desc: "Translating complex code structures, APIs, or business audits into clear reader manuals." },
      { icon: "fa-newspaper", title: "Press Releases", desc: "Professional corporate announcements structured for distribution to industry media sites." },
      { icon: "fa-search", title: "Keyword Optimization", desc: "Integrating natural keyword counts, proper alt tags, and logical heading hierarchies." },
      { icon: "fa-check-double", title: "Proofreading & Editing", desc: "Strict quality checks to guarantee correct grammar, brand voice alignment, and zero plagiarism." }
    ],
    workflow: [
      { number: "01", title: "Keyword Research", desc: "Finding high-volume, low-difficulty search queries that match user search intent.", icon: "fa-search" },
      { number: "02", title: "Intent Briefing", desc: "Outlining heading structures, target article length, and primary user callouts.", icon: "fa-file-alt" },
      { number: "03", title: "Drafting", desc: "Writing engaging, readable body copy that naturally answers search queries.", icon: "fa-pen" },
      { number: "04", title: "SEO Check", desc: "Auditing keyword density, image alt structures, and internal page link placements.", icon: "fa-check" },
      { number: "05", title: "Review", desc: "Collaborating with stakeholders to adjust brand voice tone and terminology.", icon: "fa-glasses" },
      { number: "06", title: "Publishing", desc: "Formatting content directly into your CMS with metadata tags active.", icon: "fa-cloud-upload-alt" }
    ],
    tools: ["Google Docs", "Surfer SEO", "Ahrefs", "Semrush", "Grammarly Pro", "Copyscape", "WordPress / CMS platforms"],
    whyChooseUs: [
      { icon: "fa-brain", title: "Human Writers", desc: "We write authentic, researched content that offers real value, avoiding generic AI-generated copy." },
      { icon: "fa-chart-line", title: "SEO Frameworks", desc: "Our writers structure paragraphs and headings specifically to win Google Featured Snippets." },
      { icon: "fa-book-open", title: "Industry Specialization", desc: "We match writers to your specific field (technology, health, finance) for vocabulary accuracy." },
      { icon: "fa-clipboard-check", title: "Plagiarism Free", desc: "Every draft is verified with premium checks to guarantee original publications." }
    ],
    outcomes: [
      { title: "Organic Keyword Rankings", metric: "Designed to improve", desc: "Positions your blog articles on the first page of Google search queries.", icon: "fa-search" },
      { title: "Longer Session Duration", metric: "Typical project goal", desc: "Encourages visitors to read longer by providing engaging, clearly formatted lists and sections.", icon: "fa-clock" },
      { title: "Stronger Brand Authority", metric: "Target outcome", desc: "Builds customer trust by positioning your company as an expert resource in your industry.", icon: "fa-award" }
    ],
    faqs: [
      { q: "Do you publish the content to our CMS?", a: "Yes, we can directly format and upload drafts to your CMS platform (WordPress, Webflow, custom databases), including configuring metadata descriptions and featured images." },
      { q: "Is the content written by humans?", a: "Yes, all our content is written by human copywriters and subject-matter experts. We do not use automated generators, which helps protect your site from Google spam penalties." },
      { q: "What is your review and revision policy?", a: "We want you to love the copy! We offer 2 rounds of modifications on all drafts, allowing you to fine-tune phrasing, technical claims, or brand tone adjustments." }
    ],
    portfolio: [
      { title: "News Ghuru Articles", desc: "Written SEO-optimized tech trends and lifestyle articles with structured layouts.", category: "SEO Writing", img: "/img/portfolio pics/newsghuru.in_.png", link: "https://newsghuru.in/" },
      { title: "Universal Engineering Case Study", desc: "Detailed technical showcase document detailing custom industrial builds.", category: "Technical Copy", img: "/img/portfolio pics/Universal Engineering.jpeg", link: "https://universalengineering.org.in/" },
      { title: "Digital Ghuru Academy Copy", desc: "Engaging promotional copy, headlines, and landing page materials.", category: "Copywriting", img: "/img/portfolio pics/digitalghru.png", link: "https://digitalghuru.in/" },
      { title: "Health Ghuru Blog Posts", desc: "Authentic, high-value health and wellness blog posts optimized for target keywords.", category: "SEO Writing", img: "/img/portfolio pics/yoga.png", link: "https://healthghuru.com/" }
    ]
  },
  "consultation": {
    id: "consultation",
    title: "Business Consultation Built for Strategy and Growth",
    eyebrow: "Consultation",
    tagline: "Comprehensive technology audits, digital roadmaps, and business strategies designed to optimize operations and scale tech setups.",
    heroVisualType: "consultation",
    overview: {
      title: "Align Your Technology with Your Business Objectives",
      paragraphs: [
        "Using the wrong software stack can limit company growth. Tech Ghuru conducts deep technology audits to identify operational bottlenecks and scale database setups.",
        "We draft clear system maps, evaluate hosting costs, design digital transformation strategies, and provide expert guidance to prepare your platforms for future traffic surges."
      ],
      metric: {
        value: "-30% Hosting Costs",
        label: "Typical server cost reduction targeted via stack optimization strategies."
      }
    },
    features: [
      { icon: "fa-search", title: "Technology Audits", desc: "In-depth review of your current databases, servers, code frameworks, and third-party API configurations." },
      { icon: "fa-project-diagram", title: "Architecture Design", desc: "Drafting high-performance system topologies to prevent downtime during traffic spikes." },
      { icon: "fa-chart-line", title: "Growth Roadmapping", desc: "Setting clear step-by-step technological timelines to align development with business milestones." },
      { icon: "fa-shield-virus", title: "Security Reviews", desc: "Auditing data leaks, firewall parameters, role-based controls, and encryption keys." },
      { icon: "fa-coins", title: "Cost Optimization", desc: "Reviewing cloud hosting budgets (AWS, Vercel, GCP) and cleaning redundant server microservices." },
      { icon: "fa-handshake", title: "Strategic Advising", desc: "Regular review calls with founders and tech leads to keep development goals aligned." }
    ],
    workflow: [
      { number: "01", title: "System Discovery", desc: "Reviewing your current codebases, hosting configs, and database designs.", icon: "fa-folder-open" },
      { number: "02", title: "Identify Bottlenecks", desc: "Running load tests and tracing API response bottlenecks under stress.", icon: "fa-exclamation-triangle" },
      { number: "03", title: "Draft Strategy", desc: "Writing structural recommendations and proposing clean framework transitions.", icon: "fa-file-signature" },
      { number: "04", title: "Cost Modeling", desc: "Calculating hosting budgets and evaluating third-party subscription alternatives.", icon: "fa-calculator" },
      { number: "05", title: "Implementation Plan", desc: "Providing your engineering team with a granular, weekly coding checklist.", icon: "fa-list-ol" },
      { number: "06", title: "Milestone Audit", desc: "Verifying completed backend revisions and validating code performance metrics.", icon: "fa-check-double" }
    ],
    tools: ["System Architecture maps", "AWS Budget tools", "PostgreSQL Analyzer", "Security Audits", "Operational Roadmaps", "API stress metrics"],
    whyChooseUs: [
      { icon: "fa-user-tie", title: "Veteran Architects", desc: "Our consultants have years of experience architecting dynamic platforms for enterprise scales." },
      { icon: "fa-chart-bar", title: "Data-Backed Guidance", desc: "We base our advice on real stress tests, database diagnostics, and server logging files." },
      { icon: "fa-hand-holding-usd", title: "Hosting Cost Cuts", desc: "We specialize in finding redundant microservices to lower monthly hosting budgets." },
      { icon: "fa-file-shield", title: "Strict NDA Integrity", desc: "We execute formal confidentiality contracts before reviewing any proprietary system codes." }
    ],
    outcomes: [
      { title: "Optimized Hosting Costs", metric: "Designed to improve", desc: "Reduces cloud server spending by optimizing queries and caching assets.", icon: "fa-piggy-bank" },
      { title: "Stable System Architecture", metric: "Typical project goal", desc: "Architects a load-balanced platform capable of managing sudden user traffic spikes.", icon: "fa-network-wired" },
      { title: "Aligned Tech Roadmap", metric: "Target outcome", desc: "Supplies a step-by-step technological timeline that matches your business fundraising goals.", icon: "fa-route" }
    ],
    faqs: [
      { q: "What deliverables do we get from a technology consultation?", a: "You receive a structured PDF audit report detailing current system vulnerabilities, database bottlenecks, cloud hosting cost comparisons, and a step-by-step implementation blueprint for your dev team." },
      { q: "Do you sign Non-Disclosure Agreements (NDAs)?", a: "Yes, we sign comprehensive NDAs before checking database files, repository codes, or custom operational roadmaps to ensure your IP remains secure." },
      { q: "Can you help our developers implement the changes?", a: "Yes, our consultants provide regular alignment calls, code reviews, and can coordinate with your technical lead throughout implementation." }
    ],
    portfolio: [
      { title: "Universal Engineering Systems Audit", desc: "Audited cloud deployment patterns, securing data pipelines and cutting server bills.", category: "System Audit", img: "/img/portfolio pics/Universal Engineering.jpeg", link: "https://universalengineering.org.in/" },
      { title: "Dhara Foundations Strategy Roadmap", desc: "Designed workflow roadmap and technical structure for scaling community operations.", category: "Consulting", img: "/img/portfolio pics/dharafoundations.com_.png", link: "https://dharafoundations.com/" },
      { title: "Scissors Properties Tech Stack Consulting", desc: "Recommended framework upgrades, database structures, and server hosting setups.", category: "Consulting", img: "/img/portfolio pics/React App (2).png", link: "http://scissorsproperties.com/" },
      { title: "Sri Gnana Sai Baba Mandir Roadmap", desc: "Formulated strategy for expanding online fundraising and social donation pathways.", category: "Consulting", img: "/img/portfolio pics/srignanasaibabamandir.com_.png", link: "https://srignanasaibabamandir.com/" }
    ]
  }
};
