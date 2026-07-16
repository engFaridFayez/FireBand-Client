import type { Show, Team } from "@/types/home";
import api from "./api";

export const HomeService = {
    getAllShows() {
        return api.get<Show[]>("shows/")
    },

    getShowById(id: number) {
        return api.get<Show>(`shows/${id}/`)
    },

    createShow(data: FormData) {
        return api.post<Show>("shows/", data)
    },

    editShow(id: number, data: FormData) {
        return api.put<Show>(`shows/${id}/`, data)
    },

    deleteShow(id: number) {
        return api.delete(`shows/${id}/`);
    },

    getAllTeam() {
        return api.get<Team[]>("team/")
    },

    getTeamMemberById(id: number) {
        return api.get<Team>(`team/${id}/`)
    },
    createTeamMember(data: FormData) {
        return api.post<Team>("team/", data)
    },
    editTeamMember(id: number, data: FormData) {
        return api.patch<Team>(`team/${id}/`, data);
    },
    deleteTeamMember(id: number) {
        return api.delete(`team/${id}/`);
    },
}