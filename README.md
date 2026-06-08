# 🗺️ Dinesh Bhandari — GIS Analyst & Web Mapper CV

An interactive, fully-featured **personal CV and Web GIS portfolio** built with vanilla HTML, CSS, and JavaScript. Includes a live **pg_featureserv Dashboard** for querying and visualizing PostGIS spatial data directly inside the CV page.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=flat-square)](https://dinesh6017l.github.io/my-cv/)
[![GitHub](https://img.shields.io/badge/GitHub-dinesh6017l-181717?style=flat-square&logo=github)](https://github.com/dinesh6017l)

---

## ✨ Features

### CV & Portfolio
- 🌙 **Dark / Light theme** toggle with localStorage persistence
- ⌨️ **Typing animation** on job title
- 📊 **Animated skill bars** triggered on scroll
- 🎞️ **Staggered entrance animations** on timeline items and project cards
- 🖨️ **Print / Download** button for PDF export
- 📱 **Fully responsive** layout

### Interactive Web GIS Dashboard
- 🗺️ **Leaflet.js map** with satellite, terrain, and standard basemap switching
- 🔄 **Live GeoJSON loading** from a local or hosted **pg_featureserv** instance
- 🏔️ **Choropleth map** of Nepal districts coloured by total population
- 🎨 **Live style controls** — stroke colour, fill colour, line weight, opacity
- 🔍 **Attribute query** — select a column and filter by value (zooms to result)
- 🧮 **SQL expression query** — write full `AND / OR / = / <> / LIKE / > / <` expressions
- 📍 **Hover tooltips** — all feature attributes shown as a sticky card on hover
- 🔎 **Automatic flyToBounds** zoom animation after every filter
- ⚡ **Client-side fallback** — if the server CQL filter fails, expressions are evaluated locally

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (semantic) |
| Styling | Vanilla CSS (CSS variables, grid, animations) |
| Logic | Vanilla JavaScript (ES2020+) |
| Map | [Leaflet.js 1.9.4](https://leafletjs.com/) |
| Icons | [Font Awesome 6.5](https://fontawesome.com/) |
| Fonts | [Inter (Google Fonts)](https://fonts.google.com/specimen/Inter) |
| Spatial DB | PostgreSQL + PostGIS (local → Supabase) |
| GeoJSON API | [pg_featureserv](https://github.com/CrunchyData/pg_featureserv) |
| Hosting | Render.com (static site + Docker web service) |

---

## 📁 Project Structure

```
my-cv/
├── index.html            # Main CV page + GIS dashboard markup
├── style.css             # All styles (theme variables, layout, components)
├── script.js             # All interactivity (map, filters, SQL evaluator, animations)
├── Dockerfile            # Containerises pg_featureserv for Render deployment
├── config/
│   └── pg_featureserv.toml   # pg_featureserv server + CORS config
└── README.md
```

---

## 🚀 Local Development

### Prerequisites
- A web browser (no build step needed)
- [PostgreSQL](https://www.postgresql.org/) with PostGIS extension
- [pg_featureserv](https://github.com/CrunchyData/pg_featureserv/releases) running locally on port `9000`

### 1. Clone the repo

```bash
git clone https://github.com/dinesh6017l/my-cv.git
cd my-cv
```

### 2. Start pg_featureserv locally

```powershell
# Set your local PostGIS connection
$env:DATABASE_URL = "postgresql://postgres:password@localhost:5432/your_db_name"

# Run pg_featureserv
.\pg_featureserv.exe
```

Verify it works: open `http://localhost:9000/collections.json`

### 3. Open the CV

Just open `index.html` in your browser — no server required.

> The map section initialises when it scrolls into view. Click **Districts** or **Protected Areas** to load a layer, then use the Dashboard panel to query and style.

---

## 🌐 Deployment

Full deployment instructions (Supabase + Render.com) are in the [Deployment Guide](https://github.com/dinesh6017l/my-cv/wiki) or locally in `deployment_guide.md`.

### Quick Summary

| Step | What to do |
|------|-----------|
| **1. Supabase** | Create project → Enable PostGIS → Import your spatial tables via `pg_dump` + `psql` |
| **2. Render Web Service** | Deploy `Dockerfile` → Set `DATABASE_URL` env var → pg_featureserv serves your Supabase tables |
| **3. Update script.js** | Change `baseUrl` from `localhost:9000` to your Render service URL |
| **4. Render Static Site** | Connect GitHub repo → publish directory `.` → your CV is live |

### Alternative (Static only)

Host the CV on **GitHub Pages** — free, instant, no cold starts:

1. Go to your repo → **Settings** → **Pages**
2. Source: `main` branch, folder: `/ (root)`
3. Save → live at `https://dinesh6017l.github.io/my-cv/`

> Note: GitHub Pages only hosts the static CV. pg_featureserv still needs Render or a VPS.

---

## 🗄️ GIS Dashboard — How It Works

```
Browser (Leaflet)
    │
    │  GET /collections/{id}/items.json?limit=100&filter=Total > 200000&filter-lang=cql-text
    ▼
pg_featureserv  (Render Web Service)
    │
    │  SELECT ... FROM public.districts_clean_wgs84 WHERE Total > 200000
    ▼
PostGIS  (Supabase)
    │
    └─► Returns GeoJSON → Leaflet renders polygons → flyToBounds zooms → tooltips on hover
```

### Supported SQL Query Operators

| Operator | Example |
|----------|---------|
| Equal | `DISTRICT = 'Kathmandu'` |
| Not equal | `DISTRICT <> 'Kathmandu'` |
| Greater than | `Total > 200000` |
| Less than | `Total < 50000` |
| Greater or equal | `Total >= 100000` |
| Less or equal | `Total <= 300000` |
| LIKE (contains) | `DISTRICT LIKE '%pur%'` |
| AND | `Total > 100000 AND PROVINCE = 'Bagmati'` |
| OR | `Total < 50000 OR Total > 700000` |

---

## 📬 Contact

| Channel | Link |
|---------|------|
| Email | bhandaridinesh2020@gmail.com |
| Phone | +977 9860248197 |
| LinkedIn | [linkedin.com/in/dineshbhandari](https://linkedin.com/in/dineshbhandari) |
| GitHub | [github.com/dinesh6017l](https://github.com/dinesh6017l) |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
