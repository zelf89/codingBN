import { ref } from 'vue';

export function useApi() {
  const loading = ref(false);
  const error = ref(null);

  async function execute(apiCall) {
    loading.value = true;
    error.value = null;

    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      error.value = err.message || 'An unexpected error occurred';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function clearError() {
    error.value = null;
  }

  return {
    loading,
    error,
    execute,
    clearError,
  };
}
