<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading...',
  },
  size: {
    type: String,
    default: 'medium', // small, medium, large
  },
});
</script>

<template>
  <div class="loading-container">
    <div :class="['spinner', `spinner-${size}`]"></div>
    <p class="loading-message">{{ message }}</p>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.spinner-small {
  width: 30px;
  height: 30px;
  border-width: 3px;
}

.spinner-medium {
  width: 50px;
  height: 50px;
  border-width: 4px;
}

.spinner-large {
  width: 70px;
  height: 70px;
  border-width: 5px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-message {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}
</style>
