<script setup>
import { ref } from 'vue';

// Application statistics (could come from an API in a real app)
const appStats = ref({
  totalUsers: 10,
  totalPosts: 100,
  version: '1.0.0',
  lastUpdated: '2024-01-15',
});

// Tech stack information
const techStack = ref([
  {
    name: 'Vue 3',
    icon: '⚡',
    description: 'Progressive JavaScript framework',
  },
  { name: 'Vite', icon: '🚀', description: 'Fast build tool and dev server' },
  { name: 'Vue Router', icon: '🛣️', description: 'Client-side routing' },
  { name: 'JavaScript', icon: '📝', description: 'Modern ES6+ features' },
  { name: 'CSS3', icon: '🎨', description: 'Modern styling and animations' },
]);

// Team members (example data)
const team = ref([
  { name: 'Alex Chen', role: 'Frontend Developer', avatar: 'A' },
  { name: 'Sarah Johnson', role: 'UI/UX Designer', avatar: 'S' },
  { name: 'Mike Rodriguez', role: 'Backend Developer', avatar: 'M' },
]);
</script>

<template>
  <div class="about-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1>About User Directory</h1>
      <p class="hero-subtitle">
        A modern web application built with Vue 3 and cutting-edge technologies
      </p>
    </div>

    <!-- App Overview -->
    <div class="section">
      <h2>📱 What is User Directory?</h2>
      <div class="overview-grid">
        <div class="overview-card">
          <div class="card-icon">👥</div>
          <h3>User Management</h3>
          <p>
            Browse and view detailed profiles of users from our community. Each
            profile includes contact information, company details, and recent
            posts.
          </p>
        </div>

        <div class="overview-card">
          <div class="card-icon">🌐</div>
          <h3>Real-time Data</h3>
          <p>
            All user information is fetched from live APIs, ensuring you always
            see the most up-to-date information available.
          </p>
        </div>

        <div class="overview-card">
          <div class="card-icon">📱</div>
          <h3>Responsive Design</h3>
          <p>
            Works perfectly on desktop, tablet, and mobile devices with a
            modern, intuitive interface.
          </p>
        </div>
      </div>
    </div>

    <!-- App Statistics -->
    <div class="section">
      <h2>📊 Application Statistics</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ appStats.totalUsers }}</div>
          <div class="stat-label">Total Users</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ appStats.totalPosts }}</div>
          <div class="stat-label">Total Posts</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ appStats.version }}</div>
          <div class="stat-label">Version</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">2024</div>
          <div class="stat-label">Year Built</div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="cta-section">
      <h2>Ready to Explore?</h2>
      <p>Start browsing our user directory and discover amazing profiles!</p>
      <RouterLink to="/users" class="cta-button"> View All Users </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 1000px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Section Styling */
.section {
  background: white;
  padding: 3rem 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
}

/* Overview Grid */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.overview-card {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 15px;
  transition: transform 0.3s;
}

.overview-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.overview-card h3 {
  margin-bottom: 1rem;
  color: #333;
}

/* Statistics Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border-radius: 15px;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: scale(1.05);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

/* Technology Grid */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.tech-card {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.tech-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.tech-card h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

/* Call to Action */
.cta-section {
  text-align: center;
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.cta-section h2 {
  margin-bottom: 1rem;
}

.cta-button {
  background: white;
  color: #28a745;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: bold;
  transition: transform 0.3s;
  display: inline-block;
  margin-top: 1rem;
}

.cta-button:hover {
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .section {
    padding: 2rem 1rem;
  }

  .overview-grid,
  .stats-grid,
  .tech-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
