import { DatabaseIcon } from "lucide-react";
import { DEFAULT_CONFIG } from "scripts/screenshot-generator/src/config";
import type { Project } from "scripts/screenshot-generator/src/types";
import { AwsIcon } from "./components/icons/aws-icon";
import { DrizzleOrmIcon } from "./components/icons/drizzle-orm";
import { NextjsIcon } from "./components/icons/nextjs-icon";
import { NodeJsIcon } from "./components/icons/node-js-icon";
import { PrismaIcon } from "./components/icons/prisma-icon";
import { ReactIcon } from "./components/icons/react-icon";
import { StripeIcon } from "./components/icons/stripe-icon";
import { TailwindcssIcon } from "./components/icons/tailwindcss-icon";
import { TrpcIcon } from "./components/icons/trpc-icon";
import { TypescriptIcon } from "./components/icons/typescript-icon";

interface Config {
	firstName: string;
	lastName: string;
	headline: string;
	professionalSummary: string;
	location: string;

	socials: {
		linkedin: string;
		github: string;
		website: string;
	};

	projects: Project[];

	workExperience: {
		company: string;
		url?: string;
		location: string;
		position: string;
		startDate: Date;
		endDate: Date | "Present";
		bullets: string[];
	}[];

	education: {
		institution: string;
		degree: string;
		endDate: Date;
	}[];

	skills: {
		group: string;
		items: {
			name: string;
			icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
		}[];
	}[];
}

export const config: Config = {
	firstName: "Raymond",
	lastName: "Kneipp",
	headline: "Full Stack Software Engineer",
	professionalSummary:
		"Software developer with 8+ years of programming experience. Marine Corps veteran with strong discipline and collaborative skills. Currently developing a website builder platform for American Legion posts to improve their digital presence and member engagement. Deep expertise across frontend and backend, with a track record of leading technical teams, building products end to end, and shipping under real constraints.",
	location: "Cincinnati, OH",

	socials: {
		linkedin: "https://www.linkedin.com/in/raymondkneipp",
		github: "https://github.com/raymondkneipp",
		website: "https://raymondkneipp.com",
	},

	projects: [
		{
			name: "ALPost",
			liveUrl: "https://alpost.org",
			description:
				"A website builder and management platform for American Legion Posts, helping them create websites, manage events, and organize post information.",
			technologies: [
				"React",
				"Next.js",
				"TypeScript",
				"Prisma",
				"tRPC",
				"Zod",
				"NextAuth",
				"Stripe",
				"Mantine UI",
				"PostgreSQL",
			],
			cookieFile: "alpost-cookies.json",
			imagesConfig: {
				themeColor: "#1971c2",
			},
			screenshots: [
				"https://alpost.org/",
				"https://post9996oh.alpost.org/",
				"https://app.alpost.org/members",
				"https://app.alpost.org/custom-pages",
			],
			coverImage: {
				columnAngle: 20,
				screenshots: [
					"https://alpost.org/",
					"https://post9996oh.alpost.org/",
					"https://post9996oh.alpost.org/",
					"https://post9996oh.alpost.org/",
				],
			},
		},

		{
			name: "Murph Workout App",
			liveUrl: "https://murph-lugs.vercel.app",
			codeUrl: "https://github.com/raymondkneipp/murph",
			description:
				"A fitness tracker designed for the Murph workout, letting users record full or partial workouts and monitor progress over time.",
			technologies: [
				"React",
				"TypeScript",
				"Tailwind CSS",
				"TanStack Start",
				"Drizzle ORM",
				"AWS SDK (S3)",
				"Better Auth",
				"Zod",
				"Radix UI",
				"date-fns",
				"Sharp",
				"Biome",
			],
			cookieFile: "murph-cookies.json",
			imagesConfig: {
				themeColor: "#e05d38",
			},
			screenshots: [
				"https://murph-lugs.vercel.app/",
				"https://murph-lugs.vercel.app/app/feed",
				{
					url: "https://murph-lugs.vercel.app/app/new",
					steps: [
						{
							type: "click",
							role: "button",
							name: "Start Murph",
							waitAfter: 1000,
						},
						{ type: "click", text: "Skip Run", waitAfter: 1000 },
						{ type: "click", role: "button", name: "Skip", waitAfter: 1000 },
					],
				},
				"https://murph-lugs.vercel.app/app/me",
				"https://murph-lugs.vercel.app/app/settings",
			],
			coverImage: {
				columnAngle: -20,
				screenshots: [
					"https://murph-lugs.vercel.app/",
					"https://murph-lugs.vercel.app/app/feed",
					"https://murph-lugs.vercel.app/app/new",
					"https://murph-lugs.vercel.app/app/me",
					"https://murph-lugs.vercel.app/app/settings",
					"https://murph-lugs.vercel.app/",
				],
			},
		},
		{
			name: "Bio Read",
			liveUrl: "https://bio-read.netlify.app",
			codeUrl: "https://github.com/raymondkneipp/bio-read",
			description:
				"A reading companion that stores all data locally, lets users customize reading settings, and supports dyslexic fonts, RSVP reading, and text-to-speech.",
			technologies: [
				"Vite",
				"React",
				"TypeScript",
				"Tailwind CSS",
				"Radix UI",
				"IndexedDB",
				"Zod",
				"React Compiler",
			],
			imagesConfig: {
				colorScheme: "dark",
				themeColor: "#6e56cf",
			},
			screenshots: [
				"https://bio-read.netlify.app/",
				{
					url: "https://bio-read.netlify.app/",
					steps: [{ type: "click", text: "Start Reading", waitAfter: 1000 }],
				},
				{
					url: "https://bio-read.netlify.app/",
					steps: [
						{ type: "click", text: "Start Reading", waitAfter: 1000 },
						{ type: "click", ariaLabel: "settings", waitAfter: 1000 },
						{ type: "click", role: "tab", name: "Reading", waitAfter: 1000 },
						{
							type: "click",
							role: "switch",
							name: "RSVP Reading",
							waitAfter: 1000,
						},
					],
				},
			],
			coverImage: {
				columnAngle: -20,
				screenshots: [
					"https://bio-read.netlify.app/",
					{
						url: "https://bio-read.netlify.app/",
						steps: [{ type: "click", text: "Start Reading", waitAfter: 1000 }],
					},
					"https://bio-read.netlify.app/",
					{
						url: "https://bio-read.netlify.app/",
						steps: [
							{ type: "click", ariaLabel: "settings", waitAfter: 1000 },
							{ type: "click", role: "tab", name: "Reading", waitAfter: 1000 },
							{
								type: "click",
								role: "switch",
								name: "RSVP Reading",
								waitAfter: 1000,
							},
						],
					},
				],
			},
		},
		{
			name: "Als Sweeper Sales",
			liveUrl: "https://www.alssweepersales.com",
			codeUrl: "https://github.com/raymondkneipp/alssweeper",
			description:
				"An e-commerce site built for a local sweeper repair and sales shop, featuring product listings, online orders, and contact options.",
			technologies: [
				"Next.js",
				"React",
				"TypeScript",
				"Tailwind CSS",
				"Redux Toolkit",
				"React Redux",
				"React Hook Form",
				"Commerce.js",
				"SendGrid Mail API",
			],
			imagesConfig: {
				themeColor: "#d9b111",
			},
			screenshots: [
				"https://www.alssweepersales.com/",
				"https://www.alssweepersales.com/about",
				"https://www.alssweepersales.com/services",
			],
			coverImage: {
				columnAngle: -20,
				screenshots: [
					"https://www.alssweepersales.com/",
					"https://www.alssweepersales.com/about",
					"https://www.alssweepersales.com/services",
					"https://www.alssweepersales.com/",
				],
			},
		},
		{
			name: "EAA Chapter 174",
			liveUrl: "https://eaachapter174.vercel.app",
			codeUrl: "https://github.com/raymondkneipp/eaachapter174",
			description:
				"A modern website built for a local Experimental Aircraft Association chapter to share news, events, and membership information.",
			technologies: [
				"Next.js",
				"React",
				"Tailwind CSS",
				"React Hook Form",
				"Next SEO",
				"TypeScript",
			],
			imagesConfig: {
				themeColor: "#6366f1",
			},
			screenshots: [
				"https://eaachapter174.vercel.app/",
				"https://eaachapter174.vercel.app/about",
				"https://eaachapter174.vercel.app/young-eagles",
				"https://eaachapter174.vercel.app/newsletters",
			],
			coverImage: {
				columnAngle: 20,
				screenshots: [
					"https://eaachapter174.vercel.app/",
					"https://eaachapter174.vercel.app/about",
					"https://eaachapter174.vercel.app/young-eagles",
					"https://eaachapter174.vercel.app/newsletters",
				],
			},
		},
		{
			name: "Beauty Bratz",
			liveUrl: "https://beauty-bratz.netlify.app",
			codeUrl: "https://github.com/raymondkneipp/beauty-bratz",
			description:
				"A stylish website for a local salon and wig specialist, highlighting services and providing contact information.",
			technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
			imagesConfig: {
				themeColor: "#000000",
			},
			screenshots: [
				"https://beauty-bratz.netlify.app/",
				"https://beauty-bratz.netlify.app/about",
				"https://beauty-bratz.netlify.app/services",
				"https://beauty-bratz.netlify.app/contact",
			],
			coverImage: {
				columnAngle: 20,
				screenshots: [
					"https://beauty-bratz.netlify.app/contact",
					{
						url: "https://beauty-bratz.netlify.app/",
						crop: {
							x: 0,
							y: 0,
							width: DEFAULT_CONFIG.viewport.width,
							height: DEFAULT_CONFIG.viewport.height * 2,
						},
					},
					"https://beauty-bratz.netlify.app/about",
				],
			},
		},
		{
			name: "Sherdec",
			liveUrl: "https://sherdec.vercel.app",
			codeUrl: "https://github.com/raymondkneipp/sherdec",
			description:
				"A concept website designed for a local tree service company, focusing on clean presentation and approachable service information.",
			technologies: [
				"Next.js",
				"React",
				"JavaScript",
				"Tailwind CSS",
				"DaisyUI",
				"CSSNano",
			],
			imagesConfig: {
				themeColor: "#66cc8a",
			},
			screenshots: [
				"https://sherdec.vercel.app/",
				"https://sherdec.vercel.app/about",
				"https://sherdec.vercel.app/services",
				"https://sherdec.vercel.app/estimate",
				"https://sherdec.vercel.app/seasonal-care",
				"https://sherdec.vercel.app/insects",
			],
			coverImage: {
				columnAngle: 20,
				screenshots: [
					"https://sherdec.vercel.app/health-maintenance",
					"https://sherdec.vercel.app/about",
					"https://sherdec.vercel.app/services",
					"https://sherdec.vercel.app/",
					"https://sherdec.vercel.app/estimate",
					"https://sherdec.vercel.app/seasonal-care",
					"https://sherdec.vercel.app/insects",
				],
			},
		},
	],

	workExperience: [
		{
			company: "ALPost",
			url: "https://alpost.org",
			location: "Cincinnati, OH (Remote)",
			position: "Founder and Software Developer",
			startDate: new Date("2022-06-01"),
			endDate: "Present",
			bullets: [
				"Took ALPost from zero to market, converted 19 of 90+ outreached American Legion Posts into paying customers (~21% close rate) and secured an official partnership with American Legion Headquarters",
				"Frontend: Built a multi-tenant website builder using Next.js, React, and TypeScript, enabling posts to manage mobile-friendly public-facing sites without technical knowledge",
				"Backend: Engineered API and data layer with tRPC, Prisma, and PostgreSQL; integrated Stripe for subscription billing; deployed on Vercel with Cloudflare R2 storage and GitHub Actions CI/CD",
			],
		},
		{
			company: "Zoee",
			url: "https://zoee.com",
			location: "Durham, NC (Remote)",
			position: "Lead Software Developer",
			startDate: new Date("2023-06-01"),
			endDate: new Date("2025-05-01"),
			bullets: [
				"Designed and iterated a structured technical interview process across 3 intern cohorts, evaluating 8–12 candidates per round; mentored interns through onboarding and day-to-day engineering work",
				"Frontend: Led SSR rewrite using React Router and Vite, achieving 3x faster builds and improved SEO; built a coach marketplace with advanced filtering and paginated search, creating a new commission-based revenue stream",
				"Backend: Provisioned AWS infrastructure with Lambda, Aurora MySQL, and CloudFormation; resolved a calendar sync bug affecting appointment management and preventing ongoing revenue loss",
				"Collaborated directly with the product manager and designer to scope and ship features, translating specs and business requirements into engineering deliverables",
			],
		},
		{
			company: "U.S. Marine Corps",
			location: "Cincinnati, OH",
			position: "Digital Wideband Systems Maintainer",
			startDate: new Date("2018-10-01"),
			endDate: new Date("2025-05-01"),
			bullets: [
				"Awarded Navy Achievement Medal (2021, 2024) for maintaining satellite communications systems enabling 1,800+ hours of connectivity, saving $27,000+ in generator repairs, and leading site establishment during multiple exercises across different bases in Bahrain, ensuring 100% operational readiness",
				"Served as Lead Software Developer at Zoee through a military deployment, continuing to deliver production software, demonstrating reliability and self-management across concurrent full-time responsibilities",
				"Devised standardized deployment templates and developed infrastructure establishment plans, reducing setup time to 72 hours",
			],
		},
		{
			company: "Self-Employed",
			url: "",
			location: "Cincinnati, OH",
			position: "Freelance Software Developer",
			startDate: new Date("2014-01-01"),
			endDate: new Date("2020-01-01"),
			bullets: [
				"Shipped 8+ client projects including e-commerce stores, lead-generation sites, and internal dashboards using React, Next.js, TypeScript, and Node.js",
				"Modernized legacy LAMP stack applications with SSR and responsive, mobile-first designs for small businesses across multiple industries",
			],
		},
	],

	education: [
		{
			institution: "Western Governors University",
			degree: "Bachelor's in Computer Science",
			endDate: new Date("2026-07-31"),
		},
		{
			institution: "LEARN Academy",
			degree: "Full Stack Developer Bootcamp",
			endDate: new Date("2023-06-01"),
		},
		// {
		// 	institution: "Linux Professional Institute",
		// 	degree: "Linux Essentials Certification",
		// 	endDate: new Date("2026-02-03"),
		// },
	],

	skills: [
		{
			group: "Frontend",
			items: [
				{ name: "TypeScript", icon: TypescriptIcon },
				{ name: "React", icon: ReactIcon },
				{ name: "Next.js", icon: NextjsIcon },
				{ name: "TailwindCSS", icon: TailwindcssIcon },
			],
		},
		{
			group: "Backend",
			items: [
				{ name: "Node.js", icon: NodeJsIcon },
				{ name: "tRPC", icon: TrpcIcon },
				{ name: "PostgreSQL", icon: DatabaseIcon },
				{ name: "Prisma", icon: PrismaIcon },
				{ name: "Drizzle ORM", icon: DrizzleOrmIcon },
				{ name: "Stripe", icon: StripeIcon },
				{ name: "AWS", icon: AwsIcon },
			],
		},
	],
};
