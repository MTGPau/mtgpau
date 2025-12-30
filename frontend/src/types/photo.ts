export interface Photo {
  filename: string
  alt: string
  thumbnail: string
  fullSize: string
}

export interface PhotosByYear {
  [year: string]: Photo[]
}

export interface PhotoManifest {
  photos: PhotosByYear
}
