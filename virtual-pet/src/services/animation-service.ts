import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private images: HTMLImageElement[] = [];
  private frame = 0;
  private timeSinceFrameChange = 0;
  private animationId: number | null = null;
  private isAnimating = false;

  loadImages(path: string, frameCount: number): Promise<void> {
    this.images = [];
    const promises: Promise<void>[] = [];

    for (let i = 0; i <= frameCount; i++) {
      const img = new Image();

      img.src = `${path}(${i}).png`;

      const promise = new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });

      promises.push(promise);
      this.images[i] = img;
    }

    this.frame = 0;
    this.timeSinceFrameChange = 0;

    return Promise.all(promises).then(() => undefined);
  }

  startAnimationLoop(
    canvas: HTMLCanvasElement,
    spriteW: number,
    spriteH: number,
    frameDuration: number,
    loop: boolean
  ) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    let lastTime = performance.now();

    const animate = (time: number) => {
      if (!this.isAnimating) return;

      const delta = time - lastTime;
      lastTime = time;
      this.timeSinceFrameChange += delta;

      if (this.timeSinceFrameChange >= frameDuration) {
        this.timeSinceFrameChange = 0;
        this.frame++;

        if (this.frame >= this.images.length) {
          if (loop) {
            this.frame = 0;
          } else {
            this.stopAnimation();
            return;
          }
        }
      }

      this.drawFrame(canvas, spriteW, spriteH);
      this.animationId = requestAnimationFrame(animate);
    };

    this.animationId = requestAnimationFrame(animate);
  }

  stopAnimation() {
    this.isAnimating = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.frame = 0;
    this.timeSinceFrameChange = 0;
  }

  drawFrame(canvas: HTMLCanvasElement, spriteW: number, spriteH: number) {
    if (!canvas || this.images.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const x = canvas.width / 2 - spriteW / 2;
    const y = canvas.height / 2 - spriteH / 2;

    ctx.drawImage(this.images[this.frame], x, y, spriteW, spriteH);
  }
}
