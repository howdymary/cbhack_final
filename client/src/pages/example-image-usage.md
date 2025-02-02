# How to Use Images from Public Directory

Once you've placed your image file in the `public/images` directory, you can use it in several ways:

1. In JSX/HTML:
```jsx
<img src="/images/your-image.png" alt="Description" />
```

2. In CSS:
```css
.element {
  background-image: url('/images/your-image.png');
}
```

3. As a background in Tailwind:
```jsx
<div className="bg-[url('/images/your-image.png')]">
  Content
</div>
```

## Recommended Image Formats

- **PNG**: Use for:
  - Images with transparency
  - Screenshots
  - Logos that need crisp edges
  - When you need lossless quality

- **WebP**: Modern format, best for:
  - General web images
  - Best balance of quality and file size
  - Support for both lossy and lossless compression
  - Transparency support

- **JPEG**: Good for:
  - Photographs
  - Complex images without transparency
  - When file size is a concern

- **SVG**: Perfect for:
  - Logos
  - Icons
  - Simple illustrations
  - Graphics that need to scale to any size

The `/images/` path will automatically point to the files in your public/images directory.