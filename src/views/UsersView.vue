<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import { useApi } from '../composables/useApi';

const users = ref([]);
const { loading, error, execute, clearError } = useApi();

async function fetchUsers() {
  try {
    await execute(async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      users.value = data;
      return data;
    });
  } catch (err) {
    console.error('Failed to fetch users:', err);
  }
}

function handleRetry() {
  clearError();
  fetchUsers();
}

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="users-page">
    <div class="page-header">
      <h1>👥 User Directory</h1>
      <p>Browse our community members</p>
      <button @click="handleRetry" class="refresh-btn" :disabled="loading">
        🔄 {{ loading ? 'Refreshing...' : 'Refresh' }}
      </button>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="loading" message="Loading users..." size="large" />

    <!-- Error State -->
    <ErrorMessage
      v-else-if="error"
      title="Failed to Load Users"
      :message="error"
      @retry="handleRetry"
    />

    <!-- Success State -->
    <div v-else-if="users.length > 0" class="users-grid">
      <div v-for="user in users" :key="user.id" class="user-card">
        <div class="user-avatar">
          {{ user.name.charAt(0).toUpperCase() }}
        </div>

        <div class="user-info">
          <h3>{{ user.name }}</h3>
          <p class="user-email">{{ user.email }}</p>
          <p class="user-company">{{ user.company.name }}</p>
          <p class="user-location">📍 {{ user.address.city }}</p>
        </div>

        <div class="user-actions">
          <RouterLink :to="`/users/${user.id}`" class="view-profile-btn">
            View Profile
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon">👤</div>
      <h3>No Users Found</h3>
      <p>There are no users to display at the moment.</p>
      <button @click="handleRetry" class="retry-btn">Refresh Data</button>
    </div>
  </div>
</template>

<style scoped>
/* Keep existing styles from previous UsersView.vue */
.users-page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.page-header p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.refresh-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.refresh-btn:hover:not(:disabled) {
  background: #5a6fd8;
  transform: translateY(-2px);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.user-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.user-info h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.user-email {
  color: #667eea;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.user-company {
  color: #666;
  margin-bottom: 0.5rem;
}

.user-location {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.view-profile-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  transition: transform 0.2s;
}

.view-profile-btn:hover {
  transform: translateY(-2px);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  color: #666;
  margin-bottom: 1rem;
}

.retry-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .users-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 2rem;
  }
}
</style>
