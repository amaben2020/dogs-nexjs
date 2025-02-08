import {
  fetchBreeds,
  fetchDogsByIds,
  generateMatch,
  login,
  logoutUser,
  searchDogs,
} from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

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

export const useLogin = () => {
  const router = useRouter();

  return useMutation<string, Error, any, unknown>({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      const data = await login(name, email);
      return data.data;
    },
    onSuccess: () => {
      toast.success(`Success`);

      router.push('/search');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
    onMutate: () => {
      toast.loading('Please wait...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await logoutUser();
    },
    onSuccess: () => {
      toast.success(`Success`);

      queryClient.invalidateQueries();
      router.push('/login');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
    onMutate: () => {
      toast.loading('Please wait...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
};
