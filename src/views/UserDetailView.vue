<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Reactive data
const user = ref(null);
const userPosts = ref([]);
const loading = ref(false);
const error = ref(null);
const activeTab = ref('profile');

// Get user ID from route parameters
const userId = route.params.id;

// Fetch user details
async function fetchUser() {
  loading.value = true;
  error.value = null;

  try {
    // Fetch user details
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!userResponse.ok) throw new Error('User not found');

    // Fetch user's posts
    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    if (!postsResponse.ok) throw new Error('Posts not found');

    user.value = await userResponse.json();
    userPosts.value = await postsResponse.json();
  } catch (err) {
    error.value = 'Could not load user details. Please try again.';
    console.error('Error fetching user:', err);
  } finally {
    loading.value = false;
  }
}

// Go back to users list
function goBack() {
  router.push('/users');
}

// Load user when component mounts
onMounted(() => {
  fetchUser();
});

// Watch for route changes (if user navigates to different user)
watch(
  () => route.params.id,
  () => {
    fetchUser();
  }
);
</script>

<template>
  <div class="user-detail">
    <!-- Back Button -->
    <button @click="goBack" class="back-btn">← Back to Users</button>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading user details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">❌</div>
      <h3>User Not Found</h3>
      <p>{{ error }}</p>
      <button @click="fetchUser" class="retry-btn">Try Again</button>
    </div>

    <!-- User Details -->
    <div v-else-if="user" class="user-profile">
      <!-- User Header -->
      <div class="user-header">
        <div class="user-avatar">
          {{ user.name.charAt(0).toUpperCase() }}
        </div>
        <div class="user-basic-info">
          <h1>{{ user.name }}</h1>
          <p class="username">@{{ user.username }}</p>
          <p class="user-email">{{ user.email }}</p>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button
          @click="activeTab = 'profile'"
          :class="{ active: activeTab === 'profile' }"
          class="tab-btn"
        >
          👤 Profile
        </button>
        <button
          @click="activeTab = 'contact'"
          :class="{ active: activeTab === 'contact' }"
          class="tab-btn"
        >
          📞 Contact
        </button>
        <button
          @click="activeTab = 'posts'"
          :class="{ active: activeTab === 'posts' }"
          class="tab-btn"
        >
          📝 Posts ({{ userPosts.length }})
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" class="profile-tab">
          <div class="info-grid">
            <div class="info-card">
              <h3>🏢 Company</h3>
              <p>
                <strong>{{ user.company.name }}</strong>
              </p>
              <p>{{ user.company.catchPhrase }}</p>
              <small>{{ user.company.bs }}</small>
            </div>

            <div class="info-card">
              <h3>🌐 Website</h3>
              <p>
                <a
                  :href="`http://${user.website}`"
                  target="_blank"
                  class="website-link"
                >
                  {{ user.website }}
                </a>
              </p>
            </div>

            <div class="info-card">
              <h3>📍 Address</h3>
              <p>{{ user.address.street }}, {{ user.address.suite }}</p>
              <p>{{ user.address.city }}, {{ user.address.zipcode }}</p>
              <small
                >Coordinates: {{ user.address.geo.lat }},
                {{ user.address.geo.lng }}</small
              >
            </div>
          </div>
        </div>

        <!-- Contact Tab -->
        <div v-if="activeTab === 'contact'" class="contact-tab">
          <div class="contact-methods">
            <div class="contact-card">
              <div class="contact-icon">📧</div>
              <h3>Email</h3>
              <p>{{ user.email }}</p>
              <a :href="`mailto:${user.email}`" class="contact-btn"
                >Send Email</a
              >
            </div>

            <div class="contact-card">
              <div class="contact-icon">📞</div>
              <h3>Phone</h3>
              <p>{{ user.phone }}</p>
              <a :href="`tel:${user.phone}`" class="contact-btn">Call Now</a>
            </div>

            <div class="contact-card">
              <div class="contact-icon">🌐</div>
              <h3>Website</h3>
              <p>{{ user.website }}</p>
              <a
                :href="`http://${user.website}`"
                target="_blank"
                class="contact-btn"
                >Visit Site</a
              >
            </div>
          </div>
        </div>

        <!-- Posts Tab -->
        <div v-if="activeTab === 'posts'" class="posts-tab">
          <h3>Recent Posts</h3>
          <div v-if="userPosts.length > 0" class="posts-list">
            <div v-for="post in userPosts" :key="post.id" class="post-card">
              <h4>{{ post.title }}</h4>
              <p>{{ post.body }}</p>
              <small>Post #{{ post.id }}</small>
            </div>
          </div>
          <div v-else class="no-posts">
            <p>No posts available for this user.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-detail {
  max-width: 800px;
  margin: 0 auto;
}

.back-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #5a6268;
  transform: translateY(-2px);
}

/* Loading and Error States */
.loading-state,
.error-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.retry-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 1rem;
}

/* User Profile */
.user-profile {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.user-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
}

.user-basic-info h1 {
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.username {
  opacity: 0.8;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.user-email {
  opacity: 0.9;
  font-size: 1.1rem;
}

/* Tab Navigation */
.tab-navigation {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.tab-btn {
  background: none;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  transition: all 0.3s;
  border-bottom: 3px solid transparent;
}

.tab-btn:hover {
  color: #667eea;
  background: #e9ecef;
}

.tab-btn.active {
  color: #667eea;
  border-bottom-color: #667eea;
  background: white;
}

/* Tab Content */
.tab-content {
  padding: 2rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.info-card h3 {
  margin-bottom: 1rem;
  color: #333;
}

.website-link {
  color: #667eea;
  text-decoration: none;
}

.website-link:hover {
  text-decoration: underline;
}

/* Contact Tab */
.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.contact-card {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 15px;
  transition: transform 0.3s;
}

.contact-card:hover {
  transform: translateY(-5px);
}

.contact-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.contact-card h3 {
  margin-bottom: 1rem;
  color: #333;
}

.contact-btn {
  background: #667eea;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  display: inline-block;
  margin-top: 1rem;
  transition: all 0.3s;
}

.contact-btn:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

/* Posts Tab */
.posts-tab h3 {
  margin-bottom: 2rem;
  color: #333;
}

.posts-list {
  display: grid;
  gap: 1.5rem;
}

.post-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.post-card h4 {
  margin-bottom: 1rem;
  color: #333;
  text-transform: capitalize;
}

.post-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.post-card small {
  color: #999;
}

.no-posts {
  text-align: center;
  padding: 3rem;
  color: #666;
}

/* Responsive Design */
@media (max-width: 768px) {
  .user-header {
    flex-direction: column;
    text-align: center;
  }

  .user-basic-info h1 {
    font-size: 2rem;
  }

  .tab-navigation {
    flex-direction: column;
  }

  .info-grid,
  .contact-methods {
    grid-template-columns: 1fr;
  }
}
</style>
