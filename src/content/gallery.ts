import type { ImageKey } from "@/lib/images"

export type GalleryAlbum = "home" | "play" | "rest"

export type GalleryItem = {
  image: ImageKey
  album: GalleryAlbum
}

/** Order defines the gallery layout. Add your own photos to `lib/images.ts` first. */
export const galleryItems: GalleryItem[] = [
  { image: "homeLounge", album: "home" },
  { image: "petting", album: "play" },
  { image: "sleepy", album: "rest" },
  { image: "stairs", album: "home" },
  { image: "playful", album: "play" },
  { image: "british", album: "rest" },
  { image: "kitchen", album: "home" },
  { image: "happy", album: "play" },
  { image: "maine", album: "rest" },
  { image: "lookingUp", album: "home" },
  { image: "basket", album: "play" },
  { image: "siamese", album: "rest" },
  { image: "kitten", album: "play" },
  { image: "window", album: "home" },
  { image: "sofa", album: "rest" },
]
