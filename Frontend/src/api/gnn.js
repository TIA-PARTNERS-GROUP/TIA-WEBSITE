import api from './axios';

export function getComplementaryPartners(userId) {
    return api.get(`/gnn/user/${userId}/complementary-partners`);
};

export function getAlliancePartners(projectId) {
    return api.get(`/gnn/project/${projectId}/alliance-partners`);
};

export function getMastermindPartners(userId) {
    return api.get(`/gnn/user/${userId}/mastermind-partners`);
};