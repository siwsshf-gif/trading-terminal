<template>



  <!-- ================= NAVBAR ================= -->
  <header class="tw-group">
    <nav class="tw-fixed tw-top-0 tw-z-30 tw-w-full tw-border-b tw-border-white/10 tw-bg-black/40 tw-backdrop-blur-xl">
      <div class="tw-mx-auto tw-max-w-7xl tw-px-6">
        <div class="tw-flex tw-h-16 tw-items-center tw-justify-between">

          <!-- LOGO -->
          <div
            @click="scrollTo('platform')"
            class="tw-flex tw-items-center tw-gap-3 tw-cursor-pointer"
          >
            <img
              src="/favicon.png"
              alt="CoreTerminal logo"
              class="tw-h-8 tw-w-8 tw-rounded-lg tw-object-contain"
            />
            <span class="tw-text-sm tw-font-medium tw-text-white">
              CoreTerminal
            </span>
          </div>

          <!-- MENU -->
          <div class="tw-hidden md:tw-flex tw-items-center tw-gap-8 tw-text-[13px] tw-text-white/70">
            <a @click="scrollTo('platform')" class="hover:tw-text-white tw-cursor-pointer">Platform</a>
            <a @click="scrollTo('capabilities')" class="hover:tw-text-white tw-cursor-pointer">Capabilities</a>
            <a @click="scrollTo('institutions')" class="hover:tw-text-white tw-cursor-pointer">Institutions</a>
            <a @click="scrollTo('insights')" class="hover:tw-text-white tw-cursor-pointer">Insights</a>
          </div>

          <!-- ACTIONS -->
          <div class="tw-flex tw-items-center tw-gap-3">
            <button
              @click="goToTraderoom"
              class="tw-rounded-full tw-border tw-border-white/20 tw-px-4 tw-py-1.5 tw-text-[12px] tw-text-white hover:tw-bg-white/10"
            >
              Sign in
            </button>
            <button
              @click="scrollTo('contact')"
              class="tw-rounded-full tw-bg-white tw-px-4 tw-py-1.5 tw-text-[12px] tw-font-medium tw-text-black"
            >
              Send a Request
            </button>
          </div>

        </div>
      </div>
    </nav>
  </header>

  <!-- ================= HERO ================= -->
  <section class="tw-relative tw-overflow-hidden tw-bg-black tw-pt-28 tw-pb-24">
    <!-- background shapes -->
    <div class="tw-absolute tw-inset-0 tw-overflow-hidden">
      <div
        class="tw-absolute tw--top-40 tw-left-1/2 tw-h-[600px] tw-w-[600px] tw--translate-x-1/2 tw-rounded-full tw-bg-blue-600/20 tw-blur-[120px]"
      ></div>
      <div
        class="tw-absolute tw-bottom-0 tw-right-0 tw-h-[500px] tw-w-[500px] tw-rounded-full tw-bg-cyan-500/10 tw-blur-[120px]"
      ></div>
    </div>

    <div class="tw-relative tw-mx-auto tw-max-w-7xl tw-px-6">
      <div class="tw-grid tw-grid-cols-1 tw-gap-16 md:tw-grid-cols-2">
        <!-- LEFT -->
        <div>
          <p class="tw-mb-4 tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-white/10 tw-px-4 tw-py-1 tw-text-[12px] tw-text-white/60">
            INSTITUTIONAL TRADING PLATFORM
          </p>

          <h1 class="tw-text-4xl tw-font-light tw-leading-tight tw-text-white md:tw-text-5xl">
            One platform. <br />
            Multiple roles. <br />
            Institutional-grade execution.
          </h1>

          <p class="tw-mt-6 tw-max-w-xl tw-text-[14px] tw-text-white/60">
            CoreTerminal is a professional trading environment designed for hedge funds and mutual funds, enabling traders, 
            managers and investors to operate and monitor capital with full transparency and control.
          </p>

          <div class="tw-mt-8 tw-flex tw-gap-4">
            <button @click="scrollTo('contact')"
              class="tw-rounded-full tw-bg-white tw-px-6 tw-py-2 tw-text-[13px] tw-font-medium tw-text-black">
              Send a request
            </button>
            <button @click="goToTraderoom"
              class="tw-rounded-full tw-border tw-border-white/20 tw-px-6 tw-py-2 tw-text-[13px] tw-text-white">
              Sign in
            </button>
          </div>

          <div class="tw-mt-12 tw-flex tw-gap-12 tw-text-white">
            <div>
              <p class="tw-text-2xl tw-font-medium">Multi-Asset Trading</p>
              <p class="tw-text-[12px] tw-text-white/50">CFDs, Futures & Options</p>
            </div>
            <div>
              <p class="tw-text-2xl tw-font-medium">Real-Time Visibility</p>
              <p class="tw-text-[12px] tw-text-white/50">Live positions & balances</p>
            </div>
            <div>
              <p class="tw-text-2xl tw-font-medium">Institutional Control</p>
              <p class="tw-text-[12px] tw-text-white/50">MAM & Copy Trading</p>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="tw-relative">
          <div
            class="tw-rounded-3xl tw-from-white/5 tw-to-white/0 tw-p-6 tw-backdrop-blur-xl"
          >
            <img
              src="/i1.png"
              class="tw-rounded-2xl tw-opacity-90"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= AI IMPACT METRICS 2 ================= -->
  <section id="platform" class="tw-relative tw-bg-black tw-py-24 tw-overflow-hidden tw--mt-18">
    <!-- Background glow -->
    <div class="tw-absolute tw-inset-0 tw-overflow-hidden">
      <div
        class="tw-absolute tw-left-1/2 tw-top-1/2 tw-h-[700px] tw-w-[700px] tw--translate-x-1/2 tw--translate-y-1/2 tw-rounded-full tw-bg-blue-600/20 tw-blur-[160px]"
      ></div>
      <div
        class="tw-absolute tw-left-1/2 tw-top-1/2 tw-h-[1000px] tw-w-[1000px] tw--translate-x-1/2 tw--translate-y-1/2 tw-rounded-full tw-border tw-border-white/5"
      ></div>
    </div>

    <div class="tw-relative tw-mx-auto tw-max-w-7xl tw-px-6">
      <!-- Grid -->
      <div class="tw-grid tw-items-center tw-gap-16 md:tw-grid-cols-3">
        
        <!-- LEFT METRICS -->
        <div class="tw-space-y-10 tw-text-center md:tw-text-right">
          <div>
            <p class="tw-text-3xl tw-font-light tw-text-white">+120</p>
            <p class="tw-mt-1 tw-text-[12px] tw-text-white/50">
              Automated workflows
            </p>
          </div>

          <div>
            <p class="tw-text-3xl tw-font-light tw-text-white">+65%</p>
            <p class="tw-mt-1 tw-text-[12px] tw-text-white/50">
              Cost reduction
            </p>
          </div>
        </div>

        <!-- CENTER CIRCLE -->
        <div class="tw-relative tw-flex tw-justify-center">
          <div
            class="tw-relative tw-flex tw-h-[420px] tw-w-[420px] tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/5 tw-to-white/0 tw-backdrop-blur-xl"
          >
            <!-- inner glow -->
            <div
              class="tw-absolute tw-inset-6 tw-rounded-full tw-bg-blue-500/10 tw-blur-2xl"
            ></div>

            <div class="tw-relative tw-text-center tw-px-10">
              <p class="tw-mb-3 tw-text-[12px] tw-font-medium tw-tracking-wide tw-text-blue-400">
                MULTI-ROLE TRADING ENVIRONMENT
              </p>

              <h3 class="tw-text-3xl tw-font-light tw-leading-tight tw-text-white">
                One terminal. <br />
                Different perspectives.
              </h3>

              <p class="tw-mt-4 tw-text-[13px] tw-text-white/60">
                CoreTerminal allows traders to focus on execution, managers to oversee capital allocation,
                and investors to monitor performance, all within a single unified trading environment.
              </p>

              <!-- Arrow button -->
              <button  @click="goToTraderoom"
                class="tw-mt-6 tw-inline-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/20 tw-text-white hover:tw-bg-white/10"
              >
              →
              </button>
            </div>
          </div>
        </div>

        <!-- RIGHT METRICS -->
        <div class="tw-space-y-10 tw-text-center md:tw-text-left">
          <div>
            <p class="tw-text-3xl tw-font-light tw-text-white">24/7</p>
            <p class="tw-mt-1 tw-text-[12px] tw-text-white/50">
              Systems running
            </p>
          </div>

          <div>
            <p class="tw-text-3xl tw-font-light tw-text-white">+99.9%</p>
            <p class="tw-mt-1 tw-text-[12px] tw-text-white/50">
              Uptime reliability
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= FEATURES ================= -->
  <section id="capabilities" class="tw-relative tw-bg-black tw-py-24 tw--mt-18">
    <!-- background glow -->
    <div class="tw-absolute tw-inset-0 tw-overflow-hidden">
      <div
        class="tw-absolute tw-top-0 tw-left-1/2 tw-h-[500px] tw-w-[800px] tw--translate-x-1/2 tw-rounded-full tw-bg-blue-600/10 tw-blur-[160px]"
      ></div>
    </div>

    <div class="tw-relative tw-mx-auto tw-max-w-7xl tw-px-6">
      <!-- Header -->
      <div class="tw-mb-20 tw-text-center">
        <p class="tw-mb-4 tw-text-[13px] tw-font-medium tw-text-blue-500">
          Features
        </p>
        <h2 class="tw-text-4xl tw-font-light tw-text-white">
          Core Trading Capabilities
        </h2>
        <p class="tw-mx-auto tw-mt-4 tw-max-w-2xl tw-text-[14px] tw-text-white/60">
          Everything required to operate, manage and monitor institutional trading operations at scale.
        </p>
      </div>

      <!-- Grid -->
      <div class="tw-grid tw-gap-12 md:tw-grid-cols-2 lg:tw-grid-cols-4">
        <!-- Item -->
        <div class="tw-text-center">
          <div
            class="tw-mx-auto tw-mb-6 tw-flex tw-h-16 tw-w-16 tw-items-center tw-justify-center tw-rounded-2xl tw-bg-blue-500/20 tw-text-blue-400"
          >
            <!-- icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-7 tw-w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 6v6l4 2" />
            </svg>
          </div>

          <h3 class="tw-mb-2 tw-text-[16px] tw-font-medium tw-text-white">
            Professional Execution
          </h3>
          <p class="tw-text-[13px] tw-text-white/60">
            Advanced trading tools for CFDs, Futures and Options, built for professional traders.
          </p>
        </div>

        <!-- Item -->
        <div class="tw-text-center">
          <div
            class="tw-mx-auto tw-mb-6 tw-flex tw-h-16 tw-w-16 tw-items-center tw-justify-center tw-rounded-2xl tw-bg-blue-500/20 tw-text-blue-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-7 tw-w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </div>

          <h3 class="tw-mb-2 tw-text-[16px] tw-font-medium tw-text-white">
            MAM & Copy Trading
          </h3>
          <p class="tw-text-[13px] tw-text-white/60">
            Allocate capital across multiple sub-accounts with full control and transparency.
          </p>
        </div>

        <!-- Item -->
        <div class="tw-text-center">
          <div
            class="tw-mx-auto tw-mb-6 tw-flex tw-h-16 tw-w-16 tw-items-center tw-justify-center tw-rounded-2xl tw-bg-blue-500/20 tw-text-blue-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-7 tw-w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 3l8 4v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7l8-4z" />
            </svg>
          </div>

          <h3 class="tw-mb-2 tw-text-[16px] tw-font-medium tw-text-white">
            Investor View Mode
          </h3>
          <p class="tw-text-[13px] tw-text-white/60">
            Investors can monitor performance, positions and history without affecting execution.
          </p>
        </div>

        <!-- Item -->
        <div class="tw-text-center">
          <div
            class="tw-mx-auto tw-mb-6 tw-flex tw-h-16 tw-w-16 tw-items-center tw-justify-center tw-rounded-2xl tw-bg-blue-500/20 tw-text-blue-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-7 tw-w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
            </svg>
          </div>

          <h3 class="tw-mb-2 tw-text-[16px] tw-font-medium tw-text-white">
            Risk & Account Management
          </h3>
          <p class="tw-text-[13px] tw-text-white/60">
            Centralized oversight of sub-accounts, strategies and exposure.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= HERO ================= -->
  <section id="institutions" class="tw-relative tw-overflow-hidden tw-bg-black tw-py-24 tw--mt-8">
    <!-- background shapes -->
    <div class="tw-absolute tw-inset-0 tw-overflow-hidden">
      <div
        class="tw-absolute tw--top-40 tw-left-1/2 tw-h-[600px] tw-w-[600px] tw--translate-x-1/2 tw-rounded-full tw-bg-blue-600/20 tw-blur-[120px]"
      ></div>
      <div
        class="tw-absolute tw-bottom-0 tw-right-0 tw-h-[500px] tw-w-[500px] tw-rounded-full tw-bg-cyan-500/10 tw-blur-[120px]"
      ></div>
    </div>

    <div class="tw-relative tw-mx-auto tw-max-w-7xl tw-px-6">
      <div class="tw-grid tw-grid-cols-1 tw-gap-16 md:tw-grid-cols-2">
        
        <!-- LEFT -->        
        <div class="tw-relative">
          <div
            class="tw-rounded-3xl tw-from-white/5 tw-to-white/0 tw-p-6 tw-backdrop-blur-xl"
          >
            <img
              src="/i4.png"
              class="tw-rounded-2xl tw-opacity-90"
            />
          </div>
        </div>

        <!-- RIGHT -->
        <div>
          <p class="tw-mb-4 tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-white/10 tw-px-4 tw-py-1 tw-text-[12px] tw-text-white/60">
            INSTITUTIONAL INFRASTRUCTURE
          </p>

          <h1 class="tw-text-4xl tw-font-light tw-leading-tight tw-text-white md:tw-text-5xl">
            Designed for capital managers, <br />
            not retail traders.
          </h1>

          <p class="tw-mt-6 tw-max-w-xl tw-text-[14px] tw-text-white/60">
            CoreTerminal provides the tools required by institutional desks to manage capital, 
            enforce risk frameworks and deliver transparency to investors without compromising execution speed or control.
          </p>

          <div class="tw-mt-8 tw-flex tw-gap-4">
            <button @click="scrollTo('contact')" class="tw-rounded-full tw-bg-white tw-px-6 tw-py-2 tw-text-[13px] tw-font-medium tw-text-black">
              Request Institutional Access
            </button>
          </div>

          <div class="tw-mt-12 tw-flex tw-gap-12 tw-text-white">
            <div>
              <p class="tw-text-2xl tw-font-medium">Technology</p>
              <p class="tw-text-[12px] tw-text-white/50">Regulated-ready infrastructure</p>
            </div>
            <div>
              <p class="tw-text-2xl tw-font-medium">Strategy</p>
              <p class="tw-text-[12px] tw-text-white/50">Multi-strategy support</p>
            </div>
            <div>
              <p class="tw-text-2xl tw-font-medium">Realtime</p>
              <p class="tw-text-[12px] tw-text-white/50">Real-time reporting</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= TEAM / CAPABILITIES ================= -->
  <section class="tw-relative tw-bg-black tw-py-24 tw--mt-8 tw-overflow-hidden">
    <!-- Background glow -->
    <div class="tw-absolute tw-inset-0 tw-overflow-hidden">
      <div
        class="tw-absolute tw-left-1/2 tw-top-1/3 tw-h-[700px] tw-w-[700px] tw--translate-x-1/2 tw-rounded-full tw-bg-blue-600/20 tw-blur-[160px]"
      ></div>
    </div>

    <div class="tw-relative tw-mx-auto tw-max-w-7xl tw-px-6">
      <!-- Header -->
      <div class="tw-max-w-3xl">
        <div
          class="tw-mb-6 tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-white/10 tw-bg-white/5 tw-px-4 tw-py-1 tw-text-[12px] tw-text-white/60"
        >
          <span class="tw-text-blue-400">DV</span>
          <span>About CoreTerminal</span>
        </div>

        <h2 class="tw-text-3xl tw-font-light tw-leading-snug tw-text-white md:tw-text-4xl">
          Built by professionals
          <span class="tw-text-blue-400">Funds Managers </span>
          for professional trading
          <span class="tw-text-blue-400"> operations</span>.
        </h2>

        <p class="tw-mt-4 tw-text-[14px] tw-text-white/60">
          CoreTerminal was created by a team with deep experience in trading systems, risk management and institutional infrastructure, 
          focused on solving real operational challenges faced by hedge funds and asset managers.
        </p>
      </div>

      <!-- Cards -->
      <div class="tw-mt-20 tw-grid tw-gap-6 md:tw-grid-cols-3">
        <!-- Card 1 -->
        <div
          class="tw-rounded-3xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/5 tw-to-white/0 tw-p-8 tw-backdrop-blur-xl"
        >
          <div
            class="tw-mb-6 tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-xl tw-bg-blue-500/20 tw-text-blue-400"
          >
            ✦
          </div>

          <h3 class="tw-mb-2 tw-text-[15px] tw-font-medium tw-text-white">
            Monitoring
          </h3>

          <p class="tw-text-[13px] tw-text-white/60">
            Real-time monitoring of positions, balances, margin and exposure across all accounts.
          </p>
        </div>

        <!-- Card 2 (center highlight) -->
        <div
          class="tw-relative tw-rounded-3xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-blue-500/10 tw-to-white/0 tw-p-8 tw-backdrop-blur-xl"
        >
          <div
            class="tw-absolute tw-right-6 tw-top-6 tw-rounded-full tw-bg-blue-500 tw-px-4 tw-py-1 tw-text-[11px] tw-font-medium tw-text-black"
          >
            CORE
          </div>

          <div
            class="tw-mb-6 tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-xl tw-bg-blue-500/30 tw-text-blue-300"
          >
            ⚡
          </div>

          <h3 class="tw-mb-2 tw-text-[15px] tw-font-medium tw-text-white">
            Core Engine
          </h3>

          <p class="tw-text-[13px] tw-text-white/60">
            A robust execution and allocation engine designed for institutional workflows.
          </p>
        </div>

        <!-- Card 3 -->
        <div
          class="tw-rounded-3xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/5 tw-to-white/0 tw-p-8 tw-backdrop-blur-xl"
        >
          <div
            class="tw-mb-6 tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-xl tw-bg-blue-500/20 tw-text-blue-400"
          >
            ⧉
          </div>

          <h3 class="tw-mb-2 tw-text-[15px] tw-font-medium tw-text-white">
            Automated Oversight
          </h3>

          <p class="tw-text-[13px] tw-text-white/60">
            Automated reporting, alerts and controls for managers and compliance teams.
          </p>
        </div>
      </div>

    </div>
  </section>

  <!-- ================= INSIGHTS / BLOG ================= -->
  <section id="insights" class="tw-relative tw-bg-black tw-py-24 tw--mt-18">
    <!-- background glow -->
    <div class="tw-absolute tw-inset-0 tw-overflow-hidden">
      <div
        class="tw-absolute tw-top-1/2 tw-left-1/2 tw-h-[600px] tw-w-[600px] tw--translate-x-1/2 tw--translate-y-1/2 tw-rounded-full tw-bg-blue-600/10 tw-blur-[140px]"
      ></div>
    </div>

    <div class="tw-relative tw-mx-auto tw-max-w-7xl tw-px-6">
      <!-- Header -->
      <div class="tw-mx-auto tw-mb-20 tw-max-w-2xl tw-text-center">
        <p class="tw-mb-3 tw-text-[12px] tw-font-medium tw-tracking-wide tw-text-blue-400">
          OUR INSIGHTS
        </p>
        <h2 class="tw-text-3xl tw-font-light tw-text-white md:tw-text-4xl">
          Insights & Market Infrastructure
        </h2>
        <p class="tw-mt-4 tw-text-[14px] tw-text-white/60">
          Perspectives on institutional trading, portfolio management and modern trading infrastructure.
        </p>
      </div>

      <!-- Cards -->
      <div class="tw-grid tw-gap-8 md:tw-grid-cols-3">
        <!-- Card -->
        <article class="tw-group">
          <div
            class="tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/10 tw-bg-white/5"
          >
            <img
              src="/i3.png"
              alt=""
              class="tw-h-52 tw-w-full tw-object-cover tw-transition tw-duration-500 group-hover:tw-scale-105"
            />
          </div>

          <div class="tw-mt-5">
            <span
              class="tw-inline-flex tw-rounded-full tw-bg-blue-500/10 tw-px-3 tw-py-1 tw-text-[11px] tw-text-blue-400"
            >
              SYSTEM
            </span>

            <h3
              class="tw-mt-4 tw-text-lg tw-font-medium tw-leading-snug tw-text-white group-hover:tw-text-blue-400"
            >
              Designing multi-account trading systems at scale
            </h3>

            <p class="tw-mt-2 tw-text-[13px] tw-text-white/60">
              A real-world breakdown of how intelligent workflows eliminate
              bottlenecks and scale operations.
            </p>
          </div>
        </article>

        <!-- Card -->
        <article class="tw-group">
          <div
            class="tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/10 tw-bg-white/5"
          >
            <img
              src="/i2.png"
              alt=""
              class="tw-h-52 tw-w-full tw-object-cover tw-transition tw-duration-500 group-hover:tw-scale-105"
            />
          </div>

          <div class="tw-mt-5">
            <span
              class="tw-inline-flex tw-rounded-full tw-bg-blue-500/10 tw-px-3 tw-py-1 tw-text-[11px] tw-text-blue-400"
            >
              PLATFORM
            </span>

            <h3
              class="tw-mt-4 tw-text-lg tw-font-medium tw-leading-snug tw-text-white group-hover:tw-text-blue-400"
            >
              Separating execution from investor visibility
            </h3>

            <p class="tw-mt-2 tw-text-[13px] tw-text-white/60">
              Architecture principles behind automation platforms that scale
              without complexity.
            </p>
          </div>
        </article>

        <!-- Card -->
        <article class="tw-group">
          <div
            class="tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/10 tw-bg-white/5"
          >
            <img
              src="/i5.png"
              alt=""
              class="tw-h-52 tw-w-full tw-object-cover tw-transition tw-duration-500 group-hover:tw-scale-105"
            />
          </div>

          <div class="tw-mt-5">
            <span
              class="tw-inline-flex tw-rounded-full tw-bg-blue-500/10 tw-px-3 tw-py-1 tw-text-[11px] tw-text-blue-400"
            >
              RISK
            </span>

            <h3
              class="tw-mt-4 tw-text-lg tw-font-medium tw-leading-snug tw-text-white group-hover:tw-text-blue-400"
            >
              Managing risk across strategies and sub-accounts
            </h3>

            <p class="tw-mt-2 tw-text-[13px] tw-text-white/60">
              How businesses transition from manual processes to fully automated
              systems.
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ================= CONTACT ================= -->
  <section id="contact" class="tw-relative tw-bg-black tw-overflow-hidden">
    <!-- Background gradient -->
    <div class="tw-absolute tw-inset-0 tw-overflow-hidden tw-bg-gradient-to-b tw-from-[#0a0f2c] tw-via-[#060b1f] tw-to-black"></div>

    <div class="tw-relative tw-mx-auto tw-max-w-7xl tw-px-6 tw-py-32">
      <div class="tw-grid tw-grid-cols-1 tw-gap-16 lg:tw-grid-cols-2 tw-items-start">

        <!-- LEFT CONTENT -->
        <div>
          <p class="tw-mb-4 tw-text-xs tw-uppercase tw-tracking-widest tw-text-blue-400">
            Contact Us
          </p>

          <h2 class="tw-mb-12 tw-text-4xl tw-font-light tw-leading-tight tw-text-white">
            Let’s discuss your trading operation.
          </h2>

          <div class="tw-grid tw-grid-cols-1 tw-gap-8 sm:tw-grid-cols-2">
            <!-- Location -->
            <div class="tw-flex tw-gap-4">
              <div class="tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-lg tw-bg-blue-500/10 tw-text-blue-400">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <p class="tw-mb-1 tw-text-sm tw-font-medium tw-text-white">
                  Global infrastructure
                </p>
                <p class="tw-text-sm tw-text-white/60">
                  GI
                </p>
              </div>
            </div>

            <!-- Email -->
            <div class="tw-flex tw-gap-4">
              <div class="tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-lg tw-bg-blue-500/10 tw-text-blue-400">
                <i class="fa-solid fa-envelope"></i>
              </div>
              <div>
                <p class="tw-mb-1 tw-text-sm tw-font-medium tw-text-white">
                  Serving institutions worldwide
                </p>
                <p class="tw-text-sm tw-text-white/60">
                  SIW
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- FORM CARD -->
        <div class="tw-relative">
          <div class="tw-rounded-3xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/10 tw-to-white/0 tw-p-8 tw-backdrop-blur-xl">

            <h3 class="tw-mb-8 tw-text-xl tw-font-medium tw-text-white">
              Send us a Message
            </h3>

            <form class="tw-space-y-6" @submit.prevent="sendRequestMock">

              <!-- SUCCESS -->
              <div
                v-if="status === 'success'"
                class="tw-rounded-xl tw-border tw-border-green-500/30 tw-bg-green-500/10 tw-p-4 tw-text-sm tw-text-green-400"
              >
                <i class="fa-solid fa-circle-check tw-mr-2"></i>
                Request sent successfully. We are reviewing your request.
              </div>

              <!-- ERROR -->
              <div
                v-if="status === 'error'"
                class="tw-rounded-xl tw-border tw-border-red-500/30 tw-bg-red-500/10 tw-p-4 tw-text-sm tw-text-red-400"
              >
                <i class="fa-solid fa-triangle-exclamation tw-mr-2"></i>
                Something went wrong. Please try again.
              </div>

              <div>
                <label class="tw-mb-1 tw-block tw-text-xs tw-text-white/50">Company Name*</label>
                <input
                  v-model="form.company"
                  required
                  type="text"
                  placeholder="Adam Gelius"
                  class="tw-w-full tw-border-b tw-border-white/10 tw-bg-transparent tw-pb-2 tw-text-sm tw-text-white tw-placeholder-white/30 tw-outline-none focus:tw-border-blue-400"
                />
              </div>

              <div>
                <label class="tw-mb-1 tw-block tw-text-xs tw-text-white/50">Email*</label>
                <input
                  v-model="form.email"
                  required
                  type="email"
                  placeholder="example@yourmail.com"
                  class="tw-w-full tw-border-b tw-border-white/10 tw-bg-transparent tw-pb-2 tw-text-sm tw-text-white tw-placeholder-white/30 tw-outline-none focus:tw-border-blue-400"
                />
              </div>

              <div>
                <label class="tw-mb-1 tw-block tw-text-xs tw-text-white/50">Phone*</label>
                <input
                  v-model="form.phone"
                  required
                  type="tel"
                  placeholder="+885 1254 5211 552"
                  class="tw-w-full tw-border-b tw-border-white/10 tw-bg-transparent tw-pb-2 tw-text-sm tw-text-white tw-placeholder-white/30 tw-outline-none focus:tw-border-blue-400"
                />
              </div>

              <div>
                <label class="tw-mb-1 tw-block tw-text-xs tw-text-white/50">Message*</label>
                <textarea
                  v-model="form.message"
                  required
                  rows="3"
                  placeholder="type your message here"
                  class="tw-w-full tw-resize-none tw-border-b tw-border-white/10 tw-bg-transparent tw-pb-2 tw-text-sm tw-text-white tw-placeholder-white/30 tw-outline-none focus:tw-border-blue-400"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="status === 'loading'"
                class="tw-mt-4 tw-rounded-full tw-border tw-border-white/20 tw-px-8 tw-py-3 tw-text-sm tw-text-white hover:tw-bg-white/10 tw-transition disabled:tw-opacity-50"
              >
                <i
                  v-if="status === 'loading'"
                  class="fa-solid fa-spinner tw-animate-spin tw-mr-2"
                ></i>
                Send
              </button>

            </form>


          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= FOOTER ================= -->
  <footer class="tw-bg-black tw-w-full tw-py-16">
    <div class="tw-w-full tw-px-12 xl:tw-px-24 tw-text-[12px] tw-text-white/50">

      <!-- TOP ROW -->
      <div class="tw-flex tw-flex-col tw-gap-6 md:tw-flex-row md:tw-justify-between">
        <p>© 2026 CoreTerminal. Built for institutional trading.</p>
      </div>

      <!-- BOTTOM PARAGRAPH -->
      <p class="tw-mt-6 tw-max-w-none tw-leading-relaxed tw-text-white/40">
        Trading in Contracts for Difference (CFDs), Options, Futures, and other leveraged financial instruments involves a very high level of risk 
          and is not suitable for all investors. The use of leverage can work both for and against you and may result in substantial losses in a short period of time, 
          including the total loss of all deposited funds and, in certain circumstances, losses exceeding the initial investment. Market volatility, 
          price gaps, liquidity shortages, spread widening, slippage, delayed or failed executions, and adverse macroeconomic, geopolitical, 
          or market events may materially impact open positions. Past performance is not indicative of future results, and no trading strategy, system, 
          or methodology can guarantee profits or limit losses.<br>

        The services are provided under international regulatory frameworks, including Saint Vincent and the Grenadines and Panama, 
          which may differ materially from regulatory regimes in other jurisdictions. As a result, clients may not benefit from investor compensation schemes, 
          deposit protection mechanisms, mandatory dispute resolution processes, or regulatory safeguards available elsewhere. By engaging in trading activities, 
          the client expressly acknowledges and accepts that all trading decisions are made at their sole discretion and risk, and confirms that they possess the 
          financial capacity, experience, and technical knowledge required to understand and assume the risks involved. Under no circumstances shall the company, 
          its directors, officers, employees, affiliates, or service providers be liable for any direct, indirect, incidental, special, or consequential damages, 
          including but not limited to loss of capital, loss of profits, business interruption, or damages arising from market conditions or trading decisions.<br>

        The trading activities are conducted through a proprietary electronic trading platform and related technological infrastructure, which includes pricing engines, 
          execution systems, risk management modules, and third-party liquidity and data providers. While the platform is designed to facilitate order routing,
          price aggregation, and position management, the company does not warrant uninterrupted availability, error-free operation, or real-time accuracy of prices, 
          data feeds, or executions. System delays, hardware or software failures, internet connectivity issues, latency, cybersecurity events, 
          or maintenance procedures may result in execution delays, rejected orders, price discrepancies, or temporary unavailability of trading services. 
          The client acknowledges that the use of electronic trading systems introduces additional operational and technological risks, 
          for which the company accepts no liability, and agrees that all trading conducted via the platform is subject to these inherent risks.
      </p>

    </div>
  </footer>




</template>




<script setup lang="ts">

import { ref } from 'vue'

const form = ref({
  company: '',
  email: '',
  phone: '',
  message: '',
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

function sendRequestMock() {
  status.value = 'loading'

  // Simulación de request (1.5s)
  setTimeout(() => {
    // 🔁 cambia a 'error' si quieres probar error
    status.value = 'success'

    // reset form
    form.value = {
      company: '',
      email: '',
      phone: '',
      message: '',
    }
  }, 1500)
}


function goToTraderoom(): void {
  window.location.href = '/traderoom'
}


function scrollTo(id: string): void {
  const el = document.getElementById(id)
  if (!el) return

  const yOffset = -80 // altura navbar fixed
  const y =
    el.getBoundingClientRect().top + window.pageYOffset + yOffset

  window.scrollTo({
    top: y,
    behavior: 'smooth',
  })
}



</script>
