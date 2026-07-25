import React, { useEffect, useRef } from 'react';

export const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: true }) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) return;

    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    function syncSize() {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    syncSize();
    window.addEventListener('resize', syncSize);

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform float u_scroll;
      uniform float u_scroll_velocity;
      uniform vec2 u_resolution;

      // Inigo Quilez Cosine Color Palette for soft pearlescent iridescence
      vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
        return a + b * cos(6.28318 * (c * t + d));
      }

      // Smooth noise for fluid wave distortion
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
        
        float time = u_time * 0.12;
        float scrollOffset = u_scroll * 0.0012;
        float velBoost = clamp(u_scroll_velocity * 0.003, 0.0, 0.6);

        // Multi-layered organic liquid flow influenced by scroll offset
        vec2 q = vec2(0.0);
        q.x = fbm(st * 2.2 + vec2(time * 0.2, scrollOffset * 1.5));
        q.y = fbm(st * 2.2 + vec2(scrollOffset * 2.0, time * 0.25));

        vec2 r = vec2(0.0);
        r.x = fbm(st * 2.8 + 1.2 * q + vec2(1.7, 9.2) + time * 0.15 + scrollOffset);
        r.y = fbm(st * 2.8 + 1.2 * q + vec2(8.3, 2.8) - time * 0.12 - scrollOffset * 0.8);

        float f = fbm(st * 2.0 + r + vec2(0.0, scrollOffset * 2.5));

        // Iridescent phase shift combining scroll movement, time & velocity
        float iridPhase = f * 1.8 + scrollOffset * 2.2 + st.y * 0.7 + velBoost * 1.2 + sin(st.x * 2.5 + time) * 0.3;

        // Pearlescent Palette: soft cream, warm peach, lilac, blush pink, and mint gold
        vec3 a = vec3(0.97, 0.94, 0.93); // Light cream base
        vec3 b = vec3(0.12, 0.10, 0.14); // Soft iridescence intensity
        vec3 c = vec3(1.0, 1.0, 1.0);    // Frequency
        vec3 d = vec3(0.00, 0.33, 0.67); // RGB rainbow phase separation

        vec3 col = palette(iridPhase, a, b, c, d);

        // Soft pearlescent highlight sheen
        float sheen = pow(clamp(dot(r, q) * 2.2, 0.0, 1.0), 2.5);
        vec3 sheenCol = vec3(0.99, 0.88, 0.85); // Warm rose gold sheen
        col = mix(col, sheenCol, sheen * 0.35);

        // Extra subtle sparkle glow when scrolling dynamically
        col += vec3(0.04, 0.02, 0.05) * velBoost;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function createShader(type: number, src: string) {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vertShader = createShader(gl.VERTEX_SHADER, vs);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(prog));
      return;
    }

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uScroll = gl.getUniformLocation(prog, 'u_scroll');
    const uScrollVel = gl.getUniformLocation(prog, 'u_scroll_velocity');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    let animFrameId: number;

    function render(t: number) {
      if (!gl || !canvas) return;

      // Smooth scroll interpolation
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      const rawVel = Math.abs(currentScrollY - lastScrollY);
      scrollVelocity += (rawVel - scrollVelocity) * 0.1;
      lastScrollY = currentScrollY;

      gl.viewport(0, 0, canvas.width, canvas.height);

      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uScroll) gl.uniform1f(uScroll, currentScrollY);
      if (uScrollVel) gl.uniform1f(uScrollVel, scrollVelocity);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animFrameId = requestAnimationFrame(render);
    }

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', syncSize);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-90 transition-opacity duration-1000"
      />
    </div>
  );
};

