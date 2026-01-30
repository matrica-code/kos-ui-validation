import { useEffect, useState } from 'react';

import { BeverageContainer, getBeverageContainer } from './beverage-container';

interface UseBeverageContainerResult {
  model: BeverageContainer | null;
  loading: boolean;
  error: Error | null;
}

export const useStandaloneBeverageContainer = (): UseBeverageContainerResult => {
  const [model, setModel] = useState<BeverageContainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const container = getBeverageContainer();

    if (container.loaded) {
      setModel(container);
      setLoading(false);
      return;
    }

    container
      .load()
      .then(() => {
        setModel(container);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });
  }, []);

  return { model, loading, error };
};
