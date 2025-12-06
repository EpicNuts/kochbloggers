# Deployment Guide for Strato.de

## Step-by-Step Deployment Instructions

### 1. Access Your Strato Hosting Account
- Log into your Strato customer portal at https://www.strato.de/apps/CustomerService
- Navigate to your hosting/webspace section

### 2. File Upload Methods

#### Option A: Using Strato File Manager (Recommended for beginners)
1. Look for "Datei-Manager" or "File Manager" in your Strato control panel
2. Navigate to the web directory (usually `www/` or `public_html/`)
3. Upload your files:
   - `index.html` → Root directory
   - `styles.css` → Root directory
   - Any additional files → Root directory

#### Option B: Using FTP (More flexible)
1. Get your FTP credentials from Strato control panel:
   - FTP Server: Usually your domain or a server provided by Strato
   - Username: Your Strato username or domain
   - Password: Your FTP password (set in control panel)
   
2. Use an FTP client like FileZilla:
   - Download FileZilla from https://filezilla-project.org/
   - Connect using your FTP credentials
   - Upload files to the `www/` or `public_html/` directory

### 3. File Structure on Server
```
www/ (or public_html/)
├── index.html
├── styles.css
└── (other files)
```

### 4. Set File Permissions
- Files: 644 (readable by all, writable by owner)
- Directories: 755 (executable/accessible by all, writable by owner)

### 5. Test Your Website
- Visit http://kochbloggers.de or https://kochbloggers.de
- Check that all pages load correctly
- Verify images and CSS are working

## Troubleshooting

### Domain Not Pointing to Hosting
- Check DNS settings in Strato control panel
- Ensure A-record points to your hosting server IP
- DNS changes can take 24-48 hours to propagate

### Files Not Loading
- Check file names are correct (case-sensitive)
- Verify file permissions
- Ensure files are in correct directory (`www/` not subdirectory)

### CSS/Images Not Working
- Check file paths in HTML are correct
- Ensure all files uploaded successfully
- Verify MIME types are correct

## Support
- Strato Support: 030 300146099
- Documentation: https://www.strato.de/faq/
- Contact form in customer portal