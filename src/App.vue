<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header class="app-header">
      <nav class="main-nav">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/users" class="nav-link">Users</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
}

#app {
  min-height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.main-nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  padding: 0 2rem;
}

.nav-link {
  color: green;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
