/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-05-08 11:10:37
*/
import { Particle } from '@/Particle'

export interface FireworkOptions {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  ctx: CanvasRenderingContext2D;
  particles: Particle[];
}

export interface ParticleOptions {
  x: number;
  y: number;
  hue: number;
  ctx: CanvasRenderingContext2D;
}

