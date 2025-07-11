<script setup>
import { ref, onErrorCaptured } from 'vue';
import ErrorMessage from './ErrorMessage.vue';

const hasError = ref(false);
const errorMessage = ref('');

onErrorCaptured((error) => {
  hasError.value = true;
  errorMessage.value = error.message || 'An unexpected error occurred';
  console.error('Component error:', error);
  return false; // Prevent error from propagating
});

function handleErrorRetry() {
  hasError.value = false;
  errorMessage.value = '';
  // Optionally reload the page or reset state
  window.location.reload();
}
</script>

<template>
  <div class="app-layout">
    <ErrorMessage
      v-if="hasError"
      title="Application Error"
      :message="errorMessage"
      retry-text="Reload Page"
      @retry="handleErrorRetry"
    />
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
}
</style>
