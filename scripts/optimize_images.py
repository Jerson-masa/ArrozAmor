import os
from PIL import Image

def optimize_image(filepath):
    try:
        if not filepath.endswith('.png'): return
        
        img = Image.open(filepath)
        
        # Calculate new size maintaining aspect ratio
        max_size = (800, 800)
        img.thumbnail(max_size, Image.Resampling.LANCZOS)
        
        # Save as WebP
        new_filepath = filepath.rsplit('.', 1)[0] + '.webp'
        img.save(new_filepath, 'WEBP', quality=80)
        
        print(f"Optimized {filepath} -> {new_filepath}")
        
    except Exception as e:
        print(f"Error optimizing {filepath}: {e}")

# Optimize images in public/images
images_dir = 'public/images'
if os.path.exists(images_dir):
    for filename in os.listdir(images_dir):
        optimize_image(os.path.join(images_dir, filename))

# Optimize logo
logo_path = 'public/lobster-chef-v2.png'
if os.path.exists(logo_path):
    optimize_image(logo_path)

