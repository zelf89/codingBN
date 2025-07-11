<script setup>
import { defineEmits } from 'vue';

defineProps({
  title: {
    type: String,
    default: 'Something went wrong',
  },
  message: {
    type: String,
    required: true,
  },
  showRetry: {
    type: Boolean,
    default: true,
  },
  retryText: {
    type: String,
    default: 'Try Again',
  },
});

const emit = defineEmits(['retry']);

function handleRetry() {
  emit('retry');
}
</script>

<template>
  <div class="error-container">
    <div class="error-icon">⚠️</div>
    <h3 class="error-title">{{ title }}</h3>
    <p class="error-message">{{ message }}</p>
    <button v-if="showRetry" @click="handleRetry" class="retry-button">
      {{ retryText }}
    </button>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 15px;
  margin: 1rem 0;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.error-title {
  color: #e53e3e;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.error-message {
  color: #744444;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 400px;
}

.retry-button {
  background: #e53e3e;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.retry-button:hover {
  background: #c53030;
  transform: translateY(-2px);
}
</style>
