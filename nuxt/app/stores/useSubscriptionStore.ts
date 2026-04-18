import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSubscriptionStore = defineStore('subscription', () => {
  const selectedPlan = ref<any>(null)
  const billingCycle = ref<string>('annual')

  function setPlan(planData: any, cycle: string) {
    selectedPlan.value = planData
    billingCycle.value = cycle
  }

  function clearPlan() {
    selectedPlan.value = null
  }

  return {
    selectedPlan,
    billingCycle,
    setPlan,
    clearPlan
  }
})
