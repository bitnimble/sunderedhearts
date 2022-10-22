import { checkExists, checkIs, checkState } from 'base/preconditions';
import {
  Image,
  ListItem,
  PrismicTypes,
  OListItem,
  Paragraph,
  Richtext,
  RichtextItem,
  Subtitle,
  TextStyles,
  Title,
  FlexiPage,
  SectionStart,
  Gallery,
  Slice,
  StaffCard,
} from './prismic_types';

/** Helpers */

/**
 * Deserializes the first element in the specified object property. Assumes that obj[property] is an array.
 * `obj` and `property` are separate, to allow retrieving properties that aren't valid JS names (e.g. names with dashes).
 */
const first = <T>(obj: any, property: string, deserializer: (obj: any) => T) => {
  const arr = obj[property];
  if (arr == null || arr.length === 0) {
    return undefined;
  }
  return deserializer(arr[0]);
};

/**
 * Deserializes all elements in the specified object property. Assumes that obj[property] is an array.
 */
const multi = <T>(arr: any[], deserializer: (obj: any) => T) => {
  if (arr == null) {
    return [];
  }
  const results = [];
  for (const o of arr) {
    results.push(deserializer(o));
  }
  return results;
};

function maybe<T>(input: any, deserializer: (i: any) => T): T | undefined {
  if (input == null) {
    return undefined;
  }
  return deserializer(input);
}

function unsupported(obj: any) {
  return {
    type: 'unsupported' as const,
  };
}

/** Primitives */

function deserializeColor(obj: any) {
  checkState(typeof obj === 'string' && obj.match(/^#[0-9a-f]{3,6}$/i) != null);
  return obj;
}

/** Text */

function deserializeText<T extends TextStyles>(obj: any, type: T) {
  checkState(obj.type === type);
  return {
    type,
    text: checkExists(obj.text),
    spans: checkExists(obj.spans),
  };
}
const deserializeTitle = (o: any): Title => deserializeText(o, 'heading1');
const deserializeSubtitle = (o: any): Subtitle => deserializeText(o, 'heading2');
const deserializeParagraph = (o: any): Paragraph => deserializeText(o, 'paragraph');
const deserializeListItem = (o: any): ListItem => deserializeText(o, 'list-item');
const deserializeOListItem = (o: any): OListItem => deserializeText(o, 'o-list-item');
function deserializeRichtext(arr: any[]): Richtext {
  const paragraphs = [];
  for (const o of arr) {
    const deserialized = subTypeDeserializers[o.type as keyof typeof subTypeDeserializers](o);
    checkIs<RichtextItem>(
      deserialized,
      'heading1',
      'heading2',
      'paragraph',
      'list-item',
      'o-list-item',
      'image'
    );
    paragraphs.push(deserialized);
  }
  return {
    type: 'richtext',
    paragraphs,
  };
}

function deserializeImage(obj: any): Image {
  const { url, dimensions } = obj;
  if (url == null || dimensions == null) {
    return {
      type: 'image',
      url: '',
      alt: 'Image not found',
      dimensions: {
        width: 1022,
        height: 896,
      },
    };
  }

  return {
    type: 'image',
    url: obj.url,
    alt: obj.alt,
    dimensions: obj.dimensions,
  };
}

/** Custom types - slices */

function deserializeGallery(obj: any): Gallery {
  checkState(obj['slice_type'] === 'gallery');
  return {
    type: 'gallery',
    images: multi(obj['items'], o => deserializeImage(o.image)),
  };
}
function deserializeSectionStart(obj: any): SectionStart {
  checkState(obj['slice_type'] === 'section_start');
  return {
    type: 'section_start',
    sectionTitle: checkExists(obj['primary']['section_title'][0]),
    sectionText: multi(obj['items'].map((i: any) => i['section_text']), deserializeRichtext),
  };
}
function deserializeStaffCard(obj: any): StaffCard {
  checkState(obj['slice_type'] === 'staff_card');
  return {
    type: 'staff_card',
    profilePicture: deserializeImage(obj['primary']['profile_picture']),
    name: checkExists(obj['primary']['name']),
    username: checkExists(obj['primary']['username']),
    role: checkExists(obj['primary']['role']),
    description: deserializeRichtext(obj['primary']['description']),
    rpStyle: checkExists(obj['primary']['rp_style']) === 'RP' ? 'rp' : 'casual_rp',
  };
}
function deserializeSlice(obj: any): Slice {
  const deserialized = subTypeDeserializers[obj.slice_type as keyof typeof subTypeDeserializers](obj);
  checkIs<Slice>(
    deserialized,
    'gallery',
    'section_start',
    'staff_card',
  );
  return deserialized;
}

function deserializeFlexiPage(obj: any): FlexiPage {
  return {
    type: 'flexi_page',
    id: checkExists(obj['uid']),
    pageTitle: checkExists(deserializeTitle(obj['data']['page_title'][0])),
    slices: multi(obj['data']['body'], deserializeSlice),
  };
}

type Unsupported = {
  type: 'heading3' | 'heading4' | 'heading5' | 'heading6',
};
const subTypeDeserializers: Record<(RichtextItem | Slice | Unsupported)['type'], (obj: any) => (RichtextItem | Slice | { type: 'unsupported' })> = {
  // Text deserializers.
  ['heading1']: deserializeTitle,
  ['heading2']: deserializeSubtitle,
  ['heading3']: unsupported,
  ['heading4']: unsupported,
  ['heading5']: unsupported,
  ['heading6']: unsupported,
  ['paragraph']: deserializeParagraph,
  ['list-item']: deserializeListItem,
  ['o-list-item']: deserializeOListItem,
  // Media
  ['image']: deserializeImage,
  // Segments
  ['gallery']: deserializeGallery,
  ['section_start']: deserializeSectionStart,
  ['staff_card']: deserializeStaffCard,
};
const deserializers: Record<PrismicTypes['type'], (obj: any) => PrismicTypes> = {
  ['flexi_page']: deserializeFlexiPage,
};

export class PrismicTypeDeserializer {
  deserialize(obj: any): PrismicTypes {
    console.log(obj);
    const deserializer = deserializers[obj.type as keyof typeof deserializers]
    checkState(deserializer != null, `Couldn't find deserializer for type ${obj.type}`);
    return deserializer(obj);
  }
}
