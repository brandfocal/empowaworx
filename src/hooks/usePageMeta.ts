import { useEffect } from 'react';

interface MetaConfig {
  title: string;
  description: string;
}

export const usePageMeta = (config: MetaConfig) => {
  useEffect(() => {
    // Set dynamic page title
    document.title = `${config.title} | EmpowaWorx`;

    // Set dynamic meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', config.description);
  }, [config.title, config.description]);
};
