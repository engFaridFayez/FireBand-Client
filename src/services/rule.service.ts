import api from "./api";
import type { Rule } from "@/types/rule";

class RuleService {
    async getRules(): Promise<Rule[]> {
        const { data } = await api.get("/rules/");
        return data;
    }

    async getRule(id: number): Promise<Rule> {
        const { data } = await api.get(`/rules/${id}/`);
        return data;
    }

    async createRule(data: FormData): Promise<Rule> {
        const response = await api.post("/rules/", data);
        return response.data;
    }

    async updateRule(id: number, data: FormData): Promise<Rule> {
        const response = await api.put(`/rules/${id}/`, data);
        return response.data;
    }

    async deleteRule(id: number): Promise<void> {
        await api.delete(`/rules/${id}/`);
    }
}

export default new RuleService();