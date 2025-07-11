<script setup></script>

<template>
  <div class="home">
    <div class="hero">
      <h1>👥 User Directory</h1>
      <p>A modern Vue.js application for browsing user profiles</p>
      <RouterLink to="/users" class="cta-button"> View Users </RouterLink>
    </div>

    <div class="features">
      <h2>Features</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <h3>🚀 Fast</h3>
          <p>Built with Vue 3 and Vite for lightning-fast performance</p>
        </div>
        <div class="feature-card">
          <h3>📱 Responsive</h3>
          <p>Works perfectly on desktop, tablet, and mobile devices</p>
        </div>
        <div class="feature-card">
          <h3>🌐 Real Data</h3>
          <p>Fetches live user data from external APIs</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

.hero {
  padding: 4rem 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #333;
}

.hero p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.cta-button {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: transform 0.2s;
}

.cta-button:hover {
  transform: translateY(-2px);
}

.features h2 {
  margin-bottom: 2rem;
  color: #333;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: #667eea;
}
</style>
