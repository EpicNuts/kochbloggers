# Kochbloggers Website

A simple, responsive website for kochbloggers.de - a recipe and cooking ideas platform.

## Project Structure

```
/
├── src/                # Eleventy pages and recipe content
├── assets/
│   ├── css/styles.css  # Main stylesheet
│   ├── images/         # Recipe and site images
│   └── js/             # Frontend scripts
├── _site/              # Generated site output
└── README.md           # Project documentation
```

## Features

- Responsive design that works on desktop and mobile
- Clean, modern recipe-focused design
- German language content
- Hero section with call-to-action
- Recipe cards grid layout
- About section
- Contact footer

## Local Development

To view the website locally:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Eleventy dev server:
   ```bash
   npm start
   ```
3. Open `http://localhost:8080`

If you only want a production build:

1. Build the site:
   ```bash
   npm run build
   ```
2. Deploy the generated `_site/` directory

## Deployment to Strato.de

This static website can be deployed to Strato.de hosting:

1. Upload all files to your web hosting directory (usually `www/` or `public_html/`)
2. Ensure the generated contents of `_site/` are uploaded to the root directory
3. Make sure file permissions are set correctly (644 for files, 755 for directories)

## Future Enhancements

- Add individual recipe pages
- Implement search functionality
- Add recipe categories
- Include user comments and ratings
- Add a blog section
- Implement a recipe submission form

## Technologies Used

- Eleventy (11ty)
- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript
- Responsive design principles
- Semantic HTML structure