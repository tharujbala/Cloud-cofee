# Coffee Shop Ordering Frontend

An artisanal, production-ready coffee ordering web application featuring a real-time **Interactive Drink Visualizer**, a **9-Step Custom Cup Builder**, dynamic price calculation, shopping cart with persistent storage, checkout simulation, and live order tracking.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Local Setup & Development](#local-setup--development)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Docker & Containerization](#docker--containerization)
- [Future DevOps Architecture (CI/CD)](#future-devops-architecture-cicd)
  - [Pipeline Flow](#pipeline-flow)
  - [Kubernetes Manifests](#kubernetes-manifests)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Overview

**Coffee Shop Ordering Frontend** ("Aura Coffee Artisan Roasters") is built with a warm minimal aesthetic using a refined palette of coffee browns, cream, off-white, and soft beige. It eliminates generic "AI slop" in favor of bespoke typography, WCAG AA contrast, and zero-pill metadata discipline.

The application operates entirely on the client side with robust mock data and `localStorage` persistence, while being fully structured for future full-stack integration and automated cloud deployment.

---

## Key Features

1. **Interactive Drink Visualizer**
   - Live SVG and CSS fluid rendering with dynamic height based on cup size (Small 8oz, Medium 12oz, Large 16oz, Extra Large 20oz).
   - Real-time layer representation: Espresso/Coffee base, Milk blend gradient, Micro-foam / Crema, Ice cubes with condensation drops, Syrup foundation, and Toppings (Whipped cream, Cocoa powder, Cinnamon, Caramel drizzle, Whole beans).
   - 4 Interactive Perspectives:
     - **Front View**: Cross-section glass gradient view with rising steam.
     - **3D Angle**: Isometric tilted perspective with realistic rim depth.
     - **Top Art**: Barista latte art pour and crema view from above.
     - **Layers**: Volumetric blueprint ratios and ingredient percentages.
   - Live ingredients chips beside the visualizer.

2. **9-Step Custom Cup Builder**
   - **Step 1: Drink Type** (Espresso, Latte, Cappuccino, Mocha, Cold Brew, Iced Coffee)
   - **Step 2: Cup Size** (Small 8oz, Medium 12oz, Large 16oz, Extra Large 20oz)
   - **Step 3: Milk Option** (Whole, Skim, Almond, Oat, Soy, No Milk)
   - **Step 4: Coffee Strength** (Light, Regular, Strong, Extra Strong)
   - **Step 5: Sugar Level** (No Sugar, Low, Normal, Extra)
   - **Step 6: Syrup Infusion** (Vanilla, Caramel, Hazelnut, Chocolate, None)
   - **Step 7: Toppings** (Whipped Cream, Chocolate Powder, Caramel Drizzle, Cinnamon, Coffee Beans)
   - **Step 8: Temperature** (Hot, Warm, Cold, Extra Cold)
   - **Step 9: Ice Level** (No Ice, Light Ice, Normal Ice, Extra Ice)
   - Guided step-by-step mode or "Show All Steps" quick configurator.
   - Quick one-click Barista Presets (*Bourbon Oat Latte*, *Iced Caramel Cloud*, *Purist Quad Espresso*).

3. **Dynamic Price Calculation**
   - Transparent breakdown calculating in Indian Rupee (₹ INR):
     - Base drink price (₹180–₹320)
     - Size adjustments (+`₹30`–`₹90`)
     - Alternative plant milk upcharge (+`₹50`)
     - Extra espresso shots (+`₹40`–`₹80`)
     - Artisanal syrups (+`₹35`)
     - Gourmet toppings (+`₹30` each)
   - Live itemized subtotal, GST (5%), and final order totals.

4. **Persistent Shopping Cart**
   - Slide-out drawer with quantity steppers, itemized customization notes, and removal options.
   - Backed by browser `localStorage` so items survive page reloads.

5. **Frontend Checkout Experience**
   - Customer name, phone number, and special instructions.
   - Fulfillment selection: **Pickup Bar** vs. **Dine In**.
   - Payment method selection: **Credit/Debit Card**, **UPI / QR**, **Cash on Pickup**.
   - Form validation with clear error feedback.
   - Post-order confirmation with order reference (`#RF-XXXX`), estimated preparation time, and celebratory confetti.

6. **Order History & Status Tracker**
   - Local tracking of active and historical orders.
   - Live status indicators (`Preparing`, `Ready`, `Completed`).
   - Interactive **Simulate Status** control to test workflow transitions.

---

## Technology Stack

- **Framework**: React 19 (Functional components, Hooks, Context API)
- **Bundler & Tooling**: Vite 8 with `@vitejs/plugin-react`
- **Language**: TypeScript 5+ (Strict mode, explicit interfaces)
- **Styling**: Tailwind CSS v4 with custom warm coffee color system and keyframe animations
- **Icons**: Lucide React
- **Celebrations**: Canvas Confetti
- **Testing**: Vitest, React Testing Library, and JSDOM
- **Containerization**: Multi-stage Docker with Node 22 Alpine & Nginx Alpine

---

## Project Architecture

```
coffee-shop-ordering-frontend/
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── index.html
├── metadata.json
├── nginx.conf
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── README.md
└── src/
    ├── App.tsx                     # Main layout & router orchestration
    ├── main.tsx                    # Application entry point
    ├── index.css                   # Tailwind theme & steam animations
    ├── types/
    │   └── index.ts                # TypeScript domain models & interfaces
    ├── data/
    │   └── drinks.ts               # Curated 16+ specialty coffee items
    ├── utils/
    │   └── pricing.ts              # Price calculation engine & currency formatters
    ├── context/
    │   ├── CartContext.tsx         # Cart state & localStorage sync
    │   ├── OrderContext.tsx        # Orders state & status simulation
    │   └── ToastContext.tsx        # Floating non-intrusive alerts
    ├── components/
    │   ├── Navbar.tsx              # Top bar contract & responsive drawer
    │   ├── Hero.tsx                # High-impact coffee headline & CTAs
    │   ├── DrinkVisualizer.tsx     # 4-view live fluid cup rendering
    │   ├── CupBuilder.tsx          # 9-step customization configurator
    │   ├── DrinkCard.tsx           # Drink display card with fallback
    │   ├── DrinkGrid.tsx           # Category tabs, search & sorting
    │   ├── CartDrawer.tsx          # Slide-out shopping bag
    │   ├── CheckoutModal.tsx       # Checkout form & celebration dialog
    │   ├── OrderHistory.tsx        # Order list & status tracking
    │   ├── AboutSection.tsx        # Terroir, roasting & location details
    │   ├── Footer.tsx              # Minimalist coffeehouse footer
    │   └── Toast.tsx               # Feedback notifications
    └── test/
        ├── setup.ts                # Jest-DOM matchers setup
        ├── pricing.test.ts         # Price calculation unit tests
        ├── DrinkCard.test.tsx      # DrinkCard rendering & interaction tests
        ├── Cart.test.tsx           # Cart context & stepper tests
        └── CupBuilder.test.tsx     # Custom cup builder test suite
```

---

## Local Setup & Development

### Prerequisites

- Node.js `20.x` or `22.x`
- npm `10.x` or later

### Installation

```bash
# 1. Clone repository
git clone https://github.com/your-org/coffee-shop-ordering-frontend.git
cd coffee-shop-ordering-frontend

# 2. Install dependencies
npm install

# 3. Start local development server on port 3000
npm run dev
```

Visit `http://localhost:3000` in your web browser.

---

## Available Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts Vite development server on port 3000 (`--host=0.0.0.0`) |
| `npm run build` | Compiles TypeScript and creates optimized production assets in `/dist` |
| `npm run preview` | Locally serves the `/dist` production build |
| `npm run lint` | Runs TypeScript compiler checks without emitting files (`tsc --noEmit`) |
| `npm run test` | Executes unit test suites using Vitest |

---

## Testing

Run unit tests via Vitest:

```bash
npm run test
```

### Test Coverage Highlights

- **`pricing.test.ts`**: Validates base drink pricing, cup size scaling, alternative milk upcharges, extra espresso shots, syrups, and topping additions.
- **`DrinkCard.test.tsx`**: Verifies drink metadata display, currency rendering, and Customize event handlers.
- **`Cart.test.tsx`**: Tests cart item addition, duplicate bundling, quantity adjustments, tax calculations, and item removal.
- **`CupBuilder.test.tsx`**: Tests step progression, option selection, and visualizer synchronization.

---

## Docker & Containerization

The repository includes an optimized multi-stage `Dockerfile`:
- **Stage 1 (Builder)**: Uses `node:22-alpine` to install dependencies and run `npm run build`.
- **Stage 2 (Runtime)**: Uses lightweight `nginx:alpine` to serve `/dist` assets with Gzip compression, client-side SPA routing (`try_files`), and a dedicated health check endpoint at `/healthz`.

### Building the Docker Image

```bash
docker build -t coffee-shop-frontend:latest .
```

### Running the Container

```bash
docker run -d -p 8080:80 --name coffee-app coffee-shop-frontend:latest
```

Open your browser to `http://localhost:8080`.

### Verifying Container Health

```bash
curl -i http://localhost:8080/healthz
# Response: HTTP/1.1 200 OK -> healthy
```

---

## Future DevOps Architecture (CI/CD)

The project is structured for full enterprise DevOps deployment:

```
+-----------+       +--------+       +---------+       +--------------+
| Developer | ----> | GitHub | ----> | Jenkins | ----> | Docker Image |
+-----------+       +--------+       +---------+       +--------------+
                                                              |
                                                              v
+-----------------------+       +---------------+       +------------+
| Kubernetes Deployment | <---- | Ansible Config| <---- | Container  |
| (EKS / GKE / Minikube)|       | & Terraform   |       | Registry   |
+-----------------------+       +---------------+       +------------+
```

### 1. Developer pushes code to GitHub
- Branch protection on `main` requires peer review and CI check passes.
- GitHub Webhook triggers the Jenkins pipeline.

### 2. Jenkins Automated Pipeline (`Jenkinsfile`)
```groovy
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install & Lint') {
            steps {
                sh 'npm ci'
                sh 'npm run lint'
            }
        }
        stage('Unit Tests') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t registry.example.com/coffee-shop/frontend:${BUILD_NUMBER} .'
            }
        }
        stage('Push to Container Registry') {
            steps {
                sh 'docker push registry.example.com/coffee-shop/frontend:${BUILD_NUMBER}'
            }
        }
        stage('Deploy via Terraform & Ansible') {
            steps {
                sh 'terraform -chdir=deploy/terraform apply -auto-approve'
                sh 'ansible-playbook -i deploy/ansible/hosts deploy/ansible/deploy.yml'
            }
        }
    }
}
```

### 3. Kubernetes Deployment Sample (`deployment.yaml`)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: coffee-shop-frontend
  labels:
    app: coffee-shop-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: coffee-shop-frontend
  template:
    metadata:
      labels:
        app: coffee-shop-frontend
    spec:
      containers:
      - name: web
        image: registry.example.com/coffee-shop/frontend:latest
        ports:
        - containerPort: 80
        livenessProbe:
          httpGet:
            path: /healthz
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 15
        readinessProbe:
          httpGet:
            path: /healthz
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 10
        resources:
          limits:
            cpu: "250m"
            memory: "128Mi"
          requests:
            cpu: "50m"
            memory: "64Mi"
---
apiVersion: v1
kind: Service
metadata:
  name: coffee-shop-service
spec:
  type: LoadBalancer
  selector:
    app: coffee-shop-frontend
  ports:
  - port: 80
    targetPort: 80
```

---

## Environment Variables

Configurable settings are documented in `.env.example`:

```bash
# Application URL for public links or API proxies
APP_URL="http://localhost:3000"
```

No API keys are required for this frontend-only build.

---

## License

Apache-2.0
