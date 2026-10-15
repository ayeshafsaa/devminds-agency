# DevMinds.ai

A concept website for **DevMinds.ai**, a fictional digital and AI agency offering software development, AI automation, AI content, digital marketing and post production. Built as a frontend portfolio project.

> DevMinds.ai is a made-up company. All projects, team members, statistics and testimonials on the site are placeholders.

**Live site:** add your Netlify link here

## Pages

- **Home**: aurora hero with an AI chat demo, tech strip, stats, bento services, sticky process and featured work
- **About**: manifesto, values, journey and team
- **Services**: interactive tabs with deliverables, timelines and best-fit details for each service
- **Portfolio**: filterable project grid with case-study popups
- **Contact**: validated contact form, info cards and FAQ accordion
- **Book a Call**: meeting scheduler with calendar, time slots, call type (video, phone or WhatsApp) and Google Calendar link

## Features

- Fully responsive layout (mobile, tablet and desktop)
- Dark and light mode with saved preference
- Floating pill navbar and shared header and footer injected from one place
- Cursor spotlight and ring effect, spotlight cards, scroll reveal and counters
- Form validation with inline error messages
- Accessible tabs, accordion and modal (keyboard support, ARIA attributes)
- SEO basics: page titles, meta descriptions and semantic HTML

## Tech stack

- HTML5
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (no frameworks or build step)
- Font Awesome icons and Google Fonts (Poppins) via CDN

## Project structure

```
DevMinds/
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── contact.html
├── booking.html
├── favicon.svg
├── css/
│   └── style.css
└── js/
    └── main.js
```

## Run locally

1. Download or clone this folder.
2. Open the folder in VS Code and start it with the Live Server extension, or simply open `index.html` in a browser.

There is no installation, database or environment variable setup needed.

## Deploy

The site is static. Drag the project folder into Vercel's manual deploy area, or connect the repository to Netlify, Vercel or GitHub Pages.

## Notes

- The contact form and the booking page are frontend demos. No message or booking is sent anywhere.
- Booked slots are stored in the browser's localStorage so the demo feels real.
- Some slots are shown as already booked on purpose, to demonstrate the interface.
