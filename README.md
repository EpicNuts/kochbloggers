# Kochbloggers Website

A simple, responsive website for kochbloggers.de - a recipe and cooking ideas platform.

## Project Structure

```
/
├── index.html          # Main HTML page
├── styles.css          # CSS styling
└── README.md          # Project documentation
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

1. Open `index.html` in any web browser
2. Or serve it using a simple HTTP server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server .
   ```

## Deployment to Strato.de

This static website can be deployed to Strato.de hosting:

1. Upload all files to your web hosting directory (usually `www/` or `public_html/`)
2. Ensure `index.html` is in the root directory
3. Make sure file permissions are set correctly (644 for files, 755 for directories)

## Future Enhancements

- Add individual recipe pages
- Implement search functionality
- Add recipe categories
- Include user comments and ratings
- Add a blog section
- Implement a recipe submission form

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- Responsive design principles
- Semantic HTML structure