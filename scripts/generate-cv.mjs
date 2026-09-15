// Generates an ATS-friendly (Applicant Tracking System) resume PDF.
//
// ATS rules followed on purpose:
// - Single column, no tables/text boxes/images/icons
// - Standard font (Helvetica), standard section headings
// - Contact info lives in the body text, not a header/footer
// - Plain "-" bullets, reverse-chronological order
//
// Run with: npm run generate:cv
import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "Daniel-De-Torres-CV.pdf");

const contact = {
  name: "Daniel De Torres",
  title: "Web & Mobile Developer",
  location: "Pansol, Calamba City, Laguna, Philippines",
  phone: "+63 924 367 2984",
  email: "danieldetorres.info@gmail.com",
  linkedin: "linkedin.com/in/daniel-de-torres-10a021222",
  github: "github.com/dangrishh",
};

const summary =
  "Web and Mobile Developer with 3+ years of experience building responsive, high-performing web and mobile applications. Skilled in the MERN stack with TypeScript, React Native, Next.js, and AWS Cloud. Experienced delivering scalable, secure solutions for clients in the Philippines and Australia.";

const skills = [
  ["Frontend", "React.js, Next.js, React Native, TypeScript, JavaScript, HTML, CSS"],
  ["Backend", "Node.js, Express.js, NestJS, PHP, Python, REST APIs"],
  ["Databases", "MongoDB, PostgreSQL, MySQL, Firebase, DynamoDB"],
  ["Cloud & DevOps", "AWS (EC2, S3, Lambda, Amazon Connect), CI/CD, Hostinger, Heroku"],
  ["Tools", "Git, GitHub, Postman, Navicat, Figma"],
];

const experience = [
  {
    role: "Full-Stack Developer",
    company: "DOLE Region 4A",
    period: "April 2026 - Present",
    bullets: [
      "Collaborate with the development team to design, build, and ship full-stack features",
      "Maintain and test the system throughout development for stability and client readiness",
      "Serve as main point of contact, resolving issues and translating client requirements into working solutions",
      "Maintain the database with a focus on accurate, up-to-date records and documentation",
    ],
  },
  {
    role: "Cloud Developer Expert",
    company: "iCXeed Philippines Inc. (Remote)",
    period: "June 2025 - September 2025",
    bullets: [
      "Deployed Amazon Connect IVR and contact flows tailored to client requirements",
      "Managed production deployments and CI/CD integration with the DevOps team",
      "Built backend services and integrations using Node.js and Python",
      "Responded to client concerns and collaborated with the team to implement solutions",
      "Provided technical support and created documentation for systems built",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Hacienda Darasa Resort and Hotel (Hybrid)",
    period: "February 2025 - May 2025",
    bullets: [
      "Implemented business logic and optimized database performance for reliable, scalable operations",
      "Built a high-performance Android application using React Native",
      "Integrated backend systems with front-end designs for a seamless user experience",
    ],
  },
  {
    role: "Web & Mobile Developer",
    company: "Freelance, Australia & Philippines",
    period: "2024 - Present",
    bullets: [
      "Built scalable web and mobile applications using Next.js, Node.js, and React Native",
      "Researched new technology stacks and aligned with clients on technical strategy",
    ],
  },
];

const education = [
  {
    role: "BS in Information Technology",
    company: "Laguna State Polytechnic University",
    period: "2021 - 2025",
    bullets: [
      "Capstone project: Research Management Portal (ResearchTree), a research defense platform connecting students, advisers, and panels",
      "Developed real-time collaboration tools and a document review/revision workflow",
      "Tech stack: MERN Stack, TypeScript, Next.js, Angular.js, Firebase, AWS Cloud",
    ],
  },
  {
    role: "ICT Strand, Senior High School",
    company: "Saint John and Paul Sr. High School",
    period: "2018 - 2021",
    bullets: [],
  },
];

const projects = [
  ["Military Dashboard", "github.com/dangrishh/Military-Trello-Analytics"],
  ["POS System, Hacienda Darasa", "github.com/dangrishh/Hacienda-Darasa-Resort-Hotel"],
  ["Research Management Portal", "github.com/code-franklin/ResearchTree-Partial-Code"],
  ["Resort Booking (Jeremias)", "resort-jeremias.vercel.app"],
  ["PurelyGive", "purelygive.com"],
];

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 50, bottom: 50, left: 56, right: 56 },
  info: {
    Title: `${contact.name} - Resume`,
    Author: contact.name,
    Subject: `${contact.title} Resume`,
  },
});
doc.pipe(createWriteStream(outPath));

const BODY_SIZE = 10.5;
const NAME_SIZE = 20;

function sectionHeading(text) {
  doc.moveDown(0.8);
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#111111")
    .text(text.toUpperCase());
  const y = doc.y + 2;
  doc
    .moveTo(doc.page.margins.left, y)
    .lineTo(doc.page.width - doc.page.margins.right, y)
    .strokeColor("#111111")
    .lineWidth(1)
    .stroke();
  doc.moveDown(0.6);
}

function entryHeading(role, company, period) {
  const startX = doc.page.margins.left;
  const pageWidth =
    doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const y = doc.y;

  doc.font("Helvetica").fontSize(BODY_SIZE);
  const periodWidth = doc.widthOfString(period);
  const roleWidth = pageWidth - periodWidth - 16;

  doc.font("Helvetica-Bold").fontSize(BODY_SIZE + 0.5).fillColor("#111111");
  doc.text(`${role} — ${company}`, startX, y, { width: roleWidth });
  const afterRoleY = doc.y;

  doc
    .font("Helvetica")
    .fontSize(BODY_SIZE)
    .fillColor("#444444")
    .text(period, startX + pageWidth - periodWidth, y, {
      width: periodWidth,
      lineBreak: false,
    });

  // These two text() calls each left the cursor at their own position —
  // pin it back to the left margin, below the taller of the two lines,
  // so the next flowing text() call (no explicit x/y) starts correctly.
  doc.x = startX;
  doc.y = Math.max(afterRoleY, doc.y);
  doc.moveDown(0.2);
}

function bulletList(items) {
  doc.font("Helvetica").fontSize(BODY_SIZE).fillColor("#222222");
  items.forEach((item) => {
    doc.text(`-  ${item}`, {
      indent: 0,
      lineGap: 2,
    });
  });
  doc.moveDown(0.5);
}

// Header — plain text, not a graphical header/footer, so ATS parsers read it
// as normal body content.
doc.font("Helvetica-Bold").fontSize(NAME_SIZE).fillColor("#111111").text(contact.name);
doc.font("Helvetica").fontSize(BODY_SIZE + 1).fillColor("#444444").text(contact.title);
doc.moveDown(0.4);
doc
  .font("Helvetica")
  .fontSize(BODY_SIZE)
  .fillColor("#222222")
  .text(
    `${contact.location}  |  ${contact.phone}  |  ${contact.email}\n${contact.linkedin}  |  ${contact.github}`,
  );

sectionHeading("Summary");
doc.font("Helvetica").fontSize(BODY_SIZE).fillColor("#222222").text(summary, {
  lineGap: 2,
});

sectionHeading("Skills");
skills.forEach(([label, value]) => {
  doc
    .font("Helvetica-Bold")
    .fontSize(BODY_SIZE)
    .fillColor("#111111")
    .text(`${label}: `, { continued: true })
    .font("Helvetica")
    .fillColor("#222222")
    .text(value);
});

sectionHeading("Professional Experience");
experience.forEach((job, i) => {
  entryHeading(job.role, job.company, job.period);
  bulletList(job.bullets);
  if (i < experience.length - 1) doc.moveDown(0.1);
});

sectionHeading("Education");
education.forEach((item, i) => {
  entryHeading(item.role, item.company, item.period);
  if (item.bullets.length) bulletList(item.bullets);
  else doc.moveDown(0.5);
  if (i < education.length - 1) doc.moveDown(0.1);
});

sectionHeading("Projects");
projects.forEach(([name, url]) => {
  doc
    .font("Helvetica-Bold")
    .fontSize(BODY_SIZE)
    .fillColor("#111111")
    .text(`${name}: `, { continued: true })
    .font("Helvetica")
    .fillColor("#222222")
    .text(url);
});

doc.end();

doc.on("end", () => {
  console.log(`ATS-friendly CV written to ${outPath}`);
});
