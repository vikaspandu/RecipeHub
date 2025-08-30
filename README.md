# RecipeHub — Recipe Ideas (Take‑Home Challenge)

**Project summary**

RecipeHub is a responsive React application that helps users discover recipes by ingredient and save favourites. It uses TheMealDB public APIs (no auth required) and follows a clean, component-based structure with Tailwind CSS for styling. The UI includes a professional header, a searchable home page, skeleton shimmer loading cards, and a favourites view.

---

## Live demo

> Add your deployed link here (CodeSandbox / StackBlitz / Vercel) — e.g. `https://your-deploy-url`.

---

## Features

**MVP (implemented)**

* Search recipes by ingredient (e.g. `chicken`, `tomato`) using TheMealDB `filter.php?i=` endpoint.
* Show initial random recipes on first load using `random.php` (multiple requests to fill the grid).
* Responsive grid of recipe cards (mobile → 1 column, tablet → 2, desktop → 3–4).
* Professional Header with brand, Home link, Search icon (UI), and Favourites badge that updates live.
* Add / Remove favourites directly on the recipe card. The card button toggles between `Add to Favorites ❤️` and `Remove from Favorites ❌`.
* Shimmer (skeleton) placeholder cards while data is being fetched (improves perceived performance).
* Routing with React Router: `/` for Home and `/favorites` for the favourites page.
* Basic error handling and empty states (no results, fetch error).

**Extras / Notes**

* Button state toggles immediately when user clicks (optimistic UI).
* The favourites list is stored in React state; optionally you can persist it to `localStorage` (example provided below).

---

## Tech stack

* **Framework**: React (Vite template recommended)
* **Styling**: Tailwind CSS
* **Routing**: React Router (react-router-dom)
* **Icons**: lucide-react
* **APIs**: TheMealDB (public)
* **Dev tools**: npm / Node 16+

---

## File / Component structure (recommended)

```
recipehub/
 ┣ src/
 ┃ ┣ components/
 ┃ ┃ ┣ Header.jsx           # top navbar (brand, links, icons, badge)
 ┃ ┃ ┣ ShimmerCard.jsx      # skeleton card component
 ┃ ┃ ┣ RecipeCard.jsx       # (optional) single recipe card component
 ┃ ┃ ┗ Favorites.jsx        # favourites page component
 ┃ ┃
 ┃ ┣ pages/
 ┃ ┃ ┗ Home.jsx             # search, fetch logic, and recipes grid
 ┃ ┣ App.jsx
 ┃ ┣ main.jsx
 ┃ ┗ index.css
 ┣ package.json
 ┗ tailwind.config.js
```

> Note: some file names in the examples use `Home.jsx` as the page component (this is what your routes should import).

---

## Installation & setup (step by step)

1. Clone the repo (or create a Vite app if starting from scratch):

```bash
# from scratch (recommended)
npm create vite@latest recipehub -- --template react
cd recipehub
```

2. Install dependencies:

```bash
npm install
npm install react-router-dom lucide-react
```

3. Install and initialize Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js` content paths:

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

4. Create `src/index.css` (Tailwind entry) and import it in `src/main.jsx`.

5. Start the dev server:

```bash
npm run dev
```

---

## How to run (development)

* Start dev server: `npm run dev` (Vite will print a local URL, e.g. `http://localhost:5173`).
* Build for production: `npm run build`.
* Preview production build locally: `npm run preview`.

---

## How it works (important code & flow)

### Home page

* When the page mounts, the app fetches a set of random recipes using `https://www.themealdb.com/api/json/v1/1/random.php` multiple times to fill the initial grid.
* The search input calls `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}` when user submits/searches.
* While fetching, the UI displays the `ShimmerCard` skeletons (8 placeholders by default).
* Once data arrives, the grid shows recipe cards.

### Card behaviour

* Each recipe card shows image and title and an action button that toggles between add/remove.
* The toggle is determined by checking the `favorites` array for the `idMeal`.
* Clicking the button runs the handler passed from `App` (`onAddFavorite` / `onRemoveFavorite`) which updates the central state and the navbar badge.

### Favourites

* Favourites are shown on the `/favorites` route. Each favourite shows Remove button.

---

## API endpoints used

* Search by ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}`
* Random meal: `https://www.themealdb.com/api/json/v1/1/random.php`

No API key or authentication required.

---

## Persisting favourites (optional)

If you want favourites to persist across reloads, add this pattern inside `App.jsx` (or wherever you manage favourites):

```js
// load
const [favorites, setFavorites] = useState(() => {
  try { return JSON.parse(localStorage.getItem('recipehub:favs')) || []; }
  catch { return []; }
});

// save (inside useEffect)
useEffect(() => {
  localStorage.setItem('recipehub:favs', JSON.stringify(favorites));
}, [favorites]);
```

---

## Accessibility & responsiveness notes

* Buttons include clear text and contrast (green for add, red for remove).
* Focus ring is enabled via Tailwind/`index.css` for keyboard navigation.
* Grid is responsive using Tailwind `grid-cols-...` utilities.
* Images use `alt` attributes (meal name).

---

## Known issues & future improvements

* The initial random fetch uses multiple HTTP requests in parallel — you can replace with a curated list endpoint or limit the number to reduce network cost.
* Add a details page using `lookup.php?i={idMeal}` to show ingredients and instructions.
* Add persistence for favourites (localStorage or backend).
* Add unit/integration tests (Jest + React Testing Library).
* Improve error UI with retry controls.

---

## How to submit for the take-home challenge

1. Level 1 (ChatGPT work) — save and share this chat link (insert link here) to show approach and reasoning.
2. Level 2 (Deployed app) — deploy to CodeSandbox / StackBlitz / Vercel and paste the URL in the submission.
3. Level 3 (Code) — push code to GitHub with this README and a concise commit history.

Include short demo instructions (`what to click`) and any credentials if you used private services (not required here).

---

## Contribution & contact

If you want any changes or want me to prepare the `README` as a GitHub repo `README.md` file with screenshots and a small GIF, tell me and I will update it.
If you want the `package.json` sample or a deploy script for Vercel, I can add that too.

License: MIT

---

*Prepared for the take-home challenge — RecipeHub*
