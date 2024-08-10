import apiClient from '../utils/apiClient';

export const fetchCodeforcesProblems = async () => {
  try {
    const response = await apiClient.get('https://codeforces.com/api/problemset.problems');
    if (response.data.status === 'OK') {
      return response.data.result.problems;
    } else {
      throw new Error(response.data.comment);
    }
  } catch (error) {
    console.error('Failed to fetch problems:', error);
    throw error;
  }
};
