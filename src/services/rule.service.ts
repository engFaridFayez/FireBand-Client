import api from "./api";
import type { Rule } from "@/types/rule";

class RuleService {
    async getRules() {
        const res = await api.get<Rule[]>("/rules/");
        return res.data;
    }

    async getRule(id: number) {
        const res = await api.get<Rule>(`/rules/${id}/`);
        return res.data;
    }

    async createRule(data: object) {
        const res = await api.post<Rule>("/rules/", data);
        return res.data;
    }

    async updateRule(id: number, data: object) {
        const res = await api.patch<Rule>(`/rules/${id}/`, data);
        return res.data;
    }

    async deleteRule(id: number) {
        await api.delete(`/rules/${id}/`);
    }
}

export default new RuleService();