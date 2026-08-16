/**
 * Hand-written descriptions, keyed by repo name.
 *
 * These are DRAFTS inferred from each repo's name and detected languages —
 * the READMEs are stock framework boilerplate, so nothing here describes
 * features that were verified in the code. Edit freely; anything you correct
 * here shows up on the site immediately.
 *
 * Precedence on the projects page:
 *   Sanity description  >  this file  >  GitHub's repo description
 *
 * Keys are normalised (lowercase, letters and digits only), so "job-board",
 * "job_board" and "Job Board" all resolve to the same entry.
 */

export const projectDescriptions: Record<string, string> = {
  // ---- ERP / business systems (Laravel + Blade) ----
  tgif: "Enterprise resource planning system built with Laravel, covering the operational workflows of a business in one integrated application.",
  erpprojectmanagement:
    "Project management module for an ERP suite — tracks projects, tasks and progress across teams, built on Laravel with Blade templating.",
  erpecommerce:
    "E-commerce module of an ERP system, handling product catalogue, orders and storefront flows on a Laravel backend.",
  procurement:
    "Procurement management system for handling purchase requests, supplier records and approval workflows, built with Laravel.",
  miniprocurementsystem:
    "A lightweight take on procurement management — purchase requests and approvals, stripped back to the essentials.",
  salesmodule:
    "Sales module for an ERP platform, covering order entry, customer records and sales reporting.",
  hr: "Human resources module handling employee records, and the administrative workflows that surround them, built with Laravel.",
  loan: "Loan management application for tracking loan applications, repayment schedules and borrower records.",
  clearance:
    "Clearance processing system that moves requests through multi-step departmental sign-off, with a Python component alongside the web frontend.",
  module:
    "A self-contained Laravel module built to slot into a larger ERP system, with its own routes, models and Blade views.",

  // ---- Academic / institutional web apps ----
  researchrepositorymanagementsystem:
    "Digital repository for academic research — submission, cataloguing and retrieval of papers, built with Laravel and Blade.",
  scholarmatch:
    "Web application for matching students to scholarship opportunities based on their profile and eligibility.",
  lostandfound:
    "Lost-and-found platform where users can post found items and search for things they have lost.",
  jobboard:
    "Job board where employers post openings and candidates browse and apply. Built on a Node.js and MongoDB backend with a React frontend.",

  // ---- Machine learning ----
  tbdetectiondensenet:
    "Tuberculosis detection from chest X-ray images using a DenseNet convolutional neural network.",
  detection:
    "Image detection experiment applying convolutional neural networks to automated classification of medical scans.",

  // ---- Study tools ----
  allforreview:
    "All-in-one reviewer app for study and exam preparation, built with TypeScript and Python tooling.",
  reviewer: "An earlier iteration of the all-in-one reviewer study application.",

  // ---- Web / frontend ----
  geometrydash:
    "Browser recreation of the Geometry Dash arcade game, written in vanilla JavaScript with HTML canvas.",
  nuxtecommerce: "E-commerce storefront built on the Nuxt framework.",
  portfolioblog:
    "This site — a portfolio and blog built with Next.js, TypeScript and Tailwind CSS, with content managed through Sanity as a headless CMS.",
  nextjsportfolioblogwithcms:
    "Portfolio and blog powered by Next.js with a headless CMS for content management.",

  // ---- Learning / scratch repos ----
  adb: "Coursework exploring Laravel's database layer — migrations, Eloquent relationships and query building.",
  project: "A Next.js practice project for experimenting with the App Router.",
  ianproject: "An early practice project from learning to build web applications.",
  ianfalcu: "Dashboard application built while working through the Next.js App Router course.",
  nextjs: "Sandbox repo for learning the Next.js framework.",
  next: "Scratch project for trying out Next.js features with TypeScript.",
};

/** Lowercase, letters and digits only — so naming style never breaks a lookup. */
export function normaliseRepoKey(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function describeProject(repoName: string): string | undefined {
  return projectDescriptions[normaliseRepoKey(repoName)];
}
