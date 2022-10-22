import { ContentRepository } from 'content/content_repository';
import { createPrismic } from 'content/prismic/create';
import { PrismicTypeDeserializer } from './prismic_type_deserializer';
import { FlexiPage, PrismicTypes } from './prismic_types';
import * as prismic from '@prismicio/client';

const PRISMIC_URL = 'https://sunderedhearts.prismic.io/api/v2';
export const prismicRepo = 'sunderedhearts';
export const prismicClient = prismic.createClient(prismicRepo, {
  routes: [
    {
      type: 'flexi_page',
      uid: 'venue_page',
      path: '/venue',
    },
  ]
});

// export function installContentServices() {
//   const deserializer = new PrismicTypeDeserializer();
//   return new ContentService(deserializer);
// }

// export class ContentService {
//   private repositoryLoadingPromise?: Promise<ContentRepository<PrismicTypes>>;

//   constructor(
//       private readonly deserializer: PrismicTypeDeserializer,
//   ) { }

//   private async getContentRepository(): Promise<ContentRepository<PrismicTypes>> {
//     if (this.repositoryLoadingPromise) {
//       return this.repositoryLoadingPromise;
//     }
//     this.repositoryLoadingPromise = createPrismic({
//       apiEndpoint: PRISMIC_URL,
//       deserializer: this.deserializer,
//     });
//     return this.repositoryLoadingPromise;
//   }

//   async getFlexiPage(id: string): Promise<FlexiPage | undefined> {
//     const repo = await this.getContentRepository();
//     const post = await repo.getById('flexi_page', id);
//     if (post == null) {
//       return undefined;
//     }
//     return post;
//   }
// }
