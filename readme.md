# Event Calendar

A simple, responsive web calendar that displays events for each day. Events are loaded from a static `event.json` file. No backend or database required.

## Features

- Clean, modern UI
- View events for any date
- Highlights days with events
- Responsive design for desktop and mobile
- All data is loaded from a simple JSON file

## Usage

1. **Clone or download this repository.**
2. Open `index.html` in your browser.
3. Click on any date to view its events.
4. To add or edit events, manually update the `event.json` file.

## File Structure

- `index.html` — Main HTML file
- `style.css` — All calendar and event styles
- `script.js` — Calendar and event logic
- `event.json` — List of events (edit this file to add events)
- `web_icon.png` — Favicon

## Example `event.json`

```json
[
  { "date": "2025-07-14", "events": ["Sample Event 1", "Sample Event 2"] },
  { "date": "2025-07-15", "events": ["Another Event"] }
]
```

## Customization

- Change colors and layout in `style.css`.
- Add or remove events in `event.json`.

## License

MIT

## Author

Pradyumna Behera
