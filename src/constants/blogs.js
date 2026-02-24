const blogs = [
  {
    id: 'cve-2025-55184-and-cve-2025-55183',
    title:
      "CVE-2025-55184 and CVE-2025-55183: What They Are, Who's at Risk, and How to Patch Fast",
    excerpt:
      'React Server Components (RSC) have pushed the React ecosystem into a new era — but that power has expanded the security surface. Two follow-on CVEs affecting RSC packages demand immediate attention.',
    content: [
      {
        type: 'paragraph',
        text: 'React Server Components (RSC) have pushed the React ecosystem into a new era: more code runs on the server, more data flows through framework-owned endpoints, and more "magic" happens between the browser and your backend. That power is exactly why the security surface area has expanded. In December 2025, the React team (and vendors like Vercel) highlighted two follow-on vulnerabilities affecting React Server Components packages and the frameworks that ship them: CVE-2025-55184 (pre-auth DoS) and CVE-2025-55183 (source code exposure in specific configurations). This post breaks down what these CVEs mean in practical terms, what "affected" really looks like in a modern Next.js or RSC setup, and how to reduce risk quickly without turning your incident response into a week-long refactor.',
      },
      {
        type: 'heading',
        text: 'Quick context: why these CVEs showed up now',
      },
      {
        type: 'paragraph',
        text: 'If you followed the earlier "React2Shell" disclosure (CVE-2025-55182), you already know the pattern: once a major issue is reported, a lot of researchers and defenders start auditing nearby code paths and edge cases. Vercel\'s bulletin explicitly calls these "follow-on" findings after the earlier disclosure and stresses that they still require immediate patching.',
      },
      {
        type: 'paragraph',
        text: 'Two important points that help frame the risk: these two CVEs are not remote code execution — Vercel calls that out directly. But they still matter a lot operationally. One can hang your server process (availability impact), and the other can disclose server-side code under certain conditions (confidentiality impact).',
      },
      {
        type: 'heading',
        text: 'What software is affected',
      },
      {
        type: 'paragraph',
        text: 'Both CVEs target the React Server Components implementation packages: react-server-dom-webpack, react-server-dom-parcel, and react-server-dom-turbopack — and affect a set of React 19.x versions called out by NVD and vendor guidance.',
      },
      {
        type: 'heading',
        text: 'Why Next.js teams should care',
      },
      {
        type: 'paragraph',
        text: "In the RSC world, frameworks often provide endpoints and wiring that you didn't explicitly build yourself. React's guidance notes that apps can be impacted if they support React Server Components, even if they don't think they \"implemented\" specific endpoints.",
      },
      {
        type: 'paragraph',
        text: "Vercel also states that these issues affect React 19 and Next.js versions across major lines (13.x through 16.x) depending on how RSC is used. If you are running any RSC-capable stack (Next.js App Router, or other frameworks/plugins embedding RSC), you should assume you're in scope until you verify versions.",
      },
      {
        type: 'heading',
        text: 'CVE-2025-55184: pre-auth denial of service via unsafe deserialization',
      },
      {
        type: 'paragraph',
        text: 'CVE-2025-55184 is a pre-auth DoS vulnerability where a crafted HTTP request sent to a "Server Function" style endpoint can trigger behavior that results in an infinite loop, effectively hanging the server process and preventing it from serving future requests. NVD\'s description is very direct: unsafe deserialization of request payloads can cause an infinite loop that hangs the server process.',
      },
      {
        type: 'paragraph',
        text: 'A DoS bug is not just "the server slows down." In the RSC case, the impact can be worse because it is pre-auth (the attacker does not need a login session), it can hang a process (if your deployment model is a small number of long-lived Node processes, a hang can starve the service), and it can cascade (once health checks fail and instances restart, repeated requests can keep pushing the system into instability).',
      },
      {
        type: 'list',
        items: [
          'Sudden spikes in CPU with no corresponding traffic increase.',
          'Node process event loop lag and timeouts.',
          'Requests hanging rather than failing quickly.',
          "Autoscaling events that don't stabilize error rate.",
          'A pattern of repeated requests to RSC-related endpoints, often with unusual payload size or shape.',
        ],
      },
      {
        type: 'paragraph',
        text: "React's advisory lists CVE-2025-55184 as high severity with CVSS 7.5.",
      },
      {
        type: 'heading',
        text: 'CVE-2025-55183: source code exposure in specific configurations',
      },
      {
        type: 'paragraph',
        text: 'CVE-2025-55183 is an information leak where a specially crafted HTTP request to a vulnerable Server Function can cause the server to return the source code of Server Functions (or compiled server action code, depending on the framework and setup). In specific configurations, a crafted HTTP request may unsafely return the source code of any Server Function.',
      },
      {
        type: 'paragraph',
        text: 'Vercel frames the impact similarly and adds an important nuance: it can reveal business logic, but it would not expose secrets unless you hardcoded them into the server action\'s code. Even so, disclosed server code can still be damaging through business logic leakage, security weakness discovery, and follow-on exploits — source disclosure often turns "hard to find" vulnerabilities into "easy to weaponize" ones.',
      },
      {
        type: 'paragraph',
        text: "React's advisory lists CVE-2025-55183 as medium severity with CVSS 5.3.",
      },
      {
        type: 'heading',
        text: 'Am I vulnerable? A practical checklist',
      },
      {
        type: 'list',
        items: [
          "Are you using React 19 with RSC support? If your stack includes RSC packages (directly or via a framework), you're in the blast radius.",
          "Are you on Next.js App Router (or similar RSC-backed routing)? Vercel's bulletin specifically discusses App Router endpoints and Next.js affected ranges.",
          "What versions are you actually running in production? Don't trust package.json alone. Confirm deployed artifact versions (lockfile resolution, build cache, container layers, etc.).",
        ],
      },
      {
        type: 'heading',
        text: 'How to fix: patching guidance that actually works',
      },
      {
        type: 'paragraph',
        text: 'The priority order: upgrade to patched versions (this is the real fix), add WAF / edge protections to reduce exposure while rolling out updates, and assume potential disclosure and rotate sensitive material if there is any chance it could have been in code or logs.',
      },
      {
        type: 'paragraph',
        text: 'React\'s official advisory includes concrete Next.js upgrade commands for multiple release lines, pointing to specific patched versions (examples include next@14.2.35, next@15.0.7, and other 15.x/16.x patch versions). Vercel\'s bulletin also provides a "Patched versions" table across Next.js release trains, and notes that Pages Router apps are not affected.',
      },
      {
        type: 'paragraph',
        text: 'If you are using RSC via other frameworks, bundlers, or plugins, the key is still: move off the affected RSC package versions and onto patched ones. Vercel lists examples of other frameworks/plugins that can be affected if they embed or depend on RSC implementations.',
      },
      {
        type: 'heading',
        text: 'Mitigations while you patch',
      },
      {
        type: 'paragraph',
        text: 'Vercel says it deployed WAF rules to help protect projects hosted on Vercel and emphasizes that WAF rules are an additional layer, not a substitute for upgrading. If you are not on Vercel, use your CDN/WAF (Cloudflare, Fastly, Akamai, etc.) to block known malicious request patterns, rate limit suspicious clients, and add stricter request size limits on relevant routes.',
      },
      {
        type: 'list',
        items: [
          'Per-IP and per-token rate limits, especially unauthenticated.',
          'Timeouts around server function execution.',
          'Global concurrency caps for server action handlers.',
          'Health checks that detect event loop stalls and remove instances quickly.',
        ],
      },
      {
        type: 'heading',
        text: 'Post-patch hygiene: assume the worst',
      },
      {
        type: 'paragraph',
        text: 'If CVE-2025-55183 could have applied, treat it like a "code exposure" incident. Vercel notes secrets are only exposed if hardcoded, but "hardcoded secrets" happen more than teams want to admit — including accidentally (temporary debug keys, copied snippets, or test credentials).',
      },
      {
        type: 'list',
        items: [
          'Search server action / server function code for anything that looks like secrets (API keys, tokens, private URLs).',
          'Rotate environment variables that would be damaging if discovered.',
          'Check logs for unusual requests to RSC endpoints and for responses that look like code.',
          'Add targeted monitoring around RSC endpoints request volume, error rate, high CPU with low throughput, and long request durations.',
        ],
      },
      {
        type: 'heading',
        text: 'What not to do',
      },
      {
        type: 'paragraph',
        text: "Don't rely on \"we're behind auth\" unless you proved it — CVE-2025-55184 is pre-auth by design, and framework routing can expose endpoints you didn't expect. Don't assume your WAF fully solves it — even Vercel, while providing WAF protection, still requires upgrading. Don't treat source exposure as harmless — code disclosure accelerates future attacks, even without secrets.",
      },
      {
        type: 'heading',
        text: 'A simple action plan you can execute today',
      },
      {
        type: 'list',
        items: [
          'Inventory where React 19 RSC packages are used (directly or via Next.js / bundler plugins).',
          'Upgrade Next.js or your RSC packages to the patched versions for your release line.',
          'Deploy temporary protections (WAF rules, rate limits) during rollout.',
          'Rotate secrets if there is any chance they were hardcoded or could have been disclosed.',
          'Add monitoring specifically for RSC endpoints and server action routes.',
        ],
      },
      {
        type: 'paragraph',
        text: 'RSC is not "unsafe," but it is new enough that patterns are still settling, and attackers are paying attention because the payoff is high: server endpoints that parse complex payloads, often reachable without auth, inside widely deployed frameworks. CVE-2025-55184 (DoS) and CVE-2025-55183 (source disclosure) are exactly the sort of issues you should expect to see more of as the ecosystem matures. Patch quickly, add guardrails, and assume anything "automatic" in your framework deserves the same threat modeling you would apply to an API endpoint you wrote by hand.',
      },
    ],
    date: '2025-12-18',
    updatedAt: '2025-12-18',
    tags: ['React', 'RSC', 'Next.js', 'CVE', 'Security'],
  },
];

export default blogs;
