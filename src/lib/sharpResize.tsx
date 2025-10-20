import sharp from "sharp";

export default async function sharpResize(photoPath: string): Promise<void> {
  await sharp(photoPath)
    .rotate()
    .resize(232, 232)
    .jpeg({ mozjpeg: true })
    .toFile(photoPath.replace("employees/", ""));
}
