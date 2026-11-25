// Zelda-tijdlijn hero choreography and the rally game. Runs inside animateScene() from /motion.js.
// Ambient: clouds drift, the timeline twinkles, the trees sway, the crystal with Zelda floats and
// Ganondorf hovers with a glowing light ball. Now and then he throws it, the hero bats it back and
// Ganondorf catches it again.
// On the journey home, on a desktop with a keyboard, the scene becomes playable: click it (or Tab to it)
// and Ganondorf starts throwing. Pressing the space bar while the ball is inside the dotted circle bats it
// back. Ganondorf bats it back too: once in the second round and twice in the third. Each time the ball
// hits him the crystal cracks; after three hits he turns into Ganon, shrinks and runs off, the crystal
// shatters and Link and Zelda marry under a flower arch. In the games they never marry, and the hint says
// so. Then "centuries later" evil returns, with a new hero and princess in new colours (reincarnation).
// A miss only restarts the rally: there is no score, timer or way to lose. Keys, focus, the hint bar and
// sound come from the shared /game.js. Nothing is stored.
//
// Actors are plain objects tweened by GSAP and drawn each tick by setting attributes.
import { setupGame } from '../../game.js';
import { S, HOME, WED, GAN, G, T, CRY, Z_IN, Z_WED, BOAR_Y, SHOULDER, GAN_SHOULDER, TUNICS, DRESSES } from './art.js';

const ARC = 50, MISS_P = 1.16;
const ROUNDS = [{ trip: 1.7, volleys: 0, tol: 40 }, { trip: 1.5, volleys: 1, tol: 37 }, { trip: 1.35, volleys: 2, tol: 34 }];
const HINTS = {
  start: 'Klik op Hyrule en help Link om Zelda te bevrijden',
  ready: 'Pas op, Ganondorf gooit een lichtbal…',
  play: 'Spatie als de bal in de stippelcirkel is · Esc: stoppen',
  miss: 'Net mis! Sla als de bal precies in de cirkel is.',
  volley: 'Ganondorf kaatst terug! Blijf opletten.',
  hits: ['Raak! Het kristal barst. Nog twee keer.', 'Raak! Nog één keer.', 'Raak! Het kristal breekt…'],
  ganon: 'Ganondorf verandert in Ganon… en rent weg!',
  free: 'Zelda is vrij!',
  wedding: 'Hoera, ze trouwen! In de echte games nooit… maar hier wel!',
  later: 'Eeuwen later keert het kwaad terug…',
  again: 'Een nieuwe Link en een nieuwe Zelda! Nog een keer?',
};
// "Here comes the bride" from Wagner's Bridal Chorus (1850, public domain): [frequency, beats].
const BRIDAL = [[392, 1], [523.25, .75], [523.25, .25], [523.25, 2], [392, 1], [587.33, .75], [493.88, .25], [523.25, 2]];

// The ball flies in an arc from Ganondorf's hand (p = 0) to the dotted circle (p = 1) and straight on.
const ballPos = p => ({ x: G.x + (T.x - G.x) * p, y: G.y + (T.y - G.y) * p - ARC * Math.sin(Math.PI * Math.min(1, Math.max(0, p))) });

export function animate({ gsap, q, random, alive, svg, container }) {
  gsap.from(q('.layer'), { y: 20, opacity: .4, duration: 1.6, stagger: .15, ease: 'power2.out' });
  q('.cloud').forEach((c, i) => gsap.fromTo(c, { x: -14 }, { x: 14, duration: 16 + i * 5, ease: 'sine.inOut', repeat: -1, yoyo: true }).seek(random(0, 10)));
  q('.tl-dot').forEach(d => gsap.fromTo(d, { opacity: .25 }, { opacity: 1, duration: random(1.2, 2.4), ease: 'sine.inOut', repeat: -1, yoyo: true }).seek(random(0, 2)));
  q('.canopy').forEach((c, i) => gsap.fromTo(c, { rotation: -1 }, { rotation: 1, duration: 6 + i, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }));
  q('.tuft').forEach(t => gsap.fromTo(t, { skewX: -4 }, { skewX: 4, duration: random(2.5, 4), ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 100%' }).seek(random(0, 3)));
  const glowLoop = gsap.fromTo(q('.crystal-glow'), { opacity: .2 }, { opacity: .45, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.fromTo(q('.orb-glow'), { scale: .85 }, { scale: 1.2, duration: 1.2, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
  gsap.fromTo(q('.rune'), { opacity: .18 }, { opacity: .38, duration: 2.5, ease: 'sine.inOut', repeat: -1, yoyo: true });

  const [heroEl] = q('.hero'), [swingEl] = q('.swing'), [ganEl] = q('.gan'), [ganArm] = q('.gan-arm'), [orbEl] = q('.orb');
  const [zEl] = q('.zelda'), [cryEl] = q('.crystal'), [cryBody] = q('.crystal-body'), [cryGlow] = q('.crystal-glow'), [boarEl] = q('.boar');
  const [ballEl] = q('.ball'), [ringG] = q('.ring-g'), [ringFlash] = q('.ring-flash'), [popEl] = q('.pop'), [popRays] = q('.pop-rays');
  const [archEl] = q('.arch'), [petalsEl] = q('.petals'), [veil] = q('.veil');
  const cracks = q('.crack'), shards = q('.shard'), bells = q('.bell'), petals = q('.petal'), heartsUp = q('.heart-up');
  if (!heroEl || !ganEl || !ballEl) return;

  const link = { x: HOME.x, y: HOME.y, face: 1, hop: 0, swing: 0 };
  const gan = { recoil: 0, arm: 0 };
  const zel = { x: Z_IN.x, y: Z_IN.y, s: Z_IN.s, face: 1, inside: 1 };
  const boar = { x: GAN.x, s: 1, face: -1, hop: 0 };
  const cry = { shake: 0 };
  const ball = { p: 0, dir: 1, trip: 1.7, volleys: 0, on: false };
  const state = { mode: 'idle', focused: false, stage: 0, era: 0, cool: 0, run: null };
  let ballShown = false, throwing = null, swingTween = null, demo = null, party = [];

  // Keys, focus, hint bar, sound and clean-up come from the shared game module (no-ops off desktop).
  const game = setupGame({
    svg, container, gsap, q, alive, start: HINTS.start,
    help: 'Spel: klik op het veld of ga ernaartoe met Tab. Ganondorf gooit een lichtbal naar Link. Druk op de spatiebalk als de bal in de stippelcirkel voor Links zwaard is, dan kaatst Link hem terug. Raak Ganondorf drie keer om Zelda te bevrijden. Stop met Escape.',
    onKey: (key, down) => down && attempt(),
    onStart: () => onFocus(), onStop: () => onBlur(),
    when: () => state.mode === 'play' || state.mode === 'pause',
  });
  const { say, tone, tune, melody } = game;

  const render = time => {
    heroEl.setAttribute('transform', `translate(${link.x.toFixed(1)} ${(link.y + link.hop).toFixed(1)}) scale(${(S * link.face).toFixed(3)} ${S})`);
    swingEl?.setAttribute('transform', `rotate(${link.swing.toFixed(1)} ${SHOULDER[0]} ${SHOULDER[1]})`);
    ganEl.setAttribute('transform', `translate(${(GAN.x + gan.recoil).toFixed(1)} ${(GAN.y + Math.sin(time * 1.4) * 5).toFixed(1)}) scale(${-S} ${S})`);
    ganArm?.setAttribute('transform', `rotate(${gan.arm.toFixed(1)} ${GAN_SHOULDER[0]} ${GAN_SHOULDER[1]})`);
    const bob = Math.sin(time * 1.1) * 6;
    cryEl?.setAttribute('transform', `translate(${(CRY.x + cry.shake).toFixed(1)} ${(CRY.y + bob).toFixed(1)})`);
    zEl?.setAttribute('transform', `translate(${(zel.x + cry.shake * zel.inside).toFixed(1)} ${(zel.y + bob * zel.inside).toFixed(1)}) scale(${(zel.s * zel.face).toFixed(3)} ${zel.s.toFixed(3)})`);
    boarEl?.setAttribute('transform', `translate(${boar.x.toFixed(1)} ${(BOAR_Y + boar.hop).toFixed(1)}) scale(${(boar.s * boar.face).toFixed(3)} ${boar.s.toFixed(3)})`);
    if (ball.on || ballShown) {
      ballShown = ball.on;
      const b = ballPos(ball.p);
      ballEl.setAttribute('transform', `translate(${b.x.toFixed(1)} ${b.y.toFixed(1)})`);
      ballEl.setAttribute('opacity', ball.on ? 1 : 0);
    }
  };

  const tick = (time, dtMs) => {
    if (!alive() || document.body.classList.contains('calm')) return;
    const dt = Math.min(dtMs / 1000, .05);
    if (ball.on && (state.mode === 'play' || state.mode === 'demo')) {
      ball.p += ball.dir * dt / ball.trip;
      if (ball.dir > 0 && state.mode === 'demo' && ball.p >= .96) batBack(false);
      else if (ball.dir > 0 && ball.p >= MISS_P) miss();
      else if (ball.dir < 0 && ball.p <= 0) atGanon();
    }
    if (state.mode === 'play') {
      const b = ballPos(ball.p);
      game.cue(ball.on && ball.dir > 0 && Math.hypot(b.x - T.x, b.y - T.y) <= ROUNDS[state.stage].tol / 2);
    }
    render(time);
  };
  gsap.ticker.add(tick);

  const pop = (x, y, size = 1) => {
    popEl.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    gsap.fromTo(popEl, { opacity: 1 }, { opacity: 0, duration: .6, ease: 'power1.in', overwrite: 'auto' });
    gsap.fromTo(popRays, { scale: .4 * size, rotation: 0 }, { scale: 1.3 * size, rotation: 25, duration: .6, ease: 'power2.out', transformOrigin: '50% 50%', overwrite: 'auto' });
  };
  const swingNow = () => {
    swingTween?.kill();
    swingTween = gsap.timeline().to(link, { swing: -30, duration: .07, ease: 'power1.out' }).to(link, { swing: 70, duration: .1, ease: 'power2.in' }).to(link, { swing: 0, duration: .35, ease: 'power2.out' });
  };
  const walkTo = (x, face) => {
    const d = Math.abs(x - link.x), duration = Math.max(.3, d / 110);
    return gsap.timeline()
      .set(link, { face })
      .to(link, { x, duration, ease: 'sine.inOut' })
      .to(link, { hop: -3, duration: .16, ease: 'sine.out', yoyo: true, repeat: Math.max(1, Math.round(duration / .16) - 1) }, 0)
      .set(link, { hop: 0 });
  };
  const recolor = k => {
    const [t, td] = TUNICS[k], [d, dd] = DRESSES[k];
    q('.c-tunic').forEach(e => e.setAttribute('fill', t));
    q('.c-tunic-s').forEach(e => e.setAttribute('stroke', t));
    q('.c-tunicd-s').forEach(e => e.setAttribute('stroke', td));
    q('.c-dress').forEach(e => e.setAttribute('fill', d));
    q('.c-dressd').forEach(e => e.setAttribute('fill', dd));
    q('.c-dressd-s').forEach(e => e.setAttribute('stroke', dd));
  };

  // Ganondorf winds up and throws; the ball leaves his hand. In the game he starts each rally afresh.
  const throwBall = game => {
    if (!alive()) return;
    if (game) Object.assign(ball, { trip: ROUNDS[state.stage].trip, volleys: ROUNDS[state.stage].volleys });
    else Object.assign(ball, { trip: 1.9, volleys: 0 });
    throwing?.kill();
    throwing = gsap.timeline()
      .to(orbEl, { opacity: 1, duration: .25 })
      .to(gan, { arm: -25, duration: .4, ease: 'sine.out' })
      .call(() => {
        if (!alive()) return;
        Object.assign(ball, { p: 0, dir: 1, on: true });
        gsap.set(orbEl, { opacity: 0 });
        state.mode = game ? 'play' : 'demo';
        tone(330, .12, .04, 'sine');
      })
      .to(gan, { arm: 45, duration: .14, ease: 'power2.in' })
      .to(gan, { arm: 0, duration: .5, ease: 'sine.inOut' });
  };

  const batBack = player => {
    swingNow();
    ball.dir = -1;
    ball.trip *= .9;
    if (!player) return;
    tone(659.25, .1, .06); tone(880, .12, .05, 'triangle', .06);
    gsap.fromTo(ringFlash, { opacity: .9, scale: 1 }, { opacity: 0, scale: 1.5, duration: .45, ease: 'power2.out', transformOrigin: '50% 50%' });
  };

  const atGanon = () => {
    if (state.mode === 'demo') {
      // In the demo Ganondorf simply catches the ball again.
      ball.on = false;
      gsap.set(orbEl, { opacity: 1 });
      gsap.fromTo(gan, { arm: 20 }, { arm: 0, duration: .5, ease: 'back.out(2)' });
      state.mode = 'idle';
      scheduleDemo();
      return;
    }
    if (ball.volleys > 0) {
      ball.volleys--;
      Object.assign(ball, { p: 0, dir: 1, trip: ball.trip * .92 });
      gsap.timeline().to(gan, { arm: 50, duration: .1 }).to(gan, { arm: 0, duration: .4, ease: 'sine.out' });
      tone(392, .1, .05);
      say(HINTS.volley, HINTS.play);
      return;
    }
    ganHit();
  };

  const ganHit = () => {
    ball.on = false;
    state.mode = 'pause';
    const k = state.stage++;
    pop(G.x, G.y + 30);
    gsap.fromTo(gan, { recoil: 24 }, { recoil: 0, duration: .9, ease: 'elastic.out(1, .4)' });
    gsap.fromTo(ganEl, { opacity: .35 }, { opacity: 1, duration: .1, repeat: 4, yoyo: true });
    gsap.to(cracks[k], { opacity: 1, duration: .2 });
    gsap.fromTo(cry, { shake: -6 }, { shake: 0, duration: .6, ease: 'elastic.out(1, .3)' });
    tune([[523.25, 659.25], [587.33, 739.99], [659.25, 830.61]][k], .08, .12);
    if (state.stage < ROUNDS.length) {
      say(HINTS.hits[k], HINTS.play);
      state.run = gsap.delayedCall(1.6, () => alive() && state.focused && state.mode === 'pause' && throwBall(true));
    } else {
      say(HINTS.hits[k]);
      state.mode = 'win';
      gsap.to(ringG, { opacity: 0, duration: .3 });
      state.run = gsap.delayedCall(1, win);
    }
  };

  const miss = () => {
    const b = ballPos(ball.p);
    ball.on = false;
    state.mode = 'pause';
    pop(b.x, b.y, .7);
    gsap.to(link, { hop: -6, duration: .15, yoyo: true, repeat: 1 });
    tone(196, .14, .05);
    say(HINTS.miss, HINTS.play);
    state.run = gsap.delayedCall(1.4, () => alive() && state.focused && state.mode === 'pause' && throwBall(true));
  };

  const attempt = () => {
    if (state.mode !== 'play' || gsap.ticker.time < state.cool) return;
    state.cool = gsap.ticker.time + .4;
    const b = ballPos(ball.p);
    if (ball.on && ball.dir > 0 && Math.hypot(b.x - T.x, b.y - T.y) <= ROUNDS[state.stage].tol) batBack(true);
    else { swingNow(); tone(220, .05, .025, 'sine'); }
  };

  // Three hits: Ganondorf turns into Ganon, who shrinks and runs off. The crystal shatters, Zelda floats
  // down and the hero walks up to her.
  const win = () => {
    if (!alive()) return;
    say(HINTS.ganon);
    glowLoop.pause();
    state.run = gsap.timeline({ onComplete: wedding })
      .to(ganEl, { opacity: .2, duration: .1, repeat: 5, yoyo: true })
      .call(() => { pop(GAN.x, GAN.y - 90, 1.6); tone(110, .5, .07); })
      .set(ganEl, { opacity: 0 })
      .set(boar, { x: GAN.x, s: .2, face: -1, hop: 0 })
      .to(boarEl, { opacity: 1, duration: .2 }, '<')
      .to(boar, { s: 1.3, duration: .6, ease: 'back.out(1.6)' }, '<')
      .to(boar, { hop: -6, duration: .08, yoyo: true, repeat: 5 })
      .call(() => { pop(GAN.x, BOAR_Y - 50, 1.2); tone(523.25, .1, .05, 'sine'); })
      .to(boar, { s: .5, duration: .4, ease: 'power2.in' })
      .set(boar, { face: 1 })
      .to(boar, { x: 820, duration: 1.4, ease: 'power1.in' })
      .to(boar, { hop: -8, duration: .12, yoyo: true, repeat: 11, ease: 'sine.out' }, '<')
      .set(boarEl, { opacity: 0 })
      .call(() => {
        if (!alive()) return;
        say(HINTS.free);
        tune([523.25, 659.25, 783.99, 1046.5], .1, .2);
        shards.forEach((s, i) => {
          const a = i / shards.length * Math.PI * 2;
          gsap.fromTo(s, { x: 0, y: 0, rotation: 0, opacity: 1 }, { x: Math.cos(a) * 90, y: Math.sin(a) * 70 + 40, rotation: 160, opacity: 0, duration: 1.2, ease: 'power2.out', transformOrigin: '50% 50%' });
        });
      }, null, '-=.6')
      .to([cryBody, cryGlow], { opacity: 0, duration: .3 }, '<')
      .to(zel, { inside: 0, duration: .3 }, '<')
      .set(zel, { face: -1 })
      .to(zel, { x: Z_WED.x, y: Z_WED.y, s: S, duration: 2, ease: 'sine.inOut' })
      .add(walkTo(WED.x, 1), '<.5');
  };

  const wedding = () => {
    if (!alive()) return;
    state.mode = 'wedding';
    say(HINTS.wedding);
    melody(BRIDAL);
    gsap.fromTo(archEl, { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: .8, ease: 'back.out(1.4)', transformOrigin: '50% 100%' });
    gsap.to(petalsEl, { opacity: 1, duration: .4 });
    party = [
      ...bells.map((b, i) => gsap.fromTo(b, { rotation: -16 }, { rotation: 16, duration: .45, yoyo: true, repeat: 11, ease: 'sine.inOut', transformOrigin: '50% 0%', delay: i * .15 })),
      ...petals.map(p => gsap.to(p, { keyframes: [{ y: 0, x: 0, rotation: 0, opacity: 0, duration: 0 }, { y: 60, x: 10, rotation: 120, opacity: 1, duration: 1.2 }, { y: 200, x: -10, rotation: 300, opacity: 0, duration: 2.4 }], repeat: -1, ease: 'none', delay: random(0, 2), transformOrigin: '50% 50%' })),
      ...heartsUp.map((h, i) => gsap.to(h, { keyframes: [{ y: 0, opacity: 0, duration: 0 }, { y: -50, opacity: 1, duration: .8 }, { y: -130, opacity: 0, duration: 1.4 }], repeat: 2, delay: .6 + i * .4, ease: 'sine.out' })),
    ];
    gsap.to(link, { hop: -6, duration: .22, yoyo: true, repeat: 3, ease: 'sine.out', delay: .8 });
    state.run = gsap.delayedCall(6.5, later);
  };

  // Centuries later evil returns, with a new hero and a new princess (reincarnation).
  const later = () => {
    if (!alive()) return;
    state.mode = 'reset';
    say(HINTS.later);
    state.run = gsap.timeline({ onComplete: afterReset })
      .to(veil, { opacity: .6, duration: 1.1, ease: 'sine.in' })
      .call(restore)
      .to(veil, { opacity: 0, duration: 1.1, ease: 'sine.out' }, '+=.5');
  };
  const restore = () => {
    party.forEach(t => t.kill());
    party = [];
    gsap.set([archEl, petalsEl, boarEl, ...cracks, ...shards, ...heartsUp], { opacity: 0 });
    gsap.set(bells, { rotation: 0 });
    gsap.set([ganEl, cryBody, orbEl], { opacity: 1 });
    glowLoop.restart();
    Object.assign(gan, { recoil: 0, arm: 0 });
    Object.assign(zel, { x: Z_IN.x, y: Z_IN.y, s: Z_IN.s, face: 1, inside: 1 });
    Object.assign(link, { x: HOME.x, face: 1, hop: 0, swing: 0 });
    state.era = (state.era + 1) % TUNICS.length;
    recolor(state.era);
    state.stage = 0;
  };
  const afterReset = () => {
    if (!alive()) return;
    if (!state.focused) { idle(); return; }
    state.mode = 'pause';
    gsap.to(ringG, { opacity: 1, duration: .3 });
    say(HINTS.again, HINTS.play);
    state.run = gsap.delayedCall(1.6, () => alive() && state.focused && state.mode === 'pause' && throwBall(true));
  };

  // The ambient demo: a throw and a return now and then.
  const scheduleDemo = (wait = random(6, 10)) => { demo?.kill(); demo = gsap.delayedCall(wait, () => alive() && state.mode === 'idle' && !state.focused && throwBall(false)); };
  scheduleDemo(random(2, 3));
  if (!game.active) return () => gsap.ticker.remove(tick);

  // Leaving mid-game: the ball fades, the crystal heals and the ambient scene returns.
  const idle = () => {
    state.run?.kill();
    throwing?.kill();
    Object.assign(state, { mode: 'idle', stage: 0 });
    ball.on = false;
    gsap.to(ringG, { opacity: 0, duration: .3 });
    gsap.to(cracks, { opacity: 0, duration: .5 });
    gsap.to(orbEl, { opacity: 1, duration: .3 });
    gsap.to(gan, { arm: 0, recoil: 0, duration: .3 });
    say(HINTS.start);
    scheduleDemo();
  };

  const onFocus = () => {
    state.focused = true;
    if (state.mode !== 'idle' && state.mode !== 'demo') return;
    demo?.kill();
    throwing?.kill();
    ball.on = false;
    gsap.to(orbEl, { opacity: 1, duration: .2 });
    Object.assign(gan, { arm: 0 });
    Object.assign(state, { mode: 'pause', stage: 0 });
    gsap.to(ringG, { opacity: 1, duration: .3 });
    say(HINTS.ready, HINTS.play);
    state.run = gsap.delayedCall(1.2, () => alive() && state.focused && state.mode === 'pause' && throwBall(true));
  };
  const onBlur = () => {
    state.focused = false;
    if (state.mode === 'play' || state.mode === 'pause') { idle(); return; }
    if (state.mode === 'idle' || state.mode === 'demo') say(HINTS.start);
  };
  return () => {
    gsap.ticker.remove(tick);
    game.cleanup();
    recolor(0);
  };
}
