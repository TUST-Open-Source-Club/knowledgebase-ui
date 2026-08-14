<script setup lang="ts">
  import { ArrowUpRight } from '@lucide/vue';
  import { gsap } from 'gsap';
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import type { HomePageViewModel } from '@interface-adapters/view-models/home-page';
  import HomeDock from '~/components/navigation/HomeDock.vue';
  import HomeOrb from '~/components/visual/HomeOrb.vue';

  defineProps<{
    hero: HomePageViewModel['hero'];
  }>();

  const heroCopy = ref<HTMLElement | null>(null);
  const heroVisual = ref<HTMLElement | null>(null);
  let motionContext: gsap.Context | null = null;

  onMounted(() => {
    motionContext = gsap.context(() => {
      if (heroCopy.value) {
        gsap.fromTo(
          heroCopy.value.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }
        );
      }

      if (heroVisual.value) {
        gsap.fromTo(
          heroVisual.value,
          { opacity: 0, scale: 0.94, y: 18 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1, delay: 0.12, ease: 'power3.out' }
        );
        gsap.to(heroVisual.value, {
          y: -8,
          rotate: 1.2,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });
  });

  onBeforeUnmount(() => {
    motionContext?.revert();
  });
</script>

<template>
  <section class="hero-section" aria-labelledby="home-title">
    <div ref="heroCopy" class="hero-copy">
      <h1 id="home-title">{{ hero.title }}</h1>
      <p>{{ hero.description }}</p>
      <div class="hero-actions">
        <NuxtLink class="primary-action" to="/workspace">
          进入知识工作台
          <ArrowUpRight :size="17" :stroke-width="1.8" aria-hidden="true" />
        </NuxtLink>
        <span class="hero-support">让经验被看见，也被继续使用。</span>
      </div>
    </div>

    <div ref="heroVisual" class="hero-visual">
      <div class="hero-orb-frame" aria-hidden="true">
        <HomeOrb />
      </div>
      <p class="hero-orb-caption">连接每一次思考，留住每一次分享。</p>
    </div>

    <div class="hero-dock">
      <HomeDock />
    </div>
  </section>
</template>
