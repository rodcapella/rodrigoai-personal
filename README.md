# RodrigoAI — Personal Portfolio

Data Analytics Engineer - Team Leader 
Rodrigo Póvoa is a Tech Leader and Data Analytics Engineer with 15+ years of experience designing scalable data platforms, AI-native systems and leading cross-functional teams across Brazil and Europe.

---

## 🌍 Live Project

Production URL:  
👉 https://www.rpovoadata.tech

---

## 🧠 About This Project

This repository contains the personal portfolio of **Rodrigo Póvoa**, a Data Analytics Engineer and Tech Leader based in Aveiro, Portugal.

The platform is designed to communicate:

- Engineering clarity  
- Architectural thinking  
- AI-native mindset  
- Strategic problem solving  

---

### 🔍 What You’ll Find

- Professional experience and career journey  
- Personal background and mindset  
- Core technical expertise  
- AI-driven side projects (Sapiente.AI)  
- Data architecture philosophy  
- Contact channel for strategic collaborations  

---

## 🧩 Core Competences

- **Azure**
- **Databricks**  
- **PySpark**  
- **Delta Lake**  
- **SQL**  
- **Power BI**  
- **Data Governance**  
- **AI Systems**  

---

## 🏗 Tech Stack

- **Vite**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide Icons**
- **Vercel (Deployment)**

---

## 📊 Google Analytics and privacy consent

The site loads Google Analytics only after explicit visitor consent and tracks SPA route changes manually.

1. Create a GA4 web data stream for `https://www.rpovoadata.tech`.
2. In Vercel, open **Project Settings → Environment Variables**.
3. Add `VITE_GA_MEASUREMENT_ID` with the GA4 Measurement ID (`G-XXXXXXXXXX`) for Production, Preview and Development as needed.
4. Redeploy the project.
5. In GA4 Enhanced Measurement, disable automatic **Page changes based on browser history events** because pageviews are sent manually by the application.

Consent preferences can be changed from the cookie button in the lower-left corner and are explained at `/privacy`.

---

## Blog comments

Public blog comments are stored in Vercel Blob by the server-side `/api/comments` endpoint.

1. In the Vercel project, open **Storage** and create or connect a Blob store.
2. Confirm that Vercel added `BLOB_READ_WRITE_TOKEN` to the Production environment.
3. Redeploy the project so the serverless function receives the token.
4. Verify `/api/comments?slug=sem-dados-de-qualidade-nao-ha-ia-que-salve-o-negocio` returns HTTP 200 with a `comments` array.

The Blob store must use public access because published comments are public content. The read-write token remains server-side and must never use the `VITE_` prefix.

---

## 🤝 Let’s Connect

If you're building data platforms, scaling analytics or exploring AI-native systems:

👉 https://www.rpovoadata.tech/contact
