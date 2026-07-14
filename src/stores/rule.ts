import { defineStore } from "pinia";
import { ref } from "vue";

import RuleService from "@/services/rule.service";
import type { Rule } from "@/types/rule";

export const useRuleStore = defineStore("rule", () => {
  const rules = ref<Rule[]>([]);
  const selectedRule = ref<Rule | null>(null);

  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchRules() {
    loading.value = true;
    error.value = null;

    try {
      rules.value = await RuleService.getRules();
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
    } finally {
      loading.value = false;
    }
  }

  async function fetchRule(id: number) {
    loading.value = true;
    error.value = null;

    try {
      selectedRule.value = await RuleService.getRule(id);
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
    } finally {
      loading.value = false;
    }
  }

  async function createRule(data: FormData) {
    loading.value = true;
    error.value = null;

    try {
      const rule = await RuleService.createRule(data);

      rules.value.push(rule);

      return rule;
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateRule(id: number, data: FormData) {
    loading.value = true;
    error.value = null;

    try {
      const updated = await RuleService.updateRule(id, data);

      const index = rules.value.findIndex((r) => r.id === updated.id);

      if (index !== -1) {
        rules.value[index] = updated;
      }

      selectedRule.value = updated;

      return updated;
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteRule(id: number) {
    loading.value = true;
    error.value = null;

    try {
      await RuleService.deleteRule(id);

      rules.value = rules.value.filter((r) => r.id !== id);

      if (selectedRule.value?.id === id) {
        selectedRule.value = null;
      }
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    rules,
    selectedRule,

    loading,
    error,

    fetchRules,
    fetchRule,
    createRule,
    updateRule,
    deleteRule,
  };
});