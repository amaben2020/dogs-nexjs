import {
  fetchBreeds,
  fetchDogsByIds,
  generateMatch,
  searchDogs,
} from '@/services/api';
import { useQuery, useMutation } from '@tanstack/react-query';

export const useBreeds = () => {
  return useQuery({
    queryKey: ['breeds'],
    queryFn: fetchBreeds,
    staleTime: 1000 * 60 * 10, // Cache breeds for 10 minutes
  });
};

export const useSearchDogs = (
  params: Record<string, string | number | string[] | undefined>
) => {
  return useQuery({
    queryKey: ['dogs', params],
    queryFn: () => searchDogs(params),
    enabled: Boolean(params), // Avoids unnecessary queries
  });
};

export const useFetchDogsByIds = (ids: string[]) => {
  return useQuery<Dog[], Error>({
    queryKey: ['dogsByIds', ids],
    queryFn: () => fetchDogsByIds(ids),
    enabled: ids.length > 0, // Prevents unnecessary API calls
  });
};

export const useGenerateMatch = () => {
  return useMutation({
    mutationFn: (ids: string[]) => generateMatch(ids),
    onSuccess: (data) => {
      console.log('Match generated:', data);
    },
    onError: (error) => {
      console.error('Error generating match:', error);
    },
  });
};
